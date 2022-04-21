import { graphql, useStaticQuery } from 'gatsby';

import { Helmet } from 'react-helmet';
// eslint-disable-next-line import/no-unresolved
import { useLocation } from '@reach/router';

import { useLocales } from '../../hooks/useLocales';
import { useTextDirection } from '../../hooks/useTextDirection';
import { usePageLocale } from '../../hooks/usePageLocale';

export const PageHead = ({ seoTitle, seoDescription, seoImage }) => {
  const data = useStaticQuery(graphql`
    query {
      allDatoCmsSeoAndPwa {
        seoAndPwaNodes: nodes {
          locale
          siteName
          separator
          fallbackDescription
          defaultOgImage {
            url
          }
          pwaThemeColor {
            themeHexColor: hex
          }
        }
      }
    }
  `);

  const {
    allDatoCmsSeoAndPwa: { seoAndPwaNodes },
  } = data;

  const { href } = useLocation();
  const { pageLocale } = usePageLocale();
  const { defaultLocale } = useLocales();

  const { isRtl } = useTextDirection();

  const seoAndPwaNodesMatch = seoAndPwaNodes.find(
    ({ locale }) => locale === pageLocale
  );

  const {
    siteName,
    separator,
    fallbackDescription,
    defaultOgImage: { url: defaultImgUrl },
    pwaThemeColor: { themeHexColor },
  } = seoAndPwaNodesMatch;

  const titleContent = seoTitle
    ? `${seoTitle} ${separator} ${siteName}`
    : siteName;

  const openGraphTags = [
    {
      properties: ['og:title', 'twitter:title'],
      content: titleContent,
    },
    {
      properties: ['og:description', 'twitter:description'],
      content: seoDescription || fallbackDescription,
    },
    {
      properties: ['og:image', 'twitter:image'],
      content: seoImage || defaultImgUrl,
    },
    { properties: ['og:url', 'twitter:url'], content: href },
  ];

  const pwaIconSizes = ['192', '512'];

  return (
    <Helmet>
      {/* HTML lang and dir attrs */}

      <html lang={pageLocale} dir={isRtl ? 'rtl' : 'ltr'} />

      {/* PWA */}

      <meta name="theme-color" content={themeHexColor} />
      <link
        rel="manifest"
        href={(() => {
          if (pageLocale === defaultLocale) return '/manifest.webmanifest';
          return `/manifest_${pageLocale}.webmanifest`;
        })()}
        crossOrigin="anonymous"
      />
      <link rel="icon" href="/favicon-32.png" type="image/png" />
      {pwaIconSizes.map((size) => (
        <link
          key={`icon-${size}`}
          rel="apple-touch-icon"
          sizes={`${size}x${size}`}
          href={`/images/icon-${size}.png`}
        />
      ))}

      {/* SEO meta tags */}

      <title>{titleContent}</title>
      <meta
        name="description"
        content={seoDescription || fallbackDescription}
      />
      <meta property="og:type" content="website" />
      {openGraphTags.map(({ properties, content }) =>
        properties.map((property) => (
          <meta key={property} property={property} content={content} />
        ))
      )}
    </Helmet>
  );
};
