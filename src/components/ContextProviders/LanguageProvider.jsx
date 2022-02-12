import React, { createContext, useState } from 'react';

export const LanguageContext = createContext({});

export const LanguageProvider = ({ children, pageData }) => {
  const { locale, id } = pageData;
  const [pageLanguage] = useState(locale);

  return (
    <LanguageContext.Provider
      value={{
        pageLanguage,
        id,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
