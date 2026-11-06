import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/* Scrolls to hash targets and resets to the top for routes without a hash. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      target?.scrollIntoView({
        behavior: "auto",
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0 });
  }, [pathname, hash]);

  return null;
}
