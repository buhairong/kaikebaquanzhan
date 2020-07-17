import Vue from 'vue'
import Notice from '@/components/Notice.vue';

// 实现一个create方法，能够创建指定组件实例
// 并将其挂载至body上
// Component是组件配置对象
function create(Component, props) {
  const Ctor = Vue.extend(Component)
  const comp = new Ctor({
    propsData: props
  })

  comp.$mount()
  document.body.appendChild(comp.$el)

  comp.remove = function() {
    document.body.removeChild(comp.$el)
    comp.$destroy()
  }

  return comp
}

export default function notice(props) {
  return create(Notice, props)
}