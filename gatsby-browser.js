import React from 'react';
import Redirect from './src/components/langHelpers/redirect';
import GlobalStyles from './src/components/layout/globalStyles';

export const wrapPageElement = ({ element }) => (
  <>
    <GlobalStyles />
    <Redirect />
    {element}
  </>
);
