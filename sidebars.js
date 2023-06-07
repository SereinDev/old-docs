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
      collapsible: false,
      items: [
        {
          type: 'category',
          label: '📚 类',
          link: {
            type: 'doc',
            id: 'development/class'
          },
          items: [
            'development/class/Logger',
            'development/class/MessageBus',
            'development/class/WSClient',
            'development/class/Motd',
          ]
        },
        'development/properties',
        {
          type: 'category',
          label: '🗿 函数',
          link: {
            type: 'doc',
            id: 'development/function'
          },
          items: [
            'development/function/serein',
            'development/function/regex',
            'development/function/system',
            'development/function/server',
            'development/function/msg',
            'development/function/binder',
            'development/function/import',
            'development/function/module',
          ]
        },
        'development/permissionGroup',
        'development/preLoadConfig',
        {
          type: 'category',
          label: '🎲 Net程序集及示例',
          link: {
            type: 'doc',
            id: 'development/assembly',
          },
          items: [
            'development/assembly/System.Diagnostics',
            'development/assembly/System.IO',
            {
              type: 'category',
              label: '🌰 System.Net.Http',
              link: {
                type: 'doc',
                id: 'development/assembly/System.Net.Http'
              },
              items: [
                'development/assembly/System.Net.Http.HttpClient',
                'development/assembly/System.Net.Http.HttpContent',
                'development/assembly/System.Net.Http.HttpRequestMessage',
                'development/assembly/System.Net.Http.HttpResponseMessage',
              ]
            }
          ]
        }
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
        'tutorial/matchWithMuiltLine',
        'tutorial/hiddenSettings',
        'tutorial/debugMode',
      ]
    },
  ],

  versionSidebar: [
    {
      type: 'category',
      label: '🔔 版本记录',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'version/category'
      },
      items: [
        'version/v1.3.4.2',
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
