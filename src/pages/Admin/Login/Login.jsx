import { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function AdminLogin() {
  const { login, logout, user, isAdmin, loading, isFirebaseConfigured } =
    useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (!loading && user && isAdmin) return <Navigate to="/admin" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(email.trim(), password);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setBusy(false);
    }
  };

  const onLogout = async () => {
    setError("");
    try {
      await logout();
    } catch (err) {
      setError(err.message || "Sign out failed");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md bg-white/[0.04] border border-white/10 rounded-3xl p-8 space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">Admin Login</h1>
        {!loading && user && !isAdmin && (
          <div className="space-y-3">
            <p className="text-amber-400 text-sm text-center">
              This account is signed in but is not authorized as an admin.
            </p>
            <button
              type="button"
              onClick={onLogout}
              className="w-full rounded-xl border border-white/15 py-2 text-sm text-zinc-300"
            >
              Sign out
            </button>
          </div>
        )}
        {location.state?.unauthorized && !user && (
          <p className="text-amber-400 text-sm text-center">
            An admin role is required to access that page.
          </p>
        )}
        {!isFirebaseConfigured && (
          <p className="text-amber-400 text-sm text-center">
            Set VITE_FIREBASE_* keys in .env and enable Email/Password auth.
          </p>
        )}
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-sm"
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl bg-zinc-900 border border-zinc-700 px-4 py-3 text-sm"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={busy || Boolean(user)}
          className="w-full rounded-xl bg-brand-500 text-black font-semibold py-3 disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
