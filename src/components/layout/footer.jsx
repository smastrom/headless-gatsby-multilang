import React, { Fragment, useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { StructuredText } from 'react-datocms';
import { LangContext } from '../../context/langProvider';
import { Paragraph } from './paragraphStyles';
import { SectionWrapper, Divider } from './sectionStyles';

const FooterContainer = styled.div`
  display: flex;
  width: var(--globalContainer);
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 1170px) {
    width: 100%;
  }

  @media screen and (max-width: 950px) {
    flex-direction: column;
    & p {
      font-size: var(--baseM);
      &:first-child {
        margin-bottom: var(--gapRegular);
      }
    }
  }
`;

const Footer = () => {
  const data = useStaticQuery(graphql`
    query {
      allDatoCmsFooter {
        nodes {
          id: originalId
          textLeft {
            value
          }
          textRight {
            value
          }
          locale
        }
      }
    }
  `);

  const { currentLanguage } = useContext(LangContext);

  const {
    allDatoCmsFooter: { nodes },
  } = data;

  return (
    <SectionWrapper as="footer">
      <Divider top />
      <FooterContainer>
        {nodes
          .filter(({ locale }) => locale === currentLanguage)
          .map(
            ({
              id,
              textLeft: { value: textLeftValue },
              textRight: { value: textRightValue },
            }) => (
              <Fragment key={id}>
                <Paragraph small centered as="div">
                  <StructuredText data={textLeftValue} />
                </Paragraph>
                <Paragraph small centered as="div">
                  <StructuredText data={textRightValue} />
                </Paragraph>
              </Fragment>
            )
          )}
      </FooterContainer>
    </SectionWrapper>
  );
};

export default Footer;
