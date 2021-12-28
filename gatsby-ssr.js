import React from 'react';
import GlobalStyles from './src/components/layout/globalStyles';

export const wrapPageElement = ({ element }) => (
  <>
    <GlobalStyles />
    {element}
  </>
);
