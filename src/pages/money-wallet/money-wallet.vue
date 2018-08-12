<template>
  <div class="money-wallet">
    <div class="ad-wrapper">
      <div class="icon"></div>
      <div>账号销售收益不计于钱包，但会计入代理商收益记录。</div>
      <div class="arrow-right"></div>
    </div>
    <header class="header">
      <div class="money">289.00</div>
      <div class="explain">可提现金额/元</div>
      <div class="btn">提现</div>
    </header>
    <section class="select-wrapper">
      <div class="title">
        <div class="txt">收益明细</div>
        <div class="more">
          <div class="icon-m"></div>
          <div class="txt-m">筛选</div>
        </div>
      </div>
    </section>
    <ul class="content">
      <li class="item-wrapper">
        <div class="item one">
          <p class="left">团队成员续费正式版本奖励</p>
          <p class="right">+50</p>
        </div>
        <div class="item two">
          <p class="left">【分销收入】</p>
        </div>
        <div class="item three">
          <p class="left">2016-10-17 04:54</p>
          <p class="right">累计 <em class="em">43,450</em></p>
        </div>
      </li>
      <li class="item-wrapper">
        <div class="item one">
          <p class="left">团队成员续费正式版本奖励</p>
          <p class="right">+50</p>
        </div>
        <div class="item two">
          <p class="left">【分销收入】</p>
        </div>
        <div class="item three">
          <p class="left">2016-10-17 04:54</p>
          <p class="right">累计 <em class="em">43,450</em></p>
        </div>
      </li>
      <li class="item-wrapper">
        <div class="item one">
          <p class="left">团队成员续费正式版本奖励</p>
          <p class="right">+50</p>
        </div>
        <div class="item two">
          <p class="left">【分销收入】</p>
        </div>
        <div class="item three">
          <p class="left">2016-10-17 04:54</p>
          <p class="right">累计 <em class="em">43,450</em></p>
        </div>
      </li>
      <li class="item-wrapper">
        <div class="item one">
          <p class="left">团队成员续费正式版本奖励</p>
          <p class="right">+50</p>
        </div>
        <div class="item two">
          <p class="left">【分销收入】</p>
        </div>
        <div class="item three">
          <p class="left">2016-10-17 04:54</p>
          <p class="right">累计 <em class="em">43,450</em></p>
        </div>
      </li>
      <li class="item-wrapper">
        <div class="item one">
          <p class="left">团队成员续费正式版本奖励</p>
          <p class="right">+50</p>
        </div>
        <div class="item two">
          <p class="left">【分销收入】</p>
        </div>
        <div class="item three">
          <p class="left">2016-10-17 04:54</p>
          <p class="right">累计 <em class="em">43,450</em></p>
        </div>
      </li>
      <li class="item-wrapper">
        <div class="item one">
          <p class="left">团队成员续费正式版本奖励</p>
          <p class="right">+50</p>
        </div>
        <div class="item two">
          <p class="left">【分销收入】</p>
        </div>
        <div class="item three">
          <p class="left">2016-10-17 04:54</p>
          <p class="right">累计 <em class="em">43,450</em></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'MoneyWallet'
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

  .money-wallet
    fill-box()
    background: $color-FFFFFF
    .header
      position: fixed
      top: 0
      left: 0
      right: 0
      height: 266px
      z-index: 3
      layout()
      justify-content: center
      align-items: center
      background-image: linear-gradient(-180deg, #2D2C28 0%, #3D3834 100%)
      .money
        font-family: $font-family-bold
        font-size: 60px
        color: $color-C3A66C
        letter-spacing: 1px
        text-align: center
      .explain
        font-family: $font-family-regular
        font-size: $font-size-12
        color: $color-676052
        text-align: center
        margin: 1px 0 25.5px
      .btn
        width: 86px
        height: 30px
        border: 1px solid $color-C3A66C
        border-radius: 3px
        font-family: $font-family-regular
        font-size: $font-size-14
        color: $color-C3A66C
        text-align: center;
        line-height: 30px
    .select-wrapper
      position: fixed
      top: 266px
      left: 0
      right: 0
      height: 52.5px
      z-index: 3
      background: $color-FFFFFF
      .title
        layout(row)
        justify-content: space-between
        align-items: center
        padding: 16px 0 15.5px
        font-family: $font-family-regular
        .txt
          font-size: $font-size-16
          color: $color-343439
          padding-left: 15px
          position: relative
          &:before
            content: ''
            col-center()
            width: 3.5px
            height: 22px
            background: $color-C3A66C
            left: 0
        .more
          width: 57px
          height: 22px
          border: 1px solid $color-C3A66C
          border-radius: 25px
          font-size: 12px
          line-height: 1
          color: $color-C3A66C
          margin-right: 15px
          box-sizing: border-box
          layout(row, block, nowrap)
          justify-content: center
          align-items: center
          .icon-m
            width: 11px
            height: 11px
            icon-image(icon-screen_icon-mywallet)
            margin-right: 3px
    .content
      position: absolute
      top: 318.5px
      left: 0
      right: 0
      padding-left: 15.5px
      font-family: $font-family-regular
      .item-wrapper
        height: 94px
        border-bottom: 0.5px solid $color-E4E4E4
        padding-right: 15px
        .item
          layout(row, block, nowrap)
          justify-content: space-between
        .one
          font-size: $font-size-14
          color: $color-343439
          line-height: 1
          padding-top: 19.5px
          .right
            font-family: $font-family-bold
            font-size: $font-size-16
            color: $color-C3A66C
            line-height: 1
        .two
          font-size: $font-size-12
          color: $color-666666
          line-height: 1
          padding-top: 6px
          .left
            text-indent: -6px
        .three
          padding-top: 9.5px
          font-size: $font-size-12
          color: $color-C1C3C3
          line-height: 1
          .right > .em
            font-size: $font-size-14
            line-height: 12px

</style>
