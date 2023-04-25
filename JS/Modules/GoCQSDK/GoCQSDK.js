/**
 * @notice 你需要在插件的"PreLoadConfig.json"中"Assemblies"字段添加"System.Net.Http"项
 *
 * @tutorial
 *  使用方法：
 *   1. 将本文件放在plugin/modules下
 *   2. 在你的代码里第一行加上
 *       const SDKInstance = require('./modules/GoCQSDK.js').SDKInstance;
 *   3. 然后new一个实例就能用了
 *
 * =====================
 * @author Zaitonn
 * @license GPL-3.0
 * @version v1.1(v1.3.4)
 */

const COPYRIGHTINFO = 'Copyright © 2023 Zaitonn. All Rights Reserved.';
serein.log(COPYRIGHTINFO);

const
    MediaTypeHeaderValue = System.Net.Http.Headers.MediaTypeHeaderValue,
    StringContent = System.Net.Http.StringContent,
    HttpClient = System.Net.Http.HttpClient;

/**
 * GoCQSDK for Serein JS
 */
export class SDKInstance {
    /**
     * @param {String} ip ip
     * @param {Number} port 端口
     * @param {String} access_token 鉴权Token
     */
    constructor(ip = '127.0.0.1', port = 5700, access_token = undefined) {
        this.httpClient = new HttpClient();
        this.ip = ip || '127.0.0.1';
        this.port = port || 8080;
        this.createTime = Date.now() / 1000;
        this.httpClient.DefaultRequestHeaders.Add("Authorization", access_token || 'null');
    }

    /**
     * 释放资源
     */
    dispose() {
        this.httpClient.Dispose();
    }

    /**
     * POST请求
     * @param {String} endpoint 终结点
     * @param {Array} params 参数列表
     * @returns
     */
    post(endpoint, params) {
        let content = new StringContent(JSON.stringify(params || {}));
        content.Headers.ContentType = new MediaTypeHeaderValue('application/json'); // 设置post头
        return this.httpClient.PostAsync(`http://${this.ip}:${this.port}/${endpoint}`, content).GetAwaiter().GetResult().Content.ReadAsStringAsync().GetAwaiter().GetResult();
    }

    /**
     * 发送私聊消息
     * @param {Number} user_id 对方 QQ 号
     * @param {String} message 要发送的内容
     * @param {Number} group_id 主动发起临时会话时的来源群号(可选, 机器人本身必须是管理员/群主)
     * @param {Boolean} auto_escape 消息内容是否作为纯文本发送(即不解析 CQ 码), 只在`message`字段是字符串时有效
     * @returns
     */
    send_private_msg(user_id, message, group_id = undefined, auto_escape = false) {
        return this.post('send_private_msg',
            {
                user_id: user_id,
                message: message,
                group_id: group_id || 0,
                auto_escape: Boolean(auto_escape)
            });
    }

    /**
     * 发送群消息
     * @param {Number} group_id 群号
     * @param {String} message 要发送的内容
     * @param {Boolean} auto_escape 消息内容是否作为纯文本发送(即不解析 CQ 码), 只在`message`字段是字符串时有效
     * @returns
     */
    send_group_msg(group_id, message, auto_escape = false) {
        return this.post('send_group_msg',
            {
                group_id: group_id,
                message: message,
                auto_escape: Boolean(auto_escape)
            });
    }

    /**
     * 发送合并转发 (好友)
     * @param {Number} user_id 对方 QQ 号
     * @param {*} messages 自定义转发消息, 具体看<https://docs.go-cqhttp.org/cqcode/#%E5%90%88%E5%B9%B6%E8%BD%AC%E5%8F%91%E6%B6%88%E6%81%AF%E8%8A%82%E7%82%B9>
     * @returns
     */
    send_private_forward_msg(user_id, messages) {
        return this.post('send_private_forward_msg',
            {
                user_id: user_id,
                messages: messages
            });
    }

