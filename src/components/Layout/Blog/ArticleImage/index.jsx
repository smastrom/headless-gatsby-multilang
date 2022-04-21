import { useTextDirection } from '../../../../hooks/useTextDirection';

import { Image } from './styles';

export const ArticleImage = ({ $isRtl, ...props }) => {
  const { isRtl } = useTextDirection();

  return <Image {...props} $isRtl={isRtl} />;
};
