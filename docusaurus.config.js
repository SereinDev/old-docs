// @ts-check

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Serein',
  tagline: '新时代极简服务器面板',
  favicon: 'img/Serein.ico',

  url: 'https://serein.cc',
  baseUrl: '/',

  organizationName: 'Zaitonn',
  projectName: 'Serein',

  onBrokenLinks: 'warn',
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
          editUrl: 'https://github.com/Zaitonn/Serein-Docs/edit/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true
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
      announcementBar: {
        content: '如果你觉得Serein好用的话，别忘了<a href="https://github.com/Zaitonn/Serein" style="color: var(--ifm-link-color); text-decoration: var(--ifm-link-decoration);">给个Star⭐</a> :D',
        textColor: 'var(--ifm-color-primary-contrast-foreground)',
        backgroundColor: 'var(--ifm-background-surface-color)',
      },
      image: 'img/Serein.jpg',
      navbar: {
        hideOnScroll: true,
        title: 'Serein',
        logo: {
          alt: 'Logo',
          src: 'img/Serein.png',
        },
        items: [
          {
            type: 'dropdown',
            label: '📔目录',
            items: [
              {
                type: 'docSidebar',
                sidebarId: 'docs',
                label: '介绍',
              },
              {
                type: 'docSidebar',
                sidebarId: 'tutorialSidebar',
                label: '教程',
              },
              {
                type: 'docSidebar',
                sidebarId: 'developmentSidebar',
                label: '插件开发',
              },
              {
                type: 'docSidebar',
                sidebarId: 'versionSidebar',
                label: '版本记录',
              },
              {
                label: '在线统计',
                href: '/onlineCount'
              },
              {
                type: 'docSidebar',
                sidebarId: 'moreSidebar',
                label: '更多',
              }
            ],
          },
          {
            label: '📝留言板',
            to: 'messageBoard'
          },
          {
            label: '💖捐赠',
            to: '/docs/more/donate'
          },
          {
            label: '🏬扩展市场',
            to: 'https://market.serein.cc/'
          },
          {
            label: '🗃版本',
            position: 'right',
            items: [
              {
                label: '正式版（发布版）',
                href: 'https://serein.cc/'
              },
              {
                label: '上古文档（v1.3.3之前）',
                href: 'https://legacy.serein.cc/'
              },
              {
                label: '船新文档（预览版）',
                href: 'https://preview.serein.cc/'
              }
            ]
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
                label: '扩展市场',
                to: 'https://market.serein.cc/'
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
        additionalLanguages: ['csharp', 'batch', 'powershell', 'typescript', 'regex', 'batch']
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
      }),
    ],
  ]
};

module.exports = config;
