import { useState, useEffect } from 'react';
import { NavLink, useLoaderData, useSubmit, Link } from 'react-router-dom';

import classes from './MainNavigation.module.scss';
import lightSVG from '../util/light-svgrepo-com.svg';
import darkSVG from '../util/dark-svgrepo-com.svg';

export default function MainNavigation() {
  const { token } = useLoaderData();

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

  const btnClasses = `${classes['switch-theme-btn']} ${
    theme === 'light' && classes['switch-theme-dark-btn']
  }`;

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
          {token && (
            <li>
              <Link
                to="/"
                onClick={() => {
                  submit(null, { method: 'post', action: '/logout' });
                }}
              >
                Logout
              </Link>
            </li>
          )}
          {!token && (
            <li>
              <NavLink
                to="/auth"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Verify
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              <NavLink to="/ads/management/new">Post</NavLink>
            </li>
          )}
          <li>
            <span onClick={toggleTheme} className={btnClasses}>
              {/* Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme */}
              <img
                src={theme === 'light' ? lightSVG : darkSVG}
                alt="Switch Theme"
              />
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
}
