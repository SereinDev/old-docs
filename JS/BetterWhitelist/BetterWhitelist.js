/*!
 * @Author       : Maraudern
 * @Date         : 2023-01-16 20:19:47
 * @LastEditors  : 9Yan
 * @LastEditTime : 2023-05-09 18:31:06
 * @FilePath     : \Serein-Docse:\Workspace\VSCode\Javascript\Serein-Plugins\Serein\plugins\BetterWhitelist.js
 * @Description  : 更好的白名单
 */
/// <reference path="CommandHelper.d.ts"/>
/// <reference path="SereinJSPluginHelper/index.d.ts"/>
/// @ts-check

"use strict";

const FILE = importNamespace("System.IO").File;
const DIRECTORY = importNamespace("System.IO").Directory;
const ENCODING = importNamespace("System.Text").Encoding;

const CONFIG_PATH = "plugins/BetterWhitelist/config.json";
const MEMBERS_PATH = "data/members.json";

const IS_GAME_ID = /^[0-9A-Za-z_ ]{3,16}$/;
const IS_QQ_NUMBER = /^[0-9]{5,11}$/;
const IS_CQ_AT = /^\[CQ:at,qq=(\d+)\]$/;
const IS_PATH = /([^<>/\\\|:""\*\?]+)\.\w+$/;

var whitelistPath, whitelist, config, members;
var logger = new Logger("betterWhitelist");
var betterWhitelist = {
	name: "更好的白名单",
	version: "v1.8",
	author: "9Yan",
	description: "更完善的白名单管理方案，基于Serein成员管理，需禁用白名单相关正则",
};
serein.registerPlugin(betterWhitelist.name, betterWhitelist.version, betterWhitelist.author, betterWhitelist.description);

if (!DIRECTORY.Exists("plugins/BetterWhitelist")) {
	DIRECTORY.CreateDirectory("plugins/BetterWhitelist");
}
if (!FILE.Exists(CONFIG_PATH)) {
	init();
	logger.info("配置初始化成功");
} else {
	config = JSON.parse(FILE.ReadAllText(CONFIG_PATH));
	logger.info("配置加载成功");
}
if (config.version != betterWhitelist.version) {
	init();
	logger.info("插件已更新，请重新进行配置");
}

function init() {
	config = {
		NOTICE: "如何配置请查阅文档 https://market.serein.cc/resources/BetterWhitelistt#配置文件",
		version: betterWhitelist.version,
		ignoreGroup: [],
		hasBind: true,
		exitGroup: true,
		editCard: true,
		onlineMode: true,
		sendGroup: true,
		syncWhitelist: true,
		betterMembers: {
			enable: false,
			interServer: ["^.*?Player Spawned: (.*?) xuid:.*$", "^.*?Player connected: (.*?), xuid:.*$"],
			interServerReply: "^.*?Kicked (.*?) .*You do not have a whitelist!.*$",
		},
		command: {
			bind: {
				name: "绑定",
				keywords: ["绑定", "bind"],
			},
			unbind: {
				name: "解绑",
				keywords: ["解绑", "unbind"],
			},
			whitelistAdd: {
				name: "添加白名单",
				keywords: ["添加白名单", "whitelistadd", "wladd"],
			},
			whitelistDelete: {
				name: "删除白名单",
				keywords: ["删除白名单", "whitelistdelete", "wldel"],
			},
			syncWhitelist: {
				name: "同步白名单",
				keywords: ["同步白名单", "whitelistsync", "wlsync"],
			},
			whitelist: {
				name: "白名单列表",
				keywords: ["白名单列表", "whitelist", "wllist"],
			},
		},
	};
	FILE.WriteAllText(CONFIG_PATH, JSON.stringify(config, null, 4));
}

/**
 * @description: 在serein管理权限列表
 * @param {Number} userID QQ号
 * @return {Boolean} 是为true，否为false
 */
function hasPermission(userID) {
	return Boolean(serein.getSettingsObject().bot.permissionList.indexOf(userID) + 1);
}

