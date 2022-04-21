import { STORAGE_LANG_KEY } from '../constants';
import { rtlLangList } from '../static/rtlLangList';
import { isSSR } from './isSSR';

const storeLocale = (locale) => localStorage.setItem(STORAGE_LANG_KEY, locale);

const getStoredLocale = () => {
  if (!isSSR) {
    return localStorage.getItem(STORAGE_LANG_KEY);
  }
};

const getLangCode = (string) => {
  const [lang] = string.split('-');
  return lang;
};

const getLangsCode = (array) => array.map((langCode) => getLangCode(langCode));

const getSecondaryLangs = (array) => {
  const secondaryLanguages = array;
  array.shift();

  return secondaryLanguages;
};

const findSecondaryLang = (array, code) => array.find((item) => item === code);

const isRtlLang = (contextLocale) => {
  const isoLangCode = getLangCode(contextLocale);
  return rtlLangList.some((lang) => lang === isoLangCode);
};

const isDefaultStored = (array, storageItem, defaultLocale) => {
  const isStored = array.some(
    (lang) => lang === storageItem && lang === defaultLocale
  );
  return isStored;
};

const isSecondaryStored = (array, storageItem, defaultLocale) => {
  const isStored = array.some(
    (lang) => lang === storageItem && lang !== defaultLocale
  );
  return isStored;
};

export {
  storeLocale,
  getStoredLocale,
  getLangCode,
  getLangsCode,
  getSecondaryLangs,
  findSecondaryLang,
  isRtlLang,
  isDefaultStored,
  isSecondaryStored,
};
