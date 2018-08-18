<template>
  <transition name="fade">
    <article class="mask-wrapper" v-show="isShow" @click="hide">
      <div class="content-wrapper" @click.stop>
        <div class="title">{{title}}</div>
        <div class="explain">{{content}}</div>
        <div class="btn" @click="confirm">{{confirmTxt}}</div>
      </div>
    </article>
  </transition>

</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        title: '',
        content: '',
        confirmTxt: '',
        isShow: false
      }
    },
    methods: {
      show(data) {
        this.title = data.title || '提示'
        this.content = data.content || ''
        this.confirmTxt = data.confirmTxt || ''
        this.isShow = true
      },
      hide() {
        this.isShow = false
      },
      confirm() {
        this.$emit('confirm')
        this.hide()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .mask-wrapper
    fill-box(fixed)
    background: $color-mask-bg
    transition: all 0.3s
    z-index: 99
    .content-wrapper
      width: 300px
      margin: 174px auto
      box-sizing: border-box
      background: #FFFFFF
      border-radius: 3px
      .title
        font-family: $font-family-medium
        font-size: $font-size-16
        color: $color-20202E
        letter-spacing: 0.8px
        text-align: center
        line-height: 1
        padding-top: 18px
      .explain
        font-family: $font-family-regular
        font-size: $font-size-14
        color: $color-343439
        line-height: 1.6
        padding 16px 22.5px 26px
      .btn
        display: block
        border: 0.5px solid rgba(32, 32, 46, 0.10)
        border-radius: 3px
        font-family: $font-family-regular
        font-size: $font-size-16
        color: $color-C3A66C
        letter-spacing: 0.69px
        text-align: center
        line-height: 45px
</style>
