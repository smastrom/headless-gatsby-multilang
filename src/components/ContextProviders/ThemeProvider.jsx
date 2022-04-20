import { useState, createContext, useEffect, useCallback } from 'react';

import {
  isLightPreferred,
  addClass,
  removeClass,
  setStorageTheme,
} from '../../functions/themeUtils';
import { isSSR } from '../../functions/isSSR';
import {
  STORAGE_DARK_THEME_VALUE,
  STORAGE_LIGHT_THEME_VALUE,
  LIGHT_THEME_CLASSNAME,
  DARK_THEME_CLASSNAME,
} from '../../constants';

const ThemeContext = createContext({});

const ThemeProvider = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (!isSSR) {
      if (!localStorage.theme) {
        if (isLightPreferred()) {
          setStorageTheme(STORAGE_LIGHT_THEME_VALUE);
          addClass(LIGHT_THEME_CLASSNAME);
          return false;
        }
        setStorageTheme(STORAGE_DARK_THEME_VALUE);
        addClass(DARK_THEME_CLASSNAME);
        return true;
      }
      if (localStorage.theme === STORAGE_LIGHT_THEME_VALUE) {
        addClass(LIGHT_THEME_CLASSNAME);
        return false;
      }
      addClass(DARK_THEME_CLASSNAME);
      return true;
    }
  });

  const handleDarkModeSwitch = useCallback(() => {
    if (isDark) {
      setStorageTheme(STORAGE_LIGHT_THEME_VALUE);
      removeClass(DARK_THEME_CLASSNAME);
      addClass(LIGHT_THEME_CLASSNAME);
      setIsDark(false);
    } else {
      setStorageTheme(STORAGE_DARK_THEME_VALUE);
      removeClass(LIGHT_THEME_CLASSNAME);
      addClass(DARK_THEME_CLASSNAME);
      setIsDark(true);
    }
  }, [isDark]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <ThemeContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        isDark,
        handleDarkModeSwitch,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
