import React, { createContext, useContext, useState, useCallback } from 'react';

const TOKEN_KEY = 'admin_token';
const EMAIL_KEY = 'admin_email';

interface AdminAuthContextValue {
  token: string | null;
  adminEmail: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [adminEmail, setAdminEmail] = useState<string | null>(() => localStorage.getItem(EMAIL_KEY));

  const login = useCallback(async (email: string, password: string) => {
    const res = await fetch('/api/admin/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      throw new Error(data?.error || 'Login failed');
    }
    localStorage.setItem(TOKEN_KEY, data.accessToken);
    localStorage.setItem(EMAIL_KEY, email);
    setToken(data.accessToken);
    setAdminEmail(email);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EMAIL_KEY);
    setToken(null);
    setAdminEmail(null);
  }, []);

  return (
    <AdminAuthContext.Provider value={{ token, adminEmail, isAuthenticated: Boolean(token), login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export function useAdminAuth(): AdminAuthContextValue {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}

export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}
