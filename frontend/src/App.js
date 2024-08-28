import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './pages/Error';
import RootLayout from './pages/Root';
import HomePage, { loader as cartLoader } from './pages/Home';
import AdDetailPage from './pages/AdDetails';
import AuthPage, { action as authAction } from './pages/Auth';
import {
  logoutAction,
  getAuth as authLoader,
  checkAuthLoader,
} from './util/auth';
import adDetail from './util/adDetail';

import NewAdFormPage from './pages/NewAdForm';
import EditAdFormPage from './pages/EditAdForm';
import { action as submitAction } from './components/AdForm';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      errorElement: <ErrorPage />,
      element: <RootLayout />,
      id: 'root',
      loader: authLoader,
      children: [
        { index: true, element: <HomePage />, id: 'cards', loader: cartLoader },
        { path: 'auth', element: <AuthPage />, action: authAction },
        { path: '/logout', action: logoutAction, loader: checkAuthLoader },
        {
          path: 'ads',
          children: [
            {
              path: ':id',
              element: <AdDetailPage />,
              loader: adDetail,
            },
            {
              path: 'management',
              loader: checkAuthLoader,
              children: [
                {
                  path: 'new',
                  element: <NewAdFormPage />,
                  action: submitAction,
                },
                {
                  path: 'edit/:id',
                  element: <EditAdFormPage />,
                  loader: adDetail,
                  action: submitAction,
                },
              ],
            },
          ],
        },
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
