import axios from 'axios';
import { json, redirect } from 'react-router-dom';
import FormPage from '../components/FormPage';

export default function LoginPage() {
  return <FormPage type="in" />;
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
  } catch (err) {
    throw json({ message: 'Cannot submit' }, { status: 500 });
  }

  localStorage.setItem('token', response.data.accessToken);
  return redirect('/');
}
