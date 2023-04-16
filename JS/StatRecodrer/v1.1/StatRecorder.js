/// <reference path="SereinJSPluginHelper/index.d.ts"/>
/// @ts-check

serein.registerPlugin("统计信息记录", "v1.1", "Zaitonn", "自动按时间记录系统信息、在线人数等");

/**
 * 保存周期（ms）
 */
const interval = 5000;

/**
 * 表头
 */
const header = [
    'Time',                     // 时间
    'ServerStatus',             // 服务器状态
    'ServerRunningTime',        // 服务器运行时长
    'ServerProcessCPUUSage',    // 服务器CPU使用率
    'OnlinePlayers',            // 在线玩家数
    'CPUUsage',                 // CPU使用率
    'UsedRAM',                  // 已用内存
    'RAMUsage',                 // 内存使用率
    'UploadSpeed',              // 上行速度
    'DownloadSpeed'             // 下行速度
];

record();
setInterval(record, interval);

serein.log(`写入成功。计时器已启动`);

function record() {

    const date = new Date();
    const dateStr = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    if (!System.IO.Directory.Exists('plugins/StatRecorder')) {
        System.IO.Directory.CreateDirectory('plugins/StatRecorder'); // 创建文件夹
    }
    if (!System.IO.File.Exists(`plugins/StatRecorder/${dateStr}.csv`)) {
        System.IO.File.WriteAllText(`plugins/StatRecorder/${dateStr}.csv`, header.join(',') + '\n'); // 写入表头
    }

    const
        sysinfo = serein.getSysInfo(),
        netSpeed = serein.getNetSpeed(),
        list = [
            date.toLocaleTimeString(),
            String(serein.getServerStatus()),
            serein.getServerTime(),
            serein.getServerCPUUsage(),
            serein.getServerMotd().onlinePlayer,
            serein.getCPUUsage()?.toFixed(1),
            ((sysinfo.Hardware.RAM.Total - sysinfo.Hardware.RAM.Free) / 1024).toFixed(1),
            ((sysinfo.Hardware.RAM.Total - sysinfo.Hardware.RAM.Free) / sysinfo.Hardware.RAM.Total * 100).toFixed(1),
            netSpeed[0],
            netSpeed[1]
        ];
    System.IO.File.AppendAllText(`plugins/StatRecorder/${dateStr}.csv`, list.join(',') + '\n');
}