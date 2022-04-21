import { PageHead } from '../../Head/PageHead';
import { Header } from '../Header/Full';
import { Footer } from '../Footer';
import { LocaleProvider } from '../../ContextProviders/LocaleProvider';

export const PageWrapper = ({
  pageData,
  seoTitle,
  seoDescription,
  seoImage,
  children,
}) => (
  <LocaleProvider pageData={pageData}>
    <PageHead
      seoTitle={seoTitle}
      seoDescription={seoDescription}
      seoImage={seoImage}
    />
    <Header />
    <main>{children}</main>
    <Footer />
  </LocaleProvider>
);
