import { useContext } from 'react';

import { ThemeContext } from '../components/ContextProviders/ThemeProvider';

export const useTheme = () => {
  const { isDark } = useContext(ThemeContext);

  return { isDark };
};
