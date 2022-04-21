import { createContext, useState } from 'react';

const LocaleContext = createContext({});

const LocaleProvider = ({ children, pageData }) => {
  const { locale, id } = pageData;
  const [pageLocale] = useState(locale);

  return (
    <LocaleContext.Provider
      value={{
        pageLocale,
        id,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
};

export { LocaleContext, LocaleProvider };
