export interface SolunarInfo {
  moonAgeDays: number;
  illuminationPct: number;
  phaseName: string;
  /** Estimated "major" feeding windows (moon overhead / underfoot), 2hr wide, local time */
  majorPeriods: [Date, Date][];
  /** Estimated "minor" feeding windows (approx moonrise / moonset), 1hr wide, local time */
  minorPeriods: [Date, Date][];
  activityBoost: 'high' | 'medium' | 'low';
}

const SYNODIC_MONTH_DAYS = 29.53058867;
// A known new moon reference: 2000-01-06 18:14 UTC
const REFERENCE_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14, 0);

function moonAgeDays(date: Date): number {
  const diffDays = (date.getTime() - REFERENCE_NEW_MOON) / 86400000;
  const age = diffDays % SYNODIC_MONTH_DAYS;
  return age < 0 ? age + SYNODIC_MONTH_DAYS : age;
}

function phaseName(age: number): string {
  const pct = age / SYNODIC_MONTH_DAYS;
  if (pct < 0.03 || pct > 0.97) return 'New Moon';
  if (pct < 0.22) return 'Waxing Crescent';
  if (pct < 0.28) return 'First Quarter';
  if (pct < 0.47) return 'Waxing Gibbous';
  if (pct < 0.53) return 'Full Moon';
  if (pct < 0.72) return 'Waning Gibbous';
  if (pct < 0.78) return 'Last Quarter';
  return 'Waning Crescent';
}

/**
 * Estimated solunar windows. Real moonrise/transit requires full ephemeris math;
 * this uses the standard simplified approximation: at new moon the moon transits
 * (is highest overhead) at local solar noon, and transit slips ~50 min/day later
 * as the moon ages, cycling back every synodic month.
 */
export function getSolunarInfo(date: Date, sunrise: Date, sunset: Date): SolunarInfo {
  const age = moonAgeDays(date);
  const illuminationPct = Math.round((1 - Math.cos((2 * Math.PI * age) / SYNODIC_MONTH_DAYS)) / 2 * 100);

  const solarNoon = new Date((sunrise.getTime() + sunset.getTime()) / 2);
  const dailyRetardationHours = 24 / SYNODIC_MONTH_DAYS; // ~0.813 hr/day
  const transitOffsetHours = age * dailyRetardationHours;

  const overhead = addHours(solarNoon, transitOffsetHours % 24);
  const underfoot = addHours(overhead, 12);
  const moonriseEst = addHours(overhead, -6.2);
  const moonsetEst = addHours(overhead, 6.2);

  const majorPeriods: [Date, Date][] = [
    [addHours(overhead, -1), addHours(overhead, 1)],
    [addHours(underfoot, -1), addHours(underfoot, 1)],
  ];
  const minorPeriods: [Date, Date][] = [
    [addHours(moonriseEst, -0.5), addHours(moonriseEst, 0.5)],
    [addHours(moonsetEst, -0.5), addHours(moonsetEst, 0.5)],
  ];

  // New and full moons generally correlate with more consistent feeding activity.
  const distFromNewOrFull = Math.min(age, Math.abs(age - SYNODIC_MONTH_DAYS / 2), Math.abs(age - SYNODIC_MONTH_DAYS));
  const activityBoost: SolunarInfo['activityBoost'] = distFromNewOrFull < 3 ? 'high' : distFromNewOrFull < 7 ? 'medium' : 'low';

  return {
    moonAgeDays: age,
    illuminationPct,
    phaseName: phaseName(age),
    majorPeriods,
    minorPeriods,
    activityBoost,
  };
}

function addHours(date: Date, hours: number): Date {
  return new Date(date.getTime() + hours * 3600000);
}
