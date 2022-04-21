import styled from 'styled-components';

const Wrapper = styled.header`
  padding: 0 var(--globalPaddingLr);
  margin: auto;
  width: 100%;
  max-width: var(--globalContainer);
`;

const Container = styled.div`
  width: 100%;
  padding: var(--globalPaddingLr) 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--dividerColor);
`;

const Nav = styled.nav`
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  column-gap: var(--gapXL);

  & li a {
    color: var(--headingsColor);
    transition: color 0.1s linear;
    font-weight: 600;
    &:hover {
      color: var(--primaryColor);
    }
  }

  @media (max-width: 860px) {
    column-gap: var(--gapL);
  }
`;

const Right = styled.div`
  display: grid;
  grid-auto-flow: column;
  column-gap: var(--gapRegular);

  @media (max-width: 768px) {
    grid-template-columns: auto auto auto;
  }
`;

const VerticalDivider = styled.span`
  height: 100%;
  width: var(--borderSmall);
  background: var(--dividerColor);
  display: ${({ hideOnDesktop }) => (hideOnDesktop ? 'none' : 'block')};

  @media (max-width: 768px) {
    display: ${({ hideOnMobile }) => (hideOnMobile ? 'none' : 'block')};
  }
`;

export { Wrapper, Container, Nav, NavList, Right, VerticalDivider };
