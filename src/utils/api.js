// Hook centralizado para chamadas à TheMealDB API (gratuita, sem chave)
// Docs: https://www.themealdb.com/api.php

const BASE = 'https://www.themealdb.com/api/json/v1/1';

export async function fetchMealsByCategory(category) {
  const res = await fetch(`${BASE}/filter.php?c=${encodeURIComponent(category)}`);
  if (!res.ok) throw new Error('Erro ao buscar receitas');
  const data = await res.json();
  return data.meals || [];
}

export async function fetchMealById(id) {
  const res = await fetch(`${BASE}/lookup.php?i=${id}`);
  if (!res.ok) throw new Error('Receita não encontrada');
  const data = await res.json();
  return data.meals?.[0] || null;
}

export async function fetchCategories() {
  const res = await fetch(`${BASE}/categories.php`);
  if (!res.ok) throw new Error('Erro ao buscar categorias');
  const data = await res.json();
  return data.categories || [];
}

export async function searchMeals(query) {
  const res = await fetch(`${BASE}/search.php?s=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error('Erro na busca');
  const data = await res.json();
  return data.meals || [];
}

export async function fetchRandomMeal() {
  const res = await fetch(`${BASE}/random.php`);
  if (!res.ok) throw new Error('Erro ao buscar receita aleatória');
  const data = await res.json();
  return data.meals?.[0] || null;
}

export async function fetchMealsByArea(area) {
  const res = await fetch(`${BASE}/filter.php?a=${encodeURIComponent(area)}`);
  if (!res.ok) throw new Error('Erro ao buscar por área');
  const data = await res.json();
  return data.meals || [];
}

export async function fetchAreas() {
  const res = await fetch(`${BASE}/list.php?a=list`);
  if (!res.ok) throw new Error('Erro ao buscar áreas');
  const data = await res.json();
  return (data.meals || []).map(m => m.strArea);
}

// Extrai ingredientes e medidas de um objeto de receita da API
export function parseIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push({ ingredient: ing.trim(), measure: (measure || '').trim() });
    }
  }
  return ingredients;
}
