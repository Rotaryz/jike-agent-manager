<template>
  <div class="money-wallet">
    <header class="header">
      <div class="money">341289</div>
      <div class="explain">累计收入/元</div>
      <ul class="data-wrapper">
        <li class="data-item">
          <div class="top">340</div>
          <div class="bottom">本日收入/元</div>
        </li>
        <li class="data-item">
          <div class="top">340</div>
          <div class="bottom">本周收入/元</div>
        </li>
        <li class="data-item">
          <div class="top">340</div>
          <div class="bottom">本月收入/元</div>
        </li>
      </ul>
    </header>
    <div class="f3"></div>
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
              <p class="right">累计 <em class="em">{{item.after_total_income}}</em></p>
            </div>
          </li>
        </ul>
      </scroll>
    </div>
    <toast ref="toast"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import Toast from 'components/toast/toast'
  import { Income } from 'api'
  import { ERR_OK } from 'common/js/config'

  export default {
    name: 'MoneyWallet',
    components: {
      Toast,
      Scroll
    },
    data() {
      return {
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了',
        dataArray: [],
        page: 1,
        more: true
      }
    },
    mounted() {
    },
    created() {
      this._getIncomeList({type: 0, page: 1}, res => {
        this.dataArray = res.data
        console.log(res.data)
      })
      this._getGrandTotal()
    },
    methods: {
      _getGrandTotal() {
        Income.getGrandTotal().then(res => {
          if (res.error !== ERR_OK) {
            this.$refs.toast.show(res.message)
            return
          }
          console.log(res)
        })
      },
      _getIncomeList(data, callback) {
        // 0=全部;2=加盟推荐;3=分销收入;4=推荐分红;11提现
        Income.getIncomeList(data).then(res => {
          if (res.error !== ERR_OK) {
            this.$refs.toast.show(res.message)
            return
          }
          this.more = !!res.data.length
          callback(res)
        })
      },
      onPullingUp() {
        if (!this.more) return this.$refs.scroll.forceUpdate()
        // 更新数据
        console.info('pulling up and load data')
        this.page++
        this._getIncomeList({type: 0, page: this.page}, res => {
          let arr = this.dataArray.concat(res.data)
          this.dataArray = arr
        })
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
          if (!this.more) return
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
      height: 205.5px
      layout()
      justify-content: center
      align-items: center
      .money
        color: $color-C3A66C
        font-family: $font-family-dinbold
        font-size: 45px
        text-align: center
        line-height: 34.5px
        text-shadow: 0 13px 13px rgba(195, 166, 108, 0.20)
        padding-top: 36px
      .explain
        font-family: $font-family-regular
        font-size: $font-size-12
        color: $color-343439
        text-align: center
        line-height: 1
        padding-top: 14px
      .data-wrapper
        margin-top: 36px
        height: 43px
        width: 100%
        font-family: $font-family-regular
        font-size: $font-size-12
        color: $color-666666
        text-align: center
        line-height: 1
        layout(row, block, nowrap)
        position: relative
        &:after
          content: ''
          width: 1px
          height: 100%
          col-center()
          left: 33.33%
          background: #C7BEBE
        &:before
          content: ''
          width: 1px
          height: 100%
          col-center()
          right: 33.33%
          background: #C7BEBE
        .data-item
          flex: 1
          height: 100%
          layout()
          justify-content: center
          align-items: center
          .top
            font-family: $font-family-dinbold
            font-size: $font-size-24
            color: #4A4A4A
            text-align: center
            padding-bottom: 4px
    .f3
      height: 7px
      background: $color-F3F3F3
    .scroll-list-wrap
      fill-box()
      position: absolute
      top: 212.5px
      left: 0
      right: 0
      bottom: 0
      background rebeccapurple
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
