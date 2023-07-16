// 你可以按需调整内存清理的间隔，单位为ms
setInterval(() => System.GC.Collect(), 20000);
serein.registerPlugin('内存清理', serein.version, 'Zaitonn', 'Only For Serein.');
