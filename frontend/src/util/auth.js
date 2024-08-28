import { redirect } from 'react-router-dom';

export function getAuthToken() {
  return localStorage.getItem('token');
}

export function getAuthUserId() {
  return localStorage.getItem('userId');
}

export function logoutAction() {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');

  return redirect('/');
}

export function getAuth() {
  return { token: getAuthToken(), userId: getAuthUserId() };
}

export function checkAuthLoader() {
  const token = getAuthToken();
  const userId = getAuthUserId();

  if (!token || !userId) {
    return redirect('/auth');
  }

  return true;
}
