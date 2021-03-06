const express = require('express')

const app = express()

const Vue = require('vue')

// 创建渲染器
const { createRenderer } = require('vue-server-renderer')

const renderer = createRenderer()

// 导入vue路由
const Router = require('vue-router')
Vue.use(Router)


// 路由
app.get('*', async (req, res) => {
    // 创建一个路由器实例
    const router = new Router({
        routes: [
            {path: '/', component: {template: '<div>Index</div>'}},
            {path: '/detail', component: {template: '<div>detail</div>'}},
        ]
    })

    // 构建渲染页面内容
    const vm = new Vue({
        router,
        data() {
            return {
                name: '村长真棒'
            }
        },
        template: `
            <div>
                <router-link to="/">index</router-link>
                <router-link to="/detail">detail</router-link>
                <div>{{name}}</div>
                <router-view></router-view>
            </div>            
        `
    })

    try{
        // 路由跳转
        router.push(req.url)

        // 渲染  得到html字符串
        const html = await renderer.renderToString(vm)

        res.send(html)
    }catch(err) {
        res.status(500).send('服务器内部错误')
    }
    
})

app.listen(3000, () => {
    console.log('服务启动')
})