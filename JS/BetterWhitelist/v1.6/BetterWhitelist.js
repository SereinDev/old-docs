/*!
 * @Author       : Maraudern
 * @Date         : 2023-01-16 20:19:47
 * @LastEditors  : 9Yan
 * @LastEditTime : 2023-04-01 23:25:33
 * @FilePath     : \Serein-Plugins\BetterWhitelist.js
 * @Description  : 更好的白名单
 */
var betterWhiteList = {
	name: "更好的白名单",
	version: "v1.6",
	author: "9Yan",
	description: "更完善的白名单管理方案，基于Serein成员管理，需禁用白名单相关正则",
};
serein.registerPlugin(betterWhiteList.name, betterWhiteList.version, betterWhiteList.author, betterWhiteList.description);

const File = importNamespace("System.IO").File;
const Directory = importNamespace("System.IO").Directory;
const Encoding = importNamespace("System.Text").Encoding;

const isGameID = /^[0-9A-Za-z_]{1}[0-9A-Za-z_ ]{2,15}$/;
const isQQNumber = /^[0-9]{5,11}$/;
const isCqAt = /^\[CQ:at,qq=(\d+)\]$/;
const isEnterServer = /^.*?Player\sSpawned:\s(.*?)\sxuid:.*$/;
const isPath = /([^<>/\\\|:""\*\?]+)\.\w+$/;

const PluginPath = "plugins/BetterWhiteList/config.json";
const MemberPath = "data/members.json";

var whiteListPath;
var config, members, whiteList;

if (!Directory.Exists("plugins/BetterWhiteList")) {
	Directory.CreateDirectory("plugins/BetterWhiteList");
}

if (!File.Exists(PluginPath)) {
	writeConfig();
	serein.log("插件配置文件初始化成功");
} else {
	config = JSON.parse(File.ReadAllText(PluginPath));
	serein.log("插件配置文件加载成功");
}

if (config.version != betterWhiteList.version) {
	writeConfig();
	serein.log("插件更新成功，请重新配置插件");
}

