declare type Handler = {
    /**
     * 名称
     */
    name: string;
    /**
     * 触发器数组
     */
    triggers: Trigger[];
    /**
     * 介绍
     */
    description?: string;
    /**
     * 介绍
     */
    descriptions?: string[];
    /**
     * 作者
     */
    author?: string;
    /**
     * 版本
     */
    version?: string;
    /**
     * 优先级
     */
    priority?: number;
};
declare type TriggerBase = {
    /**
     * 回调函数
     * @param packet 数据包
     * @returns 快捷回复
     */
    callback: (packet: Packet) => string | void | any;
    /**
     * 阻断此消息
     */
    block?: boolean;
    /**
     * 使用CQ码回复该消息
     */
    reply?: boolean;
};
declare type Trigger = StartsWithTrigger | EndsWithTrigger | RegexTrigger | FullMatchTrigger | KeywordTrigger | CommandTrigger;
declare type StartsWithTrigger = {
    type: 'startswith';
    params: string[];
} & TriggerBase;
declare type EndsWithTrigger = {
    type: 'endswith';
    params: string[];
} & TriggerBase;
declare type RegexTrigger = {
    type: 'regex';
    params: (RegExp | string)[];
} & TriggerBase;
declare type FullMatchTrigger = {
    type: 'fullmatch';
    params: string[];
} & TriggerBase;
declare type KeywordTrigger = {
    type: 'keyword';
    params: string[];
} & TriggerBase;
declare type CommandTrigger = {
    type: 'command';
    params: string[];
    callback: (packet: Packet, commandArgs: string[]) => string | void | any;
} & TriggerBase;
declare type regHandler = (config: Handler) => boolean;
declare type VERSION = string;
declare interface Sender {
    /**
     * 年龄
     */
    age: number;
    /**
     * 地区
     */
    area: string;
    /**
     * 群名片／备注
     */
    card: string;
    /**
     * 成员等级
     */
    level: string;
    /**
     * 昵称
     */
    nickname: string;
    /**
     * 角色
     */
    role: 'owner' | 'admin' | 'member';
    /**
     * 性别
     */
    sex: 'male' | 'female' | 'unknown';
    /**
     * 专属头衔
     */
    title: string;
    /**
     * 发送者 QQ 号
     */
    user_id: number;
    /**
     * 临时群消息来源群号
     */
    group_id: number;
}
declare interface Packet {
    /**
     * 上报的类型
     */
    post_type: string;
    /**
     * 消息类型
     */
    message_type: string;
    /**
     * 事件发生的unix时间戳
     */
    time: number;
    /**
     * 收到事件的机器人的 QQ 号
     */
    self_id: number;
    /**
     * 消息的子类型
     */
    sub_type: string;
    /**
     * 消息 ID
     */
    message_id: number;
    /**
     * 字体
     */
    font: number;
    /**
     * 群号
     */
    group_id: number;
    /**
     * 消息内容
     */
    message: string;
    /**
     * 原始消息内容
     */
    raw_message: string;
    /**
     * 	发送人信息
     */
    sender: Sender;
    /**
     * 发送者 QQ 号
     */
    user_id: number;
    /**
     * 匿名信息
     */
    anonymous?: any;
}
