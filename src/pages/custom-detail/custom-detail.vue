<template>
  <div class="custom-detail">
    <header class="header">
      <h3 class="company" @click="jump(company)">
        {{company}}
        <i class="icon"></i>
      </h3>
      <p class="call">15521114385</p>
    </header>
    <section class="dataMain">
      <div class="topMain">
        <div class="topData">
          <div class="money">
            <p class="count">{{topData.money}}</p>
            总交易额/元
          </div>
          <div class="buyCount">
            <p class="count">{{topData.buyCount}}</p>
            购买个数/个
          </div>
          <div class="openCount">
            <p class="count">{{topData.openCount}}</p>
            开通个数/个
          </div>
        </div>
      </div>
      <div class="list">
        <h3>AI微店购买记录</h3>
        <div class="tab">
          <p class="custom">日期</p>
          <p class="money">购买个数/个</p>
          <p class="percent">交易额/元</p>
        </div>
      </div>
    </section>
    <footer class="bot-btn">
      <a href="/manage-custom/custom-create" class="btn">新建客户</a>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'custom-detail',
    props: {
    },
    data() {
      return {
        company: '国颐堂美发有限公司',
        topData: {
          money: 200,
          buyCount: 4,
          openCount: 2
        },
        mag: []
      }
    },
    created() {
    },
    mounted() {
    },
    computed: {
    },
    methods: {
      jump(name) {
        this.$router.push({path: '/custom-create', query: { name }})
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .header
    height: 140px
    background: linear-gradient(180deg, #2D2C28 0%, #3D3834 100%);
    color: $color-C3A66C
    font-size: $font-size-16
    line-height: $font-size-16
    text-align: center
    padding-top: 25px
    box-sizing: border-box
    .company
      display: flex
      justify-content: center
      align-items: center
    .icon
      bg-image('./icon-arrow_customer')
      width: 16px
      height: 16px
      background-size:100% 100%
      background-repeat: no-repeat
      display: inline-block
      margin-left: 2px
    .call
      font-size: $font-size-16
      color: #766B55
      margin-top: 8px
  .dataMain
    background: $color-white
    position: relative
    .topMain
      position: absolute
      top: -50px
      width: 100%
      padding: 0 15px
      box-sizing: border-box
      .topData
        height: 50px
        background: $color-white;
        box-shadow: 0 13px 13px 0 rgba(0,0,0,0.05);
        border-radius: 4px;
        display: flex
        justify-content: space-around
        align-items: center
        padding: 25px 0
        text-align: center
        font-size: $font-size-12
        color: #343439
        .count
          color: $color-C3A66C
          font-size: $font-size-24
          margin-bottom: 10px

  .list
    background

  .bot-btn
    position: fixed
    bottom: 0
    left: 0
    width: 100%;
    background: $color-white
    padding: 10px 15px
    box-sizing: border-box
    border-top-1px(#e3e3e3)
    height: 65px
  .btn
    background: $color-C3A66C
    font-size: $font-size-16
    color: #FFFFFF
    text-align: center
    border-radius: 4px
    height: 45px
    line-height: 45px
    display: block
</style>
