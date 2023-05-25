# 📜 正则

```js
// 获取正则列表
serein.log(JSON.stringify(serein.getRegexes(), null, 2));

// 添加
serein.addRegex('^.+$', 1, true, 'g|test');

// 修改
serein.editRegex(0, '^.+$', 1, true, 'g|test');

// 删除
serein.removeRegex(0);
```

## 获取正则列表

`serein.getRegexes()`

- 参数
  - 空
- 返回
  - `Array<RegexItem>` 正则列表
    - `RegexItem`
      - 结构见[正则](../../guide/regex)

```ts
declare type Regex = {
  readonly regex: string
  readonly area: RegexAreaType,
  readonly needAdmin: boolean,
  readonly command: string,
  readonly remark: string,
  readonly ignore: number[]
}
```

## 添加正则

```js
serein.addRegex(
  regexp: string,
  area: number,
  needAdmin: boolean,
  command: string,
  remark: string,
  ignore: number[]
  )
```

- 参数
  - `regexp` 正则表达式
  - `area` 作用域
  - `needAdmin` 需要管理
  - `command` 命令
  - `remark` 备注
  - `ignore` 忽略的对象
- 返回
  - `boolean`
    - 成功为`true`，否则为`false`

## 修改正则

```js
serein.editRegex(
  index: number
  regexp?: string,
  area?: number,
  needAdmin?: boolean,
  command?: string,
  remark?: string,
  ignore?: number[]
  )
```

- 参数
  - `index` 数组下标
  - `regexp` 正则表达式
  - `area` 作用域
  - `needAdmin` 需要管理
  - `command` 命令
  - `remark` 备注
  - `ignore` 忽略的对象
- 返回
  - `boolean`
    - 成功为`true`，否则为`false`

:::note
若参数为null则忽略更改
:::

## 删除正则

`serein.removeRegex(index: number)`

- 参数
  - `index` 数组下标
- 返回
  - `boolean`
    - 成功为`true`，否则为`false`