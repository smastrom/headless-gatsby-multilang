import React from 'react';
import { graphql } from 'gatsby';
import { StructuredText } from 'react-datocms';
import { Navigator } from '../components/LanguageHelpers/Navigator';
import { PageWrapper } from '../components/Layout/PageWrapper';
import { Hero } from '../components/Layout/Hero';
import {
  SectionContainerGridThreeCols,
  SectionContainerFlexTwoCols,
  SectionWrapper,
  SectionContainerFlexTwoColsReverse,
  ColumnFlexTwoCols,
  TextBox,
} from '../components/Layout/SharedStyles/Sections';
import {
  HeadingMedium,
  HeadingSmallWithTip,
} from '../components/Layout/SharedStyles/Headings';
import { RichText } from '../components/Layout/SharedStyles/TextContainers';

const OtherPageTemplate = ({
  data: {
    datoCmsOtherPage: { seo, structuredBody },
  },
  pageContext,
}) => (
  <PageWrapper
    pageData={pageContext}
    seoTitle={seo?.seoTitle}
    seoDescription={seo?.seoDescription}
    seoImage={seo?.seoImage?.seoImageUrl}
  >
    {structuredBody?.value && (
      <StructuredText
        data={structuredBody}
        renderBlock={({
          record: {
            __typename,
            heroAlt,
            heroTitle,
            heroSubtitle,
            image,
            title,
            text,
            firstFeatureTitle,
            firstFeatureDescription,
            secondFeatureTitle,
            secondFeatureDescription,
            thirdFeatureTitle,
            thirdFeatureDescription,
          },
        }) => {
          switch (__typename) {
            case 'DatoCmsHero':
              return (
                <Hero alt={heroAlt} title={heroTitle} subtitle={heroSubtitle} />
              );
            case 'DatoCmsSectionImageLeft':
              return (
                <SectionWrapper>
                  <SectionContainerFlexTwoCols>
                    <ColumnFlexTwoCols hasImg>
                      <img src={image.url} alt={image.alt} />
                    </ColumnFlexTwoCols>
                    <ColumnFlexTwoCols>
                      <TextBox as="div">
                        <HeadingMedium>{title}</HeadingMedium>
                        <RichText as="div">
                          <StructuredText
                            data={text}
                            renderLinkToRecord={({
                              record: { id },
                              children,
                              transformedMeta,
                            }) => (
                              <Navigator {...transformedMeta} recordId={id}>
                                {children}
                              </Navigator>
                            )}
                          />
                        </RichText>
                      </TextBox>
                    </ColumnFlexTwoCols>
                  </SectionContainerFlexTwoCols>
                </SectionWrapper>
              );
            case 'DatoCmsSectionImageRight':
              return (
                <SectionWrapper>
                  <SectionContainerFlexTwoColsReverse>
                    <ColumnFlexTwoCols>
                      <TextBox as="div">
                        <HeadingMedium>{title}</HeadingMedium>
                        <RichText as="div">
                          <StructuredText
                            data={text}
                            renderLinkToRecord={({
                              record: { id },
                              children,
                              transformedMeta,
                            }) => (
                              <Navigator {...transformedMeta} recordId={id}>
                                {children}
                              </Navigator>
                            )}
                          />
                        </RichText>
                      </TextBox>
                    </ColumnFlexTwoCols>
                    <ColumnFlexTwoCols hasImg>
                      <img src={image.url} alt={image.alt} />
                    </ColumnFlexTwoCols>
                  </SectionContainerFlexTwoColsReverse>
                </SectionWrapper>
              );
            case 'DatoCmsThreeFeaturesSet':
              return (
                <SectionWrapper>
                  <SectionContainerGridThreeCols>
                    <TextBox small>
                      <HeadingSmallWithTip>
                        {firstFeatureTitle}
                      </HeadingSmallWithTip>
                      <RichText>{firstFeatureDescription}</RichText>
                    </TextBox>
                    <TextBox small>
                      <HeadingSmallWithTip>
                        {secondFeatureTitle}
                      </HeadingSmallWithTip>
                      <RichText>{secondFeatureDescription}</RichText>
                    </TextBox>
                    <TextBox small>
                      <HeadingSmallWithTip>
                        {thirdFeatureTitle}
                      </HeadingSmallWithTip>
                      <RichText>{thirdFeatureDescription}</RichText>
                    </TextBox>
                  </SectionContainerGridThreeCols>
                </SectionWrapper>
              );
            default:
              return null;
          }
        }}
      />
    )}
  </PageWrapper>
);

export default OtherPageTemplate;

export const query = graphql`
  query OtherPageQuery($locale: String!, $id: String!) {
    datoCmsOtherPage(locale: { eq: $locale }, originalId: { eq: $id }) {
      seo {
        seoTitle: title
        seoDescription: description
        seoImage: image {
          seoImageUrl: url
        }
      }
      structuredBody {
        value
        blocks {
          ... on DatoCmsHero {
            id: originalId
            __typename
            heroTitle
            heroSubtitle
            heroAlt
          }
          ... on DatoCmsSectionImageLeft {
            __typename
            id: originalId
            title
            image {
              url
              gatsbyImageData
              alt
            }
            text {
              value
              links {
                ... on DatoCmsOtherPage {
                  id: originalId
                }
                ... on DatoCmsHomepage {
                  id: originalId
                }
              }
            }
          }
          ... on DatoCmsSectionImageRight {
            __typename
            id: originalId
            title
            image {
              url
              gatsbyImageData
              alt
            }
            text {
              value
              links {
                ... on DatoCmsOtherPage {
                  id: originalId
                }
                ... on DatoCmsHomepage {
                  id: originalId
                }
              }
            }
          }
          ... on DatoCmsThreeFeaturesSet {
            __typename
            id: originalId
            firstFeatureTitle
            firstFeatureDescription
            secondFeatureTitle
            secondFeatureDescription
            thirdFeatureTitle
            thirdFeatureDescription
          }
        }
      }
    }
  }
`;
