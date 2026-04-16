import styles from './Loader.module.css';

export default function Loader({ text = 'Carregando...' }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.spinner} />
      <p className={styles.text}>{text}</p>
    </div>
  );
}
