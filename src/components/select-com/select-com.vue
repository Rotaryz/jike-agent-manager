<template>
  <div class="select-tab" :style="'top:'+ top" :class="isShow?'show':''">
    <ul class="select-container">
      <li class="item" :class="idx===index?'active':''" v-for="(item,index) in data" :key="index" @click="choose(index)">{{item}}</li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      data: {
        type: Array,
        default: []
      },
      top: {
        type: String,
        default: `0px`
      },
      idx: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        isShow: false
      }
    },
    methods: {
      show() {
        this.isShow = true
      },
      hide() {
        this.isShow = false
      },
      toggle() {
        this.isShow = !this.isShow
      },
      choose(index) {
        this.$emit('choose', index)
        this.hide()
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .select-tab
    z-index: 99
    opacity: 0
    transition: all 0.3s
    height: 0
    overflow: hidden
    position: fixed
    left: 15px
    right: 15px
    background: $color-FFFFFF
    border: 0.5px solid $color-E4E4E4
    box-shadow: 0 13px 13px 0 rgba(0, 0, 0, 0.05)
    border-radius: 3px
    &.show
      opacity: 1
      height: 100px
      overflow: visible
    &:after
      content: ''
      position: absolute
      width: 16px
      height: 8px
      top: -7.5px
      right: 15px
      icon-image(icon-Screening_Earnings)
    .select-container
      height: 100%
      width: 100%
      padding: 15px 0 16.5px 15px
      box-sizing: border-box
      font-family: $font-family-regular
      font-size: $font-size-14
      text-align: center
      line-height: 24.5px
      .item
        float: left
        height: 24.5px
        width: 69.5px
        border: 1px solid $color-E4E4E4
        border-radius: 3px
        color: $color-343439
        background: $color-FFFFFF
        box-sizing: border-box
        margin-bottom: 15px
        margin-right: 12px
        &.active
          color: $color-FFFFFF
          background : $color-C3A66C
</style>
