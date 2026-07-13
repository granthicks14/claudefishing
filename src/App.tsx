import { useEffect, useMemo, useState } from 'react';
import { SPOTS } from './data/spots';
import { fetchWeather, getFallbackWeather, type WeatherSnapshot } from './lib/weather';
import { getSolunarInfo, type SolunarInfo } from './lib/solunar';
import { buildRecommendation } from './lib/recommend';
import { SpotPicker } from './components/SpotPicker';
import { WeatherSummary } from './components/WeatherSummary';
import { SpeciesCard } from './components/SpeciesCard';
import { TipsPanel } from './components/TipsPanel';
import './App.css';

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

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Coppell Area Fishing Guide</h1>
        <p>Pick a spot near Coppell, TX and get today's best species, spots, methods, and bite windows.</p>
      </header>

      <SpotPicker spots={SPOTS} selectedId={selectedId} onSelect={setSelectedId} />

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

          {recommendation && (
            <>
              <div className="species-grid">
                {recommendation.species.map((rec) => (
                  <SpeciesCard key={rec.guide.species} recommendation={rec} />
                ))}
              </div>
              <TipsPanel tips={recommendation.extraTips} />
            </>
          )}
        </main>
      )}
    </div>
  );
}

export default App;
