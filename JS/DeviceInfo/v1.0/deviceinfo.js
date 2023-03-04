
/**
 * 变量列表
 *  deviceinfo_drivetype_{盘符}         驱动器类型
 *  deviceinfo_driveformat_{盘符}       驱动器格式
 *  deviceinfo_free_{盘符}              驱动器剩余空间
 *  deviceinfo_used_{盘符}              驱动器已用空间
 *  deviceinfo_total_{盘符}             驱动器总空间
 *  deviceinfo_usage_{盘符}             驱动器空间使用率
 */

serein.registerPlugin('驱动器信息变量拓展', 'v1.0', 'Zaitonn', '');

if (System.Environment.Version.Major == 6 && !System.IO.File.Exists('./plugins/deviceinfo/PreLoadConfig.json')) {
    serein.setPreLoadConfig(['System.IO.FileSystem.DriveInfo']);
    throw new Error('请重新加载此插件');
}

const DriveType = [
    '未知',
    '没有根目录',
    '可移动存储设备',
    '固定磁盘',
    '网络驱动器',
    '光盘设备',
    'RAM磁盘'
];
const FractionDigits = 1;

/**
 * 更新所有信息
 */
function updateInfos() {
    const allDirves = System.IO.DriveInfo.GetDrives();
    for (let index = 0; index < allDirves.length; index++) {
        const drive = allDirves[index];
        serein.setVariable(`deviceinfo_drivetype_${drive.Name[0]}`, DriveType[drive.DriveType] || '未知');
        serein.setVariable(`deviceinfo_driveformat_${drive.Name[0]}`, drive.DriveFormat);
        serein.setVariable(`deviceinfo_free_${drive.Name[0]}`, getStrOfSpace(drive.TotalFreeSpace));
        serein.setVariable(`deviceinfo_used_${drive.Name[0]}`, getStrOfSpace(drive.TotalSize - drive.TotalFreeSpace));
        serein.setVariable(`deviceinfo_total_${drive.Name[0]}`, getStrOfSpace(drive.TotalSize));
        serein.setVariable(`deviceinfo_usage_${drive.Name[0]}`, (100 - drive.TotalFreeSpace / drive.TotalSize * 100).toFixed(FractionDigits) + '%');
        serein.log(
            `驱动器${drive.Name}
类型        ${DriveType[drive.DriveType]}
格式        ${drive.DriveFormat}
剩余空间    ${getStrOfSpace(drive.TotalFreeSpace)}
已用空间    ${getStrOfSpace(drive.TotalSize - drive.TotalFreeSpace)}
总空间      ${getStrOfSpace(drive.TotalSize)}
空间使用率  ${(100 - drive.TotalFreeSpace / drive.TotalSize * 100).toFixed(FractionDigits)}%
    `)
    }
    serein.log('更新完毕');
}

/**
 * 获取空间大小文本
 * @param {Number} num 空间大小
 * @returns {String}
 */
function getStrOfSpace(num) {
    if (!typeof (num) === 'number' && num <= 0)
        return '未知';

    if (num < 1024)
        return `${num} B`;

    if (num < 1024 * 1024)
        return `${(num / 1024).toFixed(FractionDigits)} KB`;

    if (num < 1024 * 1024 * 1024)
        return `${(num / 1024 / 1024).toFixed(FractionDigits)} MB`;

    if (num < 1024 * 1024 * 1024 * 1024)
        return `${(num / 1024 / 1024 / 1024).toFixed(FractionDigits)} GB`;

    if (num < 1024 * 1024 * 1024 * 1024 * 1024)
        return `${(num / 1024 / 1024 / 1024 / 1024).toFixed(FractionDigits)} TB`;

    return `${(num / 1024 / 1024 / 1024 / 1024 / 1024).toFixed(FractionDigits)} PB`;
}

updateInfos();
setTimeout(updateInfos, 60 * 1000);