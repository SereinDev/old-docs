
# 介绍

>Serein JS插件的详细文档

## JS标准

ECMAScript 2022

>具体特性支持列表详见👉[sebastienros/jint](https://github.com/sebastienros/jint#version-3x)

>[!ATTENTION]
>以下情况将导致Serein无响应或崩溃
>
> - 以极快的速度重复执行语句
> - 无限递归导致爆栈

## 特色

![插件特色](../../imgs/jsfeature.png)

由于JS引擎的特性，你可以导入NET几乎所有的命名空间以及其对象、类、方法和属性

`importNamespace(name:String)` 导入命名空间

或直接使用

`{命名空间}`（如`System.IO.File`）

>[!TIP] 配合一定C#基础食用更佳  
>C#语法详见 [.NET API 浏览器](https://learn.microsoft.com/zh-cn/dotnet/api/)
>
>```js
>// https://learn.microsoft.com/zh-cn/dotnet/api/system.io.file
>var File = System.IO.File;
>File.WriteAllText(
>    "1.txt", // 路径
>    "一些文本"// 文本
>);
>// 输出到文件
>```
>
>```js
>// https://learn.microsoft.com/zh-cn/dotnet/api/system.diagnostics.process
>var Process = System.Diagnostics.Process;
>Process.Start("cmd.exe");
>// 启动cmd.exe
>```

>[!TIP]
>
>- 在[这里](Extension/#/JS/Example.md ":ignore")你可以找到更详细的示例
>- 部分命名空间需要设置[预加载配置](Function/JSDocs/PreLoadConfig.md)后才能导入

>[!NOTE]找不到想要的方法？有更好的建议？速速[联系作者](More/About.md#反馈)

## JS插件开发助手

>详见[SereinJSPluginHelper](Extension/#/JS/SereinJSPluginHelper ':ignore')
