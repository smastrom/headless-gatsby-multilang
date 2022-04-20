import styled, { css } from 'styled-components';

const Wrapper = styled.section`
  width: 100%;
  display: grid;
  padding: var(--globalPaddingTb) var(--globalPaddingLr);
  margin: auto;
  row-gap: var(--gapXL);
  max-width: var(--globalContainer);
  align-items: center;

  ${({ isFullViewport }) =>
    isFullViewport &&
    css`
      justify-content: center;
      height: 100vh;

      & > div {
        justify-items: center;
        text-align: center;
      }
    `};
`;

const TextBox = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: var(--gapRegular);
  width: 600px;
  height: max-content;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Caption = styled.h2`
  color: var(--primaryColor);
  font-size: var(--baseXL);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  line-height: var(--headingsLineHeight);
  font-weight: 400;
`;

const Title = styled.h1`
  font-size: var(--headingXXL);
  color: var(--headingsColor);
  line-height: var(--headingsLineHeight);

  @media (max-width: 768px) {
    font-size: var(--headingXL);
  }
`;

const Subtitle = styled.p`
  font-size: var(--baseXL);
  color: var(--baseTextColor);
  line-height: var(--bodyLineHeight);
`;

export { Wrapper, TextBox, Caption, Title, Subtitle };
