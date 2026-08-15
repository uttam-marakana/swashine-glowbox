import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Catalogs from "./pages/Catalogs/Catalogs";
import About from "./pages/About/About";
import Gallery from "./pages/Gallery/Gallery";
import Custom from "./pages/Custom/Custom";
import Contact from "./pages/Contact/Contact";
import HowItWorks from "./pages/HowItWorks/HowItWorks";
import Faq from "./pages/Faq/Faq";
import Dealers from "./pages/Dealers/Dealers";
import Reviews from "./pages/Reviews/Reviews";

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
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/dealers" element={<Dealers />} />
        <Route path="/reviews" element={<Reviews />} />
      </Route>
    </Routes>
  );
}
