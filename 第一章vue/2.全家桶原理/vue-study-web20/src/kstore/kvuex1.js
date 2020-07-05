let KVue

class Store {
    constructor(options) {
        this._vm = new KVue({
            // data 中的值都会做响应处理
            data: {
                $$state: options.state
            }
        })

        this._mutations = options.mutations
        this._actions = options.actions

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