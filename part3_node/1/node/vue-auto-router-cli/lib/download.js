const { promisify } = require('util')

// repo: 下载地址  desc: 存放目录
module.exports.clone = async function(repo, desc) {
    const download = promisify(require('download-git-repo'))
    const ora = require('ora') // ora 状态标识
    const process = ora(`下载...${repo}`)
    process.start()
    await download(repo, desc)
    process.succeed()
}