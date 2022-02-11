![Headless Multilingual Starter for Gatsby with DatoCMS](https://i.ibb.co/0XSy2gf/splashscreen-2.png)

# Headless Multilingual Starter for Gatsby 4 with DatoCMS

Multilanguage starter for Gatsby completely driven by an headless CMS.

[Live Demo](https://headlessmultilingual.gatsbyjs.io)

</br>

## Lighthouse scores

| Performance | Accessibility | Best Pratices | SEO | PWA |
| ----------- | ------------- | ------------- | --- | --- |
| 98 ~ 100    | 100           | 100           | 100 | 8/9 |

[Run Lighthouse Test](https://googlechrome.github.io/lighthouse/viewer/?psiurl=https%3A%2F%2Fheadlessmultilingual.gatsbyjs.io%2F&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo&category=pwa&utm_source=lh-chrome-ext)

</br>

## Features

- **100% Headless**: create pages and articles, define languages, branding, blog settings and localize SEO, PWA settings, categories and post slugs directly on DatoCMS.
- Language switcher component swapping between different and equal slugs per locale
- Automatic internal links localization using [DAST](https://www.datocms.com/docs/structured-text/dast) and custom `<Navigator />` component
- Multiple per-locale PWA webmanifest files generation on build time, dynamically injected depending on current language.
- Browser locale detection and redirection
- Translate and generate only specific posts per locale
- Supports any language code path such as "/en-GB" or "/en",
- Infinite scroll, prev/next article navigation, social sharing and synthax highlighting.
- Built without any internationalization plugin, just Gatsby APIs and DatoCMS native features.

</br>

## CMS View

![CMS View](https://i.ibb.co/Nrdj25b/cms-view.png)

</br>

## Table of contents

- [Purpose of the package](#purpose-of-the-package)
- [Content of the package](#content-of-the-package)
- [Why DatoCMS](#why-datocms)
- [Important notes](#important-notes)
- [Starter installation](#starter-installation)
- [Starter configuration](#starter-configuration)
  - [1. Languages](#1-languages)
  - [2. Fields relationships](#2-fields-relationship)
  - [3. Fallbacks](#3-fallbacks)
  - [4. Pages generation](#4-pages-generation)
  - [5. Language switcher](#5-language-switcher)
  - [6. Editing the menu](#6-editing-the-menu)
  - [7. Internal link navigation using Navigator component](#7-internal-link-navigation-using-navigator-component)
  - [8. Creating new templates](#8-creating-new-templates)
  - [9. Blog features](#9-blog-features)
  - [10. SEO](#10-seo)
  - [11. PWA](#11-pwa)
  - [12. Redirect](#12-redirect)
  - [13. 404](#13-404)
  - [14. Styling](#14-styling)
- [Issues](#15-issues)

<br />

## Purpose of the package

The purpose is to provide a full JAMstack multilingual boilerplate which allows editors to add/remove languages, translate slugs, SEO, PWA, menus, pages, posts and much more directly on DatoCMS.

By enforcing fields validation and presentation, it is possible to safely manage those aspects of the app outside of Gatsby.

Since language switcher, localized meta tags injections, webmanifest generation, redirects and path generation are already set-up, you can truly focus on your content.

After publishing any change, a build on Gatsby Cloud will automatically be executed and the website will be updated with new localized content.

<br />

## Content of the package

| /src                    | Content                                                               |
| ----------------------- | --------------------------------------------------------------------- |
| /components/layout      | Layout and most common reusable components                            |
| /components/ui          | Specific UI components                                                |
| /components/langHelpers | `<LanguageSwitcher />`, `<Navigator />`, `<Redirect />` and `<Seo />` |
| /components/vectors     | JSX icons                                                             |
| /context                | Language provider                                                     |
| /hooks                  | Useful useStaticQuery hooks                                           |
| /static                 | colors.json generated during build                                    |
| /templates              | JSX templates                                                         |
| /pages                  | 404 page                                                              |
| /utils                  | Useful functions                                                      |

<br />

## Why DatoCMS

As of writing, Gatsby Cloud integrates perfectly with four headless CMSs, Dato is by far my favourite one: it is simple, powerful and honest.
The query schema is excellently crafted and makes possible to handle data in a very simple and clean way.

Moreover, you can enjoy instant previews on Gatsby Cloud, without any futher configuration, just save the draft, wait for 5 seconds and preview the content.

if you are not familiar with DatoCMS, the following links will be useful:

- [DatoCMS and Gatsby](https://www.gatsbyjs.com/guides/datocms/)
- [Validations](https://www.datocms.com/docs/content-modelling/validations)
- [Blocks](https://www.datocms.com/docs/content-modelling/blocks)
- [Modular Content Fields](https://www.datocms.com/docs/content-modelling/modular-content)
- [Structured Text](https://www.datocms.com/docs/content-modelling/structured-text)

However, multi-language features of this starter can be adapted and used with other headless CMSs as long as locales and localized data are queriable in a Dato-like way.

<br />

## Important notes

**DatoCMS** - The entire project content and many key settings are hosted on DatoCMS, this means that any content must be entered perfectly: create fieldsets, enforce fields validation and presentation, check carefully field IDs and keep the environment much cleaner as possible.

**Gatsby** - The data mentioned above is queried via GraphQL in any template and configuration file, each time a field is removed or its settings are changed, make sure that Gatsby knows it.

The list of the available languages comes directly from Dato, and the GraphQL schema for any content model gets updated everytime you add or remove new languages making possible to separate the languages management and the code itself.

Moreover, knowledge of Gatsby's `createPages API` and `pageContext` object is required in order to customize the starter. In any case, everything's perfectly explained [here](https://www.gatsbyjs.com/docs/creating-and-modifying-pages/#trade-offs-of-querying-for-all-fields-in-the-context-object-of-gatsby-nodejs).

<br />

## Starter installation

1. Install the starter with [Gatsby CLI](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-cli/README.md):

```console
gatsby new headless-gatsby-multilang https://github.com/smastrom/headless-gatsby-multilang.git
```

2. Log in to your DatoCMS account and
   \
   \
   [![Clone DatoCMS project](https://dashboard.datocms.com/clone/button.svg)](https://dashboard.datocms.com/clone?projectId=53683&name=Headless+Gatsby+Multilingual+Starter)

3. Access the project in your DatoCMS admin panel and retrieve your public API token. Replace it in your gatsby-config.js file:

   ```js
   {
     resolve: 'gatsby-source-datocms',
     options: {
       apiToken: 'YOUR_API_TOKEN',
     },
   },
   ```

4. Initialize a new Git repo, commit and push all the files.

5. Access to Gatsby Cloud, add a new site and connect with your Git repo

![Import to Gatsby Cloud](https://i.ibb.co/GxvDsg8/Schermata-2021-09-20-alle-11-44-09.png)

6. Connect your DatoCMS account to Gatsby Cloud and create the site.

![Connect DatoCMS](https://i.ibb.co/bFQTgTs/Schermata-2021-09-20-alle-11-53-43.png)

<br />

# Starter configuration

## 1. Languages

Access the cloned project on DatoCMS and set the languages by navigating to: **Settings > Environment > Settings**

Drag to the left at the first position your main language, and rearrange in order of importance the other languages.
Pre-existent localized fields' content will vanish once you delete the related language.
![Language Selection](https://i.ibb.co/d7Qyk22/Schermata-2021-07-26-alle-20-42-36.png)

Once a new language is added, a new tab for translations will appear for each content model.

In any query you will run, the results will always be sorted based on the aforementioned order.

```json
"allDatoCmsBlogPost": {
"edges": [
  {
    "node": {
      "slug": "introducing-jsx",
      "locale": "en"
    }
  },
  {
    "node": {
      "slug": "introduzione-a-jsx",
      "locale": "it"
    }
  },
  {
    "node": {
      "slug": "presentando-jsx",
      "locale": "es"
    }
  },
```

The language switcher will show them in the same order as well.

![Language Switcher](https://i.ibb.co/qywKx51/Schermata-2021-08-01-alle-22-04-18.png)

The language path for your main language won't be generated, instead it will for any other language:

```
https://yourgatsbywebsite.com/contact
https://youtgatsbywebsite.com/it/contatti
https://youtgatsbywebsite.com/es-ES/contactos
```

<br />

## 2. Fields relationships

Before adapting your DatoCMS environment to your needs and start editing core files, please make sure to understand the relationship between the following fields and the core files.

### 2a. Special content fields

Those fields are all **mandatory** in order to ensure a proper behavior of any multilanguage feature such as Language Switcher, SEO Meta Tags injection and navigation.  
**Please note** that each of the following fields must always share the same ID in each content model according to its nature. Rename them only if you know what you're doing.

| Field ID | Field Type | Localized | GraphQL identifier |
| -------- | ---------- | --------- | ------------------ |
| `slug`   | SEO > Slug | Yes       | slug               |

_Necessary to generate pages, retrieve corresponding content and build URLs._

- Assigned on DatoCMS to any page/post content model that will be generated as a page with an unique slug.
- Exported to the _pageContext_ object during generation
- Queried in _gatsby-node.js_, _any template_ and _languageSwitcher.jsx_

---

| Field ID    | Field Type         | Localized | GraphQL identifier |
| ----------- | ------------------ | --------- | ------------------ |
| `reference` | Single-line string | No        | reference          |

_An helper, necessary to retrieve corresponding slugs for each page/post, its value should always **be equal** to the slug assigned to your main language._

- Assigned to any page/post content model that will be generated as a page with an unique slug.
- Exported to the _pageContext_ object during generation
- Queried in _gatsby-node.js_ and _languageSwitcher.jsx_

---

| Field ID | Field Type          | Localized | GraphQL identifier |
| -------- | ------------------- | --------- | ------------------ |
| `seo`    | SEO > Seo Meta Tags | Yes       | seo                |

_Necessary to inject the correct SEO tags to the `<head>` with React Helmet._

- Assigned to any page/post/archive content model that will be generated as a page with an unique slug.
- Queried in _any template_ which will render a page/post/archive.

---

| Field ID     | Field Type         | Localized | GraphQL identifier |
| ------------ | ------------------ | --------- | ------------------ |
| `__typename` | Single-line string | No        | \_\_typename       |

_Necessary to manage internal link navigation and custom blocs renderer within Structured Text Fields._

- Native graphql schema field which returns a string corresponding to the model/block field name. More info [here](https://graphql.org/learn/schema/).
- Queried in _any template_ which includes a Structured Text Field.

<br />

### 2b. Special settings fields

**Location:** Available in the content model name _Website Settings_ or in GraphQL as `datoCmsWebsiteSetting`

| Fieldset | Field ID    | Field Type         | Localized | GraphQL identifier |
| -------- | ----------- | ------------------ | --------- | ------------------ |
| Blog     | `blog_path` | Single-line string | No        | blogPath           |

_Necessary to generate the archive page and the correct URLs for your blog posts. Since it is not a localized field, your blog path will always look like: /blog, /it/blog, /es/blog._  
**Please note** that this field, unlikely the following one, it is **mandatory** to ensure a proper behavior of language switch and link navigation.

- Assigned to the _content model_ named _Website Settings_
- Queried in _gatsby-node.js_, and _useLanguages_ hook. Used in _navigator.jsx_, _languageProvider.jsx_ and languageSwitcher.jsx.

---

| Fieldset | Field ID         | Field Type | Localized | GraphQL identifier |
| -------- | ---------------- | ---------- | --------- | ------------------ |
| Blog     | `posts_per_page` | Integer    | No        | postsPerPage       |

_Necessary to calculate the pages of your archive pages, they will always look like: /blog, /blog/2, /blog/3_

- Assigned to the _content model_ named _Website Settings_
- Queried in _gatsby-node.js_
- Exported to the _pageContext_ object

---

| Fieldset   | Localized |
| ---------- | --------- |
| Global SEO | Yes       |

All those fields are required in order to compose the `title` schema and set the fallbacks. They are queried in _src/components/layout/pageWrapper.jsx_ and used to build the <Helmet /> meta tags logic.

---

| Fieldset | Localized |
| -------- | --------- |
| PWA      | Yes       |

All those fields are required in order to generate multiple per locale webmanifest files. They are all queried in _gatsby-node.js_, exported to _/public_ and also assigned to Helmet's meta tags in _pageWrapper.jsx_

---

| Fieldset | Localized |
| -------- | --------- |
| Branding | No        |

All those fields are required in order to populate CSS variables values. The logo instead, will be downloaded and saved. They are all queried in _gatsby-node.js_, exported to _src/static/settings.json_ - _src/static/logo.svg_. JSON file is imported in _src/components/layout/globalStyles.js_ and logo in _src/components/header.jsx_

---

| Fieldset | Localized |
| -------- | --------- |
| Misc     | Yes       |

The following fieldset handles the localization of various strings used in the fronted such as _minutes of reading_ or buttons. They are queried in any template or component which will display them.

<br />

## 3. Fallbacks

Since translations are set as mandatory on DatoCMS you won't be able to publish new content if you haven't actually translated it.

When adding new languages, a build will automatically be executed and the new language will be displayed in the switcher. If you haven't translated the content, you most likely will get errors while browsing that language pages in development mode.

If you want to get rid of the errors simply set the fallbacks in _gatsby-config.js_ under _gatsby-source-datocms_:

```js
{
  resolve: 'gatsby-source-datocms',
  options: {
    apiToken: 'YOUR_API_TOKEN',
    localeFallbacks: {
      'lt-LT': 'en',
      kr: 'en-US',
    },
  },
}
```

Fields' values not yet translated (returning `null`) will return the value of the fallback language.

If you want to be able to publish content on Dato even if it is not translated, you can uncheck the mandatory translation in the **content model settings**.

<br />

## 4. Pages generation

In order to prevent build failures, please check that:

- In case you set up new languages not included in the starter, you will always have to fill up any field marked as required in **any content model**.
- Before starting the dev server always make sure that content for any language is published and marked without any error:  
  ![Content correctly published](https://i.ibb.co/tXQYxqT/Schermata-2021-08-03-alle-17-27-14.png)
- If you want the build to succeed even if you haven't translated yet the content for new languages, set the fallbacks in `gatsby-config.js` and uncheck the mandatory translation as explained in the previous section.

- In case you removed any non-mandatory content field such as `heroTitle` etc, make sure that they are not queried anymore in any file.

Generate pages as you normally would, the only difference is that you will **always** have to export the `reference` field to the `pageContext` object as well.

Remember to always **name** `context` object properties as displayed below.

A typical dynamic pages generation would look like:

```js
  const data = await graphql(`
    query {
      allDatoCmsOtherPage {
        nodes {
          id: originalId
          locale
          slug
          reference
        }
      }
    }
  `);

  data.allDatoCmsOtherPage.nodes.forEach(({ locale, slug, id, reference }) => {
    createPage({
      path: `${
        locale === defaultLanguage
          ? `/${slug}`
          : `${locale}/${slug}`
      }`,
      component: OtherPageTemplate,
      context: {
        id,
        locale,
        slug,
        reference,
      },
    });
  });
};
```

<br />

## 5. Language switcher

The language switcher works out-of-the-box and needs no futher configuration.
As long as you follow the presentation below each related field on DatoCMS, there won't be issues.

Just to make sure:

- For any generated page, the `reference` field should always be exported to the `pageContext` object.
- The `reference` field value must be equal to the value assigned to the `slug` of your main language
- In case any of your page/post has the same slug for different locales, you should never set the slug field as non-localizable.
- You can't localize the `blog_path` field

As soon as you add new languages, localize and publish the content, a new language will be displayed and you can start switching between different languages.

<br />

## 6. Editing the menu

Just edit the content model named **Menu** by adding/removing block items and localize the name and the corresponding slug.

<br />

## 7. Internal link navigation using Navigator component

When creating an internal link you need to use the built-in `<Navigator />` component. It's built on top of `GatsbyLink` and supports any type of page included in the starter.

| prop        | type    | description                                                               |
| ----------- | ------- | ------------------------------------------------------------------------- |
| `article`   | Boolean | Sets the navigator to treat the provided slug as a blog post              |
| `page`      | Boolean | Sets the navigator to treat the provided slug as a page                   |
| `archive`   | Boolean | Redirects to the archive page                                             |
| `home`      | Boolean | Redirects to the homepage page                                            |
| `to`        | String  | Accepts the slug queried from GraphQL, needed only for articles and pages |
| `className` | String  | Your own className                                                        |
| `ariaLabel` | String  | Accessible link name                                                      |

### 7a. Usage - Case A - Providing a specific slug

**Used in /src/templates/home.jsx**

> _You are creating a button in the homepage hero section to redirect to the Guide page. You are **not using** Structured Text, you are just creating the link directly in the template file._

A typical usage would look like:

```jsx
import Navigator from '../components/langHelpers/navigator';

...

<Navigator
  className="classicButtonOutline"
  page
  to={data.guidePageLink.slug}
>
  {data.guidePageLink.title}
</Navigator>

...

export const query = graphql`
  query HomePageTemplate($locale: String!) {
    guidePageLink: datoCmsOtherPage(
      locale: { eq: $locale }
      reference: { eq: "guide" }
    ) {
      slug
      title
    }
  }
`;
```

**Caveat:** You will have to manually enter the _reference_ field value of the corresponding post/page. It can be done within 10 seconds but use it only if your content editors are not going to control this slug.

---

### 7b. Usage - Case B - Dynamic rendering with `<StructuredText />`

**Used in /src/templates/article.jsx**

> _You are creating a post template which content will be managed by your editors. They will decide which links to display in the page. You **are using** Structured Text._

Since DatoCMS provides a set of [components](https://www.npmjs.com/package/react-datocms) to work faster with React, it is possible to automate the rendering of any link or block **included** in a Structured Text Field with a custom component. The complete documentation can be found [here](https://github.com/datocms/react-datocms#custom-renderers).

This is so far the best approach because you will set the template only once, then your content editors will add new articles and create links without no further intervention on your behalf.

**Output field** - `structured_body` field settings _(in the article or page content model where links will be added)_:

![](https://i.ibb.co/F01fcy5/Schermata-2021-08-02-alle-11-25-15.png)

**Content editing**

<img src="https://i.postimg.cc/qRP54NMx/Il-mio-filmato.gif" width="600px"/>

A typical usage would look like:

```jsx

import { StructuredText } from 'react-datocms';
import Navigator from '../components/langHelpers/navigator';

...

  <StructuredText
    data={data.datoCmsBlogPost.structuredBody}
    renderLinkToRecord={({ record, children, transformedMeta }) => {
      switch (record.__typename) {
        case 'DatoCmsOtherPage':
          return (
            <Navigator {...transformedMeta} page to={record.slug}>
              {children}
            </Navigator>
          );
        case 'DatoCmsBlogPost':
          return (
            <Navigator {...transformedMeta} article to={record.slug}>
              {children}
            </Navigator>
          );
        case 'DatoCmsArchivePage':
          return (
            <Navigator {...transformedMeta} archive>
              {children}
            </Navigator>
          );
        case 'DatoCmsHomepage':
          return (
            <Navigator {...transformedMeta} home>
              {children}
            </Navigator>
          );

        default:
          return null;
      }
    }}

...

export const query = graphql`
  query BlogPostTemplateQuery(
    $id: String!
    $locale: String!
  ) {
    datoCmsBlogPost(originalId: { eq: $id }, locale: { eq: $locale }) {
      structuredBody {
        value
        links {
          ... on DatoCmsBlogPost {
            __typename
            slug
            id: originalId
          }
          ... on DatoCmsOtherPage {
            __typename
            slug
            id: originalId
          }
          ... on DatoCmsHomepage {
            __typename
            id: originalId
          }
          ... on DatoCmsArchivePage {
            __typename
            id: originalId
          }
        }
      }
    }
  }
`;

```

Basically, `renderLinkToRecord` will check for the \_\_typename value of the queried model, if it matches the `case` clause, it will render it using `<Navigator />` with the right prop.

**Caveats:**

- You will always have to query `originalId` **with the alias `id`** for each fragment (content model) or the rendering will fail.

- For any page rendered by an unique template, you will have to add the fragments manually to the template query and add the content model to the allowed record links for each structured text field.

---

### 7c. Usage - Other cases

A redirect to the homepage would look like:

```jsx

import Navigator from '../components/langHelpers/navigator';
import { LogoIcon } from '../components/vectors/logo';

...

<Navigator home>
  <LogoIcon />
</Navigator>

...

```

A redirect to the archive page would look like:

```jsx

import Navigator from '../components/langHelpers/navigator';
import { BackToArchiveButton } from '../components/buttons';

...

<Navigator archive>
  <BackToArchiveButton />
</Navigator>

...

```

<br />

## 8. Creating new templates

When creating new templates (e.g. single pages), always import and wrap your template around the `PageWrapper` component. Always pass to the `pageData` prop the entire `pageContext` object:

```js
...

import PageWrapper from '../layout/pageWrapper';

const BlogPostTemplate = ({ data, pageContext }) => (
  <PageWrapper pageData={pageContext}

  ...

```

DatoCMS recently released [Structured Text Fields](https://www.datocms.com/blog/introducing-structured-text), in my opinion this is a big stride for content editors. Basically, they will be able to create pages and build the entire layout by using blocks which will be rendered by your components.

In the next section, there's an example on how to use custom components to render blocks inserted inside Structured Text Fields.

<br />
  
## 9. Blog features

Instead of writing blog articles in markdown, you can take advantage of [Structured Text Fields](https://www.datocms.com/docs/react/structured-text-fields) and give your content editors a Medium-like fullscreen writing experience:

![Structured Text Focus Mode](https://i.ibb.co/CHQY4Fj/Schermata-2021-09-11-alle-18-45-46.png)

**Please take note** that this starter only supports Structured Texxt Fields to handle blog posts content and if you want to stick with the markdown approach (by using a _multi-line text field_), internal navigation and synthax highlighting won't work.

### 9a. Archive pagination

Archive pagination works out-of-the box and needs no further configuration besides setting the number of posts per page on Dato.
I have used the same logic explained [here](https://www.gatsbyjs.com/docs/adding-pagination/) by Gatsby folks.

### 9b. Prev/next navigation

The prev/next navigation works out-of-the-box as well.

In case you want to apply it to a new collection of records, keep in mind that:

- A counter must be initialized in each loop which generates single post pages for each locale.
- A `skipNext` variable should be exported to the `pageContext` object for each post/record you are generating and its value must be equal to the counter value, and it should be equal to zero for each last generated post for each locale.
- A `skipPrevious` variable should be exported as well, its value should be equal to (counter - 2) except that for the first generated post which must be equal to 1.

In order to have a navigation coherent with your stream, always use the same sort parameter used in _gatsby-node.js_, also in any other template which contains the post stream and in the single post template.

**_gatsby-node.js_**

```js
query {
  allDatoCmsBlogPost(sort: { order: ASC, fields: [locale, meta___firstPublishedAt] }{
    edges {
```

**_home.jsx_**

```js
query {
  allDatoCmsBlogPost(sort: { order: ASC, fields: meta___firstPublishedAt }
    edges {
```

**_article.jsx_**

```js
export const query = graphql`
  query BlogPostTemplateQuery(
    $id: String!
    $locale: String!
    $skipNext: Int!
    $skipPrevious: Int!
  ) {
    next: allDatoCmsBlogPost(
      filter: { locale: { eq: $locale } }
      sort: { order: ASC, fields: meta___firstPublishedAt }
      limit: 1
      skip: $skipNext
    ) {
      edges {
        node {
          slug
          title
        }
      }
    }
    previous: allDatoCmsBlogPost(
      filter: { locale: { eq: $locale } }
      sort: { order: ASC, fields: meta___firstPublishedAt }
      skip: $skipPrevious
      limit: 1
    ) {
      edges {
        node {
          slug
          title
        }
      }
    }
```

Then, just use the queried post values to build the prev/next component render logic.

The complete logic to extract the counter variable starts in _gatsby-node.js_ at line ~170 and the prev/next render logic can be found in _article.jsx_.

### 9c. Synthax highlighting

It works out-of-the-box and needs no further configuration, all you need to do is to add code to the Structured Text Field and choose the language.

By using [react-datocms](https://github.com/datocms/react-datocms)' `<StructuredText />` component, I set a custom render rule for the `code` using the amazing [react-synthax-hightlighter](https://www.npmjs.com/package/react-syntax-highlighter) to style the code synthax.

If you wish to use another synthax highlighter package, you can set your own render rule by following react-datocms' documentation [here](https://github.com/datocms/react-datocms).

To change the theme, simply import your favourite style. Complete documentation can be found [here](https://github.com/react-syntax-highlighter/react-syntax-highlighter).

```js
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
```

### 9d. Images

Simply add the _Article Body Image_ block to your Structured Text Field article body, and query for \_**\_typename**. In the switch statament assign to the **case** clause the value returned from \_**\_typename**.

![Image Block](https://i.ibb.co/XfBG8xm/Schermata-2021-09-11-alle-19-25-28.png)

![Article Body Image Block](https://i.ibb.co/c6sD9xq/Schermata-2021-09-11-alle-19-32-15.png)

I have created only this block to handle articles' images, but you can always create many blocks as you want and set a your own component as renderer.

```jsx
    renderBlock={({ record }) => {
      switch (record.__typename) {
        case "DatoCmsArticleBodyImage":
          return (
            <BodyImg
              image={record.image.gatsbyImageData}
              alt={record.image.alt}
            />
          );
        default:
          return null;
      }
    }}
```

Don't forget that with Structured Text Fields you can build the entire layout of the page, all you need to do is to set the your custom renderers for the blocks.

### 9e. Article Body Styles

All the article body substyles such as `h1, h2, ul` etc, can be found and customized in `/src/layout/paragraphStyles.js`. The styled component named `ArticleBody` styles all the HTML elements you can find inside the structured text field, basically, it is just the wrapper of the `<StructuredText />` component.

You will also find a template literal variable called `CommonStyles` which holds all the substyles shared with the other component named `Paragraph` which is just another structured text wrapper used in other pages such as _Features_.

### 9f. Social sharing

It works out-of-the box and needs no further configuration, you can customize the appearance in `/src/components/ui/articleHeader.jsx`.

### 8g. Miscellanous

By using DatoCMS relationship fields, each article can have its own Author assigned, you can manage them in the content model named `Authors` and then assign to each post an Author.

<br />

## 10. SEO

### 10.1 Configuring Global SEO

Access the **Website Settings** content model and set the Global SEO fields.

![Global SEO 1](https://i.ibb.co/Q9qMp2G/Schermata-2021-08-03-alle-15-09-54.png)

![Global SEO 2](https://i.ibb.co/j4tqqwx/Schermata-2021-08-03-alle-16-03-12.png)

`site_url` field must always be updated everytime your domain changes, social sharing depends on it as well.

`archive_name` and `page_name` are used to construct the title meta according to the behavior shown at the beginning of the readme.

Once you have updated and localized the fields according to your content, you can configure SEO for any content model which will be generated as a page.

### 10.2 Manage SEO

DatoCMS provides a localizable [SEO Field](https://www.datocms.com/docs/content-modelling/seo-fields) which can be considered as a fieldset containing other SEO specific fields, in particular:

`title`
`description`
`image`

**All you need to do is to fill in those three fields.** Your vital meta tags will all be generated properly and will display your website in the search results and the social cards as shown in the beginning of the readme.

Each template is wrapped in a component named `<PageWrapper />` which accepts three SEO-related props:

| prop             | type   | description                                                             |
| ---------------- | ------ | ----------------------------------------------------------------------- |
| `seoTitle`       | string | Accepts the title defined in the `seo` field on any content model       |
| `seoDescription` | string | Accepts the description defined in the `seo` field on any content model |
| `seoImage`       | string | Accepts the image url uploaded in the `seo` field on any content model  |

If your related content model has a SEO field set, you should definitely set these props and query the related fields.

```jsx
const HomePageTemplate = ({ data, pageContext }) => {

  return (
    <PageWrapper
      pageData={pageContext}
      seoTitle={data.datoCmsHomepage.seo.title}
      seoDescription={data.datoCmsHomepage.seo.description}
      seoImage={data.datoCmsHomepage.seo.image.url}
    >

    ...


export const query = graphql`
  query HomePageTemplate($locale: String!) {
    datoCmsHomepage(locale: { eq: $locale }) {
      seo {
        title
        description
        image {
          url
        }
      }

...
```

**Caveats:**

- If you don't want to localize SEO for some content you're going to create, simply do not add any SEO field to the content model, as long as the field is not queried in your template and props are not set, fallback settings will always be applied and the build will never fail.

- Any SEO field should be set as required, however, this means that its image field will require you to pick an image, even if you want to use the fallback one. Since you won't be allowed to publish the content if the image field is empty, you should assign a random image and then, query only the title and the description and assign only those two props (as I did in **src/templates/home.jsx**). The fallback image will automatically be applied.

- _Alt tags_ for your images will always be localized as long as your image field has been set as localizable in your content model.

- A sitemap will automatically be generated on build time by [gatsby-plugin-sitemap](https://www.gatsbyjs.com/plugins/gatsby-plugin-sitemap/), all you need to do is to write your website address in the `siteMetadata` object in _gatsby-config.js_

<br />

## 11. PWA

PWA support for any configured languages works out-of-the-box. All you need to do is to edit and localize the related settings fields:

![PWA Settings](https://i.ibb.co/WPwKMtQ/Schermata-2021-09-11-alle-17-44-21.png)

As soon as you will add a new language on Dato and localize its PWA settings, a new webmanifest file named `manifest_<lang-code>.webmanifest` will be exported to the /public folder and dynamically injected to the `<head>`. Instead, the default language webmanifest will always be named `manifest.webmanifest`.

![PWA Icon](https://i.ibb.co/VN9Jm6v/icon.png) ![Webmanifest files](https://i.ibb.co/vcnkFgW/Schermata-2021-09-11-alle-17-57-23.png)

Favicon will be generated automatically, based on the above icon. PWA meta tags are already inserted manually to the `<Helmet />` component in _/src/components/pageWrapper.jsx_.

If you wish to customize the manifest JSON schema, you can edit the `manifest` object variables in _gatsby-node.js_, keep in mind that icons are downloaded in different sizes by using different `imgixParams` and aliases in the dedicated query in _gatsby-node.js_.

<br />

## 12. Redirect

**When a redirect takes place?**

Once the user's preferred language has been evaluated and stored to `localStorage`, a redirect takes place when the user visits the homepage in default language ("/") via direct access (refresh / link).

**When a redirect doesn't take place?**

If the user's preferred language is equal to the website default language ("/") no redirect will take place.

**How the preferred language is evaluated?**

When the user visits the homepage ("/") for the very first time, we try to find a match among the app's languages and the browser available languages:

- Browser Languages: `["de-CH", "en-US"]`

- App Languages: `["fr", "en", "de"]`

In such case `de` is stored as `preferred_lang` in `localStorage` and the user is redirected to ("/de"). The language is evaluated according to the order priority of the browser (user) languages.

When no languages are specified in the browser languages list, the system default language will be used to evaluate the preferred language.

If there is no match, the app's default language will be stored as the preferred one.

**How the preferred language is updated?**

- When the user accesses any page in a secondary language ("/es/guia") or a page in default language ("/guide") via direct link, we assume that the user wants to set that language as the preferred one.

- When the user switches the language from the switcher a new `preferred_lang` value is stored/overwritten in `localStorage`

If you want to disable the redirect, just remove the `<Redirect>` component in `gatsby-browser.js`.

```js
import Redirect from './src/components/langHelpers/redirect';
import GlobalStyles from './src/components/layout/globalStyles';

export const wrapPageElement = ({ element }) => (
  <>
    <GlobalStyles />
    <Redirect /> // <- Remove
    {element}
  </>
);
```

Wheter or not you have set the `<Redirect />` component, the preferred language will always be stored/overwritten once the user switches the language from the switcher.

<br />

## 13. 404

If user never visited the website before and tries to access to a non-existent page, the behavior follows the same logic of the homepage redirect, the preferred language is evaluated and content is displayed in the correspondent language.

In case the user will try to access a non-existent page in the future, content in preferred language will be displayed and the _back to home_ button will redirect to the correspont homepage.

Content for 404 page can be localized on DatoCMS in the content model named **404 Page**.

<br />

## 14. Styling

By keeping the default starter configuration, CSS color variables and logo can be configured directly on DatoCMS without no further intervention on the core files.

Data is queried in _gatsby-node.js_ and saved to _/src/static_ during build time. Then the JSON file containing the hex color codes is imported in _src/layout/globalStyles.js_ and values are assigned direct to CSS variables.

```js
import { createGlobalStyle } from 'styled-components';
import Colors from '../../static/colos.json';

const GlobalStyles = createGlobalStyle`

        :root {
            --primaryColor: ${Colors.primaryColor};
            --primaryDark: ${Colors.primaryDark};
            --primaryLight: ${Colors.primaryLight};
...
```

The SVG logo url instead, is queried with useStaticQuery in _src/components/ui/header.jsx_.

If this approach doesn't fit your needs, you can safely remove the first block of code in _gatsby-node.js_ commented as "Colors". Then, remove the imports in _createGlobalStyles.js_ and _header.jsx_. Optionally delete the related fields on Dato as well.

---

## 15. Issues

Please do not hesitate to open an issue by attaching your build log/errors.
