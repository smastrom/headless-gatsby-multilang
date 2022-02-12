const path = require('path');
const fs = require('fs');
const https = require('https');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const {
    data: {
      datoCmsSite: { allLanguages },
      datoCmsWebsiteSetting: { blogPathName },
    },
  } = await graphql(`
    query {
      datoCmsSite {
        allLanguages: locales
      }
      datoCmsWebsiteSetting {
        blogPathName
      }
    }
  `);

  const [defaultLanguage] = allLanguages;

  // Blog root page generation

  const BlogRootTemplate = path.resolve('src/templates/blogRoot.jsx');

  allLanguages.forEach((siteLocale) => {
    createPage({
      path: (() => {
        if (siteLocale === defaultLanguage) return `/${blogPathName}`;
        return `/${siteLocale}/${blogPathName}/`; // else (if not generating default language path)
      })(),
      component: BlogRootTemplate,
      context: {
        locale: siteLocale,
        pageType: 'isBlogRoot',
      },
    });
  });

  // Categories generation

  const {
    data: {
      allDatoCmsCategory: { categoryNodes },
    },
  } = await graphql(`
    query {
      allDatoCmsCategory(filter: { noTranslate: { ne: true } }) {
        categoryNodes: nodes {
          id: originalId
          locale
          slug
          reference
        }
      }
    }
  `);

  const CategoryTemplate = path.resolve('src/templates/categoryArchive.jsx');

  categoryNodes.forEach(({ id, locale, slug, reference }) => {
    createPage({
      path: (() => {
        if (locale === defaultLanguage) return `${blogPathName}/${slug}`;
        return `/${locale}/${blogPathName}/${slug}`;
      })(),
      component: CategoryTemplate,
      context: {
        id,
        locale,
        slug,
        reference,
        pageType: 'isCategory',
      },
    });
  });

  // Articles Generation

  const {
    data: {
      allDatoCmsBlogPost: { blogPostNodes },
    },
  } = await graphql(`
    query {
      allDatoCmsBlogPost(
        sort: { fields: [locale, meta___firstPublishedAt] }
        filter: { noTranslate: { ne: true } }
      ) {
        blogPostNodes: nodes {
          id: originalId
          locale
          slug
          reference
          categoryLink {
            categorySlug: slug
            categoryLocale: locale
          }
        }
      }
    }
  `);

  const allBlogPostsPerLocale = blogPostNodes.length / allLanguages.length;

  const ArticleTemplate = path.resolve('src/templates/article.jsx');

  allLanguages.forEach((siteLocale) => {
    let pageCounter = 0;

    /**
     * Iterate trought all available locales, and increase
     * the counter when an article is generated,
     * since the query results are sorted with with the same criteria for any locale
     * we can export a skipNext variable which we will use to skip all the previous posts.
     */

    blogPostNodes
      .filter(({ locale }) => locale === siteLocale)
      .forEach(({ locale, slug, reference, id, categoryLink }) => {
        const categorySlug = categoryLink?.categorySlug;
        const isUncategorized = categoryLink === null;
        const isGeneratingDefaultLang = locale === defaultLanguage;

        pageCounter += 1;

        createPage({
          path: (() => {
            if (isUncategorized) {
              if (isGeneratingDefaultLang) return `${blogPathName}/${slug}`;
              return `${locale}/${blogPathName}/${slug}`;
            } else {
              if (isGeneratingDefaultLang)
                return `${blogPathName}/${categorySlug}/${slug}`;
              return `${locale}/${blogPathName}/${categorySlug}/${slug}`;
            }
          })(),
          component: ArticleTemplate,
          context: {
            id,
            locale,
            slug,
            reference,
            isUncategorized,
            categorySlug,
            articlesPerLocale: allBlogPostsPerLocale,
            pageType: 'isPost',

            /**
             * If generating the last article, assign the value "0" since
             * there won't be a next post to display
             */

            skipNext: pageCounter === allBlogPostsPerLocale ? 0 : pageCounter,

            /**
             * If generating the first article, assign the value 1 or the GraphQL
             * query will fail having a skip variable < 0 and a limit variable > 0.
             */

            skipPrevious: pageCounter === 1 ? 1 : pageCounter - 2,
          },
        });
      });
  });

  // Pages generation

  // Homepage Generation - Based on a specific template

  const {
    data: {
      allDatoCmsHomepage: { homepageNodes },
    },
  } = await graphql(`
    query {
      allDatoCmsHomepage {
        homepageNodes: nodes {
          locale
        }
      }
    }
  `);

  const HomePageTemplate = path.resolve('src/templates/index.jsx');

  homepageNodes.forEach(({ locale }) => {
    createPage({
      path: locale === defaultLanguage ? '/' : locale,
      component: HomePageTemplate,
      context: {
        locale,
        pageType: 'isHome',
      },
    });
  });

  // Other pages generation - Sharing the same template

  const {
    data: {
      allDatoCmsOtherPage: { otherPagesNodes },
    },
  } = await graphql(`
    query {
      allDatoCmsOtherPage {
        otherPagesNodes: nodes {
          id: originalId
          locale
          slug
          reference
        }
      }
    }
  `);

  const OtherPageTemplate = path.resolve('src/templates/otherPage.jsx');

  otherPagesNodes.forEach(({ locale, slug, id, reference }) => {
    createPage({
      path: locale === defaultLanguage ? `/${slug}` : `${locale}/${slug}`,
      component: OtherPageTemplate,
      context: {
        id,
        locale,
        slug,
        reference,
        pageType: 'isPage',
      },
    });
  });

  // Webmanifest generation

  const {
    data: {
      allDatoCmsWebsiteSetting: { settingsNodes },
    },
  } = await graphql(`
    query {
      allDatoCmsWebsiteSetting {
        settingsNodes: nodes {
          name
          shortName
          settingsLocale: locale
          pwaIcon {
            favSize: url(imgixParams: { w: "32", h: "32" })
            normalSize: url(imgixParams: { w: "192", h: "192" })
            bigSize: url(imgixParams: { w: "512", h: "512" })
          }
          pwaThemeColor {
            pwaThemeColorHex: hex
          }
          pwaBackgroundColor {
            pwaBackgroundColorHex: hex
          }
        }
      }
    }
  `);

  // Default lang manifest data
  const [
    {
      pwaIcon: { favSize, normalSize, bigSize },
      name,
      shortName,
      description,
      settingsLocale,
      pwaThemeColor: { pwaThemeColorHex },
      pwaBackgroundColor: { pwaBackgroundColorHex },
    },
  ] = settingsNodes;

  const publicPath = 'public';
  const imagesPath = 'public/images';

  // Create full path

  if (!fs.existsSync(imagesPath)) fs.mkdirSync(imagesPath);

  // Download resized icons

  const iconNormal = fs.createWriteStream(`${imagesPath}/icon-192.png`);
  const iconBig = fs.createWriteStream(`${imagesPath}/icon-512.png`);
  const icon = fs.createWriteStream(`${publicPath}/favicon-32.png`);

  try {
    https.get(`${normalSize}`, (response) => {
      response.pipe(iconNormal);
    });
    https.get(`${bigSize}`, (response) => {
      response.pipe(iconBig);
    });
    https.get(`${favSize}`, (response) => {
      response.pipe(icon);
    });
  } catch (err) {
    throw new Error(err.message);
  }

  const commonManifestData = {
    theme_color: pwaThemeColorHex,
    background_color: pwaBackgroundColorHex,
    display: 'standalone',
    icons: [
      {
        src: 'images/icon-192.png',
        type: 'image/png',
        sizes: '192x192',
        purpose: 'any maskable',
      },
      {
        src: 'images/icon-512.png',
        type: 'image/png',
        sizes: '512x512',
        purpose: 'any maskable',
      },
    ],
    cacheDigest: null,
  };

  const manifest = {
    name,
    short_name: shortName,
    description,
    lang: settingsLocale,
    start_url: '/',
    ...commonManifestData,
  };

  // Generate and save manifest to public folder

  fs.writeFileSync(
    `${publicPath}/manifest.webmanifest`,
    JSON.stringify(manifest, undefined, 2)
  );

  // Additional language webmanifest files generation

  const additionalLanguages = settingsNodes.length;

  if (additionalLanguages > 1) {
    settingsNodes
      .filter(({ locale }) => locale !== defaultLanguage) // Exclude default language already generated
      .forEach(({ name, shortName, description, settingsLocale }) => {
        const manifest = {
          name,
          short_name: shortName,
          description,
          lang: settingsLocale,
          display: 'standalone',
          start_url: `/${settingsLocale}/`,
          ...commonManifestData,
        };
        fs.writeFileSync(
          `${publicPath}/manifest_${settingsLocale}.webmanifest`,
          JSON.stringify(manifest, undefined, 2)
        );
      });
  }
};
