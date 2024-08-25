import { useRouteError } from 'react-router-dom';
import ErrorDetail from '../components/ErrorDetail';

export default function ErrorPage() {
  const error = useRouteError();
  let title = 'Error Happened!';
  let message = 'Something went wrong!';

  if (error && error.status) {
    if (error.status >= 500) {
      title = 'Network Error!';
      message = error.data?.message || 'A network error occurred!';
    } else if (error.status === 404) {
      title = 'Page Not Found!';
      message = 'The requested page could not be found.';
    } else if (error.status >= 400) {
      title = 'Error Occurred!';
      message = error.data?.message || 'An unexpected error occurred.';
    }
  }

  return <ErrorDetail title={title} message={message} />;
}
