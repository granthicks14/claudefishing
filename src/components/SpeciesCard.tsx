import type { SpeciesRecommendation } from '../lib/recommend';

interface Props {
  recommendation: SpeciesRecommendation;
}

export function SpeciesCard({ recommendation }: Props) {
  const { guide, timeWindows, methodNote, seasonalNote } = recommendation;

  return (
    <article className="species-card">
      <h3>{guide.species}</h3>

      <div className="species-section">
        <h4>Best spot to target</h4>
        <p>{guide.target}</p>
      </div>

      <div className="species-section">
        <h4>Best method</h4>
        <ul>
          {guide.methods.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
        <p className="bait-line">
          <strong>Bait/lures:</strong> {guide.baits.join(', ')}
        </p>
      </div>

      <div className="species-section">
        <h4>Best time today</h4>
        <ul className="time-windows">
          {timeWindows.map((w) => (
            <li key={w.label}>
              <span className="time-window-label">{w.label}</span>
              <span className="time-window-reason">{w.reason}</span>
            </li>
          ))}
        </ul>
        <p className="base-time-note">{guide.baseTimeNotes}</p>
      </div>

      <div className="species-section conditions-note">
        <h4>Today's conditions say</h4>
        <p>{methodNote}</p>
      </div>

      {seasonalNote && (
        <div className="species-section seasonal-note">
          <h4>Seasonal note</h4>
          <p>{seasonalNote}</p>
        </div>
      )}
    </article>
  );
}
