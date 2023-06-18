/// <reference path="SereinJSPluginHelper/index.d.ts"/>
/// <reference path="MsgHelper.d.ts"/>
/// @ts-check

const VERSION = 'v1.1';
serein.registerPlugin('随机草图', VERSION, 'Zaitonn', '需要安装`MsgHelper.js`前置');

serein.setListener('onPluginsLoaded', () => {
    /** @type {regHandler} */
    const MHregHandler = serein.imports('MsgHelper.regHandler');
    if (!MHregHandler || typeof (MHregHandler) != 'function')
        throw new Error('你需要安装`MsgHelper.js`');

    serein.safeCall(MHregHandler, {
        name: '随机草图',
        descriptions: ['草草草草草草草草草草草草草草草草', '用法：发送“meme” | “草图”'],
        author: 'Zaitonn',
        version: VERSION,
        triggers: [
            {
                type: 'fullmatch',
                params: ['meme', '草图'],
                callback: callback
            }
        ]
    });
});

function callback() {
    return '[CQ:image,file=https://oss.grass.starxw.com/service/image,cache=0]';
}