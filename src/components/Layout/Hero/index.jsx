import { Wrapper, TextBox, Caption, Title, Subtitle } from './styles';

export const Hero = ({
  caption,
  title,
  subtitle,
  button,
  sectionChildren,
  isFullViewport,
}) => (
  <Wrapper isFullViewport={isFullViewport}>
    <TextBox>
      {caption && <Caption>{caption}</Caption>}
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      {button}
    </TextBox>
    {sectionChildren}
  </Wrapper>
);
