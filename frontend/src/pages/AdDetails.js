import { Suspense } from 'react';
import {
  Await,
  useLoaderData,
  useParams,
  useRouteLoaderData,
} from 'react-router-dom';
import MapShow from '../components/MapShow';
import Loading from '../util/Loading';

export default function AdDetailPage() {
  const { data } = useLoaderData();
  const id = useParams().id;
  const { userId } = useRouteLoaderData('root');

  return (
    <Suspense fallback={<Loading />}>
      <Await resolve={data}>
        {(loadedCart) => (
          <MapShow
            position={
              loadedCart.location
                ? [loadedCart.location.lat, loadedCart.location.lng]
                : null
            }
            address={loadedCart.address}
            phone={loadedCart.phone}
            description={loadedCart.description}
            cartUserId={loadedCart.userId}
            userId={userId}
            id={id}
          />
        )}
      </Await>
    </Suspense>
  );
}
