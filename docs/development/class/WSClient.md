# 📪 WebSocket客户端

连接Websocket

## 示例

```js
// 实例化ws
const ws = new WSClient("ws://127.0.0.1:11451", serein.namespace); 
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
ws.send("hello"); // 发送数据
ws.close(); // 关闭ws
ws.dispose(); // 释放对象
```

## 构造函数

- `WSClient(uri: string, namespace: string)`
  - `uri` ws地址
  - `namespace` 命名空间

## 属性

- `onopen: Function` 连接事件
  - 连接成功时触发
- `onclose: Function` 断开事件
  - 连接关闭时触发
- `onmessage: Function` 消息事件
  - 接收到消息时触发
- `onerror: Function` 错误事件
  - 发生错误时触发
- `state: number` 连接状态
  - `-1` - 未知或无效
  - `0` - 正在连接
  - `1` - 连接成功
  - `2` - 正在关闭
  - `3` - 已关闭

## 函数

- `open(): void`
  - 连接
- `close(): void`
  - 断开
- `send(content: string): void`
  - 发送文本
- `dispose(): void`
  - 释放
    - 释放后，此对象无法再被使用
