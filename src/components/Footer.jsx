import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.logo}>🍳 Sabores do Mundo</span>
          <p className={styles.tagline}>Explore receitas de todo o planeta, uma cozinha por vez.</p>
        </div>
        <nav className={styles.links}>
          <Link to="/">Início</Link>
          <Link to="/categorias">Categorias</Link>
          <Link to="/culinarias">Culinárias</Link>
          <Link to="/aleatoria">Surpreenda-me</Link>
        </nav>
        <p className={styles.credit}>
          Dados fornecidos por{' '}
          <a href="https://www.themealdb.com" target="_blank" rel="noopener noreferrer">
            TheMealDB
          </a>
        </p>
      </div>
    </footer>
  );
}
