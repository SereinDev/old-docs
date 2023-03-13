
# HTTPApi

|     作者     | Zaitonn               |
| :----------: | :-------------------- |
|   **介绍**   | 提供HTTPApi控制       |
| **更新日期** | 2022.12.20            |
|   **下载**   | [历史版本](#历史版本) |

>[!WARNING] 此插件需要在v1.3.3及以上的版本运行，否则可能出现一些意想不到的问题

## 功能

提供HTTPApi控制，可外接第三方软件使用Serein的部分功能

>[!TIP] 使用示例：
[BackupManager对接serein](https://www.minebbs.com/resources/backupmanager-serein.5294/)

- 配置
  - 端口
  - 鉴权文本（可配置多个）
  - ip白名单（本地ip总是会被放行）
- API
  - 服务器
    - [x] 启动服务器
    - [x] 关闭服务器
    - [x] 强制结束服务器
    - [x] 发送命令
    - [x] 获取服务器信息
  - [x] 绑定/解绑
  - 通信
    - [x] 数据包
    - [x] 私聊
    - [x] 群聊
  - [x] 获取系统信息
  - [x] 执行[Serein命令](Function/Command.md)

## 使用方法

1. 将插件复制到 plugins 文件夹下后启动Serein
2. 第一次加载时会生成配置文件，你需要打开 plugins/HTTPApi/config.json 按需修改端口和鉴权凭证
3. 重新加载插件应用配置
4. 使用你的第三方软件控制

## 配置文件说明

```json
{
  "auth": [],       // 鉴权凭证列表
  "port": 2222,     // 端口
  "whitelist": [],  // 白名单IP
  "enableWhitelist": false // 启用白名单
}
```

## 已知bug

>[!WARNING]HTTP监听器成功打开后，重新加载插件将导致原端口被占用，可能无法使用一段时间，可以过几分钟后重新加载重试或直接重启Serein

## 开发文档

>[!TIP] 你需要有一定的编程基础

基网址 `http://127.0.0.1:{端口号}/serein`，使用GET请求，使用其他请求方法将返回`405`

### 响应内容

~~由于JS解释器兼容性问题，无法写入返回文本，故目前只返回状态码~~

v1.1版本已支持返回具体信息

| 状态码 | 解释                                               |
| :----: | -------------------------------------------------- |
| `200`  | 执行成功                                           |
| `202`  | 已执行但结果未知                                   |
| `400`  | 请求无效                                           |
| `401`  | 未通过验证                                         |
| `403`  | 执行失败（服务器未开启、WS未连接、绑定或解绑失败） |
| `405`  | 使用了错误的请求方法                               |
| `406`  | 缺少参数                                           |
| `500`  | 插件错误                                           |

#### 响应头

- `Content-Length`: *数据包具体长度*
- `Content-Type`: `application/json`

#### 数据结构

- `status`
  - 类型：`Number`
  - 状态码
- `data`
  - 类型：`Object`
  - 返回的数据主体
- `time`
  - 类型：`Number`
  - 时间戳，精确到秒

#### 200

```json
{
  "status": 200,
  "data": "欢迎使用Serein HttpApi v1.1。此插件运行在Serein v1.3.4",
  "time": 1678616128
}
```

#### 202

```json
{
  "status": 202,
  "data": {
    "success": true,
    "reason": ""
  },
  "time": 1678612328
}
```

#### 401

```json
{
  "status": 401,
  "data": "需要通过验证",
  "time": 1678616070
}
```

#### 403

```json
{
  "status": 403,
  "data": {
    "success": false,
    "reason": "服务器不在运行中"
  },
  "time": 1678616158
}
```

#### 404

```json
{
  "status": 404,
  "data": "未知的操作类型",
  "time": 1678616181
}
```

#### 406

```json
{
  "status": 406,
  "data": "未知的操作类型",
  "time": 1678616186
}
```

#### 500

```json
{
  "status": 500,
  "data": {
    "name": "Error",
    "msg": "测试错误",
    "stack": "  at <anonymous>:409:1"
  },
  "time": 1678616283
}
```

### 鉴权凭证

参数：`auth`  
类型：`string`

执行任何操作都需要添加此参数，未添加或无效则返回`401`

eg: `http://127.0.0.1:{端口号}/serein?auth=test`

### 操作内容

参数：`operation`  
类型：`string` （不区分大小写）

#### 启动服务器

`startserver`

- 服务器已运行或启动文件未找到返回`403`

#### 关闭服务器

`stopserver`

- 服务器已关闭返回`403`

#### 强制结束服务器

`killserver`

- 服务器已关闭返回`403`

#### 发送命令

`sendcmd`

- 子参数
  - `command`
  - 类型：`string`
- 未提供子参数返回`406`
- 服务器已关闭返回`403`

>[!TIP]
>eg: `http://127.0.0.1:{端口号}/serein?auth=test&operation=sendcmd&command=help`->发送`help`命令

#### 获取服务器状态信息

`getserverinfo`

```json
// 返回示例
{
  "status": 200,
  "data": {
    "status": true,
    "runtime": "0.6m",
    "cpuusage": 20.23,
    "filename": "echo.bat"
  },
  "time": "1678615830"
}
```

#### 获取系统信息

`getsysinfo`

```json
// 返回示例
{
  "status": 200,
  "data": {
    "cpuusage": 17.611507415771484,
    "infos": {
      "Architecture": "64 位",
      "Name": "Microsoft Windows 10 家庭版 SP0.0",
      "Hardware": {
        "CPUs": [
          {
            "Name": "Intel Core i5-1035G4 CPU @ 1.10GHz",
            "Brand": "GenuineIntel",
            "Architecture": "x64",
            "Cores": 4,
            "Frequency": 1498
          }
        ],
        "GPUs": [
          {
            "Name": "Intel(R) Iris(R) Graphics Family",
            "Brand": "Intel(R) Iris(R) Plus Graphics",
            "Resolution": "2736x1824",
            "RefreshRate": 59,
            "MemoryTotal": 1048576
          }
        ],
        "RAM": {
          "Free": 1495924,
          "Total": 7964852
        }
      },
      "FrameworkVersion": {
        "Major": 4,
        "Minor": 0,
        "Build": 30319,
        "Revision": 42000,
        "MajorRevision": 0,
        "MinorRevision": -23536
      },
      "JavaVersion": {
        "Major": 0,
        "Minor": 0,
        "Build": -1,
        "Revision": -1,
        "MajorRevision": -1,
        "MinorRevision": -1
      },
      "OperatingSystemType": 4,
      "IsMono": false
    }
  },
  "time": 1678616591
}
```

#### 获取网速

`getnetspeed`

```json
// 返回示例
{
  "status": 200,
  "data": {
    "upload": "4.3KB/s",
    "download": "10.9KB/s"
  },
  "time": 1678616560
}
```

#### 发送群聊消息

`sendgroup`

- 子参数
  - `target` 群号
    - 类型：`number`
  - `msg` 消息内容
    - 类型：`string`
- 未提供子参数返回`406`
- WS未连接返回`403`

#### 发送私聊消息

`sendprivate`

- 子参数
  - `target` QQ号
    - 类型：`number`
  - `msg` 消息内容
    - 类型：`string`
- 未提供子参数返回`406`
- WS未连接返回`403`

#### 发送数据包

`sendpacket`

- 子参数
  - `packet`
    - 类型：`string`
- 未提供子参数返回`406`
- WS未连接返回`403`

#### 绑定

`bindmember`

- 子参数
  - `userid` QQ号
    - 类型：`number`
  - `gameid` 游戏ID
    - 类型：`string`
- 未提供子参数返回`406`
- 绑定失败返回`403`

#### 解绑

`unbindmember`

- 子参数
  - `userid`
    - 类型：`number`
- 未提供子参数返回`406`
- 解绑失败返回`403`

## 历史版本

- 2023.3.12 [v1.1](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/publish/JS/HTTPApi/v1.1/HTTPApi.js)
- 2022.12.20 [v1.0](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/publish/JS/HTTPApi/v1.0/HTTPApi.js)
