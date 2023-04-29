
const HttpListener = System.Net.HttpListener;
const Encoding = System.Text.Encoding;
const File = System.IO.File;
const Directory = System.IO.Directory;
const listener = new HttpListener();
const logger = new Logger('HTTPApi');
const VERSION = 'v1.1';

serein.registerPlugin('HTTPApi', VERSION, 'Zaitonn', 'HTTP应用程序接口');

let config = {
    auth: [''],
    port: 2222,
    whitelist: [],
    enableWhitelist: false
};

/**
 * 初始化
 */
function init() {
    if (!HttpListener.IsSupported)
        throw new Error('当前系统不支持HttpListener');

    if (Directory.Exists('plugins/HTTPApi') && File.Exists('plugins/HTTPApi/config.json')) {
        try {
            config = JSON.parse(File.ReadAllText('plugins/HTTPApi/config.json'));
            config.whitelist.push('127.0.0.1');
        } catch (e) {
            throw new Error(`读取配置文件时出现问题：${e}`);
        }

        if (config.auth.length <= 0)
            throw new Error('AuthKey为空，请修改后重试');

        listener.Prefixes.Add(`http://127.0.0.1:${config.port}/serein/`);
        listener.Start();
        start();
    } else {
        Directory.CreateDirectory('plugins/HTTPApi');
        File.WriteAllText('plugins/HTTPApi/config.json', JSON.stringify(config, null, 4));
        logger.error('配置文件不存在，已重新创建');
        throw new Error('请使用文本编辑器打开 plugins/HTTPApi/config.json 修改相应配置后重新加载');
    }
}

/**
 * 开始获取请求
 */
function start() {
    setTimeout(() => {
        logger.warn('已开始接收http数据包。若要重新加载配置请重启Serein，直接重载插件将导致此插件无法被加载');
        while (listener.IsListening) {
            const context = listener.GetContext();
            const response = handleResponse(context.Request);
            context.Response.AddHeader('Content-Type', 'application/json'); // 添加响应头
            context.Response.StatusCode = response.status;
            const bytes = Encoding.UTF8.GetBytes(createResponse(response.data, response.status));
            context.Response.ContentLength64 = bytes.length;
            context.Response.OutputStream.Write(bytes, 0, bytes.length);
            context.Response.Close();
        }
    }, 100);
}

/**
 * 获取当前URL参数
 * @param {string} parameter 参数
 * @param {string|null} name 参数名
 * @returns 参数
 */
function getParameter(parameter, name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]+?)(&|$)', 'i');
    let r = parameter.match(reg);
    if (r != null)
        return r[2];
    return null;
}

/**
 * 处理回复
 * @param {HttpListenerRequest} request 请求体对象
 * @returns {Array}
 */
