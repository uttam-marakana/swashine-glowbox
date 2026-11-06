import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  onAuthStateChanged,
  getIdTokenResult,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "@/services/firebase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return undefined;
    }
    let active = true;
    const unsub = onAuthStateChanged(
      auth,
      async (u) => {
        setUser(u);
        setLoading(true);
        if (!u) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        try {
          const token = await getIdTokenResult(u);
          if (active && auth.currentUser?.uid === u.uid) {
            setIsAdmin(token.claims.admin === true);
          }
        } catch (error) {
          console.error("Failed to verify admin role:", error);
          if (active && auth.currentUser?.uid === u.uid) setIsAdmin(false);
        } finally {
          if (active && auth.currentUser?.uid === u.uid) setLoading(false);
        }
      },
      (error) => {
        console.error("Firebase authentication state failed:", error);
        if (active) {
          setUser(null);
          setIsAdmin(false);
          setLoading(false);
        }
      },
    );
    return () => {
      active = false;
      unsub();
    };
  }, []);

  const login = useCallback((email, password) => {
    if (!auth) return Promise.reject(new Error("Firebase Auth not configured"));
    return signInWithEmailAndPassword(auth, email, password);
  }, []);

  const logout = useCallback(() => {
    if (!auth) {
      setUser(null);
      return Promise.resolve();
    }
    return signOut(auth);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAdmin, loading, login, logout, isFirebaseConfigured }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
