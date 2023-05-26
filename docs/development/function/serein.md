
# 🧊 Serein相关

## 输出日志

`serein.log(content?: any)`

```js
serein.log("这是一条日志");
serein.log(12345); // 你也可以输出数字
serein.log(new System.IO.StreamWriter('log.txt')); // 甚至可以输出对象
```

- 参数
  - `content` 输出内容
- 返回
  - 空

:::tip
个人更推荐使用[Logger](../class#logger)输出，支持多参输入，且方便区分输出等级
:::

## Debug输出

`serein.debugLog(content?: any)`

```js
serein.debugLog("这是一条Debug输出");
```

- 参数
  - `content` 输出内容
- 返回
  - 空

## 注册插件

`serein.registerPlugin(name: string, version: string, author: string, description: string)`

```js
serein.registerPlugin("示例插件","v1.0","Zaitonn","这是一个示例插件"); 
```

- 参数
  - `name` 插件名称
  - `version` 版本
  - `author` 作者或版权信息
  - `description` 介绍
- 返回
  - `boolean` *(v1.3.2及以前)*
    - 成功为`true`，否则为`false`
  - `string` *(v1.3.3及以后)*
    - 当前的命名空间

## 设置监听器

`serein.setListener(event: string, callback: Function)`

```js
serein.setListener("onServerOutput", (line) => {
    serein.log(`服务器输出：${line}`);
    return false; // 拦截此输出
});
```

```js
serein.setListener("onGroupPoke", (group, user) => {
    serein.log(`监听群群成员戳一戳当前账号 触发群：${group} QQ：${user}`);
});
```

- 参数
  - `event` 事件名称，具体值见下表（区分大小写）
  - `callback` 回调函数
    - 不要包含`()`和参数
    - 对于可拦截的事件，你可以通过返回`false`进行拦截
      - 拦截后该事件便不会进行下一步处理（如正则匹配或输出到控制台）
      - 需要注意的是，你需要在规定时间内返回，具体时间可在配置文件`Serein.json` - `Function`的`JSEventMaxWaitingTime`中修改（默认500ms）；超出时间后返回的将被忽略；
- 返回
  - `boolean`
    - 设置监听器成功为`true`，否则为`false`

### 事件列表

#### onServerStart

- **服务器启动**
- 监听函数原型： `function () -> void`
- 不可拦截

#### onServerStop

- **服务器关闭**
- 监听函数原型： `function (exitCode: number) -> void`
  - `exitCode` 退出代码（正常关闭时为0）
- 不可拦截

#### onServerOutput

- **服务器输出**
- 监听函数原型： `function (line: string) -> boolean`
  - `line` 输出行
- 可被拦截

#### onServerOriginalOutput

- **服务器原始输出**
- 监听函数原型： `function (line: string) -> boolean`
  - `line` 输出行
- 可被拦截

:::note

- `onServerOutput`总是先于`onServerOriginalOutput`触发，但是拦截`onServerOutput`不影响后者触发
- 当两者中至少有一个事件被拦截时才会跳过下一步处理
:::

#### onServerSendCommand

- **服务器输入指令**
- 监听函数原型： `function (cmd: string) -> void`
  - `cmd` 输入命令
- 不可拦截

#### onGroupIncrease

- **监听群群成员增加**
- 监听函数原型： `function (group_id: number, user_id: number) -> void`
  - `group_id` 群号
  - `user_id` QQ号
- 不可拦截

#### onGroupDecrease

- **监听群群成员减少**
- 监听函数原型： `function (group_id: number, user_id: number) -> void`
  - `group_id` 群号
  - `user_id` QQ号
- 不可拦截

#### onGroupPoke

- **监听群戳一戳自身账号**
- 监听函数原型： `function (group_id: number, user_id: number) -> void`
  - `group_id` 群号
  - `user_id` QQ号
- 不可拦截

#### onReceiveGroupMessage

- **收到群消息**（包括设置中未监听的群聊）
- 监听函数原型： `function (group_id: number, user_id: number, msg: string, shownName: string, message_id: number?) -> boolean`
  - `group_id` 群号
  - `user_id` QQ号
  - `msg`  消息内容
  - `shownName` 显示名称
  - `message_id` 消息ID
- 可被拦截

#### onReceivePrivateMessage

- **收到私聊消息**
- 监听函数原型： `function (user_id: number, msg: string, nickName: string, message_id: number?) -> boolean`
  - `user_id` QQ号
  - `msg`  消息内容
  - `nickName` 昵称
  - `message_id` 消息ID
- 可被拦截

#### onReceivePacket

- **收到数据包**
- 监听函数原型： `function (packet: string) -> boolean`
  - `packet` 数据包UTF8文本
- 可被拦截

:::note
`onReceivePacket`先于`onReceivePrivateMessage`和`onReceiveGroupMessage`触发，若此事件被拦截，私聊和群聊消息事件均不会被触发
:::

#### onSereinClose

- **Serein关闭**
- 监听函数原型： `function () -> void`
- 不可拦截

#### onPluginsReload

- **插件重载**
- 监听函数原型： `function () -> void`
- 不可拦截

:::note
以上两个事件为方便插件保存信息使用，超过`JSEventMaxWaitingTime`设置项的时间后继续执行将被中止
:::

#### onPluginsLoaded

- **插件加载完毕**
- 监听函数原型： `function () -> void`
- 不可拦截

## 设置预加载配置

```js
serein.setPreLoadConfig(
  assemblies: string[], 
  allowGetType: boolean, 
  allowOperatorOverloading: boolean, 
  allowSystemReflection: boolean, 
  allowWrite: boolean, 
  strict: boolean
  )
```

- 参数
  - 详见[预加载配置](../preLoadConfig)
- 返回
  - 空

:::tip
设置后需要重新加载插件以应用
:::

## 获取Serein设置

`serein.getSettings()`

- 参数
  - 空
- 返回
  - `string` 设置的json文本

<details>
  <summary>返回文本示例（因版本不同会有所偏差）</summary>

```json
{
  "server": {
    "autoStop": true,
    "enableRestart": false,
    "enableOutputCommand": true,
    "enableLog": false,
    "enableUnicode": false,
    "excludedOutputs": [],
    "inputEncoding": 0,
    "lineTerminator": "\r\n",
    "outputEncoding": 0,
    "outputStyle": 1,
    "path": "C:\\Users\\Zaitonn\\Desktop\\s19\\bedrock_server_mod.exe",
    "port": 19132,
    "stopCommands": [
      "stop"
    ],
    "type": 1
  },
  "matches": {
    "difficulty": "(PEACEFUL|EASY|NORMAL|HARD|DIFFICULT[^Y])",
    "levelName": "Level\\sName:\\s(.+?)$",
    "muiltLines": [
      "players\\sonline:",
      "个玩家在线"
    ]
  },
  "bot": {
    "authorization": "",
    "autoEscape": false,
    "autoReconnect": false,
    "enableLog": false,
    "enbaleOutputData": false,
    "enbaleParseAt": true,
    "givePermissionToAllAdmin": false,
    "groupList": [],
    "permissionList": [],
    "uri": "127.0.0.1:8080"
  },
  "serein": {
    "autoUpdate": false,
    "colorfulLog": true,
    "dpiAware": true,
    "enableGetUpdate": false,
    "maxCacheLines": 250,
    "themeFollowSystem": true,
    "useDarkTheme": false,
    "autoRun": {
      "startServer": false,
      "connectWS": false,
      "delay": 0
    },
    "developmentTool": {
      "enableDebug": true,
      "detailDebug": false,
      "note": "以上设置内容为开发专用选项，请在指导下修改"
    },
    "function": {
      "noHeartbeat": false,
      "jsEventMaxWaitingTime": 500,
      "jsEventCoolingDownTime": 15,
      "disableBinderWhenServerClosed": false
    },
    "pagesDisplayed": {
      "serverPanel": true,
      "serverPluginManager": true,
      "regexList": true,
      "schedule": true,
      "bot": true,
      "member": true,
      "jsPlugin": true,
      "settings": true
    }
  },
  "event": {
    "BindingSucceed": [
      "g|[CQ:at,qq=%ID%] 绑定成功"
    ],
    "BindingFailDueToOccupation": [
      "g|[CQ:at,qq=%ID%] 该游戏名称被占用"
    ],
    "BindingFailDueToInvalid": [
      "g|[CQ:at,qq=%ID%] 该游戏名称无效"
    ],
    "BindingFailDueToAlreadyBinded": [
      "g|[CQ:at,qq=%ID%] 你已经绑定过了"
    ],
    "UnbindingSucceed": [
      "g|[CQ:at,qq=%ID%] 解绑成功"
    ],
    "UnbindingFail": [
      "g|[CQ:at,qq=%ID%] 该账号未绑定"
    ],
    "BinderDisable": [
      "g|[CQ:at,qq=%ID%] 绑定功能已被禁用"
    ],
    "ServerStart": [
      "g|服务器正在启动"
    ],
    "ServerStop": [
      "g|服务器已关闭"
    ],
    "ServerExitUnexpectedly": [
      "g|服务器异常关闭"
    ],
    "GroupIncrease": [
      "g|欢迎[CQ:at,qq=%ID%]入群~"
    ],
    "GroupDecrease": [
      "g|用户%ID%退出了群聊，已自动解绑游戏ID",
      "unbind|%ID%"
    ],
    "GroupPoke": [
      "g|别戳我……(*/ω＼*)"
    ],
    "SereinCrash": [
      "g|唔……发生了一点小问题(っ °Д °;)っ\n请查看Serein错误弹窗获取更多信息"
    ],
    "RequestingMotdpeSucceed": [
      "g|服务器描述：%Description%\n版本：%Version%(%Protocol%)\n在线玩家：%OnlinePlayer%/%MaxPlayer%\n游戏模式：%GameMode%\n延迟：%Delay%ms"
    ],
    "RequestingMotdjeSucceed": [
      "g|服务器描述：%Description%\n版本：%Version%(%Protocol%)\n在线玩家：%OnlinePlayer%/%MaxPlayer%\n延迟：%Delay%ms\n%Favicon%"
    ],
    "RequestingMotdFail": [
      "g|Motd获取失败\n详细原因：%Exception%"
    ],
    "PermissionDeniedFromPrivateMsg": [
      "p|你没有执行这个命令的权限"
    ],
    "PermissionDeniedFromGroupMsg": [
      "g|[CQ:at,qq=%ID%] 你没有执行这个命令的权限 %card%"
    ]
  }
}
```

</details>

## 获取Serein设置对象

`serein.getSettingsObject()`

- 参数
  - 空
- 返回
  - `object` 设置内容对象（见上）

:::tip
最好使用`serein.getSettingsObject()`而不是`serein.getSettings()`

```js
const settings = JSON.parse(serein.getSettings());
const settingsObj = serein.getSettingsObject();
// 虽然说两个方法等价（
// 但是通过`getSettingsObject`获取不需要再加一步转成JS对象，效率更高
```

:::

## 执行命令

`serein.runCommand(cmd: string)`

```js
serein.runCommand("g|hello")
```

- 参数
  - `cmd` 一条[Serein命令](../../guide/command)
- 返回
  - 空

:::caution
此处无法执行绑定或解绑ID、获取motd和执行js代码的命令
:::

## 获取插件列表

`serein.getPluginList()`

- 参数
  - 空
- 返回
  - `Array<PluginInfo>` 插件列表

```json
// PluginInfo
{ 
  "namespace": "test",        // 命名空间
  "available": true,          // 是否可用
  "file": "plugins\\test.js", // 相对路径
  "wsclients": [],            // 创建的WS对象状态列表
  "name": "test",             // 注册的名称
  "version": "",              // 注册的版本
  "author": "",               // 注册的作者
  "description": "",          // 注册的介绍
  "eventList": [],            // 监听的事件列表
  "preLoadConig": {           // 预加载配置
    "assemblies": [],
    "allowGetType": false,
    "allowOperatorOverloading": true,
    "allowSystemReflection": false,
    "allowWrite": true,
    "strict": false
  } 
} 
```

```ts title="serein.d.ts"
declare type Plugin = {
  readonly namespace: string
  readonly name?: string
  readonly version?: string
  readonly author?: string
  readonly description?: string
  readonly file: string
  readonly preLoadConfig: PreLoadConfig
  readonly eventList: string[]
  readonly wsclients: WSClient[]
  readonly available: boolean
}

declare interface PreLoadConfig {
  readonly assemblies: string[]
  readonly allowGetType: boolean
  readonly allowOperatorOverloading: boolean
  readonly allowSystemReflection: boolean
  readonly allowWrite: boolean
  readonly strict: boolean
  readonly stringCompilationAllowed: boolean
}

declare interface WSClient {
  readonly state: -1 | 0 | 2 | 3
  readonly disposed: boolean
}
```

:::tip
由于此函数为即时获取，获取时可能还未将所有插件载入，故建议使用`setTimeout()`延迟一段时间再获取
:::

## 设置命令变量

`serein.setVariable(key: string, variable: any)`

- 参数
  - `key` 变量名称
  - `variable` 变量内容
- 返回
  - `boolean`
    - 成功为`true`，否则为`false`

:::note

- `key`不能为空或null
- `key`只能包含大小写字母、数字和下划线（即需要满足正则表达式`^\w+$`）
- `key`不需要包括两边的`%`
- 设置重复的`key`将会被覆盖
- 各个插件设置变量的可能存在冲突，执行时以最后设置的为准
  - 你可以使用一个相对复杂的名称避免被覆盖（如`插件名_变量名`）
- Serein提供的变量在替换时优先级大于该变量
  - 也就是说，只有当匹配不到Serein内的变量时才会采用以上自定义的变量
:::

## 热重载文件

`serein.reloadFiles(type: 'all' | 'regex' | 'member' | 'schedule' | 'groupcache' | 'settings' | 'permissiongroup' = 'all')`

- 参数
  - `type` 类型
- 返回
  - `boolean`
    - 成功为`true`，否则为`false`

## 安全调用函数

:::note
此函数可用于解决跨插件调用函数时导致线程不安全的问题
:::

`serein.safeCall(func: Function, ...args: any)`

- 参数
  - `func` 函数
  - `args` 调用参数
- 返回
  - `any`
    - 传入函数的返回值
    - 当`func`不是一个正确的函数时将返回`undefined`
- 可能的错误
  - `any` 由调用的函数抛出
  - `System.MethodAccessException` 调用等待超时（1000ms）
