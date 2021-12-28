import React from 'react';
import styled from 'styled-components';
import { HeroSubtitle, HeroTitle, HeroAlt } from './headingStyles';
import { Divider } from './sectionStyles';

const HeroWrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${({ fullView }) => fullView && '100vh'};
  padding: var(--globalPaddingTb) var(--globalPaddingLr);
  flex-direction: column;
  position: relative;
`;

const HeroContainer = styled.div`
  width: var(--globalContainer);
  display: grid;
  row-gap: var(--gapXL);
  justify-content: ${({ centered }) => centered && 'center'};

  @media screen and (max-width: 1170px) {
    width: 100%;
  }
`;

const HeroTextBox = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: var(--gapRegular);
  width: 600px;
  justify-items: ${({ centered }) => centered && 'center'};

  @media screen and (max-width: 767px) {
    width: 100%;
  }
`;

const Hero = ({
  fullView,
  centered,
  alt,
  title,
  subtitle,
  button,
  sectionChildren,
  hasDivider,
}) => (
  <HeroWrapper fullView={fullView}>
    <HeroContainer centered={centered}>
      <HeroTextBox centered={centered}>
        {alt && <HeroAlt>{alt}</HeroAlt>}
        <HeroTitle centered={centered}>{title}</HeroTitle>
        <HeroSubtitle centered={centered}>{subtitle}</HeroSubtitle>
        {button}
      </HeroTextBox>
      {sectionChildren}
    </HeroContainer>
    {hasDivider && <Divider bottom />}
  </HeroWrapper>
);

export default Hero;
