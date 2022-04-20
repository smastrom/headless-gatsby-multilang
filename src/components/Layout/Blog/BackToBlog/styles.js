import styled from 'styled-components';

import { easeOutTiming } from '../../sharedStyles/animationStyles';
import { Navigator } from '../../../Navigator';

export const Button = styled(Navigator)`
  margin-bottom: var(--gapRegular);
  transform: ${({ $isRtl }) => $isRtl && 'rotate(180deg)'};
  justify-content: ${({ $isRtl }) => $isRtl && 'flex-end'};
  display: flex;

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
