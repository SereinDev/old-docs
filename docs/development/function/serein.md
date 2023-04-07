
# 🧊 Serein相关

## 输出日志

`serein.log(content: Object)`

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
个人更推荐使用[Logger](../class#logger)输出，可以方便区分输出等级
:::

## Debug输出

`serein.debugLog(content: Object)`

```js
serein.debugLog("这是一条Debug输出");
```

- 参数
  - `content` 输出内容
- 返回
  - 空

## 注册插件

`serein.registerPlugin(name: String, version: String, author: String, description: String)`

```js
serein.registerPlugin("示例插件","v1.0","Zaitonn","这是一个示例插件"); 
```

- 参数
  - `name` 插件名称
  - `version` 版本
  - `author` 作者或版权信息
  - `description` 介绍
- 返回
  - `Boolean` *(v1.3.2及以前)*
    - 成功为`true`，否则为`false`
  - `String` *(v1.3.3及以后)*
    - 当前的命名空间

## 设置监听器

`serein.setListener(event: String, callback: Function)`

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
  - `Boolean`
    - 设置监听器成功为`true`，否则为`false`

## 事件列表

### onServerStart

- **服务器启动**
- 监听函数原型： `function () -> void`
- 不可拦截

### onServerStop

- **服务器关闭**
- 监听函数原型： `function (exitCode: Number) -> void`
  - `exitCode` 退出代码（正常关闭时为0）
- 不可拦截

### onServerOutput

- **服务器输出**
- 监听函数原型： `function (line: String) -> Boolean`
  - `line` 输出行
- 可被拦截

### onServerOriginalOutput

- **服务器原始输出**
- 监听函数原型： `function (line: String) -> Boolean`
  - `line` 输出行
- 可被拦截

:::note

- `onServerOutput`总是先于`onServerOriginalOutput`触发，但是拦截`onServerOutput`不影响后者触发
- 当两者中至少有一个事件被拦截时才会跳过下一步处理
:::

### onServerSendCommand

- **服务器输入指令**
- 监听函数原型： `function (cmd: String) -> void`
  - `cmd` 输入命令
- 不可拦截

### onGroupIncrease

- **监听群群成员增加**
- 监听函数原型： `function (group_id: Number, user_id: Number) -> void`
  - `group_id` 群号
  - `user_id` QQ号
- 不可拦截

### onGroupDecrease

- **监听群群成员减少**
- 监听函数原型： `function (group_id: Number, user_id: Number) -> void`
  - `group_id` 群号
  - `user_id` QQ号
- 不可拦截

### onGroupPoke

- **监听群戳一戳自身账号**
- 监听函数原型： `function (group_id: Number, user_id: Number) -> void`
  - `group_id` 群号
  - `user_id` QQ号
- 不可拦截

### onReceiveGroupMessage

- **收到群消息**（包括设置中未监听的群聊）
- 监听函数原型： `function (group_id: Number, user_id: Number, msg: String, shownName: String) -> Boolean`
  - `group_id` 群号
  - `user_id` QQ号
  - `msg`  消息内容
  - `shownName` 显示名称
- 可被拦截

### onReceivePrivateMessage

- **收到私聊消息**
- 监听函数原型： `function (user_id: Number, msg: String, nickName: String) -> Boolean`
  - `user_id` QQ号
  - `msg`  消息内容
  - `nickName` 昵称
- 可被拦截

### onReceivePacket

- **收到数据包**
- 监听函数原型： `function (packet: String) -> Boolean`
  - `packet` 数据包UTF8文本
- 可被拦截

:::note
`onReceivePacket`先于`onReceivePrivateMessage`和`onReceiveGroupMessage`触发，若此事件被拦截，私聊和群聊消息事件均不会被触发
:::

### onSereinClose

- **Serein关闭**
- 监听函数原型： `function () -> void`
- 不可拦截

### onPluginsReload

- **插件重载**
- 监听函数原型： `function () -> void`
- 不可拦截

### onPluginsLoaded

- **插件加载成功**
- 监听函数原型： `function () -> void`
- 不可拦截

:::note
以上两个事件为方便插件保存信息使用，超过`JSEventMaxWaitingTime`设置项的时间后继续执行将被中止
:::

## 设置预加载配置

```js
serein.setPreLoadConfig(
  assemblies: String[], 
  allowGetType: Boolean, 
  allowOperatorOverloading: Boolean, 
  allowSystemReflection: Boolean, 
  allowWrite: Boolean, 
  strict: Boolean
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
  - `String` 设置的json文本

```json
{
  "Server": {
    "Path": "",
    "EnableRestart": false,
    "EnableOutputCommand": true,
    "EnableLog": false,
    "OutputStyle": 1,
    "StopCommand": "stop",
    "AutoStop": true,
    "EncodingIndex": 0,
    "EnableUnicode": false,
    "Type": 1,
    "Port": 19132
  },
  "Matches": {
    "Version": "(\\d+\\.\\d+\\.\\d+\\.\\d+)",
    "Difficulty": "(PEACEFUL|EASY|NORMAL|HARD|DIFFICULT[^Y])",
    "LevelName": "Level Name: (.+?)$",
    "Finished": "(Done|Started)",
    "PlayerList": "players\\sonline:"
  },
  "Bot": {
    "EnableLog": false,
    "GivePermissionToAllAdmin": false,
    "EnbaleOutputData": false,
    "GroupList": [],
    "PermissionList": [],
    "Uri": "127.0.0.1:6700",
    "Authorization": "",
    "Restart": false,
    "AutoEscape": false
  },
  "Serein": {
    "EnableGetUpdate": true,
    "EnableGetAnnouncement": true,
    "Debug": true,
    "DPIAware": true
  },
  "Event": {
    "Notice": "在这里你可以自定义每个事件触发时执行的命令。参考：https://serein.cc/Command.html、https://serein.cc/Event.html",
    "Bind_Success": [
      "g|[CQ:at,qq=%ID%] 绑定成功"
    ],
    "Bind_Occupied": [
      "g|[CQ:at,qq=%ID%] 该游戏名称被占用"
    ],
    "Bind_Invalid": [
      "g|[CQ:at,qq=%ID%] 该游戏名称无效"
    ],
    "Bind_Already": [
      "g|[CQ:at,qq=%ID%] 你已经绑定过了"
    ],
    "Unbind_Success": [
      "g|[CQ:at,qq=%ID%] 解绑成功"
    ],
    "Unbind_Failure": [
      "g|[CQ:at,qq=%ID%] 该账号未绑定"
    ],
    "Server_Start": [
      "g|服务器正在启动"
    ],
    "Server_Stop": [
      "g|服务器已关闭"
    ],
    "Server_Error": [
      "g|服务器异常关闭"
    ],
    "Group_Increase": [
      "g|欢迎[CQ:at,qq=%ID%]入群~"
    ],
    "Group_Decrease": [
      "g|用户%ID%退出了群聊，已自动解绑游戏ID",
      "unbind|%ID%"
    ],
    "Group_Poke": [
      "g|别戳我……(*/ω＼*)"
    ],
    "Serein_Crash": [
      "g|唔……发生了一点小问题(っ °Д °;)っ\n请查看Serein错误弹窗获取更多信息"
    ],
    "Motdpe_Success": [
      "g|服务器描述：%Description%\n版本：%Version%(%Protocol%)\n在线玩家：%OnlinePlayer%/%MaxPlayer%\n游戏模式：%GameMode%\n延迟：%Delay%ms"
    ],
    "Motdje_Success": [
      "g|服务器描述：%Description%\n版本：%Version%(%Protocol%)\n在线玩家：%OnlinePlayer%/%MaxPlayer%\n延迟：%Delay%ms\n%Favicon%"
    ],
    "Motd_Failure": [
      "g|Motd获取失败\n详细原因：%Exception%"
    ],
    "PermissionDenied_Private": [
      "p|你没有执行这个命令的权限"
    ],
    "PermissionDenied_Group": [
      "g|[CQ:at,qq=%ID%] 你没有执行这个命令的权限"
    ]
  }
}
```

## 获取Serein设置对象

`serein.getSettingsObject()`

- 参数
  - 空
- 返回
  - `object` 设置内容对象（见上）

:::tip
最好使用该函数而不是上面的`serein.getSettings()`

- 你可以直接通过对象的属性获取对应的设置项，而不用将其转成JSON后再获取
- `serein.getSettings()`为了向下兼容将会存留两到三个版本，以后可能将被`serein.getSettingsObject()`取代
:::

## 执行命令

`serein.runCommand(cmd: String)`

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
    "Namespace": "test",  // 命名空间
    "Available": true,    // 是否可用
    "File": "plugins\\test.js", // 相对路径
    "WebSockets": [], // 创建的WS对象状态列表
    "Name": "test",   // 注册的名称
    "Version": "",   // 注册的版本
    "Author": "",    // 注册的作者
    "Description": "", // 注册的介绍
    "EventList": [],  // 监听的事件列表
    "PreLoadConig": { // 预加载配置
      "Assemblies": [],
      "AllowGetType": false,
      "AllowOperatorOverloading": true,
      "AllowSystemReflection": false,
      "AllowWrite": true,
      "Strict": false
    } 
  } 
  ```

:::tip
由于此函数为即时获取，获取时可能还未将所有插件载入，故建议使用`setTimeout()`延迟一段时间再获取
:::

## 获取正则列表

`serein.getRegexs()`

- 参数
  - 空
- 返回
  - `Array<RegexItem>` 正则列表
    - `RegexItem`结构见[正则](../../guide/regex)

## 添加正则

```js
serein.addRegex(
  regexp: String,
  area: Number,
  needAdmin: Boolean,
  command: String,
  remark: String,
  ignore: Number[]
  )
```

- 参数
  - `regexp` 正则表达式
  - `area` 作用域
  - `needAdmin` 需要管理
  - `command` 命令
  - `remark` 备注
  - `ignore` 忽略的对象
- 返回
  - `Boolean`
    - 成功为`true`，否则为`false`

## 修改正则

```js
serein.editRegex(
  index: Number
  regexp: String,
  area: Number,
  needAdmin: Boolean,
  command: String,
  remark: String,
  ignore: Number[]
  )
```

- 参数
  - `index` 数组下标
  - `regexp` 正则表达式
  - `area` 作用域
  - `needAdmin` 需要管理
  - `command` 命令
  - `remark` 备注
  - `ignore` 忽略的对象
- 返回
  - `Boolean`
    - 成功为`true`，否则为`false`

:::note
若参数为null则忽略更改
:::

## 删除正则

`serein.removeRegex(index: Number)`

- 参数
  - `index` 数组下标
- 返回
  - `Boolean`
    - 成功为`true`，否则为`false`

## 设置命令变量

`serein.setVariable(key: String, variable: Object)`

- 参数
  - `key` 变量名称
  - `variable` 变量内容
- 返回
  - `Boolean`
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
