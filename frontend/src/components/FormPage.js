import { Form, Link, useSearchParams } from 'react-router-dom';

export default function FormPage() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get('mode') || 'signup';
  return (
    <Form method="post">
      <h2>{`${type === 'signup' ? 'Create new user' : 'Login'} `}</h2>
      <ul>
        <li>
          <label htmlFor="email">Email</label>
          <input name="email" id="email" type="email" required />
        </li>
        <li>
          <label htmlFor="password">Password</label>
          <input name="password" id="password" type="password" required />
        </li>
        <li>
          <Link to={`?mode=${type === 'signup' ? 'login' : 'signup'}`}>
            {type === 'signup' ? 'Login' : 'Create new user'}
          </Link>
          <button type="submit">{type}</button>
        </li>
      </ul>
    </Form>
  );
}
