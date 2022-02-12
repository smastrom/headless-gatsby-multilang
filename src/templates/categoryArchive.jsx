import { graphql } from 'gatsby';
import React from 'react';
import Hero from '../components/layout/hero';
import PageWrapper from '../components/layout/pageWrapper';
import CategoriesMenu from '../components/ui/categoriesMenu';

const CategoryArchiveTemplate = ({
  data: {
    datoCmsCategory: {
      hero: [{ heroTitle, heroSubtitle, heroAlt }],
    },
  },
  pageContext,
}) => {
  return (
    <PageWrapper pageData={pageContext}>
      <Hero alt={heroAlt} title={heroTitle} subtitle={heroSubtitle} />
      <CategoriesMenu />
    </PageWrapper>
  );
};

export default CategoryArchiveTemplate;

export const query = graphql`
  query CategoryArchiveQuery($id: String!, $locale: String!) {
    datoCmsCategory(originalId: { eq: $id }, locale: { eq: $locale }) {
      originalId
      hero {
        heroTitle
        heroSubtitle
        heroAlt
      }
    }
  }
`;
