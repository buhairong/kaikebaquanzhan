/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  // ['component', 'filter', 'directive']
  ASSET_TYPES.forEach(type => {
    // Vue['component'] = function(id,definition){}
    Vue[type] = function (
      id: string,
      definition: Function | Object
    ): Function | Object | void {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        // Vue.component('comp', {data(){}})
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }
        // definition是对象, 是自定义组件配置选项
        if (type === 'component' && isPlainObject(definition)) {
          // 定义组件 name
          definition.name = definition.name || id
          // extend 创建组件构造函数，def变成了构造函数
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        // 注册 this.options[components][comp] = Ctor
        this.options[type + 's'][id] = definition
        return definition
      }
    }
  })
}
