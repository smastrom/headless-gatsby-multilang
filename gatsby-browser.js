import React from 'react';
import { ThemeProvider } from './src/components/ContextProviders/ThemeProvider';
import { Redirect } from './src/components/LanguageHelpers/Redirect';
import { GlobalStyle } from './src/components/Layout/SharedStyles/globalStyle';

export const wrapPageElement = ({ element }) => (
  <ThemeProvider>
    <GlobalStyle />
    <Redirect />
    {element}
  </ThemeProvider>
);
