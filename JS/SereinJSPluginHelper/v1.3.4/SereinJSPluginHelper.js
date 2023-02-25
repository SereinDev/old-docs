/**
    Serein JS插件辅助

    @summary 使用方法：
        0. 建议使用 Visual Studio Code 编写插件 下载链接：https://code.visualstudio.com/

        1. 将此文件复制到插件的同文件夹下

        2. 在你的插件第一行加上下面这一行（只需复制"///"及其之后的部分）
            /// <reference path="SereinJSPluginHelper.js"/>

        3. 然后你就可以快乐地写插件了，这时候就可以自动补全和显示函数参数了！！

    @version 适用版本：
        Serein v1.3.4 +
 */


var serein = {
    /**
     * 所在文件夹
     * @see https://serein.cc/#/Function/JSDocs/Properties?id=sereinexe%e6%89%80%e5%9c%a8%e6%96%87%e4%bb%b6%e5%a4%b9
     */
    path: '',

    /**
     * Serein版本
     * @see https://serein.cc/#/Function/JSDocs/Properties?id=serein%e7%89%88%e6%9c%ac
     */
    version: '',

    /**
     * JS命名空间
     * @see https://serein.cc/#/Function/JSDocs/Properties?id=js%e5%91%bd%e5%90%8d%e7%a9%ba%e9%97%b4
     */
    namespace: '',

    /**
     * 启动时间
     * @see https://serein.cc/#/Function/JSDocs/Properties?id=serein%e5%90%af%e5%8a%a8%e6%97%b6%e9%97%b4
     */
    startTime: new Date(),

    /**
     * Serein类型
     * @enum `0` - 控制台
     * @enum `1` - Winform
     * @enum `2` - WPF
     * @enum `-1` - 未知
     * @see https://serein.cc/#/Function/JSDocs/Properties?id=serein%e7%b1%bb%e5%9e%8b
     */
    type: -1,

    /**
     * Serein类型名称
     * @see https://serein.cc/#/Function/JSDocs/Properties?id=serein%e7%b1%bb%e5%9e%8b%e6%96%87%e6%9c%ac
     */
    typeName: '',

    /**
     * 输出日志
     * @param {*} content 内容
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e8%be%93%e5%87%ba%e6%97%a5%e5%bf%97
     */
    log: function (content) { },

    /**
     * Debug输出
     * @param {*} content 内容
     * @see https://serein.cc/#/Function/JSDocs/Func?id=debug%e8%be%93%e5%87%ba
     */
    debugLog: function (content) { },

    /**
     * 注册插件
     * @param {String} name 名称
     * @param {String} version 版本
     * @param {String} author 作者
     * @param {String} description 详细描述
     * @returns {String} 命名空间
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e6%b3%a8%e5%86%8c%e6%8f%92%e4%bb%b6
     */
    registerPlugin: function (name, version, author, description) { },

    /**
     * 设置监听器
     * @param {String} eventname 事件名称，详见下方链接
     * @param {Function} func 回调函数
     * @returns {Boolean} 设置结果
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e8%ae%be%e7%bd%ae%e7%9b%91%e5%90%ac%e5%99%a8
     */
    setListener: function (eventname, func) { },

    /**
     * 获取Serein设置
     * @returns {String} 设置的json文本
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e8%8e%b7%e5%8f%96serein%e8%ae%be%e7%bd%ae
     */
    getSettings: function () { },

    /**
     * 获取Serein设置对象
     * @returns {Object} 设置的json文本
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e8%8e%b7%e5%8f%96serein%e8%ae%be%e7%bd%ae%e5%af%b9%e8%b1%a1
     */
    getSettingsObject: function () { },

    /**
     * 执行命令
     * @param {String} command 一条Serein命令
     * @summary 此处无法执行绑定或解绑ID、获取motd和执行js代码的命令
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e6%89%a7%e8%a1%8c%e5%91%bd%e4%bb%a4
     */
    runCommand: function (command) { },

    /**
     * 获取系统信息
     * @returns {Object} 系统信息对象
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e8%8e%b7%e5%8f%96%e7%b3%bb%e7%bb%9f%e4%bf%a1%e6%81%af
     */
    getSysInfo: function () { },

    /**
     * 获取CPU使用率
     * @returns {Number} CPU使用率
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e8%8e%b7%e5%8f%96cpu%e4%bd%bf%e7%94%a8%e7%8e%87
     */
    getCPUPersent: function () { },

    /**
     * 获取插件列表
     * @returns {Array} 插件列表
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e8%8e%b7%e5%8f%96%e6%8f%92%e4%bb%b6%e5%88%97%e8%a1%a8
     */
    getPluginList: function () { },

    /**
     * 获取正则列表
     * @returns {Array} 正则列表
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e8%8e%b7%e5%8f%96%e6%ad%a3%e5%88%99%e5%88%97%e8%a1%a8
     */
    getRegexs: function () { },

    /**
     * 添加正则
     * @param {String} regexp 正则
     * @param {Number} area 作用域
     * @param {Boolean} needAdmin 需要管理
     * @param {String} command 命令
     * @param {String} remark 备注
     * @param {Array<Number>} ignore 忽略对象
     * @returns {Boolean} 添加结果
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e6%b7%bb%e5%8a%a0%e6%ad%a3%e5%88%99
     */
    addRegex: function (regexp, area, needAdmin, command, remark, ignore) { },

    /**
     * 修改正则
     * @param {Number} index 数组下标
     * @param {String} regexp 正则
     * @param {Number} area 作用域
     * @param {Boolean} needAdmin 需要管理
     * @param {String} command 命令
     * @param {String} remark 备注
     * @param {Array<Number>} ignore 忽略对象
     * @returns {Boolean} 修改结果
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e4%bf%ae%e6%94%b9%e6%ad%a3%e5%88%99
     */
    editRegex: function (index, regexp, area, needAdmin, command, remark, ignore) { },

    /**
     * 删除正则
     * @param {Number} index 数组下标
     * @returns {Boolean} 删除结果
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e5%88%a0%e9%99%a4%e6%ad%a3%e5%88%99
     */
    removeRegex: function (index) { },

    /**
     * 设置命令变量
     * @param {String} key 变量名
     * @param {*} variable 变量
     * @returns {Boolean} 设置结果
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e8%ae%be%e7%bd%ae%e5%91%bd%e4%bb%a4%e5%8f%98%e9%87%8f
     */
    setVariable: function (key, variable) { },

    /**
     * 获取网速
     * @returns {Array<String>} 网速字符串数组，[0]为上传网速，[1]为下载网速
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e8%8e%b7%e5%8f%96%e7%bd%91%e9%80%9f
     */
    getNetSpeed: function () { },

    /**
     * 启动服务器
     * @returns {Boolean} 启动结果
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e5%90%af%e5%8a%a8%e6%9c%8d%e5%8a%a1%e5%99%a8
     */
    startServer: function () { },

    /**
     * 关闭服务器
     * @returns {Boolean} 关闭结果
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e5%85%b3%e9%97%ad%e6%9c%8d%e5%8a%a1%e5%99%a8
     */
    stopServer: function () { },

    /**
     * 强制结束服务器
     * @returns {Boolean} 强制结束结果
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e5%bc%ba%e5%88%b6%e7%bb%93%e6%9d%9f%e6%9c%8d%e5%8a%a1%e5%99%a8
     */
    killServer: function () { },

    /**
     * 发送服务器命令
     * @param {String} command 命令内容
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e5%8f%91%e9%80%81%e6%9c%8d%e5%8a%a1%e5%99%a8%e5%91%bd%e4%bb%a4
     */
    sendCmd: function (command) { },

    /**
     * 获取服务器状态
     * @returns {Boolean} 当前状态
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e8%8e%b7%e5%8f%96%e6%9c%8d%e5%8a%a1%e5%99%a8%e7%8a%b6%e6%80%81
     */
    getServerStatus: function () { },

    /**
     * 获取服务器运行时长
     * @returns {String} 时长字符串，格式见文档
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e8%8e%b7%e5%8f%96%e6%9c%8d%e5%8a%a1%e5%99%a8%e8%bf%90%e8%a1%8c%e6%97%b6%e9%95%bf
     */
    getServerTime: function () { },

    /**
     * 获取服务器进程占用
     * @returns {Boolean} 进程CPU占用率
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e8%8e%b7%e5%8f%96%e6%9c%8d%e5%8a%a1%e5%99%a8%e8%bf%9b%e7%a8%8b%e5%8d%a0%e7%94%a8
     */
    getServerCPUPersent: function () { },

    /**
     * 获取服务器文件
     * @returns {String} 文件名
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e8%8e%b7%e5%8f%96%e6%9c%8d%e5%8a%a1%e5%99%a8%e6%96%87%e4%bb%b6
     */
    getServerFile: function () { },

    /**
     * 获取Motd原文（基岩版）
     * @param {String} addr 服务器地址（支持域名、端口）
     * @returns {String} 获取到的文本（需要自己处理）
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e8%8e%b7%e5%8f%96motd%e5%8e%9f%e6%96%87
     */
    getMotdpe: function (addr) { },

    /**
     * 获取Motd原文（Java版）
     * @param {String} addr 服务器地址（支持域名、端口）
     * @returns {String} 获取到的文本（需要自己处理）
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e8%8e%b7%e5%8f%96motd%e5%8e%9f%e6%96%87
     */
    getMotdje: function (addr) { },

    /**
     * 发送群聊消息
     * @param {Number} groupid 群号
     * @param {String} msg 消息文本
     * @returns {Boolean} 发送结果
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e5%8f%91%e9%80%81%e7%be%a4%e8%81%8a%e6%b6%88%e6%81%af
     */
    sendGroup: function (groupid, msg) { },

    /**
     * 发送私聊消息
     * @param {Number} userid 对方qq
     * @param {String} msg 消息文本
     * @returns {Boolean} 发送结果
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e5%8f%91%e9%80%81%e7%a7%81%e8%81%8a%e6%b6%88%e6%81%af
     */
    sendPrivate: function (userid, msg) { },

    /**
     * 发送数据包
     * @param {String} packet 数据包文本
     * @returns {Boolean} 发送结果
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e5%8f%91%e9%80%81%e6%95%b0%e6%8d%ae%e5%8c%85
     */
    sendPacket: function (packet) { },

    /**
     * 获取ws连接状态
     * @returns {Boolean} 连接状态
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e8%8e%b7%e5%8f%96ws%e8%bf%9e%e6%8e%a5%e7%8a%b6%e6%80%81
     */
    getWsStatus: function () { },

    /**
     * 绑定游戏ID
     * @param {Number} userid QQ号
     * @param {String} gameid 游戏ID，需符合/^[a-zA-Z0-9_\s-]{4,16}$/
     * @returns {Boolean} 绑定结果
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e7%bb%91%e5%ae%9a%e6%b8%b8%e6%88%8fid
     */
    bindMember: function (userid, gameid) { },

    /**
     * 删除绑定记录
     * @param {Number} userid QQ号
     * @returns {Boolean} 解绑结果
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e5%88%a0%e9%99%a4%e7%bb%91%e5%ae%9a%e8%ae%b0%e5%bd%95
     */
    unbindMember: function (userid) { },

    /**
     * 获取指定用户QQ
     * @param {*} gameid 游戏ID
     * @returns {Number} QQ号
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e8%8e%b7%e5%8f%96%e6%8c%87%e5%ae%9a%e7%94%a8%e6%88%b7qq
     */
    getID: function (gameid) { },

    /**
     * 获取指定游戏ID
     * @param {Number} userid QQ号
     * @returns {String} 游戏ID
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e8%8e%b7%e5%8f%96%e6%8c%87%e5%ae%9a%e6%b8%b8%e6%88%8fid
     */
    getGameID: function (userid) { },

    /**
     * 获取群成员昵称缓存字典
     * @returns {Array<Array>}
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e8%8e%b7%e5%8f%96%e7%be%a4%e6%88%90%e5%91%98%e6%98%b5%e7%a7%b0%e7%bc%93%e5%ad%98%e5%ad%97%e5%85%b8
     */
    getGroupCache: function () { },

    /**
     * 直接获取指定群的群成员昵称缓存
     * @param {Number} groupid 群号
     * @param {Number} userid QQ号
     * @returns {String} 群成员昵称缓存
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e7%9b%b4%e6%8e%a5%e8%8e%b7%e5%8f%96%e6%8c%87%e5%ae%9a%e7%be%a4%e7%9a%84%e7%be%a4%e6%88%90%e5%91%98%e6%98%b5%e7%a7%b0%e7%bc%93%e5%ad%98
     */
    getUserName: function (groupid, userid) { },

    /**
     * 导出
     * @param {String} key 导出键名
     * @param {*} obj 导出的对象
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e5%af%bc%e5%87%ba
     */
    export: function (key, obj) { },

    /**
     * 导入
     * @param {String} key 导入键名
     * @returns {any | null | undefined} 导入对象
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e5%af%bc%e5%85%a5
     */
    import: function (key) { },

    /**
     * 设置预加载配置
     * @param {Array<String>} assemblies 
     * @param {Boolean} allowGetType 
     * @param {Boolean} allowOperatorOverloading 
     * @param {Boolean} allowSystemReflection 
     * @param {Boolean} allowWrite 
     * @param {Boolean} strict 
     * @see https://serein.cc/#/Function/JSDocs/Func?id=%e8%ae%be%e7%bd%ae%e9%a2%84%e5%8a%a0%e8%bd%bd%e9%85%8d%e7%bd%ae
     */
    setPreLoadConfig: function (assemblies, allowGetType, allowOperatorOverloading, allowSystemReflection, allowWrite, strict) { },
}

