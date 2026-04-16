import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { fetchCategories } from '../utils/api';
import { translateCategory } from '../utils/translations';
import styles from './Categories.module.css';

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchCategories()
      .then(data => { if (!cancelled) setCategories(data); })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  if (loading) return <Loader text="Buscando categorias..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="container">
      <div className={styles.header}>
        <h1 className={styles.title}>Categorias</h1>
        <p className={styles.sub}>Escolha uma categoria e explore centenas de receitas</p>
      </div>

      <div className={styles.grid}>
        {categories.map((cat, i) => (
          <Link
            key={cat.idCategory}
            to={`/categoria/${encodeURIComponent(cat.strCategory)}`}
            className={styles.card}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <div className={styles.imgWrap}>
              <img src={cat.strCategoryThumb} alt={cat.strCategory} className={styles.img} />
              <div className={styles.imgOverlay} />
            </div>
            <div className={styles.body}>
              <h2 className={styles.name}>{translateCategory(cat.strCategory)}</h2>
              <p className={styles.desc}>
                {cat.strCategoryDescription?.slice(0, 100)}
                {cat.strCategoryDescription?.length > 100 ? '…' : ''}
              </p>
              <span className={styles.cta}>Explorar →</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
