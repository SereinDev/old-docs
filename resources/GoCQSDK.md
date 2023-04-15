---
title: GoCQAPI封装
slug: GoCQSDK
authors: 
  - Zaitonn
tags: [JS,开发,模块]
date: 2023.2.25
---

提供所有的GOCQAPI封装

![示例](/img/GoCQSDK/1.png)  
![示例](/img/GoCQSDK/2.png)

<!--truncate-->

## 食用方法

1. 在GoCQ的配置文件里添加HTTP服务器项
2. 下载后放入`plugins/modules`
3. 你需要在使用该模块的插件的`PreLoadConfig.json`中`Assemblies`字段添加`System.Net.Http`项

## 开发

1. 下载后放入`plugins/modules`
2. 在你的代码里第一行加上`const SDKInstance = require('./modules/GoCQSDK.js').SDKInstance`;
3. 然后new一个实例就能用了

```js
// 例子：

const SDKInstance = require('./modules/GoCQSDK.js').SDKInstance;

let instance = new SDKInstance();
instance.send_private_msg(10001, '麻花疼我真的好喜欢你呀');
instance.dispose(); // 建议加上这行，执行后会释放HttpClient资源
```

- 有啥不会直接看源码，函数名和参数名都有标注
- 只有标注`@returns`的函数有返回值
- 建议使用Visual Code Studio开发
- 一切以GoCQ文档为准

## 历史版本

- 2023.2.25 [v1.1](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/publish/JS/Modules/GoCQSDK/v1.1/GoCQSDK.js)
  - 需要Serein v1.3.4及以上
- 2023.2.3 [v1.0](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/publish/JS/Modules/GoCQSDK/v1.0/GoCQSDK.js)
  - 需要Serein v1.3.4及以上
