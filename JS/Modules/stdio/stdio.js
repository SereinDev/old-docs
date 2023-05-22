const { IO: { File, Directory, Path, SearchOption }, Text: { Encoding } } = System;
export function existFile(path) {
    return File.Exists(path);
}
export function appendTextToFile(path, content, encoding = Encoding.UTF8) {
    File.AppendAllText(path, content, encoding || Encoding.UTF8);
}
export function appendLinesToFile(path, content, encoding = Encoding.UTF8) {
    File.AppendAllLines(path, content, encoding || Encoding.UTF8);
}
export function copyFile(sourceFileName, destFileName, overwrite = false) {
    File.Copy(sourceFileName, destFileName, overwrite || false);
}
export function deleteFile(path) {
    File.Delete(path);
}
export function getFileCreationTime(path) {
    return File.GetCreationTime(path);
}
export function getFileLastAccessTime(path) {
    return File.GetLastAccessTime(path);
}
export function getFileLastWriteTime(path) {
    return File.GetLastWriteTime(path);
}
export function moveFile(sourceFileName, destFileName, overwrite = false) {
    File.Move(sourceFileName, destFileName, overwrite || false);
}
export function renameFile(sourceFileName, destFileName) {
    moveFile(sourceFileName, destFileName);
}
export function readAllLinesFromFile(path, encoding = Encoding.UTF8) {
    return File.ReadAllLines(path, encoding);
}
export function readAllTextFromFile(path, encoding = Encoding.UTF8) {
    return File.ReadAllText(path, encoding);
}
export function writeLinesToFile(path, content, encoding = Encoding.UTF8) {
    File.WriteAllLines(path, content, encoding || Encoding.UTF8);
}
export function writeAllTextToFile(path, contents, encoding = Encoding.UTF8) {
    File.WriteAllText(path, contents || null, encoding);
}
export function existDirectory(path) {
    return Directory.Exists(path);
}
;
export function createDirectory(path) {
    Directory.CreateDirectory(path);
}
export function deleteDirectory(path) {
    Directory.Delete(path, true);
}
export function moveDirectory(sourceDirName, destDirName) {
    Directory.Move(sourceDirName, destDirName);
}
export function getFiles(path, searchPattern, searchOption = SearchOption.AllDirectories) {
    if (searchPattern)
        return Directory.GetFiles(path, searchPattern, searchOption);
    else
        return Directory.GetFiles(path);
}
export function getDirectories(path, searchPattern, searchOption = SearchOption.AllDirectories) {
    if (searchPattern)
        return Directory.GetDirectories(path, searchPattern, searchOption);
    return Directory.GetDirectories(path);
}
export function existFileOrDirectory(path) {
    return Path.Exists(path);
}
export function getDirectoryName(path) {
    return Path.GetDirectoryName(path);
}
export function getFileName(path) {
    return Path.GetFileName(path);
}
export function getExtension(path) {
    return Path.GetExtension(path);
}
export function getFileNameWithoutExtension(path) {
    return Path.GetFileNameWithoutExtension(path);
}
export function getFullPath(path, basePath) {
    if (basePath)
        return Path.GetFullPath(path, basePath);
    return Path.GetFullPath(path);
}
