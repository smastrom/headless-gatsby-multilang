import styled, { css } from 'styled-components';

// Global

const CommonStyles = css`
  & ol {
    list-style-type: decimal;
    margin: var(--paragraphMargin);
    padding-left: 1.33em;
    line-height: 1.6;

    & li {
      & > ol {
        list-style-type: lower-roman;
        margin: var(--listMargin);
      }
      & p {
        margin: 0;
      }
      &::marker {
        color: var(--baseTextColorDark);
        font-size: var(--baseL);
      }
    }
  }

  & ul {
    list-style-type: disc;
    margin: var(--paragraphMargin);
    padding-left: 1.33em;
    line-height: 1.6;

    & li {
      & > ul {
        margin: var(--listMargin);
      }
      & p {
        margin: 0;
      }
      &::marker {
        color: var(--baseTextColor);
        font-size: var(--baseM);
      }
    }
  }

  & a {
    color: var(--primaryColor);
    text-decoration: underline;

    & > code {
      background: var(--primaryLight);
      padding: 0.1em 0.2em;
      border-radius: 5px;
    }
  }

  & p > code {
    background: var(--primaryLight);
    padding: 0.1em 0.2em;
    border-radius: 5px;
  }

  & pre {
    padding: var(--globalPaddingLr) !important;
    border-radius: var(--defaultRadius) !important;
    margin: var(--paragraphMargin) !important;

    @media screen and (max-width: 800px) {
      border-radius: 0 !important;
      margin: var(--paragraphBottomMargin) calc(var(--globalPaddingLr) * -1) !important;
    }
  }

  & mark {
    background: var(--markColor);
    color: var(--baseTextColorDark);
  }
`;

// Common paragraph containers

export const Paragraph = styled.p`
  --paragraphMargin: 0 0 1em 0;
  --listMargin: 0 0 0.33em 0;
  color: var(--baseTextColor);
  font-size: ${({ small }) => (small ? 'var(--baseS)' : 'var(--baseM)')};
  line-height: 1.4;
  text-align: ${({ centered }) => (centered ? 'center' : 'left')};

  & a {
    color: var(--primaryColor);
    text-decoration: underline;
  }

  & > p {
    margin: var(--paragraphMargin);

    &:only-child,
    &:last-child {
      margin: 0;
    }
  }

  & code {
    background: var(--baseColorLight);
    padding: 0.1em 0.2em;
    border-radius: 5px;
    color: var(--baseTextColorDark);
  }

  ${CommonStyles}

  @media screen and (max-width: 768px) {
    font-size: var(--baseMMobile);
  }
`;

// Structured Text

export const ArticleBody = styled.div`
  width: 700px;
  --paragraphBottomMargin: 1.6em;
  --paragraphMargin: 0 0 var(--paragraphBottomMargin) 0;
  --headingsMargin: 0 0 0.8em 0;
  --listMargin: 0 0 0.33em 0;

  & p {
    color: var(--baseTextColorDark);
    font-size: var(--baseL);
    margin: var(--paragraphMargin);

    &:only-child,
    &:last-child {
      margin: 0;
    }

    & + h2,
    + h3 {
      margin: 2em 0 0.8em 0;
    }
  }

  & h2,
  h3 {
    line-height: var(--headingsHeight);
    color: var(--headingsColor);
    margin: var(--headingsMargin);
  }

  & h2 {
    font-size: var(--headingM);
    @media screen and (max-width: 768px) {
      font-size: var(--headingS);
    }
  }

  & h3 {
    font-size: var(--headingS);
    @media screen and (max-width: 768px) {
      font-size: var(--baseL);
    }
  }

  & hr {
    margin: calc(var(--paragraphBottomMargin) * 2) 0;
    color: var(--dividerColor);
    background-color: var(--dividerColor);
    border: none;
    height: 1px;
  }

  ${CommonStyles}

  @media screen and (max-width: 860px) {
    width: 100%;
  }
`;

// Synthax hightlighter

export const LanguageContainer = styled.div`
  position: absolute;
  width: min-content;
  padding: 0 0.4em;
  background: var(--primaryColor);
  border-radius: calc(var(--defaultRadius) / 2);
  position: absolute;
  text-transform: uppercase;
  font-size: var(--baseS);
  color: white;
  right: calc(var(--defaultRadius) / 2);
  top: calc(var(--defaultRadius) / 2);

  @media screen and (max-width: 800px) {
    left: 0 !important;
    top: calc(calc(var(--baseS) / 1.5) * -1) !important;
    right: unset !important;
    border-radius: calc(var(--defaultRadius) / 2) 0;
  }
`;
