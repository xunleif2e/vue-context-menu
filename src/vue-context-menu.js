/**
  * vue-context-menu
  * (c) 2017 赵兵
  * @license MIT
  */
const VueContextMenu = require('./VueContextMenu.vue')
const vueContextMenu = {}

/**
 * Plugin API
 */
vueContextMenu.install = function (Vue, options) {
  Vue.component(VueContextMenu.name, VueContextMenu)
}

vueContextMenu.component = VueContextMenu

/**
 * Auto install
 */
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vueContextMenu)
}

module.exports = vueContextMenu