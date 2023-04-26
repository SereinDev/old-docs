/// <reference path="CommandHelper.d.ts"/>
/// <reference path="SereinJSPluginHelper/index.d.ts"/>
// @ts-check

// @ts-ignore
const File = System.IO.File;
const Directory = System.IO.Directory;
const BASEURL = 'https://v.api.aa1.cn/api/api-xiaoai/talk.php';
const logger = new Logger('AI聊天');

serein.registerPlugin('AI聊天', 'v1.0', 'Zaitonn', '提供并不聪明的ai聊天（x');
serein.setListener('onPluginsReload', () => httpClient?.Dispose());
serein.setListener('onReceiveGroupMessage', handle);
let
    httpClient,
    config = {
        useRecord: true,
        cooldownTime: 2000
    },
    date = Date.now();

/**
 * 初始化
 */
function init() {
    let success = true;
    try {
        const _config = read(`plugins/${serein.namespace}`, 'config.json', JSON.stringify(config, null, 2));
        if (!_config)
            throw new Error('配置文件已生成，请修改配置文件后启动');
        config = JSON.parse(_config);
    } catch (error) {
        logger.error(error);
        success = false;
    }

    try {
        httpClient = new System.Net.Http.HttpClient();
    } catch (error) {
        logger.error(error);
        serein.setPreLoadConfig(['System.Net.Http']);
        success = false;
    }

    if (!success)
        throw new Error('请重新加载此插件');
}

/**
 * get请求
 * @param {string} url 链接
 * @returns 文本
 */
function get(url) {
    return httpClient.GetAsync(url).GetAwaiter().GetResult().Content.ReadAsStringAsync().GetAwaiter().GetResult();
}

/**
 * 处理消息
 * @param {number} group_id 群号
 * @param {number} user_id 用户ID
 * @param {string} msg 消息
 * @param {string} shown_name 显示名称
 * @param {number} message_id 消息id
 */
function handle(group_id, user_id, msg, shown_name, message_id) {
    if (!serein.getSettingsObject().Bot.GroupList.includes(group_id) || !msg.toLocaleLowerCase().startsWith('ai ')) return;

    logger.info(`${shown_name}(${user_id}): ${msg}`);

    if (Date.now() - date < config.cooldownTime || 2000) {
        serein.sendGroup(group_id, `[CQ:reply,id=${message_id}]操作太快了……歇会吧:(`);
        return;
    }

    try {
        date = Date.now();
        const url = `${BASEURL}?msg=${encodeURI(msg.replace(/ai\s?/i, ''))}${config.useRecord ? '' : '&type=json'}`;
        const text = handleWithResponse(get(url), message_id);
        serein.sendGroup(group_id, text);
    } catch (e) {
        serein.sendGroup(group_id, `[CQ:reply,id=${message_id}]获取失败：\n${e.message}`);
        logger.error(e);
    }
}

/**
 * 读取文件
 * @param {string} directory 目录
 * @param {string} file 文件名
 * @param {string?} _default 默认值
 * @returns 读取内容
 */
function read(directory, file, _default) {
    if (!Directory.Exists(directory))
        Directory.CreateDirectory(directory);

    // @ts-expect-error
    if (!File.Exists(directory + '/' + file) && _default)
        // @ts-expect-error
        File.WriteAllText(directory + '/' + file, _default);

    else
        // @ts-expect-error
        return File.ReadAllText(directory + '/' + file);

    return undefined;
}

/**
 * 处理响应
 * @param {string} text 文本
 * @param {number} message_id 消息ID
 */
function handleWithResponse(text, message_id) {
    if (config.useRecord) {
        if (text)
            return `[CQ:reply,id=${message_id}]${text}`;
        else
            throw new Error('返回数据为空');

    } else {
        const { meta: { music: { musicUrl } } } = JSON.parse(text);
        if (musicUrl) {
            const _url = musicUrl.toString()
                .replace('&', '&amp;')
                .replace('[', '&#91;')
                .replace(']', '&#93;')
                .replace(',', '&#44;');
            return `[CQ:record,file=${_url}]`;
        } else
            throw new Error('返回数据为空');
    }
}

init();
