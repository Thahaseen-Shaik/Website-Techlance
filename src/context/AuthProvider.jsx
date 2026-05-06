import React, { useEffect, useState } from 'react';
import AuthContext from './authContext';

const SESSION_STORAGE_KEY = 'techlance_session';

const safeRead = (key, fallback) => {
  if (typeof window === 'undefined') {
    return fallback;
  }

  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const safeWrite = (key, value) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
};

const requestJson = async (path, options = {}) => {
  const session = safeRead(SESSION_STORAGE_KEY, null);
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {}),
  };

  if (session?.token) {
    headers.Authorization = `Bearer ${session.token}`;
  }

  const response = await fetch(path, {
    ...options,
    headers,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(payload?.message || 'Something went wrong.');
  }

  return payload;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => safeRead(SESSION_STORAGE_KEY, null)?.user || null);
  const [session, setSession] = useState(() => safeRead(SESSION_STORAGE_KEY, null));
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const verifySession = async () => {
      const storedSession = safeRead(SESSION_STORAGE_KEY, null);

      if (!storedSession?.token) {
        setCurrentUser(null);
        setSession(null);
        setIsAuthReady(true);
        return;
      }

      try {
        const data = await requestJson('/api/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${storedSession.token}`,
          },
        });

        const nextSession = { token: storedSession.token, user: data.user };
        setCurrentUser(data.user);
        setSession(nextSession);
        safeWrite(SESSION_STORAGE_KEY, nextSession);
      } catch {
        setCurrentUser(null);
        setSession(null);
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem(SESSION_STORAGE_KEY);
        }
      } finally {
        setIsAuthReady(true);
      }
    };

    verifySession();
  }, []);

  const register = async ({ name, email, password }) => {
    const payload = await requestJson('/api/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });

    const nextSession = { token: payload.token, user: payload.user };
    setCurrentUser(payload.user);
    setSession(nextSession);
    safeWrite(SESSION_STORAGE_KEY, nextSession);
    return payload.user;
  };

  const login = async ({ email, password }) => {
    const payload = await requestJson('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    const nextSession = { token: payload.token, user: payload.user };
    setCurrentUser(payload.user);
    setSession(nextSession);
    safeWrite(SESSION_STORAGE_KEY, nextSession);
    return payload.user;
  };

  const logout = async () => {
    if (session?.token) {
      try {
        await requestJson('/api/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${session.token}`,
          },
          body: JSON.stringify({}),
        });
      } catch {
        // Ignore logout network errors and clear local session anyway.
      }
    }

    setCurrentUser(null);
    setSession(null);
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  };

  const value = {
    currentUser,
    isAuthenticated: Boolean(currentUser),
    isAuthReady,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
