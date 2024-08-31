import { Await, useLoaderData } from 'react-router-dom';
import AdForm from '../components/AdForm';
import { Suspense } from 'react';
import Loading from '../util/Loading';

export default function EditAdFormPage() {
  const { data } = useLoaderData();

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={data}>
        {(loadedCart) => (
          <AdForm
            method="patch"
            address={loadedCart.address}
            description={loadedCart.description}
            location={loadedCart.location}
            phone={loadedCart.phone}
          />
        )}
      </Await>
    </Suspense>
  );
}
