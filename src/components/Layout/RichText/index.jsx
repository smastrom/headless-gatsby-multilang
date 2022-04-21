import { useTextDirection } from '../../../hooks/useTextDirection';
import { RichTextStyles } from './styles';

export const RichText = ({ children }) => {
  const { isRtl } = useTextDirection();
  return <RichTextStyles isRtl={isRtl}>{children}</RichTextStyles>;
};
