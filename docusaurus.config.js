// @ts-check

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Serein扩展市场',
  tagline: '在这里你可以找到你喜欢的插件',
  favicon: 'img/Serein.ico',

  url: 'http://market.serein.cc',
  baseUrl: '/',

  organizationName: 'Zaitonn',
  projectName: 'Serein-Docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/Zaitonn/Serein-Docs/edit/market/',
        },

        blog: {
          path: 'resources',
          showReadingTime: false,
          blogSidebarCount: 'ALL',
          routeBasePath: 'resources',
          blogSidebarTitle: '所有资源',
          blogTitle: '资源',
          blogDescription: 'Serein的扩展市场资源',
        },

        theme: {
          customCss: [
            require.resolve('./src/css/custom.css'),
          ],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/Serein.jpg',
      navbar: {
        title: 'Serein Market',
        logo: {
          alt: 'Logo',
          src: 'img/Serein.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: '教程',
          },
          {
            to: '/resources',
            label: '资源',
            position: 'left'
          }
        ],
      },
      footer: {
        style: 'light',
        links: [
          {
            title: 'Serein',
            items: [
              {
                label: '主站',
                to: 'https://serein.cc/'
              },
              {
                label: '在线统计',
                to: 'https://online-count.serein.cc/'
              },
              {
                label: '问卷调查',
                to: 'https://wj.qq.com/s2/11559426/5a2e/'
              }
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '仓库（软件）',
                href: 'https://github.com/Zaitonn/Serein',
              },
              {
                label: '仓库（文档）',
                href: 'https://github.com/Zaitonn/Serein-Docs',
              },
              {
                label: '最新版下载',
                href: 'https://github.com/Zaitonn/Serein/releases/latest',
              },
            ],
          },
          {
            title: '发布',
            items: [
              {
                label: 'MineBBS',
                href: 'https://www.minebbs.com/resources/serein.4169/',
              },
              {
                label: 'MCBBS',
                href: 'https://www.mcbbs.net/thread-1424853-1-1.html',
              },
            ],
          },
        ],
        copyright: 'Copyright © 2022 Zaitonn. All Rights Reserved.',
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },
  themes: [
    [
      "@easyops-cn/docusaurus-search-local",
      ({
        hashed: true,
        language: ["zh"],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      }),
    ],
  ],
};

module.exports = config;
