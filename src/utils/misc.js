import { STORAGE_LANG_KEY } from '../constants';

export const isSSR = typeof window === 'undefined';

export const storeLocale = (locale) =>
  localStorage.setItem(STORAGE_LANG_KEY, locale);

export const getStoredLocale = () => {
  if (!isSSR) {
    return localStorage.getItem(STORAGE_LANG_KEY);
  }
};

export const isDefaultStored = (array, storageItem, defaultLanguage) => {
  const isSaved = array.some(
    (lang) => lang === storageItem && lang === defaultLanguage
  );
  return isSaved;
};

export const isSecondaryStored = (array, storageItem, defaultLanguage) => {
  const isSaved = array.some(
    (lang) => lang === storageItem && lang !== defaultLanguage
  );
  return isSaved;
};

export const getLangCode = (string) => {
  const [lang] = string.split('-');
  return lang;
};

export const getLangsCode = (array) =>
  array.map((langCode) => getLangCode(langCode));

export const getSecondaryLangs = (array) => {
  const secondaryLanguages = array;
  array.shift();

  return secondaryLanguages;
};

export const findMatch = (array, isoCode) =>
  array.find((item) => item.startsWith(isoCode));

export const findStringMatch = (item, isoCode) => item.startsWith(isoCode);
