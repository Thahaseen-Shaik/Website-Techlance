import React, { useEffect, useState } from 'react';
import AuthContext from './authContext';

const USERS_STORAGE_KEY = 'techlance_users';
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

const toHex = (bytes) =>
  Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');

const getRandomToken = () => {
  if (typeof window !== 'undefined' && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `session_${Date.now()}_${Math.random().toString(16).slice(2)}`;
};

const loadUsers = () => {
  const users = safeRead(USERS_STORAGE_KEY, []);
  return Array.isArray(users) ? users : [];
};

const saveUsers = (users) => {
  safeWrite(USERS_STORAGE_KEY, users);
};

const hashPassword = async (password, salt = null) => {
  const resolvedSalt = salt || toHex(window.crypto.getRandomValues(new Uint8Array(16)));
  const encoder = new TextEncoder();
  const data = encoder.encode(`${resolvedSalt}:${password}`);
  if (window.crypto?.subtle) {
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return {
      salt: resolvedSalt,
      passwordHash: toHex(new Uint8Array(digest)),
    };
  }

  return {
    salt: resolvedSalt,
    passwordHash: Array.from(data, (byte, index) => ((byte + index) % 16).toString(16)).join(''),
  };
};

const verifyPassword = async (password, storedHash) => {
  const [salt, passwordHash] = String(storedHash || '').split(':');
  if (!salt || !passwordHash) {
    return false;
  }

  const { passwordHash: candidateHash } = await hashPassword(password, salt);
  return candidateHash === passwordHash;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => safeRead(SESSION_STORAGE_KEY, null)?.user || null);
  const [, setSession] = useState(() => safeRead(SESSION_STORAGE_KEY, null));
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const verifySession = () => {
      const storedSession = safeRead(SESSION_STORAGE_KEY, null);
      const storedUsers = loadUsers();

      if (!storedSession?.token) {
        setCurrentUser(null);
        setSession(null);
        setIsAuthReady(true);
        return;
      }

      const matchedUser = storedUsers.find((user) => user.email === storedSession?.user?.email);

      if (!matchedUser) {
        setCurrentUser(null);
        setSession(null);
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem(SESSION_STORAGE_KEY);
        }
        setIsAuthReady(true);
        return;
      }

      const nextSession = { token: storedSession.token, user: {
        id: matchedUser.id,
        name: matchedUser.name,
        email: matchedUser.email,
      } };

      setCurrentUser(nextSession.user);
      setSession(nextSession);
      safeWrite(SESSION_STORAGE_KEY, nextSession);
      setIsAuthReady(true);
    };

    verifySession();
  }, []);

  const register = async ({ name, email, password }) => {
    const normalizedName = String(name || '').trim();
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const normalizedPassword = String(password || '');

    if (!normalizedName) {
      throw new Error('Please enter your name.');
    }

    if (!normalizedEmail) {
      throw new Error('Please enter your email.');
    }

    if (normalizedPassword.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    const users = loadUsers();
    if (users.some((user) => user.email === normalizedEmail)) {
      throw new Error('An account with this email already exists.');
    }

    const { salt, passwordHash } = await hashPassword(normalizedPassword);
    const user = {
      id: window.crypto?.randomUUID ? window.crypto.randomUUID() : getRandomToken(),
      name: normalizedName,
      email: normalizedEmail,
      passwordHash: `${salt}:${passwordHash}`,
      createdAt: new Date().toISOString(),
    };

    const nextUsers = [...users, user];
    saveUsers(nextUsers);

    const nextSession = {
      token: getRandomToken(),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };

    setCurrentUser(nextSession.user);
    setSession(nextSession);
    safeWrite(SESSION_STORAGE_KEY, nextSession);

    return nextSession.user;
  };

  const login = async ({ email, password }) => {
    const normalizedEmail = String(email || '').trim().toLowerCase();
    const normalizedPassword = String(password || '');
    const users = loadUsers();
    const user = users.find((entry) => entry.email === normalizedEmail);

    if (!user || !(await verifyPassword(normalizedPassword, user.passwordHash))) {
      throw new Error('Invalid email or password.');
    }

    const nextSession = {
      token: getRandomToken(),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };

    setCurrentUser(nextSession.user);
    setSession(nextSession);
    safeWrite(SESSION_STORAGE_KEY, nextSession);
    return nextSession.user;
  };

  const logout = async () => {
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
