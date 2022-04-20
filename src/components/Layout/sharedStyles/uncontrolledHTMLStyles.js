import { css } from 'styled-components';

/**
 * Base styles added to any component rendering uncontrolled vanilla
 * HTML such as Markdown or Structured Text
 */

export const uncontrolledHTMLStyles = css`
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

  & mark {
    background: var(--markBackgroundColor);
    color: var(--markTextColor);
  }

  /* Code block styles */

  & pre {
    padding: var(--globalPaddingLr) !important;
    border-radius: var(--defaultRadius) !important;
    margin: var(--paragraphMargin) !important;
    background: var(--codeBlockBackgroundColor) none repeat scroll 0% 0% !important;
    border: var(--borderSmall) solid var(--dividerColor) !important;

    @media (max-width: 800px) {
      border-radius: 0 !important;
      margin: var(--paragraphBottomMargin) calc(var(--globalPaddingLr) * -1) !important;
    }

    & code {
      font-family: var(--defaultCodeStack) !important;
    }
  }
`;
