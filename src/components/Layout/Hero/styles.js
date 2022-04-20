import styled from 'styled-components';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${({ fullView }) => fullView && '100vh'};
  padding: var(--globalPaddingTb) var(--globalPaddingLr);
  flex-direction: column;
  position: relative;
`;

const Container = styled.div`
  width: var(--globalContainer);
  display: grid;
  row-gap: var(--gapXL);
  justify-content: ${({ centered }) => centered && 'center'};
  width: 100%;
  max-width: var(--globalContainer);
`;

const TextBox = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: var(--gapRegular);
  width: 600px;
  justify-items: ${({ centered }) => centered && 'center'};
  @media screen and (max-width: 767px) {
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
  text-align: ${({ centered }) => (centered ? 'center' : 'inherit')};
  line-height: var(--headingsLineHeight);

  @media screen and (max-width: 768px) {
    font-size: var(--headingXL);
  }
`;

const Subtitle = styled.p`
  font-size: var(--baseXL);
  color: var(--baseTextColor);
  text-align: ${({ centered }) => (centered ? 'center' : 'inherit')};
  line-height: var(--bodyLineHeight);
`;

export { Wrapper, Container, TextBox, Caption, Title, Subtitle };
