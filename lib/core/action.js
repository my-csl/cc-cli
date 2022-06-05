import down from 'download-git-repo'
import { promisify } from 'util'
import { program } from 'commander'
import { blue, green } from '../utils/log.js'
import { spawnCommand, execCommand } from "../utils/terminal.js";
import { resolve } from 'path'
import { mkdirTreeSync, writeToFile, ejsCompile } from '../utils/file.js';

export const createAction = async (project) => {
    // const objectName = program.opts().dest
    blue('✨  Creating project in ' + resolve(project))
    blue('⚙️  Installing package. This might take a while...')
    // 如果添加分支，会创建.git文件进行git初始化，会很慢，原因未知
    // 如果clone的时候没有添加分支，然后clone的分支不是master的话就会去创建.git文件夹，并切换到对应的分支，但是因为还没提交过，切换分支的时候会报错
    // 还没有commit过切换分支会报错 https://blog.csdn.net/old_man31/article/details/86611959
    await promisify(down)('github:my-csl/vue2-template', project, { clone: true })
    const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
    await spawnCommand(npm, ['i'], { cwd: `./${project}` })
    console.log(`🎉  Successfully created project ${project}.`)
    console.log('👉  Get started with the following commands:')
    green(` $ cd ${project}`)
    green(' $ npm run serve')
    // await spawnCommand(npm, ['run', 'serve'], { cwd: `./${project}` })
    // await execCommand('npm i', {cwd: `./${project}`})
    // await execCommand('npm run serve', {cwd: `./${project}`})
}

export const addCptAction = async (name) => {
     // 创建目录
     const path = createDir(program.opts().dest || 'src/components', name)
    // 编译ejs模板创建组件
    const result = await ejsCompile('../template/component.vue.ejs', {name, lowerName: name.toLowerCase()})
    await writeToFile(resolve(path, `${name}.vue`), result)
}

export const addPageAction = async (name) => {
    // 创建目录
    const path = createDir(program.opts().dest || 'src/views', name)
    // 编译ejs模板创建页面和路由
    const resultPage = await ejsCompile('../template/page.vue.ejs', {name, lowerName: name.toLowerCase()})
    const resultRoute = await ejsCompile('../template/route.vue.ejs', {name, lowerName: name.toLowerCase()})
    await writeToFile(resolve(path, `${name}.vue`), resultPage)
    await writeToFile(resolve(path, `route.js`), resultRoute)
}

export const addStoreAction = async (name) => {
    // 创建目录
    const path = createDir(program.opts().dest || 'src/store')
    // 编译ejs模板创建store
    const result = await ejsCompile('../template/store.vue.ejs', {name, lowerName: name.toLowerCase()})
    await writeToFile(resolve(path, `${name}.js`), result)
}

function createDir(dest, name = '') {
    const path = resolve(dest, name.toLowerCase())
    // 创建目录
    mkdirTreeSync(path)
    return path
}