/**
 * 引入命名空间
 * @param {String} namespace
 * @returns {Object} 命名空间动态对象，具体路径见 https://learn.microsoft.com/zh-cn/dotnet/api/
 */
function importNamespace(namespace) { };

/**
 * Java服务器Motd对象
 */
class Motdje {
    /**
     * Java服务器Motd对象
     * @param {String} addr 服务器地址
     */
    constructor(addr) { };

    /**
     * 最大玩家数
     */
    MaxPlayer = '';

    /**
     * 在线玩家数
     */
    OnlinePlayer = '';

    /**
     * 服务器描述
     */
    Description = '';

    /**
     * 协议
     */
    Protocol = '';

    /**
     * 存档名称（仅基岩版有意义）
     */
    LevelName = '';

    /**
     * 游戏模式（仅基岩版有意义）
     */
    GameMode = '';

    /**
     * 图标（CQ码）（仅Java有意义）
     */
    Favicon = '';

    /**
     * 延迟（ms）
     * @example var delay = new Motdje('...').Delay.TotalMilliseconds;
     * @type {Object}
     */
    Delay;

    /**
     * 原文
     */
    Origin = '';

    /**
     * 错误消息
     */
    Exception = '';

    /**
     * 是否获取成功
     */
    IsSuccess = false;
}

