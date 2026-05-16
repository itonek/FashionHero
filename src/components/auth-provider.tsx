"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  role: "buyer" | "seller";
}

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role?: "buyer" | "seller") => Promise<void>;
  register: (data: { email: string; password: string; firstName: string; lastName: string; role?: "buyer" | "seller" }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "stepforward_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, _password: string, role: "buyer" | "seller" = "buyer") => {
    const newUser: User = {
      email,
      firstName: email.split("@")[0],
      lastName: "",
      role,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
  }, []);

  const register = useCallback(async (data: { email: string; password: string; firstName: string; lastName: string; role?: "buyer" | "seller" }) => {
    const newUser: User = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role ?? "buyer",
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
