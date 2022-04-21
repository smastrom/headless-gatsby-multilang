![](https://i.ibb.co/WBtk7DB/readme.png)

<br />

# Headless Multilanguage Starter for Gatsby

The most powerful multilanguage blog starter for Gatsby. Completely headless.

[Live Demo](https://headlessmultilingual.gatsbyjs.io)

</br>

# Features

- **100% Headless**: Define languages and translate pages, posts, slugs, SEO meta tags and PWA settings directly on DatoCMS.
- Language switcher component swapping between different slugs/paths per locale
- Automatic and easy internal links localization using custom Navigator component
- User preferred language detection and redirection
- Built-in support for RTL languages such as Arabic or Hebrew
- Per-locale PWA webmanifest files generation on build time, dynamically injected according to the page locale.
- Support for any language code path such as "/en-GB" or "/en"
- 404 page displaying localized content according to the user preferred language
- Choose which post or category to translate (and generate) for each locale.
- Related posts, social sharing and synthax highlighting.
- Dark mode with CSS variables
- Built without any internationalization plugin, just Gatsby APIs.

</br>

# Lighthouse scores

| Performance | Accessibility | Best Pratices | SEO | PWA |
| ----------- | ------------- | ------------- | --- | --- |
| 98 ~ 100    | 100           | 100           | 100 | 8/9 |

[Run Lighthouse Test](https://googlechrome.github.io/lighthouse/viewer/?psiurl=https%3A%2F%2Fheadlessmultilingual.gatsbyjs.io%2F&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo&category=pwa&utm_source=lh-chrome-ext)

</br>

# Table of contents

- [Important notes](#important-notes)
- [Configuration](#configuration)
  - [1. Starter installation](#1-starter-installation)
  - [2. Environment configuration](#2-environment-configuration)
  - [3. Environment testing](#3-environment-testing)
  - [4. Understand content models structure](#4-understand-content-models-structure)
  - [5. Finalizing starter configuration](#5-finalizing-starter-configuration)
- [Managing content](#managing-content)
- [Styling](#styling)
- [SEO](#seo)
- [PWA](#pwa)
- [Redirect](#redirect)
- [404 page](#404-page)
- [RTL text direction support](#rtl-text-direction-support)
- [Extending the starter](#extending-the-starter)
  - [Removing fields](#removing-fields)
  - [Removing pages and templates](#removing-pages-and-templates)
  - [Generating pages](#generating-pages)
  - [Creating new templates](#creating-new-templates)
  - [Internal link navigation](#internal-link-navigation)
  - [Template design strategy](#template-design-strategy)
  - [Accessing languages](#accessing-languages)
  - [Formatting date and time](#formatting-date-and-time)
  - [Increase categories number displayed by the dropdown](#increase-categories-number-displayed-by-the-dropdown)
  - [SEO](#seo-1)
- [Troubleshooting](#troubleshooting)
- [Issues](#issues)

<br />

# Why DatoCMS

It is the most powerful headless CMS out there and also, the only one up to the job. You can define app languages directly in the project administration area and query them via GraphQL as well. Moreover, it has dozens of features that give your content editors superpowers.

Don't worry about the pricing or any other plan restriction, as long as your website will have less than 300 pages (for each locale :blush:) you will never exceed the free developer plan. There are no limits on the locales you can configure in your project.

if you are not familiar with DatoCMS, the following links will be useful:

- [DatoCMS and Gatsby](https://www.gatsbyjs.com/guides/datocms/)
- [Validations](https://www.datocms.com/docs/content-modelling/validations)
- [Blocks](https://www.datocms.com/docs/content-modelling/blocks)
- [Modular Content Fields](https://www.datocms.com/docs/content-modelling/modular-content)
- [Structured Text](https://www.datocms.com/docs/content-modelling/structured-text)

Also, you can enjoy instant previews on Gatsby Cloud, without any crazy futher configuration, just save the draft and preview the content.

> :warning: This project is not mantained by DatoCMS folks neither I am affiliated with them.

<br />

# Important notes

This starter lets you completely focus on **your content** by taking care of all the rest.

If you landed on this repo and your goal is just to setup a multilanguage blog with the same content structure of this starter (articles, category pages and archive pages) all you have to do is to follow all the steps of the [configuration](#configuration) section.

The 95% of the whole process is done directly on DatoCMS in a super-friendly environment.

Once new content is translated and published, your website will build accordingly and all the features will work out-of-the-box (page generation, language switcher, internal link navigation, SEO meta tags, PWA webmanifest, redirect, right-to-left text support...).

If you want to deeply customize it, like generating pages with different paths, you can visit the section [Extending the starter](#extending-the-starter).

In such case, knowledge of [GraphQL query variables](https://www.gatsbyjs.com/docs/how-to/querying-data/page-query/) and [Gatsby createPages API](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/#createPages) is **required**.

<br />

# Configuration

## 1. Starter installation

1. Install the starter with [Gatsby CLI](https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-cli/README.md):

```console
gatsby new headless-gatsby-multilang https://github.com/smastrom/headless-gatsby-multilang.git
```

2. Log in to your DatoCMS account and click the button below:
   \
   \
   [![Clone DatoCMS project](https://dashboard.datocms.com/clone/button.svg)](https://dashboard.datocms.com/clone?projectId=63095&name=Headless+Multilingual)

3. In the cloned project administration area, grab the read-only API token and replace it in your gatsby-config.js file:

   ```js
   {
     resolve: 'gatsby-source-datocms',
     options: {
       apiToken: 'YOUR_API_TOKEN',
     },
   },
   ```

4. Initialize a new Git repo, commit and push all the files.

5. Sign-in to Gatsby Cloud, add a new site and connect with your Git repo:

![Import to Gatsby Cloud](https://i.ibb.co/GxvDsg8/Schermata-2021-09-20-alle-11-44-09.png)

6. Connect your DatoCMS account to Gatsby Cloud and create the site.

![Connect DatoCMS](https://i.ibb.co/bFQTgTs/Schermata-2021-09-20-alle-11-53-43.png)

</br>

## 2. Environment configuration

Please make sure that the development server is not running before following these steps.

### 1. Access project languages

On DatoCMS navigate to: **Settings > Environment > Settings** and check for the starter default languages:

![](https://i.ibb.co/hZCcNts/Schermata-2022-02-18-alle-18-53-03.png)

### 2. Remove unwanted languages and pick a fallback language

If your website final language list won't include any of the fully translated starter language codes (`en`, `es-ES` or `it`), pick one of your choice (for example `en`) and <ins>**do not delete it**</ins>, just keep it in the list (for the being) and **delete the others**.

Otherwise, just delete the unnecessary languages, leave the ones you will use and pick **one of your choice**.

Starting from now this is your **fallback language**.

> This starter is using fallbacks for `ar-AE`, so do not consider it as a language you can pick.

![](https://i.ibb.co/vs4sv5F/Schermata-2022-02-18-alle-18-53-54.png)

> :warning: If for example, you are planning to add `English (United Kingdom) "en-GB"` and to remove `"en"`, consider `"en-GB"` as a **different language** and keep `"en"` in the list as fallback.

### 3. Add new languages

Choose any kind of lang code you prefer from the dropdown and add the languages:

![](https://i.ibb.co/Kw2ntfk/Schermata-2022-02-18-alle-18-56-44.png)

### 4. Set the default language

Drag to the left at first position your website **default language**, and rearrange in order of importance the others:

![](https://i.ibb.co/CW5Tymn/Schermata-2022-02-18-alle-18-57-44.png)

:floppy_disk: Save your project settings.

### 5. Set the fallbacks

Open **gatsby-config.js** and set the **fallbacks** as displayed below:

```js
{
  resolve: 'gatsby-source-datocms',
  options: {
    apiToken: '<YOUR_PUBLIC_API_TOKEN>',
    localeFallbacks: {
      'zh': 'en',
      'pt-BR' : 'en',
    },
  },
},
```

You should create a property for each new language (not included in the starter) and assign to it the fallback picked before ("en").

:floppy_disk: Save the file.

<br />

## 3. Environment testing

### Local environment

Navigate into your project folder and run `gatsby develop`. Check on your terminal, at some point you will see something like:

![Console infos](https://i.ibb.co/qBF93WC/Schermata-2022-02-15-alle-23-40-29.png)

By opening [http://localhost:8000](http://localhost:8000) you will notice that your languages are now displayed in the switcher, in the same order as you set before in your administration area:

![Switcher](https://i.ibb.co/LRDjJJP/Schermata-2022-02-15-alle-23-13-51.png)

As you can see pages are generated with proper paths, SEO meta tags and the webmanifest localized are injected to the head for each language.

Whenever you will change the languages order on Dato, your website will be generated accordingly.

You can switch language and navigate the website. Content will still be displayed in fallback language.

<br />

### Gatsby Cloud (optional)

Commit and push your changes. Access Gatsby Cloud and monitor the build trigged by your Git connection, it should be ready soon.

Once the build is completed, if you visit your website (via the free domain assigned by Gatsby Cloud) you should be able to see your website live just like you see it locally.

A build will also be triggered by the DatoCMS connection everytime you publish content.

<br />

## 4. Understand content models structure

Before finalizing the starter configuration make sure to have read and understood this section.

I have organized the vertical menu of the content editing area according to the content models' [type](https://www.datocms.com/docs/content-modelling) and purpose:

![](https://i.ibb.co/qFDxyrg/Schermata-2022-02-18-alle-19-01-57.png)

`Gatsby Node` models are queried by [gatsby-node.js](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/) in order to generate pages and also by the templates (used to generate such pages) in order to render the correspondent data fields.

`Data-only` models are queried in different JSX files to render some data but they are not used to generate any page (hence the name _data-only_).

Basically, what differs between the two groups is that `Gatsby Node` models have a localizable `slug` field used to build the path and a localizable `seo` field to render the meta tags.

### 1. Gatsby Node

**<ins>Single instance</ins>**

**Homepage** - Used to generate the homepage:

- Default language: `/`
- Other languages : `/it-IT`

**Categories Archive** - Used to generate the categories archive page:

- Default language: `/categories`
- Other languages : `/it-IT/categorie`

**Blog Root** - Used to generate the blog root page:

- Default language: `/blog`
- Other languages : `/it-IT/articoli`

**<ins>Collections</ins>**

**Other pages** - Used to generate pages using a shared template such as `/guide` and `/features`

- Default language: `/guide`
- Other languages : `/it-IT/guida`

**Categories** - Used to generate category pages:

- Default language: `/blog/react`
- Other languages : `/it-IT/articoli/react`

**Posts** - Used to generate post pages:

- Default language: `/blog/react/rendering-elements`
- Other languages : `/it-IT/articoli/react/renderizzare-elementi`

---

### 2. Data-only

**<ins>Collections</ins>**

**Authors** - A collections of records representing the authors of your blog. These records can be linked to any post.

**<ins>Single instance</ins>**

**Menu** - In this content model you can add or remove a menu item. You can order them via drag-n-drop and link to each of them a record of the Gatsby Node group.

**Footer** - Contains the footer content.

**404 Page** - 404 page content, fully localizable.

**Seo and PWA** - Fields related to Global SEO and PWA webmanifest.

**Misc strings** - String fields used site-wide such as "Recent posts" or "See all categories".

<br />

## 5. Finalizing starter configuration

### 1. Get rid of blog dummy content

Make sure your development server is not running.

1. Delete any **article / category / author** **<ins>record</ins>** coming with this starter (do not delete the content models!).
2. Create and publish your first category and author records and translate the fields for any locale.
3. Create and publish your first post, translate the fields for any locale and [link](#linking-categories-and-authors-to-blog-posts) the category and the author just created to the post.

> :warning: Since the fallback language picked before is still necessary to finalize the configuration, **translate also its fields**. You can copy-paste from another language or enter some dummy data, it doesn't matter. It will take 30 seconds.

5. Run `gatsby develop` and test the outcome

From now on when you will add a category or a post (or you will edit it) the layout will change accordingly and new pages with proper paths will be generated as well. Usually, it takes 2 to 4 seconds to see the edits live on your dev server.

<br />

### 2. Translate the starter base content

Translate any other content models' record and field such as `Homepage`, `Categories archive`, `Blog root`, `Global SEO and PWA`, `Misc text strings` etc...

_You will always notice which records needs to be translated:_

![](https://i.ibb.co/W3SsT5b/Schermata-2022-02-20-alle-01-57-19.png)

| :x:                                                                  | :white_check_mark:                                                   |
| -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| ![](https://i.ibb.co/tpGnFNF/Schermata-2022-02-20-alle-01-59-20.png) | ![](https://i.ibb.co/c2bxG9Z/Schermata-2022-02-20-alle-01-59-32.png) |

:warning: Make also sure that you have at least one record for each content model of type _collection_.

<br />

### 3. Get rid of the starter fallback language

> :warning: You have to follow this step only if you had to pick as fallback a starter language that won't be included in your website language list.

1. Once fields' content has been translated in any language you added, navigate to your administration area and **delete the fallback language** [picked before](#2-Remove-unwanted-languages-and-pick-a-fallback-language) from your languages list:

![](https://i.ibb.co/FW67cx3/Schermata-2022-02-19-alle-17-59-59.png)

2. Open **gatsby-config.js** and delete the fallback properties:

```js
{
  resolve: 'gatsby-source-datocms',
  options: {
    apiToken: '<YOUR_PUBLIC_API_TOKEN>',
    localeFallbacks: { // <-- Delete from here
      zh: 'en',
      'pt-BR' : 'en',
    }, // <-- to here
  },
},
```

<br/>

### 4. Set proper fallbacks (optional)

If your plan is to publish content in default language and to translate other languages later on, set the fallbacks in gatsby-config.js:

```js
{
  resolve: 'gatsby-source-datocms',
  options: {
    apiToken: '<YOUR_PUBLIC_API_TOKEN>',
    localeFallbacks: {
      'pt-BR': 'zh',
    },
  },
},
```

In this way pages generation won't fail for untranslated records since any untranslated field queried via GraphQL will return the value of the fallback language you just set.

> :wink: By now, you should be able to add and translate posts, categories and any other record you want and the starter will take care of the rest. Check the next section to have a complete overview on how to handle blog content.

<br />

# Managing content

## Choose which content to generate (and translate)

When you edit records of `Posts` and `Categories` content models, you will notice this _boolean_ field:

![](https://i.ibb.co/T2ZZF6M/Schermata-2022-02-20-alle-02-11-44.png)

By setting it to `true`, the post or category page won't be generated for that language.

> [This](https://headlessmultilingual.gatsbyjs.io/blog/development) is an example of category not available for "es" language.

> [This](https://headlessmultilingual.gatsbyjs.io/blog/react/rendering-elements) is an example of post not available for "it" and "es" languages.

If for example, the field is set to true for "es" language and the user is viewing that post/category in "en", if he tries to switch to "es", he will be redirected to the blog root.

Same happens for categories.

> :warning: If you set this field to true for a **category**, all the posts linked to that category won't be generated as well for that language, no matter if you have translated them.

> :warning: I decided to not enforce field validation on `slug` field for Posts and Categories. Before publishing any content **always check** that such fields are populated for any locale you want to generate the page (unless you have set a fallback).

<br />

## Editing the menu

Simply access the content model named `Menu` under the `Data-only` group:

![](https://i.ibb.co/W5gFrxW/Schermata-2022-02-20-alle-02-13-18.png)

Add a new "Menu Link" item and link the record you want to redirect the users. You can change the order of the block items by drag-and-drop and choose to set a complete different menu for each locale.

<br />

### Displaying featured posts in the homepage

In each post record you see find this _boolean_ field:

![](https://i.ibb.co/MDkVRqj/Schermata-2022-02-19-alle-19-07-47.png)

If set to `true` it will display that post in the homepage. You can select up to 6 posts, they will be ordered according to the update time.

<br />

### Displaying the categories dropdown

For each menu item there's this _boolean_ field:

![](https://i.ibb.co/bQCvcc7/Schermata-2022-02-20-alle-02-14-12.png)

If set to `true` it will render the categories dropdown in both desktop and mobile menus.

If you want to change the order, simply sort the records in the `Categories` content model via drap-and-drop:

![](https://i.ibb.co/nPZVfym/Schermata-2022-02-17-alle-11-25-28.png)

> :warning: By default the dropdown will display the first six categories of your blog and a link at the bottom to redirect the user to the categories archive page. If you want to increase the number of categories shown, you can check [this section](#increase-categories-number-displayed-by-the-dropdown).

<br />

## Editing the categories menu

Each category page and the blog root page, displays a scrollable menu where you can navigate the categories:

![](https://i.ibb.co/2W3wwrp/Schermata-2022-02-17-alle-11-23-27.png)

If you want to change the order, simply rearrange the records order as explained in the previous section.

Once your categories number will increase and overflow the menu, a scrollbar with a gradient will appear:

![](https://i.ibb.co/T135J7S/Schermata-2022-02-17-alle-11-29-11.png)

<br />

## Linking categories and authors to blog posts

Edit the `category_link` field in each post by selecting a category from the dropdown:

![](https://i.ibb.co/DMV6NZm/Schermata-2022-02-20-alle-02-15-51.png)

As soon as you add a new category it will be available for selection and your page paths generated accordingly.

You can also decide to not assign a category to a post, simply that post won't be rendered inside the category pages and the card won't display the category box:

![](https://i.ibb.co/yFhpZF1/Schermata-2022-02-17-alle-12-17-34.png)

The same happens for the authors, just add a new record in the `Authors` content model and update the record.

> [This](http://localhost:8000/blog/components-and-props) is an example of uncategorized post.

<br />

## Related posts

You can choose up to two posts to display below the article body:

![](https://i.ibb.co/g7X0Nm9/Schermata-2022-02-20-alle-02-58-42.png)

All you have to do is to select the records in the link field of the `Post` content model.

![](https://i.ibb.co/jzF3GZr/Schermata-2022-02-20-alle-03-03-33.png)

If no posts are set, the section won't be displayed.

<br />

# Styling

## Colors

Navigate to `src/components/Layout/sharedStyles/globalStyles.js` and change the css variables **<ins>values</ins>** for the two following classes:

```css
.lightTheme {
  --primaryColor: #0067fa;
  --headingsColor: #4d4d4d;
  --baseTextColor: #6e7581;
  --dividerColor: #e2e2e2;
  --markBackgroundColor: #fdffb4;
  --markTextColor: #4d4d4d;
  --inlineCodeTextColor: #4d4d4d;
  --inlineCodeBackgroundColor: #dbefff;
  --backgroundColor: #ffffff;
  --backgroundTransparentColor: rgba(255, 255, 255, 0);
  --backgroundColorAlt: #ffffff;
  --codeBlockBackgroundColor: #181b22;
}

.darkTheme {
  --primaryColor: #5995ea;
  --headingsColor: #eeeeee;
  --baseTextColor: #aaaaaa;
  --dividerColor: #242a31;
  --markBackgroundColor: #b2dbff;
  --markTextColor: #181b22;
  --inlineCodeTextColor: #ffffff;
  --inlineCodeBackgroundColor: #293b4a;
  --backgroundColor: #181b22;
  --backgroundTransparentColor: rgba(24, 27, 34, 0);
  --backgroundColorAlt: #1d2028;
  --codeBlockBackgroundColor: #181b22;
}
```

## useTheme hook

If for any reason CSS variables are not enough to style both themes, you can import the `useTheme` hook:

```js
import { useTheme } from 'src/hooks/useTheme';
```

And use it in any component / template:

```js
const { isDark } = useTheme();

return <Header>{isDark ? <LogoBlack /> : <LogoWhite />}</Header>;
```

<br />

## Logo

You can import and replace the logo in `src/components/Layout/Header/Full`.

<br />

## Custom fonts

Please check this [issue](https://github.com/smastrom/headless-gatsby-multilang/issues/8) for a guide on how to change the default (safe) fonts.

<br />

## Blog synthax highlighting

By using [react-datocms](https://github.com/datocms/react-datocms)' `<StructuredText />` component, a custom **render rule** for the `code` node has been set using the amazing package [react-synthax-hightlighter](https://www.npmjs.com/package/react-syntax-highlighter).

To change the theme, simply replace the import in `src/templates/Article.jsx` with your favourite style. Complete documentation and styles reference can be found [here](https://github.com/react-syntax-highlighter/react-syntax-highlighter).

```js
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'; // <-- Import your favourite style
```

If you want to override some styles from the original theme, you can do that by editing css rules in `src/components/Layout/Blog/ArticleBody/styles.js`.

If you wish to use another synthax highlighter, you can set your own `renderNodeRule` by following react-datocms [documentation](https://github.com/datocms/react-datocms).

<br />

# SEO

Access the **Website Settings** content model and set the Global SEO fields.

![Global SEO 1](https://i.ibb.co/J2hwSrY/Schermata-2022-02-16-alle-12-18-02.png)

Once you have updated and localized the fields according to your content, you can edit any `seo` field of any content model of the `Gatsby Node` group.

![](https://i.ibb.co/s1MsJGv/Schermata-2022-02-16-alle-17-31-05.png)

A sitemap will automatically be generated on build time by [gatsby-plugin-sitemap](https://www.gatsbyjs.com/plugins/gatsby-plugin-sitemap/), all you need to do is to write your website address in the `siteMetadata` object in _gatsby-config.js_. The sitemap will be available at [https://yourwebsite.com/sitemap/sitemap-0.xml](https://yourwebsite.com/sitemap/sitemap-0.xml)

<br />

# PWA

PWA support for any configured languages works out-of-the-box. All you need to do is to edit and localize the related settings fields in the content model named `SEO and PWA`:

![PWA Settings](https://i.ibb.co/WPwKMtQ/Schermata-2021-09-11-alle-17-44-21.png)

As soon as you will add a new language on Dato and localize its PWA settings, a new webmanifest file named `manifest_<lang-code>.webmanifest` will be exported to the /public folder and dynamically injected to the `<head>`. Instead, the default language webmanifest will always be named `manifest.webmanifest`.

![PWA Icon](https://i.ibb.co/VN9Jm6v/icon.png) ![Webmanifest files](https://i.ibb.co/vcnkFgW/Schermata-2021-09-11-alle-17-57-23.png)

Favicon will be generated automatically, based on the above icon. PWA meta tags are already inserted manually to the `<Helmet />` component in _/src/components/pageWrapper.jsx_.

If you wish to customize the manifest JSON schema, you can edit the `manifest` object variables in _gatsby-node.js_, bear in mind that icons are downloaded in different sizes by using different `imgixParams` and aliases in the dedicated query in _gatsby-node.js_.

<br />

# Redirect

When the user visits the homepage in default language ("/") a redirect will always take place if the language included in the `Accept-Language` request header matches one of the website's **secondary languages**.

The redirect will be performed server-side and not in the browser.

**When starting the development server you will notice a warning like:**

> There are routes that match both page and redirect. Pages take precedence over redirects so the redirect will
> not work:
>
> - page: "/" and redirect: "/" -> "/it/"
> - page: "/" and redirect: "/" -> "/es-ES/"
> - page: "/" and redirect: "/" -> "/ar-AE/"

Do not worry, the redirect will take place as expected :smiley:

Please take note that the redirect will work only once the website has been deployed to Gatsby Cloud and not during local development.

> If for any reason you want to disable the redirect you can remove the lines ~45 to 60 in gatsby-node.js.

<br />

# 404 page

Content for 404 page can be localized on DatoCMS in the content model named `404 Page`.

Unfortunately, Gatsby doesn't allow to server-side render the 404 page on each request. Such page must be statically generated on each build.

However, content will always be rendered in correct language by following a different approach (in the browser):

**Case 1 - Visiting a non-existent page for the very first time**

Assuming that the user never visited the website and tries to access a non-existent page, we try to find a match among the website languages and the browser available languages.

**Example:**

- Browser Languages: `["de-CH", "en-US"]`

- Website Languages: `["fr", "en", "de"]`

In such case `de` is considered as the user's preferred language and they will see the correct localized content in German.

If there is no match, content in website default language will be rendered.

The preferred language is always evaluated according to the order priority of the browser (user) languages.

**Case 2 - Visiting a non-existent page after having already browsed the website**

When the user switches the language a new `preferred_lang` value is stored/overwritten in `localStorage` and it will be used to render the correspondent localized data for the 404 page.

If the user never switched the language, we assume their preferred language is the website default language and content will be rendered accordingly.

<br />

# RTL text direction support

This starter has built-in support for any right-to-left language such as Hebrew or Arabic.

All you need to do is to add the language code to your DatoCMS languages list, set the fallbacks and start the dev server as explained above. If the language code matches one these [lang codes](https://meta.wikimedia.org/wiki/Template:List_of_language_names_ordered_by_code), once you switch the language, the layout direction will change accordingly.

It doesn't matter if you choose "ar" or "ar-AE", the correct language direction will always be identified and injected to the `<html>` _dir_ attribute.

## useTextDirection hook

If for any reason you need to deeply style and change elements behavior according to the language direction, you can import the `useTextDirection` hook:

```js
import { useTextDirection } from '../../hooks/useTextDirection';
```

And use it in any component / template:

```js
const { isRtl } = useTextDirection();

return <span className={isRtl ? 'menuRight' : 'menuLeft'} />;
```

<br />

# Extending the starter

If you are ok with the content structure of the starter you most likely won't need to extend it and follow those steps. In any case everything is explained below.

## Removing fields

99% of the times that an issue occurs is because the fields or content models queried in the project files are not available anymore on DatoCMS. Gatsby can't find them and throws an error.

This can happen because:

- You renamed the field ID
- You deleted the field
- You renamed the content model ID
- You deleted the content model

Without deleting the field or renaming the field Id **from the project files.**

---

For example, if you don't want the `author` field of the content model `blog_post` to be displayed in your post pages:

![](https://i.ibb.co/QXhBfTr/Schermata-2022-02-16-alle-01-47-37.png)

**1. Remove from **any query** the `author` field node:**

```js
export const query = graphql`
  query BlogPostTemplateQuery(
    $id: String!
    $locale: String!
  ) {
    datoCmsBlogPost(id: { eq: $id }, locale: { eq: $locale }) {
      title
      subtitle
      author { // <--- Delete from here
        authorName: name
        }
      } // <--- To here
      ...
```

**2. Delete any destructured prop:**

```js
const BlogPostTemplate = ({
  data: {
    datoCmsBlogPost: {
      title,
      subtitle,
      author: { // <-- Delete from here
        authorName,
      }, // <-- to here
      ...
```

**3. Then remove any expression/variable displaying the data you were querying:**

```jsx
  return (
    <Header>
      <AuthorDateContainer>
        <Author>{authorName}</Author> {/* <-- Delete this */}
        ...
```

By taking advantage of your code editor search you can easily check if the field is still queried or rendered anywhere.

**4. Once done that, you can **safely delete** the field from the content model on DatoCMS.**

> :warning: The only field you should never delete or rename the Id is the `slug` one. It is used to build the paths and by deleting/renaming it _gatsby-node_ will throw an error. For any other field as long as you understood its purpose, you can safely get rid of it.

<br />

## Removing pages and templates

If for example you want to remove any page included in the starter follow these steps:

1. Identify the related content model on Dato and check where its fields are queried in the project files.

If the content model has this ID on Dato: `other_page` - The GraphQL fields to identify would be:

- `datoCmsOtherPage`
- `allDatoCmsOtherPage`

Hence the `datoCms` prefix and the snake_case converted to camelCase.

2. With you code editor search for both field names among your project files and delete any prop destructuring, query or prop assignment.

3. Access `gatsby-node.js` and delete the block containing the query, the loop and the template declaration. You will find them grouped and preceded by a comment.

4. Delete the template used to generate such page.

<br>

## Generating pages

If you wish to generate pages with your own path structure, the best thing you can do is to **follow the comments** in `gatsby-node.js` file.

The process is very quick and in short, all you have to do is to:

- Create a content model on DatoCMS
  - Define and localize the `slug` field
  - Define and localze a `seo` field
  - Define and localize all content fields
- Create a dummy JSX template in `src/templates` just to test page generation
- Generate pages in `gatsby-node.js` using the dummy template and by querying the content model `originalId` and `slug`.
- Once pages and paths are generated properly, edit and build the template by querying and filtering the correct data.

As soon as pages are generated correctly you can switch between languages as this feature **is already set up**.

<br />

## Creating new templates

When creating new templates, always import and wrap your template around the `PageWrapper` component.

Pass to the `pageData` prop the entire `pageContext` object:

```js
import { PageWrapper } from '../Layout/PageWrapper';

const BlogPostTemplate = ({ data, pageContext }) => (
  <PageWrapper pageData={pageContext}>
  ...
```

Then any child component will have access to the page locale exported to the pageContext object during build time by `gatsby-node.js`. This is required in order to render proper links in any `Navigator` component and in `LanguageSwitcher` as well.

<br />

## Internal link navigation

### Navigator component

When you need to render localized paths you have to use the built-in **Navigator** component. It's built on top of [Gatsby Link](https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-link/) and supports any prop you would normally add to it such as `activeClassName`.

There are only two props in addition:

| Prop     | Description                                                        | Required |
| -------- | ------------------------------------------------------------------ | -------- |
| recordId | The originalId field value of the record used to generate the page | Yes      |
| passRef  | In case you need to pass a ref                                     | No       |

The component will take care of retrieving and render the proper path according to the page language.

### Single link

Import the **Navigator** component in any of your template/component:

```js
import { Navigator } from '../../../Navigator';
```

Query the `originalId` field of your record or content model (if a single instance) with GraphQL. You can use `useStaticQuery` as well:

```js
export const query = graphql`
  query HomePageTemplate($locale: String!) {
    datoCmsBlogRoot(locale: { eq: $locale }) {
      id: originalId
      title
    }
    ...
```

Then pass the field value to the prop `recordId`:

```js
<Navigator recordId={data.datoCmsBlogRoot.id}>
  {data.datoCmsBlogRoot.title}
</Navigator>
```

That's it. Now in any page the link is displayed with the proper path according to the page language.

### Dynamic link with StructuredText

Since DatoCMS provides a set of [components](https://www.npmjs.com/package/react-datocms) to work faster with React, it is possible to automate the rendering of any link or block **included** in a Structured Text Field with a custom component. The complete documentation can be found [here](https://github.com/datocms/react-datocms#custom-renderers).

This is so far the best approach because you will set the template only once, then your content editors will add new records and create links with no further intervention on your behalf.

Of course this is **already set up for you** in the starter templates but in case you want to create new ones, those are the steps you have to follow:

1. Add a structured text field to your content model:

![](https://i.ibb.co/rQYjdwz/Schermata-2022-02-16-alle-11-48-58.png)

In the field settings specify from which content models the editors are allowed to add links:

![](https://i.ibb.co/F01fcy5/Schermata-2021-08-02-alle-11-25-15.png)

Links will be available for selection to your content editors when writing posts:

<img src="https://i.postimg.cc/qRP54NMx/Il-mio-filmato.gif" width="600px"/>

<br />

2. Query the structured text field:

```js
export const query = graphql`
  query BlogPostTemplateQuery(
    $id: String!
    $locale: String!
  ) {
    datoCmsBlogPost(originalId: { eq: $id }, locale: { eq: $locale }) {
      structuredText {
        value
        links {
          ... on DatoCmsBlogPost {
            id: originalId
          }
          ... on DatoCmsOtherPage {
            id: originalId
          }
          ... on DatoCmsHomepage {
            id: originalId
          }
          ... on DatoCmsBlogRoot {
            id: originalId
          }
        }
        value
      }
      ...
```

> :warning: You will always have to query the `originalId` field with the **<ins>alias id</ins>** for each fragment representing the content models you allowed to be linked in the Structured text field:

2. Import both StructuredText and Navigator in your template/component:

```js
import { StructuredText } from 'react-datocms';
import { Navigator } from '../components/LanguageHelpers/Navigator';
```

3. Use Navigator as renderer for the `renderLinkToRecord` prop and pass the id field to it:

```jsx
const BlogPostTemplate = ({ data, pageContext }) => (
    <PageWrapper pageData={pageContext}>
        <ArticleBody>
          {data.datoCmsBlogPost.structuredText?.value && (
            <StructuredText
              key={id}
              data={structuredText}
              renderLinkToRecord={({
                record,
                children,
                transformedMeta,
              }) => (
                <Navigator {...transformedMeta} recordId={record.id}>
                  {children}
                </Navigator>
              )}
            />
          )}
        </ArticleBody>
...
```

> Spread `{...transformedMeta}` to render any custom attribute you set on Dato when adding the link. Of course you can localize those attributes as long as the Structured Text field is set as localizable.

<br />

## Template design strategy

> <ins>Example case</ins>: You are going to create three pages with different layout and content: `/contact, /about, /mission`.

### Typical approach

You create a single instance content model for each page with its own data fields or blocks, and then query, filter and render those fields in three different templates like `ContactPage.jsx`, `AboutPage.jsx` and `Mission.jsx`.

The template file will render the data of each single field of the content model:

```js
const ContactPageTemplate = ({ data, pageContext }) => (
  <PageWrapper pageData={pageContext}>
    <Heading>{data.datoCmsContactPage.title}</Heading>
    <SubHeading>{data.datoCmsContactPage.subtitle}</SubHeading>
    <Hero
      title={data.datoCmsContactPage.hero.heroTitle}
      subtitle={data.datoCmsContactPage.hero.heroTitle}
    >
  </PageWrapper>
);

export default ContactPageTemplate;

export const query = graphql`
  query ContactPageQuery() {
    datoCmsContactPage(locale: $locale) {
      title
      subtitle
      hero {
        heroTitle
        heroSubtitle
      }
    }
  }
`;
```

Then you repeat those steps for any other page like `/about` and `/mission`.

So at the end of your journey you will have <ins>three</ins> different single-instance content models on Dato, <ins>three</ins> different templates in your project folder and <ins>three</ins> different queries for each template.

> This approach has been used to generate the homepage, the categories archive page and the blog root page of this starter.

### Structured text approach

Instead of creating a single-instance content model for each page, you can create <ins>one</ins> content model of type <ins>collection</ins>, add the mandatory shared fields such as `seo` and `slug` and then add a <ins>single</ins> Structured text field to hold all your content.

Then you can create one record for each page you want to generate and inside each Structured Text field add **different blocks** according to the page layout and content.

Once your records are ready with different content per Structured Text field you can set **custom renderers** inside the StructuredText component in a **single shared template file**.

At the end of this journey you will have, <ins>one</ins> template for all the pages you are going to generate, <ins>one</ins> query to retrieve all different data and <ins>one</ins> model of type collection.

> This approach has been used to generate the `/guide` and `/features` pages of this starter by using the template `OtherPages.jsx`.

The best way to understand how it works is to read this [article](https://www.cantierecreativo.net/blog/how-to-use-datocms-s-awesome-structured-text-field-in-a-nextjs-app/) from the authors of DatoCMS and also to check the project files.

This opens the doors to different scenarios where for example, your content editors create pages, build the layout using a friendly UI completely without any developer intervention, just like they used to do with many Wordpress page builders.

<br />

## Accessing languages

You most like won't need to but if you want to access the `pageLocale`, you can call this hook in any component file used in any of your templates:

```js
import { usePageLocale } from '/src/hooks/usePageLocale';
```

And use it:

```js
const { pageLocale } = usePageLocale();

console.log(pageLocale); // Logs "es-ES"
```

> :warning: Do not call this hook in your template files, call it in any component file and use it in your templates.

Same for the website languages:

```js
import { useLocales } from '/src/hooks/useLocales';
```

```js
const { locales, defaultLocale } = usedefaultLocale();

console.log(locales); // Logs ["en", "es", "it"]
console.log(defaultLocale); // Logs "en"
```

<br />

## Formatting date and time

By default date strings coming from GraphQL queries:

```js
query {
  datoCmsBlogPost {
    meta {
      firstPublishedAt // <-- Always returns "2021-07-19T12:12:15.597+02:00"
    }
  }
}
```

Are formatted according to the **page language** and the following [options](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString):

```js
const timeOptions = {
  hour: '2-digit',
  minute: '2-digit',
};

// Time: 23:30 ("it") or 11:30 PM ("en")

const dateOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

// Date: 23 Nov 2020 ("it") or Nov 23, 2020 ("en")
```

Options can be edited in `src/functions/formatDateTime.js`.

There are two functions in the above mentioned file:

`formatDate(dateString, pageLocale)` - Returns `Jul 17, 2021` or `17 lug 2021` according to the page locale

`formatDateTime(dateString, pageLocale)` - Returns `Feb 10, 2022, 12:20 PM` or `10 feb 2022, 12:21`

### useFormattedDate hook

To quickly format the date coming from any DatoCMS / GraphQL field, import the hook:

```js
import { useFormattedDate } from '../hooks/useFormattedDate';
```

And use it:

```js
datoCmsBlogPost(originalId: { eq: $id }, locale: { eq: $locale }) {
  meta {
    updatedAt
  }
  ...

const { formattedDate } = useFormattedDate(data.datoCmsBlogPost.meta.updatedAt);

<time>{formattedDate}</time>
```

<br />

## Increase categories number displayed by the dropdown

If you want to increase the number of categories displayed by the dropdown, you can edit the file `src/components/Layout/Header/Full` and increase the `end` parameter of the `Array.prototype.slice()` of the following variable:

```js
const categoryNodesMatch = categoryNodes
  .filter(({ locale }) => locale === pageLocale)
  .slice(0, 6); // <-- Increase it
```

<br />

## SEO

Each template must be wrapped in the component named `<PageWrapper />` which accepts also three SEO-related props:

| prop             | type   | description                                                             |
| ---------------- | ------ | ----------------------------------------------------------------------- |
| `seoTitle`       | string | Accepts the title defined in the `seo` field on any content model       |
| `seoDescription` | string | Accepts the description defined in the `seo` field on any content model |
| `seoImage`       | string | Accepts the image url uploaded in the `seo` field on any content model  |

If the fields return undefined or you don't set the props at all, global SEO fields will be rendered.

```js
const HomePageTemplate = ({ data, pageContext }) => (
  <PageWrapper
    pageData={pageContext}
    seoTitle={data.datoCmsHomepage.seo?.title}
    seoDescription={data.datoCmsHomepage.seo?.description}
    seoImage={data.datoCmsHomepage.seo?.image?.url}
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

<br />

# Troubleshooting

## Navigator

![](https://i.ibb.co/Lp0bwzy/Schermata-2022-02-18-alle-17-31-44.png)

This error will appear whenever the Navigator component is trying to render a link to a record which has never been generated as page by gatsby-node.js for that locale.

If the error for example appears in: `localhost:8000/es/guia`, there's a problem with Navigator component inside that page in Spanish.

This can happen for many different reasons:

### General

- You are passing the `id` field and not `originalId` (with the alias `id`).
- You forgot to export the `originalId` field with the alias `id` to the pageContext object when generating pages.

### Structured Text

- You linked in a Structured Text field (on DatoCMS) a post/category which has been marked as non-translatable.
- You linked in a Structured Text a post whose category has been marked as non-translatable.
- You passed to the `renderLinkToRecord` StructuredText component prop the `originalId` of the StructuredText field itself.

Check the StructuredText field content on DatoCMS for that locale and make sure of it.

Also, always filter any post or category query, by excluding any record marked as non-translatable:

```js
query {
  allDatoCmsCategory(filter: { noTranslate: { ne: true } }) {
    categoryNodes: nodes {
      id: originalId
    }
  }
}
```

<br />

## GraphQL

```console
Cannot query field "datoCmsContactPage" on type ...
```

You can encounter this error both during build time and development.

What happened here is that you removed a field or content model on DatoCMS and forgot to remove any query or variable referring to it in the project files. Please check [this](#removing-fields) section on how to fix this issue.

<br />

# Issues

If you encounter any different issue or you have any kind of request, please open an issue or contact me via [email](smastrom@protonmail.com). I will be happy to help you as soon as I can.
