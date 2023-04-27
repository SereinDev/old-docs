# 💬 消息收发

## 发送群聊消息

`serein.sendGroup(target: number, msg: string)`

- 参数
  - `target` 群号
  - `msg` 消息内容
- 返回
  - `boolean`
    - 成功为`true`，否则为`false`

:::caution
此值仅代表此消息是否成功由WebSocket发出，并不代表消息能够成功发送至聊天，以下同理
:::

## 发送私聊消息

`serein.sendPrivate(target: number, msg: string)`

- 参数
  - `target` 对方QQ号
  - `msg` 消息内容
- 返回
  - `boolean`
    - 成功为`true`，否则为`false`

## 发送临时会话消息

`serein.sendTemp(group_id: number, user_id: number, msg: string)`

- 参数
  - `group_id` 群号
  - `user_id` 对方QQ号
  - `msg` 消息内容
- 返回
  - `boolean`
    - 成功为`true`，否则为`false`

## 发送数据包

`serein.sendPacket(packet: string)`

```js
serein.sendPacket(JSON.stringify({
    action: "send_private_msg",
    params: {
        user_id: 10001,
        message: "你好"
    }
}));
```

- 参数
  - `packet` 发送的数据包
- 返回
  - `boolean`
    - 成功为`true`，否则为`false`

:::tip
你可以通过此函数实现发送消息、同意好友请求、上传文件等功能
:::

## 获取ws连接状态

`serein.getWsStatus()`

- 参数
  - 无
- 返回
  - `boolean`
    - 已连接为`true`，否则为`false`

## 获取群成员昵称缓存字典

`serein.getGroupCache()`

- 参数
  - 无
- 返回
  - `object` 群成员昵称缓存字典
    - 第一个`key`为群号
    - 第二个`key`为QQ号

```js
const dict = serein.getGroupCache();
const info = dict["114514"]["1919810"];
```

:::note
此处的`key`必须为字符串形式的群号或QQ号，直接使用`number`类型作为`key`获取将导致Serein引发超出内存的异常
:::

## 直接获取指定群的群成员信息

`serein.getUserInfo(groupid: number, userid: number)`

```js
const info = serein.getUserInfo(114514, 1919810); // 与上面的函数示例等价
```

- 参数
  - `groupid` 群号
  - `userid` QQ号
- 返回
  - `UserInfo` | `undefined`

```ts
declare interface UserInfo {
    id: number
    card: string
    nickname: string
    role: number
    gameId: string
}
```
