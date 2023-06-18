// @ts-check

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Serein扩展市场',
  tagline: '在这里你可以找到你喜欢的插件',
  favicon: 'img/Serein_Extension.ico',

  url: 'http://market.serein.cc',
  baseUrl: '/',

  organizationName: 'Zaitonn',
  projectName: 'Serein-Docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  markdown: {
    mermaid: true,
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/Zaitonn/Serein-Docs/edit/market/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },

        blog: {
          path: 'resources',
          showReadingTime: false,
          blogSidebarCount: 'ALL',
          postsPerPage: 'ALL',
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
      image: 'img/Serein_Extension.png',
      navbar: {
        title: 'Serein Market',
        logo: {
          alt: 'Logo',
          src: 'img/Serein_Extension.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            label: '🧾公告',
          },
          {
            to: '/resources',
            label: '🗃资源',
          },
          {
            to: '/docs/publish',
            label: '💡发布',
            position: 'right'
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
                to: 'https://github.com/Zaitonn/Serein',
              },
              {
                label: '仓库（文档）',
                to: 'https://github.com/Zaitonn/Serein-Docs',
              },
              {
                href: 'https://jq.qq.com/?_wv=1027&amp;k=XNZqPSPv',
                label: '交流群',
              }
            ],
          },
          {
            title: '发布',
            items: [
              {
                label: 'GitHub',
                to: 'https://github.com/Zaitonn/Serein/releases/latest',
              },
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
      metadata: [
        {
          name: 'keywords',
          content: '面板, 服务器, 我的世界, Minecraft, BDS, Java, 基岩版, 开服, 机器人, 简单, 易用'
        }],
    }),

  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  themes: [
    '@docusaurus/theme-mermaid',
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      ({
        hashed: true,
        language: ["en", "zh"],
        blogRouteBasePath: '/resources'
      }),
    ],
  ]
};

module.exports = config;
