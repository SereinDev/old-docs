# GoCQSDK

|     作者     | Zaitonn               |
| :----------: | :-------------------- |
|   **介绍**   | GOCQAPI封装           |
| **更新日期** | 2023.2.3              |
|   **下载**   | [历史版本](#历史版本) |

## 功能

提供几乎所有的GOCQAPI封装

- `send_private_msg(user_id, message, group_id = undefined, auto_escape = false)`
- `send_group_msg(group_id, message, auto_escape = false)`
- `delete_msg(message_id)`
- `get_msg(message_id)`
- `get_forward_msg(message_id)`
- `get_image(file)`
- `mark_msg_as_read(message_id)`
- `set_group_kick(group_id, user_id, reject_add_request = false)`
- `set_group_ban(group_id, user_id, duration = 30 * 60)`
- `set_group_anonymous_ban(group_id, anonymous_flag, duration = 30 * 60)`
- `set_group_whole_ban(group_id, enable = false)`
- `set_group_admin(group_id, user_id, enable = false)`
- `set_group_anonymous(group_id, enable = false)`
- `set_group_card(group_id, user_id, card = '')`
- `set_group_name(group_id, group_name = '')`
- `set_group_leave(group_id, is_dismiss = false)`
- `set_group_special_title(group_id, user_id, special_title = '', duration = -1)`
- `send_group_sign(group_id)`
- `set_friend_add_request(flag, approve = true, remark = '')`
- `set_group_add_request(flag, sub_type, approve = true, reason = '')`
- `get_login_info()`
- `qidian_get_account_info()`
- `set_qq_profile(nickname, company, email, college, personal_note)`
- `get_stranger_info(user_id, no_cache = false)`
- `get_friend_list()`
- `get_unidirectional_friend_list()`
- `delete_friend(user_id)`
- `get_group_info(group_id, no_cache = false)`
- `get_group_list()`
- `get_group_member_info(group_id, user_id, no_cache = false)`
- `get_group_member_list(group_id, no_cache = false)`
- `get_group_honor_info(group_id, type)`
- `can_send_image()`
- `can_send_record()`
- `get_version_info()`
- `get_word_slices(content)`
- `ocr_image(image)`
- `get_group_system_msg()`
- `upload_private_file(user_id, file, name)`
- `upload_group_file(group_id, file, name, folder)`
- `get_group_file_system_info(group_id)`
- `get_group_root_files(group_id)`
- `get_group_files_by_folder(group_id, folder_id)`
- `create_group_file_folder(group_id, name)`
- `delete_group_folder(group_id, folder_id)`
- `delete_group_file(group_id, file_id, busid)`
- `get_group_file_url(group_id, file_id, busid)`
- `get_status()`
- `get_group_at_all_remain(group_id)`
- `_send_group_notice(group_id, content, image)`
- `_get_group_notice(group_id)`
- `reload_event_filter()`
- `download_file(url, thread_count, headers)`
- `get_online_clients()`
- `get_group_msg_history(message_seq, group_id)`
- `set_essence_msg(message_id)`
- `delete_essence_msg(message_id)`
- `get_essence_msg_list(group_id)`
- `check_url_safely(url)`
- `_get_model_show(model)`
- `_set_model_show(model, model_show)`
- `delete_unidirectional_friend(user_id)`

>[!NOTE] 合并转发消息因GET请求无法实现，以后能做再说，可先使用`serein.sendPacket()`代替

## 食用方法

1. 在GoCQ的配置文件里添加HTTP服务器项
2. 下载后放入`plugins/modules`
3. 你需要在使用该模块的插件的`PreLoadConfig.json`中`Assemblies`字段添加`System.Net.Http`项

## 开发

1. 下载后放入`plugins/modules`
2. 在你的代码里第一行加上`const Instance = require('./modules/GoCQSDK.js').Instance`;
3. 然后new一个实例就能用了

```js
// 例子：

const Instance = require('./modules/GoCQSDK.js').Instance;

let instance = new Instance();
instance.send_private_msg(10001, '麻花疼我真的好喜欢你呀');
instance.dispose(); // 建议加上这行，执行后会释放HttpClient资源
```

- 有啥不会直接看源码，函数名和参数名都有标注
- 只有标注`@returns`的函数有返回值
- 建议使用Visual Code Studio开发
- 一切以GoCQ文档为准

## 历史版本

- 2023.2.3 [v1.0](https://download.serein.cc/https://raw.githubusercontent.com/Zaitonn/Serein-Docs/publish/JS/Modules/GoCQSDK/v1.0/GoCQSDK.js)
  - 需要Serein v1.3.4及以上
