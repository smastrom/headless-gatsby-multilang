import { createContext, useState } from 'react';

const LanguageContext = createContext({});

const LanguageProvider = ({ children, pageData }) => {
  const { locale, id } = pageData;
  const [pageLanguage] = useState(locale);

  return (
    <LanguageContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        pageLanguage,
        id,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageContext, LanguageProvider };
