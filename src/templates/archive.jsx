import React from 'react';
import { graphql } from 'gatsby';
import PageWrapper from '../components/layout/pageWrapper';
import Hero from '../components/layout/hero';
import useLanguages from '../hooks/useLanguages';
import {
  SectionContainerGridThreeCols,
  SectionWrapper,
} from '../components/layout/sectionStyles';
import ArticleCard, { CardImgArtDir } from '../components/ui/articleCard';
import {
  ArchiveNav,
  ArchiveList,
  ArchiveListLink,
} from '../components/ui/archivePagination';
import CategoriesMenu from '../components/ui/categoriesMenu';

const BlogArchiveTemplate = ({
  data: {
    datoCmsArchivePage: {
      hero: [{ heroTitle, heroSubtitle }],
      seo: { seoTitle, seoDescription },
    },
    allDatoCmsBlogPost: { blogPostNodes },
    allDatoCmsCategory: { categoryNodes },
  },
  pageContext,
}) => {
  const { defaultLanguage, blogPath } = useLanguages();
  const { pagesNumber, archivePageNumber, locale } = pageContext;

  return (
    <PageWrapper
      pageData={pageContext}
      seoTitle={seoTitle}
      seoDescription={seoDescription}
    >
      <Hero title={heroTitle} subtitle={heroSubtitle} />
      <CategoriesMenu categoriesArray={categoryNodes} />
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
        <ArchiveNav>
          <ArchiveList>
            {Array.from({ length: pagesNumber }, (_, index) => (
              <li key={`page_number${index + 1}`}>
                <ArchiveListLink
                  as={index === archivePageNumber - 1 ? 'span' : ''}
                  to={
                    locale === defaultLanguage &&
                    index !== archivePageNumber - 1
                      ? `/${blogPath}/${index === 0 ? '' : index + 1}`
                      : locale !== defaultLanguage &&
                        index !== archivePageNumber - 1
                      ? `/${locale}/${blogPath}/${index === 0 ? '' : index + 1}`
                      : '/'
                  }
                >
                  {index + 1}
                </ArchiveListLink>
              </li>
            ))}
          </ArchiveList>
        </ArchiveNav>
      </SectionWrapper>
    </PageWrapper>
  );
};

export default BlogArchiveTemplate;

// Main query

export const query = graphql`
  query BlogArchiveQuery($locale: String!, $skip: Int!, $limit: Int!) {
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
    allDatoCmsCategory(filter: { locale: { eq: $locale } }) {
      categoryNodes: nodes {
        id: originalId
        title
        slug
      }
    }
    allDatoCmsBlogPost(
      sort: { order: ASC, fields: meta___firstPublishedAt }
      filter: { locale: { eq: $locale }, noTranslate: { ne: true } }
      limit: $limit
      skip: $skip
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
