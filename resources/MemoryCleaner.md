---
title: 内存清理
authors: 
  - Zaitonn
tags: [JS,工具]
date: 2023.7.16
---

一个功能强大的内存清理插件（Serein专用）

<!--truncate-->

## 功能

定时调用NET的垃圾清理函数，从而实现减小内存占用

## 使用方法

丢`plugins`文件夹下即可

### 自定义清理周期

右键编辑，按照注释修改数字即可

```js title="MemoryCleaner.js"
// 你可以按需调整内存清理的间隔，单位为ms
// highlight-next-line
setInterval(() => System.GC.Collect(), 20000);
serein.registerPlugin('内存清理', serein.version, 'Zaitonn', 'Only For Serein.');
```

## 历史版本

- [2023.7.16](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/ecb067a0d335349329659c387e73a9e5f7c1339e/JS/MemoryCleaner/MemoryCleaner.js?d)
