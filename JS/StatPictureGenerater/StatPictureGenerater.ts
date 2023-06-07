/// <reference path='MsgHelper.d.ts'/>
/// <reference path='SereinJSPluginHelper/index.d.ts'/>
/// <reference path='modules/stdio.d.ts'/>
// @ts-check

declare type Color = {
    R: number,
    G: number,
    B: number,

    Transparent: Color,
    Black: Color,
    White: Color,

    FromArgb(r: number, g: number, b: number): Color,
    FromArgb(a: number, r: number, g: number, b: number): Color,
}

declare type Config = {
    urls: string[],
    originType: 'api' | 'local',
    title: string | null,
    font: string | null,
    shadow: boolean,
    theme: 'dark' | 'light' | 'auto',
    defaultColor: string
}

import stdio = require('./modules/stdio.js');

const {
    existFile,
    existDirectory,
    createDirectory,
    deleteFile,
    getFiles,
    getExtension,
    getFileName,
    writeAllTextToFile,
    readAllTextFromFile
} = stdio;

/**
 * 导入命名空间
 */
const {
    Drawing: {
        Drawing2D: {
            CompositingQuality,
            InterpolationMode,
            SmoothingMode,
        },

        Imaging: {
            ImageFormat,
        },

        Text: {
            TextRenderingHint,
        },

        Bitmap,
        Color,
        Font,
        Graphics,
        Rectangle,
        RectangleF,
        StringAlignment,
        StringFormat,
        StringTrimming,
        SolidBrush,
    },
    IO: {
        DriveInfo,
        File,
        FileInfo,
        SearchOption,
    },
    Net: {
        Http: {
            HttpClient
        }
    },
    Convert,
    Environment,
    GC
} = System;


/** 
 * 图片缓存
 */
const caches = new Map<string, number>();

/**
 * 路径
 */
const PATH = {
    main: './plugins/StatPictureGenerater/',
    preLoadConfig: './plugins/StatPictureGenerater/PreLoadConfig.json',
    caches: './plugins/StatPictureGenerater/cache',
    config: './plugins/StatPictureGenerater/config.json',
}

/**
 * 尺寸
 */
const SIZES = {
    width: 1080,
    height: 1440,
    padding: 30,

    get shadowOffset() {
        return config.shadow ? 1.5 : 0
    }
};

/**
 * 版本
 */
const VERSION = 'v1.1';

/**
 * 默认配置
 */
const BASECONFIG: Config = {
    urls: [
        'https://t.mwm.moe/ysmp/',
        'https://t.mwm.moe/mp/',
        'https://t.mwm.moe/moemp/',
    ],
    originType: 'api',
    title: 'Serein · 状态',
    font: '得意黑',
    shadow: true,
    theme: 'auto',
    defaultColor: ''
};

serein.registerPlugin('状态图片生成', VERSION, 'Zaiton', '需要安装`MsgHelper.js`前置');
checkPreLoadConfig();
clearAllCache();

/**
 * http客户端
 */
const httpClient = new HttpClient();

/**
 * 对齐格式
 */
const FORMATS = getFormats();

/**
 * 日志输出对象
 */
const logger = new Logger('StatPictureGenerater');

/**
 * 配置文件
 */
let config = loadConfig() || BASECONFIG;

/**
 * 上次触发时间
 */
let lastTime = 0;

/**
 * 检查预加载配置
 */
function checkPreLoadConfig() {
    if (!existFile(PATH.preLoadConfig)) {
        createDirectory(PATH.caches);

        const assemblies = [
            'System.Drawing',
            'System.Net.Http'
        ];

        if (Environment.Version.Major === 6)
            assemblies.push('System.IO.FileSystem.DriveInfo');

        serein.setPreLoadConfig(assemblies);
        throw new Error('请重新加载此插件');
    }
}

/**
 * 生成
 * @param packet
 * @returns CQ码
 */
