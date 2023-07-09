const url = 'https://api.online-count.serein.cc/list';

export declare type Datas = {
    datas: Instance[]
}

export declare type Instance = {
    _id: string,
    guid: string,
    region: string,
    server_status: boolean,
    start_time: number,
    type: 'winform' | 'wpf' | 'console',
    version: string
}

let cache: Instance[] | null = null;

export async function init(): Promise<Instance[]> {
    console.log(1);
    return cache ?? (cache = ((await ((await fetch(url)).json())).documents as Instance[]).sort((a, b) => a.start_time - b.start_time));
};

export function getTimeStr(min: number) {
    if (!min || min < 0)
        return null;
    if (min < 60)
        return `${min.toFixed(1)}分钟`;
    if (min < 60 * 24)
        return `${(min / 60).toFixed(1)}小时`;
    return `${(min / 60 / 24).toFixed(1)}天`;
}