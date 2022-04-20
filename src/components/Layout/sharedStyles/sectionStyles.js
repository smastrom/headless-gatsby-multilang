import styled from 'styled-components';

// Sections

const Section = styled.section`
  width: 100%;
  max-width: var(--globalContainer);
  margin: auto;
  padding: var(--globalPaddingLr) var(--globalPaddingLr) var(--globalPaddingTb)
    var(--globalPaddingLr);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SectionGridTwoCols = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: var(--gapXL);
  row-gap: var(--gapXL);
  margin: auto;
  padding-top: var(--globalPaddingTb);
  max-width: var(--articleContainer);
  width: 100%;

  @media (max-width: 760px) {
    column-gap: var(--gapL);
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const SectionGridThreeCols = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: var(--gapXL);
  row-gap: var(--gapXL);
  margin: auto;
  padding: ${({ noPaddings }) =>
    noPaddings ? '0' : 'var(--globalPaddingTb) var(--globalPaddingLr)'};
  width: 100%;
  max-width: var(--globalContainer);

  @media (max-width: 1100px) {
    column-gap: var(--gapL);
  }

  @media (max-width: 950px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (max-width: 620px) {
    grid-template-columns: 1fr;
  }
`;

const SectionFlexTwoCols = styled.section`
  width: var(--globalContainer);
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: auto;
  padding: var(--globalPaddingTb) var(--globalPaddingLr);
  max-width: var(--globalContainer);

  @media (max-width: 768px) {
    flex-direction: column;

    & > div:first-child {
      margin-bottom: var(--gapL);
    }
  }
`;

const SectionFlexTwoColsReverse = styled(SectionFlexTwoCols)`
  &&& {
    @media (max-width: 768px) {
      flex-direction: column-reverse;

      & > div:first-child {
        margin-bottom: 0;
      }
    }
  }

  & > div:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    & > div:last-child {
      margin-bottom: var(--gapL);
    }
  }
`;

// Content containers

const ColumnFlex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-start;

    & img {
      width: ${({ hasImg }) => hasImg && '150px'};
    }
  }
`;

const GridTextBox = styled.section`
  display: grid;
  row-gap: ${({ small }) => (small ? 'var(--gapSmall)' : 'var(--gapRegular)')};
  align-content: baseline;
`;

export {
  Section,
  SectionGridTwoCols,
  SectionGridThreeCols,
  SectionFlexTwoCols,
  SectionFlexTwoColsReverse,
  ColumnFlex,
  GridTextBox,
};
