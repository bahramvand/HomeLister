import classes from './AdCard.module.scss';

export default function AdCard({ address }) {
  return (
    <div className={classes.card}>
      <p>{address}</p>
    </div>
  );
}
