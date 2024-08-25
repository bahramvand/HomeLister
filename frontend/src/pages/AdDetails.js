import axios from 'axios';
import { Link, json, useLoaderData } from 'react-router-dom';

export default function AdDetailPage() {
  const cart = useLoaderData();

  return (
    <>
      <h3>{cart.address}</h3>
      <a href={`tel:${cart.phone}`}>{cart.phone}</a>
      <p>{cart.description}</p>
      <Link to="..">Back</Link>
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
