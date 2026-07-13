/** Standard NOAA approximate sunrise/sunset calculation, no network required. */
export function computeSunTimes(date: Date, lat: number, lon: number): { sunrise: Date; sunset: Date } {
  const rad = Math.PI / 180;
  const dayOfYear = Math.floor(
    (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) - Date.UTC(date.getFullYear(), 0, 0)) / 86400000
  );

  const declination = 23.45 * rad * Math.sin(rad * (360 * (284 + dayOfYear)) / 365);
  const latRad = lat * rad;

  const cosHourAngle = -Math.tan(latRad) * Math.tan(declination);
  const clamped = Math.min(1, Math.max(-1, cosHourAngle));
  const hourAngle = Math.acos(clamped) / rad; // degrees

  // Equation of time correction (minutes), simplified
  const b = (360 / 365) * (dayOfYear - 81) * rad;
  const eqTime = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);

  const solarNoonUtcHours = 12 - lon / 15 - eqTime / 60;
  const halfDayHours = hourAngle / 15;

  const sunriseUtcHours = solarNoonUtcHours - halfDayHours;
  const sunsetUtcHours = solarNoonUtcHours + halfDayHours;

  const base = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
  const sunrise = new Date(base + sunriseUtcHours * 3600000);
  const sunset = new Date(base + sunsetUtcHours * 3600000);

  return { sunrise, sunset };
}
