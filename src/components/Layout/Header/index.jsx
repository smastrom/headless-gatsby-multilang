import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import { LanguageSwitcher } from '../../LanguageHelpers/LanguageSwitcher';
import { Navigator } from '../../LanguageHelpers/Navigator';
import { MobileMenu } from './MobileMenu';
import { Divider } from '../SharedStyles/Sections';
import { CategoriesDropdown } from './CategoriesDropdown';
import { DarkModeToggle } from './DarkModeToggle';
import { usePageLanguage } from '../../../hooks/usePageLanguage';
import { Logo } from '../Icons/Logo';

// Scoped styles

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: var(--globalPaddingLr);
  width: 100%;
  position: relative;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: var(--globalContainer);
  align-items: center;
`;

const Nav = styled.nav`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavList = styled.ul`
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  column-gap: var(--gapXL);
  & li a {
    color: var(--headingsColor);
    transition: color 0.1s linear;
    font-weight: 600;
    &:hover {
      color: var(--primaryColor);
    }
  }

  @media screen and (max-width: 860px) {
    column-gap: var(--gapL);
  }
`;

const Right = styled.div`
  display: grid;
  grid-auto-flow: column;
  column-gap: var(--gapRegular);
  @media screen and (max-width: 768px) {
    grid-template-columns: auto auto auto;
  }
`;

const VerticalDivider = styled.span`
  height: 100%;
  width: var(--borderSmall);
  background: var(--dividerColor);
  display: ${({ hideOnDesktop }) => (hideOnDesktop ? 'none' : 'block')};
  @media screen and (max-width: 768px) {
    display: ${({ hideOnMobile }) => (hideOnMobile ? 'none' : 'block')};
  }
`;

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
   * localized nodes returned from staticQuery according to the pageLanguage
   * and pass those data to MobileMenu and DropdownCategories components
   */

  const {
    allDatoCmsMenu: { menuNodes },
    allDatoCmsHomepage: { homepageNodes },
    allDatoCmsCategory: { categoryNodes },
    allDatoCmsCategoriesArchive: { categoriesArchiveNodes },
    allDatoCmsMiscTextString: { textStringNodes },
  } = data;

  const { pageLanguage } = usePageLanguage();

  const { id: categoryArchiveId } = categoriesArchiveNodes.find(
    ({ locale }) => locale === pageLanguage
  );

  const menuNodesMatch = menuNodes.filter(
    ({ locale }) => locale === pageLanguage
  );

  const homepageNodesMatch = homepageNodes.find(
    ({ locale }) => locale === pageLanguage
  );

  const categoryNodesMatch = categoryNodes
    .filter(({ locale }) => locale === pageLanguage)
    .slice(0, 6);

  const { seeAllCategoriesText } = textStringNodes.find(
    ({ locale }) => locale === pageLanguage
  );

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
        <Divider bottom />
      </Container>
    </Wrapper>
  );
};
