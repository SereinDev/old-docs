---
title: 驱动器信息变量拓展
slug: DeviceInfo
authors: 
  - Zaitonn
tags: [js,variable]
date: 2023.3.4
---

提供驱动器的类型、格式、空间等变量

<!--truncate-->

## 使用方法

在命令中插入变量

## 变量列表

| 变量名                          | 说明             |
| ------------------------------- | ---------------- |
| `deviceinfo_drivetype_{盘符}`   | 驱动器类型       |
| `deviceinfo_driveformat_{盘符}` | 驱动器格式       |
| `deviceinfo_free_{盘符}`        | 驱动器剩余空间   |
| `deviceinfo_used_{盘符}`        | 驱动器已用空间   |
| `deviceinfo_total_{盘符}`       | 驱动器总空间     |
| `deviceinfo_usage_{盘符}`       | 驱动器空间使用率 |

:::tip
其中`{盘符}`替换为所查询的盘符首字母即可，如`deviceinfo_usage_c`
:::

## 历史版本

- 2023.3.4  [v1.0](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/publish/JS/DeviceInfo/v1.0/deviceinfo.js)
