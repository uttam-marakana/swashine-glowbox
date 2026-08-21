import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
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

import RequireAdmin from "./components/admin/RequireAdmin";
import AdminLayout from "./layouts/AdminLayout";
import AdminLogin from "./pages/Admin/Login/Login";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import Inquiries from "./pages/Admin/Inquiries/Inquiries";
import ProductsAdmin from "./pages/Admin/Products/ProductsAdmin";
import ProductEdit from "./pages/Admin/ProductEdit/ProductEdit";
import InstagramAdmin from "./pages/Admin/Instagram/InstagramAdmin";
import FaqsAdmin from "./pages/Admin/Faqs/FaqsAdmin";
import CatalogsAdmin from "./pages/Admin/Catalogs/CatalogsAdmin";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public site */}
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

        {/* Admin — no MainLayout (header/footer) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="inquiries" element={<Inquiries />} />
          <Route path="products" element={<ProductsAdmin />} />
          <Route path="products/:id" element={<ProductEdit />} />
          <Route path="instagram" element={<InstagramAdmin />} />
          <Route path="faqs" element={<FaqsAdmin />} />
          <Route path="catalogs" element={<CatalogsAdmin />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