/**
 * @description: 在serein监听群列表
 * @param {Number} groupID QQ群号
 * @return {Boolean} 是为true，否为false
 */
function isGroup(groupID) {
	return Boolean(serein.getSettingsObject().bot.groupList.indexOf(groupID) + 1);
}

/**
 * @description: 在serein成员管理列表
 * @param {String} gameID 游戏ID
 * @return {Number} 是为数组下标，否为-1
 */
function isMember(gameID) {
	members = JSON.parse(FILE.ReadAllText(MEMBERS_PATH, ENCODING.UTF8));
	let data = -1;
	for (let i = 0; i < members.data.length; i++) {
		if (gameID === members.data[i].gameID) {
			data = i;
			break;
		}
	}
	return data;
}

/**
 * @description: 在betterWhitelist排除监听群列表
 * @param {Number} groupID QQ群号
 * @return {Boolean} 是为true，否为false
 */
function isIgnoreGroup(groupID) {
	return Boolean(config.ignoreGroup.indexOf(groupID) + 1);
}

/**
 * @description: 添加白名单
 * @param {Number} groupID QQ群号
 * @param {Number} userID QQ号
 * @param {String} gameID 游戏ID
 * @return {Boolean} 成功为true，否则为false
 */
function whitelistAdd(groupID, userID, gameID) {
	if (config.syncWhitelist) {
		serein.sendCmd(`whitelist add "${gameID}"`);
	}
	if (config.editCard) {
		editCard(groupID, userID, gameID);
	}
	return serein.bindMember(userID, gameID);
}

/**
 * @description: 删除白名单
 * @param {Number} userID QQ号
 * @param {String} gameID 游戏ID
 * @return {Boolean} 成功为true，否则为false
 */
