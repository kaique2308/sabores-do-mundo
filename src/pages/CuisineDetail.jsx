import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { fetchMealsByArea } from '../utils/api';
import { translateArea } from '../utils/translations';
import styles from './CuisineDetail.module.css';

export default function CuisineDetail() {
  const { area } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchMealsByArea(area)
      .then(data => { if (!cancelled) setMeals(data); })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [area]);

  const displayName = translateArea(area);

  return (
    <main className="container">
      <div className={styles.breadcrumb}>
        <Link to="/culinarias">Culinárias</Link>
        <span>/</span>
        <span>{displayName}</span>
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>
          Culinária <em>{displayName}</em>
        </h1>
        {!loading && !error && (
          <p className={styles.count}>{meals.length} receitas encontradas</p>
        )}
      </div>

      {loading && <Loader text={`Buscando receitas da culinária ${displayName}...`} />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && meals.length === 0 && (
        <p className={styles.empty}>Nenhuma receita encontrada para esta culinária.</p>
      )}

      {!loading && !error && (
        <div className={styles.grid}>
          {meals.map((meal, i) => (
            <RecipeCard key={meal.idMeal} meal={{ ...meal, strArea: area }} index={i} />
          ))}
        </div>
      )}
    </main>
  );
}
