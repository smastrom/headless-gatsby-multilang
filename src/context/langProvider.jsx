import React, { createContext, useState } from 'react';

export const LangContext = createContext({});

const LangProvider = ({ children, pageData }) => {
  const { pageType, locale, slug, archivePageNumber } = pageData;
  const [currentLanguage] = useState(locale);

  const store = {
    currentLanguage,
    pageType,
    slug,
    archivePageNumber,
  };

  return <LangContext.Provider value={store}>{children}</LangContext.Provider>;
};

export default LangProvider;
