import React, { useContext } from 'react';
import styled, { css } from 'styled-components';
import { ThemeContext } from '../../ContextProviders/ThemeProvider';
import { MoonIcon, SunIcon } from '../Icons/DarkMode';

const Button = styled.button`
  display: flex;
  align-items: center;
  ${({ hideOnMobile }) =>
    hideOnMobile &&
    css`
      @media screen and (max-width: 860px) {
        display: none;
      }
    `}
`;

export const DarkModeToggle = ({ hideOnMobile }) => {
  const { isDark, setIsDark } = useContext(ThemeContext);

  return (
    <Button
      role="switch"
      hideOnMobile={hideOnMobile}
      aria-checked={isDark || false}
      onClick={() => setIsDark(!isDark)}
      aria-label="Dark mode"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};
