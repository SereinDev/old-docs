# 示例文件

|     作者     | Zaitonn                                                                                                               |
| :----------: | :-------------------------------------------------------------------------------------------------------------------- |
|   **介绍**   | Serein的一个正则示例文件                                                                                              |
| **更新日期** | 2022.10.13                                                                                                            |
|   **下载**   | [Demo.json](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/publish/JSON/Demo.json) |

### 预览

```json
{
    "type": "REGEX",
    "comment": "非必要请不要直接修改文件，语法错误可能导致数据丢失",
    "data": [
      {
        "Regex": "这是Serein的示例文件",
        "Remark": "你可以自行修改以下内容",
        "Command": "debug|Copyright © 2022 Zaitonn. All Rights Reserved.",
        "Area": 0,
        "IsAdmin": false
      },
      {
        "Regex": "^list$",
        "Remark": "群命令-list",
        "Command": "s|list",
        "Area": 2,
        "IsAdmin": false
      },
      {
        "Regex": "^开服$",
        "Remark": "群命令-开服",
        "Command": "s|start",
        "Area": 2,
        "IsAdmin": true
      },
      {
        "Regex": "^关服$",
        "Remark": "群命令-关服",
        "Command": "s|stop",
        "Area": 2,
        "IsAdmin": true
      },
      {
        "Regex": "^/(.+?)$",
        "Remark": "群命令-执行自定义命令",
        "Command": "s|$1",
        "Area": 2,
        "IsAdmin": true
      },
      {
        "Regex": "^服务器状态$",
        "Remark": "群命令-服务器状态",
        "Command": "g|服务器名称:%LevelName%\\n游戏版本:%Version%\\n难度:%Difficulty%\\n运行状态:%Status%\\n在线人数:%OnlinePlayer%/%MaxPlayer%\\n本次运行时长:%RunTime%\\n内存占用率:%RAMPercentage%%\\nCPU:%CPUName%(%CPUPercentage%%)",
        "Area": 2,
        "IsAdmin": false
      },
      {
        "Regex": "^绑定(.+?)$",
        "Remark": "群成员管理-绑定",
        "Command": "bind|$1",
        "Area": 2,
        "IsAdmin": false
      },
      {
        "Regex": "^解绑$",
        "Remark": "群成员管理-解绑",
        "Command": "unbind|%ID%",
        "Area": 2,
        "IsAdmin": false
      },
      {
        "Regex": "^解绑\\[CQ:at,qq=(.+?)$\\]$",
        "Remark": "群成员管理-解绑他人",
        "Command": "unbind|$1",
        "Area": 2,
        "IsAdmin": true
      },
      {
        "Regex": "^(.+?)$",
        "Remark": "聊天转发-群聊",
        "Command": "s|tellraw @a {\"rawtext\":[{\"text\":\"§b[%Time%]§r%ShownName%:$1\"}]}",
        "Area": 2,
        "IsAdmin": false
      },
      {
        "Regex": "^motdje (.+?)$",
        "Remark": "motd-Java服",
        "Command": "motdje|$1",
        "Area": 2,
        "IsAdmin": false
      },
      {
        "Regex": "^motdpe (.+?)$",
        "Remark": "motd-基岩版服",
        "Command": "motdpe|$1",
        "Area": 2,
        "IsAdmin": false
      },
      {
        "Regex": "\\[Chat\\]\\s<(.+?)>\\s(.+?)$",
        "Remark": "聊天转发-服务器",
        "Command": "g|[玩家]$1>$2",
        "Area": 1,
        "IsAdmin": false
      },
      {
        "Regex": "Quit correctly",
        "Remark": "服务器关闭提示",
        "Command": "g|服务器已关闭",
        "Area": 1,
        "IsAdmin": false
      },
      {
        "Regex": "Done \\((.+?)\\)! $",
        "Remark": "服务器启动成功提示",
        "Command": "g|服务器已启动，用时$1",
        "Area": 1,
        "IsAdmin": false
      },
      {
        "Regex": "are (.+?) players.+?[\\n\\r].+?\\](.*)$",
        "Remark": "返回当前在线人数",
        "Command": "g|当前在线:$1\\n$2",
        "Area": 1,
        "IsAdmin": false
      },
      {
        "Regex": "Unknown command: (.+?). Please check that the command exists and that you have permission to use it.$",
        "Remark": "命令反馈-未知的命令",
        "Command": "g|未知的命令：$1。请检查命令是否存在，以及您对它是否拥有权限",
        "Area": 1,
        "IsAdmin": false
      },
      {
        "Regex": "No targets matched selector$",
        "Remark": "命令反馈-找不到目标",
        "Command": "g|没有与选择器匹配的目标",
        "Area": 1,
        "IsAdmin": false
      },
      {
        "Regex": "Syntax error: Unexpected \"(.+?)\": at \"(.+?)\"$",
        "Remark": "命令反馈-语法错误",
        "Command": "g|语法错误：意外的“$1”出现在“$2”",
        "Area": 1,
        "IsAdmin": false
      }
    ]
  }
```
