import { graphql } from 'gatsby';

import { StructuredText, renderNodeRule } from 'react-datocms';
import { isCode } from 'datocms-structured-text-utils';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { PageWrapper } from '../components/Layout/PageWrapper';
import { ArticleHeader } from '../components/Layout/Blog/ArticleHeader';
import { SectionTitle } from '../components/Layout/sharedStyles/headingStyles';
import { Navigator } from '../components/Navigator';
import { ArticleImage } from '../components/Layout/Blog/ArticleImage';
import { ArticleBody } from '../components/Layout/Blog/ArticleBody';
import { ArticleCard } from '../components/Layout/Blog/Cards/ArticleCard';
import {
  Section,
  SectionGridTwoCols,
} from '../components/Layout/sharedStyles/sectionStyles';

const ArticleTemplate = ({
  data: {
    datoCmsBlogPost: {
      id,
      structuredBody,
      title,
      subtitle,
      author,
      seo,
      coverImage: { coverImageData },
      meta: { updatedAt, firstPublishedAt },
      categoryLink,
      relatedPosts,
    },
    datoCmsMiscTextString: { updatedAtText, nextReadText },
  },
  pageContext,
}) => (
  <PageWrapper
    pageData={pageContext}
    seoTitle={seo?.seoTitle}
    seoDescription={seo?.seoDescription}
    seoImage={seo?.image?.seoImageUrl}
  >
    <Section as="article">
      <ArticleHeader
        title={title}
        subtitle={subtitle}
        authorName={author?.authorName}
        coverImg={coverImageData}
        coverImgAlt={title}
        authorImg={author?.picture?.authorPictureData}
        authorImgAlt={author?.authorName}
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
              // eslint-disable-next-line react/no-unstable-nested-components
              renderNodeRule(isCode, ({ node: { language, code }, key }) => (
                <div style={{ position: 'relative' }} key={key}>
                  <div id="code_tip">{language}</div>
                  <SyntaxHighlighter language={language} style={atomDark}>
                    {code}
                  </SyntaxHighlighter>
                </div>
              )),
            ]}
            renderLinkToRecord={({
              record: { id: recordId },
              children,
              transformedMeta,
            }) => (
              <Navigator {...transformedMeta} recordId={recordId}>
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
                    <ArticleImage
                      image={recordImageData}
                      alt={recordImageAlt}
                    />
                  );
                default:
                  return null;
              }
            }}
          />
        )}
      </ArticleBody>
    </Section>
    {relatedPosts.length > 0 && (
      <Section>
        <SectionTitle noPaddings css={{ maxWidth: 'var(--articleContainer)' }}>
          {nextReadText}
        </SectionTitle>
        <SectionGridTwoCols>
          {relatedPosts.map(
            ({
              id: relatedId,
              meta: { updatedAt: relatedUpdatedAt },
              title: relatedTitle,
              coverImage,
              subtitle: relatedSubtitle,
              author: {
                authorName,
                picture: { authorImageData },
              },
              categoryLink: relatedCategoryLink,
            }) => (
              <ArticleCard
                key={relatedId}
                recordId={relatedId}
                date={relatedUpdatedAt}
                category={relatedCategoryLink}
                cardImg={coverImage.gatsbyImageData}
                cardImgMobile={coverImage.squaredImage}
                altImg={relatedTitle}
                title={relatedTitle}
                excerpt={relatedSubtitle}
                authorImg={authorImageData}
                authorAltImg={authorName}
                authorName={authorName}
              />
            )
          )}
        </SectionGridTwoCols>
      </Section>
    )}
  </PageWrapper>
);

export default ArticleTemplate;

// Main query

export const query = graphql`
  query ArticleQuery($id: String!, $locale: String!) {
    datoCmsMiscTextString(locale: { eq: $locale }) {
      locale
      updatedAtText
      nextReadText
    }
    datoCmsBlogPost(originalId: { eq: $id }, locale: { eq: $locale }) {
      locale
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
        }
      }
      relatedPosts {
        id: originalId
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
