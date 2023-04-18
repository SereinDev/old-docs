/// <reference path="SereinJSPluginHelper/index.d.ts"/>
/// <reference path="CommandHelper.d.ts"/>
/// @ts-check

serein.registerPlugin('随机草图', 'v1.0', 'Zaitonn', '需要安装`CommandHelper.js`前置');

serein.setListener('onPluginsLoaded', () => {
    /** @type {CHregCommand} */
    const CHregCommand = serein.import('CHregCommand');
    if (!CHregCommand)
        throw new Error('你需要安装`CommandHelper.js`');

    CHregCommand({
        name: '随机草图',
        keywords: ['meme', '草图'],
        callback: callback,
        needAdmin: false,
        description: ['草草草草草草草草草草草草草草草草', '用法：发送“meme” | “草图”']
    });
});

function callback() {
    return '[CQ:image,file=https://oss.grass.starxw.com/service/image,cache=0]';
}