import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type SportcastUser = {
  name: string;
  email: string;
  favorites: string[];
};

type AuthValue = {
  user: SportcastUser | null;
  ready: boolean;
  signIn: (email: string, name?: string) => void;
  signOut: () => void;
  toggleFavorite: (teamId: string) => void;
};

const STORAGE_KEY = "sportcast.user";

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SportcastUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as SportcastUser);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const persist = useCallback((next: SportcastUser | null) => {
    setUser(next);
    if (next) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    else window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo<AuthValue>(
    () => ({
      user,
      ready,
      signIn: (email, name) =>
        persist({
          name: name?.trim() || (email.split("@")[0] ?? "fan").replace(/[._-]/g, " "),
          email,
          favorites: ["man-city", "lakers"],
        }),
      signOut: () => persist(null),
      toggleFavorite: (teamId) => {
        if (!user) return;
        const favorites = user.favorites.includes(teamId)
          ? user.favorites.filter((f) => f !== teamId)
          : [...user.favorites, teamId];
        persist({ ...user, favorites });
      },
    }),
    [user, ready, persist],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
