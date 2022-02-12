import React, { useContext } from 'react';
import styled from 'styled-components';
import { ThemeContext } from '../../context/themeProvider';
import { MoonIcon, SunIcon } from '../vectors/darkMode';

const Button = styled.button`
  display: flex;
  align-items: center;
`;

const DarkModeToggle = () => {
  const { isDark, setIsDark } = useContext(ThemeContext);

  return (
    <Button
      role="switch"
      aria-checked={isDark || false}
      onClick={() => setIsDark(!isDark)}
      aria-label="Dark mode"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};

export default DarkModeToggle;
