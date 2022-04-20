import styled from 'styled-components';

const Wrapper = styled.footer`
  width: var(--globalContainer);
  width: 100%;
  max-width: var(--globalContainer);
  margin: auto;
  padding: 0 var(--globalPaddingLr);
`;

const Container = styled.div`
  border-top: 1px solid var(--dividerColor);
  width: 100%;
  padding: var(--globalPaddingLr) 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 950px) {
    flex-direction: column;
    gap: var(--gapSmall);
  }
`;

const Column = styled.div`
  font-size: var(--baseS);
  text-align: center;

  & a {
    color: var(--primaryColor);

    @media (hover: hover) {
      text-decoration: underline;
    }
  }
`;

export { Wrapper, Container, Column };
