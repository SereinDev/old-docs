# 👨🏻‍🤝‍👨🏻 绑定

## 绑定游戏ID

`serein.bindMember(userid: number, gameid: string)`

- 参数
  - `userid` QQ号
  - `gameid` 游戏ID
- 返回
  - `boolean`
    - 成功为`true`，否则为`false`

## 删除绑定记录

`serein.unbindMember(userid: number)`

- 参数
  - `userid` QQ号
- 返回
  - `boolean`
    - 成功为`true`，否则为`false`

## 获取指定用户QQ

`serein.getID(gameid: string)`

- 参数
  - `gameid` 游戏ID
- 返回
  - `number` QQ号

## 获取指定游戏ID

`serein.getGameID(userid: number)`

- 参数
  - `userid` QQ号
- 返回
  - `string` 游戏ID
