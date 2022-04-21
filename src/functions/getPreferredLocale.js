import { getLangCode } from './localeUtils';

export const getPreferredLocale = (browserLangCodes, appLangCodes) => {
  if (browserLangCodes.length < 1 || appLangCodes.length < 1) {
    throw new Error('Unable to retrieve language codes.');
  }

  let matchingLangCode;

  browserLangCodes.some((browserLang) => {
    const findIetfLangCode = appLangCodes.find(
      (appLangCode) => appLangCode === browserLang
    );
    if (typeof findIetfLangCode === 'string') {
      matchingLangCode = findIetfLangCode;
    } else if (!findIetfLangCode) {
      const findFullLangCode = appLangCodes.find(
        (appLangCode) => getLangCode(appLangCode) === getLangCode(browserLang)
      );
      if (typeof findFullLangCode === 'string') {
        matchingLangCode = findFullLangCode;
      }
    }

    return typeof matchingLangCode === 'string';
  });

  return matchingLangCode;
};
