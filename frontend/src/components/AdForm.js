import { Form, json, redirect } from 'react-router-dom';
import axios from 'axios';
import { getAuth } from '../util/auth';
import { useState } from 'react';
import MapPicker from './MapPicker';

export default function AdForm({ method, ...props }) {
  const [position, setPosition] = useState(
    props.location || { lat: '', lng: '' }
  );

  return (
    <Form method={method}>
      <ul>
        <h1>Add new Ads</h1>
        <li>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            id="address"
            defaultValue={props.address}
          />
        </li>
        <li>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            defaultValue={props.description}
          />
        </li>
        <li>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            defaultValue={props.phone}
          />
        </li>
        <MapPicker setPosition={setPosition} position={position} />
        <input type="hidden" name="lat" value={position.lat} />
        <input type="hidden" name="lng" value={position.lng} />
        <button type="submit">Submit</button>
      </ul>
    </Form>
  );
}

export async function action({ request, params }) {
  const { userId, token } = getAuth();
  const formData = await request.formData();
  const requestUrl = new URL(request.url);

  let value;
  let url = 'http://localhost:3000/ads';
  let backURL = '/';

  if (request.method === 'POST') {
    value = {
      userId,
      location: { lat: formData.get('lat'), lng: formData.get('lng') },
      address: formData.get('address'),
      description: formData.get('description'),
      phone: formData.get('phone'),
    };
  } else if (request.method === 'PATCH') {
    url = 'http://localhost:3000/ads/' + params.id;
    value = {
      location: { lat: formData.get('lat'), lng: formData.get('lng') },
      address: formData.get('address'),
      description: formData.get('description'),
      phone: formData.get('phone'),
    };

    backURL = requestUrl.protocol + '/' + requestUrl.host + '/ads/' + params.id;
  }

  try {
    await axios[request.method.toLocaleLowerCase()](url, value, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return redirect(backURL);
  } catch (err) {
    if (err.status === 403) {
      throw json(
        { message: 'You can not edit this ads' },
        { status: err.status }
      );
    }

    throw json({ message: err.message }, { status: err.status });
  }
}
