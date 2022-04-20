import styled, { css } from 'styled-components';

import { uncontrolledHTMLStyles } from '../../sharedStyles/uncontrolledHTMLStyles';

export const ArticleBodyStyles = styled.div`
  ${uncontrolledHTMLStyles}

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
  width: var(--articleContainer);

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
    @media (max-width: 768px) {
      font-size: var(--headingS);
    }
  }

  & h3 {
    font-size: var(--headingS);
    @media (max-width: 768px) {
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

  @media (max-width: 860px) {
    width: 100%;
  }

  #code_tip {
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

    @media (max-width: 800px) {
      left: 0 !important;
      top: calc(calc(var(--baseS) / 1.5) * -1) !important;
      right: unset !important;
      border-radius: calc(var(--defaultRadius) / 2) 0;
    }
  }
`;
