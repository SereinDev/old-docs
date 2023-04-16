---
title: 命令助手
slug: CommandHelper
authors: 
  - Zaitonn
tags: [JS,前置]
date: 2023.4.16
---

![控制台](/img/CommandHelper/1.png)

- 提供快捷的命令注册功能
  - 支持填写插件介绍
  - 限定权限
  - 多个触发关键词
- 支持输出帮助菜单
  - 默认注册关键词为`help`和`帮助`
  ```txt
  # 回复
    ◉ 帮助
        需要管理员权限：否
        显示所有命令及其介绍
        用法：发送 “帮助” | “help”
    ◉ 一言
        需要管理员权限：否
        Hitokoto 一言
  ```

<!--truncate-->

## 安装方法

1. 下载后放到`plugins`文件夹下
2. 将其他插件放在同目录下

## 开发

1. 下载[模板文件](#历史版本)后放到`plugins`文件夹下
2. 打开编辑`function callback()`和命令介绍
3. 重新加载插件

```js {7-11,17}
serein.setListener('onPluginsLoaded', () => {
    const CHregCommand = serein.import('CHregCommand');
    if (!CHregCommand)
        throw new Error('你需要安装`CommandHelper.js`');

    CHregCommand(
        '你好世界',     // 命令名称
        ['test'],       // 触发关键词
        callback,       // 回调函数
        false,          // 是否需要管理权限
        ['一个模板']    // 以string[]储存，一行一条
    );
});

// 参数同 https://serein.cc/docs/development/function/serein#onreceivegroupmessage
function callback (group_id, user_id, msg, shownName) { 
    return 'Hello World'; // 直接返回文本可实现快捷回复
}
```

:::tip
你可以参考这个[一言](OneWord)插件
:::

## 历史版本

- 2023.4.16 [v1.0](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/publish/JS/CommandHelper/v1.0/CommandHelper.js)
  - [模板](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/publish/JS/CommandHelper/v1.0/template.js)
