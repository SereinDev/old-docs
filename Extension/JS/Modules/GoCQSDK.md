# GoCQSDK

|     作者     | Zaitonn               |
| :----------: | :-------------------- |
|   **介绍**   | GOCQAPI封装           |
| **更新日期** | 2023.2.3              |
|   **下载**   | [历史版本](#历史版本) |

## 功能

提供几乎所有的GOCQAPI封装

>[!NOTE] 合并转发消息因GET请求无法实现，以后能做再说，可先使用`serein.sendPacket()`代替

## 食用方法

1. 下载后放入`plugins/modules`
2. 你需要在使用该模块的插件的`PreLoadConfig.json`中`AssemblyStrings`字段添加`System.Net.Http`项

## 开发

1. 下载后放入`plugins/modules`
2. 在你的代码里第一行加上`const Instance = require('./modules/GoCQSDK.js').Instance`;
3. 然后new一个实例就能用了

```js
// 例子：

const Instance = require('./modules/GoCQSDK.js').Instance;

let instance = new Instance();
instance.send_private_msg(10001, 'mht我爱你');
instance.dispose();

```

- 有啥不会直接看源码，函数名和参数名都有标注
- 只有标注`@returns`的函数有返回值
- 建议使用Visual Code Studio开发
- 一切以GoCQ文档为准

## 历史版本

- 2023.2.3 [v1.0](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/publish/JS/Modules/GoCQSDK/v1.0/GoCQSDK.js)
  - 需要Serein v1.3.4及以上
