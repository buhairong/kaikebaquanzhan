const originRequest = require('request')
const iconv = require('iconv-lite')
const cheerio = require('cheerio')

function request(url, callback) {
    const option = {
        encoding: null
    }

    originRequest(url, option, callback)
}

for (let i = 100553; i < 100563; i++) {
    const url = `https://www.dy2018.com/i/${i}.html`
    
    request(url, function(err, res, body) {
        const html = iconv.decode(body, 'gb2312') // 将编码格式转换成 gb2312 要转码成要爬取的网站的编码格式
    
        const $ = cheerio.load(html)
        console.log($('.title_all h1').text())

    })
}