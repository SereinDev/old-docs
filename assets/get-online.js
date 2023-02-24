function update() {
    try {
        if (!document.querySelector('#main-container'))
            return;

        var xhr = new XMLHttpRequest();
        xhr.open('get', 'https://count.serein.cc/query', true);

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
                console.log(xhr.responseText);
                let serverCount = 0, maxRunTime = 0;
                let returnJson = JSON.parse(xhr.responseText.trim());
                let type = {}, version = {};

                if (returnJson.data.length != 0) {
                    document.querySelector('table.hide').classList.remove('hide');
                    document.querySelector('h2.hide').classList.remove('hide');
                }

                for (const value of returnJson.data) {

                    if (value.metadata.isRunningServer)
                        serverCount++;

                    if (value.metadata.runTime > 0 && value.metadata.runTime > maxRunTime)
                        maxRunTime = value.metadata.runTime;

                    if (value.metadata.version)
                        version[value.metadata.version] = (version[value.metadata.version] || 0) + 1;

                    if (value.metadata.type)
                        type[value.metadata.type] = (type[value.metadata.type] || 0) + 1;

                    document.querySelector('tbody#list').innerHTML +=
                        `
                        <tr>
                        <td>${value.name.substring(9)}</td>
                        <td>${value.metadata.version}</td>
                        <td>${value.metadata.type}</td>
                        <td>${getTimeStr(value.metadata.runTime) || '未知'}</td>
                        <td>${value.metadata.region || '未知'}</td>
                        </tr>
                        `;

                }

                document.querySelector('#online-count-detail').innerHTML = returnJson.data.length;
                document.querySelector('#server-count-detail').innerHTML = serverCount;
                document.querySelector('#max-runtime-detail').innerHTML = getTimeStr(maxRunTime) || '未知';
                document.querySelector('#version-count-detail').innerHTML = getMaxItemInDict(version) || '未知';
                document.querySelector('#type-count-detail').innerHTML = getMaxItemInDict(type) || '未知';
                document.querySelector('#notice-msg').innerHTML = '因为此功能于v1.3.4才被加入，故仅统计此版本及以后的在线数量';
                document.querySelector('#notice').classList.remove('hide');
                document.querySelector('span#update-time').innerHTML=`更新时间：${new Date().toLocaleString()}`;
            }
        }

        xhr.send();

    } catch (e) {
        document.querySelector('#notice-msg').innerHTML = e;
        console.error(e);
    }
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
    if (min < 120)
        return `${min} (分钟)`;
    if (min < 60 * 24)
        return `${(min / 60).toFixed(1)} (小时)`;
    return `${(min / 60 / 64).toFixed(1)} (天)`;
}

(function () {
    var get_online = function (hook, vm) { hook.ready(update); };

    $docsify = $docsify || {};
    $docsify.plugins = [].concat(get_online, $docsify.plugins || []);
})();