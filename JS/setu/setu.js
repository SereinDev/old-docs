/// <reference path="SereinJSPluginHelper/index.d.ts"/>
/// <reference path="CommandHelper.d.ts"/>

serein.registerPlugin('随机二次元图片', 'v1.0', 'Zaitonn', '需要安装`CommandHelper.js`前置');

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
    /** @type {CHregCommand} */
    const CHregCommand = serein.import('CHregCommand');
    if (!CHregCommand)
        throw new Error('你需要安装`CommandHelper.js`');

    CHregCommand({
        name: '随机二次元图片',
        keywords: ['色图', '涩图'],
        callback: callback,
        needAdmin: false,
        description: ['随机返回一张二次元图片捏♡♡', '用法：发送“涩图” | “色图”'],
        author: 'Zaitonn',
        version: 'v1.0'
    });
});


function callback() {
    return `[CQ:image,file=${apis[apiIndex] || apis[Math.floor(Math.random() * apis.length)]},cache=0]`;
}