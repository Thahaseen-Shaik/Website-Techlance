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

const makeId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => safeRead(USERS_STORAGE_KEY, []));
  const [currentUser, setCurrentUser] = useState(() => safeRead(SESSION_STORAGE_KEY, null));

  useEffect(() => {
    safeWrite(USERS_STORAGE_KEY, users);
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      safeWrite(SESSION_STORAGE_KEY, currentUser);
    } else if (typeof window !== 'undefined') {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
    }
  }, [currentUser]);

  const register = ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedName = name.trim();

    if (!normalizedName) {
      throw new Error('Please enter your name.');
    }

    if (!normalizedEmail) {
      throw new Error('Please enter your email.');
    }

    if (!password || password.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    const existingUser = users.find((user) => user.email === normalizedEmail);
    if (existingUser) {
      throw new Error('An account with this email already exists.');
    }

    const newUser = {
      id: makeId(),
      name: normalizedName,
      email: normalizedEmail,
      password,
    };

    setUsers((current) => [...current, newUser]);
    setCurrentUser({ id: newUser.id, name: newUser.name, email: newUser.email });
    return newUser;
  };

  const login = ({ email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    const matchedUser = users.find((user) => user.email === normalizedEmail && user.password === password);

    if (!matchedUser) {
      throw new Error('Invalid email or password.');
    }

    const session = { id: matchedUser.id, name: matchedUser.name, email: matchedUser.email };
    setCurrentUser(session);
    return session;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    isAuthenticated: Boolean(currentUser),
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

