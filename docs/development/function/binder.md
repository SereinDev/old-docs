# 👨🏻‍🤝‍👨🏻 绑定

## 绑定游戏ID

`serein.bindMember(userid: Number, gameid: String)`

- 参数
  - `userid` QQ号
  - `gameid` 游戏ID
- 返回
  - `Boolean`
    - 成功为`true`，否则为`false`

## 删除绑定记录

`serein.unbindMember(userid: Number)`

- 参数
  - `userid` QQ号
- 返回
  - `Boolean`
    - 成功为`true`，否则为`false`

## 获取指定用户QQ

`serein.getID(gameid: String)`

- 参数
  - `gameid` 游戏ID
- 返回
  - `Number` QQ号

## 获取指定游戏ID

`serein.getGameID(userid: Number)`

- 参数
  - `userid` QQ号
- 返回
  - `String` 游戏ID
