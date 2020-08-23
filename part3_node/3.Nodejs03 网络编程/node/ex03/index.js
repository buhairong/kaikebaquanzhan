const fs = require('fs')

// 二分查找
module.exports.parser = path => {
    const readStream = fs.createReadStream(path)
    let reqData = [];
    let size = 0;
    return new Promise(resolve => {
        readStream.on('data', data => {
            reqData.push(data)
            size+=data.length
        })

        readStream.on('end', () => {
            const data = Buffer.concat(reqData, size)
            const json = JSON.parse(data.toString())
            resolve(json)
        })
    })
}
