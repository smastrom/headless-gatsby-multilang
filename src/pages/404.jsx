import { graphql, Link, useStaticQuery } from 'gatsby';

import { Hero } from '../components/Layout/Hero';
import {
  storeLocale,
  getStoredLocale,
  getSecondaryLangs,
  findSecondaryLang,
  isDefaultStored,
  isSecondaryStored,
} from '../functions/langUtils';
import { getPreferredLang } from '../functions/getPreferredLang';
import { isSSR } from '../functions/isSSR';
import { NotFoundPageHead } from '../components/Head/NotFoundPageHead';
import { useLocales } from '../hooks/useLocales';

const NotFoundPage = () => {
  const data = useStaticQuery(graphql`
    query {
      allDatoCmsNotFoundPage {
        nodes {
          seo {
            seoTitle: title
          }
          title
          subtitle
          backToHomeText
          locale
        }
      }
    }
  `);

  const { defaultLocale, locales } = useLocales();

  const appLangCodes = [...locales];
  const storedLocale = getStoredLocale();

  if (!isSSR) {
    const browserLangCodes = navigator.languages;
    const {
      allDatoCmsNotFoundPage: { nodes: propNodes },
    } = data;

    const [defaultLangPropsNode] = propNodes;

    // Default locale data

    const {
      seo: { seoTitle },
      title,
      subtitle,
      backToHomeText,
    } = defaultLangPropsNode;

    const defaultLangProps = {
      headProps: {
        title: seoTitle,
        locale: defaultLocale,
      },
      heroProps: {
        title,
        subtitle,
      },
      linkProps: {
        children: backToHomeText,
        to: '/',
      },
    };

    const getProps = () => {
      // If default locale is already stored

      const isDefaultLangStored = isDefaultStored(
        appLangCodes,
        storedLocale,
        defaultLocale
      );
      if (isDefaultLangStored) return defaultLangProps;

      // If secondary locale is already stored

      const isSecondaryLangStored = isSecondaryStored(
        appLangCodes,
        storedLocale,
        defaultLocale
      );
      if (isSecondaryLangStored) {
        const storedLangProps = propNodes.find(
          ({ locale }) => locale === storedLocale
        );

        return {
          headProps: {
            title: storedLangProps.seo.seoTitle,
            locale: storedLocale,
          },
          heroProps: {
            title: storedLangProps.title,
            subtitle: storedLangProps.subtitle,
          },
          linkProps: {
            children: storedLangProps.backToHomeText,
            to: `/${storedLocale}`,
          },
        };
      }

      /**
       * If no locale has been saved (e.g. first time visit), evaluate the preferred locale
       * according to browser language list
       */

      const matchingLangCode = getPreferredLang(browserLangCodes, appLangCodes);

      const defaultLanguageMatch = matchingLangCode === defaultLocale;

      // If it equals to default language

      if (!storedLocale && defaultLanguageMatch) {
        storeLocale(defaultLocale);
        return defaultLangProps;
      }

      // If it equals to secondary langauge

      const secondaryLanguages = getSecondaryLangs(appLangCodes);
      const secondaryLanguageMatch = findSecondaryLang(
        secondaryLanguages,
        matchingLangCode
      );
      if (!storedLocale && secondaryLanguageMatch) {
        storeLocale(secondaryLanguageMatch);
        const secondaryLangProps = propNodes.find(
          ({ locale }) => locale === secondaryLanguageMatch
        );
        return {
          headProps: {
            title: secondaryLangProps.seo.seotitle,
            locale: secondaryLanguageMatch,
          },
          heroProps: {
            title: secondaryLangProps.title,
            subtitle: secondaryLangProps.subtitle,
          },
          linkProps: {
            children: secondaryLangProps.backToHomeText,
            to: `/${secondaryLanguageMatch}`,
          },
        };
      }

      // Else return default locale data

      return defaultLangProps;
    };

    const { headProps, heroProps, linkProps } = getProps();

    return (
      <>
        <NotFoundPageHead {...headProps} />
        <Hero
          {...heroProps}
          fullView
          centered
          button={
            <Link
              {...linkProps}
              className="classicButton classicButtonOutline"
            />
          }
        />
      </>
    );
  }
  return null;
};

export default NotFoundPage;
