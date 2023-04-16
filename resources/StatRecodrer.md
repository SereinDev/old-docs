---
title: 记录统计信息
slug: StatRecodrer
authors: 
  - Zaitonn
tags: [JS,工具]
date: 2023.4.16
---

自动按时间记录系统信息、在线人数等

<!--truncate-->

:::caution
此插件最低支持版本为`v1.3.4`
:::

## 功能

自动保存当前的系统信息到`plugins/StatRecorder/{日期}.csv`，方便服主统计服务器信息、监控服务器状态

## 统计内容

| 表格标题名            | 对应项          |
| --------------------- | --------------- |
| Time                  | 时间            |
| ServerStatus          | 服务器状态      |
| ServerRunningTime     | 服务器运行时长  |
| ServerProcessCPUUSage | 服务器CPU使用率 |
| OnlinePlayers         | 在线玩家数      |
| CPUUsage              | CPU使用率       |
| UsedRAM               | 已用内存        |
| RAMUsage              | 内存使用率      |
| UploadSpeed           | 上行速度        |
| DownloadSpeed         | 下行速度        |

## 绘制图表

使用`Excel`或其他软件打开CSV文件，选择整个列生成即可

![例子](/img/StatRecodrer/1.png)

## 历史版本

- 2023.4.16 [v1.0](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/publish/JS/StatRecodrer/v1.1/StatRecorder.js)
- 2023.1.13 [v1.0](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/publish/JS/StatRecodrer/v1.0/StatRecorder.js)
