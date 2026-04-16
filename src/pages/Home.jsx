import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import { fetchCategories, fetchMealsByCategory } from '../utils/api';
import { translateCategory } from '../utils/translations';
import styles from './Home.module.css';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        setLoading(true);
        setError(null);
        const [cats, seafood] = await Promise.all([
          fetchCategories(),
          fetchMealsByCategory('Seafood'),
        ]);
        if (cancelled) return;
        setCategories(cats.slice(0, 12));
        setFeatured(seafood.slice(0, 8));
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  if (loading) return <Loader text="Preparando os ingredientes..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <main>
      {/* Hero */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}>Descubra. Cozinhe. Compartilhe.</p>
            <h1 className={styles.heroTitle}>
              Receitas de<br />
              <em>todo o mundo</em><br />
              na sua cozinha
            </h1>
            <p className={styles.heroSub}>
              Milhares de receitas organizadas por culinária, ingrediente e categoria.
              Da Itália ao Japão — sem fronteiras no prato.
            </p>
            <div className={styles.heroCtas}>
              <Link to="/categorias" className={styles.btnPrimary}>Explorar receitas</Link>
              <Link to="/aleatoria" className={styles.btnGhost}>Surpreenda-me →</Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroImgStack}>
              {featured.slice(0, 3).map((meal, i) => (
                <img
                  key={meal.idMeal}
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className={styles.heroImg}
                  style={{ '--i': i }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.heroDecor} aria-hidden />
      </section>

      {/* Categorias rápidas */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Categorias</h2>
            <Link to="/categorias" className={styles.seeAll}>Ver todas →</Link>
          </div>
          <div className={styles.catGrid}>
            {categories.map(cat => (
              <Link
                key={cat.idCategory}
                to={`/categoria/${encodeURIComponent(cat.strCategory)}`}
                className={styles.catCard}
              >
                <img src={cat.strCategoryThumb} alt={cat.strCategory} className={styles.catImg} />
                <span className={styles.catName}>
                  {translateCategory(cat.strCategory)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Receitas em destaque */}
      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Frutos do Mar em Destaque</h2>
            <Link to="/categoria/Seafood" className={styles.seeAll}>Ver mais →</Link>
          </div>
          <div className={styles.recipeGrid}>
            {featured.map((meal, i) => (
              <RecipeCard key={meal.idMeal} meal={meal} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner de culinárias */}
      <section className={styles.banner}>
        <div className="container">
          <div className={styles.bannerInner}>
            <div>
              <h2 className={styles.bannerTitle}>Explore por Culinária</h2>
              <p className={styles.bannerSub}>Italiana, Japonesa, Mexicana e muito mais</p>
            </div>
            <Link to="/culinarias" className={styles.btnPrimary}>Ver culinárias</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
