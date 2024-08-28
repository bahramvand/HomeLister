import { json } from 'react-router-dom';
import axios from 'axios';

export default async function adDetail({ params }) {
  let response;
  try {
    response = await axios.get(`http://localhost:3000/ads/${params.id}`);
  } catch (err) {
    const status = err.response ? err.response.status : 500;
    throw json({ message: err.message }, { status });
  }

  return response.data;
}
