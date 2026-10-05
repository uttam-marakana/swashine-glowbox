import { Outlet } from "react-router-dom";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import ScrollToTop from "@/components/global/ScrollToTop";
import StickyWhatsApp from "@/components/global/StickyWhatsApp";
import { useAdminRouteGuard } from "@/hooks/useAdminRouteGuard";

export default function MainLayout() {
  useAdminRouteGuard();

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="w-full min-w-0 flex-1">
        <Outlet />
      </main>
      <Footer />
      <StickyWhatsApp />
    </div>
  );
}
