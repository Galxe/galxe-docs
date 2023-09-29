// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const DefaultLocale = "en";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Galxe Docs",
  tagline:
    "Here you'll find guides, resources, and references you can use to onboard and build with Galxe",
  url: "https://docs.galxe.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "GalxeHQ",
  projectName: "galxe-docs",

  // i18n: {
  //   defaultLocale: DefaultLocale,
  //   locales: ["en", "zh-CN"],
  // },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/", // Serve the docs at the site's root
          path: "doc-overview",
          id: "default",
          sidebarPath: require.resolve("./sidebars.js"),
          sidebarCollapsible: true,
          editUrl: ({ locale, versionDocsDirPath, docPath }) => {
            // Link to Crowdin for non-English docs
            if (locale !== DefaultLocale) {
              return `https://crowdin.com/project/docs_galxe_eco/${locale}`;
            }
            // Link to GitHub for English docs
            return `https://github.com/GalxeHQ/galxe-docs/tree/main/doc-overview/${docPath}`;
          },
          showLastUpdateAuthor: false,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-DF3J2WE6KR",
          anonymizeIP: true,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // SEO
      image: "static/img/meta-bg.jpg",
      metadata: [
        { name: "title", content: "Galxe Docs" },
        {
          name: "description",
          content:
            "Here you'll find guides, resources, and references you can use to onboard and build with Galxe.",
        },
        { name: "language", content: "English" },
        { name: "twitter:card", content: "summary" },
        { name: "twitter:site", content: "@GalxeHQ" },
        { name: "twitter:creator", content: "@oyyblin" },
        {
          property: "og:url",
          content: "https://docs.galxe.com/",
        },
        {
          property: "og:title",
          content: "Galxe Docs",
        },
        {
          property: "og:description",
          content:
            "Here you'll find guides, resources, and references you can use to onboard and build with Galxe.",
        },
        {
          property: "og:image",
          content: "static/img/meta-bg.jpg",
        },
      ],
      colorMode: {
        defaultMode: "light",
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      // announcementBar: {
      //   content:
      //     "🌟 ERC20 Token Address: 0x5fAa989Af96Af85384b8a938c2EdE4A7378D9875 🌟",
      // },
      navbar: {
        logo: {
          src: "img/logo-light.svg",
          srcDark: "img/logo-dark.svg",
          width: 110,
        },
        items: [
          {
            type: "doc",
            docId: "into-the-galxe/overview",
            label: "Overview",
            position: "left",
          },
          {
            type: "doc",
            docId: "getting-started/introduction",
            docsPluginId: "developer",
            label: "Developer",
            position: "left",
          },
          {
            label: "Help Center",
            href: "https://help.galxe.com",
            position: "right",
          },
          {
            href: "https://galxe.com",
            label: "App",
            position: "right",
          },
          {
            href: "https://gal.xyz/support",
            label: "Contact Support",
            position: "right",
          },
          // {
          //   type: "localeDropdown",
          //   position: "right",
          // },
        ],
      },
      footer: {
        links: [
          {
            title: "Governance",
            items: [
              {
                label: "Forum",
                href: "https://forum.galxe.com/",
              },
              {
                label: "Proposals",
                href: "https://forum.galxe.com/c/proposals/5",
              },
              {
                label: "Vote",
                href: "https://vote.galxe.com/",
              },
            ],
          },
          {
            title: "Developer",
            items: [
              {
                label: "Github",
                href: "https://github.com/Galxe",
              },
              {
                label: "Developer Docs",
                to: "developer/",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://discord.gg/galxe",
              },
              {
                label: "Twitter",
                href:
                  "https://twitter.com/intent/follow?screen_name=GalxeHQ",
              },
            ],
          },
          {
            title: "Resources",
            items: [
              {
                label: "Docs",
                href: "/",
              },
              {
                label: "Guides",
                href: "https://help.galxe.com",
              },
              {
                label: "Blog",
                href: "https://blog.galxe.com/",
              },
              {
                label: "Newsletter",
                href: "http://newsletter.galxe.com/",
              },
            ],
          },
          {
            title: "About Us",
            items: [
              {
                label: "App",
                href: "https://galxe.com/",
              },
              {
                label: "Brand Assets",
                href: "https://gal.xyz/brand",
              },
              {
                label: "Contact Support",
                href: "https://gal.xyz/support",
              },
            ],
          },
        ],
        copyright: `© ${new Date().getFullYear()} Galxe`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      // docusaurus-plugin-image-zoom
      zoom: {
        selector: ".markdown :not(em) > img",
        config: {
          background: {
            light: "rgb(255, 255, 255)",
            dark: "rgb(50, 50, 50)",
          },
        },
      },
    }),

  plugins: [
    [
      "@edno/docusaurus2-graphql-doc-generator",
      {
        schema: "https://graphigo.prd.galaxy.eco/query",
        // docs will be generated under rootPath/baseURL
        rootPath: "./doc-developer/6-graphql-api",
        baseURL: "references",
        // needed because we use 6-graphql-api with alias graphql-api
        linkRoot: "../..",
        loaders: {
          UrlLoader: "@graphql-tools/url-loader",
        },
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "developer",
        path: "doc-developer",
        routeBasePath: "developer",
        sidebarPath: require.resolve("./sidebars.js"),
        sidebarCollapsible: true,
        editUrl: ({ locale, versionDocsDirPath, docPath }) => {
          // Link to Crowdin for non-English docs
          if (locale !== DefaultLocale) {
            return `https://crowdin.com/project/docs_galaxy_eco/${locale}`;
          }
          // Link to GitHub for English docs
          return `https://github.com/GalxeHQ/galxe-docs/tree/main/doc-developer/${docPath}`;
        },
        showLastUpdateAuthor: false,
        showLastUpdateTime: true,
      },
    ],
    require.resolve("docusaurus-plugin-image-zoom"),
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // `hashed` is recommended as long-term-cache of index file is possible.
        indexDocs: true,
        indexBlog: false,
        hashed: true,
        docsRouteBasePath: "/",
        docsDir: "doc-developer",
      },
    ],
  ],
};

module.exports = config;
