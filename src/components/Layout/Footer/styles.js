import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: var(--globalContainer);
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: var(--globalContainer);

  @media screen and (max-width: 950px) {
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

export { Container, Column };
