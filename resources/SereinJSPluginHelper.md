---
title: 插件开发助手
authors: 
  - Zaitonn
image: SereinJSPluginHelper/1.png
tags: [JS,开发]
date: 2023.4.23
---

提供代码片段补全等功能

<!--truncate-->

![SereinJSPluginHelper](/img/SereinJSPluginHelper/1.png)

## 使用方法

1. 建议使用[Visual Studio Code](https://code.visualstudio.com/)编写插件
2. 将此文件夹复制到`plugins`下，目录结构示意如下

  ```txt
  ├─Serein-??.exe
  └─plugins
    └─SereinJSPluginHelper
            index.d.ts
            ………（其他.d.ts文件）
  ```

3. 在你的插件第一行加上下面这两行
     - `v1.3.4.1`+

      ```js
      /// <reference path="SereinJSPluginHelper/index.d.ts"/>
      /// @ts-check
      ```
     - `v1.3.4`及以前版本
      ```js
      /// <reference path="SereinJSPluginHelper.js"/>
      ```

4. 然后你就可以快乐地写插件了，这时候就可以自动补全和显示函数参数了！！

## 历史版本

- 2023.4.23 [v1.3.4+](https://github.com/Zaitonn/Serein-Docs/releases/tag/SereinJSPluginHelper)
- 2023.2.25 [v1.3.4](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/5bf23e0c3666087a1faca1ada4064781b9d50c20/JS/SereinJSPluginHelper/v1.3.4/SereinJSPluginHelper.js?download)
- 2023.1.15 [v1.3.3](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/5bf23e0c3666087a1faca1ada4064781b9d50c20/JS/SereinJSPluginHelper/v1.3.3/SereinJSPluginHelper.js?download)
