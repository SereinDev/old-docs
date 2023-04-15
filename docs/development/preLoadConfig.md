# 📝 预加载配置

## 创建方法

- 在plugins文件夹下创建与插件同名的文件夹后，重新加载插件即可自动生成该文件
- 使用`setPreLoadConfig()`方法

```json title="PreLoadConfig.json"
{
  "Assemblies": [],
  "AllowGetType": false,
  "AllowOperatorOverloading": true,
  "AllowSystemReflection": false,
  "AllowWrite": true,
  "Strict": false
}
```

## Assemblies

导入已加载的程序集名称

:::tip

- 若要加载NET自带的程序集，则该文件需位于`{NET安装目录}/{运行库类型}/{版本号}`的文件夹下，如`System.Draw`、`System.Windows.Forms`
- 使用方法：[程序集](assembly)

:::

参考文档：[Assembly.Load 方法](https://learn.microsoft.com/zh-cn/dotnet/api/system.reflection.assembly.load)

## AllowGetType

`boolean`

是否允许使用`Object.GetType()`

## AllowOperatorOverloading

`boolean`

是否允许运算符重载（默认为`true`）

## AllowSystemReflection

`boolean`

是否允许使用`System.Reflection`相关功能

:::tip
你可以通过此功能实现动态加载Dll
:::

## AllowWrite

`boolean`

是否允许对CLR的写入（建议开启，默认为`true`）

## Strict

`boolean`

JS严格模式

>参考代码：[jint/Options.cs at main · sebastienros/jint](https://github.com/sebastienros/jint/blob/main/Jint/Options.cs)
