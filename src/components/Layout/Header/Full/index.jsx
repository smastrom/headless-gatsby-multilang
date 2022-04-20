import { graphql, useStaticQuery } from 'gatsby';

import { usePageLocale } from '../../../../hooks/usePageLocale';
import { LanguageSwitcher } from '../../../LanguageSwitcher';
import { Navigator } from '../../../Navigator';
import { CategoriesDropdown } from '../CategoriesDropdown';
import { DarkModeToggle } from '../DarkModeToggle';
import { Logo } from '../../Icons/Logo';
import { MobileMenu } from '../MobileMenu';

import {
  Wrapper,
  Container,
  Nav,
  NavList,
  Right,
  VerticalDivider,
} from './styles';

// Main component

export const Header = () => {
  const data = useStaticQuery(graphql`
    query {
      allDatoCmsMenu {
        menuNodes: nodes {
          locale
          ariaLabelHamburger
          links {
            id: originalId
            name
            isCategoryDropdown
            link {
              ... on DatoCmsBlogRoot {
                id: originalId
              }
              ... on DatoCmsBlogPost {
                id: originalId
              }
              ... on DatoCmsCategory {
                id: originalId
              }
              ... on DatoCmsCategoriesArchive {
                id: originalId
              }
              ... on DatoCmsOtherPage {
                id: originalId
              }
              ... on DatoCmsHomepage {
                id: originalId
              }
            }
          }
        }
      }
      allDatoCmsMiscTextString {
        textStringNodes: nodes {
          locale
          seeAllCategoriesText
        }
      }
      allDatoCmsHomepage {
        homepageNodes: nodes {
          id: originalId
          locale
          seo {
            title
          }
        }
      }
      allDatoCmsCategory(filter: { noTranslate: { ne: true } }) {
        categoryNodes: nodes {
          id: originalId
          title
          locale
        }
      }
      allDatoCmsCategoriesArchive {
        categoriesArchiveNodes: nodes {
          id: originalId
          locale
        }
      }
    }
  `);

  /**
   * Since it is not possible to use variables in useStatic query, we filter correspondent
   * localized nodes returned from staticQuery according to the pageLocale
   * and pass those data to MobileMenu and DropdownCategories components
   */

  const {
    allDatoCmsMenu: { menuNodes },
    allDatoCmsHomepage: { homepageNodes },
    allDatoCmsCategory: { categoryNodes },
    allDatoCmsCategoriesArchive: { categoriesArchiveNodes },
    allDatoCmsMiscTextString: { textStringNodes },
  } = data;

  const { pageLocale } = usePageLocale();

  const { id: categoryArchiveId } = categoriesArchiveNodes.find(
    ({ locale }) => locale === pageLocale
  );

  const homepageNodesMatch = homepageNodes.find(
    ({ locale }) => locale === pageLocale
  );

  const { seeAllCategoriesText } = textStringNodes.find(
    ({ locale }) => locale === pageLocale
  );

  const menuNodesMatch = menuNodes.filter(
    ({ locale }) => locale === pageLocale
  );

  const categoryNodesMatch = categoryNodes
    .filter(({ locale }) => locale === pageLocale)
    .slice(0, 6);

  const {
    id: homepageRecordId,
    seo: { title: seoTitle },
  } = homepageNodesMatch;

  const [{ ariaLabelHamburger, links: menuLinks }] = menuNodesMatch;

  return (
    <Wrapper>
      <Container>
        <Navigator
          style={{ display: 'flex' }}
          aria-label={seoTitle}
          recordId={homepageRecordId}
          key={homepageRecordId}
        >
          <Logo />
        </Navigator>
        <Nav>
          <NavList>
            {menuLinks.map(({ id, name, isCategoryDropdown, link }) =>
              isCategoryDropdown && categoryNodesMatch.length > 0 ? (
                <CategoriesDropdown
                  key={id}
                  menuItemLabel={name}
                  categoryNodes={categoryNodesMatch}
                  categoryArchiveRecordId={categoryArchiveId}
                  seeAllCategoriesText={seeAllCategoriesText}
                />
              ) : (
                !isCategoryDropdown && (
                  <li key={id}>
                    <Navigator
                      recordId={link?.id}
                      activeClassName="activeClassLink"
                    >
                      {name}
                    </Navigator>
                  </li>
                )
              )
            )}
          </NavList>
        </Nav>
        <Right>
          <DarkModeToggle hideOnMobile />
          <VerticalDivider hideOnMobile />
          <LanguageSwitcher />
          <VerticalDivider hideOnDesktop />
          <MobileMenu
            ariaLabelHamburger={ariaLabelHamburger}
            menuNodes={menuNodesMatch}
            categoryNodes={categoryNodesMatch}
            seeAllCategoriesText={seeAllCategoriesText}
            categoryArchiveRecordId={categoryArchiveId}
          />
        </Right>
      </Container>
    </Wrapper>
  );
};
