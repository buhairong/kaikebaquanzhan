const { promisify } = require('util')
const figlet = promisify(require('figlet')) // 打印大的文字
const clear = require('clear')
const chalk = require('chalk')

const log = content => console.log(chalk.green(content))
const { clone } = require('./download')


// 子进程流与主进程流对接
const spawn = async (...args) => {
    const { spawn } = require('child_process')
    return new Promise(resolve => {
        const proc = spawn(...args)

        // 正常数据流
        proc.stdout.pipe(process.stdout)

        // 异常数据流
        proc.stderr.pipe(process.stderr)

        proc.on('close', () => {
            resolve()
        })
    })
}



module.exports = async name => {
    // 打印欢迎界面
    clear()
    const data = await figlet('KKB Welcome')
    log(data)

    log(`创建项目：${name}`)
    // 初始化
    await clone('github:su37josephxia/vue-template', name)

    // 安装依赖
    log('安装依赖...')
    await spawn('cmd',['/c', 'npm'], ['install'], {cwd: `./${name}`})
    log(chalk.green(`
        安装完成：
        To get Start:
        ===========================
          cd ${name}
          npm run serve
        ===========================
        启动项目        
      `))

    // 打开浏览器
    const open = require('open')
    open('http://localhost:8080')

    await spawn('cmd',['/c', 'npm'], ['run', 'serve'], {cwd: `./${name}`})
}