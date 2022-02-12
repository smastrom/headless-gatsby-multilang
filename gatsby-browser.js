import React from 'react';
import ThemeProvider from './src/context/themeProvider';
import Redirect from './src/components/langHelpers/redirect';
import GlobalStyles from './src/components/layout/globalStyles';

export const wrapPageElement = ({ element }) => (
  <ThemeProvider>
    <GlobalStyles />
    <Redirect />
    {element}
  </ThemeProvider>
);
