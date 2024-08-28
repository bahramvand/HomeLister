import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import LocationMarker from './LocationMarker';

export default function MapPicker({ setPosition, position }) {
  function MapEvents() {
    useMapEvents({
      click(e) {
        setPosition(e.latlng);
      },
    });
    return null;
  }

  return (
    <div>
      <MapContainer
        center={
          position.lat !== ''
            ? [position.lat, position.lng]
            : [35.688299418697746, 51.38960545677873]
        }
        zoom={13}
        style={{ height: '50vh', width: '50vh' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapEvents />
        <LocationMarker position={position} />
      </MapContainer>
    </div>
  );
}
