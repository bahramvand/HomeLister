import classes from './ErrorDetail.module.scss';

export default function ErrorDetail({ title, message }) {
  return (
    <div
      className={`${classes.error} ${classes[localStorage.getItem('theme')]}`}
    >
      <h1>{title}</h1>
      <p>{message}</p>
    </div>
  );
}
