import React from 'react';
import Seo from '../langHelpers/seo';
import Header from './header';
import Footer from './footer';
import LangProvider from '../../context/langProvider';

const PageWrapper = ({
  pageData,
  seoTitle,
  seoDescription,
  seoImage,
  notFoundPage,
  notFoundPageLocale,
  notFoundPageManifest,
  noHeader,
  noFooter,
  children,
}) => (
  <LangProvider pageData={pageData || notFoundPage}>
    <Seo
      seoTitle={seoTitle}
      seoDescription={seoDescription}
      seoImage={seoImage}
      notFoundPage={notFoundPage}
      notFoundPageLocale={notFoundPageLocale}
      notFoundPageManifest={notFoundPageManifest}
    />

    {noHeader || <Header />}
    <main>{children}</main>
    {noFooter || <Footer />}
  </LangProvider>
);

export default PageWrapper;
