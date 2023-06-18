---
title: 状态图片生成
authors: 
  - Zaitonn
tags: [JS,娱乐]
date: 2023.6.7
---

生成当前系统和服务器状态的图片，支持自定义标题和图片/API

![示例](/img/StatPictureGenerater/dark.png#small)

<!--truncate-->

:::caution

- 此插件支持的最低版本为v1.3.4.2
- 你需要安装
  - [文件读写模块](stdio)
    - 下载后放在plugins/modules文件夹内
  - [消息助手](MsgHelper)
    - 下载后放在plugins文件夹内
- 此插件使用了Typescript编写，阅读编译后的JS文件可能会有一些困难

:::

## 显示内容

- 系统信息
  - CPU占用率
  - CPU名称
  - 内存使用率
  - 内存大小
  - 系统名称
  - 网速
- 服务器
  - 状态
  - 人数
  - 类型
  - 版本

## 使用方法

1. 安装前置插件  
  [文件读写模块](stdio)、[消息助手](MsgHelper)
2. 加载插件
3. 按照提示重新加载
4. 在监听的群聊中发送以下任意值触发
   - zt
   - 状态
   - 服务器状态

## 逻辑

<details>
	<summary>点此以查看流程图</summary>

```mermaid
flowchart TB
  A("开始生成") -->  B0["判断类型"]
  B0 -->  B1["检测目录下的图片"]
  subgraph 本地图片
  B1 --> B2["判断图片数量"]
  B2 --> B3["随机抽取一张图片"]
  end
  B3-->E1

  B0 --> C1["判断API数量"]
  subgraph API
  C1 --> C2["随机抽取一个链接"]
  C2 --> C3["通过GET请求获取图片"]
  end
  C3-->E1

  subgraph 计算主要颜色
  E1("克隆一份图片")-->E2["将克隆的图片缩放至10px*10px"]
  E2-->E3["逐个获取非透明像素的RGB值的和"]
  E3-->E4["计算平均值"]
  end

  B0 --> |"其他值"| D1["使用白色背景"]
  D1-->G2

  E4 --> G2["根据主题生成一套配色"]
  G2 --> G31
  subgraph 绘制相关文本
  G31("绘制标题")
  G32("绘制系统信息")
  G33("绘制服务器状态")
  G34("绘制图片水印")
  G31 --> G32 --> G33 --> G34 --> G4
  end
  G4["保存为图片"]
  G4 --> G5["计算Base64值"]
  G5 --> G6("发送到群聊")

```

</details>

## 配置文件

```json
{
  "urls": [
    "https://t.mwm.moe/ysmp/",
    "https://t.mwm.moe/mp/",
    "https://t.mwm.moe/moemp/"
  ],
  "originType": "api",
  "title": "Serein · 状态",
  "font": "得意黑",
  "shadow": true,
  "theme": "auto",
  "defaultColor": ""
}
```

### `urls`

`string[]`

指定获取图片的API

:::note
仅当`originType`为'api'时生效
:::

### `originType`

`'local' | 'api'`

图片来源类型

- `local`
  - 本地图片
    - 将从plugins/StatPictureGenerater文件夹下随机抽取一张图片
    - 可用的文件扩展名为`.png`、`.jpg`、`.jpeg`、`.bmp`
- `api`
  - 使用[`urls`](#urls)中的链接获取
    - 请务必确保返回的是图片而不是json文本或者链接

:::tip

- 推荐使用竖屏（4:3）图片
  - 若比例或大小不满足将自动裁剪
    - 左上角对齐

:::

### `title`

`string?`

图片的标题

为空时则保持默认值`Serein · 状态`

![标题示例](/img/StatPictureGenerater/eg_title.png#small)

### `font`

`string`

生成图片使用的字体

### `shadow`

`boolean`

是否显示文字和占用饼图的阴影

### `theme`

`'dark' | 'light' | 'auto'`

图片的文字和背景的主题

- `dark`
  - 深色主题  
  ![深色主题](/img/StatPictureGenerater/dark.png#small)
- `light`
  - 浅色主题  
  ![浅色主题](/img/StatPictureGenerater/light.png#small)
- `auto`或其他异常值
  - 根据图片的主要颜色自动判断

### `defaultColor`

`string`

默认主题颜色

- 为空时自动从图片的主要颜色计算而得
- 格式
  - `#RGB`
  - `#RRGGBB`
  - `#RRGGBBAA`
  - 其他格式或不合法将被视作透明

## 历史版本

- 2023.6.7 v1.1
  - [**`StatPictureGenerater.js`**](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/4d3c4d6009685806b2f95cfa0851b35e28f5a330/JS/StatPictureGenerater/StatPictureGenerater.js?d) 编译后的文件
  - [`StatPictureGenerater.ts`](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/4d3c4d6009685806b2f95cfa0851b35e28f5a330/JS/StatPictureGenerater/StatPictureGenerater.ts?d) TypeScript源码
- 2023.5.31 v1.0
  - [`StatPictureGenerater.js`](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/45ae3bbe50561e590ba6eb090fd6e58fc4b704b4/JS/StatPictureGenerater/StatPictureGenerater.js?d) 编译后的文件
  - [`StatPictureGenerater.ts`](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/45ae3bbe50561e590ba6eb090fd6e58fc4b704b4/JS/StatPictureGenerater/StatPictureGenerater.ts?d) TypeScript源码
