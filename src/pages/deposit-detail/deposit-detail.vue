<template>
  <div class="deposit-detail">
    <div class="f3"></div>
    <section class="info-wrapper" v-if="orderInfo">
      <div class="item-wrapper">
        <div class="left">支出金额</div>
        <div class="right">{{orderInfo.total}}</div>
      </div>
      <div class="item-wrapper">
        <div class="left">类型</div>
        <div class="right">{{orderInfo.type}}</div>
      </div>
      <div class="item-wrapper">
        <div class="left">时间</div>
        <div class="right">{{orderInfo.created_at}}</div>
      </div>
      <div class="item-wrapper">
        <div class="left">余额</div>
        <div class="right">{{orderInfo.after_remaining}}</div>
      </div>
      <div class="remark">
        <div class="left">备注</div>
        <div class="right">
          <div class="top">{{orderInfo.note}}</div>
          <div class="down">交易单据：{{orderInfo.withdraw_sn}}</div>
        </div>
      </div>
    </section>
    <toast ref="toast"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import Toast from 'components/toast/toast'
  import { Wallet } from 'api'
  import { ERR_OK } from 'common/js/config'

  export default {
    name: 'DepositDetail',
    components: {
      Toast
    },
    data() {
      return {
        orderInfo: null
      }
    },
    created() {
      let id = this.$route.query.id
      id = 123456 // todo
      this._getOrderDetail(id)
    },
    methods: {
      _getOrderDetail(id) {
        Wallet.getOrderDetail(id).then(res => {
          if (res.error !== ERR_OK) {
            this.$refs.toast.show(res.message)
            return
          }
          this.orderInfo = res.data
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .deposit-detail
    fill-box(fixed)
    background: #fff
    .f3
      height: 7px
      background: $color-F3F3F3
    .info-wrapper
      padding-left: 15px
      font-family: $font-family-regular
      .item-wrapper
        height: 60px
        border-bottom: 0.5px solid $color-E4E4E4
        line-height: 60px
        layout(row, block, nowrap)
        .left
          width: 83px
          font-size: $font-size-14
          color: $color-666666
        .right
          flex: 1
          font-size: $font-size-14
          color: $color-343439
          layout(row, block, nowrap)
          justify-content: flex-end
          margin-right: 15px
      .remark
        border-bottom: 0.5px solid $color-E4E4E4
        padding: 20.5px 0
        layout(row, block, nowrap)
        justify-content: space-between
        .left
          font-size: $font-size-14
          color: $color-666666
          padding-right: 5px
        .right
          flex: 1
          font-size: $font-size-14
          color: $color-343439
          line-height: 1.6
          layout(column, block, nowrap)
          align-items: flex-end
          margin-right: 15px
</style>
