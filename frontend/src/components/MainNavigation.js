import { useState, useEffect } from 'react';
import { NavLink, useRouteLoaderData, useSubmit } from 'react-router-dom';

import classes from './MainNavigation.module.scss';

export default function MainNavigation() {
  const token = useRouteLoaderData('root');

  const submit = useSubmit();
  const savedTheme = localStorage.getItem('theme') || 'light';
  const [theme, setTheme] = useState(savedTheme);

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  return (
    <header className={classes.header}>
      <nav
        className={`${classes.navigator} ${theme === 'light' ? '' : 'dark'}`}
      >
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          {!token && (
            <li>
              <NavLink
                to="/auth"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Authentication
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              <a
                href="/"
                onClick={() => {
                  submit(null, { method: 'post', action: '/logout' });
                }}
              >
                Log out
              </a>
            </li>
          )}
          <li>
            <button onClick={toggleTheme}>
              Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
