declare namespace serein {
    /**
     * 导出
     * @param key 导出键名
     * @param obj 导出的对象
     */
    function exports(key: string, obj?: any): void;

    /**
     * 导入
     * @param key 导入键名
     * @returns 导入对象
     */
    function imports(key: string): any | null | undefined
}

declare function require(fileName: string): any;