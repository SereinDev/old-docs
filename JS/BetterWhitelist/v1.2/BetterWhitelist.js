/*!
 * @Author       : Maraudern
 * @Date         : 2023-01-16 20:19:47
 * @LastEditors  : Maraudern
 * @LastEditTime : 2023-02-03 00:22:13
 * @FilePath     : \Serein\BetterWhitelist.js
 * @Description  : 更好的白名单
 */
var betterWhiteList = {
	name: "更好的白名单",
	version: "v1.2",
	author: "9Yan",
	description: "更完善的白名单增删方案，需删除面板白名单相关正则",
};
serein.registerPlugin(betterWhiteList.name, betterWhiteList.version, betterWhiteList.author, betterWhiteList.description);

const File = importNamespace("System.IO").File;
const Directory = importNamespace("System.IO").Directory;
const Encoding = importNamespace("System.Text").Encoding;

const PluginPath = "plugins/BetterWhiteList/config.json"; // 插件配置
const MemberPath = "data/members.json"; // 成员管理

const isXboxID = /^[A-Za-z]{1}[0-9A-Za-z ]{4,14}$/; // 判断 XboxID
const isQQNumber = /^[0-9]{5,11}$/; // 判断 QQ号
const isCqAt = /^\[CQ:at,qq=(\d+)\]$/; // 判断 CQ:at

var config;

// 确定配置文件夹是否存在
if (!Directory.Exists("plugins/BetterWhiteList")) {
	Directory.CreateDirectory("plugins/BetterWhiteList");
}
// 确定配置文件是否存在
if (!File.Exists(PluginPath)) {
	writeConfig();
	serein.log("成功初始化配置文件");
} else {
	config = JSON.parse(File.ReadAllText(PluginPath));
	serein.log("成功加载配置文件");
}
// 确认版本是否正确
if (config.version != betterWhiteList.version) {
	writeConfig();
	serein.log("成功更新插件，请重新配置插件");
}

function writeConfig() {
	config = {
		version: betterWhiteList.version,
		ignoreGroup: [],
		"1//": "排除监听指定群聊（使用“,”分隔）",
		exitGroup: true,
		"2//": "是否开启 退群后自动删除该成员管理的数据",
		editCard: true,
		"3//": "是否开启 绑定后自动修改群名片为 XboxID（需管理员权限）",
		whiteList: true,
		"4//": "是否开启 同步成员管理与游戏白名单",
		bindSelf: true,
		"5//": "是否开启 群成员使用绑定命令的权限",
		serverStatusListener: true,
		"6//": "是否开启 检测到服务器关闭时禁止使用绑定",
	};
	File.WriteAllText(PluginPath, JSON.stringify(config, null, 4));
	return;
}

/**
 * @description: 判断是否在面板管理权限列表
 * @param {Number} userID QQ号
 * @return {Boolean} 是为true，否为false
 */
function isPermission(userID) {
	return Boolean(JSON.parse(serein.getSettings()).Bot.PermissionList.indexOf(userID) + 1);
}

/**
 * @description: 判断是否在面板监听群列表
 * @param {Number} groupID QQ群号
 * @return {Boolean} 是为true，否为false
 */
function isListenerGroup(groupID) {
	return Boolean(JSON.parse(serein.getSettings()).Bot.GroupList.indexOf(groupID) + 1);
}

/**
 * @description: 添加白名单
 * @param {Number} groupID QQ群号
 * @param {Number} userID QQ号
 * @param {String} xboxID 游戏ID
 * @return {Boolean} 成功为true，否则为false
 */
function whiteListAdd(groupID, userID, xboxID) {
	if (config.whiteList) serein.sendCmd(`whitelist add "${xboxID}"`);
	if (config.editCard) editCard(groupID, userID, xboxID);
	return serein.bindMember(userID, xboxID);
}

