import { useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip, Popup, useMap } from 'react-leaflet';
import type { FishingSpot } from '../data/spots';

interface Props {
  spots: FishingSpot[];
  selectedSpot: FishingSpot | null;
  onSelect: (id: string) => void;
}

const COPPELL_CENTER: [number, number] = [32.9634, -96.9903];

const TYPE_COLOR: Record<FishingSpot['type'], string> = {
  river: '#0f7a72',
  reservoir: '#1c5fb0',
  pond: '#d97a2b',
};

function FlyToSelected({ spot }: { spot: FishingSpot | null }) {
  const map = useMap();
  useEffect(() => {
    if (spot) {
      map.flyTo([spot.latitude, spot.longitude], 15, { duration: 0.75 });
    }
  }, [spot, map]);
  return null;
}

export function MapView({ spots, selectedSpot, onSelect }: Props) {
  return (
    <div className="map-container">
      <MapContainer center={COPPELL_CENTER} zoom={12} scrollWheelZoom style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {spots.map((spot) => (
          <CircleMarker
            key={spot.id}
            center={[spot.latitude, spot.longitude]}
            radius={selectedSpot?.id === spot.id ? 12 : 9}
            pathOptions={{
              color: TYPE_COLOR[spot.type],
              fillColor: TYPE_COLOR[spot.type],
              fillOpacity: selectedSpot?.id === spot.id ? 0.9 : 0.6,
              weight: selectedSpot?.id === spot.id ? 3 : 2,
            }}
            eventHandlers={{ click: () => onSelect(spot.id) }}
          >
            <Tooltip direction="top" offset={[0, -6]}>
              {spot.name}
            </Tooltip>
          </CircleMarker>
        ))}

        {selectedSpot?.castingSpots.map((cast) => (
          <CircleMarker
            key={cast.name}
            center={[selectedSpot.latitude + cast.latOffset, selectedSpot.longitude + cast.lonOffset]}
            radius={7}
            pathOptions={{ color: '#e0342f', fillColor: '#ff6b5e', fillOpacity: 0.85, weight: 2 }}
          >
            <Tooltip direction="top" offset={[0, -5]}>
              {cast.name}
            </Tooltip>
            <Popup>
              <strong>{cast.name}</strong>
              <br />
              Good for: {cast.goodFor.join(', ')}
              <br />
              {cast.note}
            </Popup>
          </CircleMarker>
        ))}

        <FlyToSelected spot={selectedSpot} />
      </MapContainer>
    </div>
  );
}
