
# 🎄 事件

设定特定条件下触发的命令

![事件](/img/event.png)

## 介绍

根据settings/Event.json中的设置的命令响应触发的事件  

在配置文件中，每个事件下有一个`JSON`数组，你可以在里面填写该事件被触发时执行的[命令](command)，并且可以在其中插入[变量](variables)

:::caution
除特殊说明外，所有事件均无法使用[消息变量（私聊）](variables#消息变量私聊)、[消息变量（群聊）](variables#消息变量群聊)变量
:::

## 事件一览表

| 事件名                         | 描述                         |
| ------------------------------ | ---------------------------- |
| BindingSucceed                 | 绑定成功                     |
| BindingFailDueToOccupation     | 绑定失败-游戏ID占用          |
| BindingFailDueToInvalid        | 绑定失败-该游戏ID不符合规范  |
| BindingFailDueToAlreadyBinded  | 绑定失败-该QQ已经绑定        |
| UnbindingSucceed               | 解绑成功                     |
| UnbindingFail                  | 解绑成功                     |
| ServerStart                    | 服务器启动                   |
| ServerStop                     | 服务器正常关闭               |
| ServerExitUnexpectedly         | 服务器异常退出               |
| GroupIncrease                  | 监听群有人进群               |
| GroupDecrease                  | 监听群有人退群               |
| GroupPoke                      | 监听群内当前账号被他人戳一戳 |
| RequestingMotdpeSucceed        | 命令motdpe执行成功           |
| RequestingMotdjeSucceed        | 命令motdje执行成功           |
| RequestingMotdFail             | 命令motdpe或motdje执行失败   |
| PermissionDeniedFromPrivateMsg | 权限不足（私聊）             |
| PermissionDeniedFromGroupMsg   | 权限不足（群聊）             |
| SereinCrash                    | Serein崩溃                   |

## 绑定/解绑

:::note
本节的所有事件可以使用 ID 变量获取触发这个事件的QQ
:::

### BindingSucceed

绑定成功  

```txt title="Serein命令"
g|[CQ:at,qq=%ID%] 绑定成功
```

### BindingFailDueToOccupation

游戏ID占用  

```txt title="Serein命令"
g|[CQ:at,qq=%ID%] 该游戏名称被占用
```

### BindingFailDueToInvalid

该游戏ID不符合规范  

```txt title="Serein命令"
g|[CQ:at,qq=%ID%] 该游戏名称无效
```

### BindingFailDueToAlreadyBinded

该QQ已经绑定  

```txt title="Serein命令"
g|[CQ:at,qq=%ID%] 你已经绑定过了
```

### UnbindingSucceed

解绑成功  

```txt title="Serein命令"
g|[CQ:at,qq=%ID%] 解绑成功
```

### UnbindingFail

解绑成功  

```txt title="Serein命令"
g|[CQ:at,qq=%ID%] 该账号未绑定
```

## 服务器状态变更

### ServerStart

服务器启动

```txt title="Serein命令"
g|服务器正在启动
```

### ServerStop

服务器正常关闭

```txt title="Serein命令"
g|服务器已关闭
```

### ServerExitUnexpectedly

服务器异常退出  

```txt title="Serein命令"
g|服务器异常关闭
```

## QQ群事件

:::note
本节的所有事件可以使用`ID`变量获取触发这个事件的QQ
:::

### GroupIncrease

监听群有人进群  

```txt title="Serein命令"
g|欢迎[CQ:at,qq=%ID%]入群~
```

### GroupDecrease

监听群有人退群  
默认值：

```Serein命令
g|用户%ID%退出了群聊，已自动解绑游戏ID
ubind|%ID%
```

### GroupPoke

监听群内当前账号被他人戳一戳  

```txt title="Serein命令"
g|别戳我……(*/ω＼*)
```

:::tip
以上三个事件其实很有用，可以欢迎新成员/引导玩家绑定ID/快捷获取服务器状态/提示退群消息/~~整活~~  

- 示例：

```txt title="Serein命令"
[CQ:at,qq=%ID%] 呐呐呐~！欢迎来到XXX服务器★(笑)♡今后也.请.多.多.指.教.喔?~
```

```txt title="Serein命令"
[CQ:at,qq=%ID%]
服务器描述：Dedicated Server
版本：1.19.2(527)
在线玩家：0/10
游戏模式：Survival
延迟：114.514ms
```

:::

## Motd指令反馈

### RequestingMotdpeSucceed

命令motdpe执行成功  
默认值：

```txt title="Serein命令"
g|
服务器描述：%Description%
版本：%Version%(%Protocol%)
在线玩家：%OnlinePlayer%/%MaxPlayer%
游戏模式：%GameMode%
延迟：%Delay%ms
```

### RequestingMotdjeSucceed

命令motdje执行成功  
默认值：

```txt title="Serein命令"
g|
服务器描述：%Description%
版本：%Version%(%Protocol%)
在线玩家：%OnlinePlayer%/%MaxPlayer%
延迟：%Delay%ms
%Favicon%
```

### RequestingMotdFail

命令motdpe或motdje执行失败  
默认值：

```txt title="Serein命令"
g|
Motd获取失败
%Exception%
```

:::note
RequestingMotdFail 可以使用额外的`Exception`变量输出错误信息
:::

## 权限不足反馈

### PermissionDeniedFromPrivateMsg

当没有管理权限的用户通过私聊方式触发了需要权限的命令时触发

```txt title="Serein命令"
p|你没有执行这个命令的权限
```

### PermissionDeniedFromGroupMsg

当没有管理权限的用户通过群聊方式触发了需要权限的命令时触发

```txt title="Serein命令"
g|[CQ:at,qq=%id%] 你没有执行这个命令的权限
```

## Serein

### SereinCrash

Serein崩溃  
默认值：

```txt title="Serein命令"
g|
唔……发生了一点小问题(っ °Д °;)っ
请查看Serein错误弹窗获取更多信息
```
