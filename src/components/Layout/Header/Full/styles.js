import styled from 'styled-components';

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--globalPaddingLr);
  width: 100%;
  position: relative;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: var(--globalContainer);
  align-items: center;
`;

const Nav = styled.nav`
  @media screen and (max-width: 768px) {
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

  @media screen and (max-width: 860px) {
    column-gap: var(--gapL);
  }
`;

const Right = styled.div`
  display: grid;
  grid-auto-flow: column;
  column-gap: var(--gapRegular);

  @media screen and (max-width: 768px) {
    grid-template-columns: auto auto auto;
  }
`;

const VerticalDivider = styled.span`
  height: 100%;
  width: var(--borderSmall);
  background: var(--dividerColor);
  display: ${({ hideOnDesktop }) => (hideOnDesktop ? 'none' : 'block')};

  @media screen and (max-width: 768px) {
    display: ${({ hideOnMobile }) => (hideOnMobile ? 'none' : 'block')};
  }
`;

export { Wrapper, Container, Nav, NavList, Right, VerticalDivider };
