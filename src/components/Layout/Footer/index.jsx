import { Fragment } from 'react';

import { graphql, useStaticQuery } from 'gatsby';

import { StructuredText } from 'react-datocms';

import { SectionWrapper, Divider } from '../sharedStyles/sectionStyles';
import { usePageLocale } from '../../../hooks/usePageLocale';

import { Container, Column } from './styles';

export const Footer = () => {
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

  const { pageLanguage } = usePageLocale();

  const {
    allDatoCmsFooter: { nodes },
  } = data;

  return (
    <SectionWrapper as="footer">
      <Divider top />
      <Container>
        {nodes
          .filter(({ locale }) => locale === pageLanguage)
          .map(
            ({
              id,
              textLeft: { value: textLeftValue },
              textRight: { value: textRightValue },
            }) => (
              <Fragment key={id}>
                <Column>
                  <StructuredText data={textLeftValue} />
                </Column>
                <Column>
                  <StructuredText data={textRightValue} />
                </Column>
              </Fragment>
            )
          )}
      </Container>
    </SectionWrapper>
  );
};
