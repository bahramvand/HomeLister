import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './pages/Error';
import RootLayout from './pages/Root';
import HomePage, { loader as cartLoader } from './pages/Home';
import AdDetailPage, { loader as adDetailLoader } from './pages/AdDetails';
import AuthPage, { action as authAction } from './pages/Auth';
import { logoutAction, tokenLoader, checkAuthLoader } from './util/auth';

import AdMap from './pages/AdMap';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      errorElement: <ErrorPage />,
      element: <RootLayout />,
      id: 'root',
      loader: tokenLoader,
      children: [
        { index: true, element: <HomePage />, id: 'cards', loader: cartLoader },
        { path: 'auth', element: <AuthPage />, action: authAction },
        { path: 'ads/:id', element: <AdDetailPage />, loader: adDetailLoader },
        { path: '/logout', action: logoutAction, loader: checkAuthLoader },
        { path: '/map', element: <AdMap /> },
      ],
    },
    {
      path: '*',
      element: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
