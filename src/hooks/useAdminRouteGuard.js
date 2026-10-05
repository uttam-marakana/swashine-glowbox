import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

function isAdminPath(pathname) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

/* If Firebase admin is logged in and the user opens any public route,
  force signOut so /admin cannot be opened again without login. */
export function useAdminRouteGuard() {
  const { user, loading, logout } = useAuth();
  const location = useLocation();
  const loggingOut = useRef(false);

  useEffect(() => {
    if (loading || !user) return;
    if (isAdminPath(location.pathname)) return;
    if (loggingOut.current) return;

    loggingOut.current = true;
    logout()
      .catch((e) => console.warn("Admin auto-logout failed", e))
      .finally(() => {
        loggingOut.current = false;
      });
  }, [location.pathname, user, loading, logout]);
}
