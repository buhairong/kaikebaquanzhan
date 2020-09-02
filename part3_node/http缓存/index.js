const http = require('http')

function updateTime() {
    this.time = new Date().toUTCString()
    this.timmer = this.timmer || setInterval(() => this.time = new Date().toUTCString(), 1000)
    return this.time
}

http.createServer((req, res) => {
    const {url} = req
    if(url === '/') {
        res.end(`
            <html>
                Html updated Time ${updateTime()}
                <script src='main.js' />
            </html>
        `)
    }else if (url === '/main.js') {
        const content = `document.write('<br> JS Update Time: ${updateTime()}')`

        // 设置缓存过期时间为 10秒 HTTP1.0
        //res.setHeader('Expires', new Date(Date.now() + 10000).toUTCString())

        // 设置缓存过期时间为 20秒 HTTP1.1
        //res.setHeader('Cache-Control', 'max-age=20')


        // 协商缓存
        res.setHeader('Cache-Control', 'no-cache')
        //res.setHeader('last-modified', new Date().toUTCString()) // 记录最后缓存时间
        // 最后缓存时间10秒内，进入协商缓存
        // if(new Date(req.headers['if-modified-since']).getTime() + 10*1000 > Date.now()) {
        //     res.statusCode = 304
        //     res.end()
        //     return
        // }

        const crypto = require('crypto')
        // hex  将二进制编码转换成16进制字符串
        const hash = crypto.createHash('sha1').update(content).digest('hex')
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Etag', hash)
        if(req.headers['if-none-match'] === hash) {
            console.log('etag', hash)
            res.statusCode = 304
            res.end()
            return
        }


        res.statusCode = 200
       res.end(content)
    }else if (url === '/favicon.ico') {
        res.end('')
    }
})
.listen(3000, () => {
    console.log('server is start on 3000')
})