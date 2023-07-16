# ⚙ 系统相关

## 获取系统信息

`serein.getSysInfo()`

- 参数
  - 空
- 返回
  - `object` 系统信息对象

<details>
  <summary>返回对象示例（以json格式显示）</summary>

```json
{
  "Architecture": "64 位",                              // 架构（可能的值：32位、64位、AMD；具体语言跟随系统）
  "Name": "Microsoft Windows 10 家庭版 SP0.0",          // 系统名称（具体语言跟随系统）
  "Hardware": {                                         // 硬件信息
    "CPUs": [                                           // CPU列表
      {
        "Name": "Intel Core i5-1035G4 CPU @ 1.10GHz",   // 名称
        "Brand": "GenuineIntel",                        // 供应商/品牌
        "Architecture": "x64",                          // 架构
        "Cores": 4,                                     // 核心数
        "Frequency": 1498                               // 频率（MHz）
      }
    ],
    "GPUs": [                                           // GPU列表
      {
        "Name": "Intel(R) Iris(R) Graphics Family",     // 名称
        "Brand": "Intel(R) Iris(R) Plus Graphics",      // 供应商/品牌
        "Resolution": "2736x1824",                      // 分辨率
        "RefreshRate": 59,                              // 刷新率（Hz）
        "MemoryTotal": 1048576                          // GPU内存 / 显存
      }
    ],
    "RAM": {
      "Free": 2350688,                                  // 可用内存（KB）
      "Total": 7964852                                  // 总内存（KB）
    }
  },
  "FrameworkVersion": {                                 // NET框架版本
    "Major": 4,
    "Minor": 0,
    "Build": 30319,
    "Revision": 42000,
    "MajorRevision": 0,
    "MinorRevision": -23536
  },
  "JavaVersion": {                                      // Java运行库版本（当前示例为无运行库）
    "Major": 0,
    "Minor": 0,
    "Build": -1,
    "Revision": -1,
    "MajorRevision": -1,
    "MinorRevision": -1
  },
  "IsMono": false,                                      // 当前软件是否使用Mono运行
  "OperatingSystemType": 0                              // 操作系统类型（枚举值）
  // Windows = 0, Linux, MacOSX, BSD, WebAssembly, Solaris, Haiku, Unity5, Other
}
```

</details>

## 获取CPU使用率

`serein.getCPUUsage()`

- 参数
  - 空
- 返回
  - `number` ∈ [0, 100]
    - 示例：`1.14514191981`
  - `undefined` *Linux版本*

## 获取网速

`serein.getNetSpeed()`

- 参数
  - 空
- 返回
  - `[string, string]`，其中`[0]`为上传网速，`[1]`为下载网速

```js
const [ uploadSpeed, downloadSpeed ] = serein.getNetSpeed();
```
