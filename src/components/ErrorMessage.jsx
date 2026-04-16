import styles from './ErrorMessage.module.css';

export default function ErrorMessage({ message = 'Algo deu errado.', onRetry }) {
  return (
    <div className={styles.wrap}>
      <span className={styles.icon}>⚠️</span>
      <p className={styles.msg}>{message}</p>
      {onRetry && (
        <button className={styles.btn} onClick={onRetry}>
          Tentar novamente
        </button>
      )}
    </div>
  );
}
