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
}) => {
  const { currentLanguage } = useContext(LangContext);
  const { defaultLanguage, defaultBlogPath } = useLanguages();
  const isCurrentDefaultLanguage = currentLanguage === defaultLanguage;

  return (
    <Link
      aria-label={ariaLabel}
      className={className}
      to={
        article
          ? isCurrentDefaultLanguage
            ? `/${defaultBlogPath}/${to}`
            : `/${currentLanguage}/${defaultBlogPath}/${to}`
          : page
          ? isCurrentDefaultLanguage
            ? `/${to}`
            : `/${currentLanguage}/${to}`
          : archive
          ? isCurrentDefaultLanguage
            ? `/${defaultBlogPath}`
            : `/${currentLanguage}/${defaultBlogPath}`
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
