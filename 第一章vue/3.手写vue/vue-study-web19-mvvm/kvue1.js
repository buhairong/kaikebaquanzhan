// 数据劫持响应
function defineReactive(obj, key, val) {
    // 递归，让每一层嵌套对象都做响应处理
    observe(val)

    // 每执行一次defineReactive，就会创建一次Dep实例
    const dep = new Dep()

    Object.defineProperty(obj, key, {
        get() {
            // 依赖收集
            Dep.target && dep.addDep(Dep.target)
            return val
        },

        set(newVal) {
            if(newVal !== val) {
                observe(newVal)
                val = newVal
                // 通知更新
                dep.notify()
            }
        }
    })
}

// 遍历初始数据，让对象里每一个数据都做拦截响应
function observe(obj) {
    if(typeof obj !== 'object' || obj === null) {
        return
    }

    new Observe(obj)
}

// 将 $data 中的key 代理到 KVue 的实例上
function proxy(vm) {
    Object.keys(vm.$data).forEach(key => {
        Object.defineProperty(vm, key, {
            get() {
                return vm.$data[key]
            },
            set(newVal) {
                vm.$data[key] = newVal
            }            
        })
    })
}

class KVue {
    constructor(options) {
        this.$options = options
        this.$data = options.data
        this.$el = options.el

        // 响应化处理
        observe(this.$data)

        // 代理
        proxy(this)

        new Compiler(this.$el, this)
    }    
}

// 每一个响应式对象，都伴生一个Observe实例
class Observe {
    constructor(value) {
        this.value = value

        // 判断 value 是对象还是数组
        this.walk(value)
    }

    walk(obj) {
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key])
        })
    }
}

// 编译过程
class Compiler {
    constructor(el, vm) {
        this.$vm = vm
        this.$el = document.querySelector(el)

        // 编译模板
        if(this.$el) {
            this.compile(this.$el)
        }
    }

    compile(el) {
        // 递归遍历 el        
        el.childNodes.forEach(node => {
            // 判断节点类型
            if(node.nodeType === 1) { // 节点是否为DON元素
                this.complieElement(node)
            }else if(node.nodeType === 3) { // 节点是否为文本并且是插值表达式 {{xxx}}
                let text = node.textContent   
                let reg = /\{\{\s*([^\s\{\}]+)\s*\}\}/g
                // 找到所有{{}}模板
                if (reg.test(node.textContent)) {
                    /*
                        解析{{}}模板，将键名替换成键值
                        replace回调函数参数 ...args，返回四个参数：
                        第一个是匹配到的字符串，
                        第二个是正则小括号里的内容，
                        第三个是匹配的字符串在原字符串中的索引，
                        第四个是原字符串
                    */
                    node.textContent = text.replace(reg, (...args) => {
                        this.update(node, args[1], 'text')
                        return this.$vm[args[1]]
                    })
                }             
            }

            if(node.childNodes){
                this.compile(node)
            }
        })
    }

    complieElement(node) {
        // 获取节点属性
        const nodeAttrs = node.attributes;
        [...nodeAttrs].forEach(attr => {
            // k-xxx="aaa"
            const attrName = attr.name   // k-xxx
            const exp = attr.value // aaa

            if(attrName.startsWith('k-')) { // 判断属性是否为指令
                const dir = attrName.substring(2)
                // 执行指令
                this[dir] && this[dir](node, exp)
            }
        })
    }

    // 文本指令
    text(node, exp) {
        //node.textContent = this.$vm[exp]
        this.update(node, exp, 'text')
    }

    // html指令
    html(node, exp) {
        //node.innerHTML = this.$vm[exp]
        this.update(node, exp, 'html')
    }

    // 所有动态绑定都需要创建更新函数以及对应watcher实例
    update(node, exp, dir) {
        // textUpdater()
        // 初始化
        const fn = this[dir + 'Updater']
        fn && fn(node, this.$vm[exp])

        // 更新
        new Watcher(this.$vm, exp, function(val) {
            fn && fn(node, val)
        })
    }

    htmlUpdater(node, value) {
        node.innerHTML = value
    }

    textUpdater(node, value) {
        node.textContent = value
    }
}

// Watcher 小秘书  界面中的一个依赖对应一个小秘书
class Watcher {
    constructor(vm, key, updateFn) {
        this.vm = vm
        this.key = key
        this.updateFn = updateFn

        // 读一次数据，触发 defineReactive 里的 get()
        Dep.target = this
        this.vm[this.key]
        Dep.target = null
    }

    // 管家调用
    update() {
        // 传入当前的最新值给更新函数
        this.updateFn.call(this.vm, this.vm[this.key])
    }
}

class Dep {
    constructor() {
        this.deps = []
    }

    addDep(watcher) {
        this.deps.push(watcher)
    }

    notify() {
        this.deps.forEach(watcher => watcher.update())
    }
}