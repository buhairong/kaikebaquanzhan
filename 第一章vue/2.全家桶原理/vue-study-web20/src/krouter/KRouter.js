// 路由入口

let Vue
class KRouter {
    static install(_Vue) {
        Vue = _Vue
        Vue.mixin({
            beforeCreate() {
                Vue.prototype.$router = this.$options.routes
            }
        })
    }

    constructor(options) {
        this.$options = options
    }
}



export default KRouter