    /**
     * 发送合并转发 (群)
     * @param {Number} group_id 群号
     * @param {*} messages 自定义转发消息, 具体看<https://docs.go-cqhttp.org/cqcode/#%E5%90%88%E5%B9%B6%E8%BD%AC%E5%8F%91%E6%B6%88%E6%81%AF%E8%8A%82%E7%82%B9>
     * @returns
     */
    send_group_forward_msg(group_id, messages) {
        return this.post('send_group_forward_msg',
            {
                group_id: group_id,
                messages: messages
            });
    }

    /**
     * 撤回消息
     * @param {Number} message_id
     */
    delete_msg(message_id) {
        this.post('delete_msg', { message_id: message_id });
    }

    /**
     * 获取消息
     * @param {Number} message_id
     * @returns
     */
    get_msg(message_id) {
        return this.post('get_msg', { message_id: message_id });
    }

    /**
     * 获取合并转发内容
     * @param {Number} message_id
     */
    get_forward_msg(message_id) {
        return this.post('get_forward_msg', { message_id: message_id });
    }

    /**
     * 获取图片信息
     * @param {String} file 图片缓存文件名
     * @returns
     */
    get_image(file) {
        return this.post('get_image', { file: file });
    }

    /**
     * 标记消息已读
     * @param {Number} message_id
     */
    mark_msg_as_read(message_id) {
        this.post('mark_msg_as_read', { message_id: message_id });
    }

    /**
     * 群组踢人
     * @param {Number} group_id 群号
     * @param {Number} user_id 要踢的 QQ 号
     * @param {Boolean} reject_add_request 拒绝此人的加群请求
     */
    set_group_kick(group_id, user_id, reject_add_request = false) {
        this.post('set_group_kick', {
            group_id: group_id,
            user_id: user_id,
            reject_add_request: Boolean(reject_add_request)
        });
    }

    /**
    * 群组单人禁言
    * @param {Number} group_id 群号
    * @param {Number} user_id 要禁言的 QQ 号
    * @param {Number} duration 禁言时长, 单位秒, 0 表示取消禁言
    */
    set_group_ban(group_id, user_id, duration = 30 * 60) {
        this.post('set_group_ban', {
            group_id: group_id,
            user_id: user_id,
            duration: duration || 30 * 60
        });
    }

    /**
    * 群组匿名用户禁言
    * @param {Number} group_id 群号
    * @param {Number} anonymous_flag 要禁言的匿名用户的`flag`（需从群消息上报的数据中获得）
    * @param {Number} duration 禁言时长, 单位秒, `0`表示取消禁言
    */
    set_group_anonymous_ban(group_id, anonymous_flag, duration = 30 * 60) {
        this.post('set_group_anonymous_ban', {
            group_id: group_id,
            anonymous_flag: anonymous_flag,
            duration: duration || 30 * 60
        });
    }

    /**
     * 群组全员禁言
     * @param {Number} group_id 群号
     * @param {Boolean} enable 是否禁言
     */
    set_group_whole_ban(group_id, enable = false) {
        this.post('set_group_whole_ban', {
            group_id: group_id,
            enable: Boolean(enable)
        });
    }

    /**
     * 群组设置管理员
     * @param {Number} group_id 群号
     * @param {Number} user_id 要设置管理员的 QQ 号
     * @param {Boolean} enable `true` 为设置, `false` 为取消
     */
    set_group_admin(group_id, user_id, enable = false) {
        this.post('set_group_admin', {
            group_id: group_id,
            user_id: user_id,
            enable: Boolean(enable)
        });
    }

    /**
     * 群组匿名
     * @param {Number} group_id 群号
     * @param {Boolean} enable 是否允许匿名聊天
     */
    set_group_anonymous(group_id, enable = false) {
        this.post('set_group_anonymous', {
            group_id: group_id,
            enable: Boolean(enable)
        });
    }

    /**
     * 设置群名片 ( 群备注 )
     * @param {Number} group_id 群号
     * @param {Number} user_id 要设置管理员的 QQ 号
     * @param {String} card true 为设置, false 为取消
     */
    set_group_card(group_id, user_id, card = '') {
        this.post('set_group_card', {
            group_id: group_id,
            user_id: user_id,
            card: card || ''
        });
    }

    /**
     * 设置群名
     * @param {Number} group_id 群号
     * @param {String} group_name 新群名
     */
    set_group_name(group_id, group_name = '') {
        this.post('set_group_name', {
            group_id: group_id,
            group_name: group_name || ''
        });
    }

