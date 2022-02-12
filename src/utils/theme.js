import {
  STORAGE_DARK_THEME_VALUE,
  STORAGE_LIGHT_THEME_VALUE,
  STORAGE_THEME_KEY,
} from '../constants';

const HTML = document.documentElement;

export const setTheme = {
  setStorageItem: function () {
    localStorage.setItem(STORAGE_THEME_KEY, this.storageValue);
  },
  removeClass: function () {
    HTML.classList.remove(this.classToRemove);
  },
  addClass: function () {
    HTML.classList.add(this.classToAdd);
  },
  setLightThemeClass: function () {
    this.addClass.call({ classToAdd: 'lightTheme' });
  },
  restoreLightTheme: function () {
    this.removeClass.call({ classToRemove: 'darkTheme' });
    this.setLightThemeClass();
  },
  restoreDarkTheme: function () {
    this.removeClass.call({ classToRemove: 'lightTheme' });
    this.addClass.call({ classToAdd: 'darkTheme' });
  },
  setLightTheme: function () {
    this.setStorageItem.call({ storageValue: STORAGE_LIGHT_THEME_VALUE });
    this.restoreLightTheme();
  },
  setDarkTheme: function () {
    this.setStorageItem.call({ storageValue: STORAGE_DARK_THEME_VALUE });
    this.restoreDarkTheme();
  },
};
