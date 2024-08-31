import { defer, json } from 'react-router-dom';
import axios from 'axios';

async function loaderAdDetail(id) {
  let response;
  try {
    response = await axios.get(`http://localhost:3000/ads/${id}`);
  } catch (err) {
    const status = err.response ? err.response.status : 500;
    throw json({ message: err.message }, { status });
  }

  return response.data;
}

export default async function adDetail({ params }) {
  return defer({
    data: loaderAdDetail(params.id),
  });
}
