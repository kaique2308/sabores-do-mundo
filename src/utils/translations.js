// Traduções de categorias da TheMealDB
export const CATEGORY_PT = {
  Beef: 'Carne Bovina',
  Breakfast: 'Café da Manhã',
  Chicken: 'Frango',
  Dessert: 'Sobremesas',
  Goat: 'Cabrito',
  Lamb: 'Cordeiro',
  Miscellaneous: 'Diversos',
  Pasta: 'Massas',
  Pork: 'Porco',
  Seafood: 'Frutos do Mar',
  Side: 'Acompanhamentos',
  Starter: 'Entradas',
  Vegan: 'Vegano',
  Vegetarian: 'Vegetariano',
};

// Traduções de culinárias/áreas da TheMealDB
export const AREA_PT = {
  American: 'Americana',
  British: 'Britânica',
  Canadian: 'Canadense',
  Chinese: 'Chinesa',
  Croatian: 'Croata',
  Dutch: 'Holandesa',
  Egyptian: 'Egípcia',
  Filipino: 'Filipina',
  French: 'Francesa',
  Greek: 'Grega',
  Indian: 'Indiana',
  Irish: 'Irlandesa',
  Italian: 'Italiana',
  Jamaican: 'Jamaicana',
  Japanese: 'Japonesa',
  Kenyan: 'Queniana',
  Malaysian: 'Malaia',
  Mexican: 'Mexicana',
  Moroccan: 'Marroquina',
  Polish: 'Polonesa',
  Portuguese: 'Portuguesa',
  Russian: 'Russa',
  Spanish: 'Espanhola',
  Thai: 'Tailandesa',
  Tunisian: 'Tunisiana',
  Turkish: 'Turca',
  Ukrainian: 'Ucraniana',
  Unknown: 'Desconhecida',
  Vietnamese: 'Vietnamita',
};

// Emojis de bandeira por culinária
export const AREA_EMOJI = {
  American: '🇺🇸',
  British: '🇬🇧',
  Canadian: '🇨🇦',
  Chinese: '🇨🇳',
  Croatian: '🇭🇷',
  Dutch: '🇳🇱',
  Egyptian: '🇪🇬',
  Filipino: '🇵🇭',
  French: '🇫🇷',
  Greek: '🇬🇷',
  Indian: '🇮🇳',
  Irish: '🇮🇪',
  Italian: '🇮🇹',
  Jamaican: '🇯🇲',
  Japanese: '🇯🇵',
  Kenyan: '🇰🇪',
  Malaysian: '🇲🇾',
  Mexican: '🇲🇽',
  Moroccan: '🇲🇦',
  Polish: '🇵🇱',
  Portuguese: '🇵🇹',
  Russian: '🇷🇺',
  Spanish: '🇪🇸',
  Thai: '🇹🇭',
  Tunisian: '🇹🇳',
  Turkish: '🇹🇷',
  Ukrainian: '🇺🇦',
  Unknown: '🌍',
  Vietnamese: '🇻🇳',
};

// Helpers
export function translateCategory(cat) {
  return CATEGORY_PT[cat] || cat;
}

export function translateArea(area) {
  return AREA_PT[area] || area;
}

export function areaEmoji(area) {
  return AREA_EMOJI[area] || '🌍';
}
