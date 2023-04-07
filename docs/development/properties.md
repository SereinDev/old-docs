# 🦺 属性

## Serein.exe所在文件夹

`serein.path`

```js
var path = serein.path; // Serein.exe所在文件夹，如C:\Serein
```

- 返回
  - `String`

## Serein版本

`serein.version`

```js
var version = serein.version; // Serein版本，如v1.3.4
```

- 返回
  - `String`

## Serein类型

`serein.type`

- 返回
  - `Number`
    - 0 - 控制台
    - 1 - winform
    - 2 - wpf
    - -1 - 未知（理论上不可能出现这个值）

## Serein类型文本

`serein.typeName`

- 返回
  - `String`
    - console
    - winform
    - wpf
    - unknown

## Serein启动时间

`serein.startTime`

- 返回
  - `Date`

## JS命名空间

`serein.namespace`

- 返回
  - `String`

用于内部区分JS解释器和其他属性，实例化[WebSocket](class#websocket客户端)时需要提供此参数

此外，你也可以通过[注册插件](function/serein#注册插件)来获取命名空间