    /**
     * 退出群组
     * @param {Number} group_id 群号
     * @param {Boolean} is_dismiss 是否解散, 如果登录号是群主, 则仅在此项为 true 时能够解散
     */
    set_group_leave(group_id, is_dismiss = false) {
        this.post('set_group_leave', {
            group_id: group_id,
            is_dismiss: Boolean(is_dismiss)
        });
    }

    /**
     * 设置群组专属头衔
     * @param {Number} group_id 群号
     * @param {Number} user_id 要设置的 QQ 号
     * @param {String} special_title 专属头衔, 不填或空字符串表示删除专属头衔
     * @param {Number} duration 专属头衔有效期, 单位秒, -1 表示永久, 不过此项似乎没有效果, 可能是只有某些特殊的时间长度有效, 有待测试
     */
    set_group_special_title(group_id, user_id, special_title = '', duration = -1) {
        this.post('set_group_special_title', {
            group_id: group_id,
            user_id: user_id,
            special_title: special_title || '',
            duration: duration || -1
        });
    }

    /**
     * 群打卡
     * @param {Number} group_id 群号
     */
    send_group_sign(group_id) {
        this.post('send_group_sign', {
            group_id: group_id
        });
    }

    /**
     * 处理加好友请求
     * @param {String} flag 加好友请求的 flag（需从上报的数据中获得）
     * @param {Boolean} approve 是否同意请求
     * @param {String} remark 添加后的好友备注（仅在同意时有效）
     */
    set_friend_add_request(flag, approve = true, remark = '') {
        this.post('set_friend_add_request', {
            flag: flag,
            approve: approve || true,
            remark: remark || ''
        });
    }

    /**
     * 处理加好友请求
     * @param {String} flag 加群请求的 flag（需从上报的数据中获得）
     * @param {String} sub_type add 或 invite, 请求类型（需要和上报消息中的 sub_type 字段相符）
     * @param {Boolean} approve 是否同意请求／邀请
     * @param {String} reason 拒绝理由（仅在拒绝时有效）
     */
    set_group_add_request(flag, sub_type, approve = true, reason = '') {
        this.post('set_group_add_request', {
            flag: flag,
            sub_type: sub_type,
            approve: approve || true,
            reason: reason || ''
        });
    }

    /**
     * 获取登录号信息
     * @returns
     */
    get_login_info() {
        return this.post('get_login_info');
    }

    /**
     * 获取企点账号信息
     * @returns
     */
    qidian_get_account_info() {
        return this.post('qidian_get_account_info');
    }

    /**
     * 设置登录号资料
     * @param {String} nickname 名称
     * @param {String} company 公司
     * @param {String} email 邮箱
     * @param {String} college 学校
     * @param {String} personal_note 个人说明
     */
    set_qq_profile(nickname, company, email, college, personal_note) {
        this.post('set_qq_profile', {
            nickname: nickname,
            company: company,
            email: email,
            college: college,
            personal_note: personal_note
        });
    }

    /**
     * 获取陌生人信息
     * @param {Number} user_id QQ 号
     * @param {Boolean} no_cache 是否不使用缓存（使用缓存可能更新不及时, 但响应更快）
     * @returns
     */
    get_stranger_info(user_id, no_cache = false) {
        return this.post('get_stranger_info', {
            user_id: user_id,
            no_cache: Boolean(no_cache)
        })
    }

    /**
     * 获取好友列表
     * @returns
     */
    get_friend_list() {
        return this.post('get_friend_list');
    }

    /**
     * 获取单向好友列表
     * @returns
     */
    get_unidirectional_friend_list() {
        return this.post('get_unidirectional_friend_list');
    }

    /**
     * 删除好友
     * @param {Number} user_id 好友 QQ 号
     */
    delete_friend(user_id) {
        this.post('delete_friend', { user_id: user_id });
    }

    /**
     * 获取群信息
     * @param {Number} group_id QQ 号
     * @param {Boolean} no_cache 是否不使用缓存（使用缓存可能更新不及时, 但响应更快）
     * @returns
     */
    get_group_info(group_id, no_cache = false) {
        return this.post('get_group_info', {
            group_id: group_id,
            no_cache: Boolean(no_cache)
        })
    }

