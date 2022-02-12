import { graphql, useStaticQuery } from 'gatsby';

const useLanguages = () => {
  const data = useStaticQuery(
    graphql`
      query {
        datoCmsSite {
          locales
        }
        datoCmsWebsiteSetting {
          blogPathName
        }
      }
    `
  );

  const {
    datoCmsSite: { locales },
    datoCmsWebsiteSetting: { blogPathName },
  } = data;

  const [defaultLanguage] = locales;

  return {
    defaultLanguage,
    blogPathName,
  };
};

export default useLanguages;
