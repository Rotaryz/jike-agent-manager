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
      <div class="big-small text-mt">A. 总收入=账号销售收入+加盟推荐奖励+推荐团队分红+团队分销收入。</div>
      <div class="big-small text-mt-small">B. 账号销售收入：代理商在开单销售页录入客户购买账号的收入（客户购买金额）。</div>
      <div class="big-small text-mt-small"><span>C. 团队分销收入：自己分销团队成员分销收入，相关介绍请查看</span><span class="jump-color"><router-link class="jump-color" to="/explain-team">我的团队业务规则</router-link></span>。</div>
      <div class="big-small text-mt-small">D. 加盟推荐奖励：代理商推荐其他代理商加盟成功后, 平台给予推荐代理商的一次性奖励，根据代理商的等级不同，奖励金分为5000元/个，18000元/个，30000元/个3个等级。</div>
      <div class="big-small text-mt-small">E. 推荐团队分红：代理商推荐其他代理商加盟成功后, 除了加盟推荐奖励外，还享有被推荐代理商团队业绩的3%分红的长期奖励。</div>
      <div class="big-title title-mt-two">2. 收入占比</div>
      <div class="big-small text-mt">代理商账号销售收入、加盟推荐奖励、推荐团队分红、团队分销收入在总收入中的占比。</div>
      <div class="big-title title-mt-two">3. 核心数据指标</div>
      <div class="big-small text-mt">每日销售账号个数、推荐代理商个数、团队分销单数。这三个指标直接影响代理商收入中的4种类型收入。</div>
      <div class="big-title title-mt-two">4. 新增团队成员</div>
      <div class="big-small text-mt"><span>新增团队成员会影响团队分销单数，所以对于代理商也较为重要，我们提供了近30天的数据统计。新增团队成员的说明请查看</span><span class="jump-color"><router-link class="jump-color" to="/explain-team">我的团队业务说明</router-link></span>。</div>
      <div class="big-title title-mt-two">5. 环比</div>
      <div class="big-small text-mt">环比增长率=（本期数-上期数）/上期数*100%。</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'explain-trabe'
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
