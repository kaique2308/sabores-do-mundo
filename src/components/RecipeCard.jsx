import { Link } from 'react-router-dom';
import { translateCategory, translateArea } from '../utils/translations';
import styles from './RecipeCard.module.css';

export default function RecipeCard({ meal, index = 0 }) {
  const { idMeal, strMeal, strMealThumb, strCategory, strArea } = meal;

  return (
    <Link
      to={`/receita/${idMeal}`}
      className={styles.card}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className={styles.imgWrap}>
        <img src={strMealThumb} alt={strMeal} loading="lazy" className={styles.img} />
        <div className={styles.overlay} />
      </div>
      <div className={styles.body}>
        {(strCategory || strArea) && (
          <div className={styles.tags}>
            {strArea && <span className={styles.tag}>{translateArea(strArea)}</span>}
            {strCategory && <span className={styles.tag}>{translateCategory(strCategory)}</span>}
          </div>
        )}
        <h3 className={styles.title}>{strMeal}</h3>
        <span className={styles.cta}>Ver receita →</span>
      </div>
    </Link>
  );
}
