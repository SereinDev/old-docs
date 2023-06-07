# 🚌 MessageBus

用于插件之间快捷的通信

## 构造函数

- `MessageBus(namespace: string)`
  - `namespace` 命名空间

## 属性

- `alive:boolean` 是否存活
- `onerror: Function` 错误事件
  - 发生错误时触发

## 函数

- `postMessage(channal: string, msg: object): void` 发送信息
- `setListener(channal: string, callback: (msg: object) => void): boolean`

:::note

- 通过`postMessage`发送信息后，其他插件下的所有有监听指定频道的`MessageBus`都会被触发
- `msg`参数可填任意对象，但是不建议包含函数
:::
