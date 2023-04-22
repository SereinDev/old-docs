// @ts-check

const BASEURL = 'https://us-east-1.aws.data.mongodb-api.com/app/data-ymcin/endpoint/data/v1';
const ACCEPTABLETYPE = ['console', 'winform', 'wpf'];
const VERSION_REGEX = /^v\d\.\d\.\d+$/;
const GUID_REGEX = /^[0-9a-f]{32}$/i;
const DATE_REGEX = /^\d+$/;

// @ts-ignore
addEventListener('fetch', (event) => event.respondWith(handle(event.request)));
// @ts-ignore
addEventListener('scheduled', event => event.waitUntil(deleteExpirations()));


/**
 * 处理请求
 * @param {Request} request 
 */
async function handle(request) {
    const url = new URL(request.url);
    let response;

    if (url.protocol != 'https:') // http -> https
        return Response.redirect(request.url.replace(/^http:/, 'https:'));

    try {
        if (request.method != 'GET')
            return createResponse('Bad Request', 400);

        switch (url.host) {
            case 'online-count.serein.cc':
                if (request.url.endsWith('ico'))
                    return Response.redirect('https://serein.cc/img/Serein.ico', 301);

                if (request.url.replace(/\/$/, '') != 'https://online-count.serein.cc')
                    return Response.redirect('https://online-count.serein.cc');

                return new Response(
                    await (await fetch('https://raw.githubusercontent.com/Zaitonn/Serein-Docs/online_count/index.html')).text(),
                    {
                        status: 200,
                        headers: {
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Credentials': 'true',
                            'Content-Type': 'text/html; charset=utf-8'
                        }
                    });

            case 'api.online-count.serein.cc':
                switch (url.pathname) {

                    case '/robots.txt':
                        return createResponse(
                            `User-agent: *\nDisallow: /`
                        );

                    case '/list':
                        response = await list();
                        return createResponse(await response.text(), response.status, 'application/json')

                    case '/heartbeat':
                        if (!check(url.searchParams))
                            return createResponse('Bad Request', 400);

                        response
                            = await update({
                                // @ts-ignore
                                region: request.cf.region || request.cf.country || null,
                                type: url.searchParams.get('type'),
                                version: url.searchParams.get('version'),
                                server_status: url?.searchParams?.get('server_status')?.toLocaleLowerCase() === 'true',
                                guid: {
                                    $oid: (url.searchParams.get('guid') || '000000000000000000000000').substring(0, 24)
                                },
                                start_time: {
                                    $numberLong: url.searchParams.get('start_time')
                                },
                                update_time: {
                                    $numberLong: `${Date.now() + new Date().getTimezoneOffset() * 1000}`
                                }
                            });
                        return createResponse(await response.text(), response.status, 'application/json')

                    case '/delete':
                        return await deleteExpirations();

                    case '/favicon.ico':
                        return Response.redirect('https://serein.cc/img/Serein.ico', 301);

                    case '/':
                        return createResponse('This is a api worker for Serein. For more infomation please see "https://serein.cc/". Have a nice day :D')

                    default:
                        if (url.searchParams.has('debug'))
                            return createResponse(JSON.stringify(request), 200, 'application/json');
                        return createResponse('Api endpoint not found', 404);
                }
            default:
                return Response.redirect('https://online-count.serein.cc');
        }
    }
    catch (e) {
        if (url.searchParams.has('debug'))
            return createResponse(e.stack, 501);
        return createResponse('An error occurred.', 501);
    }
}

/**
 * 创建响应
 * @param {any} data 返回数据
 * @param {number} status 状态码
 * @param {string} contentType 正文类型
 * @returns {Response}
 */
function createResponse(data = null, status = 200, contentType = 'text/plain; charset=utf-8') {
    return new Response(
        data,
        {
            status: status,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': 'true',
                'Content-Type': contentType
            }
        }
    );
}

/**
 * 更新客户端
 * @param {Object} datas 客户端数据
 */
async function update(datas) {
    return await fetch(new Request(`${BASEURL}/action/updateOne`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // @ts-ignore
            'api-key': APIKEY
        },
        body: JSON.stringify({
            dataSource: 'Serein',
            database: 'Main',
            collection: 'OnlineClient',
            filter: {
                'guid': datas.guid
            },
            upsert: true,
            update: {
                $set: datas,
            }
        })
    }));
}

/**
 * 检验url
 * @param {URLSearchParams} urlparams 
 * @returns {Boolean}
 */
function check(urlparams) {
    return false ||
        ACCEPTABLETYPE.includes(urlparams.get('type') || '') &&
        VERSION_REGEX.test(urlparams.get('version') || '') &&
        GUID_REGEX.test(urlparams.get('guid') || '') &&
        DATE_REGEX.test(urlparams.get('start_time') || '');
}

/**
 * 列出所有在线客户端
 */
async function list() {
    return await fetch(new Request(`${BASEURL}/action/find`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // @ts-ignore
            'api-key': APIKEY
        },
        body: JSON.stringify({
            dataSource: 'Serein',
            database: 'Main',
            collection: 'OnlineClient',
            filter: {
                update_time: {
                    $gte: Date.now() + new Date().getTimezoneOffset() * 1000 - 600_000
                }
            }
        })
    }));
}

/**
 * 删除过期客户端
 */
async function deleteExpirations() {
    return await fetch(new Request(`${BASEURL}/action/deleteMany`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // @ts-ignore
            'api-key': APIKEY
        },
        body: JSON.stringify({
            dataSource: 'Serein',
            database: 'Main',
            collection: 'OnlineClient',
            filter: {
                update_time: {
                    $lte: Date.now() + new Date().getTimezoneOffset() * 1000 - 800_000
                }
            }
        })
    }));
}
