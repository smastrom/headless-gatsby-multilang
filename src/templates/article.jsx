import React from 'react';
import { graphql } from 'gatsby';
import { StructuredText, renderNodeRule } from 'react-datocms';
import { isCode } from 'datocms-structured-text-utils';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import PageWrapper from '../components/layout/pageWrapper';
import ArticleHeader, { BodyImg } from '../components/ui/articleHeader';
import {
  ArticleBody,
  LanguageContainer,
} from '../components/layout/paragraphStyles';
import PrevNextNav from '../components/ui/articlePrevNext';
import { SectionWrapper } from '../components/layout/sectionStyles';
import Navigator from '../components/langHelpers/navigator';

const BlogPostTemplate = ({
  data: {
    datoCmsBlogPost: {
      id,
      structuredBody,
      seo: {
        seoTitle,
        seoDescription,
        seoImage: { seoImageUrl },
      },
      title,
      subtitle,
      author: {
        authorName,
        picture: { authorPictureData, authorPictureAlt },
      },
      coverImage: { coverImageData, coverImageAlt },
      meta: { firstPublishedAt, updatedAt },
    },
    previous: {
      nodes: [{ prevPostSlug, prevPostTitle, prevCategoryLink }],
    },
    next: {
      nodes: [{ nextPostSlug, nextPostTitle, nextCategoryLink }],
    },
    datoCmsWebsiteSetting: { prevHeading, nextHeading, updatedAtText },
  },
  pageContext,
}) => {
  const { skipNext } = pageContext;

  return (
    <PageWrapper
      pageData={pageContext}
      seoTitle={seoTitle}
      seoDescription={seoDescription}
      seoImage={seoImageUrl}
    >
      <SectionWrapper as="article" isBlog article>
        <ArticleHeader
          title={title}
          subtitle={subtitle}
          authorName={authorName}
          coverImg={coverImageData}
          coverImgAlt={coverImageAlt}
          authorImg={authorPictureData}
          authorImgAlt={authorPictureAlt}
          date={firstPublishedAt}
          lastModified={updatedAt}
          lastModifiedText={updatedAtText}
        />
        <ArticleBody>
          {structuredBody?.value && (
            <StructuredText
              key={id}
              data={structuredBody}
              customRules={[
                renderNodeRule(isCode, ({ node: { language, code }, key }) => (
                  <div style={{ position: 'relative' }} key={key}>
                    <LanguageContainer>{language}</LanguageContainer>
                    <SyntaxHighlighter language={language} style={atomDark}>
                      {code}
                    </SyntaxHighlighter>
                  </div>
                )),
              ]}
              renderLinkToRecord={({
                record: { __typename, slug: recordSlug, categoryLink },
                children,
                transformedMeta,
              }) => {
                switch (__typename) {
                  case 'DatoCmsOtherPage':
                    return (
                      <Navigator {...transformedMeta} page to={recordSlug}>
                        {children}
                      </Navigator>
                    );
                  case 'DatoCmsBlogPost':
                    return (
                      <Navigator
                        {...transformedMeta}
                        categorySlug={categoryLink?.categorySlug}
                        article
                        to={recordSlug}
                      >
                        {children}
                      </Navigator>
                    );
                  case 'DatoCmsArchivePage':
                    return (
                      <Navigator {...transformedMeta} archive>
                        {children}
                      </Navigator>
                    );
                  case 'DatoCmsHomepage':
                    return (
                      <Navigator {...transformedMeta} home>
                        {children}
                      </Navigator>
                    );

                  default:
                    return null;
                }
              }}
              renderBlock={({
                record: {
                  __typename,
                  image: {
                    gatsbyImageData: recordImageData,
                    alt: recordImageAlt,
                  },
                },
              }) => {
                switch (__typename) {
                  case 'DatoCmsArticleBodyImage':
                    return (
                      <BodyImg image={recordImageData} alt={recordImageAlt} />
                    );
                  default:
                    return null;
                }
              }}
            />
          )}
        </ArticleBody>
        <PrevNextNav
          skipNextValue={skipNext}
          prevCategorySlug={prevCategoryLink?.categorySlug}
          nextCategorySlug={nextCategoryLink?.categorySlug}
          prevHeading={prevHeading}
          prevSlug={prevPostSlug}
          prevPostTitle={prevPostTitle}
          nextHeading={nextHeading}
          nextSlug={nextPostSlug}
          nextPostTitle={nextPostTitle}
        />
      </SectionWrapper>
    </PageWrapper>
  );
};

export default BlogPostTemplate;

// Main query

export const query = graphql`
  query BlogPostTemplateQuery(
    $id: String!
    $locale: String!
    $skipNext: Int!
    $skipPrevious: Int!
  ) {
    next: allDatoCmsBlogPost(
      filter: { locale: { eq: $locale }, noTranslate: { ne: true } }
      sort: { fields: meta___firstPublishedAt }
      limit: 1
      skip: $skipNext
    ) {
      nodes {
        nextPostSlug: slug
        nextPostTitle: title
        nextCategoryLink: categoryLink {
          categorySlug: slug
        }
      }
    }
    previous: allDatoCmsBlogPost(
      filter: { locale: { eq: $locale }, noTranslate: { ne: true } }
      sort: { fields: meta___firstPublishedAt }
      skip: $skipPrevious
      limit: 1
    ) {
      nodes {
        prevPostSlug: slug
        prevPostTitle: title
        prevCategoryLink: categoryLink {
          categorySlug: slug
        }
      }
    }
    datoCmsWebsiteSetting(locale: { eq: $locale }) {
      prevHeading: previous
      nextHeading: next
      updatedAtText
    }
    datoCmsBlogPost(originalId: { eq: $id }, locale: { eq: $locale }) {
      originalId
      locale
      title
      seo {
        seoTitle: title
        seoDescription: description
        seoImage: image {
          seoImageUrl: url
        }
      }
      subtitle
      coverImage {
        coverImageData: gatsbyImageData
        coverImageAlt: alt
      }
      meta {
        firstPublishedAt
        updatedAt
      }
      author {
        authorName: name
        picture {
          authorPictureData: gatsbyImageData(height: 60, width: 60)
          authorPictureAlt: alt
        }
      }
      structuredBody {
        blocks {
          __typename
          id: originalId
          image {
            gatsbyImageData
            alt
          }
        }
        links {
          ... on DatoCmsBlogPost {
            __typename
            slug
            id: originalId
            categoryLink {
              categorySlug: slug
            }
          }
          ... on DatoCmsOtherPage {
            __typename
            slug
            id: originalId
          }
          ... on DatoCmsHomepage {
            __typename
            id: originalId
          }
          ... on DatoCmsArchivePage {
            __typename
            id: originalId
          }
        }
        value
      }
    }
  }
`;
