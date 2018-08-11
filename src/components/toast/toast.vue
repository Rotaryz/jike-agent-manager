<template>
  <transition name="fade">
    <div class="toast" v-show="showToast">
      <div class="content">{{content}}</div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        showToast: false,
        content: 'carNumber error!'
      }
    },
    methods: {
      show(content, time) {
        this.content = content
        this.showToast = true
        const showTime = time || 1500
        setTimeout(() => {
          this.showToast = false
        }, showTime)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .toast
    position: absolute
    left: 50%
    transform: translateX(-50%)
    z-index: 9999
    top: 42%
    padding: 11.5px 23px
    border-radius: 100px
    background-color: rgba(71, 71, 71, 0.66)
    .content
      display: inline-block
      min-width :150px
      max-width :260px
      text-align: center
      font-family: PingFangSC-Regular
      line-height: 16px
      font-size: 14px
      color: #FFFFFF
</style>
