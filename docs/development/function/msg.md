# 💬 消息收发

## 发送群聊消息

`serein.sendGroup(target: Number, msg: String)`

- 参数
  - `target` 群号
  - `msg` 消息内容
- 返回
  - `Boolean`
    - 成功为`true`，否则为`false`

:::caution
此值仅代表此消息是否成功由WebSocket发出，并不代表消息能够成功发送至聊天，以下同理
:::

## 发送私聊消息

`serein.sendPrivate(target: Number, msg: String)`

- 参数
  - `target` 对方QQ号
  - `msg` 消息内容
- 返回
  - `Boolean`
    - 成功为`true`，否则为`false`

## 发送数据包

`serein.sendPacket(packet: String)`

```js
serein.sendPackage("{\"action\": \"send_private_msg\",\"params\": {\"user_id\": \"10001\",\"message\": \"你好\"}}")
// 你可以通过这个功能实现自动同意好友请求等操作
```

- 参数
  - `packet` 发送的数据包
- 返回
  - `Boolean`
    - 成功为`true`，否则为`false`

## 获取ws连接状态

`serein.getWsStatus()`

- 参数
  - 无
- 返回
  - `Boolean`
    - 已连接为`true`，否则为`false`

## 获取群成员昵称缓存字典

`serein.getGroupCache()`

- 参数
  - 无
- 返回
  - `Object` 群成员昵称缓存字典
    - 第一个`key`为群号
    - 第二个`key`为QQ号

```js
var dict = serein.getGroupCache();
var myname = dict["114514"]["1919810"];
```

:::note
此处的`key`必须为字符串形式的群号或QQ号，直接使用`Number`类型作为`key`获取将导致Serein引发超出内存的异常
:::

## 直接获取指定群的群成员昵称缓存

`serein.getUserName(groupid: Number, userid: Number)`

```js
var myname = serein.getUserName(114514, 1919810); // 与上面的函数示例等价
```

- 参数
  - `groupid` 群号
  - `userid` QQ号
- 返回
  - `String`
    - 若未找到或不存在则返回空字符串
