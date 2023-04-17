declare type CommandConfig = {
    /**
     * 名称
     */
    name: string,

    /**
     * 关键词
     */
    keywords: string[],

    /**
     * 回调函数
     * @param group_id 群号
     * @param user_id 用户ID
     * @param msg 消息
     * @param shownName 显示名称
     */
    callback: (group_id: number, user_id: number, msg: string, shownName: string) => void,

    /**
     * 是否需要管理员权限
     */
    needAdmin?: boolean,

    /**
     * 介绍
     */
    description?: string[],

    /**
     * 权限列表
     */
    permissionList?: number[],

    /**
     * 排除的群聊
     */
    excludedGroups?: []
}

declare type CHregCommand = (config: CommandConfig) => void;