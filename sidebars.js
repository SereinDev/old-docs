// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: '公告',
      collapsible: false,
      items: [
        'notice',
        'publish'
      ]
    }
  ],
};

module.exports = sidebars;
