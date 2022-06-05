import { program } from "commander";

export default () => {
    // <type> 是一个占位符，表示可以接收参数，可以不是type，<a>也是一样的，第三个是参数的默认值
    // 设置参数以后输入-d以后必须传入参数，要不然会报错
    program.option('-d, --dest <type>', 'a destination folder, 例如 -d src/views', '')

    program.on('--help', function () {
        console.log('')
        console.log('usage')
        console.log('   cc -V')
    })
}
