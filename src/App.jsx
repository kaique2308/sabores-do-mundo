import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Categories from './pages/Categories';
import CategoryDetail from './pages/CategoryDetail';
import Cuisines from './pages/Cuisines';
import CuisineDetail from './pages/CuisineDetail';
import RecipeDetail from './pages/RecipeDetail';
import Search from './pages/Search';
import Random from './pages/Random';
import NotFound from './pages/NotFound';

import './styles/global.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categorias" element={<Categories />} />
        <Route path="/categoria/:name" element={<CategoryDetail />} />
        <Route path="/culinarias" element={<Cuisines />} />
        <Route path="/culinaria/:area" element={<CuisineDetail />} />
        <Route path="/receita/:id" element={<RecipeDetail />} />
        <Route path="/busca" element={<Search />} />
        <Route path="/aleatoria" element={<Random />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
