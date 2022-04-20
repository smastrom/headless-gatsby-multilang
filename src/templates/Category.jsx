import { graphql } from 'gatsby';

import { Hero } from '../components/Layout/Hero';
import { PageWrapper } from '../components/Layout/PageWrapper';
import { CategoriesMenu } from '../components/Layout/Blog/CategoriesMenu';
import { ArticleCard } from '../components/Layout/Blog/Cards/ArticleCard';
import { SectionGridThreeCols } from '../components/Layout/sharedStyles/sectionStyles';

const CategoryTemplate = ({
  data: {
    datoCmsCategory: {
      hero: [{ heroTitle, heroSubtitle, heroAlt }],
      seo,
    },
    allCategoryPosts: { postNodes },
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
    <CategoriesMenu />
    {postNodes.length > 0 && (
      <SectionGridThreeCols>
        {postNodes.map(
          ({
            id,
            meta: { updatedAt },
            title,
            coverImage,
            subtitle,
            author: {
              authorName,
              picture: { authorImageData },
            },
            categoryLink,
          }) => (
            <ArticleCard
              key={id}
              recordId={id}
              date={updatedAt}
              category={categoryLink}
              cardImg={coverImage.gatsbyImageData}
              cardImgMobile={coverImage.squaredImage}
              altImg={title}
              title={title}
              excerpt={subtitle}
              authorImg={authorImageData}
              authorAltImg={authorName}
              authorName={authorName}
            />
          )
        )}
      </SectionGridThreeCols>
    )}
  </PageWrapper>
);

export default CategoryTemplate;

export const query = graphql`
  query CategoryQuery($id: String!, $locale: String!) {
    datoCmsCategory(originalId: { eq: $id }, locale: { eq: $locale }) {
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
    allCategoryPosts: allDatoCmsBlogPost(
      filter: {
        locale: { eq: $locale }
        noTranslate: { ne: true }
        categoryLink: { originalId: { eq: $id } }
      }
      sort: { order: ASC, fields: meta___updatedAt }
    ) {
      postNodes: nodes {
        locale
        id: originalId
        meta {
          updatedAt
        }
        categoryLink {
          originalId
          title
        }
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
        author {
          authorName: name
          picture {
            authorImageData: gatsbyImageData(
              height: 30
              width: 30
              placeholder: NONE
            )
          }
        }
        subtitle
        title
      }
    }
  }
`;
