import React from 'react';
import styled from 'styled-components';
import { useTextDirection } from '../../../hooks/useTextDirection';
import { Navigator } from '../../LanguageHelpers/Navigator';

const Nav = styled.nav`
  display: grid;
  grid-template-columns: ${({ skipNext }) =>
    skipNext === 1 ? '1fr' : '1fr 1fr'};
  width: 700px;
  margin: var(--gapXL) 0 0 0;
  column-gap: var(--gapSmall);

  @media screen and (max-width: 860px) {
    width: 100%;
  }
`;

const LinkContainerLeft = styled.div`
  display: grid;
  grid-template-rows: repeat(2, min-content);
  align-content: baseline;
  row-gap: var(--gapSmall);
  justify-items: inherit;
  text-align: inherit;
`;

const LinkContainerRight = styled(LinkContainerLeft)`
  &&& {
    text-align: ${({ isRtl }) => (isRtl ? 'start' : 'end')};
  }
`;

const Heading = styled.div`
  font-size: var(--baseM);
  line-height: 1;
`;

const Link = styled(Navigator)`
  line-height: 1.2;
  color: var(--primaryColor);
  font-size: var(--baseL);
  font-weight: 600;

  @media (hover: hover) {
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const PrevNextNav = ({
  skipNextValue,
  prevHeading,
  prevPostTitle,
  prevRecordId,
  nextHeading,
  nextPostTitle,
  nextRecordId,
}) => {
  const { isRtl } = useTextDirection();

  return (
    <Nav skipNext={skipNextValue}>
      {skipNextValue >= 0 && skipNextValue !== 1 && (
        <LinkContainerLeft>
          <Heading>{prevHeading}</Heading>
          <Link recordId={prevRecordId}>{prevPostTitle}</Link>
        </LinkContainerLeft>
      )}
      {skipNextValue > 0 && (
        <LinkContainerRight isRtl={isRtl}>
          <Heading>{nextHeading}</Heading>
          <Link recordId={nextRecordId}>{nextPostTitle}</Link>
        </LinkContainerRight>
      )}
    </Nav>
  );
};
