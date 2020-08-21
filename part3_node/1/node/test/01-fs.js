const fs = require('fs')   // filesystem  文件读写模块
const { promisify } = require('util')
const { CONNREFUSED } = require('dns')

// 同步读取
const data = fs.readFileSync('./conf.js')
console.log(data)
console.log(data.toString())


// 异步读取
fs.readFile('./conf.js', (err, data) => {
    if(err) throw err
    console.log('data', data.toString())
})


// promisify 方法可以把一个方法包装成一个Promise对象
const readFile = promisify(fs.readFile)

async function promReadFile() {
    const data = await readFile('./conf.js')
    console.log('data1', data.toString())
}

promReadFile()

process.nextTick(async () => {
    const data = await readFile('./conf.js')
    console.log('data2', data.toString())
})