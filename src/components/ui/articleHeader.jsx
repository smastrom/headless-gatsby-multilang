import React, { useContext } from 'react';
import styled from 'styled-components';
import { GatsbyImage } from 'gatsby-plugin-image';
import { useLocation } from '@reach/router';
import useSiteUrl from '../../hooks/useSiteUrl';
import { ArticleTitle, ArticleSubtitle } from '../layout/headingStyles';
import BackButtonIcon from '../vectors/backButton';
import Navigator from '../langHelpers/navigator';
import * as Social from '../vectors/socialIcons';
import { LangContext } from '../../context/langProvider';
import { formatDate, formatDateTime } from '../../utils/dateTime';

// Scoped styles

const BackButtonWrapper = styled(Navigator)`
  margin-bottom: var(--gapSmall);

  @media (hover: hover) {
    & svg g path {
      transition: 0.2s fill linear;
      &:hover {
        fill: var(--primaryColor);
      }
    }
  }
`;

const Header = styled.header`
  display: grid;
  width: 800px;
  grid-auto-flow: row;
  row-gap: var(--gapSmall);
  justify-items: center;

  @media screen and (max-width: 860px) {
    justify-items: left;
    width: 100%;
  }
`;

const AuthorDateContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  column-gap: var(--gapSmall);
  align-items: center;
  width: max-content;
`;

const Author = styled.address`
  font-size: var(--baseM);

  @media screen and (max-width: 768px) {
    font-size: var(--baseMMobile);
  }
`;

const ImgFullWrapper = styled.div`
  --authorImgSize: 60px;
  --sharingIconSize: 35px;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: var(--gapRegular);
  margin: var(--gapRegular) 0 calc(var(--gapRegular) * 2)
    calc(var(--sharingIconSize) + var(--gapRegular));
  align-items: center;

  @media screen and (max-width: 860px) {
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

  @media screen and (max-width: 860px) {
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
  width: 700px;
  margin: calc(var(--authorImgSize) / 2 * -1) 0 0 0;
  & img {
    border-radius: calc(var(--defaultRadius) * 2);
  }

  @media screen and (max-width: 860px) {
    width: calc(100% + calc(var(--globalPaddingLr) * 2));
    height: 300px;
    margin: calc(var(--authorImgSize) / 2 * -1) 0 0
      calc(var(--globalPaddingLr) * -1);
    border-radius: 0;
    & img {
      border-radius: 0;
    }
  }

  @media screen and (max-width: 768px) {
    height: 250px;
  }
`;

export const BodyImg = styled(ArticleCover)`
  &&& {
    margin: 0 0 var(--paragraphBottomMargin) 0;

    @media screen and (max-width: 860px) {
      margin: 0 0 var(--paragraphBottomMargin) calc(var(--globalPaddingLr) * -1);
    }
  }
`;

const SharingIcons = styled.aside`
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  row-gap: var(--gapRegular);
  height: min-content;
  margin-top: calc(var(--authorImgSize) / 2);

  @media screen and (max-width: 860px) {
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
  background: var(--baseTextColor);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s background linear;

  &:hover {
    background: var(--primaryColor);
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

const commonTransition = `200ms ease-out`;

const CategoryBox = styled.h2`
  position: relative;
  border-radius: var(--defaultRadius);
  background: var(--primaryLight);
  color: var(--primaryColor);
  text-transform: uppercase;
  font-size: var(--baseM);
  font-weight: 600;
  line-height: 1;
  white-space: nowrap;
  letter-spacing: 0.025em;
  padding: 0.3em 0.5em 0.4em 0.5em;
  cursor: pointer;
  border: 3px solid white;
  transition: background ${commonTransition}, color ${commonTransition};

  @media screen and (max-width: 860px) {
    left: -0.25em;
  }

  @media (hover: hover) {
    &:hover {
      background: var(--primaryColor);
      color: var(--primaryLight);
    }
  }
`;

const LastModified = styled.time`
  font-style: italic;
  margin-top: var(--gapRegular);
  font-size: var(--baseM);
`;

// Main Component

const ArticleHeader = ({
  authorName,
  date,
  title,
  subtitle,
  authorImg,
  coverImg,
  authorImgAlt,
  coverImgAlt,
  lastModified,
  lastModifiedText,
}) => {
  const { siteUrl } = useSiteUrl();
  const { pathname } = useLocation();
  const { currentLanguage } = useContext(LangContext);

  const commonExtLinkProps = {
    rel: 'noreferrer',
    target: '_blank',
  };

  return (
    <>
      <Header>
        <BackButtonWrapper archive>
          <BackButtonIcon />
        </BackButtonWrapper>
        <CategoryBox>React</CategoryBox>
        <AuthorDateContainer>
          <Author>{authorName}</Author>
          <Dot />
          <Author as="time">{formatDate(date, currentLanguage)}</Author>
        </AuthorDateContainer>
        <ArticleTitle>{title}</ArticleTitle>
        <ArticleSubtitle>{subtitle}</ArticleSubtitle>
        <LastModified>{`${lastModifiedText}: ${formatDateTime(
          lastModified,
          currentLanguage
        )}`}</LastModified>
      </Header>
      <ImgFullWrapper>
        <ImgWrapper>
          <AuthorImg image={authorImg} alt={authorImgAlt} />
          <ArticleCover image={coverImg} alt={coverImgAlt} />
        </ImgWrapper>
        <SharingIcons>
          <Icon
            {...commonExtLinkProps}
            href={`https://www.facebook.com/sharer/sharer.php?u=${siteUrl}${pathname}`}
          >
            <Social.FacebookIcon />
          </Icon>
          <Icon
            {...commonExtLinkProps}
            href={`https://twitter.com/share?url=${siteUrl}${pathname}`}
          >
            <Social.TwitterIcon />
          </Icon>
          <Icon
            {...commonExtLinkProps}
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${siteUrl}${pathname}`}
          >
            <Social.LinkedinIcon />
          </Icon>
        </SharingIcons>
      </ImgFullWrapper>
    </>
  );
};

export default ArticleHeader;
