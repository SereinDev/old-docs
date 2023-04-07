# 🩺 开启调试模式

开启Serein自带的调试输出窗口

:::note
供开发和调试使用，一般不建议开启
:::

![调试窗口](/img/debug.png)

## 用途

供开发者确定函数的执行情况、变量的变化等，并总是自动保存日志到`logs/debug`文件夹下

### C\#

你可以使用以下语句输出调试信息

```csharp
Logger.Out(LogType.Debug, "这是一条调试信息");
// 你可以通过使用','拼接输出多个值
Logger.Out(LogType.Debug, "这是一条调试信息", 1, 2, 3);
```

```csharp
internal static class Logger
{
    public static void Out(LogType Type, params object[] objects); // 函数原型
}
```

### JS插件

详见[debug输出](../development/function/serein#debug输出)

## 开启方法

### 命令行参数

使用cmd或PowerShell启动 Serein-???.exe ，在路径后面写上`debug`即可

```powershell
PS C:\> Serein-???.exe debug
```

### 更改设置

打开`settings/Serein.json`，将`EnableDebug`后面的`false`改为`true`即可

```json
{
    // ...
    "DevelopmentTool": {
        "EnableDebug": true,  // 开启调试模式
        // ...
    }
}
```
