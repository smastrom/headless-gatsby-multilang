const path = require('path');
const fs = require('fs');
const https = require('https');

exports.createPages = async ({ graphql, actions: { createPage } }) => {
  /**
   * We retrieve the project languages from DatoCMS,
   * the field "allLanguages" returns an array of all available languages,
   * in the same order as displayed in your administration area.
   *
   * allLanguages = ["en", "it", "es-ES", "ar-AE"]
   *
   * The first array item is always equal to your default language.
   * We use the "defaultLanguage" value to build the page paths properly.
   *
   * As soon as you add, remove and edit the order languages on Dato, page
   * paths generate below will be re-generated accordingly.
   */

  const {
    data: {
      datoCmsSite: { allLanguages },
    },
  } = await graphql(`
    query {
      datoCmsSite {
        allLanguages: locales
      }
    }
  `);

  const [defaultLanguage] = allLanguages;

  console.log(
    '\x1b[35m',
    'multilang',
    '\x1b[0m',
    `Found ${allLanguages.length} languages: ${allLanguages.join(', ')}`
  );

  /**
   * From now on we query and export to the pageContext object the "originalId" and the "locale"
   * field for any page we generate.
   *
   * Since any record has the same originalId for each localized node, we will use it to
   * find the correspondent paths in the LanguageSwitcher and Navigator components once pages are generated.
   *
   * Once page is generated, components are aware of the pageLangauge (locale) and the originalId
   * corresponding to that page, so it will be easier retrieving the correspondent path for each
   * locale for that recordId.
   *
   * By querying a "single istance" content model using the GraphQL field "allDato.."
   * we retrieve an array of n nodes. One node for each locale. We generate one page for each node.
   *
   * If a field is set as "localizable" and localized on Dato, the field value will change for each node.
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

  const HomePageTemplate = path.resolve('src/templates/Home.jsx');

  homepageNodes.forEach(({ id, locale }) => {
    createPage({
      path: locale === defaultLanguage ? '/' : locale,
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

  const CategoriesArchiveTemplate = path.resolve(
    'src/templates/CategoriesArchive.jsx'
  );

  categoriesArchiveNodes.forEach(({ locale, slug, id }) => {
    createPage({
      path: (() => {
        if (locale === defaultLanguage) return `/${slug}`;
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

  const BlogRootTemplate = path.resolve('src/templates/BlogRoot.jsx');

  blogRootNodes.forEach(({ locale, slug, id }) => {
    createPage({
      path: (() => {
        if (locale === defaultLanguage) return `/${slug}`;
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

  const OtherPageTemplate = path.resolve('src/templates/OtherPage.jsx');

  otherPagesNodes.forEach(({ locale, slug, id }) => {
    createPage({
      path: locale === defaultLanguage ? `/${slug}` : `${locale}/${slug}`,
      component: OtherPageTemplate,
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

  const CategoryTemplate = path.resolve('src/templates/Category.jsx');

  categoryNodes.forEach(({ id, locale, slug }) => {
    const blogPathName = getBlogPathname(locale);

    createPage({
      path: (() => {
        if (locale === defaultLanguage) return `${blogPathName}/${slug}`;
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

  const ArticleTemplate = path.resolve('src/templates/Article.jsx');

  allLanguages.forEach((siteLocale) => {
    let pageCounter = 0;

    /**
     * Iterate trought all available locales, and increase
     * the counter when an article is generated,
     * since the query results are sorted with with the same criteria for any locale
     * we can export a skipNext variable which we will use to skip all the previous posts.
     *
     * By limiting the query to one result, we are sure that the node returned corresponds
     * to the next post according to the sorting parameter.
     */

    const blogPostNodesPerLocale = blogPostNodes.filter(
      ({ locale }) => locale === siteLocale
    );
    const blogPostsPerLocale = blogPostNodesPerLocale.length;

    const blogPathName = getBlogPathname(siteLocale);

    blogPostNodesPerLocale.forEach(({ locale, slug, id, categoryLink }) => {
      const categorySlug = categoryLink?.categorySlug;
      const isUncategorized = categoryLink === null;
      const isGeneratingDefaultLang = locale === defaultLanguage;

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

          /**
           * If generating the last article, assign the value "0" since
           * there won't be a next post to display
           */

          skipNext: isLastPost ? 0 : pageCounter,

          /**
           * If generating the first article, assign the value 1 or the GraphQL
           * query will fail having a skip variable < 0 and a limit variable > 0.
           */

          skipPrevious: pageCounter === 1 ? 1 : pageCounter - 2,
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
    lang: pwaLocale,
    start_url: '/',
    ...commonManifestData,
  };

  // Generate and save manifest to public folder

  fs.writeFileSync(
    `${publicPath}/manifest.webmanifest`,
    JSON.stringify(manifest, undefined, 2)
  );

  // Additional language webmanifest files generation

  const additionalLanguages = seoAndPwaNodes.length;

  if (additionalLanguages > 1) {
    seoAndPwaNodes
      .filter(({ locale }) => locale !== defaultLanguage) // Exclude default language already generated
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
