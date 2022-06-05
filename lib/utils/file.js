import { existsSync, mkdirSync } from 'fs'
import { writeFile } from 'fs/promises'
import { dirname, resolve } from 'path'
import { renderFile } from 'ejs'

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
    // 在esm中没有__dirname，使用import.meta.url来获取文件在项目中的路径
    const templatePath = new URL(path, import.meta.url).pathname.slice(1)
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