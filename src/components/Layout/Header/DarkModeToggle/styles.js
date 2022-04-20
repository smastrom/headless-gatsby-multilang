import styled, { css } from 'styled-components';

export const Button = styled.button`
  display: flex;
  align-items: center;

  ${({ hideOnMobile }) =>
    hideOnMobile &&
    css`
      @media (max-width: 860px) {
        display: none;
      }
    `}
`;
