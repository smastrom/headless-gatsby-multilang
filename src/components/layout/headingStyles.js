import styled from 'styled-components';

// Hero

export const HeroAlt = styled.h2`
  color: var(--primaryColor);
  font-size: var(--baseXL);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  line-height: var(--headingsHeight);
  font-weight: 400;
`;

export const HeroTitle = styled.h1`
  font-size: var(--headingXXL);
  color: var(--headingsColor);
  text-align: ${({ centered }) => (centered ? 'center' : 'left')};
  line-height: var(--headingsHeight);

  @media screen and (max-width: 768px) {
    font-size: var(--headingXL);
  }
`;

export const HeroSubtitle = styled.p`
  font-size: var(--baseXL);
  color: var(--baseTextColor);
  text-align: ${({ centered }) => (centered ? 'center' : 'left')};
  line-height: var(--paragraphHeight);
`;

// Articles

export const ArticleTitle = styled(HeroTitle)`
  &&& {
    font-size: var(--headingXL);
    text-align: center;
    @media screen and (max-width: 860px) {
      text-align: left;
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
      text-align: left;
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
  text-align: left;
  font-weight: 700;
  line-height: 1.2;

  @media screen and (max-width: 768px) {
    font-size: var(--headingS);
  }
`;

export const HeadingSmall = styled.h1`
  font-size: var(--baseL);
  color: var(--headingsColor);
  text-align: left;
  font-weight: 700;
  line-height: 1.2;
  position: relative;
  --tipWidth: 3px;
  height: min-content;
  padding-left: ${({ hasTip }) => hasTip && 'calc(var(--tipWidth) * 3)'};

  &::before {
    ${({ hasTip }) =>
      hasTip &&
      `
          width: var(--tipWidth);
          border-radius: var(--tipWidth);
          height: 100%;
          left: 0;
          position: absolute;
          background: var(--primaryColor);
          display: block;
          content: "";
        `}
  }

  @media screen and (max-width: 768px) {
    font-size: var(--baseXL);
  }
`;
