import { keyframes } from 'styled-components';

export const easeOutTiming = '300ms ease-out';

export const slideFromTopAnim = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }

  100% {
    opacity: 1;
    translateY: translateY(0px);
  }
`;

export const slideFromTopExitAnim = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0px);
  }

  100% {
    opacity: 0;
    transform: translateY(-30px);
  }
`;
