import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <main className={styles.wrap}>
      <span className={styles.code}>404</span>
      <h1 className={styles.title}>Página não encontrada</h1>
      <p className={styles.sub}>
        Parece que esse prato saiu do cardápio. Que tal explorar outras receitas?
      </p>
      <Link to="/" className={styles.btn}>← Voltar ao início</Link>
    </main>
  );
}
