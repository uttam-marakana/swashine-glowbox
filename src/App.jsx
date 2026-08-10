import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home/Home';
import Products from './pages/Products/Products';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Catalogs from './pages/Catalogs/Catalogs';
import About from './pages/About/About';
import Gallery from './pages/Gallery/Gallery';
import Custom from './pages/Custom/Custom';
import Contact from './pages/Contact/Contact';

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        <Route path="/catalogs" element={<Catalogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/custom" element={<Custom />} />
        <Route path="/contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
