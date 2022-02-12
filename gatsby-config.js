const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  siteMetadata: {
    siteUrl: 'https://headlessmultilingual.gatsbyjs.io',
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
    'gatsby-plugin-gatsby-cloud',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-plugin-styled-components',
      options: {
        fileName: isDev || false,
        displayName: isDev || false,
        pure: true,
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-datocms',
      options: {
        apiToken: '87cdc55b15aa843368e8df1531e7b4',
        /**
         * Example of how locale fallbacks should be set,
         * refer to README.md for more infos
         */
        localeFallbacks: {
          'ar-AE': 'en',
        },
      },
    },
  ],
};
