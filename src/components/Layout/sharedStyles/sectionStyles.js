import styled, { css } from 'styled-components';

// Wrappers

export const SectionWrapper = styled.section`
  display: flex;
  align-items: center;
  width: 100%;
  flex-direction: column;
  position: relative;
  background: ${({ backgroundColor }) => backgroundColor};

  ${({ isBlog, noTopPaddings }) => {
    if (isBlog) {
      return css`
        padding: var(--globalPaddingLr) var(--globalPaddingLr)
          var(--globalPaddingTb);
      `;
    }
    if (noTopPaddings) {
      return css`
        padding: 0 var(--globalPaddingLr);
      `;
    }
    return css`
      padding: var(--globalPaddingTb) var(--globalPaddingLr);
    `;
  }}

  @media screen and (max-width: 860px) {
    align-items: ${({ isArticle }) => (isArticle ? 'flex-start' : 'center')};
  }
`;

// Containers

export const SectionContainerGridThreeCols = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: var(--gapXL);
  row-gap: var(--gapXL);
  width: 100%;
  max-width: var(--globalContainer);

  @media screen and (max-width: 1100px) {
    column-gap: var(--gapL);
  }

  @media screen and (max-width: 950px) {
    grid-template-columns: 1fr 1fr;
  }

  @media screen and (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

export const SectionContainerGridTwoCols = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: var(--gapXL);
  row-gap: var(--gapXL);
  max-width: var(--articleContainer);
  width: 100%;

  @media screen and (max-width: 760px) {
    column-gap: var(--gapL);
  }

  @media screen and (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

export const SectionContainerFlexTwoCols = styled.div`
  width: var(--globalContainer);
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: var(--globalContainer);

  @media screen and (max-width: 767px) {
    flex-direction: column;

    & > div:first-child {
      margin-bottom: var(--gapL);
    }
  }
`;

export const SectionContainerFlexTwoColsReverse = styled(
  SectionContainerFlexTwoCols
)`
  &&& {
    @media screen and (max-width: 767px) {
      flex-direction: column-reverse;

      & > div:first-child {
        margin-bottom: 0;
      }
    }
  }

  & > div:last-child {
    margin-bottom: 0;
  }

  @media screen and (max-width: 767px) {
    & > div:last-child {
      margin-bottom: var(--gapL);
    }
  }
`;

export const SectionTitleContainer = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: var(--gapXL);
  justify-content: ${({ hasButton }) => (hasButton ? 'space-between' : '')};
  width: 100%;
  max-width: ${({ isArticleSectionHeading }) =>
    isArticleSectionHeading
      ? 'var(--articleContainer)'
      : 'var(--globalContainer)'};

  & a:last-child {
    align-items: right;

    @media screen and (max-width: 350px) {
      display: none;
    }
  }
`;

// Elements

export const ColumnFlexTwoCols = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;

  @media screen and (max-width: 767px) {
    width: 100%;
    justify-content: flex-start;

    & img {
      width: ${({ hasImg }) => hasImg && '150px'};
    }
  }
`;

export const TextBox = styled.section`
  display: grid;
  row-gap: ${({ small }) => (small ? 'var(--gapSmall)' : 'var(--gapRegular)')};
  align-content: baseline;
`;

export const Divider = styled.hr`
  width: var(--globalContainer);
  bottom: ${({ bottom }) => bottom && '0'};
  top: ${({ top }) => top && '0'};
  position: absolute;
  height: var(--borderSmall);
  margin: 0;
  border: var(--borderSmall) none;
  background: var(--dividerColor);

  @media screen and (max-width: 1160px) {
    left: var(--globalPaddingLr);
    width: calc(100% - calc(var(--globalPaddingLr) * 2));
  }
`;
