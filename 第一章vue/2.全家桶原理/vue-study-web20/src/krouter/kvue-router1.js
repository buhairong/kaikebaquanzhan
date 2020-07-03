let Vue

class VueRouter {
    constructor(options) {
        this.options = options
        this.routeMap = {}

        // 获取路由模式是 hash 还是 histroy  默认 hash
        let mode = this.options.mode || 'hash'

        this.options.routes.forEach(route => {
            this.routeMap[route.path] = route
        })

        // 监听路由变化并响应
        Vue.util.defineReactive(this, 'current', '/')

        if(mode === 'hash') {
            // 当路由模式为 hash 时，监听地址栏 hash 值变化
            window.addEventListener('hashchange', this.onHashChange.bind(this))
        }else if(mode === 'history') {
            // 当路由模式为 histroy 时，监听地址栏 histroy 值变化
            window.addEventListener('popstate', this.onHistoryChange.bind(this))
        }

    }

    // hash 发生改变时
    onHashChange() {
        this.current = window.location.hash.slice(1)
    }

    // history 发生改变时
    onHistoryChange() {
        this.current = window.location.hash.slice(1)
        window.history.pushState("", "", this.current)
    }
}

VueRouter.install = function(_Vue) {
    Vue = _Vue

    // 用混入把 根实例 传入的 router 挂载到 Vue 原型上
    Vue.mixin({
        beforeCreate() {
            if(this.options.router) {
                Vue.prototype.$router = this.options.router
            }            
        }
    })

    // 注册 router-link 组件
    Vue.component('router-link', {

    })

    // 注册 router-view 组件
}

export default VueRouter