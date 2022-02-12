import React from 'react';
import { ThemeProvider } from './src/components/ContextProviders/ThemeProvider';
import { GlobalStyle } from './src/components/Layout/SharedStyles/globalStyle';

export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({
    className: 'lightTheme',
  });
};

export const wrapPageElement = ({ element }) => (
  <ThemeProvider>
    <GlobalStyle />
    {element}
  </ThemeProvider>
);
