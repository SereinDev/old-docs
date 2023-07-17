# 🎭 隐藏设置

一些并不会出现在Serein界面里的设置项（`Serein.json`）

## `autoRun`

[自动启动运行](autoRunOnStarted)

## `developmentTool`

[开启调试模式](debugMode)

## `function`功能

### `noHeartbeat`

- `boolean`
- 是否禁用心跳功能（用于[在线统计](/onlineCount)）
- 此项功能会收集您的以下数据（匿名）
  - 启动时间
  - Serein版本
  - [Serein类型](differenceBetweenVersions)
  - 服务器状态

### `jsEventMaxWaitingTime`

- `number`
- JS插件事件拦截调用最大等待时间
  - 详见[设置监听器](../development/function/serein#设置监听器)

:::tip

- 若你没有使用JS的需求，你可以调为`0`来加快消息处理速度
- `jsEventMaxWaitingTime`为`0`可能导致重新加载插件时报错
:::

### `jsGlobalAssemblies`

- `string[]`
- JS全局程序集，此处的程序集将被所有JS引擎加载
  - 你可以在此写入一些常用的程序集方便各插件使用

### `jsPatternToSkipLoadingSpecifiedFile`

- `string[]`
- 加载JS时忽略的文件名后缀

### `jsScriptToPreExecute`

- `string?`
- JS引擎初始化预执行代码

### `disableBinderWhenServerClosed`

- `boolean`
- 在服务器关闭时禁用绑定功能（部分插件/事件有绑定后自动添加白名单功能，开启此项可以防止在服务器关闭时绑定导致白名单未同步）

## `regexForCheckingGameID`

- `string`
- 用于检查游戏ID的正则

## `pagesDisplayed`

- 页面是否显示 <sup>[仅Winform/WPF]</sup>
  - 改为`false`后Ui界面中的该栏将会被隐藏，但是不影响运行
  - ~~你可以全改为`false`来实现**超级他妈无敌极简模式**（确信（啥都用不了，就图一乐~~


- 指定的输出是否生效 <sup>[仅命令行]</sup>
  - `serverPanel` - 服务器控制台输出
  - `bot` - ws消息输出
  - `jsPlugin` - 插件输出
