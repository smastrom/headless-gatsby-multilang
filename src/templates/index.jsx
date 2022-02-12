import React from 'react';
import { graphql } from 'gatsby';
import PageWrapper from '../components/layout/pageWrapper';
import Navigator from '../components/langHelpers/navigator';
import Hero from '../components/layout/hero';
import {
  SectionContainerGridThreeCols,
  SectionWrapper,
  SectionTitleContainer,
  TextBox,
} from '../components/layout/sectionStyles';
import { HeadingSmall, SectionTitle } from '../components/layout/headingStyles';
import { Paragraph } from '../components/layout/paragraphStyles';
import ArticleCard, { CardImgArtDir } from '../components/ui/articleCard';

const HomePageTemplate = ({
  data: {
    datoCmsHomepage: {
      seo: { seoTitle, seoDescription },
      hero: [heroEntry],
      features,
      featuredPostsTitle,
    },
    datoCmsOtherPage: { guidePageSlug },
    allDatoCmsBlogPost: { postNodes },
    datoCmsWebsiteSetting: { seeTheGuideButton, seeAllButton, minsReadSuffix },
  },
  pageContext,
}) => {
  const { heroAlt, heroTitle, heroSubtitle } = heroEntry;

  return (
    <PageWrapper
      pageData={pageContext}
      seoTitle={seoTitle}
      seoDescription={seoDescription}
    >
      <Hero
        hasDivider
        alt={heroAlt}
        title={heroTitle}
        subtitle={heroSubtitle}
        button={
          <Navigator
            className="classicButton classicButtonOutline"
            page
            to={guidePageSlug}
          >
            {seeTheGuideButton}
          </Navigator>
        }
        sectionChildren={
          <SectionContainerGridThreeCols>
            {features.map(({ id, title, description }) => (
              <TextBox small key={id}>
                <HeadingSmall hasTip>{title}</HeadingSmall>
                <Paragraph>{description}</Paragraph>
              </TextBox>
            ))}
          </SectionContainerGridThreeCols>
        }
      />
      <SectionWrapper backgroundColor="var(--backgroundAlt)">
        <SectionTitleContainer hasButton>
          <SectionTitle>{featuredPostsTitle}</SectionTitle>
          <Navigator className="classicButton classicButtonOutline" archive>
            {seeAllButton}
          </Navigator>
        </SectionTitleContainer>
        <SectionContainerGridThreeCols>
          {postNodes.map(
            ({
              id,
              meta: { firstPublishedAt },
              cardImage,
              title,
              subtitle,
              categoryLink,
              author: {
                authorName,
                picture: { authorImageData, authorImageAlt },
              },
              slug,
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
                authorImg={authorImageData}
                authorAltImg={authorImageAlt}
                authorName={authorName}
                categorySlug={categoryLink?.categorySlug}
                slug={slug}
              />
            )
          )}
        </SectionContainerGridThreeCols>
      </SectionWrapper>
    </PageWrapper>
  );
};

export default HomePageTemplate;

export const query = graphql`
  query HomePageTemplate($locale: String!) {
    datoCmsHomepage(locale: { eq: $locale }) {
      locale
      seo {
        seoTitle: title
        seoDescription: description
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
    datoCmsOtherPage(locale: { eq: $locale }, reference: { eq: "guide" }) {
      guidePageSlug: slug
    }
    allDatoCmsBlogPost(
      sort: { order: ASC, fields: meta___firstPublishedAt }
      filter: {
        locale: { eq: $locale }
        featuredInHomepage: { eq: true }
        noTranslate: { ne: true }
      }
      limit: 6
    ) {
      postNodes: nodes {
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
          authorName: name
          picture {
            authorImageData: gatsbyImageData(height: 30, width: 30)
            authorImageAlt: alt
          }
        }
        subtitle
        title
        slug
        reference
      }
    }
    datoCmsWebsiteSetting(locale: { eq: $locale }) {
      minsReadSuffix
      seeTheGuideButton
      seeAllButton
    }
  }
`;
