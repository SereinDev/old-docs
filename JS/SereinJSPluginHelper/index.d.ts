/// ---------- 函数 ----------
/// <reference path="serein.d.ts"/>
/// <reference path="server.d.ts"/>
/// <reference path="msg.d.ts"/>
/// <reference path="system.d.ts"/>
/// <reference path="binder.d.ts"/>
/// <reference path="exportFix.js"/>

/// ---------- 类型 ----------
/// <reference path="classes.d.ts"/>

/**
 * # Serein JS插件辅助
 * 
 * ## 使用方法
 * 
 * 1. 建议使用[Visual Studio Code](https://code.visualstudio.com/)编写插件
 * 2. 将此文件夹复制到`plugins`下，目录结构示意如下
 * ```txt
 * ├─Serein-??.exe
 * └─plugins
 *    └─SereinJSPluginHelper
 *           index.d.ts
 *           ………（其他.d.ts文件）
 * ```
 * 3. 在你的插件第一行加上下面这两行
 * ```js
 * /// <reference path="SereinJSPluginHelper/index.d.ts"/>
 * /// @ts-check
 * ```
 * 4. 然后你就可以快乐地写插件了，这时候就可以自动补全和显示函数参数了！！
 * 
 * ## 更多介绍
 * 
 * 👉 https://market.serein.cc/resources/SereinJSPluginHelper
 * @version `v1.3.4.1 0426`
 */
declare namespace serein {
    /**
     * 所在文件夹路径
     */
    const path: string

    /**
     * Serein版本
     */
    const version: 'v1.3.4'

    /**
     * JS命名空间
     */
    const namespace: string

    /**
     * 启动时间
     */
    const startTime: Date

    /**
     * Serein类型
     * @enum `0` - 控制台
     * @enum `1` - Winform
     * @enum `2` - WPF
     */
    const type: 0 | 1 | 2

    /**
     * Serein类型名称
     */
    const typeName: 'console' | 'winform' | 'wpf'
}

/**
 * 导入命名空间
 * @param {string} namespace 命名空间名称
 * @returns {any} 命名空间对象
 */
declare const importNamespace: (namespace: string) => any;

/**
 * .Net System对象
 */
declare const System: any;
