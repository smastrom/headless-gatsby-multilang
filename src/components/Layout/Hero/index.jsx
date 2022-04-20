import { Divider } from '../sharedStyles/sectionStyles';

import {
  Wrapper,
  Container,
  TextBox,
  Caption,
  Title,
  Subtitle,
} from './styles';

export const Hero = ({
  fullView,
  centered,
  caption,
  title,
  subtitle,
  button,
  sectionChildren,
  hasDivider,
}) => (
  <Wrapper fullView={fullView}>
    <Container centered={centered}>
      <TextBox centered={centered}>
        {caption && <Caption>{caption}</Caption>}
        <Title centered={centered}>{title}</Title>
        <Subtitle centered={centered}>{subtitle}</Subtitle>
        {button}
      </TextBox>
      {sectionChildren}
    </Container>
    {hasDivider && <Divider bottom />}
  </Wrapper>
);
