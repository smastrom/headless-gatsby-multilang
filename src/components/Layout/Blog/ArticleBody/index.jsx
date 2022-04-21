import { useTextDirection } from '../../../../hooks/useTextDirection';
import { ArticleBodyStyles } from './styles';

export const ArticleBody = ({ children }) => {
  const { isRtl } = useTextDirection();
  return <ArticleBodyStyles isRtl={isRtl}>{children}</ArticleBodyStyles>;
};
