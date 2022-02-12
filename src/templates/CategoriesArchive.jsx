import { graphql } from 'gatsby';
import React from 'react';
import { Hero } from '../components/Layout/Hero';
import { PageWrapper } from '../components/Layout/PageWrapper';
import {
  SectionContainerGridThreeCols,
  SectionWrapper,
} from '../components/Layout/SharedStyles/Sections';
import { CardImgArtDir, CategoryCard } from '../components/Layout/Blog/Cards';

const CategoryTemplate = ({
  data: {
    datoCmsCategoriesArchive: {
      hero: [{ heroTitle, heroSubtitle, heroAlt }],
      seo,
    },
    allDatoCmsCategory: { categoryNodes },
  },
  pageContext,
}) => {
  return (
    <PageWrapper
      pageData={pageContext}
      seoTitle={seo?.seoTitle}
      seoDescription={seo?.seoDescription}
      seoImage={seo?.seoImage?.seoImageUrl}
    >
      <Hero alt={heroAlt} title={heroTitle} subtitle={heroSubtitle} />
      <SectionWrapper backgroundColor="var(--backgroundColorAlt)">
        <SectionContainerGridThreeCols>
          {categoryNodes.map(({ id, title, shortDescription, coverImage }) => (
            <CategoryCard
              key={id}
              recordId={id}
              title={title}
              description={shortDescription}
              cardImg={
                coverImage &&
                CardImgArtDir(
                  coverImage.gatsbyImageData,
                  coverImage.squaredImage,
                  coverImage.alt
                )
              }
            />
          ))}
        </SectionContainerGridThreeCols>
      </SectionWrapper>
    </PageWrapper>
  );
};

export default CategoryTemplate;

export const query = graphql`
  query CategoriesArchiveQuery($locale: String!) {
    datoCmsCategoriesArchive(locale: { eq: $locale }) {
      seo {
        seoTitle: title
        seoDescription: description
        seoImage: image {
          seoImageUrl: url
        }
      }
      hero {
        heroTitle
        heroSubtitle
        heroAlt
      }
    }
    allDatoCmsCategory(
      filter: { locale: { eq: $locale }, noTranslate: { ne: true } }
    ) {
      categoryNodes: nodes {
        id: originalId
        title
        shortDescription
        coverImage {
          gatsbyImageData(
            width: 300
            height: 120
            placeholder: NONE
            forceBlurhash: false
          )
          squaredImage: gatsbyImageData(
            width: 100
            height: 100
            imgixParams: { ar: "1", fit: "crop" }
          )
          alt
        }
      }
    }
  }
`;
