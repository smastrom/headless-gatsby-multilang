import { useContext } from 'react';

import { ThemeContext } from '../../../ContextProviders/ThemeProvider';
import { MoonIcon, SunIcon } from '../../Icons/DarkMode';

import { Button } from './styles';

export const DarkModeToggle = ({ hideOnMobile }) => {
  const { isDark, handleDarkModeSwitch } = useContext(ThemeContext);

  return (
    <Button
      role="switch"
      hideOnMobile={hideOnMobile}
      aria-checked={isDark}
      onClick={handleDarkModeSwitch}
      aria-label="Dark mode"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};
