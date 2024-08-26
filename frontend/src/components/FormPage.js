import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from 'react-router-dom';

import classes from './FormPage.module.scss';
export default function FormPage() {
  const [searchParams] = useSearchParams();
  const error = useActionData();
  const navigation = useNavigation();
  const type = searchParams.get('mode') || 'signup';

  const isSubmitting = navigation.state === 'submitting';

  const emailClasses =
    !isSubmitting &&
    error &&
    (error.message === 'Cannot find user' ||
      error.message === 'Email already exists') &&
    classes.error;
  const passwordClasses =
    !isSubmitting &&
    error &&
    (error.message === 'Incorrect password' ||
      error.message === 'Password is too short') &&
    classes.error;

  return (
    <Form method="post" className={classes.form}>
      <h1>{`${type === 'signup' ? 'Create new user' : 'Login'} `}</h1>
      <ul>
        <li>
          <label htmlFor="email" className={emailClasses}>
            Email
          </label>
          <input
            name="email"
            id="email"
            type="email"
            className={emailClasses}
            required
          />
        </li>
        <li>
          <label htmlFor="password" className={passwordClasses}>
            Password
          </label>
          <input
            name="password"
            id="password"
            type="password"
            minLength={4}
            required
            className={passwordClasses}
          />
        </li>
        {!isSubmitting && error && (
          <li>
            <p className={classes['error-message']}>{error.message}</p>
          </li>
        )}
        <li className={classes.switch}>
          <Link to={`?mode=${type === 'signup' ? 'login' : 'signup'}`}>
            {type === 'signup' ? 'Login' : 'Create new user'}
          </Link>
          <button type="submit">{isSubmitting ? 'Submitting...' : type}</button>
        </li>
      </ul>
    </Form>
  );
}
