import { useStaticQuery, graphql } from 'gatsby';

const useSiteUrl = () => {
  const data = useStaticQuery(
    graphql`
      query {
        datoCmsWebsiteSetting {
          siteUrl
        }
      }
    `
  );
  return data.datoCmsWebsiteSetting;
};

export default useSiteUrl;
