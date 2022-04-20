// Rich Text Container - Used for common mdx or StructuredText containers outside the blog

import styled, { css } from 'styled-components';
import { uncontrolledHTMLStyles } from '../sharedStyles/uncontrolledHTMLStyles';

export const RichTextStyles = styled.div`
  ${uncontrolledHTMLStyles};

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
  font-size: var(--baseM);
  line-height: 1.4;
  text-align: inherit;

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

  @media (max-width: 768px) {
    font-size: var(--baseMMobile);
  }
`;