    /**
     * 获取群列表
     * @returns
     */
    get_group_list() {
        return this.post('get_group_list');
    }

    /**
     * 获取群成员信息
     * @param {Number} group_id 群号
     * @param {Number} user_id QQ 号
     * @param {Boolean} no_cache 是否不使用缓存（使用缓存可能更新不及时, 但响应更快）
     * @returns
     */
    get_group_member_info(group_id, user_id, no_cache = false) {
        return this.post('get_group_member_info', {
            group_id: group_id,
            user_id: user_id,
            no_cache: Boolean(no_cache)
        })
    }

    /**
     * 获取群成员列表
     * @param {Number} group_id 群号
     * @param {Boolean} no_cache 是否不使用缓存（使用缓存可能更新不及时, 但响应更快）
     * @returns
     */
    get_group_member_list(group_id, no_cache = false) {
        return this.post('get_group_member_list', {
            group_id: group_id,
            no_cache: Boolean(no_cache)
        })
    }

    /**
     * 获取群荣誉信息
     * @param {Number} group_id 群号
     * @param {String} type 要获取的群荣誉类型, 可传入 talkative performer legend strong_newbie emotion 以分别获取单个类型的群荣誉数据, 或传入 all 获取所有数据
     * @returns
     */
    get_group_honor_info(group_id, type) {
        return this.post('get_group_honor_info', {
            group_id: group_id,
            type: type
        })
    }

    /**
     * 检查是否可以发送图片
     * @returns
     */
    can_send_image() {
        return this.post('can_send_image');
    }

    /**
     * 检查是否可以发送语音
     * @returns
     */
    can_send_record() {
        return this.post('can_send_record');
    }

    /**
     * 获取版本信息
     * @returns
     */
    get_version_info() {
        return this.post('get_version_info');
    }

    /**
     * 获取中文分词 ( 隐藏 API )
     * @param {String} content 内容
     * @returns
     */
    get_word_slices(content) {
        return this.post('get_word_slices', { content: content });
    }

    /**
     * 图片 OCR
     * @param {String} image 图片ID
     * @returns
     */
    ocr_image(image) {
        return this.post('ocr_image', { image: image });
    }

    /**
     * 获取群系统消息
     * @returns
     */
    get_group_system_msg() {
        return this.post('get_group_system_msg');
    }

    /**
     * 上传私聊文件
     * @param {Number} user_id 对方 QQ 号
     * @param {String} file 本地文件路径
     * @param {String} name 文件名称
     * @returns
     */
    upload_private_file(user_id, file, name) {
        return this.post('upload_private_file', {
            user_id: user_id,
            file: file,
            name: name
        });
    }

    /**
     * 上传群文件
     * @param {Number} group_id 群号
     * @param {String} file 本地文件路径
     * @param {String} name 储存名称
     * @param {String} folder 父目录ID
     * @returns
     */
    upload_group_file(group_id, file, name, folder) {
        return this.post('upload_group_file', {
            group_id: group_id,
            file: file,
            name: name,
            folder: folder
        });
    }

    /**
     * 获取群文件系统信息
     * @param {Number} group_id 群号
     * @returns
     */
    get_group_file_system_info(group_id) {
        return this.post('get_group_file_system_info', {
            group_id: group_id
        })
    }

    /**
    * 获取群根目录文件列表
    * @param {Number} group_id 群号
    * @returns
    */
    get_group_root_files(group_id) {
        return this.post('get_group_root_files', {
            group_id: group_id
        })
    }

    /**
     * 获取群子目录文件列表
     * @param {Number} group_id 群号
     * @param {String} folder_id 文件夹ID 参考 Folder 对象
     * @returns
     */
    get_group_files_by_folder(group_id, folder_id) {
        return this.post('get_group_files_by_folder', {
            group_id: group_id,
            folder_id: folder_id
        })
    }

    /**
     * 获取群子目录文件列表
     * @param {Number} group_id 群号
     * @param {String} name 文件夹名称
     * @returns
     */
    create_group_file_folder(group_id, name) {
        return this.post('create_group_file_folder', {
            group_id: group_id,
            name: name,
            parent_id: '/'
        })
    }

