# 预加载配置

在plugins文件夹下创建与插件同名的文件夹后，重新加载插件即可自动生成该文件

```json
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

>[!TIP] 若要加载NET自带的程序集，则该文件需位于`{NET安装目录}/{运行库类型}/{版本号}`的文件夹下，如`System.Draw`、`System.Windows.Forms`

>参考文档：[Assembly.Load 方法](https://learn.microsoft.com/zh-cn/dotnet/api/system.reflection.assembly.load)

## AllowGetType

`Boolean`

是否允许使用`Object.GetType()`

## AllowOperatorOverloading

`Boolean`

是否允许运算符重载

## AllowSystemReflection

`Boolean`

是否允许使用`System.Reflection`相关功能

>[!TIP]你可以通过此功能实现动态加载Dll

## AllowWrite

`Boolean`

是否允许对CLR的写入（建议开启）

## Strict

`Boolean`

JS严格模式

>参考代码：[jint/Options.cs at main · sebastienros/jint](https://github.com/sebastienros/jint/blob/main/Jint/Options.cs)
