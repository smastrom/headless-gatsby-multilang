import React, { useState, createContext, useRef, useEffect } from 'react';
import { setTheme } from '../utils/theme';
import { isSSR } from '../utils/misc';

export const ThemeContext = createContext({});

const ThemeProvider = ({ children }) => {
  const skipInitialRender = useRef(true);

  const [isDark, setIsDark] = useState(() => {
    if (isSSR) {
      setTheme.setLightThemeClass();
      return false;
    }
    if (localStorage.getItem('theme') === 'light') {
      setTheme.restoreLightTheme();
      return false;
    }
    if (localStorage.getItem('theme') === 'dark') {
      setTheme.restoreDarkTheme();
      return true;
    }
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: light)').matches
    ) {
      setTheme.setLightTheme();
      return false;
    }
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      setTheme.setDarkTheme();
      return true;
    }
    setTheme.setLightThemeClass();
    return false;
  });

  useEffect(() => {
    if (skipInitialRender.current) {
      skipInitialRender.current = false;
    } else if (isDark) {
      setTheme.setDarkTheme();
    } else {
      setTheme.setLightTheme();
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        setIsDark,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
