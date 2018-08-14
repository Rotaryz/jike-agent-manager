<template>
  <div class="award-box">
    <div class="trade-bg"></div>
    <div class="award-con">
      <img src="./pic-banner_@2x.png" alt="" class="award-img">
      <div class="echarts-title mt-35">
        <div class="line"></div>
        <div class="text">推荐步骤</div>
      </div>
      <div class="top-box">
        <img src="./top01.png" alt="" class="top-box-img">
      </div>
      <div class="echarts-title mt-35">
        <div class="line"></div>
        <div class="text">奖励标准</div>
      </div>
      <div class="top-box">
        <div class="top-title">
          <div class="text">1.加盟推荐奖励</div>
          <img src="./top04.png" alt="" class="text-img">
        </div>
        <img src="./top02.png" alt="" class="top-box-img">
        <div class="top-title top-title-mt">
          <div class="text">2.推荐团队分红</div>
          <img src="./top03.png" alt="" class="text-img">
        </div>
        <div class="main-text"><span>享受被推荐人团队业绩的</span><span class="color-text">3%</span><span>，其成员开单后，立马到账9元/单！</span></div>
      </div>
      <div class="echarts-title mt-35">
        <div class="line"></div>
        <div class="text">日常答疑</div>
      </div>
      <div class="question-box">
        <div class="question-con">
          <div class="title">Q: 推荐资格有限制时间吗？</div>
          <div class="text">目前推荐资格均和代理商身份是绑定的，代理商的身份是长期有效的，所以推荐资格也是长期有效的。</div>
          <div class="title mt-15">Q: 为了拿到更多的推荐奖励，我想升级代理商等级怎么办？</div>
          <div class="text">升级代理商等级可以直接拨打赞播招商热线4</div>
          <div class="phone" @click="phoneCall">{{mobile}}</div>
        </div>
      </div>
      <div class="jump-btn">
        <router-link class="btn" to="/agent-entering">推荐代理商加盟</router-link>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'agent-award',
    data() {
      return {
        mobile: '400-8871-855'
      }
    },
    methods: {
      phoneCall() {
        window.location.href = `tel:${this.mobile}`
      }
    }
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
  .mt-15
    margin-top: 15px
  .mt-50
    margin-top: 50px
  .top-box
    margin-top: 35px
    padding: 0 21px 0 15px
    .top-box-img
      width: 100%
      display: block
    .top-title
      layout(row)
      align-items: center
      margin-bottom: 15px
      .text
        font-size: $font-size-14
        color: $color-343439
        font-family: $font-family-medium
        margin-right: 5px
      .text-img
        width: 65px
        display: block
  .top-title-mt
    margin-top: 20px
  .main-text
    font-size: $font-size-14
    color: $color-666
    font-family: $font-family-regular
    line-height: 22px
    .color-text
      color: $color-C3A66C
  .question-box
    padding: 25px 15px 100px
  .question-con
    background: #f8f8f8
    padding: 20px 15px
    .title
      font-size: $font-size-14
      color: $color-343439
      font-family: $font-family-medium
      margin-bottom: 5px
    .text
      font-size: $font-size-14
      color: $color-666666
      font-family: $font-family-light
      line-height: 22px
    .phone
      font-size: $font-size-14
      color: #4A90E2
      font-family: $font-family-light
      border-bottom: 0.5px solid #4A90E2
      display: inline-block
      margin-top: 10px
  .jump-btn
    height: 65px
    position: fixed
    bottom: 0
    background: $color-FFFFFF
    width: 100%
    left: 0
    border-top: 1px solid #eee
    padding: 10px 15px
    .btn
      color: $color-FFFFFF
      background: #C3A66C
      border-radius: 6px
      width: 100%
      text-align: center
      height: 45px
      display: block
      line-height: 45px
      font-size: $font-size-16
      font-family: $font-family-regular
  .wzz
    width: 100%

</style>
