import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [query, setQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleSearch(e) {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      navigate(`/busca?q=${encodeURIComponent(q)}`);
      setQuery('');
      setMenuOpen(false);
    }
  }

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoIcon}>🍳</span>
          <span className={styles.logoText}>Sabores<em>do Mundo</em></span>
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
          <NavLink to="/" end className={({ isActive }) => isActive ? styles.active : ''} onClick={() => setMenuOpen(false)}>
            Início
          </NavLink>
          <NavLink to="/categorias" className={({ isActive }) => isActive ? styles.active : ''} onClick={() => setMenuOpen(false)}>
            Categorias
          </NavLink>
          <NavLink to="/culinarias" className={({ isActive }) => isActive ? styles.active : ''} onClick={() => setMenuOpen(false)}>
            Culinárias
          </NavLink>
          <NavLink to="/aleatoria" className={({ isActive }) => isActive ? styles.active : ''} onClick={() => setMenuOpen(false)}>
            Surpreenda-me
          </NavLink>

          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              placeholder="Buscar receita..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchBtn} aria-label="Buscar">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
          </form>
        </nav>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  );
}
