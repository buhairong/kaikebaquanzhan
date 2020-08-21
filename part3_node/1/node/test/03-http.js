const http = require('http')
const fs = require('fs')

const server = http.createServer((request, response) => {
    //response.end('Hello 666')

    const { url, method, headers } = request
    console.log('url', url)
    console.log('method', method)
    console.log('headers', headers)
    if(url === '/' && method === 'GET') {
        fs.readFile('index.html', (err, data) => {
            if(err) {
                response.writeHead(500, {
                    'Content-Type': 'text/plain;charset=utf-8'
                })
                response.end('500 服务器错误')
                return
            }

            response.statusCode = 200
            response.setHeader('Content-Type', 'text/html')
            response.end(data)
        })
    }else if(url === '/users' && method === 'GET') {
        response.writeHead(200, {
            'Content-Type': 'application/json'
        })
        response.end(JSON.stringify({user: 'jack'}))
    }else if(method === 'GET' && headers.accept.includes('image/*')) {
        fs.createReadStream('.' + url).pipe(response)   // ./1.png
    }else {
        response.statusCode = 404
        response.setHeader('Content-Type', 'text/plain;charset=utf-8')
        response.end('404 找不到页面')
    }
})

server.listen(3000, () => {
    console.log('Server is start at 3000')
})  