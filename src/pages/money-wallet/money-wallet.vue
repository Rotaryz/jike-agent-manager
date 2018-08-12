<template>
  <div class="money-wallet">
    <header class="header">
      <div class="money">289.00</div>
      <div class="explain">可提现金额/元</div>
      <div class="btn">提现</div>
    </header>
    <section class="content"></section>
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

  .money-wallet
    fill-box(fixed)
    background: $color-FFFFFF
    .header
      height: 266px
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
</style>
