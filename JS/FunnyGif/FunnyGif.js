/// <reference path="SereinJSPluginHelper/index.d.ts"/>
/// <reference path="CommandHelper.d.ts"/>
/// @ts-check
'use strict';
serein.registerPlugin('GIF生成', 'v1.0', 'Zaitonn', '需要安装`CommandHelper.js`前置');
serein.setListener('onPluginsLoaded', () => {
    // @ts-expect-error
    const CHregCommand = serein.import('CHregCommand');
    if (!CHregCommand)
        throw new Error('你需要安装`CommandHelper.js`');
    CHregCommand({
        name: 'GIF生成',
        keywords: ['gif', 'GIF', 'Gif'],
        callback: handle,
        needAdmin: false,
        description: ['生成一点乱七八糟的GIF图（误', '用法：发送“gif <图片名> [QQ]” 或 “gif 帮助”'],
        author: 'Zaitonn',
        version: 'v1.0'
    });
});
const MENU = `GIF生成·帮助菜单
◽ 帮助
  显示此菜单
◽ 图片生成
  用法：“gif <图片名> [QQ]”
  其中QQ参数支持使用@或直接填写，不填则默认为发送者QQ 
◽ 图片名列表
  结婚；吃；咬；需要Ta；高质量；拍；摸；顶；捣；吸；看；感动哭了；膜拜；咸鱼
`;
const URLS = {
    结婚: 'https://api.iculture.cc/api/face_propose/',
    吃: 'https://api.iculture.cc/api/chi/',
    咬: 'https://api.iculture.cc/api/face_bite/',
    需要ta: 'https://api.iculture.cc/api/face_need/',
    高质量: 'https://api.iculture.cc/api/face_gao/',
    拍: 'https://api.iculture.cc/api/face_pat/',
    摸: 'https://api.iculture.cc/api/face_petpet/',
    顶: 'https://api.iculture.cc/api/face_play/',
    捣: 'https://api.iculture.cc/api/face_pound/',
    吸: 'https://api.iculture.cc/api/face_suck/',
    看: 'https://api.iculture.cc/api/face_thsee/',
    感动哭了: 'https://api.iculture.cc/api/face_touch/',
    膜拜: 'https://api.iculture.cc/api/face_worship/',
    咸鱼: 'https://api.iculture.cc/api/face_yu/'
};
const IDREGEX = /\[CQ:at,qq=(\d+)\]/;
const logger = new Logger('FunnyGif');
/**
 * 处理消息
 */
function handle({ user_id, message, message_id }) {
    const args = message.split(' ').slice(1);
    if (args.length === 0)
        return getReplyText('参数错误.\n请使用“gif 帮助”获取更多信息', message_id);
    let targetId = '';
    if (args.length >= 2) {
        const result = getId(args[1]);
        if (!result[0])
            return getReplyText(result[1], message_id);
        targetId = result[1];
    }
    else
        targetId = user_id.toString();
    try {
        switch (args[0]) {
            case '帮助':
                return getReplyText(MENU, message_id);
            default:
                return getCQImage(args[0], targetId);
        }
    }
    catch (error) {
        logger.error(`生成图片${args[0]}时错误\n${error}`);
        return error.message;
    }
}
/**
 * 回复文本生成
 * @returns 回复文本
 */
function getReplyText(message, message_id) {
    return `[CQ:reply,id=${message_id}]${message}`;
}
/**
 * 获取ID
 */
function getId(arg) {
    if (/^\d+$/.test(arg))
        return [true, arg];
    if (IDREGEX.test(arg)) {
        const result = IDREGEX.exec(arg)?.[1];
        if (!result)
            return [false, '艾特CQ语句解析异常'];
        return [true, result];
    }
    return [false, 'ID错误'];
}
/**
 * 获取CQ图片
 */
function getCQImage(type, id) {
    const url = URLS[type.toLocaleLowerCase()];
    if (!url)
        return '指定的图片类型不存在';
    return `[CQ:image,file=${url}?QQ=${id}]`;
}
