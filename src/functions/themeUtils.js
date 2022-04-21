import { STORAGE_THEME_KEY } from '../constants';

const setStorageTheme = (storageValue) =>
  localStorage.setItem(STORAGE_THEME_KEY, storageValue);

const isLightPreferred = () =>
  window?.matchMedia('(prefers-color-scheme: light)').matches;

const removeClass = (className) =>
  document.documentElement.classList.remove(className);

const addClass = (className) =>
  document.documentElement.classList.add(className);

export { setStorageTheme, isLightPreferred, removeClass, addClass };
