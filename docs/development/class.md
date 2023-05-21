
# 📚 类

## WebSocket客户端

```js
// 由于该js解释器不支持ws，所以这里用C#封装了一个，部分方法和js原生的有所不同
const ws = new WSClient("ws://127.0.0.1:11451", serein.namespace); 
// 实例化ws，
// 此处需要提供当前的命名空间，用于区分和管理

ws.onopen = () => {
  // ws开启事件
  // ...
};
ws.onclose = () => {
  // ws关闭事件
  // ...
};
ws.onerror = (e) => { // 错误信息
  // ws发生错误事件
  // ...
};
ws.onmessage = (message) => { // 收到数据
  // ws收到数据事件
  // ...
};

ws.open(); // 连接ws
var state = ws.state; // 连接状态
/*
 * 此状态有以下五个枚举值
 *  -1  未知或无效
 *  0   正在连接
 *  1   连接成功
 *  2   正在关闭
 *  3   已关闭
*/
ws.send("hello"); // 发送数据
ws.close(); // 关闭ws
ws.dispose(); // 释放对象
```

## Logger

```js
const logger = new Logger("Example"); // Logger名称
logger.info("这是一条信息输出");
logger.warn("这是一条警告输出");
logger.error("这是一条错误输出");
logger.debug("这是一条信息输出"); // 此消息将输出到Serein的debug窗口而不是插件控制台
```

:::tip
以上四个函数可以有多个参数，输出时各参数将用空格连接
:::

![logger](/img/logger.png)

## Motdje/Motdpe

~~Jvav~~版和基岩版的Motd对象

```js
let motd1 = new Motdje('1.2.3.4:1234'); // 地址（支持域名解析和带端口的文本解析）
let motd2 = new Motdje(1234); // 地址（支持域名解析和带端口的文本解析）
```

### 属性

```ts
/**
 * Java服务器Motd对象
 */
declare class Motdje {
    /**
     * Java服务器Motd对象
     * @param {string} addr 服务器地址
     */
    constructor(addr: string)

    /**
     * Java服务器Motd对象
     * @param {number} port 本地端口
     */
    constructor(port: number)

    /**
     * 最大玩家数
     */
    readonly maxPlayer: string;

    /**
     * 在线玩家数
     */
    readonly onlinePlayer: string;

    /**
     * 服务器描述
     */
    readonly description: string;

    /**
     * 协议
     */
    readonly protocol: string;

    /**
     * 图标（CQ码）
     */
    readonly favicon: string;

    /**
     * 延迟（ms）
     */
    readonly delay: number;

    /**
     * 原文
     */
    readonly origin: string;

    /**
     * 错误消息
     */
    readonly exception: string;

    /**
     * 是否获取成功
     */
    readonly isSuccessful: boolean;

    /**
     * IP
     */
    readonly ip: string;

    /**
     * 端口
     */
    readonly port: number;
}

/**
 * 基岩版服务器Motd对象
 */
declare class Motdpe {

    /**
     * 基岩版服务器Motd对象
     * @param {string} addr 服务器地址
     */
    constructor(addr: string)

    /**
     * 基岩版服务器Motd对象
     * @param {number} port 本地端口
     */
    constructor(port: number)

    /**
     * 最大玩家数
     */
    readonly maxPlayer: string;

    /**
     * 在线玩家数
     */
    readonly onlinePlayer: string;

    /**
     * 服务器描述
     */
    readonly description: string;

    /**
     * 协议
     */
    readonly protocol: string;

    /**
     * 存档名称
     */
    readonly levelName: string;

    /**
     * 游戏模式
     */
    readonly gameMode: string;

    /**
     * 延迟（ms）
     */
    readonly delay: number;

    /**
     * 原文
     */
    readonly origin: string;

    /**
     * 错误消息
     */
    readonly exception: string;

    /**
     * 是否获取成功
     */
    readonly isSuccessful: boolean;

    /**
     * IP
     */
    readonly ip: string;

    /**
     * 端口
     */
    readonly port: number;
}
```
