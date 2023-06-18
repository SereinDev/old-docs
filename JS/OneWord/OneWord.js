/// <reference path="SereinJSPluginHelper/index.d.ts"/>
/// <reference path="MsgHelper.d.ts"/>
/// @ts-check

serein.registerPlugin('一言', 'v1.1', 'Zaitonn', '需要安装`MsgHelper.js`前置');

let httpClient;
init();

serein.setListener('onPluginsReload', () => httpClient.Dispose());
serein.setListener('onPluginsLoaded', () => {
    /** @type {regHandler} */
    const MHregHandler = serein.imports('MsgHelper.regHandler');
    if (!MHregHandler || typeof (MHregHandler) != 'function')
        throw new Error('你需要安装`MsgHelper.js`');

    serein.safeCall(MHregHandler,
        {
            name: '一言',
            descriptions: ['发送“一言”随机回复一句话', 'api源：Hitokoto'],
            author: 'Zaitonn',
            version: 'v1.1',
            triggers: [
                {
                    type: 'fullmatch',
                    params: ['一言'],
                    callback: oneword
                }
            ]
        });
});

function init() {
    try {
        httpClient = new System.Net.Http.HttpClient();
    } catch (error) {
        serein.log(error);
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