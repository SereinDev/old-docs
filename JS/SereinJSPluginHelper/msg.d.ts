declare namespace serein {
    /**
     * 发送群聊消息
     * @param groupid 群号
     * @param msg 消息文本
     * @returns 发送结果
     */
    function sendGroup(groupid: number, msg: string): boolean

    /**
     * 发送私聊消息
     * @param userid 对方qq
     * @param msg 消息文本
     * @returns 发送结果
     */
    function sendPrivate(userid: number, msg: string): boolean

    /**
     * 发送私聊消息
     * @param groupid 群号
     * @param userid 对方qq
     * @param msg 消息文本
     * @returns 发送结果
     */
    function sendTemp(group_id: number, userid: number, msg: string): boolean

    /**
     * 发送数据包
     * @param packet 数据包文本
     * @returns 发送结果
     */
    function sendPacket(packet: string): boolean

    /**
     * 获取ws连接状态
     * @returns 连接状态
     */
    function getWsStatus(): boolean

    /**
     * 获取群成员昵称缓存字典
     * @returns 字典
     */
    function getGroupCache(): any

    /**
     * 直接获取指定群的群成员昵称缓存
     * @param groupid 群号
     * @param userid QQ号
     * @returns 群成员昵称缓存
     */
    function getUserInfo(groupid: number, userid: number): Member

    /**
     * 获取WS统计信息
     * @returns 统计信息，[0]为发送消息数，[1]为接收消息数
     */
    function getWsStat(): [string, string] | null

    /**
     * 获取自身ID
     * @returns 自身ID
     */
    function getSelfID(): number | null
}

declare interface Member {
    id: number
    card: string
    nickname: string
    role: number
    gameId: string
}