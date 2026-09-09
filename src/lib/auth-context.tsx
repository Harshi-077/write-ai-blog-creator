import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "writeai-user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      // ignore
    }
    setIsLoading(false);
  }, []);

  const persist = (u: User | null) => {
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
    setUser(u);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    await simulateDelay(800);
    if (!email.includes("@") || password.length < 4) return false;
    persist({ id: crypto.randomUUID(), name: email.split("@")[0] || email, email });
    return true;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    await simulateDelay(800);
    if (!name || !email.includes("@") || password.length < 4) return false;
    persist({ id: crypto.randomUUID(), name, email });
    return true;
  };

  const logout = () => persist(null);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

function simulateDelay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
