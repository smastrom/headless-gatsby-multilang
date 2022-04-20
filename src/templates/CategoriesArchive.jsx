import { graphql } from 'gatsby';

import { Hero } from '../components/Layout/Hero';
import { PageWrapper } from '../components/Layout/PageWrapper';
import { CategoryCard } from '../components/Layout/Blog/Cards/CategoryCard';
import { SectionGridThreeCols } from '../components/Layout/sharedStyles/sectionStyles';

const CategoriesArchiveTemplate = ({
  data: {
    datoCmsCategoriesArchive: {
      hero: [{ heroTitle, heroSubtitle, heroAlt }],
      seo,
    },
    allDatoCmsCategory: { categoryNodes },
  },
  pageContext,
}) => (
  <PageWrapper
    pageData={pageContext}
    seoTitle={seo?.seoTitle}
    seoDescription={seo?.seoDescription}
    seoImage={seo?.seoImage?.seoImageUrl}
  >
    <Hero caption={heroAlt} title={heroTitle} subtitle={heroSubtitle} />
    <SectionGridThreeCols>
      {categoryNodes.map(({ id, title, shortDescription, coverImage }) => (
        <CategoryCard
          key={id}
          recordId={id}
          title={title}
          description={shortDescription}
          cardImg={coverImage.gatsbyImageData}
          cardImgMobile={coverImage.squaredImage}
          altImg={title}
        />
      ))}
    </SectionGridThreeCols>
  </PageWrapper>
);

export default CategoriesArchiveTemplate;

export const query = graphql`
  query CategoriesArchiveQuery($locale: String!) {
    datoCmsCategoriesArchive(locale: { eq: $locale }) {
      locale
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
        locale
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
        }
      }
    }
  }
`;
