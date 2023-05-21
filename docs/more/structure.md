# 🌲 目录结构

## 主分支

- `.github` github相关
- `Serein`
  - `Console`
    - `Console` 控制台输入输出处理
  - `Universal` 三个类型共通的代码
    - `Base` 一坨类
    - `Core`
      - `JSPlugin` JS插件
      - `Server` 服务器及其插件管理
      - `Generic` 通用类
    - `Extensions` 扩展方法
    - `Properties` 程序集属性
    - `Settings` 设置
    - `Sources` 图标资源
      - `ConsoleHtml` 控制台html文件
      - `net472` Updater输出文件夹
    - `Utils` 工具类
  - `WinForm`
    - `UI` 界面代码
  - `WPF`
    - `Windows` 界面代码

## 程序

- `console` 控制台网页文件 *仅Winform*
  - `console.html` 控制台html文件
  - `preset.css` 预设CSS
- `data` 数据
  - `groupcache.json` 群组缓存
  - `members.json` 成员管理
  - `permission.json` 权限组
  - `regex.json` 正则
  - `schedule.json` 定时任务
- `logs` 日志
  - `console` 控制台输出
  - `crash` 崩溃日志
  - `debug` 调试日志
  - `msg` 机器人接收数据包
- `plugins` [插件](../guide/plugin)文件夹
- `update` 更新缓存
- `Serein-???.exe` 程序主体
- `Serein-???.exe.config` 启动配置文件 *仅dotnet framework 4.7.2*
