import { GatsbyImage } from 'gatsby-plugin-image';

import styled from 'styled-components';

import { easeOutTiming } from '../../sharedStyles/animationStyles';

const Wrapper = styled.header`
  display: grid;
  width: 800px;
  grid-auto-flow: row;
  row-gap: var(--gapSmall);
  justify-items: center;
  margin: auto;
  max-width: 800px;
  width: 100%;

  @media (max-width: 860px) {
    justify-items: inherit;
  }
`;

const AuthorDateContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  column-gap: var(--gapSmall);
  align-items: center;
  width: max-content;
`;

const Author = styled.address`
  font-size: var(--baseM);

  @media (max-width: 768px) {
    font-size: var(--baseMMobile);
  }
`;

const ImgFullWrapper = styled.div`
  --authorImgSize: 60px;
  --sharingIconSize: 35px;
  display: grid;
  width: max-content;
  grid-template-columns: auto auto;
  column-gap: var(--gapRegular);
  align-items: center;
  margin: ${({ $isRtl }) =>
    $isRtl
      ? `var(--gapRegular) calc(var(--sharingIconSize) + var(--gapRegular)) calc(var(--gapRegular) * 2) 0
  `
      : `var(--gapRegular) 0 calc(var(--gapRegular) * 2)
  calc(var(--sharingIconSize) + var(--gapRegular))`};

  @media (max-width: 860px) {
    width: 100%;
    align-items: left;
    margin: var(--gapRegular) 0 calc(var(--gapRegular) * 2) 0;
    grid-template-columns: 1fr;
  }
`;

const ImgWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;

  @media (max-width: 860px) {
    align-items: flex-start;
  }
`;

const AuthorImg = styled(GatsbyImage)`
  height: var(--authorImgSize);
  width: var(--authorImgSize);
  border-radius: var(--authorImgSize);
  border: 4px solid white;
  z-index: 1;
  position: relative;
`;

const ArticleCover = styled(GatsbyImage)`
  height: 350px;
  border-radius: calc(var(--defaultRadius) * 2);
  width: var(--articleContainer);
  margin: calc(var(--authorImgSize) / 2 * -1) 0 0 0;

  & img {
    border-radius: calc(var(--defaultRadius) * 2);
  }

  @media (max-width: 860px) {
    width: calc(100% + calc(var(--globalPaddingLr) * 2));
    height: 300px;
    border-radius: 0;
    margin: ${({ $isRtl }) =>
      $isRtl
        ? 'calc(var(--authorImgSize) / 2 * -1) calc(var(--globalPaddingLr) * -1) 0 0'
        : 'calc(var(--authorImgSize) / 2 * -1) 0 0 calc(var(--globalPaddingLr) * -1)'};

    & img {
      border-radius: 0;
    }
  }

  @media (max-width: 768px) {
    height: 250px;
  }
`;

const SharingIcons = styled.aside`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  row-gap: var(--gapRegular);
  height: min-content;
  margin-top: calc(var(--authorImgSize) / 2);

  @media (max-width: 860px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    width: min-content;
    column-gap: var(--gapRegular);
  }
`;

const Icon = styled.a`
  height: var(--sharingIconSize);
  width: var(--sharingIconSize);
  border-radius: var(--sharingIconSize);
  border: var(--borderRegular) solid var(--baseTextColor);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 200ms border linear;

  & svg {
    & path {
      transition: 200ms fill linear;
      fill: var(--baseTextColor);
    }
  }

  @media (hover: hover) {
    &:hover {
      & svg path {
        fill: var(--primaryColor);
      }
      border: var(--borderRegular) solid var(--primaryColor);
    }
  }
`;

const Dot = styled.span`
  --widthHeight: 0.33em;
  width: var(--widthHeight);
  height: var(--widthHeight);
  background: var(--baseTextColor);
  border-radius: 0.33em;

  @media (min-width: 621px) and (max-width: 680px) {
    display: none;
  }
`;

const CategoryBox = styled.h2`
  position: relative;
  width: max-content;
  border-radius: var(--defaultRadius);
  text-transform: uppercase;
  font-size: var(--baseM);
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  letter-spacing: 0.025em;
  padding: 0.3em 0.5em 0.4em 0.5em;
  cursor: pointer;
  border: var(--borderRegular) solid var(--primaryColor);
  transition: background ${easeOutTiming}, color ${easeOutTiming};

  @media (max-width: 860px) {
    left: -0.25em;
  }

  @media (hover: hover) {
    &:hover {
      background: var(--primaryColor);
      & a {
        color: white;
      }
    }
  }

  & a {
    color: var(--primaryColor);
  }
`;

const LastModified = styled.time`
  font-style: italic;
  margin-top: var(--gapRegular);
  font-size: var(--baseM);
`;

export {
  Wrapper,
  AuthorDateContainer,
  Author,
  ImgFullWrapper,
  ImgWrapper,
  AuthorImg,
  ArticleCover,
  SharingIcons,
  Icon,
  Dot,
  CategoryBox,
  LastModified,
};
