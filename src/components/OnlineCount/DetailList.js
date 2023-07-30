import React from 'react';
import { Datas, getTimeStr } from './Service'

// @ts-check

/**
 * @param {Datas} param0 
 */
export default function ({ datas }) {

    return (
        <div id='detail-list-container'>
            <h2>在线列表</h2>
            <table>
                <thead>
                    <tr>
                        <th>对象ID</th>
                        <th>版本</th>
                        <th>类型</th>
                        <th>服务器运行状态</th>
                        <th>运行时长</th>
                    </tr>
                </thead>
                <tbody>
                    {datas.map((d, i) => (
                        <tr id={i} key={`tr-${i}`}>
                            <td>
                                <pre>
                                    {d._id?.substring(0, 7)}
                                </pre>
                            </td>
                            <td>
                                {d.version}
                            </td>
                            <td>
                                {d.type}
                            </td>
                            <td>
                                {d.server_status ? '🟢运行中' : '🔴未启动'}
                            </td>

                            <td>
                                {getTimeStr((Date.now() - d.start_time) / 1000 / 60)}
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div >);

}