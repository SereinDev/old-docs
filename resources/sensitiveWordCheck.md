---
title: 敏感词检测
authors: 
  - Zaitonn
tags: [JS,工具]
date: 2023.4.23
---

自动对含有敏感词的消息进行屏蔽和撤回

<!--truncate-->

## 功能

对含有敏感词的消息进行屏蔽和撤回

:::caution
当前匹配模式为傻瓜式匹配，即直接判断发言内容是否包括词库中的字符串，__这意味着可能误判（比如对`java`中的`**`敏感__）

如果你有更好的算法也可以自行更改文件中的`checkSensitiveWord`函数
:::

### 奖惩机制

- 初始状态下每个用户的分数均为0
- 被检测出一次敏感词分数加1
  - 自动撤回
  - 当分数大于5时自动禁言，时长为`(用户分数-5)*3`（分钟）
- 当发送了一条没有敏感词的文本时且分数大于0，则分数-0.02

## 使用方法

1. 将敏感词词库放到`plugins/sensitiveWordCheck`文件夹下  
   且确保你的词库满足以下要求
   - 为每行一条
   - 以`UTF-8`格式纯文本保存
   - 文件名后缀为`.txt`
    ```txt title="plugins/sensitiveWordCheck/敏感词.txt"
    敏感词1
    敏感词1
    敏感词3
    ```
2. 重新加载插件导入词库
3. **赋予机器人管理员权限**

:::tip
几个可用的敏感词库

- [gh203322/SensitiveWords](https://github.com/gh203322/SensitiveWords/blob/master/src/main/resources/sensitive.txt)
- [chason777777/mgck](https://github.com/chason777777/mgck)
:::

## 历史版本

- 2023.4.23 [v1.0](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/5bf23e0c3666087a1faca1ada4064781b9d50c20/JS/sensitiveWordCheck/v1.0/sensitiveWordCheck.js)
