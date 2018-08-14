<template>
  <div class="empty-data">
    <div class="img"></div>
    <div class="txt">{{content}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      content: {
        type: String,
        default: '暂还没有数据'
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .empty-data
    fill-box()
    layout()
    justify-content :center
    align-items :center
    .img
      width: 150px
      height: 150px
      icon-image(pic-nodata)
    .txt
      margin-top: 15px
      text-align: center
      font-family: $font-family-regular
      font-size: $font-size-14
      color: #A6A6A6
      letter-spacing: 0
</style>
