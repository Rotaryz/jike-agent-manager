<template>
  <router-link class="ad-wrapper" to="/money-income-ws">
    <div class="icon"></div>
    <div class="txt">账号销售收益不计于钱包，但会计入代理商收益记录。</div>
    <div class="arrow-right"></div>
  </router-link>
</template>

<script type="text/ecmascript-6">
  export default {
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .ad-wrapper
    position: fixed
    top: 0
    left: 0
    right: 0
    height: 34px
    z-index: 10
    layout(row, block, nowrap)
    align-items: center
    font-family: $font-family-regular
    font-size: 3.2vw
    color: $color-FFFFFF
    background: $color-C3A66C
    .icon
      width: 4.4vw
      height: @width
      margin: 0 2.4vw
      icon-image(icon-remind_mywallet)
    .arrow-right
      margin-right: 4vw
      width: 2.5vw
      height: @width
      icon-image(icon-arrow_home)
    .txt
      flex: 1
</style>
