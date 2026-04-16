import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { fetchMealById, parseIngredients } from '../utils/api';
import { translateArea, translateCategory } from '../utils/translations';
import styles from './RecipeDetail.module.css';

export default function RecipeDetail() {
  const { id } = useParams();
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkedSteps, setCheckedSteps] = useState({});

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    setCheckedSteps({});
    fetchMealById(id)
      .then(data => { if (!cancelled) setMeal(data); })
      .catch(e => { if (!cancelled) setError(e.message); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <Loader text="Buscando receita..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!meal) return <ErrorMessage message="Receita não encontrada." />;

  const ingredients = parseIngredients(meal);
  const steps = meal.strInstructions
    ? meal.strInstructions
        .split(/\r?\n/)
        .map(s => s.trim())
        .filter(s => s.length > 10)
    : [];

  function toggleStep(idx) {
    setCheckedSteps(prev => ({ ...prev, [idx]: !prev[idx] }));
  }

  return (
    <main className="container">
      {/* Breadcrumb */}
      <div className={styles.breadcrumb}>
        <Link to="/">Início</Link>
        <span>/</span>
        {meal.strCategory && (
          <>
            <Link to={`/categoria/${encodeURIComponent(meal.strCategory)}`}>{translateCategory(meal.strCategory)}</Link>
            <span>/</span>
          </>
        )}
        <span>{meal.strMeal}</span>
      </div>

      {/* Hero do prato */}
      <div className={styles.hero}>
        <div className={styles.heroText}>
          <div className={styles.tags}>
            {meal.strArea && (
              <Link to={`/culinaria/${encodeURIComponent(meal.strArea)}`} className={styles.tag}>
                {translateArea(meal.strArea)}
              </Link>
            )}
            {meal.strCategory && (
              <Link to={`/categoria/${encodeURIComponent(meal.strCategory)}`} className={styles.tag}>
                {translateCategory(meal.strCategory)}
              </Link>
            )}
          </div>
          <h1 className={styles.title}>{meal.strMeal}</h1>

          {meal.strYoutube && (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ytBtn}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/>
              </svg>
              Ver vídeo no YouTube
            </a>
          )}

          {meal.strSource && (
            <a href={meal.strSource} target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
              Fonte original ↗
            </a>
          )}
        </div>

        <div className={styles.heroImg}>
          <img src={meal.strMealThumb} alt={meal.strMeal} />
        </div>
      </div>

      {/* Conteúdo */}
      <div className={styles.content}>
        {/* Ingredientes */}
        <aside className={styles.sidebar}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Ingredientes</h2>
            <p className={styles.cardSub}>{ingredients.length} itens</p>
            <ul className={styles.ingredientList}>
              {ingredients.map(({ ingredient, measure }, i) => (
                <li key={i} className={styles.ingredientItem}>
                  <img
                    src={`https://www.themealdb.com/images/ingredients/${encodeURIComponent(ingredient)}-Small.png`}
                    alt={ingredient}
                    className={styles.ingImg}
                    onError={e => { e.target.style.display = 'none'; }}
                  />
                  <span className={styles.ingName}>{ingredient}</span>
                  {measure && <span className={styles.ingMeasure}>{measure}</span>}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Instruções */}
        <section className={styles.instructions}>
          <h2 className={styles.sectionTitle}>Modo de Preparo</h2>
          {steps.length > 0 ? (
            <ol className={styles.steps}>
              {steps.map((step, i) => (
                <li
                  key={i}
                  className={`${styles.step} ${checkedSteps[i] ? styles.done : ''}`}
                  onClick={() => toggleStep(i)}
                >
                  <span className={styles.stepNum}>{i + 1}</span>
                  <p className={styles.stepText}>{step}</p>
                  <span className={styles.stepCheck} aria-hidden>
                    {checkedSteps[i] ? '✓' : ''}
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p className={styles.noSteps}>
              {meal.strInstructions || 'Instruções não disponíveis.'}
            </p>
          )}
        </section>
      </div>

      {/* Tags */}
      {meal.strTags && (
        <div className={styles.tagSection}>
          <span className={styles.tagLabel}>Tags:</span>
          {meal.strTags.split(',').map(t => t.trim()).filter(Boolean).map(t => (
            <span key={t} className={styles.tagPill}>{t}</span>
          ))}
        </div>
      )}
    </main>
  );
}
