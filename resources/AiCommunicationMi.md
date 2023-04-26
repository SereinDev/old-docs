---
title: AI聊天（小米）
slug: AiCommunicationMi
authors: 
  - Zaitonn
tags: [JS,娱乐]
date: 2023.4.26
---

使用小米的api实现AI聊天

![聊天记录](/img/AiCommunicationMi/1.JPG)

<!--truncate-->

## 功能

- [x] ai聊天
  - [x] 文字回复
  - [x] 语音回复
- [x] 自定义冷却时间

## 使用方法

1. 下载安装
2. 加载后按照提示修改配置文件后重新加载
3. 在群里发送 `ai`+聊天内容 来对话

### 使用文字回复

将配置文件中的`useRecord`改为`false`

### 使用语音回复

:::note
此教程仅适用于`go-cqhttp`，其他机器人框架请参考框架文档自行配置
:::

1. 从[BtbN/FFmpeg-Builds](https://github.com/BtbN/FFmpeg-Builds/releases)下载符合系统类型的文件
2. 解压后放到`go-cqhttp`的同目录下 或 将 解压后的文件夹的路径添加到`%PATH%`环境变量中  
  :::info
  这一步是为了使`go-cqhttp`实现通过链接发送语音
  :::
3. 将配置文件中的`useRecord`改为`true`

## 配置文件说明

```json title='plugins/AiCommunicationMi/config.json'
{
  "useRecord": true,    // 使用语音回复
  "cooldownTime": 2000  // 冷却时间（毫秒）
}
```

## 已知BUG

- api有时候响应时间过长
- api有时候不能正确返回文本

## 历史版本

- 2023.4.26 [v1.0](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/c2a97e32b8597672d5447339fe38811714a1cb86/JS/AiCommunicationMi/AiCommunicationMi.js)
