import React from 'react';
import GlobalStyles from './src/components/layout/globalStyles';
import ThemeProvider from './src/context/themeProvider';

export const wrapPageElement = ({ element }) => (
  <ThemeProvider>
    <GlobalStyles />
    {element}
  </ThemeProvider>
);
