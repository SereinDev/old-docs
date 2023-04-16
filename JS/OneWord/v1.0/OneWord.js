/// <reference path="SereinJSPluginHelper/index.d.ts"/>
/// @ts-check

serein.registerPlugin('一言', 'v1.0', 'Zaitonn', '');

let CHregCommand, httpClient;
init();

serein.setListener('onPluginsReload', () => httpClient.Dispose());
serein.setListener('onPluginsLoaded', () => {
    CHregCommand = serein.import('CHregCommand');
    if (!CHregCommand)
        throw new Error('你需要安装`CommandHelper.js`');

    CHregCommand('一言', ['一言'], callback, false, ['随机回复一句话', '动漫也好、小说也好、网络也好，不论在哪里，我们总会看到有那么一两个句子能穿透你的心。我们把这些句子汇聚起来，形成一言网络，以传递更多的感动。如果可以，我们希望我们没有停止服务的那一天。', '简单来说，一言指的就是一句话，可以是动漫中的台词，也可以是网络上的各种小段子。 或是感动，或是开心，有或是单纯的回忆。来到这里，留下你所喜欢的那一句句话，与大家分享，这就是一言存在的目的。', 'api源：Hitokoto（https://v1.hitokoto.cn）']);
});

function init() {
    try {
        httpClient = new System.Net.Http.HttpClient();
    } catch (error) {
        serein.log(error)
        serein.setPreLoadConfig(['System.Net.Http']);
        throw new Error('请重新加载此插件');
    }
}

function callback() {
    return JSON.parse(get('https://v1.hitokoto.cn/')).hitokoto
}

/**
 * get请求
 * @param {string} url 链接
 */
function get(url) {
    return httpClient.GetAsync(url).GetAwaiter().GetResult().Content.ReadAsStringAsync().GetAwaiter().GetResult();
}