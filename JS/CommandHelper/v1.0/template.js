/// <reference path="CommandHelper.d.ts"/>

serein.setListener('onPluginsLoaded', () => {
    /** @type {CHregCommand} */
    const CHregCommand = serein.import('CHregCommand');
    if (!CHregCommand)
        throw new Error('你需要安装`CommandHelper.js`');

    CHregCommand({
        name: '你好世界',     // 命令名称
        keywords: ['test'],       // 触发关键词
        callback: callback,       // 回调函数
        needAdmin: false,          // 是否需要管理权限
        description: ['一个模板']    // 以string[]储存，一行一条
    });
});

function callback() {
    return 'Hello World';
}