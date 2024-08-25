import { Outlet } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';

export default function RootLayout() {
  return (
    <div className="App">
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

