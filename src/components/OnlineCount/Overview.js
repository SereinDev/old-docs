import React from 'react';
import './Overview.css';
import { Datas, getTimeStr } from './Service'

// @ts-check

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

/**
 * @param {Datas} param0 
 */
export default function ({ datas }) {
    const stat = {
        startTime: Date.now(),
        type: {
            winform: 0,
            wpf: 0,
            console: 0,
        },
        version: {}
    }

    datas.forEach(d => {
        stat.type[d.type] += 1;
        stat.startTime = Math.min(stat.startTime || d.start_time, d.start_time);
        stat.version[d.version] = (stat.version[d.version] || 0) + 1;
    });

    return (
        <div id='overview-container'>
            <h2>总览</h2>

            <table>
                <tbody>
                    <tr>
                        <td>
                            在线数量
                        </td>
                        <td>
                            {datas.length}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            服务器数
                        </td>
                        <td>
                            {datas.filter(v => v.server_status).length}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            最长运行时间
                        </td>
                        <td>
                            {getTimeStr((Date.now() - stat.startTime) / 1000 / 60)}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            最受欢迎版本
                        </td>
                        <td>
                            {getMaxItemInDict(stat.version)}
                        </td>
                    </tr>

                    <tr>
                        <td>
                            最受欢迎类型
                        </td>
                        <td>
                            {getMaxItemInDict(stat.type)}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}