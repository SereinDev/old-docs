# 🌰 System.IO

包含允许读写文件和数据流的类型以及提供基本文件和目录支持的类型

:::tip

- 你可以查看[文件读写模块](https://market.serein.cc/resources/stdio)作为参考
- 此章节中默认已导入以下命名空间
  ```js
  const {
    IO: {
        File,
        Directory,
        Path,
        SearchOption
    },
    Text: {
        Encoding
    } } = System;
  ```
:::

>参考 [System.IO 命名空间](https://learn.microsoft.com/zh-cn/dotnet/api/system.io)

## 确定指定的文件是否存在

`File.Exists(path: string)`

- 参数
  - `path` 文件名
- 返回
  - `boolean`
    - 如果调用方具有要求的权限并且`path`包含现有文件的名称，则为`true`；否则为`false`。如果`path`为`null`（一个无效路径或零长度字符串），则此方法也将返回`false`。如果调用方不具有读取指定文件所需的足够权限，则不引发异常并且该方法返回 `false`，这与`path`是否存在无关

## 将指定的字符串追加到文件中

`File.AppendAllText(path: string, content: string[])`  
`File.AppendAllText(path: string, content: string, encoding: Encoding)`

- 参数
  - `path` 要将指定的字符串追加到的文件
  - `content` 要追加到文件中的字符串
  - `encoding` 要使用的字符编码
- 返回
  - 空

## 向一个文件中追加行

`File.AppendAllLines(path: string, content: string[])`  
`File.AppendAllLines(path: string, content: string[], encoding: Encoding)`

- 参数
  - `path` 要将指定的字符串追加到的文件
  - `content` 要追加到文件中的行
  - `encoding` 要使用的字符编码
- 返回
  - 空

## 将现有文件复制到新文件

`File.Copy(sourceFileName: string, destFileName: string)`  
`File.Copy(sourceFileName: string, destFileName: string, overwrite: boolean)`

- 参数
  - `sourceFileName` 要复制的文件
  - `destFileName` 目标文件的名称。不能是目录
  - `overwrite` 如果可以覆盖目标文件，则为`true`；否则为`false`
- 返回
  - 空

## 删除指定的文件

`File.Delete(path: string)`

- 参数
  - `path` 要删除的文件的名称。不支持通配符
- 返回
  - 空

## 返回指定文件或目录的创建日期和时间

`File.GetCreationTime(path: string): Date`

- 参数
  - `path` 要获取其创建日期和时间信息的文件或目录
- 返回
  - `Date`
    - 指定文件或目录的创建日期和时间。该值用本地时间表示

## 返回指定文件或目录的上次访问日期和时间

`File.GetLastAccessTime(path: string): Date`

- 参数
  - `path` 要获取其访问日期和时间信息的文件或目录
- 返回
  - `Date`
    - 指定文件或目录的访问日期和时间。该值用本地时间表示

## 返回上次写入指定文件或目录的日期和时间

`File.GetLastWriteTime(path: string): Date`

- 参数
  - `path` 要获取其写入日期和时间信息的文件或目录
- 返回
  - `Date`
    - 指定文件或目录的写入日期和时间。该值用本地时间表示

## 将指定文件移动到新位置

`File.Move(sourceFileName: string, destFileName: string)`  
`File.Move(sourceFileName: string, destFileName: string, overwrite: boolean)`

- 参数
  - `sourceFileName` 要移动的文件的名称。可以包括相对或绝对路径
  - `destFileName` 文件的新路径和名称
  - `overwrite` 如果要覆盖目标文件（如果它已存在），则为`true`；否则为`false`
- 返回
  - 空

:::tip
你可以使用此方法实现重命名文件
:::

## 打开一个文本文件，读取文件的所有行，然后关闭该文件

`File.ReadAllLines(path: string): string[]`  
`File.ReadAllLines(path: string, encoding: Encoding): string[]`

- 参数
  - `path` 要打开以进行读取的文件
  - `encoding` 要使用的字符编码
- 返回
  - `string[]`
    - 包含文件所有行的字符串数组

## 打开一个文件，使用指定的编码读取文件中的所有文本，然后关闭此文件

`File.ReadAllText(path: string): string`  
`File.ReadAllText(path: string, encoding: Encoding): string`

- 参数
  - `path` 要打开以进行读取的文件
  - `encoding` 要使用的字符编码
- 返回
  - `string`
    - 包含文件中所有文本的字符串

## 创建一个新文件，使用指定编码在其中写入指定的字符串数组，然后关闭该文件

`File.WriteAllLines(path: string, content: string[])`  
`File.WriteAllLines(path: string, content: string[], encoding: Encoding)`

- 参数
  - `path` 要写入的文件
  - `content` 要写入文件的字符串数组
  - `encoding` 要使用的字符编码
- 返回
  - 空

## 创建一个新文件，向其中写入指定的字符串，然后关闭文件。如果目标文件已存在，则覆盖该文件

`File.WriteAllText(path: string, contents?: string)`  
`File.WriteAllText(path: string, contents?: string, encoding: Encoding)`

- 参数
  - `path` 要写入的文件
  - `contents` 要写入文件的字符串
  - `encoding` 要使用的字符编码
- 返回
  - 空

## 是否存在文件夹

`Directory.Exists(path: string): boolean`

- 参数
  - `path` path 文件夹名
- 返回
  - `boolean`

## 在指定路径中创建所有目录和子目录，除非它们已经存在

`Directory.CreateDirectory(path: string)`

- 参数
  - `path` 要创建的目录
- 返回
  - 空

## 删除指定的目录，并删除该目录中的所有子目录和文件

`Directory.Delete(path: string)`

- 参数
  - `path` 要删除的目录的名称
- 返回
  - 空

## 将文件或目录及其内容移到新位置

`Directory.Move(sourceDirName: string, destDirName: string)`

- 参数
  - `sourceDirName` 要移动的文件或目录的路径
  - `destDirName` 其内容的新位置`sourceDirName`的路径
    - 如果`sourceDirName`是文件，那么`destDirName`也必须是文件名
- 返回
  - 空

## 返回指定目录中文件的名称（包括其路径）

`Directory.GetFiles(path: string): string[]`  
`Directory.GetFiles(path: string, searchPattern?: string): string[]`  
`Directory.GetFiles(path: string, searchPattern?: string, searchOption: SearchOption = SearchOption.AllDirectories): string[]`

- 参数
  - `path` 要搜索的目录的相对或绝对路径。此字符串不区分大小写
  - `searchPattern` 要与`path`中的文件名匹配的搜索字符串
    - 此参数可以包含有效文本路径和通配符[`*`(*该位置中的零个或多个字符*)和`?`(*该位置恰好是一个字符*)]的组合，但不支持正则表达式
  - `searchOption` 用于指定搜索操作是应包含所有子目录还是仅包含当前目录的枚举值之一
- 返回
  - `string[]`
    - 指定目录中与指定的搜索模式和选项匹配的文件的完整名称（包含路径）的数组；如果未找到任何文件，则为空数组

## 返回满足指定条件的子目录的名称

`Directory.GetDirectories(path: string): string[]`  
`Directory.GetDirectories(path: string, searchPattern?: string): string[]`  
`Directory.GetDirectories(path: string, searchPattern?: string, searchOption: SearchOption = SearchOption.AllDirectories): string[]`

- 参数
  - `path` 要搜索的目录的相对或绝对路径。此字符串不区分大小写
  - `searchPattern` 要与`path`中的文件名匹配的搜索字符串
    - 此参数可以包含有效文本路径和通配符[`*`(*该位置中的零个或多个字符*)和`?`(*该位置恰好是一个字符*)]的组合，但不支持正则表达式
  - `searchOption` 用于指定搜索操作是应包含所有子目录还是仅包含当前目录的枚举值之一
- 返回
  - `string[]`
    - 指定目录中与指定的搜索模式和选项匹配的文件的完整名称（包含路径）的数组；如果未找到任何文件，则为空数组

## 确定指定的文件或目录是否存在

`Path.Exists(path: string): boolean`

- 参数
  - `path` 要检查的路径
- 返回
  - `boolean`
    - 如果调用方具有所需的权限，并且`path`包含现有文件或目录的名称，则为`true`；否则为`false`。如果`path`为`null`（一个无效路径或零长度字符串）,则此方法也将返回`false`。如果调用方没有足够的权限读取指定的路径，则不会引发异常，并且该方法将返回`false`，而不管是否存在`path`

:::note
与此方法`existFile`不同：现有非常规文件（如管道），此方法返回`true`。如果路径面向现有链接，但链接的目标不存在，则返回`true`
:::

## 返回指定路径的目录信息

`Path.GetDirectoryName(path: string): string | null`

- 参数
  - `path` 文件或目录的路径
- 返回
  - `string`
    - `path`的目录信息；如果`path`表示根目录或为`null`，则为`null`。如果`path`不包含目录信息，则返回`''`

## 返回指定路径字符串的文件名和扩展名

`Path.GetFileName(path: string): string | null`

- 参数
  - `path` 从中获取文件名和扩展名的路径字符串
- 返回
  - `string`
    - `path`中最后的目录分隔符后的字符。如果`path`的最后一个字符是目录或卷分隔符，则此方法返回`''`。如果`path`为`null`，则此方法返回`null` `

## 返回指定路径字符串的扩展名（包括句点“.”）

`Path.GetExtension(path: string): string | null`

- 参数
  - `path` 从中获取扩展名的路径字符串
- 返回
  - `string`
    - 指定路径的扩展名（包含句点“.”）、或`null`、或`''``

## 返回不具有扩展名的指定路径字符串的文件名

`Path.GetFileNameWithoutExtension(path: string): string | null`

- 参数
  - `path` 文件的路径
- 返回
  - `string`
    - 不包括最后一个句点(.)及其后面的所有字符

## 返回指定路径字符串的绝对路径

`Path.GetFullPath(path: string): string`  
`Path.GetFullPath(path: string, basePath: string): string`

- 参数
  - `path` 要获取其绝对路径信息的文件或目录
  - `basePath` 完全限定路径的开头
- 返回
  - `string`
    - `path`的完全限定的位置，例如“C:\MyFile.txt”