/**
 * @description: 删除白名单
 * @param {Number} userID QQ号
 * @param {String} xboxID 游戏ID
 * @return {Boolean} 成功为true，否则为false
 */
function whiteListRemove(userID, xboxID) {
	if (config.whiteList) {
		serein.sendCmd(`whitelist remove "${xboxID}"`);
	}
	return serein.unbindMember(userID); // 1.3.3 版本 unbindMember 返回值有误
}

/**
 * @description: 修改群昵称
 * @param {Number} group_id QQ群号
 * @param {Number} user_id QQ号
 * @param {String} card 群昵称
 * @return {*}
 */
function editCard(group_id, user_id, card) {
	serein.log("group_id" + group_id + "\n user_id" + user_id);
	serein.sendPacket(
		JSON.stringify({
			action: "set_group_card",
			params: {
				group_id: group_id,
				user_id: user_id,
				card: card,
			},
		})
	);
}

serein.setListener("onGroupDecrease", (groupId, userId) => {
	if (!config.exitGroup || !isListenerGroup(groupId) || Boolean(config.ignoreGroup.indexOf(groupId) + 1)) return;

	serein.sendGroup(groupId, "群成员 " + userId + " 退群了，尝试删除白名单");

	if (config.serverStatusListener && !serein.getServerStatus()) {
		serein.sendGroup(groupId, "服务器未开启！, 无法删除白名单");
		return;
	}

	var xboxID = serein.getGameID(userId);

	if (!xboxID) {
		serein.sendGroup(groupId, "群成员" + userId + "没有绑定白名单！");
		return;
	}

	whiteListRemove(userId, xboxID);
	//if (whiteListRemove(qqNumber, xboxID))
	serein.sendGroup(groupId, `成功删除：${xboxID}（${userId}）`);
	//}
	return;
});