function generate(packet: Packet) {
    const { group_id, user_id } = packet || {};
    logger.info(`群聊${group_id || '未知'}`, `用户${user_id || '未知'}`, '触发。');
    const time = Date.now();

    if (time - lastTime < 10_000) {
        logger.warn('生成失败：冷却中');
        return '技能冷却中...';
    }

    if (!existDirectory(PATH.caches))
        createDirectory(PATH.caches);

    if (Array.from(caches.keys()).length > 100)
        clearCaches();

    const fileId = Math.floor((Math.random() * 256 * 256 * 256 * 256)).toString(16).padStart(8, '0');
    const file = `${PATH.caches}/${fileId}.png`;
    const bitmap = new Bitmap(SIZES.width, SIZES.height);
    const graphics = Graphics.FromImage(bitmap);

    logger.debug(`开始生成，PicId:${fileId}。`);

    // 图片质量
    graphics.CompositingQuality = CompositingQuality.HighQuality; // 高质量、低速度复合
    graphics.InterpolationMode = InterpolationMode.HighQualityBicubic; // 高质量的双三次插值法
    graphics.TextRenderingHint = TextRenderingHint.AntiAlias; // 抗锯齿
    graphics.SmoothingMode = SmoothingMode.AntiAlias; // 抗锯齿

    const colors = {
        text: null,
        shadow: null,
        background: null,
        main: [0, 0, 0],
    };

    let size: [number, number] = [0, 0];
    switch (config.originType.toLowerCase()) {
        case 'api':
            if (config.urls.length === 0)
                throw new Error('没有可用的API呢！！');

            const netBitmap = getImgFromUrl(config.urls[Math.floor(Math.random() * config.urls.length)]);

            size = calculateSize(netBitmap.Width, netBitmap.Height);

            graphics.DrawImage(
                netBitmap,
                new Rectangle(0, 0, size[0], size[1])
            );

            logger.debug(`缩放完毕。[${netBitmap.Width},${netBitmap.Height}]→[${size.join(',')}]`);
            colors.main = getMainColor(netBitmap);
            netBitmap.Dispose();

            break;

        case 'local':
            const backgroundFiles = getFiles(PATH.main, '*.*', SearchOption.TopDirectoryOnly)
                .filter((f: string) => ['.png', '.jpg', '.jpeg', '.bmp'].includes(getExtension(f)?.toLowerCase() || ''));

            if (backgroundFiles.length == 0)
                throw new Error('没有可用的背景图片呢！！');

            const bgFileName = backgroundFiles[Math.floor(Math.random() * backgroundFiles.length)];
            logger.debug(`随机背景图:${getFileName(bgFileName)}。`);

            const randomBitmap = Bitmap.FromFile(bgFileName);

            size = calculateSize(randomBitmap.Width, randomBitmap.Height);

            graphics.DrawImage(
                randomBitmap,
                new Rectangle(0, 0, size[0], size[1])
            );

            logger.debug(`缩放完毕。[${randomBitmap.Width},${randomBitmap.Height}]→[${size.join(',')}]`);
            colors.main = getMainColor(randomBitmap);
            randomBitmap.Dispose();
            break;

        default:
            logger.warn('图片不见辣！背景将保持纯白。');
            graphics.DrawImage(
                new SolidBrush(Color.FromArgb(255, 255, 255)),
                new Rectangle(0, 0, SIZES.width, SIZES.height)
            );
            colors.main = [0x78, 0xb3, 0xaa];
            break;
    }

    // 从配置中读取主题颜色
    if (config.defaultColor && typeof (config.defaultColor) === 'string') {
        const defaultColor: Color = getColor(config.defaultColor);
        if (defaultColor.R || defaultColor.G || defaultColor.B) {
            colors.main = [defaultColor.R, defaultColor.G, defaultColor.B];
            serein.log([defaultColor.R, defaultColor.G, defaultColor.B].join(','))
        }
    }

    /**
     * 主颜色的RGB平均值
     */
    const avarage = (colors.main[0] + colors.main[1] + colors.main[2]) / 3;

    // 决定主题
    if (config.theme === 'auto' && avarage > 150 || config.theme === 'light') {
        colors.text = Color.Black;
        colors.background = Color.FromArgb(60, Color.White);
        colors.shadow = getColor('#bbb');
        colors.main = colors.main.map((value) => value * 1.2).map((value) => value > 255 ? 255 : value);
    } else {
        colors.text = Color.White;
        colors.background = Color.FromArgb(140, Color.Black);
        colors.shadow = Color.Gray;
        colors.main = colors.main.map((value) => value * 0.8);
    }

    // 标题-阴影
    graphics.DrawString(
        config.title || 'Serein · 状态',
        new Font(config.font, 45),
        new SolidBrush(colors.shadow),
        new RectangleF(
            20 + SIZES.shadowOffset * 2,
            30 + SIZES.shadowOffset * 2,
            SIZES.width - 40,
            160),
        FORMATS.center
    );

    // 标题
    graphics.DrawString(
        config.title || 'Serein · 状态',
        new Font(config.font, 45),
        new SolidBrush(colors.text),
        new RectangleF(
            20, 30,
            SIZES.width - 40, 160),
        FORMATS.center
    );

    const [
        sys_top,  // 顶部偏移
        sys_left, // 左侧偏移
        sys_size  // 大小
    ] = [200, 140, 250];

    // 系统信息
    // 长方形背景
    graphics.FillRectangle(
        new SolidBrush(colors.background),
        new Rectangle(
            SIZES.padding,
            sys_top,
            SIZES.width - 2 * SIZES.padding,
            sys_size * 2 + 2 * SIZES.padding + 50,
        ));

    // 获取相关变量
    const {
        Name: os,
        Hardware: {
            RAM: {
                Free: ram_free,
                Total: ram_total
            },
            CPUs: [
                {
                    Name: cpu_name,
                    PhysicalCores: cpu_cores
                }
            ]
        }
    } = serein.getSysInfo();
    const cpu_usage = serein.getCPUUsage() || 0;
    const [uploadSpeed, downloadSpeed] = serein.getNetSpeed();

    {
        // CPU总-背景阴影
        graphics.FillPie(
            new SolidBrush(Color.FromArgb(50, 0, 0, 0)),
            sys_left + SIZES.shadowOffset + SIZES.padding,
            sys_top + SIZES.shadowOffset + SIZES.padding,
            sys_size,
            sys_size,
            -90,
            360);

        // CPU总-背景
        graphics.FillPie(
            new SolidBrush(colors.background),
            sys_left + SIZES.padding,
            sys_top + SIZES.padding,
            sys_size,
            sys_size,
            -60,
            360);

        // CPU占用扇形
        graphics.FillPie(
            new SolidBrush(Color.FromArgb(175, colors.main[0], colors.main[1], colors.main[2])),
            sys_left + SIZES.padding,
            sys_top + SIZES.padding,
            sys_size,
            sys_size,
            -90,
            360 * cpu_usage / 100);

        // CPU占用文本-阴影
        graphics.DrawString(
            `${cpu_usage.toFixed(1)}%`,
            new Font(config.font, 30),
            new SolidBrush(colors.shadow),
            new RectangleF(
                sys_left + SIZES.shadowOffset + SIZES.padding,
                sys_top + SIZES.shadowOffset + SIZES.padding,
                sys_size,
                sys_size),
            FORMATS.centerCenter
        );

        // CPU占用文本
        graphics.DrawString(
            `${cpu_usage.toFixed(1)}%`,
            new Font(config.font, 30),
            new SolidBrush(colors.text),
            new RectangleF(
                sys_left + SIZES.padding,
                sys_top + SIZES.padding,
                sys_size,
                sys_size),
            FORMATS.centerCenter
        );

        // 内存总-背景阴影
        graphics.FillPie(
            new SolidBrush(Color.FromArgb(50, 0, 0, 0)),
            SIZES.width - sys_left - SIZES.padding - sys_size + SIZES.shadowOffset,
            sys_top + SIZES.padding + SIZES.shadowOffset,
            sys_size,
            sys_size,
            -60,
            360
        );

        // 内存总-背景
        graphics.FillPie(
            new SolidBrush(colors.background),
            SIZES.width - sys_left - SIZES.padding - sys_size,
            sys_top + SIZES.padding,
            sys_size,
            sys_size,
            -60,
            360);

        // 内存占用扇形
        graphics.FillPie(
            new SolidBrush(Color.FromArgb(175, colors.main[0], colors.main[1], colors.main[2])),
            SIZES.width - sys_left - SIZES.padding - sys_size,
            sys_top + SIZES.padding,
            sys_size,
            sys_size,
            -90,
            360 * ((ram_total - ram_free) / ram_total));

        // 内存占用文本-阴影
        graphics.DrawString(
            `${((ram_total - ram_free) / ram_total * 100).toFixed(1)}%`,
            new Font(config.font, 30),
            new SolidBrush(colors.shadow),
            new RectangleF(
                SIZES.width - sys_left + SIZES.shadowOffset - SIZES.padding - sys_size,
                sys_top + SIZES.shadowOffset + SIZES.padding,
                sys_size,
                sys_size),
            FORMATS.centerCenter
        );

        // 内存占用文本
        graphics.DrawString(
            `${((ram_total - ram_free) / ram_total * 100).toFixed(1)}%`,
            new Font(config.font, 30),
            new SolidBrush(colors.text),
            new RectangleF(
                SIZES.width - sys_left - SIZES.padding - sys_size,
                sys_top + SIZES.padding,
                sys_size,
                sys_size),
            FORMATS.centerCenter
        );
    }

    {
        // CPU核数-阴影
        graphics.DrawString(
            `CPU (${cpu_cores || '未知'}核)`,
            new Font(config.font, 20),
            new SolidBrush(colors.shadow),
            new RectangleF(
                sys_left + SIZES.padding + SIZES.shadowOffset,
                sys_top + SIZES.shadowOffset + SIZES.padding + sys_size + 10,
                sys_size,
                90),
            FORMATS.center
        );

        // CPU核数
        graphics.DrawString(
            `CPU (${cpu_cores || '未知'}核)`,
            new Font(config.font, 20),
            new SolidBrush(colors.text),
            new RectangleF(
                sys_left + SIZES.padding,
                sys_top + SIZES.padding + sys_size + 10,
                sys_size,
                90),
            FORMATS.center
        );

        // CPU名称-阴影
        graphics.DrawString(
            cpu_name || '',
            new Font(config.font, 13),
            new SolidBrush(colors.shadow),
            new RectangleF(
                sys_left + SIZES.padding + SIZES.shadowOffset - sys_size / 2,
                sys_top + SIZES.shadowOffset + SIZES.padding + sys_size + 10 + 70,
                sys_size * 2,
                90),
            FORMATS.center
        );

        // CPU名称
        graphics.DrawString(
            cpu_name || '',
            new Font(config.font, 13),
            new SolidBrush(colors.text),
            new RectangleF(
                sys_left + SIZES.padding - sys_size / 2,
                sys_top + SIZES.padding + sys_size + 10 + 70,
                sys_size * 2,
                90),
            FORMATS.center
        );

        // 内存标题-阴影
        graphics.DrawString(
            'RAM',
            new Font(config.font, 20),
            new SolidBrush(colors.shadow),
            new RectangleF(
                SIZES.width - sys_left - SIZES.padding - sys_size + SIZES.shadowOffset,
                sys_top + SIZES.padding + sys_size + 10 + SIZES.shadowOffset,
                sys_size,
                90),
            FORMATS.center
        );

        // 内存标题
        graphics.DrawString(
            'RAM',
            new Font(config.font, 20),
            new SolidBrush(colors.text),
            new RectangleF(
                SIZES.width - sys_left - SIZES.padding - sys_size,
                sys_top + SIZES.padding + sys_size + 10,
                sys_size,
                90),
            FORMATS.center
        );

        // 已用内存-阴影
        graphics.DrawString(
            `已用内存 ${((ram_total - ram_free) / 1024 / 1024).toFixed(1)}GB\n总内存 ${(ram_total / 1024 / 1024).toFixed(1)}GB`,
            new Font(config.font, 13),
            new SolidBrush(colors.shadow),
            new RectangleF(
                SIZES.width - sys_left - SIZES.padding - sys_size + SIZES.shadowOffset,
                sys_top + SIZES.padding + sys_size + 10 + 70 + SIZES.shadowOffset,
                sys_size,
                90),
            FORMATS.center
        );

        // 已用内存
        graphics.DrawString(
            `已用内存 ${((ram_total - ram_free) / 1024 / 1024).toFixed(1)}GB\n总内存 ${(ram_total / 1024 / 1024).toFixed(1)}GB`,
            new Font(config.font, 13),
            new SolidBrush(colors.text),
            new RectangleF(
                SIZES.width - sys_left - SIZES.padding - sys_size,
                sys_top + SIZES.padding + sys_size + 10 + 70,
                sys_size,
                90),
            FORMATS.center
        );

        // 网速-阴影
        graphics.DrawString(
            `上传: ${uploadSpeed} · 下载: ${downloadSpeed}`,
            new Font(config.font, 13),
            new SolidBrush(colors.shadow),
            new RectangleF(
                SIZES.padding + SIZES.shadowOffset,
                sys_top + SIZES.shadowOffset + SIZES.padding + sys_size + 30 + 180,
                SIZES.width - 2 * SIZES.padding,
                90),
            FORMATS.center
        );

        // 网速
        graphics.DrawString(
            `上传: ${uploadSpeed} · 下载: ${downloadSpeed}`,
            new Font(config.font, 13),
            new SolidBrush(colors.text),
            new RectangleF(
                SIZES.padding,
                sys_top + SIZES.padding + sys_size + 30 + 180,
                SIZES.width - 2 * SIZES.padding,
                90),
            FORMATS.center
        );

        // 系统-阴影
        graphics.DrawString(
            `OS: ${os}`,
            new Font(config.font, 13),
            new SolidBrush(colors.shadow),
            new RectangleF(
                SIZES.padding + SIZES.shadowOffset,
                sys_top + SIZES.shadowOffset + SIZES.padding + sys_size + 30 + 230,
                SIZES.width - 2 * SIZES.padding,
                90),
            FORMATS.center
        );

        // 系统
        graphics.DrawString(
            `OS: ${os}`,
            new Font(config.font, 13),
            new SolidBrush(colors.text),
            new RectangleF(
                SIZES.padding,
                sys_top + SIZES.padding + sys_size + 30 + 230,
                SIZES.width - 2 * SIZES.padding,
                90),
            FORMATS.center
        );
    }

    const [
        subBar_top,         // 顶部距离
        subBar_lineHeight   // 行高
    ] = [sys_top + SIZES.padding * 3 + sys_size + 10 + 320, 70];

    // 长方形背景
    graphics.FillRectangle(
        new SolidBrush(colors.background),
        new Rectangle(
            SIZES.padding,
            subBar_top,
            SIZES.width / 2 - 2 * SIZES.padding,
            subBar_lineHeight * 6 + 2 * SIZES.padding - 30,
        ));

    // 获取相关信息
    const empty = '—';
    const status = serein.getServerStatus();
    const type = ['未知/其他', '基岩版', 'Java版'][serein.getSettingsObject().server.type];
    const motd = serein.getServerMotd();

    // 服务器状态-阴影
    graphics.DrawString(
        '服务器状态',
        new Font(config.font, 13),
        new SolidBrush(colors.shadow),
        new RectangleF(
            SIZES.padding * 2 + SIZES.shadowOffset,
            subBar_top + SIZES.padding + SIZES.shadowOffset,
            200,
            subBar_lineHeight),
        FORMATS.left
    );

    // 服务器状态
    graphics.DrawString(
        '服务器状态',
        new Font(config.font, 13),
        new SolidBrush(colors.text),
        new RectangleF(
            SIZES.padding * 2,
            subBar_top + SIZES.padding,
            200,
            subBar_lineHeight),
        FORMATS.left
    );

    // 服务器状态-阴影
    graphics.DrawString(
        status ? '运行中' : '未启动',
        new Font(config.font, 13),
        new SolidBrush(colors.shadow),
        new RectangleF(
            SIZES.padding * 2 + 200 + SIZES.shadowOffset,
            subBar_top + SIZES.padding + SIZES.shadowOffset,
            200,
            subBar_lineHeight),
        FORMATS.right
    );

    // 服务器状态
    graphics.DrawString(
        status ? '运行中' : '未启动',
        new Font(config.font, 13),
        new SolidBrush(colors.text),
        new RectangleF(
            SIZES.padding * 2 + 200,
            subBar_top + SIZES.padding,
            200,
            subBar_lineHeight),
        FORMATS.right
    );

    // 类型-阴影
    graphics.DrawString(
        '类型',
        new Font(config.font, 13),
        new SolidBrush(colors.shadow),
        new RectangleF(
            SIZES.padding * 2 + SIZES.shadowOffset,
            subBar_top + SIZES.padding + SIZES.shadowOffset + subBar_lineHeight,
            200,
            subBar_lineHeight),
        FORMATS.left
    );

    // 类型
    graphics.DrawString(
        '类型',
        new Font(config.font, 13),
        new SolidBrush(colors.text),
        new RectangleF(
            SIZES.padding * 2,
            subBar_top + SIZES.padding + subBar_lineHeight,
            200,
            subBar_lineHeight),
        FORMATS.left
    );

    // 类型-阴影
    graphics.DrawString(
        status && type || empty,
        new Font(config.font, 13),
        new SolidBrush(colors.shadow),
        new RectangleF(
            SIZES.padding * 2 + 200 + SIZES.shadowOffset,
            subBar_top + SIZES.padding + SIZES.shadowOffset + subBar_lineHeight,
            200,
            subBar_lineHeight),
        FORMATS.right
    );

    // 类型
    graphics.DrawString(
        status && type || empty,
        new Font(config.font, 13),
        new SolidBrush(colors.text),
        new RectangleF(
            SIZES.padding * 2 + 200,
            subBar_top + SIZES.padding + subBar_lineHeight,
            200,
            subBar_lineHeight),
        FORMATS.right
    );

    // 版本-阴影
    graphics.DrawString(
        '版本',
        new Font(config.font, 13),
        new SolidBrush(colors.shadow),
        new RectangleF(
            SIZES.padding * 2 + SIZES.shadowOffset,
            subBar_top + SIZES.padding + SIZES.shadowOffset + subBar_lineHeight * 2,
            200,
            subBar_lineHeight),
        FORMATS.left
    );

    // 版本
    graphics.DrawString(
        '版本',
        new Font(config.font, 13),
        new SolidBrush(colors.text),
        new RectangleF(
            SIZES.padding * 2,
            subBar_top + SIZES.padding + subBar_lineHeight * 2,
            200,
            subBar_lineHeight),
        FORMATS.left
    );

    // 版本-阴影
    graphics.DrawString(
        status && `${motd?.version || '未知'} (${motd?.protocol || '未知'})` || empty,
        new Font(config.font, 13),
        new SolidBrush(colors.shadow),
        new RectangleF(
            SIZES.padding * 2 + 200 + SIZES.shadowOffset,
            subBar_top + SIZES.padding + SIZES.shadowOffset + subBar_lineHeight * 2,
            200,
            subBar_lineHeight),
        FORMATS.right
    );

    // 版本
    graphics.DrawString(
        status && `${motd?.version || '未知'} (${motd?.protocol || '未知'})` || empty,
        new Font(config.font, 13),
        new SolidBrush(colors.text),
        new RectangleF(
            SIZES.padding * 2 + 200,
            subBar_top + SIZES.padding + subBar_lineHeight * 2,
            200,
            subBar_lineHeight),
        FORMATS.right
    );

    // 在线人数-阴影
    graphics.DrawString(
        '在线人数',
        new Font(config.font, 13),
        new SolidBrush(colors.shadow),
        new RectangleF(
            SIZES.padding * 2 + SIZES.shadowOffset,
            subBar_top + SIZES.padding + SIZES.shadowOffset + subBar_lineHeight * 3,
            200,
            subBar_lineHeight),
        FORMATS.left
    );

    // 在线人数
    graphics.DrawString(
        '在线人数',
        new Font(config.font, 13),
        new SolidBrush(colors.text),
        new RectangleF(
            SIZES.padding * 2,
            subBar_top + SIZES.padding + subBar_lineHeight * 3,
            200,
            subBar_lineHeight),
        FORMATS.left
    );

    // 在线人数-阴影
    graphics.DrawString(
        status && `${motd?.onlinePlayer}/${motd?.maxPlayer}` || empty,
        new Font(config.font, 13),
        new SolidBrush(colors.shadow),
        new RectangleF(
            SIZES.padding * 2 + 200 + SIZES.shadowOffset,
            subBar_top + SIZES.padding + SIZES.shadowOffset + subBar_lineHeight * 3,
            200,
            subBar_lineHeight),
        FORMATS.right
    );

    // 在线人数
    graphics.DrawString(
        status && `${motd?.onlinePlayer}/${motd?.maxPlayer}` || empty,
        new Font(config.font, 13),
        new SolidBrush(colors.text),
        new RectangleF(
            SIZES.padding * 2 + 200,
            subBar_top + SIZES.padding + subBar_lineHeight * 3,
            200,
            subBar_lineHeight),
        FORMATS.right
    );

    // 运行时间-阴影
    graphics.DrawString(
        '运行时间',
        new Font(config.font, 13),
        new SolidBrush(colors.shadow),
        new RectangleF(
            SIZES.padding * 2 + SIZES.shadowOffset,
            subBar_top + SIZES.padding + SIZES.shadowOffset + subBar_lineHeight * 4,
            200,
            subBar_lineHeight),
        FORMATS.left
    );

    // 运行时间
    graphics.DrawString(
        '运行时间',
        new Font(config.font, 13),
        new SolidBrush(colors.text),
        new RectangleF(
            SIZES.padding * 2,
            subBar_top + SIZES.padding + subBar_lineHeight * 4,
            200,
            subBar_lineHeight),
        FORMATS.left
    );

    // 运行时间-阴影
    graphics.DrawString(
        status && serein.getServerTime() || empty,
        new Font(config.font, 13),
        new SolidBrush(colors.shadow),
        new RectangleF(
            SIZES.padding * 2 + 200 + SIZES.shadowOffset,
            subBar_top + SIZES.padding + SIZES.shadowOffset + subBar_lineHeight * 4,
            200,
            subBar_lineHeight),
        FORMATS.right
    );

    // 运行时间
    graphics.DrawString(
        status && serein.getServerTime() || empty,
        new Font(config.font, 13),
        new SolidBrush(colors.text),
        new RectangleF(
            SIZES.padding * 2 + 200,
            subBar_top + SIZES.padding + subBar_lineHeight * 4,
            200,
            subBar_lineHeight),
        FORMATS.right
    );

    // 进程占用-阴影
    graphics.DrawString(
        '进程占用',
        new Font(config.font, 13),
        new SolidBrush(colors.shadow),
        new RectangleF(
            SIZES.padding * 2 + SIZES.shadowOffset,
            subBar_top + SIZES.padding + SIZES.shadowOffset + subBar_lineHeight * 5,
            200,
            subBar_lineHeight),
        FORMATS.left
    );

    // 进程占用
    graphics.DrawString(
        '进程占用',
        new Font(config.font, 13),
        new SolidBrush(colors.text),
        new RectangleF(
            SIZES.padding * 2,
            subBar_top + SIZES.padding + subBar_lineHeight * 5,
            200,
            subBar_lineHeight),
        FORMATS.left
    );

    // 进程占用-阴影
    const server_usage = `${serein.getServerCPUUsage().toFixed(1)}%`;
    graphics.DrawString(
        status && server_usage || empty,
        new Font(config.font, 13),
        new SolidBrush(colors.shadow),
        new RectangleF(
            SIZES.padding * 2 + 200 + SIZES.shadowOffset,
            subBar_top + SIZES.padding + SIZES.shadowOffset + subBar_lineHeight * 5,
            200,
            subBar_lineHeight),
        FORMATS.right
    );

    // 进程占用
    graphics.DrawString(
        status && server_usage || empty,
        new Font(config.font, 13),
        new SolidBrush(colors.text),
        new RectangleF(
            SIZES.padding * 2 + 200,
            subBar_top + SIZES.padding + subBar_lineHeight * 5,
            200,
            subBar_lineHeight),
        FORMATS.right
    );

    // 长方形背景
    graphics.FillRectangle(
        new SolidBrush(colors.background),
        new Rectangle(
            SIZES.padding + SIZES.width / 2,
            subBar_top,
            SIZES.width / 2 - 2 * SIZES.padding,
            subBar_lineHeight * 6 + 2 * SIZES.padding - 30,
        ));

    // 硬盘用量-阴影
    graphics.DrawString(
        '硬盘用量',
        new Font(config.font, 13),
        new SolidBrush(colors.shadow),
        new RectangleF(
            SIZES.padding + SIZES.width / 2 + SIZES.shadowOffset,
            subBar_top + 30 + SIZES.shadowOffset,
            SIZES.width / 2 - SIZES.padding * 2,
            subBar_lineHeight),
        FORMATS.center
    );

    // 硬盘用量
    graphics.DrawString(
        '硬盘用量',
        new Font(config.font, 13),
        new SolidBrush(colors.text),
        new RectangleF(
            SIZES.padding + SIZES.width / 2,
            subBar_top + 30,
            SIZES.width / 2 - SIZES.padding * 2,
            subBar_lineHeight),
        FORMATS.center
    );

    // 获取所有的驱动器
    const allDirves = DriveInfo.GetDrives();
    for (let index = 1; index < allDirves.length + 1 && index < 6; index++) {
        const drive = allDirves[index - 1];

        // 解构对象
        const {
            TotalFreeSpace: totalFreeSpace,
            TotalSize: totalSize,
            Name: [name]
        } = drive;

        // 盘符-阴影
        graphics.DrawString(
            name + ':\\',
            new Font(config.font, 13),
            new SolidBrush(colors.shadow),
            new RectangleF(
                SIZES.padding * 2 + SIZES.width / 2 + SIZES.shadowOffset,
                subBar_top + SIZES.padding + SIZES.shadowOffset + subBar_lineHeight * index,
                200,
                subBar_lineHeight),
            FORMATS.left
        );

        // 盘符
        graphics.DrawString(
            name + ':\\',
            new Font(config.font, 13),
            new SolidBrush(colors.text),
            new RectangleF(
                SIZES.padding * 2 + SIZES.width / 2,
                subBar_top + SIZES.padding + subBar_lineHeight * index,
                200,
                subBar_lineHeight),
            FORMATS.left
        );

        // 占用空间长方形背景
        graphics.FillRectangle(
            new SolidBrush(colors.background),
            new RectangleF(
                SIZES.padding * 2 + SIZES.width / 2 + 80,
                subBar_top + subBar_lineHeight * index + 30,
                SIZES.width / 2 - SIZES.padding * 2 - 160,
                subBar_lineHeight * 0.5
            ));

        // 占用比例
        graphics.FillRectangle(
            new SolidBrush(Color.FromArgb(175, colors.main[0], colors.main[1], colors.main[2])),
            new RectangleF(
                SIZES.padding * 2 + SIZES.width / 2 + 80,
                subBar_top + subBar_lineHeight * index + 30,
                (SIZES.width / 2 - SIZES.padding * 2 - 160) * (1 - totalFreeSpace / totalSize),
                subBar_lineHeight * 0.5
            ));

        // 具体百分比-阴影
        graphics.DrawString(
            `${(100 - totalFreeSpace / totalSize * 100).toFixed(1)}%`,
            new Font(config.font, 10),
            new SolidBrush(colors.shadow),
            new RectangleF(
                SIZES.padding * 2 + SIZES.width / 2 + 80 + SIZES.shadowOffset,
                subBar_top + subBar_lineHeight * index + 30 + SIZES.shadowOffset,
                SIZES.width / 2 - SIZES.padding * 2 - 160,
                subBar_lineHeight),
            FORMATS.center
        );

        // 具体百分比
        graphics.DrawString(
            `${(100 - totalFreeSpace / totalSize * 100).toFixed(1)}%`,
            new Font(config.font, 10),
            new SolidBrush(colors.text),
            new RectangleF(
                SIZES.padding * 2 + SIZES.width / 2 + 80,
                subBar_top + subBar_lineHeight * index + 30,
                SIZES.width / 2 - SIZES.padding * 2 - 160,
                subBar_lineHeight),
            FORMATS.center
        );
    }

    // 水印
    graphics.DrawString(
        `Serein@${serein.version}  StatPictureGenerater@${VERSION}\nPicId: ${fileId}  Time: ${new Date().toLocaleTimeString()}`,
        new Font(config.font, 6),
        new SolidBrush(Color.FromArgb(50, 128, 128, 128)),
        new RectangleF(
            SIZES.padding,
            SIZES.height - 40,
            SIZES.width - 2 * SIZES.padding,
            40),
        FORMATS.centerBottom
    );

    // 保存
    bitmap.Save(file, ImageFormat.Png);
    bitmap.Dispose();
    graphics.Dispose();

    // 设置缓存
    caches.set(file, Date.now());

    // 获取文件大小
    const fileSize = new FileInfo(file).length / 1024 / 1024;

    // 清理内存
    GC.Collect();

    logger.info(`生成完毕。用时：${(Date.now() - time) / 1000}s；${fileSize.toFixed(2)}MB`)

    return `[CQ:image,file=base64://${Convert.ToBase64String(File.ReadAllBytes(file))}]` // 返回base64CQ🐴
}

