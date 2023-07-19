---
title: 文件读写模块
authors: 
  - Zaitonn
tags: [JS,开发,模块]
date: 2023.6.7
---

通过文件读写移动等操作的函数封装

<!--truncate-->

## 函数内容

- 文件
  - 创建
    - 写入
    - 追加
  - 读取
  - 删除
  - 移动
  - 重命名
  - 复制
  - 是否存在
  - 获取
    - 创建时间
    - 访问时间
    - 写入时间
    - 扩展名
    - 无扩展名文件名
    - 文件名
    - 完整目录
    - 父目录
- 目录
  - 创建
  - 删除
  - 移动
  - 获取
    - 文件
    - 目录
  - 是否存在

## 使用方法

## 安装

将`stdio.js`放在plugins/modules下即可

### 开发

1. 将`stdio.js`和`stdio.d.ts`放在plugins/modules下
2. 在插件中写入
   ```js
   const { /* 此处填你需要导入的函数名称 */ } = require('./modules/stdio.js');
   ```
3. 快乐地编写插件

<details>
  <summary>声明文件（stdio.d.ts）</summary>

```ts
/**
 * 确定指定的文件是否存在
 * @param path 文件名
 * @returns 如果调用方具有要求的权限并且`path`包含现有文件的名称，则为`true`；否则为`false`。如果`path`为`null`（一个无效路径或零长度字符串）,则此方法也将返回`false`。如果调用方不具有读取指定文件所需的足够权限，则不引发异常并且该方法返回 false，这与 path 是否存在无关
 */
export declare function existFile(path: string): boolean;
/**
 * 将指定的字符串追加到文件中，如果文件还不存在则创建该文件
 * @param path 要将指定的字符串追加到的文件
 * @param content 要追加到文件中的字符串
 * @param encoding 要使用的字符编码
 */
export declare function appendTextToFile(path: string, content: string, encoding?: any): void;
/**
 * 向一个文件中追加行，然后关闭该文件
 * @param path 要向其中追加行的文件。 如果文件尚不存在，则创建该文件
 * @param content 要追加到文件中的行
 * @param encoding 要使用的字符编码
 */
export declare function appendLinesToFile(path: string, content: string[], encoding?: any): void;
/**
 * 将现有文件复制到新文件。 允许覆盖同名的文件
 * @param sourceFileName 要复制的文件
 * @param destFileName 目标文件的名称。 不能是目录
 * @param overwrite 如果可以覆盖目标文件，则为`true`；否则为`false`
 */
export declare function copyFile(sourceFileName: string, destFileName: string, overwrite?: boolean): void;
/**
 * 删除指定的文件
 * @param path 要删除的文件的名称。 不支持通配符
 */
export declare function deleteFile(path: string): void;
/**
 * 返回指定文件或目录的创建日期和时间
 * @param path 要获取其创建日期和时间信息的文件或目录
 * @returns 一个 DateTime 结构，它被设置为指定文件或目录的创建日期和时间。 该值用本地时间表示
 */
export declare function getFileCreationTime(path: string): Date;
/**
 * 返回指定文件或目录的上次访问日期和时间
 * @param path 要获取其访问日期和时间信息的文件或目录
 * @returns 一个`DateTime`结构，它被设置为上次访问指定文件或目录的日期和时间。 该值用本地时间表示
 */
export declare function getFileLastAccessTime(path: string): Date;
/**
 * 返回上次写入指定文件或目录的日期和时间
 * @param path 要获取其写入日期和时间信息的文件或目录
 * @returns 一个`DateTime`结构，它被设置为上次写入指定文件或目录的日期和时间。 该值用本地时间表示
 */
export declare function getFileLastWriteTime(path: string): Date;
/**
 * 将指定文件移动到新位置，提供指定新文件名和覆盖目标文件（如果它已存在）的选
 * @param sourceFileName 要移动的文件的名称。 可以包括相对或绝对路径
 * @param destFileName 文件的新路径和名称
 * @param overwrite 如果要覆盖目标文件（如果它已存在），则为`true`；否则为`false`
 */
export declare function moveFile(sourceFileName: string, destFileName: string, overwrite?: boolean): void;
/**
 * 重命名指定文件
 * @param sourceFileName 要重命名的文件的名称。 可以包括相对或绝对路径
 * @param destFileName 文件的新路径和名称
 */
export declare function renameFile(sourceFileName: string, destFileName: string): void;
/**
 * 打开一个文本文件，读取文件的所有行，然后关闭该文件
 * @param path 要打开以进行读取的文件
 * @param encoding 要使用的字符编码
 * @returns 包含文件所有行的字符串数组
 */
export declare function readAllLinesFromFile(path: string, encoding?: any): string[];
/**
 * 打开一个文件，使用指定的编码读取文件中的所有文本，然后关闭此文件
 * @param path 要打开以进行读取的文件
 * @param encoding 要使用的字符编码
 * @returns 包含文件中所有文本的字符串
 */
export declare function readAllTextFromFile(path: string, encoding?: any): string[];
/**
 * 创建一个新文件，使用指定编码在其中写入指定的字符串数组，然后关闭该文件。
 * @param path 要写入的文件
 * @param content 要写入文件的字符串数组
 * @param encoding 要使用的字符编码
 */
export declare function writeLinesToFile(path: string, content: string[], encoding?: any): void;
/**
 * 创建一个新文件，向其中写入指定的字符串，然后关闭文件。 如果目标文件已存在，则覆盖该文件
 * @param path 要写入的文件
 * @param contents 要写入文件的字符串
 * @param encoding 要使用的字符编码
 */
export declare function writeAllTextToFile(path: string, contents?: string, encoding?: any): void;
/**
 * 是否存在文件夹
 * @param {string} path 文件夹名
 * @returns {boolean}
 */
export declare function existDirectory(path: string): boolean;
/**
 * 在指定路径中创建所有目录和子目录，除非它们已经存在
 * @param path 要创建的目录
 */
export declare function createDirectory(path: string): void;
/**
 * 删除指定的目录，并删除该目录中的所有子目录和文件（如果表示）
 * @param path 要删除的目录的名称
 */
export declare function deleteDirectory(path: string): void;
/**
 * 将文件或目录及其内容移到新位置
 * @param sourceDirName 要移动的文件或目录的路径
 * @param destDirName 其内容的新位置`sourceDirName`的路径。如果`sourceDirName`是文件，那么`destDirName`也必须是文件名
 */
export declare function moveDirectory(sourceDirName: string, destDirName: string): void;
/**
 * 返回指定目录中文件的名称（包括其路径）
 * @param path 要搜索的目录的相对或绝对路径。 此字符串不区分大小写
 * @param searchPattern 要与`path`中的文件名匹配的搜索字符串。此参数可以包含有效文本路径和通配符[`*`(*该位置中的零个或多个字符*)和`?`(*该位置恰好是一个字符*)]的组合，但不支持正则表达式
 * @param searchOption 用于指定搜索操作是应包含所有子目录还是仅包含当前目录的枚举值之一
 * @returns 指定目录中与指定的搜索模式和选项匹配的文件的完整名称（包含路径）的数组；如果未找到任何文件，则为空数组
 */
export declare function getFiles(path: string, searchPattern?: string, searchOption?: any): string[];
/**
 * 返回满足指定条件的子目录的名称
 * @param path 要搜索的目录的相对或绝对路径。 此字符串不区分大小写
 * @param searchPattern 要与`path`中的文件名匹配的搜索字符串。此参数可以包含有效文本路径和通配符[`*`(*该位置中的零个或多个字符*)和`?`(*该位置恰好是一个字符*)]的组合，但不支持正则表达式
 * @param searchOption 用于指定搜索操作是应包含所有子目录还是仅包含当前目录的枚举值之一
 * @returns 指定目录中与指定的搜索模式和选项匹配的文件的完整名称（包含路径）的数组；如果未找到任何文件，则为空数组
 */
export declare function getDirectories(path: string, searchPattern?: string, searchOption?: any): string[];
/**
 * 确定指定的文件或目录是否存在
 * @param path 要检查的路径
 * @returns 如果调用方具有所需的权限，并且`path`包含现有文件或目录的名称，则为`true`；否则为`false`。如果`path`为`null`（一个无效路径或零长度字符串）,则此方法也将返回`false`。如果调用方没有足够的权限读取指定的路径，则不会引发异常，并且该方法将返回`false`，而不管是否存在`path`
 * @summary 与此方法`existFile`不同：现有非常规文件（如管道），此方法返回`true`。如果路径面向现有链接，但链接的目标不存在，则返回`true`。
 */
export declare function existFileOrDirectory(path: string): boolean;
/**
 * 返回指定路径的目录信息
 * @param path 文件或目录的路径
 * @returns `path`的目录信息；如果`path`表示根目录或为`null`，则为`null`。如果`path`不包含目录信息，则返回`''`
 */
export declare function getDirectoryName(path: string): string | null;
/**
 * 返回指定路径字符串的文件名和扩展名
 * @param path 从中获取文件名和扩展名的路径字符串
 * @returns `path`中最后的目录分隔符后的字符。如果`path`的最后一个字符是目录或卷分隔符，则此方法返回`''`。如果`path`为`null`，则此方法返回`null`
 */
export declare function getFileName(path: string): string | null;
/**
 * 返回指定路径字符串的扩展名（包括句点“.”）
 * @param path 从中获取扩展名的路径字符串
 * @returns 指定路径的扩展名（包含句点“.”）、或`null`、或`''`
 */
export declare function getExtension(path: string): string | null;
/**
 * 返回不具有扩展名的指定路径字符串的文件名
 * @param path 文件的路径
 * @returns 不包括最后一个句点(.)及其后面的所有字符
 */
export declare function getFileNameWithoutExtension(path: string): string | null;
/**
 * 返回指定路径字符串的绝对路径
 * @param path 要获取其绝对路径信息的文件或目录
 * @param basePath 完全限定路径的开头
 * @returns `path`的完全限定的位置，例如“C:\MyFile.txt”
 */
export declare function getFullPath(path: string, basePath?: string): string;

```

</details>

## 历史版本

- 2023.6.7 v1.1
  - [**`stdio.js`**](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/120dd9cb471185fb612ef9eb6c6e4fbdac730bba/JS/Modules/stdio/stdio.js?d) 编译后的文件
  - [`stdio.d.ts`](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/120dd9cb471185fb612ef9eb6c6e4fbdac730bba/JS/Modules/stdio/stdio.d.ts?d) 类型声明文件
  - [`stdio.ts`](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/120dd9cb471185fb612ef9eb6c6e4fbdac730bba/JS/Modules/stdio/stdio.ts?d) TypeScript源码
- 2023.5.22 v1.0
  - [`stdio.js`](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/df039a122e6f82db370a87fe05c1245f8c635c77/JS/Modules/stdio/stdio.js?d) 编译后的文件
  - [`stdio.d.ts`](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/df039a122e6f82db370a87fe05c1245f8c635c77/JS/Modules/stdio/stdio.d.ts?d) 类型声明文件
  - [`stdio.ts`](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/df039a122e6f82db370a87fe05c1245f8c635c77/JS/Modules/stdio/stdio.ts?d) TypeScript源码
