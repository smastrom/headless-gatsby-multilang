import React from 'react';
import { graphql } from 'gatsby';
import { StructuredText, renderNodeRule } from 'react-datocms';
import { isCode } from 'datocms-structured-text-utils';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { PageWrapper } from '../components/Layout/PageWrapper';
import {
  ArticleHeader,
  BodyImg,
} from '../components/Layout/Blog/ArticleHeader';
import {
  ArticleBody,
  CodeContainer,
} from '../components/Layout/SharedStyles/TextContainers';
import { PrevNextNav } from '../components/Layout/Blog/PrevNextNav';
import { SectionWrapper } from '../components/Layout/SharedStyles/Sections';
import { Navigator } from '../components/LanguageHelpers/Navigator';
import { BackToBlog } from '../components/Layout/Blog/BackToBlog';

const BlogPostTemplate = ({
  data: {
    datoCmsBlogPost: {
      id,
      structuredBody,
      title,
      subtitle,
      author,
      seo,
      coverImage: { coverImageData, coverImageAlt },
      meta: { updatedAt, firstPublishedAt },
      categoryLink,
    },
    prev: {
      nodes: [{ prevId, prevPostTitle }],
    },
    next: {
      nodes: [{ nextId, nextPostTitle }],
    },
    datoCmsMiscTextString: { prevHeading, nextHeading, updatedAtText },
  },
  pageContext,
}) => {
  const { skipNext } = pageContext;

  return (
    <PageWrapper
      pageData={pageContext}
      seoTitle={seo?.seoTitle}
      seoDescription={seo?.seoDescription}
      seoImage={seo?.image?.seoImageUrl}
    >
      <SectionWrapper as="article" isBlog isArticle>
        <BackToBlog />
        <ArticleHeader
          title={title}
          subtitle={subtitle}
          authorName={author?.authorName}
          coverImg={coverImageData}
          coverImgAlt={coverImageAlt}
          authorImg={author?.picture?.authorPictureData}
          authorImgAlt={author?.picture?.authorPictureAlt}
          firstPublish={firstPublishedAt}
          lastModified={updatedAt}
          lastModifiedText={updatedAtText}
          category={categoryLink}
        />
        <ArticleBody>
          {structuredBody?.value && (
            <StructuredText
              key={id}
              data={structuredBody}
              customRules={[
                renderNodeRule(isCode, ({ node: { language, code }, key }) => (
                  <div style={{ position: 'relative' }} key={key}>
                    <CodeContainer>{language}</CodeContainer>
                    <SyntaxHighlighter language={language} style={atomDark}>
                      {code}
                    </SyntaxHighlighter>
                  </div>
                )),
              ]}
              renderLinkToRecord={({
                record: { id },
                children,
                transformedMeta,
              }) => (
                <Navigator {...transformedMeta} recordId={id}>
                  {children}
                </Navigator>
              )}
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
          prevHeading={prevHeading}
          prevPostTitle={prevPostTitle}
          prevRecordId={prevId}
          nextHeading={nextHeading}
          nextPostTitle={nextPostTitle}
          nextRecordId={nextId}
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
    $skipPrevious: Int!
    $skipNext: Int!
  ) {
    datoCmsMiscTextString(locale: { eq: $locale }) {
      prevHeading: previous
      nextHeading: next
      updatedAtText
    }
    next: allDatoCmsBlogPost(
      filter: {
        locale: { eq: $locale }
        noTranslate: { ne: true }
        categoryLink: { noTranslate: { ne: true } }
      }
      sort: { fields: meta___updatedAt }
      skip: $skipNext
      limit: 1
    ) {
      nodes {
        nextId: originalId
        nextPostTitle: title
      }
    }
    prev: allDatoCmsBlogPost(
      filter: {
        locale: { eq: $locale }
        noTranslate: { ne: true }
        categoryLink: { noTranslate: { ne: true } }
      }
      sort: { fields: meta___updatedAt }
      skip: $skipPrevious
      limit: 1
    ) {
      nodes {
        prevId: originalId
        prevPostTitle: title
      }
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
        updatedAt
        firstPublishedAt
      }
      categoryLink {
        title
        id: originalId
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
          id: originalId
          image {
            gatsbyImageData
            alt
          }
        }
        links {
          ... on DatoCmsBlogPost {
            id: originalId
          }
          ... on DatoCmsOtherPage {
            id: originalId
          }
          ... on DatoCmsHomepage {
            id: originalId
          }
          ... on DatoCmsBlogRoot {
            id: originalId
          }
        }
        value
      }
    }
  }
`;
