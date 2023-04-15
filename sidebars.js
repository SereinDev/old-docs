// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  developmentSidebar: [
    {
      type: 'category',
      label: '⛏ 插件开发',
      link: {
        type: 'doc',
        id: 'development/intro'
      },
      items: [
        'development/class',
        'development/properties',
        {
          type: 'category',
          label: '🗿 函数',
          collapsible: false,
          link: {
            type: 'generated-index',
            title: '函数大全',
            description:
              ' ',
          },
          items: [
            'development/function/serein',
            'development/function/system',
            'development/function/server',
            'development/function/msg',
            'development/function/binder',
            'development/function/import',
            'development/function/module',
          ]
        },
        'development/preLoadConfig',
        'development/assembly',
      ]
    }
  ],

  docs: [
    'intro',
    {
      type: 'category',
      label: '📻 功能',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'guide/intro'
      },
      items: [
        'guide/command',
        'guide/regex',
        'guide/schedule',
        'guide/variables',
        'guide/plugin',
        'guide/member',
        'guide/bot',
        'guide/event',
      ]
    },
  ],

  tutorialSidebar: [
    {
      type: 'category',
      label: '📁 基础',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'tutorial/juniorIntro'
      },
      items: [
        'tutorial/install',
        'tutorial/differenceBetweenVersions',
        'tutorial/setupArgs',
        'tutorial/configBot',
        'tutorial/runServer',
        'tutorial/manageServerPlugins',
        'tutorial/qa',
      ]
    },

    {
      type: 'category',
      label: '💼 进阶',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'tutorial/advancedIntro'
      },
      items: [
        'tutorial/autoRunOnStarted',
        'tutorial/customConsole',
        'tutorial/customRegex',
        'tutorial/muiltLineMatch',
        'tutorial/debugMode',
        'tutorial/developmentTool',
      ]
    },
  ],

  versionSidebar: [
    {
      type: 'category',
      label: '🔔 版本',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'version/category'
      },
      items: [
        'version/v1.3.4.1',
        'version/v1.3.4',
        'version/v1.3.3',
        'version/v1.3.2.1',
        'version/v1.3.2',
        'version/v1.3.1',
        {
          type: 'link',
          href: 'https://github.com/Zaitonn/Serein/releases',
          label: '远古版本'
        }
      ]
    },

  ],

  moreSidebar: [
    'more/structure',
    'more/status',
    'more/donate',
    'more/about',
    'more/agreement',
  ]
};

module.exports = sidebars;
