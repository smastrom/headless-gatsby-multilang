import { graphql } from 'gatsby';

import { PageWrapper } from '../components/Layout/PageWrapper';
import { Hero } from '../components/Layout/Hero';
import { Navigator } from '../components/Navigator';
import { RichText } from '../components/Layout/RichText';
import { ArticleCard } from '../components/Layout/Blog/Cards/ArticleCard';
import {
  SectionGridThreeCols,
  GridTextBox,
} from '../components/Layout/sharedStyles/sectionStyles';
import {
  HeadingSmallWithTip,
  SectionTitle,
} from '../components/Layout/sharedStyles/headingStyles';

const HomepageTemplate = ({
  data: {
    datoCmsHomepage: {
      seo,
      hero: [{ heroAlt, heroTitle, heroSubtitle }],
      features,
      featuredPostsTitle,
    },
    datoCmsBlogRoot: { id },
    allBlogPosts: { postNodes },
    datoCmsMiscTextString: { seeAllPosts },
  },
  pageContext,
}) => (
  <PageWrapper
    pageData={pageContext}
    seoTitle={seo?.seoTitle}
    seoDescription={seo?.seoDescription}
    seoImage={seo?.seoImage?.seoImageUrl}
  >
    <Hero
      caption={heroAlt}
      title={heroTitle}
      subtitle={heroSubtitle}
      button={
        <Navigator className="classicButton classicButtonOutline" recordId={id}>
          {seeAllPosts}
        </Navigator>
      }
      sectionChildren={
        <SectionGridThreeCols noPaddings>
          {features.map(({ id: featureId, title, description }) => (
            <GridTextBox small key={featureId}>
              <HeadingSmallWithTip>{title}</HeadingSmallWithTip>
              <RichText>{description}</RichText>
            </GridTextBox>
          ))}
        </SectionGridThreeCols>
      }
    />
    {postNodes.length > 0 && (
      <section style={{ paddingTop: 'var(--globalPaddingTb)' }}>
        <SectionTitle>{featuredPostsTitle}</SectionTitle>
        <SectionGridThreeCols>
          {postNodes.map(
            ({
              id: recordId,
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
                key={recordId}
                recordId={recordId}
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
      </section>
    )}
  </PageWrapper>
);

export default HomepageTemplate;

export const query = graphql`
  query HomepageQuery($locale: String!) {
    datoCmsHomepage(locale: { eq: $locale }) {
      locale
      seo {
        seoTitle: title
        seoDescription: description
        seoImage: image {
          seoImageUrl: url
        }
      }
      hero {
        heroAlt
        heroTitle
        heroSubtitle
      }
      features {
        id: originalId
        title
        description
      }
      featuredPostsTitle
    }
    datoCmsBlogRoot(locale: { eq: $locale }) {
      locale
      id: originalId
    }
    allBlogPosts: allDatoCmsBlogPost(
      filter: {
        locale: { eq: $locale }
        featuredInHomepage: { eq: true }
        noTranslate: { ne: true }
        categoryLink: { noTranslate: { ne: true } }
      }
      sort: { order: ASC, fields: meta___updatedAt }
      limit: 6
    ) {
      postNodes: nodes {
        locale
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
    }
    datoCmsMiscTextString(locale: { eq: $locale }) {
      locale
      seeAllPosts
    }
  }
`;
