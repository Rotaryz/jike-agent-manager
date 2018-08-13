<template>
  <div class="money-wallet">
    <header class="header">
      <div class="money">{{balance}}</div>
      <div class="explain">可提现金额/元</div>
      <div class="btn" @click="deposit">提现</div>
    </header>
    <section class="select-wrapper">
      <div class="title">
        <div class="txt">收益明细</div>
        <div class="more">
          <div class="icon-m"></div>
          <div class="txt-m" @click="showSelect">筛选</div>
        </div>
      </div>
    </section>
    <div class="scroll-list-wrap">
      <scroll ref="scroll"
              bcColor="#fff"
              :data="dataArray"
              :pullUpLoad="pullUpLoadObj"
              @pullingUp="onPullingUp"
      >
        <ul class="content" v-if="dataArray.length">
          <li class="item-wrapper" @click="toDetailPage(item)" v-for="(item,index) in dataArray" :key="index">
            <div class="item one">
              <p class="left">{{item.title}}</p>
              <p class="right">+{{item.total}}</p>
            </div>
            <div class="item two">
              <p class="left">【{{orderType['' + item.order_type]}}】</p>
            </div>
            <div class="item three">
              <p class="left">{{item.created_at}}</p>
              <p class="right">累计 <em class="em">{{item.after_remaining}}</em></p>
            </div>
          </li>
          <!--<li class="item-wrapper">-->
          <!--<div class="item one">-->
          <!--<p class="left">团队成员续费正式版本奖励</p>-->
          <!--<p class="right">+50</p>-->
          <!--</div>-->
          <!--<div class="item two">-->
          <!--<p class="left">【分销收入】</p>-->
          <!--</div>-->
          <!--<div class="item three">-->
          <!--<p class="left">2016-10-17 04:54</p>-->
          <!--<p class="right">累计 <em class="em">43,450</em></p>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="item-wrapper">-->
          <!--<div class="item one">-->
          <!--<p class="left">团队成员续费正式版本奖励</p>-->
          <!--<p class="right">+50</p>-->
          <!--</div>-->
          <!--<div class="item two">-->
          <!--<p class="left">【分销收入】</p>-->
          <!--</div>-->
          <!--<div class="item three">-->
          <!--<p class="left">2016-10-17 04:54</p>-->
          <!--<p class="right">累计 <em class="em">43,450</em></p>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="item-wrapper">-->
          <!--<div class="item one">-->
          <!--<p class="left">团队成员续费正式版本奖励</p>-->
          <!--<p class="right">+50</p>-->
          <!--</div>-->
          <!--<div class="item two">-->
          <!--<p class="left">【分销收入】</p>-->
          <!--</div>-->
          <!--<div class="item three">-->
          <!--<p class="left">2016-10-17 04:54</p>-->
          <!--<p class="right">累计 <em class="em">43,450</em></p>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="item-wrapper">-->
          <!--<div class="item one">-->
          <!--<p class="left">团队成员续费正式版本奖励</p>-->
          <!--<p class="right">+50</p>-->
          <!--</div>-->
          <!--<div class="item two">-->
          <!--<p class="left">【分销收入】</p>-->
          <!--</div>-->
          <!--<div class="item three">-->
          <!--<p class="left">2016-10-17 04:54</p>-->
          <!--<p class="right">累计 <em class="em">43,450</em></p>-->
          <!--</div>-->
          <!--</li>-->
          <!--<li class="item-wrapper">-->
          <!--<div class="item one">-->
          <!--<p class="left">团队成员续费正式版本奖励</p>-->
          <!--<p class="right">+50</p>-->
          <!--</div>-->
          <!--<div class="item two">-->
          <!--<p class="left">【分销收入】</p>-->
          <!--</div>-->
          <!--<div class="item three">-->
          <!--<p class="left">2016-10-17 04:54</p>-->
          <!--<p class="right">累计 <em class="em">43,450</em></p>-->
          <!--</div>-->
          <!--</li>-->
        </ul>
      </scroll>
    </div>
    <wallet-ad></wallet-ad>
    <select-com ref="selectCom" :data="selectTab" top="318.5px"></select-com>
    <toast ref="toast"></toast>
    <confirm-msg ref="confirmMsg"></confirm-msg>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import Toast from 'components/toast/toast'
  import ConfirmMsg from 'components/confirm-msg/confirm-msg'
  import SelectCom from 'components/select-com/select-com'
  import WalletAd from 'components/wallet-ad/wallet-ad'
  import { Wallet } from 'api'
  import { ERR_OK } from 'common/js/config'

  const selectTab = ['全部', '提现', '加盟推荐', '分销收入', '推荐分红']
  // 0=全部;2=加盟推荐;3=分销收入;4=推荐分红;11提现

  export default {
    name: 'MoneyWallet',
    components: {
      Toast,
      Scroll,
      ConfirmMsg,
      SelectCom,
      WalletAd
    },
    data() {
      return {
        selectTab,
        server: 'jzxxxm',
        balance: '0.00',
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了',
        dataArray: [],
        page: 1
      }
    },
    mounted() {
    },
    created() {
      this._getAgentMoney()
      this._getPayList({type: 0, page: 1})
    },
    methods: {
      _getAgentMoney() {
        Wallet.getAgentMoney().then(res => {
          if (res.error !== ERR_OK) {
            this.$refs.toast.show(res.message)
            return
          }
          this.balance = res.data.remaining
        })
      },
      _getPayList(data) {
        // 0=全部;2=加盟推荐;3=分销收入;4=推荐分红;11提现
        Wallet.getPayList(data).then(res => {
          if (res.error !== ERR_OK) {
            this.$refs.toast.show(res.message)
            return
          }
          console.log(res)
          this.dataArray = res.data
        })
      },
      deposit() {
        const content = `可提现余额为${this.balance}元，暂时只支持线下提现转账，如果需要提现请联系官方微信客服“赞播小妹”：${this.server}。`
        const confirmTxt = `好的`
        this.$refs.confirmMsg.show({content, confirmTxt})
      },
      showSelect() {
        this.$refs.selectCom.toggle()
      },
      toDetailPage(item) {
        const path = '/deposit-detail'
        const id = item.order_sn
        this.$router.push({path, query: {id}})
      },
      onPullingUp() {
        // 更新数据
        console.info('pulling up and load data')
        setTimeout(() => {
          this.$refs.scroll.forceUpdate()
        }, 1500)
      },
      rebuildScroll() {
        this.nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      }
    },
    watch: {
      pullUpLoadObj: {
        handler() {
          if (!this.pullUpLoad) return // 防止下拉报错
          this.rebuildScroll()
        },
        deep: true
      }
    },
    computed: {
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      },
      // 类型1=账号销售;2=加盟推荐;3=分销收入;4=推荐分红;11提现
      orderType() {
        return {'1': '账号销售', '2': '加盟推荐', '3': '分销收入', '4': '推荐分红', '11': '提现'}
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

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
        text-align: center
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
    .scroll-list-wrap
      position: absolute
      top: 318.5px
      left: 0
      right: 0
      bottom: 0
      touch-action: none
      .content
        padding-left: 15.5px
        font-family: $font-family-regular
        background: $color-FFFFFF
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
