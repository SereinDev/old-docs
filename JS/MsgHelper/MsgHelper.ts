/// <reference path="SereinJSPluginHelper/index.d.ts"/>

'use strict';

export declare type Handler = {
    /**
     * 名称
     */
    name: string,

    /**
     * 触发器数组
     */
    triggers: Trigger[],

    /**
     * 介绍
     */
    description?: string,

    /**
     * 介绍
     */
    descriptions?: string[],

    /**
     * 作者
     */
    author?: string,

    /**
     * 版本
     */
    version?: string,

    /**
     * 优先级
     */
    priority?: number
}

export declare type TriggerBase = {
    /**
     * 回调函数
     * @param packet 数据包
     * @returns 快捷回复
     */
    callback: (packet: Packet) => string | void | any,

    /**
     * 阻断此消息
     */
    block?: boolean,

    /**
     * 使用CQ码回复该消息
     */
    reply?: boolean,
}

export declare type Trigger =
    StartsWithTrigger | EndsWithTrigger | RegexTrigger | FullMatchTrigger | KeywordTrigger | CommandTrigger;

export declare type StartsWithTrigger = {
    type: 'startswith',
    params: string[]
} & TriggerBase;

export declare type EndsWithTrigger = {
    type: 'endswith',
    params: string[]
} & TriggerBase;

export declare type RegexTrigger = {
    type: 'regex',
    params: (RegExp | string)[]
} & TriggerBase;

export declare type FullMatchTrigger = {
    type: 'fullmatch',
    params: string[]
} & TriggerBase;

export declare type KeywordTrigger = {
    type: 'keyword',
    params: string[]
} & TriggerBase;

export declare type CommandTrigger = {
    type: 'command',
    params: string[],
    callback: (packet: Packet, commandArgs: string[]) => string | void | any,
} & TriggerBase;

export declare type regHandler = (config: Handler) => boolean;

export declare type VERSION = string;

export declare interface Sender {
    /**
     * 年龄
     */
    age: number,

    /**
     * 地区
     */
    area: string,

    /**
     * 群名片／备注
     */
    card: string,

    /**
     * 成员等级
     */
    level: string,

    /**
     * 昵称
     */
    nickname: string,

    /**
     * 角色
     */
    role: 'owner' | 'admin' | 'member',

    /**
     * 性别
     */
    sex: 'male' | 'female' | 'unknown',

    /**
     * 专属头衔
     */
    title: string,

    /**
     * 发送者 QQ 号
     */
    user_id: number,

    /**
     * 临时群消息来源群号
     */
    group_id: number,
}

export declare interface Packet {
    /**
     * 上报的类型
     */
    post_type: string,

    /**
     * 消息类型
     */
    message_type: string,

    /**
     * 事件发生的unix时间戳
     */
    time: number,

    /**
     * 收到事件的机器人的 QQ 号
     */
    self_id: number,

    /**
     * 消息的子类型
     */
    sub_type: string,

    /**
     * 消息 ID
     */
    message_id: number,

    /**
     * 字体
     */
    font: number,

    /**
     * 群号
     */
    group_id: number,

    /**
     * 消息内容
     */
    message: string,

    /**
     * 原始消息内容
     */
    raw_message: string,

    /**
     * 	发送人信息
     */
    sender: Sender,

    /**
     * 发送者 QQ 号
     */
    user_id: number,

    /**
     * 匿名信息
     */
    anonymous?: any,
}

declare type Config = {
    commandPrefix: string,
    commandSeparator: string
}


import stdio = require('./modules/stdio.js');

const {
    existFile,
    existDirectory,
    createDirectory,
    writeAllTextToFile,
    readAllTextFromFile
} = stdio;

const CONFIG: Config = {
    commandPrefix: '/',
    commandSeparator: ' '
};


const VERSION = 'v2.0';
const handlers: Handler[] = [{
    name: '帮助',
    author: '内置',
    version: VERSION,
    description: '发送`帮助`或`help`显示此菜单',
    triggers: [
        {
            type: 'fullmatch',
            params: ['help', '帮助'],
            callback: getHelpText
        }
    ],
    priority: -Infinity
}];
const logger = new Logger('消息助手');
let config = loadConfig() || CONFIG;

serein.registerPlugin('消息助手', VERSION, 'Zaitonn', '提供快捷的消息回复注册功能');
serein.exports('MsgHelper.regHandler', regHandler);
serein.exports('MsgHelper.VERSION', VERSION);
serein.setListener('onReceivePacket', handlePacket);

/**
 * 获取帮助信息
 */
function getHelpText() {
    return handlers.map((handler) => `${handler.name}
  作者：${handler.author}
  版本：${handler.version}
  介绍：${handler.description}`).join('\n---------------\n');;
}

/**
 * 注册处理器
 * @param handler 处理器
 * @returns 注册结果
 */
function regHandler(handler: Handler) {
    if (!handler)
        return false;

    try {
        handler = checkHandlerConfig(handler);
    } catch (e) {
        logger.error(handler.name || '-', '注册失败，原因：\n', e);
        return false;
    }

    logger.info(handler.name, '注册成功',
        `
作者：${handler.author}
版本：${handler.version}
介绍：${handler.description}
触发器数量：${handler.triggers.length}
优先级：${handler.priority}
`);

    if (handlers.map((h) => h.name).includes(handler.name))
        logger.warn(handler.name, '已注册过，请检查是否重复注册');

    handlers.push(handler);
    handlers.sort((h1, h2) => h2.priority - h1.priority);
    return true;
}

/**
 * 检查处理器配置
 * @param handler 处理器配置
 * @returns 校验过的处理器配置
 */
