<template>
  <div class="award-box">
    <div class="trade-bg"></div>
    <div class="award-con">
      <img src="./pic-banner_@2x.png" alt="" class="award-img">
      <div class="echarts-title mt-35">
        <div class="line"></div>
        <div class="text">推荐步骤</div>
      </div>
      <div class="info-box">
        <div class="info-list"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'agent-award'
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  *
    box-sizing: border-box
    -moz-box-sizing: border-box
    -webkit-box-sizing: border-box
  .trade-bg
    position: fixed
    width: 100%
    height: 100%
    left: 0
    top: 0
    z-index: 1
    background: #fff
  .award-con
    position: relative
    z-index: 2
  .award-img
    width: 100%
    display: block
  .echarts-title
    layout(row)
    align-items: center
    height: 22px
    .line
      background: $color-C3A66C
      height: 22px
      width: 3.5px
      margin-right: 13.5px
    .text
      font-size: $font-size-18
      color: $color-343439
      font-family: $font-family-bold

  .info-box
    layout(row)
  .mt-35
    margin-top: 35px
  .mt-50
    margin-top: 50px
  .wzz
    width: 100%

</style>
