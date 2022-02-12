import React from 'react';
import styled from 'styled-components';

// Hero

export const HeroAlt = styled.h2`
  color: var(--primaryColor);
  font-size: var(--baseXL);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  line-height: var(--headingsLineHeight);
  font-weight: 400;
`;

export const HeroTitle = styled.h1`
  font-size: var(--headingXXL);
  color: var(--headingsColor);
  text-align: ${({ centered }) => (centered ? 'center' : 'inherit')};
  line-height: var(--headingsLineHeight);

  @media screen and (max-width: 768px) {
    font-size: var(--headingXL);
  }
`;

export const HeroSubtitle = styled.p`
  font-size: var(--baseXL);
  color: var(--baseTextColor);
  text-align: ${({ centered }) => (centered ? 'center' : 'inherit')};
  line-height: var(--bodyLineHeight);
`;

// Articles

export const ArticleTitle = styled(HeroTitle)`
  &&& {
    font-size: var(--headingXL);
    text-align: center;
    @media screen and (max-width: 860px) {
      text-align: inherit;
    }
    @media screen and (max-width: 768px) {
      font-size: var(--headingL);
    }
  }
`;

export const ArticleSubtitle = styled(HeroSubtitle)`
  &&& {
    text-align: center;
    @media screen and (max-width: 860px) {
      text-align: inherit;
    }
  }
`;

// Common

export const SectionTitle = styled(HeroTitle)`
  &&& {
    font-size: var(--headingL);

    @media screen and (max-width: 768px) {
      font-size: calc(var(--headingL) * 0.8);
    }
  }
`;

export const HeadingMedium = styled.h1`
  font-size: var(--headingM);
  color: var(--headingsColor);
  text-align: inherit;
  font-weight: 700;
  line-height: 1.2;

  @media screen and (max-width: 768px) {
    font-size: var(--headingS);
  }
`;

export const HeadingSmall = styled.h1`
  font-size: var(--baseL);
  color: var(--headingsColor);
  text-align: inherit;
  font-weight: 700;
  line-height: 1.2;

  @media screen and (max-width: 768px) {
    font-size: var(--baseXL);
  }
`;

const HeadingSmallTip = styled(HeadingSmall)`
  &&& {
    --tipWidth: 3px;
    column-gap: var(--gapSmall);
    display: grid;
    grid-template-columns: var(--tipWidth) auto;
  }
`;

const Tip = styled.span`
  width: var(--tipWidth);
  border-radius: var(--tipWidth);
  height: 100%;
  background: var(--primaryColor);
`;

export const HeadingSmallWithTip = ({ children }) => (
  <HeadingSmallTip>
    <Tip />
    {children}
  </HeadingSmallTip>
);
