import React, { useEffect, useState } from 'react';
import { graphql, useStaticQuery, navigate } from 'gatsby';
import { useLocation } from '@reach/router';
import useLanguages from '../../hooks/useLanguages';
import preferredLang from '../../utils/preferredLang';
import {
  storeLocale,
  getStoredLocale,
  findStringMatch,
  getSecondaryLangs,
  findMatch,
  isDefaultStored,
  isSecondaryStored,
} from '../../utils/misc';
import { is404 } from '../../utils/is404';

const Redirect = ({ children }) => {
  const [mounted, setMounted] = useState(true);
  return (
    <>
      {mounted && <Trigger setMounted={setMounted} />}
      {children}
    </>
  );
};

export default Redirect;

const Trigger = ({ setMounted }) => {
  const data = useStaticQuery(graphql`
    query {
      datoCmsSite {
        locales
      }
    }
  `);
  const { href, pathname } = useLocation();
  const { defaultLanguage } = useLanguages();

  useEffect(() => {
    (async () => {
      const {
        datoCmsSite: { locales },
      } = data;
      const appLangCodes = [...locales];
      const browserLangCodes = navigator.languages;
      const visitsRoot = pathname.length === 1;

      try {
        const notFound = await is404(href);
        if (notFound) return;

        const storedLocale = getStoredLocale();
        const isDefaultLangStored = isDefaultStored(
          appLangCodes,
          storedLocale,
          defaultLanguage
        );
        if (isDefaultLangStored && visitsRoot) return;

        const isSecondaryLangStored = isSecondaryStored(
          appLangCodes,
          storedLocale,
          defaultLanguage
        );
        if (isSecondaryLangStored && visitsRoot) {
          navigate(`/${storedLocale}`);
          return;
        }

        if (!storedLocale && visitsRoot) {
          const matchingLangCode = preferredLang(
            browserLangCodes,
            appLangCodes
          );

          const defaultLanguageMatch = findStringMatch(
            defaultLanguage,
            matchingLangCode
          );
          if (defaultLanguageMatch) {
            storeLocale(defaultLanguage);
            return;
          }

          const secondaryLanguages = getSecondaryLangs(appLangCodes);
          const secondaryLanguageMatch = findMatch(
            secondaryLanguages,
            matchingLangCode
          );
          if (secondaryLanguageMatch) {
            storeLocale(secondaryLanguageMatch);
            navigate(`/${secondaryLanguageMatch}`);
            return;
          }
        }

        const pathLangCode = pathname.split('/')[1];
        const visitsSecondary = appLangCodes.some(
          (lang) => lang === pathLangCode
        );
        if (!storedLocale && visitsSecondary) {
          storeLocale(pathname.slice(1));
          return;
        }

        storeLocale(defaultLanguage);
      } catch {
      } finally {
        setMounted(false);
      }
    })();
  }, [data, defaultLanguage, pathname, href, setMounted]);

  return null;
};
