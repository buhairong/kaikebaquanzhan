const koa = require('koa')
const router = require('koa-router')()
const static = require('koa-static')
const app = new koa()
const axios = require('axios')
const querystring = require('querystring')

app.use(static(__dirname + '/'))

const config = {
    client_id: 'ccaf7ef2fe864f0071f9',
    client_secret: '91b2630321e971cea74a5d6a81ecef4b86f8de70'
}

router.get('/github/login', async ctx => {
    // 重定向到 github 服务器
    let path = `https://github.com/login/oauth/authorize?client_id=${config.client_id}`

    // 跳转 github 服务器
    ctx.redirect(path)
})

router.get('/auth/github/callback', async ctx => {
    const { code } = ctx.query
    console.log(code)

    const params = {
        ...config,
        code
    }

    let ret = await axios.post('https://github.com/login/oauth/access_token', params)
    let { access_token } = querystring.parse(ret.data)
    console.log(access_token)

    ret = await axios.get(`https://api.github.com/user?access_token=${access_token}`)
    console.log(ret.data)

    ctx.body = `
        <h1>hello, ${ret.data.login}</h1>
    `
})

app.use(router.routes())
app.listen(7001)