function handleResponse(request) {
    try {
        if (request.HttpMethod.toLowerCase() != 'get')
            return {
                status: 405,
                data: '请使用GET请求'
            };

        if (config.enableWhitelist &&
            request.RemoteEndPoint.Address.ToString() != '127.0.0.1' &&
            !config.whitelist.includes(request.RemoteEndPoint.Address.ToString()))
            return {
                status: 401,
                data: '你不在IP白名单内'
            };

        const url = decodeURI(request.RawUrl.substring(1).toLocaleLowerCase());
        logger.info(`${request.RemoteEndPoint.ToString()}: ${url}`);

        const parameter = url.split('?')[1] || '';
        if (!config.auth.includes(getParameter(parameter, 'auth'))) {
            logger.warn(`${request.RemoteEndPoint.ToString()}: 验证失败（auth: ${getParameter(parameter, 'auth')}）`);
            return {
                status: 401,
                data: '需要通过验证'
            };
        }

        if (url.endsWith('/') || // 路径错误
            url.indexOf('?') < 0 || // 无参数请求
            url.indexOf('?') != url.lastIndexOf('?')) // 异常url请求参数
            return {
                status: 400,
                data: '错误的请求'
            };

        switch (getParameter(parameter, 'operation')) {
            case 'sendcmd':
                const command = getParameter(parameter, 'command');
                if (!command)
                    return {
                        status: 406,
                        data: {
                            success: false,
                            reason: '命令为空'
                        }
                    };

                if (!serein.getServerStatus())
                    return {
                        status: 403,
                        data: {
                            success: false,
                            reason: '服务器不在运行中'
                        }
                    };
                serein.sendCmd(command);
                return {
                    status: 200,
                    data: {
                        success: true,
                        reason: ''
                    }
                };

            case 'startserver':
                if (serein.startServer())
                    return {
                        status: 200,
                        data: {
                            success: true,
                            reason: ''
                        }
                    };
                return {
                    status: 403,
                    data: {
                        success: false,
                        reason: '服务器已在运行中'
                    }
                };

            case 'stopserver':
                if (serein.stopServer())
                    return {
                        status: 200,
                        data: {
                            success: true,
                            reason: ''
                        }
                    };
                return {
                    status: 403,
                    data: {
                        success: false,
                        reason: '服务器不在运行中'
                    }
                };

            case 'killserver':
                if (serein.killServer())
                    return {
                        status: 200,
                        data: {
                            success: true,
                            reason: ''
                        }
                    };
                return {
                    status: 403,
                    data: {
                        success: false,
                        reason: '服务器不在运行中'
                    }
                };

            case 'getserverinfo':
                return {
                    status: 200,
                    data: {
                        status: serein.getServerStatus(),
                        runtime: serein.getServerTime(),
                        cpuusage: serein.getServerCPUUsage(),
                        filename: serein.getServerFile()
                    }
                };

            case 'runcommand':
                serein.runCommand(getParameter(parameter, 'command'));
                return {
                    status: 200,
                    data: null
                };

            case 'sendprivate':
                if (!getParameter(url, 'target') ||
                    !getParameter(url, 'msg'))
                    return {
                        status: 406,
                        data: {
                            success: false,
                            reason: '参数为空'
                        }
                    };
                if (serein.sendPrivate(Number(getParameter(url, 'targrt')), getParameter(url, 'msg')))
                    return {
                        status: 202,
                        data: {
                            success: true,
                            reason: ''
                        }
                    };
                return {
                    status: 403,
                    data: {
                        success: false,
                        reason: 'WS未连接'
                    }
                };

            case 'sendgroup':
                if (!getParameter(url, 'target') ||
                    !getParameter(url, 'msg'))
                    return {
                        status: 406,
                        data: {
                            success: false,
                            reason: '参数为空'
                        }
                    };
                if (serein.sendGroup(Number(getParameter(url, 'targrt')), getParameter(url, 'msg')))
                    return {
                        status: 202,
                        data: {
                            success: true,
                            reason: ''
                        }
                    };
                return {
                    status: 403,
                    data: {
                        success: false,
                        reason: 'WS未连接'
                    }
                };

            case 'sendpacket':
                if (!getParameter(url, 'packet'))
                    return {
                        status: 406,
                        data: {
                            success: false,
                            reason: '参数为空'
                        }
                    };
                if (serein.sendPacket(getParameter(url, 'packet')))
                    return {
                        status: 202,
                        data: {
                            success: true,
                            reason: ''
                        }
                    };
                return {
                    status: 403,
                    data: {
                        success: false,
                        reason: 'WS未连接'
                    }
                };

            case 'bindmember':
                if (!getParameter(url, 'userid') ||
                    !getParameter(url, 'gameid'))
                    return {
                        status: 406,
                        data: {
                            success: false,
                            reason: '参数为空'
                        }
                    };
                if (serein.bindMember(Number(getParameter(url, 'userid')), getParameter(url, 'gameid')))
                    return {
                        status: 200,
                        data: {
                            success: true,
                            reason: ''
                        }
                    };
                return {
                    status: 403,
                    data: {
                        success: false,
                        reason: '绑定失败'
                    }
                };

            case 'unbindmember':
                if (!getParameter(url, 'userid'))
                    return {
                        status: 200,
                        data: {
                            success: false,
                            reason: '参数为空'
                        }
                    };
                if (serein.unbindMember(Number(getParameter(url, 'userid'))))
                    return {
                        status: 200,
                        data: {
                            success: true,
                            reason: ''
                        }
                    };
                return {
                    status: 403,
                    data: {
                        success: false,
                        reason: '解绑失败'
                    }
                };

            case 'getnetspeed':
                const netinfo = serein.getNetSpeed();
                return {
                    status: 200,
                    data: {
                        upload: netinfo[0] || 'unknown',
                        download: netinfo[1] || 'unknown'
                    }
                };

            case 'getsysinfo':
                return {
                    status: 200,
                    data: {
                        cpuusage: serein.getCPUUsage(),
                        infos: serein.getSysInfo()
                    }
                };

            case null:
                return {
                    status: 200,
                    data: `欢迎使用Serein HttpApi ${VERSION}。此插件运行在Serein ${serein.version}`
                };

            default:
                return {
                    status: 404,
                    data: '未知的操作类型'
                };
        }
    }
    catch (e) {
        logger.error(`处理请求时发生错误${e.name}:${e.message}\n${e.stack}`);
        return {
            status: 500,
            data: {
                name: e.name,
                msg: e.message,
                stack: e.stack
            }
        };
    }
}

/**
 * 创建响应
 * @param {*} data 
 * @param {Number} status 
 * @returns {String}
 */
function createResponse(data, status = 200) {
    return JSON.stringify({
        status: status,
        data: data || null,
        time: Math.floor(Date.now() / 1000)
    }, null, 2);
}

init();