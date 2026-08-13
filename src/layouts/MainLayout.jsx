import { Outlet } from 'react-router-dom';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import ScrollToTop from '@/components/global/ScrollToTop';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}