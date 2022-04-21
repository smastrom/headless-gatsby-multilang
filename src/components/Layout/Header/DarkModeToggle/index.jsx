import { useContext } from 'react';

import { graphql, useStaticQuery } from 'gatsby';

import { ThemeContext } from '../../../ContextProviders/ThemeProvider';
import { MoonIcon, SunIcon } from '../../Icons/DarkMode';
import { Button } from './styles';
import { usePageLocale } from '../../../../hooks/usePageLocale';

export const DarkModeToggle = ({ hideOnMobile }) => {
  const { isDark, handleDarkModeSwitch } = useContext(ThemeContext);

  const data = useStaticQuery(graphql`
    query {
      allDatoCmsMiscTextString {
        nodes {
          locale
          enableDarkModeAriaLabel
          disableDarkModeAriaLabel
        }
      }
    }
  `);

  const { pageLocale } = usePageLocale();

  const { enableDarkModeAriaLabel, disableDarkModeAriaLabel } =
    data.allDatoCmsMiscTextString.nodes.find(
      ({ locale }) => locale === pageLocale
    );

  return (
    <Button
      role="switch"
      hideOnMobile={hideOnMobile}
      aria-checked={isDark}
      onClick={handleDarkModeSwitch}
      aria-label={isDark ? disableDarkModeAriaLabel : enableDarkModeAriaLabel}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};
