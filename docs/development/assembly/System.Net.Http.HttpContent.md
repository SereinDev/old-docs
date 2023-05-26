# `HttpContent`

HTTP实体正文和内容标头的基类

## 属性

### `Headers`

[HttpContentHeaders](https://learn.microsoft.com/zh-cn/dotnet/api/system.net.http.headers.httpcontentheaders?view=net-6.0)

RFC 2616中定义的HTTP内容标头

## 派生类

### `ByteArrayContent`

基于字节数组的HTTP内容

- `new ByteArrayContent(content: number[])`
  - `content` 初始化ByteArrayContent的内容
- `new ByteArrayContent(content: number[], offset: number, count:number)`
  - `offset` 偏移量（以字节为单位）
  - `count` 从`offset`参数开始的字节数

### `StreamContent`

基于流提供HTTP内容

- `new StreamContent(content: System.IO.Stream)`
  - `content` 初始化StreamContent的内容

### `StringContent`

基于字符串提供 HTTP 内容

- `new StringContent(content: string)`
  - `content` 初始化StringContent的内容
- `new StringContent(content: string, encoding: Encoding)`
  - `encoding` 内容的编码

### `MultipartContent`

使用`multipart/*`内容类型规范进行序列化的HTTP内容

- `new MultipartContent()`
- `new MultipartContent(subtype: string)`
  - `subtype` 多部分内容的子类型
- `new MultipartContent(subtype: string, boundary: string)`
  - `boundary` 多部分内容的边界字符串

#### 方法

##### 添加多部分HTTP内容到HttpContent对象的集合

`Add(content: HttpContent)`

- 参数
  - `content` 要添加到集合中的 HTTP 内容
- 返回
  - 空

### `MultipartFormDataContent`

`multipart/form-data`MIME类型的HTTP内容

- `new MultipartFormDataContent()`
- `new MultipartFormDataContent(boundary: string)`
  - `boundary` 多部分内容的边界字符串

#### 方法

##### 向序列化为`multipart/form-data`MIME类型的HttpContent对象集合添加HTTP内容

`Add(content: HttpContent)`  
`Add(content: HttpContent, name: string)`
`Add(content: HttpContent, name: string, fileName: string)`

- 参数
  - `content` 要添加到集合中的HTTP内容
  - `name` 要添加的HTTP内容的名称
  - `fileName` 要添加到集合中的HTTP内容的文件名
- 返回
  - 空
