import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { searchMeals } from '../utils/api';
import styles from './Search.module.css';

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [inputVal, setInputVal] = useState(query);

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    setInputVal(query);
    if (!query) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    setSearched(false);
    searchMeals(query)
      .then(data => { if (!cancelled) { setMeals(data); setSearched(true); } })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [query]);

  function handleSubmit(e) {
    e.preventDefault();
    const q = inputVal.trim();
    if (q) navigate(`/busca?q=${encodeURIComponent(q)}`);
  }

  return (
    <main className="container">
      <div className={styles.header}>
        <h1 className={styles.title}>Buscar Receitas</h1>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            placeholder="Ex: pasta, chicken, sushi..."
            className={styles.input}
            autoFocus
          />
          <button type="submit" className={styles.btn}>Buscar</button>
        </form>
      </div>

      {loading && <Loader text={`Buscando "${query}"...`} />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && query && searched && (
        <p className={styles.resultInfo}>
          {meals.length > 0
            ? `${meals.length} resultado${meals.length !== 1 ? 's' : ''} para "${query}"`
            : `Nenhum resultado para "${query}"`
          }
        </p>
      )}

      {!loading && !error && meals.length === 0 && searched && (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>🔍</span>
          <p>Tente outro termo ou explore por <a href="/categorias">categorias</a>.</p>
        </div>
      )}

      {!loading && !error && (
        <div className={styles.grid}>
          {meals.map((meal, i) => (
            <RecipeCard key={meal.idMeal} meal={meal} index={i} />
          ))}
        </div>
      )}
    </main>
  );
}