function whitelistRemove(userID, gameID) {
	serein.sendCmd(`whitelist remove "${gameID}"`);
	serein.sendCmd(`kick "${gameID}" You do not have a whitelist!`);
	return serein.unbindMember(userID);
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
function syncWhitelist(groupID) {
	if (config.sendGroup) {
		serein.sendGroup(groupID, "正在同步白名单...");
	}

	var errorWhitelist = [];
	var errorNumber = [];

	whitelistPath = serein.getSettingsObject().server.path.replace(IS_PATH, "allowlist.json");
	if (!FILE.Exists(whitelistPath)) {
		whitelistPath = whitelistPath.replace(IS_PATH, "whitelist.json");
	}
	whitelist = JSON.parse(FILE.ReadAllText(whitelistPath, ENCODING.UTF8));
	members = JSON.parse(FILE.ReadAllText(MEMBERS_PATH, ENCODING.UTF8));

	setTimeout(() => {
		var oldIds = whitelist.map((item) => item.name);
		var newIds = members.data.filter((item) => !oldIds.includes(item.gameID));
		newIds.forEach((item) => {
			errorWhitelist.push(item.gameID);
			serein.sendCmd(`whitelist add "${item.gameID}"`);
		});
		if (errorWhitelist.length) {
			let str = errorWhitelist.join(",");
			if (config.sendGroup) {
				serein.sendGroup(groupID, "添加白名单：\n" + str);
			}
		}

		var oldIds = members.data.map((item) => item.gameID);
		var newIds = whitelist.filter((item) => !oldIds.includes(item.name));
		newIds.forEach((item) => {
			errorNumber.push(item.name);
			serein.sendCmd(`whitelist remove "${item.name}"`);
		});
		if (errorNumber.length) {
			let str = errorNumber.join(",");
			if (config.sendGroup) {
				serein.sendGroup(groupID, "删除白名单：\n" + str);
			}
		}

		if (!errorWhitelist.length && !errorNumber.length && config.sendGroup) {
			serein.sendGroup(groupID, "没有需要同步的白名单");
		}
	}, 1000);
	return;
}

serein.setListener("onReceiveGroupMessage", (groupID, userID, msg, shownName) => {
	if (!isGroup(groupID) || isIgnoreGroup(groupID)) return;

	let command = msg.split(" ").filter((item) => item && item.trim());
	let keyword = command[0].toLowerCase();
	command.splice(0, 1);

	let keywords = [];
	for (let key in config.command) {
		if (config.command.hasOwnProperty(key)) {
			keywords = keywords.concat(config.command[key].keywords);
		}
	}

	for (let i in keywords) {
		if (keyword.indexOf(keywords[i]) === 0 && keyword !== keywords[i]) {
			if (config.sendGroup) {
				serein.sendGroup(groupID, `关键词>>${keywords[i]}<<后需要添加空格`);
			}
			return;
		}
	}

	//绑定
	if (config.command.bind.keywords.includes(keyword)) {
		if (!hasPermission(userID) && !config.hasBind) {
			if (config.sendGroup) {
				serein.sendGroup(groupID, `您没有使用>>${keyword}<<的权限！`);
			}
			return;
		}

		if (!command.length) {
			if (config.sendGroup) {
				serein.sendGroup(groupID, `语法错误，请发送：\n${keyword} <gameID>`);
			}
			return;
		}

		var text = command.join(" ");
		if (config.onlineMode && !IS_GAME_ID.test(text)) {
			if (config.sendGroup) {
				serein.sendGroup(groupID, `意外的：>>${text}<<\n应当为：<gameID>`);
			}
			return;
		}

		var index = isMember(text);
		if (index + 1) {
			if (config.sendGroup) {
				serein.sendGroup(groupID, `绑定失败，存在相同<gameID>\n${text}（${members.data[index].id}）`);
			}
			return;
		}

		var gameID = serein.getGameID(userID);
		if (gameID) {
			whitelistRemove(userID, gameID);
			if (whitelistAdd(groupID, userID, text) && config.sendGroup)
				serein.sendGroup(groupID, `已存在数据：\n${gameID}(${userID})\n成功修改为：\n${text}(${userID})`);
			return;
		}

		if (whitelistAdd(groupID, userID, text)) {
			if (config.sendGroup) {
				serein.sendGroup(groupID, `绑定成功：${text}（${userID}）`);
			}
		} else {
			serein.sendGroup(groupID, `绑定失败，原因未知！\n（可联系插件作者反馈问题）`);
		}
		return;
	}

	//解绑
	if (config.command.unbind.keywords.includes(keyword)) {
		if (!hasPermission(userID) && !config.hasBind) {
			if (config.sendGroup) {
				serein.sendGroup(groupID, `您没有使用>>${keyword}<<的权限！`);
			}
			return;
		}

		var gameID = serein.getGameID(userID);
		if (!gameID) {
			if (config.sendGroup) {
				serein.sendGroup(groupID, "您没有绑定！");
			}
			return;
		}

		if (whitelistRemove(userID, gameID)) {
			if (config.sendGroup) {
				serein.sendGroup(groupID, `解绑成功：${gameID}（${userID}）`);
			}
		} else {
			serein.sendGroup(groupID, `解绑失败，原因未知！\n（可联系插件作者反馈问题）`);
		}
		return;
	}

	//添加白名单
	if (config.command.whitelistAdd.keywords.includes(keyword)) {
		if (!hasPermission(userID)) {
			if (config.sendGroup) {
				serein.sendGroup(groupID, `您没有使用>>${keyword}<<的权限！`);
			}
			return;
		}

		if (!command.length) {
			if (config.sendGroup) {
				serein.sendGroup(groupID, `语法错误，请发送：\n ${keyword} <QQ号(@成员)> <gameID>`);
			}
			return;
		}

		if (!IS_QQ_NUMBER.test(command[0].replace(IS_CQ_AT, "$1"))) {
			if (config.sendGroup) {
				serein.sendGroup(groupID, `意外的：>>${command[0].replace(IS_CQ_AT, "$1")}<<\n应当为：<QQ号(@成员)>`);
			}
			return;
		}

		var qqID = Number(command[0].replace(IS_CQ_AT, "$1"));
		command.splice(0, 1);
		var text = command.join(" ");

		if (config.onlineMode && !IS_GAME_ID.test(text)) {
			if (config.sendGroup) {
				serein.sendGroup(groupID, `意外的：>>${text}<<\n应当为：<gameID>`);
			}
			return;
		}

		var index = isMember(text);
		if (index + 1) {
			if (config.sendGroup) {
				serein.sendGroup(groupID, `添加白名单失败，存在相同<gameID>\n${text}（${members.data[index].id}）`);
			}
			return;
		}

		var gameID = serein.getGameID(qqID);
		if (gameID) {
			whitelistRemove(qqID, gameID);
			if (whitelistAdd(groupID, qqID, text) && config.sendGroup) {
				serein.sendGroup(groupID, `已存在数据：\n${gameID}(${qqID})\n成功修改为：\n${text}(${qqID})`);
			}
			return;
		}

		if (whitelistAdd(groupID, qqID, text)) {
			if (config.sendGroup) {
				serein.sendGroup(groupID, `添加白名单成功：${text}（${qqID}）`);
			}
		} else {
			serein.sendGroup(groupID, `添加白名单失败，原因未知！\n（可联系插件作者反馈问题）`);
		}
		return;
	}

	//删除白名单
	if (config.command.whitelistDelete.keywords.includes(keyword)) {
		if (!hasPermission(userID)) {
			if (config.sendGroup) {
				serein.sendGroup(groupID, `您没有使用>>${keyword}<<的权限！`);
			}
			return;
		}

		if (!command.length) {
			if (config.sendGroup) {
				serein.sendGroup(groupID, `语法错误，请发送：\n${keyword} <QQ号(@成员)>`);
			}
			return;
		}

		if (!IS_QQ_NUMBER.test(command[0].replace(IS_CQ_AT, "$1"))) {
			if (config.sendGroup) {
				serein.sendGroup(groupID, `意外的：>>${command[0].replace(IS_CQ_AT, "$1")}<<\n应当为：<QQ号(@成员)>`);
			}
			return;
		}

		var qqID = Number(command[0].replace(IS_CQ_AT, "$1"));
		var gameID = serein.getGameID(qqID);

		if (!gameID) {
			if (config.sendGroup) {
				serein.sendGroup(groupID, `该成员未绑定 <gameID>`);
			}
			return;
		}

		if (whitelistRemove(qqID, gameID)) {
			if (config.sendGroup) {
				serein.sendGroup(groupID, `成功删除：${gameID}（${qqID}）`);
			}
		} else {
			serein.sendGroup(groupID, `删除白名单失败，原因未知！\n（可联系插件作者反馈问题）`);
		}
		return;
	}

	//同步白名单
	if (config.command.syncWhitelist.keywords.includes(keyword)) {
		if (!hasPermission(userID)) {
			if (config.sendGroup) {
				serein.sendGroup(groupID, `您没有使用>>${keyword}<<的权限！`);
			}
			return;
		}

		if (!command.length) {
			syncWhitelist(groupID);
			return;
		}

		if (!IS_QQ_NUMBER.test(command[0].replace(IS_CQ_AT, "$1"))) {
			if (config.sendGroup) {
				serein.sendGroup(groupID, `意外的：>>${command[0].replace(IS_CQ_AT, "$1")}<<\n应当为：<QQ号(@成员)>`);
			}
			return;
		}

		var qqID = Number(command[0].replace(IS_CQ_AT, "$1"));
		var gameID = serein.getGameID(qqID);

		if (!gameID) {
			if (config.sendGroup) {
				serein.sendGroup(groupID, `该成员未绑定 <gameID>`);
			}
			return;
		}

		serein.sendCmd(`whitelist add "${gameID}"`);
		if (config.sendGroup) {
			serein.sendGroup(groupID, `白名单同步成功：${gameID}（${qqID}）`);
		}
		return;
	}

	//白名单列表
	if (config.command.whitelist.keywords.includes(keyword)) {
		if (!hasPermission(userID)) {
			if (config.sendGroup) {
				serein.sendGroup(groupID, "您没有使用<" + keyword + ">的权限！");
			}
			return;
		}

		whitelistPath = serein.getSettingsObject().server.path.replace(IS_PATH, "allowlist.json");
		if (!FILE.Exists(whitelistPath)) {
			whitelistPath = whitelistPath.replace(IS_PATH, "whitelist.json");
		}
		whitelist = JSON.parse(FILE.ReadAllText(whitelistPath, ENCODING.UTF8));
		members = JSON.parse(FILE.ReadAllText(MEMBERS_PATH, ENCODING.UTF8));

		var Array = [];
		for (let i = 0; i < members.data.length; i++) {
			let isCorrect = "❗";
			for (let j = 0; j < whitelist.length; j++) {
				if (members.data[i].gameID === whitelist[j].name) {
					isCorrect = "✔";
				}
			}
			let isName = members.data[i].card ? members.data[i].card : members.data[i].nickname ? members.data[i].nickname : members.data[i].ID;
			Array.push({
				type: "node",
				data: {
					name: "『" + i + "』" + isName,
					uin: members.data[i].id,
					content: "成员管理数据：\n" + members.data[i].gameID + "(" + members.data[i].id + ")\n服务器白名单：" + isCorrect,
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
	}
});

serein.setListener("onServerStart", () => {
	for (let i = 0; i < serein.getSettingsObject().bot.groupList.length; i++) {
		if (!isIgnoreGroup(serein.getSettingsObject().bot.groupList[i])) {
			var groupID = serein.getSettingsObject().bot.groupList[i];
			break;
		}
	}
	syncWhitelist(groupID);
});

serein.setListener("onGroupDecrease", (groupID, userID) => {
	if (!config.exitGroup || !isGroup(groupID) || isIgnoreGroup(groupID)) return;

	if (config.sendGroup) {
		serein.sendGroup(groupID, "群成员 " + userID + " 退群了，尝试删除白名单");
	}

	let gameID = serein.getGameID(userID);
	if (!gameID) {
		if (config.sendGroup) {
			serein.sendGroup(groupID, "群成员 " + userID + " 未绑定白名单！");
		}
		return;
	}

	if (whitelistRemove(userID, gameID)) {
		setTimeout(() => {
			if (config.sendGroup) {
				serein.sendGroup(groupID, `成功删除：${gameID}（${userID}）`);
			}
		}, 500);
	} else {
		serein.sendGroup(groupID, `删除白名单失败，原因未知！\n（可联系插件作者反馈问题）`);
	}
	return;
});

serein.setListener("onServerOutput", (msg) => {
	if (!config.betterMembers.enable) return;
	let gameID, gameIDReply;

	let interServerReply = new RegExp(config.betterMembers.interServerReply);
	if (interServerReply.test(msg)) {
		gameIDReply = msg.replace(interServerReply, "$1");
		let index = 0;
		while (index !== -1) {
			index = notGameID.indexOf(gameIDReply);
			if (index > -1) {
				notGameID.splice(index, 1);
			}
		}
	}

	for (let i = 0; i < config.betterMembers.interServer.length; i++) {
		let interServer = new RegExp(config.betterMembers.interServer[i]);
		if (interServer.test(msg)) {
			gameID = msg.replace(interServer, "$1");
		}
	}

	if (!gameID) return;

	members = JSON.parse(FILE.ReadAllText(MEMBERS_PATH, ENCODING.UTF8));
	for (let i = 0; i < members.data.length; i++) {
		if (members.data[i].gameID === gameID) return;
	}

	if (notGameID.indexOf(gameID) == -1) {
		notGameID.push(gameID);
		for (let i = 0; i < serein.getSettingsObject().bot.groupList.length; i++) {
			if (!isIgnoreGroup(serein.getSettingsObject().bot.groupList[i])) {
				var groupID = serein.getSettingsObject().bot.groupList[i];
				break;
			}
		}
		setTimeout(() => {
			serein.sendGroup(groupID, gameID + " 没有白名单，踢出服务器");
		}, 500);
	}
});

var notGameID = [];
setInterval(() => {
	for (let i = 0; i < notGameID.length; i++) {
		serein.sendCmd('kick "' + notGameID[i] + '" You do not have a whitelist!');
	}
}, 1000);
