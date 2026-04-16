import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { fetchAreas } from '../utils/api';
import { translateArea, areaEmoji } from '../utils/translations';
import styles from './Cuisines.module.css';

export default function Cuisines() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetchAreas()
      .then(data => { if (!cancelled) setAreas(data); })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  if (loading) return <Loader text="Carregando culinárias..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main className="container">
      <div className={styles.header}>
        <h1 className={styles.title}>Culinárias do Mundo</h1>
        <p className={styles.sub}>De paladar em paladar — explore a culinária de cada país</p>
      </div>

      <div className={styles.grid}>
        {areas.map((area, i) => (
          <Link
            key={area}
            to={`/culinaria/${encodeURIComponent(area)}`}
            className={styles.card}
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <span className={styles.emoji}>{areaEmoji(area)}</span>
            <div className={styles.texts}>
              <span className={styles.name}>{translateArea(area)}</span>
            </div>
            <span className={styles.arrow}>→</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
