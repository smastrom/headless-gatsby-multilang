import React, { createContext, useState } from 'react';

export const LangContext = createContext({});

const LangProvider = ({ children, pageData }) => {
  const { pageType, locale, archivePageNumber, reference } = pageData;
  const [currentLanguage] = useState(locale);

  const store = {
    currentLanguage,
    reference,
    pageType,
    archivePageNumber,
  };

  return <LangContext.Provider value={store}>{children}</LangContext.Provider>;
};

export default LangProvider;
