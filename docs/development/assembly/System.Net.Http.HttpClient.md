# `HttpClient`

提供一个类，用于发送HTTP请求并从URI标识的资源接收HTTP响应

## 主要属性

- `DefaultRequestHeaders: HttpRequestHeaders` 每个请求一起发送的标头
  - `Add(name: string, value?: string)` 添加指定的标头及其值到HttpHeaders集合中
  - `Clear()` 从HttpHeaders集合中移除所有标头
  - `Remove(name: string): boolean` 从HttpHeaders集合中移除指定的标头
  - `TryAddWithoutValidation(name: string, value?: string): boolean` 返回一个值，该值指示是否在不验证提供的信息的情况下将新标头及其值添加到HttpHeaders集合中

## 主要方法

### 取消该实例所有挂起的请求

`CancelPendingRequests()`

- 参数
  - 空
- 返回
  - 空

### 以异步操作将DELETE请求发送给指定URI

`DeleteAsync(requestUri?: string): System.Threading.Tasks.Task<HttpResponseMessage>`

- 参数
  - `requestUri` 请求发送到的URI
- 返回
  - 异步操作的任务对象

:::caution

由于HttpClient并未提供同步的Http请求，所以本章节的方法都是异步的

#### 转换方法

在返回的Task对象后面加上`.GetAwaiter().GetResult()`（此方法适用于所有Net的异步方法

```js
const response = httpClient.DeleteAsync('...').GetAwaiter().GetResult();
```

:::

## 以异步操作将GET请求发送给指定URI

`GetAsync(requestUri?: string): System.Threading.Tasks.Task<HttpResponseMessage>`

- 参数
  - `requestUri` 请求发送到的URI
- 返回
  - 异步操作的任务对象

## 将GET请求发送到指定URI并在异步操作中以字符串的形式返回响应正文

`GetStringAsync(requestUri?: string): System.Threading.Tasks.Task<string>`

- 参数
  - `requestUri` 请求发送到的URI
- 返回
  - 异步操作的任务对象

```js title='等价代码'
const text = httpClient
  .GetAsync('...')
  .GetAwaiter()
  .GetResult()
  .Content
  .ReadAsStringAsync()
  .GetAwaiter()
  .GetResult();
```

## 以异步操作方式将PATCH请求发送到指定为字符串的URI

`PatchAsync(requestUri?: string,content?: HttpContent): System.Threading.Tasks.Task<HttpResponseMessage>`

- 参数
  - `requestUri` 请求发送到的URI
  - `content` 发送到服务器的HTTP请求内容
- 返回
  - 异步操作的任务对象

## 以异步操作方式将POST请求发送到指定为字符串的URI

`PostAsync(requestUri?: string,content?: HttpContent): System.Threading.Tasks.Task<HttpResponseMessage>`

- 参数
  - `requestUri` 请求发送到的URI
  - `content` 发送到服务器的HTTP请求内容
- 返回
  - 异步操作的任务对象

## 以异步操作方式将PUT请求发送到指定为字符串的URI

`PutAsync(requestUri?: string,content?: HttpContent): System.Threading.Tasks.Task<HttpResponseMessage>`

- 参数
  - `requestUri` 请求发送到的URI
  - `content` 发送到服务器的HTTP请求内容
- 返回
  - 异步操作的任务对象

## 发送带有指定请求的HTTP请求（⭐推荐）

`Send(request: HttpRequestMessage): HttpResponseMessage`

- 参数
  - `request` 要发送的 HTTP 请求消息
    - 详见[HttpRequestMessage](System.Net.Http.HttpRequestMessage)
- 返回
  - HTTP响应消息

:::info
强烈推荐此方法

- 这是一个同步方法，不需要通过麻烦的方式从异步转成同步
- 将所有的请求内容合成一个对象传入，不需要传入复杂参数
:::

## 以异步操作发送带有指定请求的HTTP请求

`SendAsync(request: HttpRequestMessage): System.Threading.Tasks.Task<HttpResponseMessage>`

- 参数
  - `request` 要发送的 HTTP 请求消息
    - 详见[HttpRequestMessage](System.Net.Http.HttpRequestMessage)
- 返回
  - 异步操作的任务对象
