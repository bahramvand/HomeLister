import { json, Outlet } from 'react-router-dom';
import axios from 'axios';

import MainNavigation from '../components/MainNavigation';
import ListOfCards from '../components/ListOfCards';

export default function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        <ListOfCards />
        <Outlet />
      </main>
    </>
  );
}

export async function loader() {
  let response;
  try {
    response = await axios.get('http://localhost:3000/ads');
  } catch (err) {
    const status = err.response ? err.response.status : 500;
    throw json({ message: err.message }, { status });
  }

  const datas = response.data;

  return datas;
}
