import { useEffect, useMemo, useState } from 'react';
import { SPOTS, isBassSpecies } from './data/spots';
import { fetchWeather, getFallbackWeather, type WeatherSnapshot } from './lib/weather';
import { getSolunarInfo, type SolunarInfo } from './lib/solunar';
import { buildRecommendation } from './lib/recommend';
import { MapView } from './components/MapView';
import { WeatherSummary } from './components/WeatherSummary';
import { SpeciesCard } from './components/SpeciesCard';
import { TipsPanel } from './components/TipsPanel';
import './App.css';
import 'leaflet/dist/leaflet.css';

type LoadState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'ready'; weather: WeatherSnapshot; solunar: SolunarInfo };

function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loadState, setLoadState] = useState<LoadState>({ status: 'idle' });

  const selectedSpot = useMemo(() => SPOTS.find((s) => s.id === selectedId) ?? null, [selectedId]);

  useEffect(() => {
    if (!selectedSpot) return;

    let cancelled = false;
    setLoadState({ status: 'loading' });

    fetchWeather(selectedSpot.latitude, selectedSpot.longitude)
      .catch(() => getFallbackWeather(selectedSpot.latitude, selectedSpot.longitude, new Date()))
      .then((weather) => {
        if (cancelled) return;
        const solunar = getSolunarInfo(new Date(), weather.sunrise, weather.sunset);
        setLoadState({ status: 'ready', weather, solunar });
      });

    return () => {
      cancelled = true;
    };
  }, [selectedSpot]);

  const recommendation = useMemo(() => {
    if (!selectedSpot || loadState.status !== 'ready') return null;
    return buildRecommendation(selectedSpot, loadState.weather, loadState.solunar, new Date());
  }, [selectedSpot, loadState]);

  const bassSpecies = recommendation?.species.filter((rec) => isBassSpecies(rec.guide.species)) ?? [];
  const otherSpecies = recommendation?.species.filter((rec) => !isBassSpecies(rec.guide.species)) ?? [];
  const bestCast = selectedSpot?.castingSpots.find((c) => c.isBest) ?? null;

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Coppell Area Bass Fishing Guide</h1>
        <p>Click a spot on the map for the best bass water near Coppell — plus what else bites there, where to cast, and when to go.</p>
      </header>

      <MapView spots={SPOTS} selectedSpot={selectedSpot} onSelect={setSelectedId} />
      <p className="map-hint">
        {SPOTS.length} spots — pins show approximate locations (a few are regional-scale estimates, flagged in their description) — verify exact access points on site.
        Zoom in if labels overlap. Click a pin to zoom in on it; the gold star marks the best bass spot there, red dots are other casting zones.
      </p>

      {selectedSpot && (
        <main className="results">
          <section className="spot-detail">
            <h2>{selectedSpot.name}</h2>
            <p className="spot-description">{selectedSpot.description}</p>
            <p className="spot-access">
              <strong>Access:</strong> {selectedSpot.access}
            </p>
          </section>

          {loadState.status === 'loading' && <p className="status-line">Loading live weather &amp; solunar data…</p>}
          {loadState.status === 'ready' && loadState.weather.isEstimate && (
            <p className="status-line error">Live weather is unavailable right now, so times/conditions below use typical seasonal averages instead of today's actual weather.</p>
          )}
          {loadState.status === 'ready' && <WeatherSummary weather={loadState.weather} solunar={loadState.solunar} />}

          {bestCast && (
            <section className="best-spot-callout">
              <span className="best-spot-badge">★ Best Bass Spot</span>
              <h3>{bestCast.name}</h3>
              <p>{bestCast.note}</p>
              <p className="cast-good-for">Also good for: {bestCast.goodFor.join(', ')}</p>
            </section>
          )}

          <section className="casting-spots">
            <h3>All casting zones here</h3>
            <ul>
              {selectedSpot.castingSpots.map((cast) => (
                <li key={cast.name} className={cast.isBest ? 'is-best' : undefined}>
                  <span className="cast-name">
                    {cast.isBest && '★ '}
                    {cast.name}
                  </span>
                  <span className="cast-good-for">Good for: {cast.goodFor.join(', ')}</span>
                  <span className="cast-note">{cast.note}</span>
                </li>
              ))}
            </ul>
          </section>

          {recommendation && (
            <>
              <h3 className="section-label">Bass here</h3>
              <div className="species-grid">
                {bassSpecies.map((rec) => (
                  <SpeciesCard key={rec.guide.species} recommendation={rec} />
                ))}
              </div>

              {otherSpecies.length > 0 && (
                <>
                  <h3 className="section-label secondary">Other fish here</h3>
                  <div className="species-grid secondary">
                    {otherSpecies.map((rec) => (
                      <SpeciesCard key={rec.guide.species} recommendation={rec} />
                    ))}
                  </div>
                </>
              )}

              <TipsPanel tips={recommendation.extraTips} />
            </>
          )}
        </main>
      )}
    </div>
  );
}

export default App;