/**
 * 基岩版服务器Motd对象
 */
class Motdpe {
    /**
     * 基岩版服务器Motd对象
     * @param {String} addr 服务器地址
     */
    constructor(addr) { };

    /**
     * 最大玩家数
     */
    MaxPlayer = '';

    /**
     * 在线玩家数
     */
    OnlinePlayer = '';

    /**
     * 服务器描述
     */
    Description = '';

    /**
     * 协议
     */
    Protocol = '';

    /**
     * 存档名称（仅基岩版有意义）
     */
    LevelName = '';

    /**
     * 游戏模式（仅基岩版有意义）
     */
    GameMode = '';

    /**
     * 图标（CQ码）（仅Java有意义）
     */
    Favicon = '';

    /**
     * 延迟（ms）
     * @example var delay = new Motdje('...').Delay.TotalMilliseconds;
     * @type {Object}
     */
    Delay;

    /**
     * 原文
     */
    Origin = '';

    /**
     * 错误消息
     */
    Exception = '';

    /**
     * 是否获取成功
     */
    IsSuccess = false;
}

/**
 * Logger
 */
class Logger {
    /**
     * Logger
     * @param {String} title 标题
     */
    constructor(title) { };

    /**
     * 信息输出
     * @param {*} content 输出内容
     */
    info(content) { };

