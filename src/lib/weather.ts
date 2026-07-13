import { computeSunTimes } from './sun';

export interface WeatherSnapshot {
  currentTempF: number;
  windSpeedMph: number;
  windDirectionDeg: number;
  cloudCoverPct: number;
  precipitationIn: number;
  pressureMb: number;
  pressureTrend: 'rising' | 'falling' | 'steady';
  sunrise: Date;
  sunset: Date;
  fetchedAt: Date;
  /** True when live weather couldn't be fetched and this is a seasonal-average estimate */
  isEstimate: boolean;
}

interface OpenMeteoResponse {
  current: {
    temperature_2m: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    cloud_cover: number;
    precipitation: number;
    pressure_msl: number;
  };
  hourly: {
    time: string[];
    pressure_msl: number[];
  };
  daily: {
    sunrise: string[];
    sunset: string[];
  };
}

export async function fetchWeather(lat: number, lon: number): Promise<WeatherSnapshot> {
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.searchParams.set('latitude', String(lat));
  url.searchParams.set('longitude', String(lon));
  url.searchParams.set(
    'current',
    'temperature_2m,wind_speed_10m,wind_direction_10m,cloud_cover,precipitation,pressure_msl'
  );
  url.searchParams.set('hourly', 'pressure_msl');
  url.searchParams.set('daily', 'sunrise,sunset');
  url.searchParams.set('temperature_unit', 'fahrenheit');
  url.searchParams.set('wind_speed_unit', 'mph');
  url.searchParams.set('precipitation_unit', 'inch');
  url.searchParams.set('timezone', 'America/Chicago');
  url.searchParams.set('forecast_days', '1');

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`Weather request failed: ${res.status}`);
  }
  const data: OpenMeteoResponse = await res.json();

  const pressureTrend = computePressureTrend(data.hourly.time, data.hourly.pressure_msl);

  return {
    currentTempF: data.current.temperature_2m,
    windSpeedMph: data.current.wind_speed_10m,
    windDirectionDeg: data.current.wind_direction_10m,
    cloudCoverPct: data.current.cloud_cover,
    precipitationIn: data.current.precipitation,
    pressureMb: data.current.pressure_msl,
    pressureTrend,
    sunrise: new Date(data.daily.sunrise[0]),
    sunset: new Date(data.daily.sunset[0]),
    fetchedAt: new Date(),
    isEstimate: false,
  };
}

// Rough DFW-area average high temps (°F) by month, used only when live weather is unreachable.
const DFW_AVG_TEMP_F = [56, 61, 69, 77, 84, 92, 96, 96, 89, 79, 67, 57];

/** Seasonal-average fallback so the app still gives recommendations when the network/API is unavailable. */
export function getFallbackWeather(lat: number, lon: number, date: Date): WeatherSnapshot {
  const { sunrise, sunset } = computeSunTimes(date, lat, lon);
  return {
    currentTempF: DFW_AVG_TEMP_F[date.getMonth()],
    windSpeedMph: 8,
    windDirectionDeg: 180,
    cloudCoverPct: 40,
    precipitationIn: 0,
    pressureMb: 1015,
    pressureTrend: 'steady',
    sunrise,
    sunset,
    fetchedAt: date,
    isEstimate: true,
  };
}

/** Compares current-hour pressure against the reading ~3 hours prior to estimate trend. */
function computePressureTrend(times: string[], pressures: number[]): WeatherSnapshot['pressureTrend'] {
  const now = new Date();
  let nowIdx = times.findIndex((t) => new Date(t) > now);
  if (nowIdx === -1) nowIdx = times.length - 1;
  if (nowIdx < 0) return 'steady';

  const pastIdx = Math.max(0, nowIdx - 3);
  const current = pressures[nowIdx] ?? pressures[pressures.length - 1];
  const past = pressures[pastIdx] ?? current;
  const delta = current - past;

  if (delta <= -1) return 'falling';
  if (delta >= 1) return 'rising';
  return 'steady';
}

export function windDirectionLabel(deg: number): string {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return dirs[Math.round(deg / 22.5) % 16];
}
