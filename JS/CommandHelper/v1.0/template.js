serein.setListener('onPluginsLoaded', () => {
    const CHregCommand = serein.import('CHregCommand');
    if (!CHregCommand)
        throw new Error('你需要安装`CommandHelper.js`');

    CHregCommand(
        '你好世界',     // 命令名称
        ['test'],       // 触发关键词
        callback,       // 回调函数
        false,          // 是否需要管理权限
        ['一个模板']    // 以string[]储存，一行一条
    );
});

function callback() {
    return 'Hello World';
}