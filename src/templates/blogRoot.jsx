import React from 'react';
import { graphql } from 'gatsby';
import PageWrapper from '../components/layout/pageWrapper';
import Hero from '../components/layout/hero';
import {
  SectionContainerGridThreeCols,
  SectionWrapper,
} from '../components/layout/sectionStyles';
import ArticleCard, { CardImgArtDir } from '../components/ui/articleCard';
import CategoriesMenu from '../components/ui/categoriesMenu';

const BlogArchiveTemplate = ({
  data: {
    datoCmsArchivePage: {
      hero: [{ heroTitle, heroSubtitle }],
      seo: { seoTitle, seoDescription },
    },
    allDatoCmsBlogPost: { blogPostNodes },
  },
  pageContext,
}) => (
  <PageWrapper
    pageData={pageContext}
    seoTitle={seoTitle}
    seoDescription={seoDescription}
  >
    <Hero title={heroTitle} subtitle={heroSubtitle} />
    <CategoriesMenu />
    <SectionWrapper isBlog>
      <SectionContainerGridThreeCols>
        {blogPostNodes.map(
          ({
            id,
            meta: { firstPublishedAt },
            cardImage,
            title,
            subtitle,
            author,
            slug,
            categoryLink,
          }) => (
            <ArticleCard
              key={id}
              date={firstPublishedAt}
              cardImg={
                cardImage &&
                CardImgArtDir(
                  cardImage.gatsbyImageData,
                  cardImage.squaredImage,
                  cardImage.alt
                )
              }
              title={title}
              excerpt={subtitle}
              authorImg={author?.picture.gatsbyImageData}
              authorAltImg={author?.picture.alt}
              categorySlug={categoryLink?.categorySlug}
              authorName={author?.name}
              slug={slug}
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
    datoCmsArchivePage(locale: { eq: $locale }) {
      locale
      seo {
        seoTitle: title
        seoDescription: description
      }
      hero {
        heroTitle
        heroSubtitle
      }
    }
    allDatoCmsBlogPost(
      sort: { order: ASC, fields: meta___firstPublishedAt }
      filter: { locale: { eq: $locale }, noTranslate: { ne: true } }
    ) {
      blogPostNodes: nodes {
        id: originalId
        meta {
          firstPublishedAt(locale: $locale, formatString: "DD MMM YYYY")
        }
        categoryLink {
          categorySlug: slug
        }
        cardImage {
          gatsbyImageData(
            width: 280
            height: 100
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
        subtitle
        title
        slug
        reference
      }
    }
  }
`;