    /**
     * 警告输出
     * @param {*} content 输出内容
     */
    warn(content) { };

    /**
     * 错误输出
     * @param {*} content 输出内容
     */
    error(content) { };

    /**
     * 调试输出
     * @param {*} content 输出内容
     */
    debug(content) { };
}

/**
 * WebSocket客户端
 */
class WSClient {
    /**
     * WebSocket客户端
     * @param {String} uri ws地址
     * @param {String} namespace 当前命名空间
     */
    constructor(uri, namespace) { };

    /**
     * 开启事件
     */
    onopen = new Function();

    /**
     * 关闭事件
     */
    onclose = new Function();

    /**
     * 错误事件
     */
    onerror = new Function();

    /**
     * 消息接收事件
     */
    onmessage = new Function();

    /**
     * 连接
     */
    open() { };

    /**
     * 发送
     * @param {String} msg 消息内容
     */
    send(msg) { };

    /**
     * 关闭
     */
    close() { };

    /**
     * 释放对象（调用后释放对象的资源，且不可撤销）
     */
    dispose() { };

    /**
     * 连接状态
     * @enum `-1` - 未知或无效;
     * @enum `0` - 正在连接;
     * @enum `1` - 连接成功;
     * @enum `2` - 正在关闭;
     * @enum `3` - 已关闭;
     */
    state = 0;
}
