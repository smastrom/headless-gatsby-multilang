import { graphql, useStaticQuery } from 'gatsby';

import { useTextDirection } from '../../../../hooks/useTextDirection';
import { usePageLocale } from '../../../../hooks/usePageLocale';

import { Wrapper, Container, Nav, NavList, CategoryLink } from './styles';

export const CategoriesMenu = () => {
  const data = useStaticQuery(graphql`
    query {
      allDatoCmsCategory(filter: { noTranslate: { ne: true } }) {
        categoryNodes: nodes {
          id: originalId
          locale
          title
        }
      }
    }
  `);

  const {
    allDatoCmsCategory: { categoryNodes },
  } = data;

  const { pageLocale } = usePageLocale();
  const { isRtl } = useTextDirection();

  return (
    <Wrapper>
      <Container isRtl={isRtl}>
        <Nav>
          <NavList>
            {categoryNodes
              .filter(({ locale }) => locale === pageLocale)
              .map(({ id, title }) => (
                <li key={title}>
                  <CategoryLink recordId={id} activeClassName="activeClassLink">
                    {title}
                  </CategoryLink>
                </li>
              ))}
          </NavList>
        </Nav>
      </Container>
    </Wrapper>
  );
};
