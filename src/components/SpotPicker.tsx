import type { FishingSpot } from '../data/spots';

interface Props {
  spots: FishingSpot[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SpotPicker({ spots, selectedId, onSelect }: Props) {
  return (
    <div className="spot-picker">
      {spots.map((spot) => (
        <button
          key={spot.id}
          className={`spot-card ${selectedId === spot.id ? 'selected' : ''}`}
          onClick={() => onSelect(spot.id)}
          type="button"
        >
          <span className="spot-card-type">{spot.type}</span>
          <h3>{spot.name}</h3>
          <p className="spot-card-distance">{spot.distanceFromCoppell}</p>
        </button>
      ))}
    </div>
  );
}
