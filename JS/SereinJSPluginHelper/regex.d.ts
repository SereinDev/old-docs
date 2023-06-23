declare namespace serein {

    /**
     * 获取正则列表
     * @returns {Array<Regex>} 正则列表
     */
    function getRegexes(): Array<Regex>

    /**
     * 添加正则
     * @param {string} regexp 正则
     * @param {number} area 作用域
     * @param {boolean} needAdmin 需要管理
     * @param {string} command 命令
     * @param {string} remark 备注
     * @param {Array<number>} ignore 忽略对象
     * @returns {boolean} 添加结果
     */
    function addRegex(regexp: string, area: RegexAreaType, needAdmin: boolean, command: string, remark?: string, ignore?: number[]): boolean

    /**
     * 修改正则
     * @param {number} index 数组下标
     * @param {string} regexp 正则
     * @param {number} area 作用域
     * @param {boolean} needAdmin 需要管理
     * @param {string} command 命令
     * @param {string} remark 备注
     * @param {Array<number>} ignore 忽略对象
     * @returns {boolean} 添加结果
     */
    function editRegex(index: number, regexp?: string, area?: RegexAreaType, needAdmin?: boolean, command?: string, remark?: string, ignore?: number[]): boolean

    /**
     * 删除正则
     * @param {number} index 数组下标
     * @returns {boolean} 删除结果
     */
    function removeRegex(index: number): boolean
}

/**
 * Serein正则对象
 */
declare type Regex = {
    readonly regex: string
    readonly area: RegexAreaType,
    readonly needAdmin: boolean,
    readonly command: string,
    readonly remark: string,
    readonly ignore: number[]
}

/**
 * Serein正则作用域枚举值
 */
declare enum RegexAreaType {
    disable = 0,
    console = 1,
    groupMsg = 2,
    privateMsg = 3,
    selfMsg = 4,
}