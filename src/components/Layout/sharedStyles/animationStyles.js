import { keyframes } from 'styled-components';

const easeOutTiming = '300ms ease-out';

const slideFromTopAnim = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }

  100% {
    opacity: 1;
    translateY: translateY(0px);
  }
`;

const slideFromTopExitAnim = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0px);
  }

  100% {
    opacity: 0;
    transform: translateY(-30px);
  }
`;

export { easeOutTiming, slideFromTopAnim, slideFromTopExitAnim };
