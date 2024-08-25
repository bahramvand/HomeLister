import axios from 'axios';
import { json, redirect } from 'react-router-dom';
import FormPage from '../components/FormPage';

export default function AuthPage() {
  return <FormPage />;
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'signup';
  console.log(mode);

  if (mode !== 'signup' && mode !== 'login') {
    throw json({ message: 'Unsupported mode' }, { status: 422 });
  }

  const formData = await request.formData();
  const value = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  let response;
  try {
    response = await axios.post(`http://localhost:3000/${mode}`, value, {
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
