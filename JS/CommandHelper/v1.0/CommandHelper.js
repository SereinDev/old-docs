/// <reference path="SereinJSPluginHelper/index.d.ts"/>
/// @ts-check

const commands = [];
const prefix = '';
const logger = new Logger('ReplyHelper');

serein.registerPlugin('命令助手', 'v1.0', 'Zaitonn', '提供快捷的命令注册功能');
serein.export('CHregCommand', regCommand);
serein.setListener('onReceiveGroupMessage', handleMsg);
regCommand('帮助', ['help', '帮助'], getHelpText, false, ['显示所有命令及其介绍', '用法：发送 “帮助” | “help”']);

/**
 * 注册命令
 * @param {string} name 名称
 * @param {string[]} keywords 触发关键词
 * @param {Function} callback 回调函数
 * @param {boolean?} needAdmin 需要管理员权限
 * @param {string[]?} description 介绍
 */
function regCommand(name, keywords, callback, needAdmin, description) {
    if (!name || typeof (name) !== 'string')
        logger.error('`name`错误');

    else if (typeof (keywords) !== 'object')
        logger.error(name + '的`keywords`类型错误');

    else if (typeof (callback) !== 'function')
        logger.error(name + '的`callback`类型错误');

    else {
        needAdmin = needAdmin || false;
        description = description || [];
        commands.push({
            name,
            keywords,
            callback,
            needAdmin,
            description
        });
        logger.info(`命令[${name}]注册成功. \n   需要管理员权限：${needAdmin ? '是' : '否'}${description ? '\n   ' : ''}${description?.join('\n   ')}`);
        return true;
    }
    logger.warn(`命令[${name}]注册失败.`);
    return false;
}

/**
 * 获取帮助信息
 */
function getHelpText() {
    let text = '';
    commands.forEach((command) => {
        text +=
            `◉ ${command.name}\n   需要管理员权限：${command.needAdmin ? '是' : '否'}\n   ${command.description?.join('\n   ')}\n`;
    });
    return text;
}

/**
 * 处理消息
 * @param {number} group_id 
 * @param {number} user_id 
 * @param {string} msg 
 * @param {string} shownName 
 */
function handleMsg(group_id, user_id, msg, shownName) {
    if (!serein.getSettingsObject().Bot.GroupList.Contains(group_id) ||
        !msg ||
        (prefix && !msg.startsWith(prefix)))
        return;

    const isAdmin = hasPermission(user_id);
    const keyword = msg.replace(new RegExp(`^${prefix}`), '').trim().split(' ')[0];

    for (const command of commands) {
        if (command.needAdmin && !isAdmin || !command.keywords.includes(keyword))
            continue;

        const reply = command.callback(group_id, user_id, msg, shownName);
        if (reply)
            serein.sendGroup(group_id, reply);
    }
};

/**
 * 是否有权限
 * @param {number} userID 
 */
function hasPermission(userID) {
    return serein.getSettingsObject().Bot.PermissionList.Contains(userID) >= 0;
}
