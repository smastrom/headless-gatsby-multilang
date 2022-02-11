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
  const { defaultLanguage, blogPath } = useLanguages();

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
          if (isDefaultLang) return `/${blogPath}/${to}`;
          return `/${currentLanguage}/${blogPath}/${to}`;
        } else if (isArticleWithCategory) {
          if (isDefaultLang) return `/${blogPath}/${categorySlug}/${to}`;
          return `/${currentLanguage}/${blogPath}/${categorySlug}/${to}`;
        } else if (page) {
          if (isDefaultLang) return `/${blogPath}`;
          return `/${currentLanguage}/${to}`;
        } else if (archive) {
          if (isDefaultLang) return `/${blogPath}`;
          return `/${currentLanguage}/${blogPath}`;
        } else if (category && categorySlug) {
          if (isDefaultLang) return `/${blogPath}/${categorySlug}`;
          return `/${currentLanguage}/${blogPath}/${categorySlug}`;
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
