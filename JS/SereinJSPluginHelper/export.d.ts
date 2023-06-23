declare namespace serein {
    /**
     * 导出
     * @param {string} key 导出键名
     * @param {*} obj 导出的对象
     */
    function exports(key: string, obj?: any): void;

    /**
     * 导入
     * @param {string} key 导入键名
     * @returns {any | null | undefined} 导入对象
     */
    function imports(key: string): any | null | undefined
}
