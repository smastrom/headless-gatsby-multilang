import styled, { css } from 'styled-components';

import { Navigator } from '../../../Navigator';

const divider = 'var(--borderSmall) solid var(--dividerColor);';

const Wrapper = styled.div`
  max-width: var(--globalContainer);
  padding: 0 var(--globalPaddingLr) var(--borderRegular) var(--globalPaddingLr);
  margin: auto;
  width: 100%;
`;

const Container = styled.div`
  --scrollBarHeight: 6px;
  position: relative;
  border-top: ${divider};
  border-bottom: ${divider};

  &::after {
    position: absolute;
    content: '';
    width: var(--gapXL);
    z-index: 2;
    display: block;
    height: calc(100% - calc(var(--scrollBarHeight) * 2));
    top: 0;

    ${({ isRtl }) =>
      isRtl
        ? css`
            left: 0;
            background: linear-gradient(
              to left,
              var(--backgroundTransparentColor) 25%,
              var(--backgroundColor) 75%
            );
          `
        : css`
            right: 0;
            background: linear-gradient(
              to right,
              var(--backgroundTransparentColor) 25%,
              var(--backgroundColor) 75%
            );
          `}
  }
`;

const Nav = styled.nav`
  width: var(--globalContainer);
  padding: var(--gapRegular) 0
    calc(var(--gapRegular) - calc(var(--scrollBarHeight) / 2)) 0;
  overflow: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--dividerColor) var(--transparent);
  width: 100%;
  max-width: var(--globalContainer);

  &::-webkit-scrollbar {
    height: var(--scrollBarHeight);
  }

  &::-webkit-scrollbar-track {
    background: var(--backgroundColorAlt);
  }

  &::-webkit-scrollbar-thumb {
    background-color: var(--dividerColor);
    border-radius: var(--scrollBarHeight);
    border: none;
  }
`;

const NavList = styled.ul`
  display: grid;
  grid-auto-flow: column;
  width: min-content;
  column-gap: var(--gapXL);

  & li:last-of-type > a {
    z-index: 3;
  }
`;

const CategoryLink = styled(Navigator)`
  color: var(--headingsColor);
  font-weight: 600;
  white-space: nowrap;
  position: relative;

  @media (hover: hover) {
    &:hover {
      color: var(--primaryColor);
    }
  }
`;

export { Wrapper, Container, Nav, NavList, CategoryLink };
