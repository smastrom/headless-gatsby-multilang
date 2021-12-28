import { graphql, useStaticQuery } from 'gatsby';

const useLanguages = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allDatoCmsSite {
          edges {
            node {
              locale
            }
          }
        }
        datoCmsWebsiteSetting {
          blogPath
        }
      }
    `
  );
  return {
    defaultLanguage: data.allDatoCmsSite.edges[0].node.locale,
    defaultBlogPath: data.datoCmsWebsiteSetting.blogPath,
  };
};

export default useLanguages;
