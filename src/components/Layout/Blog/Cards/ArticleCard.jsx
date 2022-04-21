import { useFormattedDate } from '../../../../hooks/useFormattedDate';

import {
  CardLink,
  CategoryBox,
  ContentWrapper,
  PostTitle,
  Date,
  Excerpt,
  AuthorCtaContainer,
  AuthorContainer,
  AuthorImg,
  artDirectedCardImgs,
  CardImgContainer,
  CardImg,
} from './styles';

export const ArticleCard = ({
  recordId,
  date,
  title,
  excerpt,
  authorImg,
  authorName,
  category,
  cardImg,
  cardImgMobile,
  altImg,
}) => {
  const images = artDirectedCardImgs(cardImg, cardImgMobile);

  const { formattedDate } = useFormattedDate(date);

  return (
    <article>
      <CardLink recordId={recordId}>
        <CardImgContainer>
          <CardImg objectFit="cover" image={images} alt={altImg || ''} />
        </CardImgContainer>
        <ContentWrapper>
          {category && <CategoryBox>{category.title}</CategoryBox>}
          <Date>{formattedDate}</Date>
          <PostTitle>{title}</PostTitle>
          <Excerpt>{excerpt}</Excerpt>
          <AuthorCtaContainer>
            <AuthorContainer>
              <AuthorImg
                objectFit="cover"
                image={authorImg || ''}
                alt={authorName || ''}
              />
              <Date as="address">{authorName}</Date>
            </AuthorContainer>
          </AuthorCtaContainer>
        </ContentWrapper>
      </CardLink>
    </article>
  );
};
