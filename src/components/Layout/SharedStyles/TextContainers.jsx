import React from 'react';
import styled, { css } from 'styled-components';
import { useTextDirection } from '../../../hooks/useTextDirection';

const commonStyles = css`
  & ol {
    list-style-type: decimal;
    margin: var(--paragraphMargin);
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
        color: var(--baseTextColor);
        font-size: var(--baseL);
      }
    }
  }

  & ul {
    list-style-type: disc;
    margin: var(--paragraphMargin);
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
      background: var(--inlineCodeBackgroundColor);
      padding: 0.1em 0.2em;
      border-radius: 5px;
    }
  }

  & p > code {
    background: var(--inlineCodeBackgroundColor);
    color: var(--inlineCodeTextColor);
    padding: 0.1em 0.2em;
    border-radius: 5px;
  }

  & pre {
    padding: var(--globalPaddingLr) !important;
    border-radius: var(--defaultRadius) !important;
    margin: var(--paragraphMargin) !important;
    background: var(--codeBlockBackgroundColor) none repeat scroll 0% 0% !important;
    border: var(--borderSmall) solid var(--dividerColor) !important;

    @media screen and (max-width: 800px) {
      border-radius: 0 !important;
      margin: var(--paragraphBottomMargin) calc(var(--globalPaddingLr) * -1) !important;
    }
  }

  & mark {
    background: var(--markBackgroundColor);
    color: var(--markTextColor);
  }
`;

// Rich Text Container - Used for common mdx or StructuredText containers outside the blog

const RichTextStyles = styled.div`
  ${commonStyles}

  ${({ isRtl }) =>
    isRtl
      ? css`
          ol,
          ul {
            padding-right: 1.33em;
          }
        `
      : css`
          ol,
          ul {
            padding-left: 1.33em;
          }
        `}

  --paragraphMargin: 0 0 1em 0;
  --listMargin: 0 0 0.33em 0;
  color: var(--baseTextColor);
  font-size: ${({ small }) => (small ? 'var(--baseS)' : 'var(--baseM)')};
  line-height: 1.4;
  text-align: ${({ centered }) => (centered ? 'center' : 'inherit')};

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
    background: var(--inlineCodeBackgroundColor);
    padding: 0.1em 0.2em;
    border-radius: 5px;
    color: var(--inlineCodeTextColor);
  }

  @media screen and (max-width: 768px) {
    font-size: var(--baseMMobile);
  }
`;

export const RichText = ({ children }) => {
  const { isRtl } = useTextDirection();
  return <RichTextStyles isRtl={isRtl}>{children}</RichTextStyles>;
};

// StructuredText container for the article body

const ArticleBodyStyles = styled.div`
  ${commonStyles}

  ${({ isRtl }) =>
    isRtl
      ? css`
          ol,
          ul {
            padding-right: 1.33em;
          }
        `
      : css`
          ol,
          ul {
            padding-left: 1.33em;
          }
        `}

  --paragraphBottomMargin: 1.6em;
  --paragraphMargin: 0 0 var(--paragraphBottomMargin) 0;
  --headingsMargin: 0 0 0.8em 0;
  --listMargin: 0 0 0.33em 0;
  width: 700px;

  & p {
    color: var(--baseTextColor);
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
    line-height: var(--headingsLineHeight);
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
    height: var(--borderSmall);
  }

  @media screen and (max-width: 860px) {
    width: 100%;
  }
`;

export const ArticleBody = ({ children }) => {
  const { isRtl } = useTextDirection();
  return <ArticleBodyStyles isRtl={isRtl}>{children}</ArticleBodyStyles>;
};

// Container for synthax hightlighter, overrides styles of the theme, used as custom rendered in StructuredText

export const CodeContainer = styled.div`
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
