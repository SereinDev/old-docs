/// <reference path="MsgHelper.d.ts"/>
/// @ts-check

serein.setListener('onPluginsLoaded', () => {
    /** @type {regHandler} */
    const MHregHandler = serein.imports('MsgHelper.regHandler');
    if (!MHregHandler || typeof (MHregHandler) != 'function')
        throw new Error('你需要安装`MsgHelper.js`');

    serein.safeCall(MHregHandler, {
        name: '你好世界',            // 命令名称
        description: '一个模板',     // 介绍
        author: 'Zaitonn',          // 作者
        version: '0.0',             // 版本
        triggers: [
            {
                type: 'fullmatch',
                params: ['你好'],
                callback: callback
            }
        ]
    });
});

function callback(packetBody) {
    return `Hello World, ${packetBody.sender.card}`;
}