/**
 * 清除缓存
 */
function clearCaches() {
    caches.forEach((value, key) => {
        if (Number.isInteger(value) &&
            Date.now() - value > 5000 &&
            existFile(key)) {
            deleteFile(key);
            caches.delete(key);
        }
    })
}

/**
 * 清除所有缓存
 */
function clearAllCache() {
    for (const file of getFiles(PATH.caches, '*.png'))
        deleteFile(file);
}

/**
 * 处理
 * @param packet 数据包
 */
function handle(packet: Packet) {
    try {
        return generate(packet);
    } catch (e: any) {
        serein.sendGroup(packet.group_id, e?.message || e?.toString() || e);
        throw e;
    }
}

/**
 * 注册命令
 */
function reg() {
    const MHregHandler: regHandler = serein.imports('MsgHelper.regHandler');
    if (!MHregHandler || typeof (MHregHandler) != 'function')
        throw new Error('你需要安装`MsgHelper.js`');

    MHregHandler({
        name: '当前状态图片',
        descriptions: ['以图片方式返回当前状态', '用法：发送“zt”|“状态”|“服务器状态”'],
        author: 'Zaitonn',
        version: VERSION,
        triggers: [{
            type: 'fullmatch',
            params: ['zt', '状态', '服务器状态'],
            callback: handle
        }]
    });
}

