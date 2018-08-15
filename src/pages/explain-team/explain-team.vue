<template>
  <div class="box">
    <div class="trade-bg"></div>
    <div class="tem-box">
      <div class="echarts-title">
        <div class="line"></div>
        <div class="text">宗旨</div>
      </div>
      <div class="big-small title-mt">代理商作为我们的合作伙伴，我们的宗旨是帮助我们的合作伙伴能赚钱，赚得到钱。</div>
      <div class="echarts-title box-mt">
        <div class="line"></div>
        <div class="text">我的团队成员</div>
      </div>
      <div class="big-small title-mt">代理商销售账号给企业，企业自动成为代理商的直属成员。企业的员工及其推荐的亲朋好友均为代理商团队的间接成员。</div>
      <div class="img-text">我的分销团队</div>
      <div class="img-box">
        <img src="./pic-myteamexplain_01@2x.png" alt="">
      </div>
      <div class="big-small mt-42">间接成员需要开通AI赞播微店，店铺开通后就可以推荐好友来开店。只要好友开店成功，则该好友又会自动成为代理商团队的间接成员。这样通过不断的分享裂变，代理商团队的间接成员会不断扩大，理论上来讲间接成员数是无限扩张的。</div>
      <div class="echarts-title box-title-mt">
        <div class="line"></div>
        <div class="text">我的收入分销</div>
      </div>
      <div class="samll-title">代理商的分销收入有两条途径：</div>
      <div class="big-small mt-10">第一，团队成员升级正式版本奖励：代理商间接成员推荐的好友开通店铺之后，有30天的试用期。在试用期内，该好友可以自费升级成为正式版本的店铺，升级费用为298元/单。根据赞播分销奖励政策规定，该好友的直接推荐人奖励100元/单，代理商奖励90元/单。</div>
      <div class="img-text">我的分销团队</div>
      <div class="img-box">
        <img src="./pic-myteamexplain_02@2x.png" alt="">
      </div>
      <div class="big-small mt-42">第二，团队成员续费正式版本奖励：第二年代理商团队间接成员正式版本均需要续费，续费费用为120元/年。代理等级为创业导师的代理商可以获得续费订单收入的10元奖励。代理等级为创业合伙人的代理商获得续费订单收入的20元奖励。代理等级为联合创始人的代理商获得续费订单收入的30元奖励。</div>
      <div class="img-text">团队成员续费正式版奖励</div>
      <div class="img-box">
        <img src="./pic-myteamexplain_03@2x.png" alt="">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'explain-team'
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  *
    box-sizing: border-box
    -moz-box-sizing: border-box
    -webkit-box-sizing: border-box
  .tem-box
    padding: 28px 0
    position: relative
    z-index: 2
  .title-mt
    margin-top: 20px
  .box-mt
    margin-top: 30px
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

  .big-small
    font-size: $font-size-14
    color: #666
    font-family: $font-family-regular
    line-height: 22px
    padding: 0 15px
    text-align: justify
  .img-text
    font-size: $font-size-14
    color: $color-343439
    font-family: $font-family-regular
    margin-top: 30px
    text-align: center
  .samll-title
    font-size: $font-size-14
    color: #464646
    font-family: $font-family-regular
    padding: 0 15px
    margin-top: 24px
  .img-box
    margin-top: 12.5px
    padding: 0 30px 0 21.5px
    img
      width: 100%
      display: block
  .mt-42
    margin-top: 42.5px
  .mt-10
    margin-top: 10px
  .box-title-mt
    margin-top: 45px
  .trade-bg
    position: fixed
    width: 100%
    height: 100%
    left: 0
    top: 0
    z-index: 1
    background: #fff

</style>
