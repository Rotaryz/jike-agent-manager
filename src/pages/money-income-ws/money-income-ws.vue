<template>
  <div class="money-wallet">
    <header class="header">
      <div class="money">{{grandTotal}}</div>
      <div class="explain">累计收入/元</div>
      <div class="pie-box pie-box-change echarts-pos" >
        <div id="myPie"></div>
      </div>
    </header>
    <div class="f3"></div>
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
              v-if="dataArray.length"
      >
        <ul class="content">
          <li class="item-wrapper border-bottom-1px" v-for="(item,index) in dataArray" :key="index">
            <div class="item one">
              <p class="left">{{item.title}}</p>
              <p class="right">{{item.total}}</p>
            </div>
            <div class="item two">
              <p class="left">【{{orderType['' + item.order_type]}}】</p>
            </div>
            <div class="item three">
              <p class="left">{{item.created_at}}</p>
              <p class="right">累计 <span class="em">{{item.after_total_income}}</span></p>
            </div>
          </li>
        </ul>
      </scroll>
      <empty-data v-else-if="showEmpty"></empty-data>
    </div>
    <select-com ref="selectCom" :data="selectTab" :idx="selectIdx" top="365px" @choose="choose"></select-com>
    <toast ref="toast"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import Toast from 'components/toast/toast'
  import SelectCom from 'components/select-com/select-com'
  import { Income } from 'api'
  import { ERR_OK } from 'common/js/config'
  import EmptyData from 'components/empty-data/empty-data'

  const selectTab = ['全部', '账号销售', '加盟推荐', '分销收入', '推荐分红']

  export default {
    name: 'MoneyWallet',
    components: {
      Toast,
      Scroll,
      SelectCom,
      EmptyData
    },
    data() {
      return {
        selectTab,
        grandTotal: '0.00',
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了',
        dataArray: [],
        page: 1,
        more: true,
        reqType: 0,
        selectIdx: 0,
        showEmpty: false
      }
    },
    mounted() {
    },
    created() {
      this._getRateTotal()
      this._getIncomeList({type: 0, page: 1}, res => {
        this.dataArray = res.data
        this._checkEmpty()
      })
    },
    methods: {
      _getRateTotal() {
        Income.getRateTotal().then(res => {
          if (res.error !== ERR_OK) {
            this.$refs.toast.show(res.message)
            return
          }
          this.grandTotal = res.data.grand_total
          this.drawPie(res)
        })
      },
      _checkEmpty() {
        this.showEmpty = !this.dataArray.length
      },
      drawPie(res) {
        let myChart = this.$echarts.init(document.getElementById('myPie'))
        // 我的收入占比
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: '{d}%'
          },
          color: ['#8B572A', '#C3A66C', '#716558', '#4A4A4A'],
          series: [
            {
              name: '',
              type: 'pie',
              radius: '45%',
              center: ['50%', '40%'],
              data: res.data.rate,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      },
      _getIncomeList(data, callback) {
        // 0=全部;1=账号销售;2=加盟推荐;3=分销收入;4=推荐分红;11提现
        Income.getIncomeList(data).then(res => {
          if (res.error !== ERR_OK) {
            this.$refs.toast.show(res.message)
            return
          }
          this.more = res.data.length === 10
          callback(res)
        })
      },
      showSelect() {
        this.$refs.selectCom.toggle()
      },
      choose(index) {
        if (index === this.selectIdx) return
        this.selectIdx = index
        // const selectTab = ['全部', '账号销售', '加盟推荐', '分销收入', '推荐分红', '提现']
        //  0=全部;1=账号销售;2=加盟推荐;3=分销收入;4=推荐分红;11提现
        switch (index) {
          case 0:
            this.reqType = 0
            break
          case 1:
            this.reqType = 1
            break
          case 2:
            this.reqType = 2
            break
          case 3:
            this.reqType = 3
            break
          case 4:
            this.reqType = 4
            break
          case 5:
            break
          default:
            break
        }
        this.page = 1
        this.more = true
        this._getIncomeList({type: this.reqType, page: this.page}, res => {
          this.dataArray = res.data
          this._checkEmpty()
          this._scrollTop()
        })
      },
      _scrollTop() {
        this.$refs.scroll && this.$refs.scroll.scrollTo(0, 0)
      },
      onPullingUp() {
        if (!this.more) return this.$refs.scroll.forceUpdate()
        // 更新数据
        console.info('pulling up and load data')
        this.page++
        this._getIncomeList({type: this.reqType, page: this.page}, res => {
          let arr = this.dataArray.concat(res.data)
          this.dataArray = arr
        })
      },
      rebuildScroll() {
        setTimeout(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        }, 30)
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
      },
      dataArray(current, prev) {
        this.pullUpLoad = current.length >= 10
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
        return {'1': '账号销售', '2': '加盟推荐', '3': '分销收入', '4': '推荐分红'}
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
  .money-wallet
    fill-box()
    background: $color-FFFFFF
    .header
      height: 310.5px
      .money
        color: $color-C3A66C
        font-family: $font-family-dinbold
        font-size: 45px
        text-align: center
        line-height: 34.5px
        text-shadow: 0 13px 13px rgba(195, 166, 108, 0.20)
        padding-top: 37px
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
    .select-wrapper
      position: relative
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
          font-family: $font-family-light
          width: 57px
          height: 22px
          border-1px($color-C3A66C, 25px)
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
      top: 370px
      left: 0
      right: 0
      bottom: 0
      .content
        padding-left: 15.5px
        font-family: $font-family-regular
        background: $color-FFFFFF
        .item-wrapper
          height: 94px
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
  .pie-box
    position: relative
    height: 305px
    border-bottom: 10px solid #eee
    box-sizing: border-box
    -moz-box-sizing: border-box
    -webkit-box-sizing: border-box
    #myPie
      width: 100%
      height: 285px
      margin: 0 auto
      padding: 20px
    #myLine
      width: 100%
      height: 300px
      margin: 0 auto
      padding: 0px 0px 0
      top: -5px
    #myAddLine
      width: 100%
      height: 300px
      margin: 20px auto
      padding: 35px 0px 0
    #myBar
      width: 100%
      height: 300px
      margin: 20px auto
      padding: 35px 20px 0
    #myDataBar
      width: 100%
      height: 280px
      margin: 0px auto
      top: -25px
      padding: 0 10px 0
    #myMember
      width: 100%
      height: 305px
      margin: 0px auto
      padding: 0 10px 0
    #myMemberMoney
      width: 100%
      height: 305px
      margin: 0px auto
      padding: 0 10px 0
    #mySuccess
      width: 100%
      height: 300px
      margin: 20px auto
      padding: 35px 20px 0
    .title-box
      position: absolute
      width: 100%
      text-align: center
      top: 15px
      left: 0
      .sub-title
        margin-top: 5px
        font-size: $font-size-12
        color: $color-343439
        font-family: $font-family-regular
    .bottom-des
      position: absolute
      bottom: 10px
      layout(row)
      width: 100%
      .tab
        layout(row)
        justify-content: center
        align-items: center
        width: 25%
        .icon
          background: #F9B43C
          width: 6px
          height: 6px
          border-radius: 50%
          margin-right: 3px
        .two
          background: #F9543C
        .thr
          background: #8E3C68
        .four
          background: #23799D
        .text
          font-size: $font-size-12
          font-family: $font-family-regular
          color: $color-text
    .pie-list
      layout(row)
      position: absolute
      width: 100%
      bottom: 15px
      left: 0
      .list
        flex: 1
        layout(row)
        align-items: center
        justify-content: center
        font-size: $font-size-12
        font-family: $font-family-medium
        color: $color-343439
        .icon
          background: #343439
          width: 7px
          height: 7px
          margin-right: 4px
        .two
          background: #C3A66C
        .thr
          background: #8B572A
        .four
          background: #F9B43C
        .text
          line-height: 1
          font-size: $font-size-small
          color: #202020
          font-family: $font-family-regular

    .my-pie-moeny
      font-size: $font-size-14
      color: $color-C3A66C
      font-family: $font-family-medium
      position: absolute
      width: 100%
      bottom: 10px
      left: 0
      text-align: center

  .pie-box-change
    height: 250px
</style>