function writeConfig() {
	config = {
		version: betterWhiteList.version,
		ignoreGroup: [],
		ignoreGroupNote: "排除监听群列表 (使用“,”分隔)",
		bindSelf: true,
		bindSelfNote: "群成员使用绑定/解绑命令的权限 (true/false)",
		syncWhiteList: true,
		syncWhiteListNote: "自动同步serein成员管理与服务器白名单 (true/false)",
		exitGroup: true,
		exitGroupNote: "自动删除退群成员的serein成员管理数据 (true/false)",
		editCard: true,
		editCardNote: "绑定时自动修改群成员的群名片为GameID,需管理员权限 (true/false)",
		sendGroup: true,
		sendGroupNote: "向群聊中发送回复信息,关闭后可防止多服发送重复信息 (true/false)",
		onlineMode: true,
		onlineModeNote: "添加白名单时检测GameID是否符合规范 (true/false)",
		memberWhiteList: false,
		memberWhiteListNote: "将serein成员管理设为服务器白名单,使用llbds且关闭bds白名单可开启 (true/false)",
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
 * @description: 判断是否在排除监听群列表
 * @param {Number} groupID QQ群号
 * @return {Boolean} 是为true，否为false
 */
function isIgnoreGroup(groupID) {
	return Boolean(config.ignoreGroup.indexOf(groupID) + 1);
}

/**
 * @description: 判断是否在成员管理列表
 * @param {String} GameID 游戏ID
 * @return {Number} 是为数组下标，否为-1
 */
function isMember(GameID) {
	members = JSON.parse(File.ReadAllText(MemberPath, Encoding.UTF8));
	let data = -1;
	for (let i = 0; i < members.data.length; i++) {
		if (GameID === members.data[i].GameID) {
			data = i;
			break;
		}
	}
	return data;
}

/**
 * @description: 添加白名单
 * @param {Number} groupID QQ群号
 * @param {Number} userID QQ号
 * @param {String} GameID 游戏ID
 * @return {Boolean} 成功为true，否则为false
 */
function whiteListAdd(groupID, userID, GameID) {
	if (config.syncWhiteList) serein.sendCmd(`whitelist add "${GameID}"`);
	if (config.editCard) editCard(groupID, userID, GameID);
	return serein.bindMember(userID, GameID);
}

/**
 * @description: 删除白名单
 * @param {Number} userID QQ号
 * @param {String} GameID 游戏ID
 * @return {Boolean} 成功为true，否则为false
 */
function whiteListRemove(userID, GameID) {
	serein.sendCmd(`whitelist remove "${GameID}"`);
	serein.sendCmd(`kick "${GameID}" You do not have a whitelist!`);
	return serein.unbindMember(userID); // 在 1.3.3 版本及以下 unbindMember 返回值有误
}

/**
 * @description: 修改群昵称
 * @param {Number} groupID QQ群号
 * @param {Number} userID QQ号
 * @param {String} card 群昵称
 * @return {*}
 */
function editCard(groupID, userID, card) {
	serein.sendPacket(
		JSON.stringify({
			action: "set_group_card",
			params: {
				group_id: groupID,
				user_id: userID,
				card: card,
			},
		})
	);
}

/**
 * @description: 同步白名单
 * @return {*}
 */
function syncWhiteList(groupID) {
	if (config.sendGroup) serein.sendGroup(groupID, "正在同步白名单...");

	var errorWhiteList = [];
	var errorNumber = [];

	whiteListPath = JSON.parse(serein.getSettings()).Server.Path.replace(isPath, "allowlist.json");
	if (!File.Exists(whiteListPath)) whiteListPath = whiteListPath.replace(isPath, "whitelist.json");
	whiteList = JSON.parse(File.ReadAllText(whiteListPath));
	members = JSON.parse(File.ReadAllText(MemberPath, Encoding.UTF8));

	setTimeout(() => {
		var oldIds = whiteList.map((item) => item.name);
		var newIds = members.data.filter((item) => !oldIds.includes(item.GameID));
		newIds.forEach((item) => {
			errorWhiteList.push(item.GameID);
			serein.sendCmd(`whitelist add "${item.GameID}"`);
		});
		if (errorWhiteList.length) {
			let str = errorWhiteList.join(",");
			if (config.sendGroup) serein.sendGroup(groupID, "添加白名单：\n" + str);
		}

		var oldIds = members.data.map((item) => item.GameID);
		var newIds = whiteList.filter((item) => !oldIds.includes(item.name));
		newIds.forEach((item) => {
			errorNumber.push(item.name);
			serein.sendCmd(`whitelist remove "${item.name}"`);
		});
		if (errorNumber.length) {
			let str = errorNumber.join(",");
			if (config.sendGroup) serein.sendGroup(groupID, "删除白名单：\n" + str);
		}

		if (!errorWhiteList.length && !errorNumber.length && config.sendGroup) serein.sendGroup(groupID, "没有需要同步的白名单");
	}, 1000);
	return;
}

serein.setListener("onServerStart", () => {
	for (let i = 0; i < JSON.parse(serein.getSettings()).Bot.GroupList.length; i++) {
		if (!isIgnoreGroup(JSON.parse(serein.getSettings()).Bot.GroupList[i])) {
			var groupID = JSON.parse(serein.getSettings()).Bot.GroupList[i];
			break;
		}
	}
	syncWhiteList(groupID);
});

serein.setListener("onReceiveGroupMessage", (groupID, userID, msg, shownName) => {
	if (!isListenerGroup(groupID) || isIgnoreGroup(groupID)) return;

	let command = msg.split(" ").filter((item) => item && item.trim());
	let keyWord = command[0];
	command.splice(0, 1);

	switch (keyWord.toLowerCase()) {
		case "绑定":
		case "bind":
			if (!isPermission(userID) && !config.bindSelf) {
				if (config.sendGroup) serein.sendGroup(groupID, "您没有使用<" + keyWord + ">的权限！");
				return;
			}

			if (!command.length) {
				if (config.sendGroup) serein.sendGroup(groupID, "语法错误，请发送：\n" + keyWord + " <GameID>");
				return;
			}

			var text = command.join(" ");
			if (config.onlineMode && !isGameID.test(text)) {
				if (config.sendGroup) serein.sendGroup(groupID, "意外的：>>" + text + "<<\n应当为：<GameID>");
				return;
			}

			var index = isMember(text);
			if (index + 1) {
				if (config.sendGroup) serein.sendGroup(groupID, `绑定失败，存在相同 GameID\n${text}（${members.data[index].ID}）`);
				return;
			}

			var GameID = serein.getGameID(userID);
			if (GameID) {
				whiteListRemove(userID, GameID);
				if (whiteListAdd(groupID, userID, text) && config.sendGroup)
					serein.sendGroup(groupID, `已存在数据：\n${GameID}(${userID})\n成功修改为：\n${text}(${userID})`);
				return;
			}

			if (whiteListAdd(groupID, userID, text) && config.sendGroup) serein.sendGroup(groupID, `绑定成功：${text}（${userID}）`);
			return;

		case "解绑":
		case "unbind":
			if (!isPermission(userID) && !config.bindSelf) {
				if (config.sendGroup) serein.sendGroup(groupID, "您没有使用<" + keyWord + ">的权限！");
				return;
			}

			var GameID = serein.getGameID(userID);
			if (!GameID) {
				if (config.sendGroup) serein.sendGroup(groupID, "您没有绑定白名单！");
				return;
			}

			if (whiteListRemove(userID, GameID) && config.sendGroup) serein.sendGroup(groupID, `成功解绑：${GameID}（${userID}）`);
			return;

		case "添加白名单":
		case "wladd":
		case "whitelistadd":
			if (!isPermission(userID)) {
				if (config.sendGroup) serein.sendGroup(groupID, "您没有使用<" + keyWord + ">的权限！");
				return;
			}

			if (!command.length) {
				if (config.sendGroup) serein.sendGroup(groupID, "语法错误，请发送：\n" + keyWord + " <QQ号(@成员)> <GameID>");
				return;
			}

			var qqNumber = command[0].replace(isCqAt, "$1");
			command.splice(0, 1);
			if (!isQQNumber.test(qqNumber)) {
				if (config.sendGroup) serein.sendGroup(groupID, "意外的：>>" + qqNumber + "<< \n应当为：<QQ号(@成员)>");
				return;
			}

			var text = command.join(" ");
			if (config.onlineMode && !isGameID.test(text)) {
				if (config.sendGroup) serein.sendGroup(groupID, "意外的：>>" + text + "<<\n应当为：<GameID>");
				return;
			}

			var index = isMember(text);
			if (index + 1) {
				if (config.sendGroup) serein.sendGroup(groupID, `绑定失败，存在相同 GameID\n${text}（${members.data[index].ID}）`);
				return;
			}

			var GameID = serein.getGameID(qqNumber);
			if (GameID) {
				whiteListRemove(qqNumber, GameID);
				if (whiteListAdd(groupID, qqNumber, text) && config.sendGroup)
					serein.sendGroup(groupID, `已存在数据：\n${GameID}(${qqNumber})\n成功修改为：\n${text}(${qqNumber})`);

				return;
			}

			if (whiteListAdd(groupID, qqNumber, text) && config.sendGroup) serein.sendGroup(groupID, `绑定成功：${text}（${qqNumber}）`);
			return;

		case "删除白名单":
		case "wldel":
		case "whitelistdelete":
			if (!isPermission(userID)) {
				if (config.sendGroup) serein.sendGroup(groupID, "您没有使用<" + keyWord + ">的权限！");
				return;
			}

			if (!command.length) {
				if (config.sendGroup) serein.sendGroup(groupID, "语法错误，请发送：\n" + keyWord + " <QQ号(@成员)> <GameID>");
				return;
			}

			var qqNumber = command[0].replace(isCqAt, "$1");
			if (!isQQNumber.test(qqNumber)) {
				if (config.sendGroup) serein.sendGroup(groupID, "意外的：>>" + qqNumber + "<< \n应当为：<QQ号(@成员)>");
				return;
			}

			var GameID = serein.getGameID(qqNumber);
			if (!GameID) {
				if (config.sendGroup) serein.sendGroup(groupID, "没有绑定白名单！");
				return;
			}

			if (whiteListRemove(qqNumber, GameID) && config.sendGroup) serein.sendGroup(groupID, `成功删除：${GameID}（${qqNumber}）`);
			return;

		case "白名单列表":
		case "wllist":
		case "whitelist":
			if (!isPermission(userID)) {
				if (config.sendGroup) serein.sendGroup(groupID, "您没有使用<" + keyWord + ">的权限！");
				return;
			}

			whiteListPath = JSON.parse(serein.getSettings()).Server.Path.replace(isPath, "allowlist.json");
			if (!File.Exists(whiteListPath)) whiteListPath = whiteListPath.replace(isPath, "whitelist.json");
			whiteList = JSON.parse(File.ReadAllText(whiteListPath));
			members = JSON.parse(File.ReadAllText(MemberPath, Encoding.UTF8));

			Array = [];
			for (let i = 0; i < members.data.length; i++) {
				let isCorrect = "❗";
				for (let j = 0; j < whiteList.length; j++) {
					if (members.data[i].GameID === whiteList[j].name) isCorrect = "✔";
				}
				let isName = members.data[i].Card ? members.data[i].Card : members.data[i].Nickname ? members.data[i].Nickname : members.data[i].ID;
				Array.push({
					type: "node",
					data: {
						name: "『" + i + "』" + isName,
						uin: members.data[i].ID,
						content: "成员管理数据：\n" + members.data[i].GameID + "(" + members.data[i].ID + ")\n服务器白名单：" + isCorrect,
					},
				});
			}

			if (config.sendGroup) {
				while (Array.length > 90) {
					serein.sendPacket(
						'{"action": "send_group_forward_msg","params": {"group_id": "' + groupID + '","messages": ' + JSON.stringify(Array.splice(0, 90)) + "}}"
					);
				}
				serein.sendPacket('{"action": "send_group_forward_msg","params": {"group_id": "' + groupID + '","messages": ' + JSON.stringify(Array) + "}}");
			}
			return;

		case "同步白名单":
		case "syncwl":
		case "syncwhitelist":
			if (!isPermission(userID)) {
				if (config.sendGroup) serein.sendGroup(groupID, "您没有使用<" + keyWord + ">的权限！");
				return;
			}

			if (!command.length) {
				syncWhiteList(groupID);
				return;
			}

			var qqNumber = command[0].replace(isCqAt, "$1");
			if (!isQQNumber.test(qqNumber)) {
				if (config.sendGroup) serein.sendGroup(groupID, "意外的：>>" + qqNumber + "<< \n应当为：<QQ号(@成员)>");
				return;
			}

			var GameID = serein.getGameID(qqNumber);
			if (!GameID) {
				if (config.sendGroup) serein.sendGroup(groupID, `该成员未绑定 <GameID>`);
				return;
			}

			serein.sendCmd(`whitelist add "${GameID}"`);
			if (config.sendGroup) serein.sendGroup(groupID, `白名单同步成功：${GameID}（${qqNumber}）`);
			return;
	}
});

serein.setListener("onGroupDecrease", (groupID, userID) => {
	if (!config.exitGroup || !isListenerGroup(groupID) || isIgnoreGroup(groupID)) return;

	if (config.sendGroup) serein.sendGroup(groupID, "群成员 " + userID + " 退群了，尝试删除白名单");

	var GameID = serein.getGameID(userID);
	if (!GameID) {
		if (config.sendGroup) serein.sendGroup(groupID, "群成员" + userID + "没有绑定白名单！");
		return;
	}

	whiteListRemove(userID, GameID);
	if (whiteListRemove(qqNumber, GameID) && config.sendGroup) serein.sendGroup(groupID, `成功删除：${GameID}（${userID}）`);
	return;
});

serein.setListener("onServerOutput", (text) => {
	if (!config.memberWhiteList || !isEnterServer.test(text)) return;

	let GameID = text.replace(isEnterServer, "$1");
	if (isMember(GameID) + 1) return;

	for (let i = 0; i < JSON.parse(serein.getSettings()).Bot.PermissionList.length; i++) {
		if (!isIgnoreGroup(JSON.parse(serein.getSettings()).Bot.PermissionList[i])) {
			var PermissionID = JSON.parse(serein.getSettings()).Bot.PermissionList[i];
			break;
		}
	}

	serein.sendPrivate(PermissionID, "玩家 " + GameID + " 没有白名单，尝试进入");
	setTimeout(() => {
		serein.sendCmd('kick "' + GameID + '" You do not have a whitelist!');
	}, 1000);
});
