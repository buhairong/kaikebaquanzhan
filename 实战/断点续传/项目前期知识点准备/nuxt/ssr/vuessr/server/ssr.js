const express = require('express')

const app = express()

// 获取绝对地址
const resolve = dir => require('path').resolve(__dirname, dir)

// 静态文件服务
// 开放 dist/client 目录, 关闭默认的 index 页面打开功能
app.use(express.static(resolve('../dist/client'), {index: false}))

// 创建渲染器
const { createBundleRenderer } = require('vue-server-renderer')

// 参数1：服务端bundle
const bundle = resolve('../dist/server/vue-ssr-server-bundle.json')
const renderer = createBundleRenderer(bundle, {
    runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext
    template: require('fs').readFileSync(resolve("../public/index.html"), "utf-8"), // 宿主文件
    clientManifest: require(resolve("../dist/client/vue-ssr-client-manifest.json")) // 客户端清单
})

// 只做一件事，渲染
app.get('*', async (req, res) => {
    try{
        const context = {
            url: req.url
        }

        // 渲染  得到html字符串
        const html = await renderer.renderToString(context)

        res.send(html)
    }catch(err) {
        res.status(500).send('服务器内部错误')
    }
    
})

app.listen(3000, () => {
    console.log('服务启动')
})