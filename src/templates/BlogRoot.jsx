import React from 'react';
import { graphql } from 'gatsby';
import { PageWrapper } from '../components/Layout/PageWrapper';
import { Hero } from '../components/Layout/Hero';
import {
  SectionContainerGridThreeCols,
  SectionWrapper,
} from '../components/Layout/SharedStyles/Sections';
import { ArticleCard, CardImgArtDir } from '../components/Layout/Blog/Cards';
import { CategoriesMenu } from '../components/Layout/Blog/CategoriesMenu';

const BlogArchiveTemplate = ({
  data: {
    datoCmsBlogRoot: {
      hero: [{ heroTitle, heroSubtitle }],
      seo,
    },
    allDatoCmsBlogPost: { blogPostNodes },
  },
  pageContext,
}) => (
  <PageWrapper
    pageData={pageContext}
    seoTitle={seo?.seoTitle}
    seoDescription={seo?.seoDescription}
    seoImage={seo?.image?.seoImageUrl}
    seo
  >
    <Hero title={heroTitle} subtitle={heroSubtitle} />
    <CategoriesMenu />
    <SectionWrapper>
      <SectionContainerGridThreeCols>
        {blogPostNodes.map(
          ({
            id,
            meta: { updatedAt },
            coverImage,
            title,
            subtitle,
            author,
            categoryLink,
          }) => (
            <ArticleCard
              key={id}
              recordId={id}
              date={updatedAt}
              category={categoryLink}
              cardImg={
                coverImage &&
                CardImgArtDir(
                  coverImage.gatsbyImageData,
                  coverImage.squaredImage,
                  coverImage.alt
                )
              }
              title={title}
              excerpt={subtitle}
              authorImg={author?.picture.gatsbyImageData}
              authorAltImg={author?.picture.alt}
              authorName={author?.name}
            />
          )
        )}
      </SectionContainerGridThreeCols>
    </SectionWrapper>
  </PageWrapper>
);

export default BlogArchiveTemplate;

// Main query

export const query = graphql`
  query BlogArchiveQuery($locale: String!) {
    datoCmsBlogRoot(locale: { eq: $locale }) {
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
      }
    }
    allDatoCmsBlogPost(
      sort: { order: ASC, fields: meta___updatedAt }
      filter: {
        locale: { eq: $locale }
        noTranslate: { ne: true }
        categoryLink: { noTranslate: { ne: true } }
      }
    ) {
      blogPostNodes: nodes {
        id: originalId
        title
        subtitle
        meta {
          updatedAt
        }
        categoryLink {
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
          alt
        }
        author {
          name
          picture {
            gatsbyImageData(height: 30, width: 30)
            alt
          }
        }
      }
    }
  }
`;
