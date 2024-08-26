import React from 'react';
import axios from 'axios';
import { Link, json, useLoaderData } from 'react-router-dom';
import { MapContainer, TileLayer } from 'react-leaflet';
import LocationMarker from '../components/LocationMarker';
import 'leaflet/dist/leaflet.css';

export default function AdDetailPage() {
  const cart = useLoaderData();
  const position = cart.location
    ? [cart.location.lat, cart.location.lng]
    : null;

  return (
    <>
      <h3>{cart.address}</h3>
      <a href={`tel:${cart.phone}`}>{cart.phone}</a>
      <p>{cart.description}</p>
      <Link to="..">Back</Link>

      {position && (
        <MapContainer
          center={position}
          zoom={13}
          scrollWheelZoom={false}
          style={{ height: '600px', width: '600px', overflow: 'hidden' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>
          <LocationMarker position={position} />
        </MapContainer>
      )}
    </>
  );
}

export async function loader({ params }) {
  let response;
  try {
    response = await axios.get(`http://localhost:3000/ads/${params.id}`);
  } catch (err) {
    const status = err.response ? err.response.status : 500;
    throw json({ message: err.message }, { status });
  }

  return response.data;
}