    /**
     * 删除群文件文件夹
     * @param {Number} group_id 群号
     * @param {String} folder_id 文件夹ID 参考 Folder 对象
     */
    delete_group_folder(group_id, folder_id) {
        this.post('delete_group_folder', {
            group_id: group_id,
            folder_id: folder_id
        })
    }

    /**
     * 删除群文件
     * @param {Number} group_id 群号
     * @param {String} file_id 文件ID 参考 File 对象
     * @param {Number} busid 文件类型 参考 File 对象
     */
    delete_group_file(group_id, file_id, busid) {
        this.post('delete_group_file', {
            group_id: group_id,
            file_id: file_id,
            busid: busid
        });
    }

    /**
     * 获取群文件资源链接
     * @param {Number} group_id 群号
     * @param {String} file_id 文件ID 参考 File 对象
     * @param {Number} busid 文件类型 参考 File 对象
     * @returns
     */
    get_group_file_url(group_id, file_id, busid) {
        return this.post('get_group_file_url', {
            group_id: group_id,
            file_id: file_id,
            busid: busid
        });
    }

    /**
     * 获取状态
     * @returns
     */
    get_status() {
        return this.post('get_status')
    }

    /**
     * 获取群 @全体成员 剩余次数
     * @param {Number} group_id 群号
     * @returns
     */
    get_group_at_all_remain(group_id) {
        return this.post('get_group_at_all_remain', { group_id: group_id });
    }

    /**
     * 发送群公告
     * @param {Number} group_id 群号
     * @param {String} content 公告内容
     * @param {String} image 图片路径（可选）
     */
    _send_group_notice(group_id, content, image) {
        this.post('_send_group_notice', {
            group_id: group_id,
            content: content,
            image: image
        })
    }

    /**
     * 获取群公告
     * @param {Number} group_id 群号
     * @returns
     */
    _get_group_notice(group_id) {
        return this.post('_get_group_notice', { group_id: group_id });
    }

    /**
     * 重载事件过滤器
     */
    reload_event_filter() {
        this.post('reload_event_filter');
    }

    /**
     * 下载文件到缓存目录
     * @param {String} url 链接地址
     * @param {Number} thread_count 下载线程数
     * @param {String} headers 自定义请求头
     * @returns
     */
    download_file(url, thread_count, headers) {
        return this.post('download_file', {
            url: url,
            thread_count: thread_count,
            headers: headers
        });
    }

    /**
     * 获取当前账号在线客户端列表
     * @returns
     */
    get_online_clients() {
        return this.post('get_online_clients');
    }

    /**
     * 获取群消息历史记录
     * @param {Number} message_seq 起始消息序号, 可通过 get_msg 获得
     * @param {Number} group_id 群号
     * @returns
     */
    get_group_msg_history(message_seq, group_id) {
        return this.post('get_group_msg_history',
            {
                message_seq: message_seq,
                group_id: group_id
            });
    }

    /**
     * 设置精华消息
     * @param {Number} message_id 消息ID
     */
    set_essence_msg(message_id) {
        this.post('set_essence_msg', { message_id: message_id });
    }

    /**
     * 移出精华消息
     * @param {Number} message_id 消息ID
     */
    delete_essence_msg(message_id) {
        this.post('delete_essence_msg', { message_id: message_id });
    }

    /**
     * 获取精华消息列表
     * @param {Number} group_id 群号
     * @returns
     */
    get_essence_msg_list(group_id) {
        this.post('get_essence_msg_list', { group_id: group_id });
    }

    /**
     * 检查链接安全性
     * @param {String} url 需要检查的链接
     * @returns
     */
    check_url_safely(url) {
        return this.post('check_url_safely', { url: url });
    }

    /**
     * 获取在线机型
     * @param {String} model 机型名称
     * @returns
     */
    _get_model_show(model) {
        return this.post('_get_model_show', { model: model });
    }

    /**
     * 设置在线机型
     * @param {String} model 机型名称
     */
    _set_model_show(model, model_show) {
        this.post('_get_model_show',
            {
                model: model,
                model_show: model_show
            });
    }

