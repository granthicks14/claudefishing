import type { FishingSpot, Season, SpeciesGuide } from '../data/spots';
import type { WeatherSnapshot } from './weather';
import { windDirectionLabel } from './weather';
import type { SolunarInfo } from './solunar';

export interface TimeWindow {
  label: string;
  start: Date;
  end: Date;
  reason: string;
}

export interface SpeciesRecommendation {
  guide: SpeciesGuide;
  timeWindows: TimeWindow[];
  methodNote: string;
  seasonalNote: string | null;
}

export interface SpotRecommendation {
  species: SpeciesRecommendation[];
  extraTips: string[];
}

export function getSeason(date: Date): Season {
  const month = date.getMonth(); // 0-indexed
  if (month === 11 || month <= 1) return 'winter';
  if (month <= 4) return 'spring';
  if (month <= 7) return 'summer';
  return 'fall';
}

function fmtTime(d: Date): string {
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', timeZone: 'America/Chicago' });
}

function buildTimeWindows(weather: WeatherSnapshot, solunar: SolunarInfo): TimeWindow[] {
  const windows: TimeWindow[] = [
    {
      label: `${fmtTime(addMinutes(weather.sunrise, -30))} – ${fmtTime(addMinutes(weather.sunrise, 90))}`,
      start: addMinutes(weather.sunrise, -30),
      end: addMinutes(weather.sunrise, 90),
      reason: 'Dawn — low light, fish feeding shallow',
    },
    {
      label: `${fmtTime(addMinutes(weather.sunset, -60))} – ${fmtTime(addMinutes(weather.sunset, 30))}`,
      start: addMinutes(weather.sunset, -60),
      end: addMinutes(weather.sunset, 30),
      reason: 'Dusk — low light, fish feeding shallow',
    },
  ];

  // Add solunar major periods that fall within a reasonable daytime/evening range
  solunar.majorPeriods.forEach((period, i) => {
    windows.push({
      label: `${fmtTime(period[0])} – ${fmtTime(period[1])}`,
      start: period[0],
      end: period[1],
      reason: `Estimated solunar major period (moon ${i === 0 ? 'overhead' : 'underfoot'})`,
    });
  });

  return windows.sort((a, b) => a.start.getTime() - b.start.getTime());
}

function methodNoteForWeather(weather: WeatherSnapshot): string {
  const notes: string[] = [];

  if (weather.isEstimate) {
    notes.push("Live conditions aren't available right now, so this is general guidance rather than a read on today's actual weather.");
  }

  if (weather.pressureTrend === 'falling') {
    notes.push('Pressure is falling — fish tend to feed aggressively ahead of a front, so moving baits (crankbaits, spinnerbaits, topwater) can outproduce slow presentations right now.');
  } else if (weather.pressureTrend === 'rising') {
    notes.push('Pressure is rising after a front — fish typically go tight to cover and bite softer. Slow down: finesse plastics, jigs, and Carolina rigs fished slowly near structure will out-fish reaction baits.');
  } else {
    notes.push('Pressure is steady — normal feeding patterns should hold; fish structure and the time windows below with your usual presentation.');
  }

  if (weather.cloudCoverPct >= 70) {
    notes.push('Heavy cloud cover means low light most of the day — the bite can stay good outside the dawn/dusk windows too, and darker-colored or louder lures work well.');
  } else if (weather.cloudCoverPct <= 20) {
    notes.push('Mostly clear/bright sun — fish will hug shade and deeper structure once the sun gets high, so lean hardest on the early/late windows and natural lure colors.');
  }

  if (weather.windSpeedMph >= 12) {
    notes.push(`Wind is up (${Math.round(weather.windSpeedMph)} mph from the ${windDirectionLabel(weather.windDirectionDeg)}) — target the bank the wind is blowing INTO, it stacks baitfish and triggers feeding.`);
  }

  if (weather.precipitationIn > 0) {
    notes.push('Active precipitation — fish often feed well right before/during light rain, but stained water after heavier rain calls for brighter or louder lures.');
  }

  return notes.join(' ');
}

export function buildRecommendation(spot: FishingSpot, weather: WeatherSnapshot, solunar: SolunarInfo, now: Date): SpotRecommendation {
  const season = getSeason(now);
  const timeWindows = buildTimeWindows(weather, solunar);
  const methodNote = methodNoteForWeather(weather);

  const species: SpeciesRecommendation[] = spot.species.map((guide) => ({
    guide,
    timeWindows,
    methodNote,
    seasonalNote: guide.seasonalNotes[season] ?? null,
  }));

  const extraTips: string[] = [
    `Moon: ${solunar.phaseName} (${solunar.illuminationPct}% illuminated) — ${solunar.activityBoost === 'high' ? 'near new/full moon, historically one of the more active feeding stretches of the month.' : solunar.activityBoost === 'medium' ? 'moderate influence on feeding activity.' : 'quarter moon, feeding activity is typically more spread through the day rather than concentrated.'}`,
    `Water temp swings fast in shallow DFW water bodies — a few warm sunny days in a row can turn on shallow bites even in winter, especially on the pond and Elm Fork spots.`,
    `Texas freshwater fishing license is required for anglers 17+ at every spot listed here, including city park ponds. Check the current TPWD Outdoor Annual for license and bag/size limits before you head out.`,
  ];

  if (spot.type === 'river') {
    extraTips.push('This is a current-driven spot — bite quality tracks Grapevine Dam floodgate activity more than time of day. Fishing is typically best within a few hours of a release starting.');
  }

  if (weather.windSpeedMph >= 20) {
    extraTips.push(`Wind is strong enough (${Math.round(weather.windSpeedMph)} mph) to make bank fishing on open water uncomfortable and boating hazardous — consider a sheltered cove or wait for it to lay down.`);
  }

  return { species, extraTips };
}

function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
}
