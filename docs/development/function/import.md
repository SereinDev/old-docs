
# ➕ 导入/导出对象

## 导出

`serein.export(key: String, obj: Object)`

- 参数
  - `key` 导出键名
  - `obj` 导出的对象
- 返回
  - 无

:::caution

- `key`不能为空或为`null`、`undefined`
- `obj`可以为JS中的所有数据类型，详见[JavaScript 数据类型](https://www.runoob.com/js/js-datatypes.html)
  - 若导出的类型为函数，且该插件在导出函数后被禁用，则在其他插件中导入该函数并执行将引发错误

:::

## 导入

`serein.import(key: String)`

- 参数
  - `key` 导入键名
- 返回
  - 导入的对象
    - 找不到指定的对象时将返回`undefined`
