import classes from './Loading.module.scss';

export default function Loading() {
  return (
    <div id={classes['loading-modal-content']}>
      <div className={classes['lds-dual-ring']}></div>
    </div>
  );
}
