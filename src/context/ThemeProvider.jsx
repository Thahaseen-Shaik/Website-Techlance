import React, { useEffect, useState } from 'react';
import ThemeContext from './themeContext';
import { DEFAULT_THEME } from '../data/themes';

const THEME_STORAGE_KEY = 'techlance_theme';

const safeRead = () => {
  if (typeof window === 'undefined') {
    return DEFAULT_THEME;
  }

  return window.localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(safeRead);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }, [theme]);

  const value = {
    theme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
