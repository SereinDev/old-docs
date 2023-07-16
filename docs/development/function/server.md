# 📡 服务器相关

## 启动服务器

`serein.startServer()`

- 参数
  - 空
- 返回
  - `boolean`
    - 成功为`true`，否则为`false`

## 关闭服务器

`serein.stopServer()`

- 参数
  - 空
- 返回
  - 空

:::note
此方法不能保证服务器被关闭
:::

## 强制结束服务器

`serein.killServer()`

- 参数
  - 空
- 返回
  - `boolean`
    - 成功为`true`，否则为`false`

## 发送服务器命令

`serein.sendCmd(string: command)`

- 参数
  - `command` 输入的命令
- 返回
  - 空

## 获取服务器状态

`serein.getServerStatus()`

- 参数
  - 空
- 返回
  - `boolean`
    - 已启动为`true`，未启动则为`false`

## 获取服务器运行时长

`serein.getServerTime()`

- 参数
  - 空
- 返回
  - `string`
    - 示例：`0.2m` `1.5h` `3.02d`

## 获取服务器PID

`serein.getServerPID()`

- 参数
  - 空
- 返回
  - `number?`

## 获取服务器进程占用

`serein.getServerCPUUsage()`

- 参数
  - 空
- 返回
  - `number` ∈ [0, 100]
    - 示例：`11.4514191981`

## 获取服务器文件

`serein.getServerFile()`

- 参数
  - 空
- 返回
  - `string`
    - 示例：`bedrock_server.exe`

## 获取服务器Motd

`serein.getServerMotd()`

- 参数
  - 空
- 返回
  - [`Motdpe` | `Motdje`](../class#motdjemotdpe)

## 获取Motd原文

基岩版：`serein.getMotdpe(addr: string)`  
Java版：`serein.getMotdje(addr: string)`

```js
var pe = serein.getMotdpe("127.0.0.1:19132");
var je = serein.getMotdje("127.0.0.1:25565");
```

- 参数
  - `addr` 服务器ip
- 返回
  - `string` Motd原文
    - 获取失败时返回空字符串
    - 基岩版为纯字符串

    ```txt title='返回示例'
    MCPE;Dedicated Server;503;1.18.33;0;10;12578007761032183218;Bedrock level;Survival;1;19132;19133;
    ```

    - Java版为Json文本

    ```json title='返回示例'
    {
      "descraddrtion": {
        "text": "§bMinecraftOnline§f - §6Home of Freedonia§r"
      },
      "players": {
        "max": 120,
        "online": 1,
        "sample": [
            {
              "id": "a4740a2c-1eec-4b7d-9d22-1c861e7045d7",
              "name": "Biolord101"
            }
        ]
      },
      "version": {
        "name": "1.12.2",
        "protocol": 340
      },
      "favicon": "" // 此处限于篇幅省略其内容，实际上是base64编码的图片
    }
    ```

:::note
`addr`支持的类型

1. `string` IP/域名 -> 指定服务器IP
   - 不填端口基岩版默认`19132`，Java版默认`25565`
2. `string` IP/域名:端口 -> 指定服务器IP和端口

:::
