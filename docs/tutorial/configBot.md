
# 🤖 配置机器人

详细的机器人配置教程

## 配置方法

### go-cqhttp

1. [下载最新版本](https://github.com/Mrs4s/go-cqhttp/releases/latest)并解压
2. 双击运行，首次运行时会释放启动文件
3. 再次运行，当出现提示选择通信方式时，选择**正向 Websocket 通信**
4. 在配置文件中填入账号和密码
5. 再次运行go-cqhttp以登录帐号
6. 在Serein的**设置>机器人>Websocket地址**中修改地址与机器人配置文件中一致
7. 单击**机器人>连接**按钮连接机器人

## Mirai

1. 下载过程略
2. 你需要安装[OneBot Mirai](https://github.com/yyuueexxiinngg/onebot-kotlin)插件
3. 修改配置文件，开启正向ws服务器
4. 同上第6-7步

:::note
此插件久年失修，貌似存在配置文件被直接覆盖的bug，需要耐心重试
:::

:::tip
其他机器人可能需要直接修改配置文件，但操作方法类似
:::

## 鉴权

鉴权（`authentication`）是指验证用户是否拥有访问系统的权利。

在机器人的配置文件中设置`Access-Token`字段，当ws服务器运行在公网时用于防止被任意客户端连接

此外，你还需要将`Access-Token`内容复制到 设置>机器人>鉴权凭证 ，用于连接时鉴权  

:::note
`Access-Token`区分大小写、首尾空格等
:::
