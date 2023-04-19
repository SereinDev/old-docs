/// <reference path="SereinJSPluginHelper/index.d.ts"/>
/// <reference path="CommandHelper.d.ts"/>
/// @ts-check

serein.registerPlugin('一言', 'v1.0', 'Zaitonn', '需要安装`CommandHelper.js`前置');

/** @type {CHregCommand} */
let CHregCommand,
    httpClient;
init();

serein.setListener('onPluginsReload', () => httpClient.Dispose());
serein.setListener('onPluginsLoaded', () => {
    CHregCommand = serein.import('CHregCommand');
    if (!CHregCommand)
        throw new Error('你需要安装`CommandHelper.js`');

    CHregCommand({
        name: '一言',
        keywords: ['一言'],
        callback: oneword,
        needAdmin: false,
        description: ['发送“一言”随机回复一句话', 'api源：Hitokoto（https://v1.hitokoto.cn）'],
        author: 'Zaitonn',
        version: 'v1.0'
    });
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

function oneword() {
    return JSON.parse(get('https://v1.hitokoto.cn/')).hitokoto
}

/**
 * get请求
 * @param {string} url 链接
 */
function get(url) {
    return httpClient.GetAsync(url).GetAwaiter().GetResult().Content.ReadAsStringAsync().GetAwaiter().GetResult();
}