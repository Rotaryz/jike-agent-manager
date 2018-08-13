<template>
  <div class="trabe-box">
    <div class="trade-bg"></div>
    <div class="explain-box">
      <div class="echarts-title">
        <div class="line"></div>
        <div class="text">收入统计说明</div>
      </div>
      <div class="big-title title-mt">1. 数据更新周期</div>
      <div class="big-small text-mt">A、代理商管理系统的所有数据在本日每小时更新一次。例如，8月1日0点、1点、2点...会定时进行更新。</div>
      <div class="big-small text-mt-small">B、生意数据概览的数据统计仅供参考，最终收入以收益明细的实际款项为准。</div>
      <div class="big-title title-mt-two">2. 数据查询范围</div>
      <div class="big-small text-mt">生意数据概览目前除总收入外，其他数据指标只保留了最近30天，未来根据代理商的实际业务需求，我们会逐步增加年、月、日及自定义时间查询。</div>
      <div class="echarts-title box-mt">
        <div class="line"></div>
        <div class="text">收入统计口径</div>
      </div>
      <div class="big-title title-mt">1. 我的收入</div>
      <div class="big-small text-mt">总收入=账号销售收入。代理商在开单销售页录入客户购买账号的收入（客户购买金额）。</div>
      <div class="big-small text-mt-small">B. 账号销售收入：代理商在开单销售页录入客户购买账号的收入（客户购买金额）。</div>
      <div class="big-title title-mt-two">2、我的账号销量</div>
      <div class="big-small text-mt">账号销量为代理商在开单销售页录入的客户购买账号的个数。</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'ai-explain'
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

  .big-title
    padding: 0 15px
    font-family: $font-family-bold
    color: #464646
    font-size: $font-size-16
  .big-small
    font-size: $font-size-14
    color: #666
    font-family: $font-family-regular
    line-height: 22px
    padding: 0 15px
    text-align: justify
  .title-mt
    margin-top: 26px
  .title-mt-two
    margin-top: 23px
  .text-mt
    margin-top: 11.5px
  .text-mt-small
    margin-top: 6px
  .jump-color
    color: $color-C3A66C
    border-bottom: 1px solid $color-C3A66C
  .box-mt
    margin-top: 45px
  .explain-box
    position: relative
    z-index: 2
    padding-top: 30px
    padding-bottom: 42px

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

</style>
