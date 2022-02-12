import React from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import { useDefaultLanguage } from '../hooks/useDefaultLanguage';
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

const NotFoundPage = () => {
  const data = useStaticQuery(graphql`
    query {
      datoCmsSite {
        locales
      }
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

  const { defaultLanguage } = useDefaultLanguage();

  const {
    datoCmsSite: { locales },
  } = data;
  const appLangCodes = [...locales];
  const storedLocale = getStoredLocale();

  if (!isSSR) {
    const browserLangCodes = navigator.languages;
    const {
      allDatoCmsNotFoundPage: { nodes: propNodes },
    } = data;

    const [defaultLangPropsNode] = propNodes;

    const {
      seo: { seoTitle },
      title,
      subtitle,
      backToHomeText,
    } = defaultLangPropsNode;

    const defaultLangProps = {
      headProps: {
        title: seoTitle,
        locale: defaultLanguage,
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
      const isDefaultLangStored = isDefaultStored(
        appLangCodes,
        storedLocale,
        defaultLanguage
      );
      if (isDefaultLangStored) return { ...defaultLangProps };

      const isSecondaryLangStored = isSecondaryStored(
        appLangCodes,
        storedLocale,
        defaultLanguage
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

      const matchingLangCode = getPreferredLang(browserLangCodes, appLangCodes);

      const defaultLanguageMatch = matchingLangCode === defaultLanguage;

      if (!storedLocale && defaultLanguageMatch) {
        storeLocale(defaultLanguage);
        return { ...defaultLangProps };
      }

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
      return { ...defaultLangProps };
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
