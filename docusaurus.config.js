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
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },

        blog: {
          showReadingTime: false,
          blogSidebarCount: 'ALL',
          routeBasePath: 'resources',
          blogSidebarTitle: '所有资源',
          blogTitle: '资源',
          blogDescription: 'Serein的扩展市场资源',
        },

        theme: {
          customCss: require.resolve('./src/css/custom.css'),
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
          },
          {
            href: 'https://github.com/Zaitonn/Serein',
            label: 'GitHub',
            position: 'right',
          },
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
              }
            ],
          },
          {
            title: '更多',
            items: [
              {
                label: '仓库',
                href: 'https://github.com/Zaitonn/Serein',
              },
              {
                label: '下载',
                href: 'https://github.com/Zaitonn/Serein/releases/latest',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Zaitonn. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
