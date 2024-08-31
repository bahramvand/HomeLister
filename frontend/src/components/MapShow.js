import { MapContainer, TileLayer } from 'react-leaflet';
import LocationMarker from '../components/LocationMarker';
import 'leaflet/dist/leaflet.css';
import { useNavigate } from 'react-router-dom';

import classes from './MapShow.module.scss';
import editSVG from '../util/edit-button-svgrepo-com.svg';

export default function MapShow({
  position,
  address,
  phone,
  description,
  cartUserId,
  userId,
  id,
}) {
  const navigate = useNavigate();

  return (
    <div className={classes['ad-detail']}>
      <h2 className={classes['map-address']}>{address}</h2>
      <a href={`tel:${phone}`} className={classes['map-phone']}>
        {phone}
      </a>
      <p>{description}</p>

      <div className={classes['map-container']}>
        {position && (
          <div className={classes['map-background']}>
            <MapContainer
              center={position}
              zoom={13}
              scrollWheelZoom={false}
              className={classes.map}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>
              <LocationMarker position={position} />
            </MapContainer>
          </div>
        )}
        {cartUserId === userId && (
          <button
            onClick={() => {
              navigate('/ads/management/edit/' + id);
            }}
            className={classes.edit}
          >
            edit
            <img src={editSVG} alt="Edit" />
          </button>
        )}
      </div>
      <button
        onClick={() => {
          navigate('../..');
        }}
        className={classes.back}
      >
        Back
      </button>
    </div>
  );
}
