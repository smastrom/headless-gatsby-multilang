import React from 'react';
import styled from 'styled-components';
import { GatsbyImage, getImage, withArtDirection } from 'gatsby-plugin-image';
import Navigator from '../langHelpers/navigator';
import { HeadingSmall } from '../layout/headingStyles';

// Scoped styles

const CardLink = styled(Navigator)`
  width: 280px;
  row-gap: var(--gapSmall);
  display: grid;
  height: min-content;
  justify-content: start;

  @media screen and (max-width: 950px) {
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: var(--gapRegular);
    align-items: initial;
  }
`;

const CardImg = styled(GatsbyImage)`
  border-radius: var(--defaultRadius);
  z-index: 2;

  @media screen and (max-width: 950px) {
    min-width: 50px;
    min-height: 50px;
  }

  & picture {
    & img {
      border-radius: var(--defaultRadius);
      // Gatsby Image override
      @media screen and (max-width: 950px) {
        height: unset !important;
      }
    }
  }
`;

export const CardImgArtDir = (cardImg, cardImgMobile, altImg) => {
  const cardImgs = withArtDirection(getImage(cardImg), [
    {
      media: '(max-width: 950px)',
      image: getImage(cardImgMobile),
    },
  ]);
  return <CardImg objectFit="contain" image={cardImgs} alt={altImg || ''} />;
};

const ContentWrapper = styled.div`
  row-gap: var(--gapSmall);
  display: grid;

  @media screen and (max-width: 950px) {
    row-gap: calc(var(--gapSmall) / 2);
    grid-column: 2 / span 2;
  }
`;

export const DateTimeContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
  width: max-content;
  column-gap: var(--gapSmall);

  @media screen and (max-width: 950px) {
    grid-row: 3;
  }
`;

const PostTitle = styled(HeadingSmall)`
  &&& {
    line-height: 1.1;
  }
  margin: calc(var(--gapSmall) - 0.66em) 0;

  @media screen and (max-width: 950px) {
    margin: unset;
  }

  @media screen and (max-width: 768px) {
    font-size: var(--baseMMobile);
  }
`;

const Date = styled.time`
  color: var(--baseTextColor);
  font-size: var(--baseS);
  text-transform: capitalize;

  @media screen and (max-width: 768px) {
    font-size: var(--baseSMobile);
  }
`;

export const Dot = styled.span`
  --widthHeight: 0.33em;
  width: var(--widthHeight);
  height: var(--widthHeight);
  background: var(--baseTextColor);
  border-radius: 0.33em;

  @media screen and (min-width: 621px) and (max-width: 680px) {
    display: none;
  }
`;

const Excerpt = styled.p`
  color: var(--baseTextColor);
  font-size: var(--baseM);
  line-height: 1.3;
`;

const AuthorCtaContainer = styled.footer`
  display: flex;
  grid-template-columns: auto auto;
  column-gap: var(--gapRegular);
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 950px) {
    grid-row: 1;

    & a {
      display: none;
    }
  }
`;

const AuthorContainer = styled.div`
  --imgWidthHeight: 25px;
  display: grid;
  grid-template-columns: var(--imgWidthHeight) auto;
  column-gap: var(--gapSmall);
  align-items: center;

  @media screen and (max-width: 950px) {
    --imgWidthHeight: 20px;
    column-gap: calc(var(--gapSmall) - 0.33em);
    grid-template-columns: var(--imgWidthHeight) auto;
  }
`;

const AuthorImg = styled(GatsbyImage)`
  width: var(--imgWidthHeight);
  height: var(--imgWidthHeight);

  & img {
    border-radius: var(--imgWidthHeight);
  }
`;

// Main Component

const ArticleCard = ({
  slug,
  cardImg,
  date,
  title,
  excerpt,
  authorImg,
  authorAltImg,
  authorName,
  categorySlug,
}) => (
  <article>
    <CardLink article categorySlug={categorySlug} to={slug}>
      {cardImg}
      <ContentWrapper>
        <DateTimeContainer>
          <Date>{date}</Date>
          <Dot />
        </DateTimeContainer>
        <PostTitle>{title}</PostTitle>
        <Excerpt>{excerpt}</Excerpt>
        <AuthorCtaContainer>
          <AuthorContainer>
            <AuthorImg image={authorImg || ''} alt={authorAltImg || ''} />
            <Date as="address">{authorName}</Date>
          </AuthorContainer>
        </AuthorCtaContainer>
      </ContentWrapper>
    </CardLink>
  </article>
);

export default ArticleCard;
