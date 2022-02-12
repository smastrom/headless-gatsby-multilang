import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { BackButtonIcon } from '../Icons/BackButton';
import { usePageLanguage } from '../../../hooks/usePageLanguage';
import { Navigator } from '../../LanguageHelpers/Navigator';
import { useTextDirection } from '../../../hooks/useTextDirection';
import { easeOutTiming } from '../SharedStyles/animations';

const Button = styled(Navigator)`
  margin-bottom: var(--gapRegular);
  transform: ${({ $isRtl }) => $isRtl && 'rotate(180deg)'};

  & svg path {
    transition: fill ${easeOutTiming};
  }

  @media (hover: hover) {
    &:hover {
      & svg path {
        fill: var(--primaryColor);
      }
    }
  }
`;

export const BackToBlog = () => {
  const data = useStaticQuery(graphql`
    query {
      allDatoCmsMiscTextString {
        textStringNodes: nodes {
          locale
          backToBlogAriaLabel
        }
      }
      datoCmsBlogRoot {
        id: originalId
      }
    }
  `);

  const {
    datoCmsBlogRoot: { id },
    allDatoCmsMiscTextString: { textStringNodes },
  } = data;

  const { pageLanguage } = usePageLanguage();

  const nodeLocaleMatch = textStringNodes.find(
    ({ locale }) => locale === pageLanguage
  );
  const { backToBlogAriaLabel } = nodeLocaleMatch;

  const { isRtl } = useTextDirection();

  return (
    <Button $isRtl={isRtl} aria-label={backToBlogAriaLabel} recordId={id}>
      <BackButtonIcon />
    </Button>
  );
};
