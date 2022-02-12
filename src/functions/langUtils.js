import { STORAGE_LANG_KEY } from '../constants';
import { rtlLangList } from '../static/rtlLangList';
import { isSSR } from './isSSR';

export const storeLocale = (locale) =>
  localStorage.setItem(STORAGE_LANG_KEY, locale);

export const getStoredLocale = () => {
  if (!isSSR) {
    return localStorage.getItem(STORAGE_LANG_KEY);
  }
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

export const findSecondaryLang = (array, code) =>
  array.find((item) => item === code);

export const isRtlLang = (contextLocale) => {
  const isoLangCode = getLangCode(contextLocale);
  return rtlLangList.some((lang) => lang === isoLangCode);
};

export const isDefaultStored = (array, storageItem, defaultLanguage) => {
  const isStored = array.some(
    (lang) => lang === storageItem && lang === defaultLanguage
  );
  return isStored;
};

export const isSecondaryStored = (array, storageItem, defaultLanguage) => {
  const isStored = array.some(
    (lang) => lang === storageItem && lang !== defaultLanguage
  );
  return isStored;
};
