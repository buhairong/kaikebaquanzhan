// 路由入口

let Vue
class KRouter {
    static install(_Vue) {
        Vue = _Vue
        Vue.mixin({
            beforeCreate() {
                Vue.prototype.$router = this.$options.routes

                if(this.$options.routes) {
                    // 这是入口
                    // 启动路由
                    this.$options.routes.init()
                }
            }
        })
    }

    constructor(options) {
        this.$options = options
        this.routeMap = {}

        // 使用Vue的响应式机制，路由切换的时候，做一些响应
        this.app = new Vue({
            data: {
                // url 默认根目录
                current: '/'
            }
        })
    }

    init() {
        // 启动整个路由
        // 由插件use负责启动

        // 1. 监听hashchange事件
        this.bindEvents()

        // 2. 处理路由表

        // 3. 初始化组件 router-view  router-link

        // 生命周期 路由守卫
    }

    bindEvents() {
        window.addEventListener('hashchange', this.onHashChange.bind(this), false)
    }

    onHashChange() {

    }
}



export default KRouter