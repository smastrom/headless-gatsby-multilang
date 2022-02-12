import React from 'react';
import { PageHead } from '../../Head/PageHead';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { LanguageProvider } from '../../ContextProviders/LanguageProvider';

export const PageWrapper = ({
  pageData,
  seoTitle,
  seoDescription,
  seoImage,
  children,
}) => (
  <LanguageProvider pageData={pageData}>
    <PageHead
      seoTitle={seoTitle}
      seoDescription={seoDescription}
      seoImage={seoImage}
    />
    <Header />
    <main>{children}</main>
    <Footer />
  </LanguageProvider>
);
