import axios from 'axios';
import { Form, json, redirect } from 'react-router-dom';

export default function LoginPage() {
  return (
    <Form method="post">
      <h2>Login</h2>
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
          <button type="submit">Submit</button>
        </li>
      </ul>
    </Form>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const value = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  let response;
  try {
    response = await axios.post('http://localhost:3000/login', value, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response);
  } catch (err) {
    throw json({ message: 'Cannot submit' }, { status: 500 });
  }

  return redirect('/');
}
