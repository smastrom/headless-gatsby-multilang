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
  notFoundPage,
  categorySlug,
}) => {
  const { currentLanguage } = useContext(LangContext);
  const { defaultLanguage, blogPath } = useLanguages();
  const isCurrentDefaultLanguage = currentLanguage === defaultLanguage;

  return (
    <Link
      aria-label={ariaLabel}
      className={className}
      to={
        article && !categorySlug
          ? isCurrentDefaultLanguage
            ? `/${blogPath}/${to}`
            : `/${currentLanguage}/${blogPath}/${to}`
          : article && categorySlug
          ? isCurrentDefaultLanguage
            ? `/${blogPath}/${categorySlug}/${to}`
            : `/${currentLanguage}/${blogPath}/${categorySlug}/${to}`
          : page
          ? isCurrentDefaultLanguage
            ? `/${to}`
            : `/${currentLanguage}/${to}`
          : archive
          ? isCurrentDefaultLanguage
            ? `/${blogPath}`
            : `/${currentLanguage}/${blogPath}`
          : home
          ? isCurrentDefaultLanguage
            ? '/'
            : `/${currentLanguage}`
          : notFoundPage || '/'
      }
    >
      {children}
    </Link>
  );
};

export default Navigator;
