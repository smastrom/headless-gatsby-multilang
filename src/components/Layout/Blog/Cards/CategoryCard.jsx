import {
  CardImg,
  CardLink,
  ContentWrapper,
  Excerpt,
  PostTitle,
  artDirectedCardImgs,
  CardImgContainer,
} from './styles';

export const CategoryCard = ({
  recordId,
  cardImg,
  cardImgMobile,
  title,
  description,
  altImg,
}) => {
  const images = artDirectedCardImgs(cardImg, cardImgMobile);

  return (
    <article>
      <CardLink recordId={recordId}>
        <CardImgContainer>
          <CardImg objectFit="cover" image={images} alt={altImg || ''} />
        </CardImgContainer>
        <ContentWrapper>
          <PostTitle isCategoryTitle>{title}</PostTitle>
          <Excerpt>{description}</Excerpt>
        </ContentWrapper>
      </CardLink>
    </article>
  );
};
