/// <reference path="SereinJSPluginHelper/index.d.ts"/>
/// <reference path="MsgHelper.d.ts"/>
/// @ts-check

serein.registerPlugin('随机二次元图片', 'v1.1', 'Zaitonn', '需要安装`MsgHelper.js`前置');

/**
 * api索引
 * 设置为非数的值时将从下方的列表中随机抽取
 */
const apiIndex = undefined;

const apis = [
    'https://img.xjh.me/random_img.php?return=302',
    'http://www.98qy.com/sjbz/api.php',
    'https://api.btstu.cn/sjbz/api.php?lx=dongman&format=images',
    'https://api.paugram.com/wallpaper/',
    'https://service-5z0sdahv-1306777571.sh.apigw.tencentcs.com/release/',
    'https://api.r10086.com/img-api.php?type=%E5%8A%A8%E6%BC%AB%E7%BB%BC%E5%90%881',
    'https://api.oick.cn/random/api.php'
];

serein.setListener('onPluginsLoaded', () => {
    /** @type {regHandler} */
    const MHregHandler = serein.imports('MsgHelper.regHandler');
    if (!MHregHandler)
        throw new Error('你需要安装`MsgHelper.js`');

    serein.safeCall(MHregHandler, {
        name: '随机二次元图片',
        descriptions: ['随机返回一张二次元图片捏♡♡', '用法：发送“涩图” | “色图”'],
        author: 'Zaitonn',
        version: 'v1.0',
        triggers: [
            {
                type: 'fullmatch',
                params: ['涩图', '色图'],
                callback: callback
            }
        ]
    });
});


function callback() {
    // @ts-ignore
    return `[CQ:image,file=${apis[apiIndex] || apis[Math.floor(Math.random() * apis.length)]},cache=0]`;
}