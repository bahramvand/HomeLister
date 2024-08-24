import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ErrorPage from './pages/Error';
import RootLayout, { loader as cartLoader } from './pages/Root';
import HomePage from './pages/Home';
import LoginPage, { action as loginAction } from './pages/Login';
import RegisterPage, { action as submitAction } from './pages/Register';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      errorElement: <ErrorPage />,
      element: <RootLayout />,
      loader: cartLoader,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'login', element: <LoginPage />, action: loginAction },
        { path: 'register', element: <RegisterPage />, action: submitAction },
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
