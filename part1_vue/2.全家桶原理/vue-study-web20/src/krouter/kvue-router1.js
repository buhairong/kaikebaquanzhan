import RouterView from './RouterView'

let Vue

class VueRouter {
    constructor(options) {
        this.options = options
        // 获取路由模式是 hash 还是 histroy  默认 hash
        let mode = this.options.mode || 'hash'

        // 创建一个路由映射表
        // this.routeMap = {}
        // this.options.routes.forEach(route => {
        //     this.routeMap[route.path] = route
        // })

        // 监听路由变化并响应
        // const initial = window.location.hash.slice(1) || '/'
        // Vue.util.defineReactive(this, 'current', initial)

        this.current = window.location.hash.slice(1) || '/'
        Vue.util.defineReactive(this, 'matched', [])
        // match 方法可以递归遍历路由表， 获得匹配关系数组
        this.match()


        if(mode === 'hash') {
            // 当路由模式为 hash 时，监听地址栏 hash 值变化
            window.addEventListener('hashchange', this.onHashChange.bind(this))
            window.addEventListener('load', this.onHashChange.bind(this))
       }else if(mode === 'history') {
            // 当路由模式为 histroy 时，监听地址栏 histroy 值变化
            window.addEventListener('popstate', this.onHistoryChange.bind(this))
        }

    }

    // hash 发生改变时
    onHashChange() {
        this.current = window.location.hash.slice(1) || '/'
        this.matched = []
        this.match()
    }

    // history 发生改变时
    onHistoryChange() {
        console.log('onHistoryChange', this.current)
        this.current = window.location.hash.slice(1)
        window.history.pushState("", "", this.current)
    }

    match(routes) {
        routes= routes || this.options.routes

        // 递归遍历
        for(const route of routes) {
            if(route.path === '/' && this.current === '/') {
                this.matched.push(route)
                return
            }

            // /about/info
            if(route.path !== '/' && this.current.indexOf(route.path) !== -1) {
                this.matched.push(route)
                console.log('children', route.children)
                if(route.children) {
                    this.match(route.children)
                }
                return
            }
        }
    }
}

VueRouter.install = function(_Vue) {
    Vue = _Vue

    // 用混入把 根实例 传入的 router 挂载到 Vue 原型上
    Vue.mixin({
        beforeCreate() {
            if(this.$options.router) {
                Vue.prototype.$router = this.$options.router
            }
        }
    })

    // 注册 router-link 组件
    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                default: ''
            }
        },
        render(h) {
            return h(
                'a',
                {
                    attrs: {
                        href: '#' + this.to
                    }
                },
                this.$slots.default
            )
        }
    })

    // 注册 router-view 组件
    /*
        嵌套路由思路实现
        1. router-view 深度标记
        2. 路由匹配时获取代表深度层级的matched数组
    */
    Vue.component('router-view', RouterView)
}

export default VueRouter