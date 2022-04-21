const fs = require('fs');
const { resolve } = require('path');
const { get } = require('https');

exports.createPages = async ({
  graphql,
  actions: { createPage, createRedirect },
}) => {
  /**
   * We retrieve the project languages from DatoCMS,
   * the field "locales" returns an array of all available languages,
   * in the same order as displayed in the administration area.
   *
   * ["en", "it", "es-ES", "ar-AE"]
   *
   * The first array item is always equal to the default locale.
   * We use this value to build page paths properly.
   *
   * As soon as you add, remove and edit the order languages on Dato, page
   * paths defined below will be re-generated accordingly.
   */

  const {
    data: {
      datoCmsSite: { locales },
    },
  } = await graphql(`
    query {
      datoCmsSite {
        locales
      }
    }
  `);

  console.log(
    '\x1b[35m',
    'multilang',
    '\x1b[0m',
    `Found ${locales.length} languages: ${locales.join(', ')}`
  );

  const [defaultLocale] = locales;

  // Handle homepage server-side redirects - Start

  const secondaryLanguages = [...locales];
  secondaryLanguages.shift();

  secondaryLanguages.forEach((language) => {
    const langCode = language.split('-')[0];

    createRedirect({
      fromPath: '/',
      toPath: `/${language}/`,
      isPermanent: false,
      conditions: {
        language: [langCode],
      },
    });
  });

  // Handle homepage server-side redirects - End

  /**
   * From now on we query and export to the pageContext object the "originalId" and the "locale"
   * field for any page we generate.
   *
   * Since any record has the same originalId for each localized node, we will use it to
   * find the correspondent paths in the LanguageSwitcher and Navigator components once pages
   * are generated.
   *
   * Once page is generated, components are aware of the pageLangauge (locale) and the originalId
   * corresponding to that page, so it will be easier retrieving the correspondent path for each
   * locale for that recordId.
   *
   * By querying a "single istance" content model using the GraphQL field "allDato.."
   * we retrieve an array of n nodes. One node for each locale. We generate one page for each node.
   *
   * If a field is set as "localizable" and localized on Dato, the field value will change
   * for each node.
   *
   * If not it will display the same value for each node.
   */

  // Homepage generation with a specific template

  const {
    data: {
      allDatoCmsHomepage: { homepageNodes },
    },
  } = await graphql(`
    query {
      allDatoCmsHomepage {
        homepageNodes: nodes {
          id: originalId
          locale
        }
      }
    }
  `);

  const HomePageTemplate = resolve('src/templates/Home.jsx');

  homepageNodes.forEach(({ id, locale }) => {
    createPage({
      path: locale === defaultLocale ? '/' : locale,
      component: HomePageTemplate,
      context: {
        id,
        locale,
      },
    });
  });

  // Categories archive generation with a specific template

  const {
    data: {
      allDatoCmsCategoriesArchive: { categoriesArchiveNodes },
    },
  } = await graphql(
    `
      query {
        allDatoCmsCategoriesArchive {
          categoriesArchiveNodes: nodes {
            id: originalId
            locale
            slug
          }
        }
      }
    `
  );

  const CategoriesArchiveTemplate = resolve(
    'src/templates/CategoriesArchive.jsx'
  );

  categoriesArchiveNodes.forEach(({ locale, slug, id }) => {
    createPage({
      path: (() => {
        if (locale === defaultLocale) return `/${slug}`;
        return `/${locale}/${slug}/`;
      })(),
      component: CategoriesArchiveTemplate,
      context: {
        id,
        locale,
      },
    });
  });

  // Blog root page generation with a specific template

  const {
    data: {
      allDatoCmsBlogRoot: { blogRootNodes },
    },
  } = await graphql(`
    query {
      allDatoCmsBlogRoot {
        blogRootNodes: nodes {
          id: originalId
          locale
          slug
        }
      }
    }
  `);

  const BlogRootTemplate = resolve('src/templates/BlogRoot.jsx');

  blogRootNodes.forEach(({ locale, slug, id }) => {
    createPage({
      path: (() => {
        if (locale === defaultLocale) return `/${slug}`;
        return `/${locale}/${slug}/`;
      })(),
      component: BlogRootTemplate,
      context: {
        id,
        locale,
      },
    });
  });

  /**
   * Ohter pages generation (/guide, /features) - Sharing the same template
   *
   * This is the same approach that will be used to generate records
   * of any content model of type "collection" (like blog posts).
   */

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
        }
      }
    }
  `);

  const OtherPagesTemplate = resolve('src/templates/OtherPages.jsx');

  otherPagesNodes.forEach(({ locale, slug, id }) => {
    createPage({
      path: locale === defaultLocale ? `/${slug}` : `${locale}/${slug}`,
      component: OtherPagesTemplate,
      context: {
        id,
        locale,
      },
    });
  });

  /**
   * From now on, we will need the correct blog pathname slug in order
   * to generate the paths for posts and categories.
   *
   * We use this helper function inside each loop. By passing the locale value
   * of the node we are generating, it will return us the correspondent blog pathname slug.
   */

  const getBlogPathname = (generatingLocale) => {
    const { slug } = blogRootNodes.find(
      ({ locale }) => locale === generatingLocale
    );
    return slug;
  };

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
        }
      }
    }
  `);

  const CategoryTemplate = resolve('src/templates/Category.jsx');

  categoryNodes.forEach(({ id, locale, slug }) => {
    const blogPathName = getBlogPathname(locale);

    createPage({
      path: (() => {
        if (locale === defaultLocale) return `${blogPathName}/${slug}`;
        return `/${locale}/${blogPathName}/${slug}`;
      })(),
      component: CategoryTemplate,
      context: {
        id,
        locale,
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
        sort: { fields: [locale, meta___updatedAt] }
        filter: {
          noTranslate: { ne: true }
          categoryLink: { noTranslate: { ne: true } }
        }
      ) {
        blogPostNodes: nodes {
          id: originalId
          categoryLink {
            categorySlug: slug
          }
          locale
          slug
        }
      }
    }
  `);

  const ArticleTemplate = resolve('src/templates/Article.jsx');

  locales.forEach((siteLocale) => {
    let pageCounter = 0;

    const blogPostNodesPerLocale = blogPostNodes.filter(
      ({ locale }) => locale === siteLocale
    );
    const blogPostsPerLocale = blogPostNodesPerLocale.length;
    const blogPathName = getBlogPathname(siteLocale);

    blogPostNodesPerLocale.forEach(({ locale, slug, id, categoryLink }) => {
      const categorySlug = categoryLink?.categorySlug;
      const isUncategorized = categoryLink === null;
      const isGeneratingDefaultLang = locale === defaultLocale;

      pageCounter += 1;

      const isLastPost = pageCounter === blogPostsPerLocale;

      createPage({
        path: (() => {
          if (isUncategorized) {
            if (isGeneratingDefaultLang) return `${blogPathName}/${slug}`;
            return `${locale}/${blogPathName}/${slug}`;
          }
          if (isGeneratingDefaultLang) {
            return `${blogPathName}/${categorySlug}/${slug}`;
          }
          return `${locale}/${blogPathName}/${categorySlug}/${slug}`;
        })(),
        component: ArticleTemplate,
        context: {
          id,
          locale,
        },
      });

      if (isLastPost) {
        console.log(
          '\x1b[35m',
          'node',
          '\x1b[0m',
          `Generated ${pageCounter} posts for "${locale}" locale.`
        );
      }
    });
  });

  // Webmanifest generation

  const {
    data: {
      allDatoCmsSeoAndPwa: { seoAndPwaNodes },
    },
  } = await graphql(`
    query {
      allDatoCmsSeoAndPwa {
        seoAndPwaNodes: nodes {
          name
          shortName
          pwaLocale: locale
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
      pwaLocale,
      pwaThemeColor: { pwaThemeColorHex },
      pwaBackgroundColor: { pwaBackgroundColorHex },
    },
  ] = seoAndPwaNodes;

  const publicPath = 'public';
  const imagesPath = 'public/images';

  // Create full path

  if (!fs.existsSync(imagesPath)) {
    fs.mkdirSync(imagesPath);
  }

  // Download resized icons

  const iconNormal = fs.createWriteStream(`${imagesPath}/icon-192.png`);
  const iconBig = fs.createWriteStream(`${imagesPath}/icon-512.png`);
  const icon = fs.createWriteStream(`${publicPath}/favicon-32.png`);

  try {
    get(`${normalSize}`, (response) => {
      response.pipe(iconNormal);
    });
    get(`${bigSize}`, (response) => {
      response.pipe(iconBig);
    });
    get(`${favSize}`, (response) => {
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
    lang: pwaLocale,
    start_url: '/',
    ...commonManifestData,
  };

  // Generate and save manifest to public folder

  fs.writeFileSync(
    `${publicPath}/manifest.webmanifest`,
    JSON.stringify(manifest, undefined, 2)
  );

  // Additional locales webmanifest files generation

  const additionalLocales = seoAndPwaNodes.length;

  if (additionalLocales > 1) {
    seoAndPwaNodes
      // Exclude default language already generated
      .filter(({ locale }) => locale !== defaultLocale)
      // eslint-disable-next-line no-shadow
      .forEach(({ name, shortName, description, pwaLocale }) => {
        // eslint-disable-next-line no-shadow
        const manifest = {
          name,
          short_name: shortName,
          description,
          lang: pwaLocale,
          display: 'standalone',
          start_url: `/${pwaLocale}/`,
          ...commonManifestData,
        };
        fs.writeFileSync(
          `${publicPath}/manifest_${pwaLocale}.webmanifest`,
          JSON.stringify(manifest, undefined, 2)
        );
      });
  }
};
