import {
  STORAGE_THEME_KEY,
  STORAGE_DARK_THEME_VALUE,
  STORAGE_LIGHT_THEME_VALUE,
} from '../constants';

const setStorageItem = (storageValue) =>
  localStorage.setItem(STORAGE_THEME_KEY, storageValue);

const removeClass = (className) =>
  document.documentElement.classList.remove(className);

const addClass = (className) =>
  document.documentElement.classList.add(className);

export const isLightInStorage = () => {
  if (localStorage.getItem(STORAGE_THEME_KEY) === STORAGE_LIGHT_THEME_VALUE) {
    return true;
  }
};

export const isDarkInStorage = () => {
  if (localStorage.getItem(STORAGE_THEME_KEY) === STORAGE_DARK_THEME_VALUE) {
    return true;
  }
};

export const prefersLight = () => {
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: light)').matches
  ) {
    return true;
  }
};

export const prefersDark = () => {
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    return true;
  }
};

export const setLightThemeClass = () => addClass('lightTheme');

export const restoreLightTheme = () => {
  removeClass('darkTheme');
  setLightThemeClass();
};

export const restoreDarkTheme = () => {
  removeClass('lightTheme');
  addClass('darkTheme');
};

export const setLightTheme = () => {
  setStorageItem(STORAGE_LIGHT_THEME_VALUE);
  restoreLightTheme();
};

export const setDarkTheme = () => {
  setStorageItem(STORAGE_DARK_THEME_VALUE);
  restoreDarkTheme();
};
