# BetterWhitelist（更好的白名单）

|   **作者**   | 9Yan                  |
| :----------: | :-------------------- |
|   **介绍**   | 更完善的白名单方案    |
| **更新日期** | 2023.2.26 v1.4        |
|   **下载**   | [历史版本](#历史版本) |

> [!WARNING] 此插件最低支持版本为 Serein `v1.3.3`  
> 已知在 `v1.3.3` 及以前版本 解绑 返回值有误，可以解绑但不会显示返回值  
> 低版本未经测试，可能存在未知 bug

## 功能

-   手动、自动 **同步 Serein 的成员管理 与 服务器白名单**_（关服时也能绑定，可选择是否开启）_
-   群成员发送消息 **绑定/解绑自己的成员管理**_（可选择是否开启）_
-   群管理发送消息 **添加/删除其他人的成员管理** _（管理为 Serein 管理权限列表的）_
-   **将 Serein 成员管理设为外置服务器白名单**_（使用 llbds 且关闭 bds 内置白名单可开启）_
-   退群后自动删除该成员管理的数据*（可选择是否开启）*
-   绑定后自动修改群名片为 XboxID*（需管理员权限，可选择是否开启）*
-   排除监听指定群聊，可以单独开个服务器玩家群用于管理玩家
-   服务器启动时自动同步成员管理，关服也能增删白名单
-   ...

## 使用方法

### 绑定

-   群成员发送：`绑定 xboxID`
-   使自己 QQ 与该游戏 id 绑定，并获得白名单*（可选择是否开启）*
-   相同关键词：`bind`

### 解绑

-   群成员发送：`解绑`
-   使自己 QQ 与已绑定游戏 id 解绑，并删除白名单（可选择是否开启）
-   相同关键词：`unbind`

![1](BetterWhitelist/1.png ":size=300")

### 添加白名单

-   管理员发送：`添加白名单 QQ 号(@成员) xboxID`
-   使该 QQ 与游戏 id 绑定，并获得白名单
-   相同关键词：`wladd`、`whitelistadd`

### 删除白名单

-   管理员发送：`删除白名单 QQ 号(@成员) xboxID`
-   使该 QQ 与游戏 id 绑定，并获得白名单
-   相同关键词：`wldel`、`whitelistdelete`

![2](BetterWhitelist/2.png ":size=300")

### 白名单列表

-   管理员发送：`白名单列表`
-   列出 Serein 成员管理列表，并显示是否添加服务器白名单
-   相同关键词：`wllist`、`whitelist`

![3](BetterWhitelist/3.png ":size=300")  
![4](BetterWhitelist/4.png ":size=300")

### 同步白名单

-   管理员发送：`同步白名单`
-   以 Serein 成员管理为准，自动添加/删除服务器白名单。
-   相同关键词：`syncwl`、`syncwhitelist`

![5](BetterWhitelist/5.png ":size=300")

## 特征

拥有完善的白名单增删逻辑及各种防呆设计

![6](BetterWhitelist/6.png ":size=300")
![7](BetterWhitelist/7.png ":size=300")

## 配置文件

-   3 与 4 选一个开即可

![8](BetterWhitelist/8.png)

## 历史版本

-   2023.2.26 [v1.4](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/publish/JS/BetterWhitelist/v1.4/BetterWhitelist.js)
-   2023.2.3 [v1.3](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/publish/JS/BetterWhitelist/v1.3/BetterWhitelist.js)
-   2023.2.3 [v1.2](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/publish/JS/BetterWhitelist/v1.2/BetterWhitelist.js)
-   2023.1.18 [v1.1](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/publish/JS/BetterWhitelist/v1.1/BetterWhitelist.js)
-   2023.1.18 [v1.0](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/publish/JS/BetterWhitelist/v1.0/BetterWhitelist.js)