serein.setListener("onReceiveGroupMessage", (groupId, userId, msg, shownName) => {
	if (!isListenerGroup(groupId) || Boolean(config.ignoreGroup.indexOf(groupId) + 1)) return;
	if (config.serverStatusListener && !serein.getServerStatus()) {
		serein.sendGroup(groupId, "服务器未开启！");
		return;
	}

	let command = msg.split(" ").filter((item) => item && item.trim());
	let keyWord = command[0];
	command.splice(0, 1);

	switch (keyWord.toLowerCase()) {
		case "添加白名单":
		case "wladd":
		case "whitelistadd":
			// 判断是否有管理员权限
			if (!isPermission(userId)) {
				serein.sendGroup(groupId, "您没有<添加白名单>的权限！");
				return;
			}

			var qqNumber = command[0].replace(isCqAt, "$1");
			command.splice(0, 1);

			// 判断是否为 QQ 号
			if (!isQQNumber.test(qqNumber)) {
				serein.sendGroup(groupId, `意外的：>>${qqNumber}<< \n应当为：<QQ号> 或 <@成员>`);
				return;
			}

			// 判断分割数组是否有值
			if (!command.length) {
				serein.sendGroup(groupId, `语法错误，请发送：\n\n${keyWord} <QQ号>(@成员) <XboxID>`);
				return;
			}

			var text = command.join(" ");

			// 判断 text 是否符合 xboxID 规范
			if (!isXboxID.test(text)) {
				serein.sendGroup(groupId, `意外的：>>${text}<< \n应当为：<XboxID>`);
				return;
			}

			var xboxID = serein.getGameID(qqNumber);
			var members = JSON.parse(File.ReadAllText(MemberPath, Encoding.UTF8));

			for (let i = 0; i < members.data.length; i++) {
				if (text === members.data[i].GameID) {
					serein.sendGroup(groupId, `绑定失败，存在相同 XboxID\n${text}（${members.data[i].ID}）`);
					return;
				}
			}

			if (xboxID) {
				whiteListRemove(qqNumber, xboxID);
				if (whiteListAdd(groupId, qqNumber, text)) {
					serein.sendGroup(groupId, `已存在数据：\n${xboxID}(${qqNumber})\n成功修改为：\n${text}(${qqNumber})`);
				}
				return;
			}

			if (whiteListAdd(groupId, qqNumber, text)) {
				serein.sendGroup(groupId, `绑定成功：${text}（${qqNumber}）`);
			}
			return;

		case "删除白名单":
		case "wldel":
		case "whitelistdelete":
			// 判断是否有管理员权限
			if (!isPermission(userId)) {
				serein.sendGroup(groupId, "您没有<删除白名单>的权限！");
				return;
			}

			// 判断分割数组是否有值
			if (!command.length) {
				serein.sendGroup(groupId, `语法错误，请发送：\n\n${keyWord} <QQ号>(@成员)`);
				return;
			}

			var qqNumber = command[0].replace(isCqAt, "$1");

			// 判断是否是QQ号
			if (!isQQNumber.test(qqNumber)) {
				serein.sendGroup(groupId, `意外的：>>${qqNumber}<<\n应当为：<QQ号>(@成员)`);
				return;
			}

			var xboxID = serein.getGameID(qqNumber);

			if (!xboxID) {
				serein.sendGroup(groupId, "没有绑定白名单！");
				return;
			}

			whiteListRemove(qqNumber, xboxID);
			//if (whiteListRemove(qqNumber, xboxID))
			serein.sendGroup(groupId, `成功删除：${xboxID}（${qqNumber}）`);
			//}
			return;

		case "白名单列表":
		case "wllist":
		case "whitelist":
			// 判断是否有管理员权限
			if (!isPermission(userId)) {
				serein.sendGroup(groupId, "您没有<查看白名单列表>的权限！");
				return;
			}
		case "绑定":
		case "bind":
			// 判断是否有管理员权限 或 配置是否开启 bindSelf
			if (!isPermission(userId) && !config.bindSelf) {
				serein.sendGroup(groupId, "您没有<绑定白名单>的权限！");
				return;
			}

			// 判断分割数组是否有值
			if (!command.length) {
				serein.sendGroup(groupId, `语法错误，请发送：\n\n${keyWord} <XboxID>`);
				return;
			}

			var text = command.join(" ");

			// 判断 text 是否符合 xboxID 规范
			if (!isXboxID.test(text)) {
				serein.sendGroup(groupId, `意外的：>>${text}<< \n应当为：<XboxID>`);
				return;
			}

			var xboxID = serein.getGameID(userId);
			var members = JSON.parse(File.ReadAllText(MemberPath, Encoding.UTF8));

			for (let i = 0; i < members.data.length; i++) {
				if (text === members.data[i].GameID) {
					serein.sendGroup(groupId, `绑定失败，存在相同 XboxID\n${text}（${members.data[i].ID}）`);
					return;
				}
			}

			if (xboxID) {
				whiteListRemove(userId, xboxID);
				if (whiteListAdd(groupId, userId, text)) {
					serein.sendGroup(groupId, `已存在数据：\n${xboxID}(${userId})\n成功修改为：\n${text}(${userId})`);
				}
				return;
			}

			if (whiteListAdd(groupId, userId, text)) {
				serein.sendGroup(groupId, `绑定成功：${text}（${userId}）`);
			}
			return;

		case "解绑":
		case "unbind":
			// 判断是否有管理员权限 或 配置是否开启 bindSelf
			if (!isPermission(userId) && !config.bindSelf) {
				serein.sendGroup(groupId, "您没有<解绑白名单>的权限！");
				return;
			}

			var xboxID = serein.getGameID(userId);

			if (!xboxID) {
				serein.sendGroup(groupId, "您没有绑定白名单！");
				return;
			}

			whiteListRemove(userId, xboxID);
			//if (whiteListRemove(userId, xboxID))
			serein.sendGroup(groupId, `成功解绑：${xboxID}（${userId}）`);
			//}
			return;

			break;
	}
});
