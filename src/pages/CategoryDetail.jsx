import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { fetchMealsByCategory } from '../utils/api';
import { translateCategory } from '../utils/translations';
import styles from './CategoryDetail.module.css';

export default function CategoryDetail() {
  const { name } = useParams();
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchMealsByCategory(name)
      .then(data => { if (!cancelled) setMeals(data); })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [name]);

  return (
    <main className="container">
      <div className={styles.breadcrumb}>
        <Link to="/categorias">Categorias</Link>
        <span>/</span>
        <span>{translateCategory(name)}</span>
      </div>

      <div className={styles.header}>
        <h1 className={styles.title}>{translateCategory(name)}</h1>
        {!loading && !error && (
          <p className={styles.count}>{meals.length} receitas encontradas</p>
        )}
      </div>

      {loading && <Loader text={`Buscando receitas de ${translateCategory(name)}...`} />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && meals.length === 0 && (
        <p className={styles.empty}>Nenhuma receita encontrada nessa categoria.</p>
      )}

      {!loading && !error && (
        <div className={styles.grid}>
          {meals.map((meal, i) => (
            <RecipeCard key={meal.idMeal} meal={{ ...meal, strCategory: name }} index={i} />
          ))}
        </div>
      )}
    </main>
  );
}
