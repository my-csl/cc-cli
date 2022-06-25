import { existsSync, mkdirSync } from 'fs'
import { writeFile } from 'fs/promises'
import { dirname, resolve } from 'path'
import { renderFile } from 'ejs'
import { URL, fileURLToPath } from 'url'

export const mkdirTreeSync = (dir) => {
    if (existsSync(dir)) {
        return true
    } else {
        // 递归查询父类
        if (mkdirTreeSync(dirname(dir))) {
            mkdirSync(resolve(dir))
            return true
        }
    }
}

export const ejsCompile = (path, data) => {
    // fileURLToPath将file文件路径转换为特定平台的绝对路径字符串
    const templatePath = fileURLToPath(new URL(path, import.meta.url))
    return new Promise((resolve, reject) => {
        renderFile(templatePath, { data }, (err, str) => {
            if (err) {
                reject(err)
            }
            resolve(str)
        })
    })
}

export const writeToFile = (path, data) => {
    return writeFile(path, data)
}