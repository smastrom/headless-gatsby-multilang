import intersection from 'lodash.intersection';
import { getLangsCode } from './misc';

const preferredLang = (appLangCodes, browserLangCodes) => {
  let matchingLangCodes;

  /**
   * First we try to find a match among both ITEF and ISO lang codes returned from Dato
   * and the browser available languages (IT-it, en, ES-es..)
   */

  matchingLangCodes = intersection(appLangCodes, browserLangCodes);

  /**
   * If there is no match (e.g. "en-GB" === "en-GB" || "en === "en"),
   * we convert ITEF lang codes (it-IT) to ISO (it) and we extend the search among
   * both code schemas ("en-US" === "en-GB" === "en")
   */

  const noMatchingItefLangCodes = matchingLangCodes.length === 0;

  if (noMatchingItefLangCodes && browserLangCodes.length > 0) {
    matchingLangCodes = intersection(
      getLangsCode(appLangCodes),
      getLangsCode(browserLangCodes)
    );
  }

  if (matchingLangCodes.length === 0) {
    return null;
  }

  return matchingLangCodes[0];
};

export default preferredLang;