/**
 * 获取颜色
 * @param hexColor 十六进制颜色代码
 * @returns 颜色
 */
function getColor(hexColor: string): Color {
    if (typeof (hexColor) !== 'string' ||
        !/^#?[a-zA-Z0-9]{positions.offset}$/.test(hexColor) &&
        !/^#?[a-zA-Z0-9]{6}$/.test(hexColor) &&
        !/^#?[a-zA-Z0-9]{8}$/.test(hexColor))
        return Color.Transparent;

    const hexs =
        hexColor
            .replace(/^#/, '')
            .split(new RegExp(`([a-zA-Z0-9]{${hexColor.length <= 4 ? 1 : 2}})`))
            .filter(value => value);

    const numbers = hexs.map((num) => parseInt(`0x${num}`));
    serein.log(numbers.join(','));
    switch (numbers.length) {
        case 3:
            return Color.FromArgb(numbers[0], numbers[1], numbers[2]);
        case 4:
            return Color.FromArgb(numbers[3], numbers[0], numbers[1], numbers[2]);
        default:
            return Color.Transparent;
    }
}

/**
 * 获取主要颜色
 * @param file 文件名
 * @returns 
 */
function getMainColor(file: string): [number, number, number] {
    const bitmap = new Bitmap(10, 10);
    const graphics = Graphics.FromImage(bitmap);
    graphics.DrawImage(
        file,
        new Rectangle(0, 0, 10, 10)
    );
    let r = 0, g = 0, b = 0, t = 0;
    for (let x = 0; x < 10; x++)
        for (let y = 0; y < 10; y++) {
            const c = bitmap.GetPixel(x, y);
            if (c.R || c.G || c.B)
                r += c.R, g += c.G, b += c.B, t += 1;
        }
    bitmap.Dispose();
    graphics.Dispose();
    return [r / t, g / t, b / t];
}

/**
 * 获取所有的对齐格式
 * @returns
 */
function getFormats() {

    const center = new StringFormat();
    center.Alignment = StringAlignment.Center;
    center.Trimming = StringTrimming.Character;

    const centerCenter = new StringFormat();
    centerCenter.Alignment = StringAlignment.Center;
    centerCenter.LineAlignment = StringAlignment.Center;
    centerCenter.Trimming = StringTrimming.Character;

    const centerBottom = new StringFormat();
    centerBottom.Alignment = StringAlignment.Center;
    centerBottom.LineAlignment = StringAlignment.Center;
    centerBottom.Trimming = StringTrimming.Character;

    const left = new StringFormat();
    left.Alignment = StringAlignment.Near;
    left.Trimming = StringTrimming.Character;

    const right = new StringFormat();
    right.Alignment = StringAlignment.Far;
    right.Trimming = StringTrimming.Character;

    return { left, right, center, centerCenter, centerBottom };
}

/**
 * 从链接获取图片
 * @param url 
 * @returns 图片
 */
function getImgFromUrl(url: string) {
    return Bitmap.FromStream(
        httpClient
            .GetAsync(url)
            .GetAwaiter()
            .GetResult()
            .Content
            .ReadAsStreamAsync()
            .GetAwaiter()
            .GetResult()
    );
}

/**
 * 计算缩放尺寸
 * @param width 宽
 * @param height 高
 * @returns 计算结果
 */
function calculateSize(width: number, height: number): [number, number] {
    // 分别计算长宽偏差的百分比
    const percent = [
        Math.abs((width - SIZES.width) / SIZES.width),
        Math.abs((height - SIZES.height) / SIZES.height)
    ];

    // 取小的一边作为基准
    if (percent[0] < percent[1]) {
        return [SIZES.width, height / width * SIZES.width];
    }
    return [width / height * SIZES.height, SIZES.height];
}

/**
 * 加载配置
 * @returns 配置对象
 */
function loadConfig() {
    if (!existFile(PATH.config)) {
        createDirectory(PATH.main);
        writeAllTextToFile(PATH.config, JSON.stringify(BASECONFIG, null, 2));
        logger.warn('配置文件已创建。');
        return BASECONFIG;
    }

    const tempConfig: Config = JSON.parse(readAllTextFromFile(PATH.config));

    if (!['api', 'local'].includes(tempConfig.originType.toLowerCase()))
        logger.warn('图片源类型错误');

    if (tempConfig.originType.toLowerCase() === 'url' && (!Array.isArray(tempConfig.urls) || tempConfig.urls.length === 0))
        logger.warn('图片链接列表为空');

    if (!tempConfig.title)
        logger.warn('标题栏为空');

    if (!tempConfig.font)
        logger.warn('字体未指定');

    if (!['auto', 'light', 'dark'].includes(tempConfig.theme))
        logger.warn('主题不正确');

    return {
        urls: tempConfig.urls,
        title: tempConfig.title,
        originType: tempConfig.originType,
        font: tempConfig.font || '得意黑',
        shadow: Boolean(tempConfig.shadow),
        theme: tempConfig.theme,
        defaultColor: tempConfig.defaultColor || null
    };
}

// @ts-ignore
setInterval(clearCaches, 100_000);
serein.setListener('onPluginsLoaded', reg);
serein.setListener('onPluginsReload', clearAllCache);
