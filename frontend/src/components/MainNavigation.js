import { Link } from 'react-router-dom';

export default function MainNavigation() {
  return (
    <header>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Log in</Link>
        </li>
        <li>
          <Link to="/register">register</Link>
        </li>
      </ul>
    </header>
  );
}
