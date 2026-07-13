import type { WeatherSnapshot } from '../lib/weather';
import { windDirectionLabel } from '../lib/weather';
import type { SolunarInfo } from '../lib/solunar';

interface Props {
  weather: WeatherSnapshot;
  solunar: SolunarInfo;
}

export function WeatherSummary({ weather, solunar }: Props) {
  const trendArrow = weather.pressureTrend === 'rising' ? '↑' : weather.pressureTrend === 'falling' ? '↓' : '→';

  return (
    <div className="weather-summary">
      <div className="weather-stat">
        <span className="weather-stat-value">{Math.round(weather.currentTempF)}°F</span>
        <span className="weather-stat-label">Temp</span>
      </div>
      <div className="weather-stat">
        <span className="weather-stat-value">
          {Math.round(weather.windSpeedMph)} mph {windDirectionLabel(weather.windDirectionDeg)}
        </span>
        <span className="weather-stat-label">Wind</span>
      </div>
      <div className="weather-stat">
        <span className="weather-stat-value">
          {Math.round(weather.pressureMb)} mb {trendArrow}
        </span>
        <span className="weather-stat-label">Pressure</span>
      </div>
      <div className="weather-stat">
        <span className="weather-stat-value">{Math.round(weather.cloudCoverPct)}%</span>
        <span className="weather-stat-label">Cloud cover</span>
      </div>
      <div className="weather-stat">
        <span className="weather-stat-value">{solunar.phaseName}</span>
        <span className="weather-stat-label">{solunar.illuminationPct}% illuminated</span>
      </div>
    </div>
  );
}
