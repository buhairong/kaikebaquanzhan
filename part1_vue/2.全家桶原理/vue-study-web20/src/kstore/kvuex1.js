let KVue

class Store {
    constructor(options) {
        this._mutations = options.mutations
        this._actions = options.actions
        this._wrappedGetters = options.getters

        // 定义computed 选项
        const computed = {}
        this.getters = {}

        Object.keys(this._wrappedGetters).forEach(key => {
            // 获取用户定义的 getter
            const fn = this._wrappedGetters[key]
            // 转换为 computed 可以使用的 无参数形式
            computed[key] = () => {
                console.log('computed', this)
                return fn(this.state)
            }

            // 为getters定义只读属性
            Object.defineProperty(this.getters, key, {
                get: () => this._vm[key]
            })
        })

        this._vm = new KVue({
            // data 中的值都会做响应处理
            data: {
                $$state: options.state
            },
            computed
        })

        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)
    }

    get state() {
        return this._vm._data.$$state
    }

    commit(type, payload) {
        const entry = this._mutations[type]

        if(!entry) {
            console.log(type + '不存在')
            return
        }

        entry(this.state, payload)
    }

    dispatch(type, payload) {
        const entry = this._actions[type]

        if(!entry) {
            console.log(type + '不存在')
            return
        }

        entry(this, payload)
    }
}

function install(_Vue) {
    KVue = _Vue

    KVue.mixin({
        beforeCreate() {
            if(this.$options.store) {
                KVue.prototype.$store = this.$options.store
            }
        }
    })
}

export default { Store, install}