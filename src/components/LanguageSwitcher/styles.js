import { Link as GatsbyLink } from 'gatsby';

import styled, { css } from 'styled-components';

const Nav = styled.nav`
  display: grid;
`;

const List = styled.ul`
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  column-gap: var(--gapRegular);

  @media (max-width: 768px) {
    column-gap: 0;
  }
`;

const ListItem = styled.li`
  & span {
    cursor: not-allowed;
    color: var(--primaryColor);
  }
`;

const Link = styled(GatsbyLink)`
  font-weight: 600;
  color: var(--baseTextColor);
  transition: color 0.2s linear;
  text-transform: uppercase;

  @media (hover: hover) {
    &:hover {
      color: var(--primaryColor);
    }
  }

  @media (max-width: 768px) {
    padding: var(--gapSmall);
  }

  ${({ isActive }) =>
    isActive &&
    css`
      color: var(--primaryColor);
      @media (hover: hover) {
        &:hover {
          color: var(--primaryColor);
        }
      }
    `}
`;

export { Nav, List, ListItem, Link };
