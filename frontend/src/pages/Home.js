import React, { Suspense } from 'react';
import {
  defer,
  json,
  useLoaderData,
  useNavigate,
  useNavigation,
  Await,
} from 'react-router-dom';
import AdList from '../components/AdList';
import axios from 'axios';

export default function Home() {
  const { carts } = useLoaderData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const handlePageChange = (page) => {
    navigate(`/?_page=${page}`);
  };

  const isLoading = navigation.state === 'loading';

  return (
    <>
      <h1>Ad Listings</h1>
      {isLoading && <p>Loading...</p>}
      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={carts}>
          {(loadedCart) => (
            <AdList
              ads={loadedCart.ads}
              currentPage={loadedCart.currentPage}
              totalPages={loadedCart.totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </Await>
      </Suspense>
    </>
  );
}

async function loadCarts(request) {
  const url = new URL(request.url);
  const page = url.searchParams.get('_page') || 1;

  try {
    const response = await axios.get(
      `http://localhost:3000/ads?_page=${page}&_limit=5`
    );
    const total = parseInt(response.headers['x-total-count'], 10);
    const totalPages = Math.ceil(total / 5);

    return {
      ads: response.data,
      currentPage: parseInt(page, 10),
      totalPages,
    };
  } catch (err) {
    const status = err.response ? err.response.status : 500;
    throw json({ message: err.message }, { status });
  }
}

export function loader({ request }) {
  return defer({
    carts: loadCarts(request),
  });
}
