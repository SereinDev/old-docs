/// <reference path='SereinJSPluginHelper/index.d.ts'/>
/// @ts-check

serein.registerPlugin('敏感词检测', 'v1.0', 'Zaitonn', '自动撤回、屏蔽');
serein.setListener('onReceiveGroupMessage', handle);

// @ts-ignore
const File = System.IO.File;
const Directory = System.IO.Directory;
const SearchOption = System.IO.SearchOption;
const logger = new Logger('敏感词检测');
const scores = {};
let wordsList = [];
const config = {
    add: 1,
    minus: 0.02,
    punishLimit: 5
};

/**
 * 初始化
 */
function init() {
    if (Directory.Exists('plugins/sensitiveWordCheck')) {
        /** @type {string[]} */
        const files = Directory.GetFiles('plugins/sensitiveWordCheck', '*.txt', SearchOption.TopDirectoryOnly);
        for (const file of files) {
            wordsList = wordsList.concat(
                // @ts-ignore
                File.ReadAllText(file).split(System.Environment.NewLine)
            );
        }
        if (files.length && wordsList.length)
            logger.info(`已加载${wordsList.length}个敏感词`)
        else
            logger.warn('敏感词词库为空');
    } else {
        Directory.CreateDirectory('plugins/sensitiveWordCheck');
        logger.warn('未找到有效的敏感词词库文件夹，已重新创建');
    }
    logger.info('加载完毕！更多信息请访问 https://market.serein.cc/resources/sensitiveWordCheck')
}

/**
 * 检测是否敏感
 * @param {string} text 文本
 * @returns 是否敏感
 */
function checkSensitiveWord(text) {
    if (typeof (text) === 'string') {
        for (const word of wordsList) {
            const index = text.indexOf(word);
            if (word && index >= 0)
                return [index, word];
        }
    }
    return [-1, null];
}

/**
 * 处理消息
 * @param {number} group_id 群号
 * @param {number} user_id 用户ID
 * @param {string} msg 消息
 * @param {string} shown_name 显示名称
 * @param {number} message_id 消息id
 * @returns {boolean|void}
 */
function handle(group_id, user_id, msg, shown_name, message_id) {
    if (!serein.getSettingsObject().Bot.GroupList.Contains(group_id)) return;

    const sensitiveCheckResult = checkSensitiveWord(msg);
    if (sensitiveCheckResult[0] >= 3) {
        punish(group_id, user_id, message_id);
        serein.sendGroup(group_id, `[CQ:at,qq=${user_id}] 消息中含有敏感词（位于${sensitiveCheckResult[0]}），已撤回。`);
        logger.warn(`${shown_name}(${user_id}):${msg} 【发现敏感词，位于${sensitiveCheckResult}，触发次数：${scores[user_id.toString()]}】`);
        return false;
    } else
        reward(user_id);
}

/**
 * 奖励措施
 * @param {number} user_id 用户id
 */
function reward(user_id) {
    if (scores[user_id.toString()] > 0) {
        scores[user_id.toString()] -= config.minus;
    }
}

/**
 * 惩罚措施
 * @param {number} group_id 群号
 * @param {number} user_id 用户id
 * @param {number} message_id 消息id
 */
function punish(group_id, user_id, message_id) {
    scores[user_id.toString()] = (scores[user_id.toString()] || 0) + config.add;
    serein.sendPacket(JSON.stringify({
        action: 'delete_msg',
        params: {
            message_id
        }
    }));
    if (scores[user_id.toString()] > 5)
        serein.sendPacket(JSON.stringify({
            action: 'set_group_ban',
            params: {
                group_id,
                user_id,
                duration: (Math.floor(scores[user_id.toString()]) - 5) * 3 * 60
            }
        }));
}

init();