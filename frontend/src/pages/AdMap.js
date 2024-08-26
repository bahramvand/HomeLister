import React, { useState } from 'react';
import MapPicker from '../components/MapPicker';
import { Form } from 'react-router-dom';

function App() {
  const [position, setPosition] = useState({ lat: '', lng: '' });

  return (
    <Form method="post" action="/submit">
      <MapPicker setPosition={setPosition} position={position} />
      <input type="hidden" name="lat" value={position.lat} />
      <input type="hidden" name="lng" value={position.lng} />
      <button>Submit</button>
    </Form>
  );
}

export default App;
