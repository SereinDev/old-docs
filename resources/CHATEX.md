---
title: 聊天转发增强
slug: CHATEX
authors: 
  - Zaitonn
tags: [JS,工具]
date: 2023.4.23
---

对群聊消息互通提供更多增强功能

<!--truncate-->

## 功能

- [x] 自动检测服务器状态和人数，仅当服务器有玩家在线时才会转发，避免控制台刷屏
- [x] 自动替换CQ码
- [x] 自定义消息触发前缀
- [x] 替换名称和消息中的`§`的字符，防止玩家发言五颜六色
- [x] 自定义转发模板
  - `{{time}}` 本地短时间
  - `{{name}}` 用户名称
  - `{{id}}` 用户ID（QQ号）
  - `{{msg}}` 消息内容
- [x] 替换`@`
  - 若`enableGameID`开启则替换为绑定的ID
  - 其他情况下替换为发言的ID（群名片或昵称）

## 使用方法

删除或禁用原有的正则即可

## 配置文件说明

```json title='CHATEX/config.json'
{
    "disableColorSymbol": true,                   // 禁用颜色代码
    "enableGameID": true,                         // 启用游戏ID转换
    "ignore": [],                                 // 忽略的群聊列表
    "prefix": "",                                 // 触发前缀
    "template": "§b[{{time}}]§r{{name}}:{{msg}}", // 发送模板
    "cqCode": {                                   // CQ码替换字典
        "[CQ:face]": "[表情]",
        "[CQ:reply]": "[回复]",
        "[CQ:image]": "[图片]",
        "[CQ:video]": "[视频]",
        "[CQ:record]": "[语音]",
        "[CQ:music]": "[音乐]",
        "[CQ:redbag]": "[红包]",
        "[CQ:forward]": "[合并转发消息]",
        "[CQ:node]": "[合并转发消息]",
        "[CQ:xml]": "[XML卡片]",
        "[CQ:json]": "[JSON卡片]"
    }
}
```

## 历史版本

- 2023.4.23 [v1.3](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/5bf23e0c3666087a1faca1ada4064781b9d50c20/JS/CHATEX/v1.3/CHATEX.js)
- 2023.1.12 [v1.2](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/5bf23e0c3666087a1faca1ada4064781b9d50c20/JS/CHATEX/v1.2/CHATEX.js)
