import React, { createContext, useState } from 'react';

export const LangContext = createContext({});

const LangProvider = ({ children, pageData }) => {
  const {
    pageType,
    locale,
    archivePageNumber,
    reference,
    categorySlug,
    isUncategorized,
  } = pageData;
  const [currentLanguage] = useState(locale);

  const store = {
    currentLanguage,
    reference,
    pageType,
    archivePageNumber,
    categorySlug,
    isUncategorized,
  };

  console.log(store?.categorySlug);
  console.log(store?.isUncategorized);

  return <LangContext.Provider value={store}>{children}</LangContext.Provider>;
};

export default LangProvider;
