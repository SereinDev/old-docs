async function update() {
    if (!document.querySelector('#main-container'))
        return;

    fetch('https://api.user.serein.cc/list')
        .then(async (response) => updateInfo(await response.text()))
        .catch((e) => {
            document.querySelector('#notice-msg').innerHTML = `获取失败：${e}`;
            document.querySelector('#notice').classList.remove('hide');
            console.error(e);
        });
}

/**
 * 获取最大项
 * @param {Array} dict 
 */
function getMaxItemInDict(dict) {
    if (typeof (dict) != 'object' || !dict || dict.length == 0)
        return undefined;

    let max = 0, name = '';
    for (const key in dict) {
        if (dict[key] > max) {
            name = key;
            max = dict[key];
        }
    }
    return `${name} (${max})`;
}

function getTimeStr(min) {
    if (!min || min < 0)
        return null;
    if (min < 60)
        return `${min.toFixed(1)} (分钟)`;
    if (min < 60 * 24)
        return `${(min / 60).toFixed(1)} (小时)`;
    return `${(min / 60 / 64).toFixed(1)} (天)`;
}

(function () {
    var get_online = function (hook, vm) { hook.ready(update); };

    $docsify = $docsify || {};
    $docsify.plugins = [].concat(get_online, $docsify.plugins || []);
})();

function updateInfo(data) {
    const array = JSON.parse(data.trim()).documents;
    let serverCount = 0, longestRunTime = 0;
    let type = {}, version = {};

    if (array.length != 0) {
        document.querySelector('table.hide').classList.remove('hide');
        document.querySelector('h2.hide').classList.remove('hide');
    }

    for (const value of array) {
        let start_time = 0;

        if (value.server_status)
            serverCount++;

        if (value.version)
            version[value.version] = (version[value.version] || 0) + 1;

        if (value.type)
            type[value.type] = (type[value.type] || 0) + 1;

        if (value.start_time) {
            start_time = (Date.now() - value.start_time) / 1000 / 60;
            longestRunTime = Math.max(start_time, longestRunTime);
        }

        document.querySelector('tbody#list').innerHTML +=
            `
            <tr>
            <td>${value._id.substring(9)}</td>
            <td>${value.version}</td>
            <td>${value.type}</td>
            <td>${value.server_status ? '已启动' : '未启动'}</td>
            <td>${getTimeStr(start_time) || '未知'}</td>
            <td>${value.region || '未知'}</td>
            </tr>
            `;

    }

    document.querySelector('#online-count-detail').innerHTML = array.length;
    document.querySelector('#server-count-detail').innerHTML = serverCount;
    document.querySelector('#max-runtime-detail').innerHTML = getTimeStr(longestRunTime) || '未知';
    document.querySelector('#version-count-detail').innerHTML = getMaxItemInDict(version) || '未知';
    document.querySelector('#type-count-detail').innerHTML = getMaxItemInDict(type) || '未知';
    document.querySelector('#notice-msg').innerHTML = '因为此功能于v1.3.4才被加入，故仅统计此版本及以后的在线数量';
    document.querySelector('#notice').classList.remove('hide');
    document.querySelector('span#update-time').innerHTML = `<span>更新时间：${new Date().toLocaleString()} </span> <span onclick="refresh()" style="text-decoration:underline;cursor:pointer">点此更新数据</span>`;
}

function refresh() {
    if (!document.querySelector('#main-container'))
        return;

    document.querySelector('tbody#list').innerHTML = '';
    document.querySelector('#online-count-detail').innerHTML = '-';
    document.querySelector('#server-count-detail').innerHTML = '-';
    document.querySelector('#max-runtime-detail').innerHTML = '-';
    document.querySelector('#version-count-detail').innerHTML = '-';
    document.querySelector('#type-count-detail').innerHTML = '-';
    document.querySelector('#notice').classList.add('hide');
    document.querySelector('span#update-time').innerHTML = '';
    document.querySelector('table').classList.add('hide');
    document.querySelector('h2#title').classList.add('hide');
    update();
}