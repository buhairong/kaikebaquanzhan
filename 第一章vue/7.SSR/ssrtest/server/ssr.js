// 创建一个 express 实例
const express = require('express')

const app = express()

// 导入 vue
const Vue = require('vue')

// 创建渲染器
const {createRenderer} = require('vue-server-renderer')

const renderer = createRenderer()

// 路由
app.get('/', async (req, res) => {
    // 构建渲染页面内容
    const vm = new Vue({
        template:'<div>{{name}}</div>',
        data() {
            return {
                name: 'ssr page'
            }
        }
    })
    
    try {
        // 渲染：得到html字符串
        const html = await renderer.renderToString(vm)
        // 发送回前端
        res.send(html)
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Error:'+error)   
    }    
})

// 监听端口
app.listen(3000, function() {
    console.log('start')
})