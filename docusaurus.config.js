// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'NextAuth.js 한국어 문서',
  tagline: 'NextAuth.js 문서를 한국어로 번역한 사이트입니다',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://nextauth-ko.wsbox.pw',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'banggae', // Usually your GitHub org/user name.
  projectName: 'nextauth_ko_trans', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
    localeConfigs: {
      ko: {
        label: '한국어',
        direction: 'ltr',
        htmlLang: 'ko',
        calendar: 'gregory',
        path: 'ko'
      }
    }
  },
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars_doc.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        gtag: {
          trackingID: 'G-KK3KW5HBE7',
          anonymizeIP: true,
        },
      }),
      
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      // image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'NextAuth.js - Korean',
        // logo: {
        //   alt: 'My Site Logo',
        //   src: 'img/logo.svg',
        // },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'documentSidebar',
            position: 'left',
            label: '문서',
          },
          {
            type: 'doc',
            position: 'left',
            docId: 'faq',
            label: 'FAQ',
          },
          // {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://next-auth.js.org/',
            label: 'NextAuth.js 홈페이지',
            position: 'left',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '문서 목록',
            items: [
              {
                label: '문서',
                to: '/getting-started/introduction',
              },
            ],
          },
          {
            title: '바깥 글',
            items: [
              {
                label: 'NextAuth.js 공식문서',
                href: 'https://next-auth.js.org',
              },
            ],
          },
        ],
        copyright: '본 사이트는 NextAuth.js 라이브러리의 공식 문서를 한국어로 번역한 비공식 사이트입니다.'
        // copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        additionalLanguages: ['bash', 'diff'],
        theme: prismThemes.vsDark,
        darkTheme: prismThemes.vsDark,
      },
    }),
};

export default config;
