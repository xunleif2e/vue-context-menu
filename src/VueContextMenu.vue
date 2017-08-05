<template>
  <div :style="style" v-show="show"
    @mousedown.stop
    @contextmenu.prevent
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'context-menu',
  data () {
    return {
      triggerShowFn: () => {},
      triggerHideFn: () => {},
      style: {},
      binded: false,
      bindedTarget: {}
    }
  },
  props: {
    target: null,
    show: Boolean
  },
  mounted () {
    this.bindedTarget = this.target instanceof HTMLBodyElement ?  this.target : this.$parent.$el;
    this.bindEvents()
  },
  watch: {
    show (show) {
      if (show) {
        this.bindHideEvents()
      } else {
        this.unbindHideEvents()
      }
    },
    target (target) {
      this.bindedTarget = this.target instanceof HTMLBodyElement ?  this.target : this.$parent.$el;
      this.bindEvents()
    }
  },
  methods: {
    // 初始化事件
    bindEvents () {
      this.$nextTick(() => {
        if (this.binded) return 
        this.triggerShowFn = this.contextMenuHandler.bind(this)
        this.bindedTarget.addEventListener('contextmenu', this.triggerShowFn)
        this.binded = true
      })
    },

    // 取消绑定事件
    unbindEvents () {
      this.bindedTarget.removeEventListener('contextmenu', this.triggerShowFn)
    },

    // 绑定隐藏菜单事件
    bindHideEvents () {
      this.triggerHideFn = this.clickDocumentHandler.bind(this)
      document.addEventListener('mousedown', this.triggerHideFn)
      document.addEventListener('mousewheel', this.triggerHideFn)
    },

    // 取消绑定隐藏菜单事件
    unbindHideEvents () {
      document.removeEventListener('mousedown', this.triggerHideFn)
      document.removeEventListener('mousewheel', this.triggerHideFn)
    },

    // 鼠标按压事件处理器
    clickDocumentHandler (e) {
      this.$emit('update:show', false)
    },

    // 右键事件事件处理
    contextMenuHandler (e) {
      this.layout(e.clientX, e.clientY)
      this.$emit('update:show', true)
      e.preventDefault()
    },

    // 布局
    layout (x, y) {
      this.style = {
        left: x + 'px',
        top: y + 'px'
      }
    }
  }
}
</script>
