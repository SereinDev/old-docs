declare interface Settings {
    server: Server
    matches: Matches
    bot: Bot
    serein: Serein
    event: Event
}

declare interface Server {
    autoStop: boolean
    enableRestart: boolean
    enableOutputCommand: boolean
    enableLog: boolean
    enableUnicode: boolean
    excludedOutputs: any[]
    inputEncoding: number
    lineTerminator: string
    outputEncoding: number
    outputStyle: number
    path: string
    port: number
    stopCommands: string[]
    type: number
}

declare interface Matches {
    difficulty: string
    levelName: string
    muiltLines: string[]
}

declare interface Bot {
    authorization: string
    autoEscape: boolean
    autoReconnect: boolean
    enableLog: boolean
    enbaleOutputData: boolean
    enbaleParseAt: boolean
    givePermissionToAllAdmin: boolean
    groupList: number[]
    permissionList: any[]
    uri: string
}

declare interface Serein {
    autoUpdate: boolean
    colorfulLog: boolean
    dpiAware: boolean
    enableGetUpdate: boolean
    maxCacheLines: number
    themeFollowSystem: boolean
    useDarkTheme: boolean
    autoRun: AutoRun
    developmentTool: DevelopmentTool
    function: Function
    pagesDisplayed: PagesDisplayed
}

declare interface AutoRun {
    startServer: boolean
    connectWS: boolean
    delay: number
}

declare interface DevelopmentTool {
    enableDebug: boolean
    detailDebug: boolean
    note: string
}

declare interface Function {
    noHeartbeat: boolean
    jsEventMaxWaitingTime: number
    jsEventCoolingDownTime: number
    jsGlobalAssemblies: string[]
    disableBinderWhenServerClosed: boolean
    regexForCheckingGameID: string
    jsGlobalAssemblies: string[]
    jsPatternToSkipLoadingSpecifiedFile: string[]
}

declare interface PagesDisplayed {
    serverPanel: boolean
    serverPluginManager: boolean
    regexList: boolean
    schedule: boolean
    bot: boolean
    member: boolean
    jsPlugin: boolean
    settings: boolean
}

declare interface Event {
    BindingSucceed: string[]
    BindingFailDueToOccupation: string[]
    BindingFailDueToInvalid: string[]
    BindingFailDueToAlreadyBinded: string[]
    UnbindingSucceed: string[]
    UnbindingFail: string[]
    BinderDisable: string[]
    ServerStart: string[]
    ServerStop: string[]
    ServerExitUnexpectedly: string[]
    GroupIncrease: string[]
    GroupDecrease: string[]
    GroupPoke: string[]
    SereinCrash: string[]
    RequestingMotdpeSucceed: string[]
    RequestingMotdjeSucceed: string[]
    RequestingMotdFail: string[]
    PermissionDeniedFromPrivateMsg: string[]
    PermissionDeniedFromGroupMsg: string[]
}
