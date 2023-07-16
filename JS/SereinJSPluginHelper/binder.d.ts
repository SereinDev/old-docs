declare namespace serein {
    /**
     * 绑定游戏ID
     * @param userid QQ号
     * @param gameid 游戏ID
     * @returns 绑定结果
     */
    function bindMember(userid: number, gameid: string): boolean

    /**
     * 删除绑定记录
     * @param userid QQ号
     * @returns 解绑结果
     */
    function unbindMember(userid: number): boolean

    /**
     * 获取指定用户QQ
     * @param gameid 游戏ID
     * @returns QQ号
     */
    function getID(gameid: string): number

    /**
     * 获取指定游戏ID
     * @param userid QQ号
     * @returns 游戏ID
     */
    function getGameID(userid: number): string
}