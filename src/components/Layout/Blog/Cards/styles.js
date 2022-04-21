import styled from 'styled-components';

import { GatsbyImage, getImage, withArtDirection } from 'gatsby-plugin-image';

import { HeadingSmall } from '../../sharedStyles/headingStyles';
import { easeOutTiming } from '../../sharedStyles/animationStyles';
import { Navigator } from '../../../Navigator';

const CardLink = styled(Navigator)`
  width: 100%;
  row-gap: var(--gapSmall);
  display: grid;
  height: min-content;
  justify-content: start;

  @media (max-width: 950px) {
    grid-template-columns: repeat(3, 1fr);
    column-gap: var(--gapRegular);
    align-items: initial;
    min-height: 120px;
  }

  @media (hover: hover) {
    &:hover {
      & h1 {
        color: var(--primaryColor);
      }
    }
  }
`;

const CardImgContainer = styled.div`
  display: flex;
`;

const CardImg = styled(GatsbyImage)`
  border-radius: var(--defaultRadius);
  z-index: 2;

  @media (max-width: 950px) {
    --widthMobile: 50px;
    min-width: var(--widthMobile);
    min-height: var(--widthMobile);
  }

  & picture {
    & img {
      border-radius: var(--defaultRadius);
      @media (max-width: 950px) {
        height: unset !important;
      }
    }
  }
`;

const CategoryBox = styled.span`
  width: max-content;
  white-space: nowrap;
  line-height: 0.8;
  position: relative;
  padding: 0.3em 0.5em 0.4em 0.5em;
  margin-bottom: -5px;
  border: var(--borderSmall) solid var(--primaryColor);
  color: var(--primaryColor);
  border-radius: 5px;
  font-size: var(--baseS);
  font-weight: 600;

  @media (max-width: 950px) {
    margin-bottom: 0;
  }
`;

const artDirectedCardImgs = (cardImg, cardImgMobile) => {
  const cardImgs = withArtDirection(getImage(cardImg), [
    {
      media: '(max-width: 950px)',
      image: getImage(cardImgMobile),
    },
  ]);
  return cardImgs;
};

const ContentWrapper = styled.div`
  row-gap: var(--gapSmall);
  display: grid;
  height: max-content;

  @media (max-width: 950px) {
    row-gap: calc(var(--gapSmall) / 1.5);
    grid-column: 2 / span 2;
  }
`;

const PostTitle = styled(HeadingSmall)`
  &&& {
    margin-top: ${({ isCategoryTitle }) =>
      isCategoryTitle ? '0.25em' : '-0.25em'};
    line-height: 1.1;
  }
  transition: color ${easeOutTiming};
  margin: calc(var(--gapSmall) - 0.66em) 0;

  @media (max-width: 950px) {
    margin: unset;
  }

  @media (max-width: 768px) {
    font-size: var(--baseMMobile);
  }
`;

const Date = styled.time`
  color: var(--baseTextColor);
  font-size: var(--baseS);
  text-transform: capitalize;

  @media (max-width: 768px) {
    font-size: var(--baseSMobile);
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
`;

const AuthorContainer = styled.div`
  --imgWidthHeight: 25px;
  display: grid;
  grid-template-columns: var(--imgWidthHeight) auto;
  column-gap: var(--gapSmall);
  align-items: center;

  @media (max-width: 950px) {
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

export {
  CardLink,
  CardImgContainer,
  CardImg,
  CategoryBox,
  ContentWrapper,
  PostTitle,
  Date,
  Excerpt,
  AuthorCtaContainer,
  AuthorContainer,
  AuthorImg,
  artDirectedCardImgs,
};