    /**
     * 删除单向好友
     * @param {Number} user_id QQ 号
     */
    delete_unidirectional_friend(user_id) {
        this.post('delete_unidirectional_friend', { user_id: user_id });
    }

    /**
     * 获取频道系统内BOT的资料
     * @returns
     */
    get_guild_service_profile() {
        return this.post('get_guild_service_profile');
    }

    /**
     * 获取频道列表
     * @returns
     */
    get_guild_list() {
        return this.post('get_guild_list');
    }

    /**
     * 通过访客获取频道元数据
     * @param {String} guild_id 频道ID
     * @returns
     */
    get_guild_meta_by_guest(guild_id) {
        return this.post('get_guild_meta_by_guest', {
            guild_id: guild_id
        });
    }

    /**
     * 获取子频道列表
     * @param {String} guild_id 频道ID
     * @param {Boolean} no_cache 是否无视缓存
     * @returns
     */
    get_guild_channel_list(guild_id, no_cache) {
        return this.post('get_guild_channel_list', {
            guild_id: guild_id,
            no_cache: Boolean(no_cache)
        });
    }

    /**
     * 获取频道成员列表
     * @param {String} guild_id 频道ID
     * @param {String} next_token 翻页Token
     * @returns
     */
    get_guild_member_list(guild_id, next_token) {
        return this.post('get_guild_member_list', {
            guild_id: guild_id,
            next_token: next_token
        });
    }

    /**
     * 单独获取频道成员信息
     * @param {String} guild_id 频道ID
     * @param {String} user_id 用户ID
     * @returns
     */
    get_guild_member_profile(guild_id, user_id) {
        return this.post('get_guild_member_profile', {
            guild_id: guild_id,
            user_id: user_id
        });
    }

    /**
     * 发送信息到子频道
     * @param {String} guild_id 频道ID
     * @param {String} channel_id 子频道ID
     * @param {String} message 消息, 与原有消息类型相同
     * @returns
     */
    send_guild_channel_msg(guild_id, channel_id, message) {
        return this.post('get_guild_member_profile', {
            guild_id: guild_id,
            channel_id: channel_id,
            message: message
        });
    }

    /**
     * 获取话题频道帖子
     * @param {String} guild_id 频道ID
     * @param {String} channel_id 子频道ID
     * @returns
     */
    get_topic_channel_feeds(guild_id, channel_id) {
        return this.post('get_topic_channel_feeds', {
            guild_id: guild_id,
            channel_id: channel_id
        });
    }

    /**
     * 获取频道消息
     * @param {String} message_id 频道消息ID
     * @param {Boolean} no_cache 是否不使用缓存（使用缓存可能更新不及时, 但响应更快）
     * @returns
     */
    get_guild_msg(message_id, no_cache = false) {
        return this.post('get_guild_msg', {
            message_id: message_id,
            no_cache: Boolean(no_cache)
        });
    }

    /**
     * 删除频道角色
     * @param {String} guild_id 频道ID
     * @param {String} role_id 角色ID
     */
    delete_guild_role(guild_id, role_id) {
        this.post('delete_guild_role', {
            guild_id: guild_id,
            role_id: role_id
        })
    }

    /**
     * 修改频道角色
     * @param {String} guild_id 频道ID
     * @param {String} role_id 角色ID
     * @param {String} name 角色名
     * @param {String} color 颜色(示例:`4294927682`)
     * @param {Boolean} independent 未知
     */
    edit_guild_role(guild_id, role_id, name, color, independent = false) {
        this.post('edit_guild_role', {
            guild_id: guild_id,
            role_id: role_id,
            name: name,
            color: color,
            independent: independent
        });
    }

    /**
     * 创建频道角色
     * @param {String} guild_id 频道ID
     * @param {String} name 角色名
     * @param {String} color 颜色(示例:`4294927682`)
     * @param {Boolean} independent 未知
     * @param {Array} initial_users
     * @returns
     */
    create_guild_role(guild_id, name, color, independent = false, initial_users = []) {
        return this.post('create_guild_role', {
            guild_id: guild_id,
            name: name,
            color: color,
            independent: independent,
            initial_users: initial_users
        });
    }
}
