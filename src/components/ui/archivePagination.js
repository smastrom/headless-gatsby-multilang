import styled from 'styled-components';
import { Link } from 'gatsby';

export const ArchiveNav = styled.nav`
  margin: var(--globalPaddingTb) 0 0 0;
`;

export const ArchiveList = styled.ol`
  display: grid;
  grid-auto-flow: column;
  column-gap: var(--gapRegular);

  & span {
    cursor: not-allowed;
    color: var(--primaryColor);
    border-color: var(--primaryColor);
  }
`;

export const ArchiveListLink = styled(Link)`
  --size: 40px;
  font-weight: 600;
  font-size: var(--baseL);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--size);
  width: var(--size);
  height: var(--size);
  color: var(--baseTextColor);
  border: 2px solid var(--baseTextColor);
  transition: color 0.2s linear, border-color 0.2s linear;

  &:hover {
    color: var(--primaryColor);
    border: 2px solid var(--primaryColor);
  }
`;
