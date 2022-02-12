import React, { useState, createContext, useRef, useEffect } from 'react';
import {
  isLightInStorage,
  isDarkInStorage,
  prefersDark,
  prefersLight,
  setLightThemeClass,
  restoreLightTheme,
  restoreDarkTheme,
  setLightTheme,
  setDarkTheme,
} from '../../functions/setTheme';
import { isSSR } from '../../functions/isSSR';

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    if (isSSR) {
      return false;
    }
    if (isLightInStorage()) {
      restoreLightTheme();
      return false;
    }
    if (isDarkInStorage()) {
      restoreDarkTheme();
      return true;
    }
    if (prefersLight()) {
      setLightTheme();
      return false;
    }
    if (prefersDark()) {
      setDarkTheme();
      return true;
    }
    setLightThemeClass();
    return false;
  });

  const skipInitialRender = useRef(true);

  useEffect(() => {
    if (skipInitialRender.current) {
      skipInitialRender.current = false;
    } else if (isDark) {
      setDarkTheme();
    } else {
      setLightTheme();
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
