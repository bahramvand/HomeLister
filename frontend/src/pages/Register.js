import axios from 'axios';
import { json, redirect } from 'react-router-dom';

import FormPage from '../components/FormPage';

export default function RegisterPage() {
  return <FormPage type="up" />;
}

export async function action({ request }) {
  const formData = await request.formData();
  const value = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  let response;
  try {
    response = await axios.post('http://localhost:3000/signup', value, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (err) {
    throw json({ message: 'Cannot Register' }, { status: 500 });
  }

  localStorage.setItem('token', response.data.accessToken);
  return redirect('/');
}
