# 🍳 Sabores do Mundo

> Explore receitas de todo o planeta, uma cozinha por vez.

Aplicação React que consome a [TheMealDB API](https://www.themealdb.com/api.php) (gratuita, sem chave) para exibir receitas organizadas por categoria e culinária, com busca, rota aleatória e página detalhada de cada prato com video para aprender a realizar a resceita.

---

## 📸 Prints
**Página inicial**

<img width="1366" height="768" alt="Página Inicial" src="https://github.com/user-attachments/assets/93af5621-58e5-400b-a443-626900d9ef63" />
**Página de categorias**

<img width="1366" height="768" alt="Página de Categorias" src="https://github.com/user-attachments/assets/5ce0cc43-51f4-45a4-bd49-f716708266e8" />
**Página de uma Receita**

<img width="1366" height="768" alt="Receita" src="https://github.com/user-attachments/assets/2cb0f314-1fe9-4694-a040-9ead36d19a6b" />
<img width="1366" height="768" alt="Modo de Preparo" src="https://github.com/user-attachments/assets/017640ef-a47a-42eb-b786-8b1b6732ea95" />
**Página de Culinárias**

<img width="1366" height="768" alt="Página de Culinárias" src="https://github.com/user-attachments/assets/4c142eee-c7ed-4561-b4b2-2f535e24ac50" />






---

## 🔗 Acesso Online

> **[https://sabores-do-mundo-marinha.vercel.app](https://sabores-do-mundo-marinha.vercel.app)**

---

## 🧱 Arquitetura da Aplicação

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Navbar.jsx       # Header com navegação e busca
│   ├── Footer.jsx       # Rodapé com links
│   ├── RecipeCard.jsx   # Card de receita (usado nas grids)
│   ├── Loader.jsx       # Spinner de carregamento
│   └── ErrorMessage.jsx # Exibição de erros
│
├── pages/               # Uma página por rota
│   ├── Home.jsx         # / — Página inicial
│   ├── Categories.jsx   # /categorias — Lista de categorias
│   ├── CategoryDetail.jsx  # /categoria/:name — Rota dinâmica
│   ├── Cuisines.jsx     # /culinarias — Lista de culinárias
│   ├── CuisineDetail.jsx   # /culinaria/:area — Rota dinâmica
│   ├── RecipeDetail.jsx    # /receita/:id — Rota dinâmica
│   ├── Search.jsx       # /busca?q= — Busca por termo
│   ├── Random.jsx       # /aleatoria — Receita aleatória
│   └── NotFound.jsx     # * — Página 404
│
├── utils/
│   └── api.js           # Funções de fetch para TheMealDB API
│
├── styles/
│   └── global.css       # Design tokens + reset global
│
├── App.jsx              # BrowserRouter + Routes
└── index.js             # Entry point React
```

### Fluxo de dados

```
TheMealDB API (REST, gratuita)
        │
        ▼
  utils/api.js  ←── funções isoladas por endpoint
        │
        ▼
  Pages (useState + useEffect)
        │
        ▼
  Components (RecipeCard, Loader, ErrorMessage...)
        │
        ▼
  Usuário (Browser)
```

### Rotas da aplicação

| Rota | Tipo | Página |
|------|------|--------|
| `/` | Estática | Home |
| `/categorias` | Estática | Lista de categorias |
| `/categoria/:name` | **Dinâmica** | Receitas por categoria |
| `/culinarias` | Estática | Lista de culinárias |
| `/culinaria/:area` | **Dinâmica** | Receitas por área |
| `/receita/:id` | **Dinâmica** | Detalhes da receita |
| `/busca` | Estática (query param) | Resultados de busca |
| `/aleatoria` | Estática | Receita aleatória |

---

## 🛠 Tecnologias Utilizadas

| Tecnologia | Versão | Uso |
|-----------|--------|-----|
| React | 18.x | UI e componentização |
| React Router DOM | 6.x | Roteamento SPA e rotas dinâmicas |
| CSS Modules | — | Estilos escopados por componente |
| TheMealDB API | v1 | Dados de receitas (gratuita, sem auth) |
| Vercel / Netlify | — | Deploy e hospedagem |

---

## ⚙️ Como rodar localmente

### Pré-requisitos

- Node.js >= 16
- npm >= 8

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/sabores-do-mundo.git
cd sabores-do-mundo
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o servidor de desenvolvimento

```bash
npm start
```

A aplicação abrirá em [http://localhost:3000].

### 4. Build de produção

```bash
npm run build
```

Os arquivos otimizados ficam na pasta `build/`.

---

## 🚀 Deploy

### Vercel (recomendado)

```bash
npm install -g vercel
vercel --prod
```

Ou conecte o repositório GitHub diretamente no painel da [Vercel](https://vercel.com).

### Netlify

```bash
npm run build
# Faça upload da pasta build/ no painel do Netlify
# ou use o Netlify CLI:
netlify deploy --prod --dir=build
```

> **Atenção:** como o app usa React Router com `BrowserRouter`, configure o redirect para `index.html` em todas as rotas:
> - Vercel: crie `vercel.json` com rewrites
> - Netlify: crie `public/_redirects` com `/* /index.html 200`

---

## 📡 API Utilizada

**TheMealDB** — [https://www.themealdb.com/api.php]

- ✅ Gratuita
- ✅ Sem necessidade de chave de API
- ✅ Sem limite de requisições para uso básico

Endpoints usados:

```
GET /api/json/v1/1/categories.php          → Lista todas as categorias
GET /api/json/v1/1/filter.php?c={cat}      → Receitas por categoria
GET /api/json/v1/1/filter.php?a={area}     → Receitas por área/culinária
GET /api/json/v1/1/lookup.php?i={id}       → Detalhes de uma receita
GET /api/json/v1/1/search.php?s={query}    → Busca por nome
GET /api/json/v1/1/random.php              → Receita aleatória
GET /api/json/v1/1/list.php?a=list         → Lista de áreas/culinárias
```

---

## ✅ Checklist de requisitos

- [x] Aplicação em React
- [x] Consome API externa (TheMealDB)
- [x] Exibe dados da API na interface
- [x] Rotas dinâmicas (`/categoria/:name`, `/culinaria/:area`, `/receita/:id`)
- [x] Links internos navegáveis
- [x] Mais de uma página interna
- [x] Aplicação hospedada online
- [x] README com orientações de uso
- [x] Tecnologias documentadas
- [x] Arquitetura desenhada no README
- [x] Código versionado no GitHub

---

## 📁 Estrutura de arquivos

```
sabores-do-mundo/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   ├── styles/
│   ├── App.jsx
│   └── index.js
├── package.json
└── README.md
```

---

## 👤 Autor

Feito por **Kaique Campos de Oliveira** para a disciplina de Desenvolvimento Web.
