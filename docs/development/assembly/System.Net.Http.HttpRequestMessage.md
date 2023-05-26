# `HttpRequestMessage`

一条HTTP请求消息

## 构造函数

- `new HttpRequestMessage()`
- `new HttpRequestMessage(method: HttpMethod, requestUri: string)`
  - `method` HTTP方法（可以为以下的值）
    - `HttpMethod.Delete`
    - `HttpMethod.Get`
    - `HttpMethod.Head`
    - `HttpMethod.Options`
    - `HttpMethod.Patch`
    - `HttpMethod.Post`
    - `HttpMethod.Put`
    - `HttpMethod.Trace`
    - `new HttpMethod(method: string)` 使用指定的HTTP方法初始化HttpMethod类的新实例
  - `requestUri` 请求发送到的URI

## 属性

### `Content`

[`HttpContent`](System.Net.Http.HttpContent)

HTTP消息的内容

### `Headers`

`HttpResponseHeaders`

HTTP内容标头

### `Method`

`HttpMethod`

请求消息使用的HTTP方法
