---
title: 命令助手
authors: 
  - Zaitonn
tags: [JS,前置]
date: 2023.4.30
---

<p style={{
  textAlign: 'center',
  display:'flex',
  justifyContent: 'center',
  alignItems: 'center'}}>

<img
  src="/img/CommandHelper/CommandHelper.png"
  style={{imageRendering: 'pixelated',width: '80px'}}
  alt="logo"/>

<span
  style={{fontSize:'30px',fontWeight:'bolder'}}>
COMMANDHELPER

</span>
</p>

---

![控制台](/img/CommandHelper/1.png)

- 提供快捷的命令注册功能
  - 支持填写插件介绍
  - 限定权限
  - 多个触发关键词
- 支持输出帮助菜单
  - 默认注册关键词为`help`和`帮助`

<!--truncate-->

## 安装方法

1. 下载[`CommandHelper.js`](#历史版本)后放到`plugins`文件夹下
2. 将其他插件放在同目录下

## 开发

1. 下载[模板和自动补全](#历史版本)两个文件后放到`plugins`文件夹下
2. 打开编辑`function callback()`和命令介绍
3. 重新加载插件

```js {10-16,21} title='template.js'
/// <reference path="CommandHelper.d.ts"/>

serein.setListener('onPluginsLoaded', () => {
    /** @type {CHregCommand} */
    const CHregCommand = serein.import('CHregCommand');
    if (!CHregCommand)
        throw new Error('你需要安装`CommandHelper.js`');

    CHregCommand({
        name: '你好世界',            // 命令名称
        keywords: ['test'],         // 触发关键词
        callback: callback,         // 回调函数
        needAdmin: false,           // 是否需要管理权限
        description: ['一个模板'],   // 以string[]储存，一行一条
        author: 'Zaitonn',          // 作者
        version: '0.0'              // 版本
    });
});

function callback(packetBody) { // packetBody结构见下
    return $`Hello World, ${packetBody.sender.card}`;
}
```

```ts title="CommandHelper.d.ts"
// https://docs.go-cqhttp.org/event/#%E7%BE%A4%E6%B6%88%E6%81%AF

declare interface Sender {
    age: number;
    area: string;
    card: string;
    level: string;
    nickname: string;
    role: string;
    sex: string;
    title: string;
    user_id: number;
}

declare interface Packet {
    post_type: string;
    message_type: string;
    time: number;
    self_id: number;
    sub_type: string;
    message_seq: number;
    message_id: number;
    font: number;
    group_id: number;
    message: string;
    raw_message: string;
    sender: Sender;
    user_id: number;
    anonymous?: any;
}
```

:::tip
你可以参考以下插件

- [一言](OneWord)
- [随机涩图](setu)
- [随机草图](meme)
:::

## 历史版本

- 2023.4.19 v1.0
  - [`CommandHelper.js` - 本体](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/5bf23e0c3666087a1faca1ada4064781b9d50c20/JS/CommandHelper/v1.0/CommandHelper.js)
  - [`template.js` - 模板](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/5bf23e0c3666087a1faca1ada4064781b9d50c20/JS/CommandHelper/v1.0/template.js)
  - [`CommandHelper.d.ts` - 自动补全](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/5bf23e0c3666087a1faca1ada4064781b9d50c20/JS/CommandHelper/v1.0/CommandHelper.d.ts)