function checkHandlerConfig(handler: Handler): Handler {
    if (typeof (handler.name) != 'string')
        throw new Error('处理器名称不正确');

    if (!handler.name)
        throw new Error('处理器名称为空');

    if (typeof (handler.description) != 'string' && handler.description !== undefined ||
        !Array.isArray(handler.descriptions) && handler.descriptions !== undefined)
        throw new Error('处理器的介绍类型不正确');

    if (typeof (handler.description) == 'string' && Array.isArray(handler.descriptions) && handler.descriptions.length != 0)
        throw new Error('处理器的介绍属性重复');

    if (!Array.isArray(handler.triggers))
        throw new Error('处理器的触发器数组类型不正确');

    handler.triggers = handler.triggers.map(trigger => checkTrigger(trigger));

    handler.priority ||= 0;
    handler.author ||= '';
    handler.version ||= '';
    handler.description ||= handler.descriptions?.join('\n  ');

    return handler;
}

/**
 * 检查触发器配置
 * @param trigger 触发器配置
 * @returns 校验过的触发器配置
 */
function checkTrigger(trigger: Trigger): Trigger {
    if (typeof (trigger.callback) != 'function')
        throw new Error('触发器回调函数类型不正确');

    if (!Array.isArray(trigger.params))
        throw new Error('触发器参数不合法：类型不正确');

    trigger.params = trigger.params.flat(3);

    switch (trigger.type) {
        case 'startswith':
        case 'endswith':
        case 'keyword':
        case 'command':
        case 'fullmatch':
            if (!Array.isArray(trigger.params))
                throw new Error('触发器参数不合法：类型不正确');

            if (!trigger.params.every((parma) => typeof (parma) === 'string'))
                throw new Error('触发器参数不合法：数组中含有不正确类型的值');

            break;

        case 'regex':
            if (!trigger.params.every((parma) => typeof (parma) === 'string' || parma instanceof RegExp))
                throw new Error('触发器参数不合法：数组中含有不正确类型的值');

            trigger.params = trigger.params.map((parma) => typeof (parma) == 'string' ? new RegExp(parma) : parma);
            break;

        default:
            throw new Error('触发器类型属性不正确');
    }

    trigger.block ||= false;
    trigger.reply ||= false;

    return trigger;
}

/**
 * 处理消息
 * @param packet 数据包
 */
function handlePacket(packet: string) {
    const packetBody: Packet = JSON.parse(packet);

    const {
        post_type,
        message_type,
        group_id,
        message,
        sender,
    } = packetBody;

    if (post_type != 'message' || message_type != 'group')
        return;

    if (!sender)
        throw new Error('数据包异常');

    if (!isListeningToThisGroup(group_id) || !message)
        return;

    for (const handler of handlers) {
        if (match(handler, message, packetBody))
            break;
    }
}

/**
 * 是否匹配
 * @param handler 命令配置
 * @param message 消息
 * @param packet 数据包
 * @returns 是否阻塞
 */
function match(handler: Handler, message: string, packet: Packet) {
    for (const trigger of handler.triggers) {
        let matched = false;
        switch (trigger.type) {
            case 'startswith':
                matched = trigger.params.some((param) => message.startsWith(param));
                break;

            case 'endswith':
                matched = trigger.params.some((param) => message.endsWith(param));
                break;

            case 'regex':
                matched = trigger.params.some((param) => typeof (param) === 'string' ? new RegExp(param).test(message) : param.test(message));
                break;

            case 'fullmatch':
                matched = trigger.params.some((param) => message === param);
                break;

            case 'keyword':
                matched = trigger.params.some((param) => message.includes(param));
                break;

            case 'command':
                matched = trigger.params.some((param) => message.startsWith(config.commandPrefix + param));
                break;

            default:
                continue;
        }

        if (!matched)
            continue;

        try {
            let reply = trigger.reply ? `[CQ:reply,id=${packet.message_id}]` : '';
            let content = '';

            if (trigger.type === 'command')
                content = serein.safeCall(trigger.callback, packet, message.split(config.commandSeparator).slice(1));
            else
                content = serein.safeCall(trigger.callback, packet);

            if (content)
                serein.sendGroup(packet.group_id, reply + content);

            if (trigger.block)
                return true;

        } catch (e) {
            logger.error(handler.name, '处理消息时出现问题\n', e);
        }
    }
    return false;
}

/**
 * 是否监听此群聊
 * @param group_id 群号
 * @returns 结果
 */
function isListeningToThisGroup(group_id: number) {
    return serein.getSettingsObject().bot.groupList.includes(group_id);
}

function loadConfig(): Config | null {
    if (!existDirectory('./plugins/MsgHelper') || !existFile('./plugins/MsgHelper/config.json')) {
        createDirectory('./plugins/MsgHelper');
        writeAllTextToFile('./plugins/MsgHelper/config.json', JSON.stringify(CONFIG, null, 2));
        logger.warn('配置文件已创建');
        return null;
    }

    const localConfig: Config = JSON.parse(readAllTextFromFile('./plugins/MsgHelper/config.json'));

    if (typeof (localConfig.commandPrefix) != 'string')
        throw new Error('配置文件命令前缀类型错误');

    if (typeof (localConfig.commandSeparator) != 'string')
        throw new Error('配置文件命令分隔符类型错误');

    if (localConfig.commandSeparator.length === 0)
        throw new Error('配置文件命令分隔符为空');

    return {
        commandPrefix: localConfig.commandPrefix,
        commandSeparator: localConfig.commandSeparator,
    };
}