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
        const initial = window.location.hash.slice(1) || '/'
        Vue.util.defineReactive(this, 'current', initial)

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
        this.current = window.location.hash.slice(1) || '/'
    }

    // history 发生改变时
    onHistoryChange() {
        console.log('onHistoryChange', this.current)
        this.current = window.location.hash.slice(1)
        window.history.pushState("", "", this.current)
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
    Vue.component('router-view', {
        render(h) {
            // 标记当前 router-view 深度
            this.$vnode.data.routerView = true  // 标记自己是个 router-view

            let depth = 0
            let parent = this.$parent

            while(parent) {
                const vnodeData = parent.$vnode && parent.$vnode.data
                if(vnodeData && vnodeData.routerView) {
                    // 说明当前的 parent 是一个 router-view
                    depth++
                }

                parent = this.$parent
            }
            depth


            const {routeMap, current} = this.$router
            const component = routeMap[current] ? routeMap[current].component : null
            return h(component)
        }
    })
}

export default VueRouter