import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { LangContext } from '../../context/langProvider';
import useLanguages from '../../hooks/useLanguages';

const Navigator = ({
  article,
  page,
  archive,
  home,
  ariaLabel,
  className,
  children,
  to,
  category,
  notFoundPage,
  categorySlug,
  activeClassName,
}) => {
  const { currentLanguage } = useContext(LangContext);
  const { defaultLanguage, blogPathName } = useLanguages();

  const isContextLangEqualToDefaultLang = currentLanguage === defaultLanguage;
  const isDefaultLang = isContextLangEqualToDefaultLang;

  const isArticleWithoutCategory = article && !categorySlug;
  const isArticleWithCategory = article && categorySlug;

  return (
    <Link
      aria-label={ariaLabel}
      className={className}
      activeClassName={activeClassName}
      to={(() => {
        if (isArticleWithoutCategory) {
          if (isDefaultLang) return `/${blogPathName}/${to}`;
          return `/${currentLanguage}/${blogPathName}/${to}`;
        } else if (isArticleWithCategory) {
          if (isDefaultLang) return `/${blogPathName}/${categorySlug}/${to}`;
          return `/${currentLanguage}/${blogPathName}/${categorySlug}/${to}`;
        } else if (page) {
          if (isDefaultLang) return `/${blogPathName}`;
          return `/${currentLanguage}/${to}`;
        } else if (archive) {
          if (isDefaultLang) return `/${blogPathName}`;
          return `/${currentLanguage}/${blogPathName}`;
        } else if (category && categorySlug) {
          if (isDefaultLang) return `/${blogPathName}/${categorySlug}`;
          return `/${currentLanguage}/${blogPathName}/${categorySlug}`;
        } else if (home) {
          if (isDefaultLang) return '/';
          return `/${currentLanguage}`;
          // Improve 404
        } else if (notFoundPage) return notFoundPage;
      })()}
    >
      {children}
    </Link>
  );
};

export default Navigator;
