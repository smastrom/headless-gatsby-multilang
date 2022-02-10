const path = require('path');
const fs = require('fs');
const https = require('https');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  /**
   * Since graphql won't work in any other API except createPages,
   * website settings must be fetched and exported now inside this extension.
   * Although it is possible to run a single query to use for any createPage call,
   * I decided to split them for each step in order to show the process in a cleaner way
   * and simplify the customization.
   */

  // Colors - Begin

  const {
    data: { datoCmsWebsiteSetting: colorNodes },
  } = await graphql(`
    query {
      datoCmsWebsiteSetting {
        primaryColor {
          hex
        }
        primaryDark {
          hex
        }
        primaryLight {
          hex
        }
        headingsColor {
          hex
        }
        baseTextColor {
          hex
        }
        baseTextColorDark {
          hex
        }
        disabledColor {
          hex
        }
        dividerColor {
          hex
        }
        markColor {
          hex
        }
      }
    }
  `);

  // Query the settings model on DatoCMS and define a path to export the queried settings
  const settingsPath = 'src/static';

  // Create the path if it doesn't exist
  if (!fs.existsSync(settingsPath)) fs.mkdirSync(settingsPath);

  // Manipulate the final object
  const objArr = Object.keys(colorNodes);
  const colors = {};
  objArr.forEach((color) => {
    Object.defineProperty(colors, `${color}`, {
      value: colorNodes[color].hex,
      enumerable: true,
    });
  });

  // Save the JSON file with css color variables
  fs.writeFileSync(
    `${settingsPath}/colors.json`,
    JSON.stringify(colors, undefined, 2)
  );

  // Colors - End

  // Blog and pages generation

  /**
   * Blog and locales settings query, the first block is used to retrieve blog settings and,
   * the second one to retrieve a list of all languages available
   */

  const {
    data: {
      datoCmsWebsiteSetting: { blogPath, postsPerPage },
      allDatoCmsSite: { allDatoCmsSiteEdges },
    },
  } = await graphql(`
    query {
      datoCmsWebsiteSetting {
        blogPath
        postsPerPage
      }
      allDatoCmsSite {
        allDatoCmsSiteEdges: edges {
          node {
            locale
          }
        }
      }
    }
  `);

  /**
   * Archive pages generation based on locale with pagination
   * Blog posts should be sorted using the same fields as in any other template
   * in order to have a coherent prev/next navigation.
   */

  const {
    data: {
      allDatoCmsBlogPost: { allBlogPostsEdges },
    },
  } = await graphql(`
    query {
      allDatoCmsBlogPost(
        sort: { fields: [locale, meta___firstPublishedAt] }
        filter: { noTranslate: { ne: true } }
      ) {
        allBlogPostsEdges: edges {
          node {
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
    }
  `);

  const [
    {
      node: { locale: defaultLanguage },
    },
  ] = allDatoCmsSiteEdges;
  const allLanguages = allDatoCmsSiteEdges;
  const allBlogPostsPerLocale = allBlogPostsEdges.length / allLanguages.length;
  const pagesNumber = Math.ceil(allBlogPostsPerLocale / postsPerPage);

  const ArchiveTemplate = path.resolve('src/templates/archive.jsx');

  allLanguages.forEach(({ node: { locale } }) => {
    Array.from({ length: pagesNumber }).forEach((_, index) => {
      createPage({
        path:
          // If generating the first default language archive page
          locale === defaultLanguage && index === 0
            ? `/${blogPath}`
            : // If not generating the first default language archive page
            locale === defaultLanguage && index > 0
            ? `/${blogPath}/${index + 1}`
            : // If generating the first non-default language archive page
            locale !== defaultLanguage && index === 0
            ? `/${locale}/${blogPath}`
            : // If not generation the first non-default language archive page
            locale !== defaultLanguage && index > 0
            ? `/${locale}/${blogPath}/${index + 1}`
            : '/',
        component: ArchiveTemplate,
        context: {
          locale: locale,
          limit: postsPerPage,
          skip: index * postsPerPage,
          pagesNumber,
          archivePageNumber: index + 1,
          pageType: index + 1 === 1 ? 'isArchiveRoot' : 'isPaginatedArchive',
        },
      });
    });
  });

  // Articles Generation

  const ArticleTemplate = path.resolve('src/templates/article.jsx');

  allLanguages.forEach(({ node: { locale: nodeLocale } }) => {
    let pageCounter = 0;

    /**
     * Iterate trought all available locales, and increase
     * the counter when an article is generated,
     * since the query results are sorted with with the same criteria for any locale
     * we can export a skipNext variable which we will use to skip all the previous posts.
     */

    allBlogPostsEdges
      .filter(({ node: { locale } }) => locale === nodeLocale)
      .forEach(({ node: { locale, slug, reference, id, categoryLink } }) => {
        const categorySlug = categoryLink?.categorySlug;
        const isUncategorized = categoryLink === null;
        pageCounter += 1;
        createPage({
          path: isUncategorized
            ? locale === defaultLanguage
              ? `${blogPath}/${slug}`
              : `${locale}/${blogPath}/${slug}`
            : locale === defaultLanguage
            ? `${blogPath}/${categorySlug}/${slug}`
            : `${locale}/${blogPath}/${categorySlug}/${slug}`,
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
             * there won't be next posts to display
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
          backgroundColor {
            backgroundColorHex: hex
          }
          primaryColor {
            primaryColorHex: hex
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
      backgroundColor: { backgroundColorHex },
      primaryColor: { primaryColorHex },
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
    background_color: backgroundColorHex,
    theme_color: primaryColorHex,
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
