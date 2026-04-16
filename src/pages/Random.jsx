import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { fetchRandomMeal } from '../utils/api';
import { translateArea, translateCategory } from '../utils/translations';
import styles from './Random.module.css';

export default function Random() {
  const navigate = useNavigate();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadRandom = useCallback(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchRandomMeal()
      .then(data => { if (!cancelled) setMeal(data); })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const cancel = loadRandom();
    return cancel;
  }, [loadRandom]);

  if (loading) return <Loader text="Escolhendo uma receita surpresa..." />;
  if (error) return <ErrorMessage message={error} onRetry={loadRandom} />;
  if (!meal) return null;

  return (
    <main className="container">
      <div className={styles.header}>
        <p className={styles.eyebrow}>✨ Receita Surpresa</p>
        <h1 className={styles.title}>{meal.strMeal}</h1>
        <div className={styles.meta}>
          {meal.strArea && <span className={styles.metaItem}>{translateArea(meal.strArea)}</span>}
          {meal.strCategory && <span className={styles.metaItem}>{translateCategory(meal.strCategory)}</span>}
        </div>
      </div>

      <div className={styles.card}>
        <img src={meal.strMealThumb} alt={meal.strMeal} className={styles.img} />
        <div className={styles.cardBody}>
          <p className={styles.intro}>
            Que tal experimentar algo diferente hoje? Esta receita foi escolhida aleatoriamente para você!
          </p>
          <div className={styles.actions}>
            <button
              className={styles.btnPrimary}
              onClick={() => navigate(`/receita/${meal.idMeal}`)}
            >
              Ver receita completa →
            </button>
            <button className={styles.btnGhost} onClick={loadRandom}>
              🎲 Outra receita
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
