<template>
  <div class="home">
    <header class="header" v-if="isWD">
      <h3 class="company">{{userInfo?userInfo.company_name:''}}</h3>
      <h4 class="position" :class="(userInfo && userInfo.role_name)? '': 'hide'">{{userInfo?userInfo.role_name:''}}</h4>
      <div class="money">{{userInfo?userInfo.real_income:0}}</div>
      <div class="explain">今日实际收入</div>
      <ul class="data-wrapper">
        <li class="data-item">
          <div class="top">{{userInfo?userInfo.account_sale:0}}</div>
          <div class="bottom">账号销售/个</div>
        </li>
        <li class="data-item">
          <div class="top">{{userInfo?userInfo.invite_join:0}}</div>
          <div class="bottom">推荐加盟/人</div>
        </li>
        <li class="data-item">
          <div class="top">{{userInfo?userInfo.sale_count:0}}</div>
          <div class="bottom">分销单数/单</div>
        </li>
      </ul>
      <router-link to="/account" class="account">
        <div class="icon-a"></div>
      </router-link>
    </header>
    <header class="header zt" v-else>
      <h3 class="company">{{userInfo?userInfo.company_name:''}}</h3>
      <h4 class="position">{{userInfo?userInfo.role_name:''}}</h4>
      <ul class="data-wrapper zt">
        <li class="data-item">
          <div class="top zt">{{userInfo?userInfo.real_income:0}}</div>
          <div class="bottom">今日收入/元</div>
        </li>
        <li class="data-item">
          <div class="top zt">{{userInfo?userInfo.account_sale:0}}</div>
          <div class="bottom">今日销量/个</div>
        </li>
      </ul>
      <router-link to="/account" class="account">
        <div class="icon-a"></div>
      </router-link>
    </header>
    <section class="content">
      <div class="tab-container">
        <div class="tab-line-wrapper" :style="'transform :translate3d('+ tabIndex*100 +'%,0,0)'">
          <div class="tab-line"></div>
        </div>
        <ul class="tab-wrapper border-bottom-1px">
          <li class="tab-item" :class="tabIndex===index?'active':''"
              v-for="(item,index) in tabInfo"
              :key="index"
              @click="changeTab(index)">
            {{item}}
          </li>
        </ul>
      </div>
      <ul class="entry-wrapper" :style="'transform :translate3d('+ -tabIndex*100/3 +'%,0,0)'">
        <li class="entry-item one">
          <router-link class="item" to="/sell-belling">
            <div class="icon open-home"></div>
            <p class="txt">开单销售</p>
          </router-link>
          <router-link class="item" to="/sell-record">
            <div class="icon record-home"></div>
            <p class="txt">销售记录</p>
          </router-link>
        </li>
        <li class="entry-item two">
          <router-link class="item" to="/manage-custom">
            <div class="icon customer-home"></div>
            <p class="txt">客户管理</p>
          </router-link>
          <router-link class="item" v-if="isWD" to="/manage-agent">
            <div class="icon agent-home"></div>
            <p class="txt">推荐代理商</p>
          </router-link>
          <router-link class="item" v-if="isWD" to="/my-team">
            <div class="icon my-team"></div>
            <p class="txt">我的团队</p>
          </router-link>
        </li>
        <li class="entry-item three">
          <router-link class="item" :to="isWD?'/money-income-ws':'/money-income-zt'">
            <div class="icon profit-details"></div>
            <p class="txt">收益明细</p>
          </router-link>
          <router-link class="item" to="/money-wallet" v-if="isWD">
            <div class="icon my-wallet"></div>
            <p class="txt">我的钱包</p>
          </router-link>
        </li>
      </ul>
    </section>
    <div class="f3"></div>
    <section class="charts">
      <div class="title">
        <div class="txt">生意概览</div>
        <router-link class="more" :to="isWD?'/trade-view':'/ai-trade'">更多</router-link>
      </div>
      <article class="charts-container">
        <div class="pie-box line-box">
          <div id="myHomeLine"></div>
          <div class="title-box">
            <div class="sub-title">我的收入</div>
          </div>
        </div>
      </article>
    </section>
    <toast ref="toast"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Home, Trade } from 'api'
  import storage from 'storage-controller'
  import Toast from 'components/toast/toast'
  import { ERR_OK } from 'common/js/config'
  import { PROJECT_ARR, WEI_SHANG } from 'common/js/constant'
  import { cityData } from 'common/js/utils'
  import { mapGetters, mapActions } from 'vuex'

  const tabInfo = ['管账号', '管人', '管钱']

  export default {
    name: 'Home',
    components: {
      Toast
    },
    data() {
      return {
        tabInfo,
        cityData,
        tabIndex: 0,
        userInfo: null,
        isWD: true
      }
    },
    created() {
      if (!storage.has('token')) return
      this.tabIndex = this.homeTabIdx
      this._getProject()
      this._getHomeInfo()
      this.getMyIncomeData(2)
    },
    beforeDestroy() {
      this.updateHomeTab(this.tabIndex)
    },
    methods: {
      ...mapActions(['updateHomeTab']),
      getMyIncomeData(time) {
        Trade.getMyIncome({time_type: time}).then(res => {
          if (res.error === ERR_OK) {
            this.incomeData = res.data
            this.drawLine()
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      drawLine() {
        let myChart = this.$echarts.init(document.getElementById('myHomeLine'))
        // 我的收入
        myChart.setOption({
          grid: {
            left: '3%',
            right: '4%',
            bottom: '5%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.incomeData.x,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#E6E6E6',
                width: 0.5
              }
            },
            axisLabel: {
              color: '#343439',
              align: 'right'
            },
            axisTick: {
              lineStyle: {
                color: '#c4c4c4',
                width: 0.5
              }
            },
            axisLine: {
              lineStyle: {
                color: '#c4c4c4',
                width: 0.5
              }
            }
          },
          tooltip: {
            trigger: 'axis',
            formatter: '收入：{c}',
            axisPointer: {
              type: 'none'
            }
          },
          yAxis: {
            minInterval: 1,
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                color: '#E6E6E6',
                width: 0.5
              }
            },
            axisTick: {
              lineStyle: {
                color: '#c4c4c4',
                width: 0.5
              }
            },
            axisLabel: {
              formatter: '{value}',
              color: '#343439'
            },
            axisLine: {
              lineStyle: {
                color: '#c4c4c4',
                width: 0.5
              }
            }
          },
          series: [{
            data: this.incomeData.y,
            type: 'line',
            smooth: true,
            showSymbol: false,
            smoothMonotone: 'x',
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                x2: 0,
                y: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'rgba(197,169,112,0.55)'
                }, {
                  offset: 1, color: 'rgba(197,169,112,0.05)'
                }],
                globalCoord: false
              }
            },
            itemStyle: {
              normal: {
                color: 'rgba(197,169,112,0.55)',
                borderWidth: 2,
                lineStyle: {
                  color: 'rgba(197,169,112,0.55)',
                  width: 3
                }
              }
            }
          }]
        })
      },
      changeTab(index) {
        this.tabIndex = index
      },
      _getProject() {
        const project = storage.get('project')
        const obj = PROJECT_ARR.find(val => val.project === project)
        document.title = obj.name
        this.isWD = project === WEI_SHANG.project
      },
      _getHomeInfo() {
        Home.getHomeInfo().then(res => {
          if (res.error !== ERR_OK) {
            this.$refs.toast.show(res.message)
            return
          }
          this.userInfo = res.data
        })
      }
    },
    computed: {
      ...mapGetters(['homeTabIdx'])
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .home
    background: #fff
    min-height: 100vh
    .header
      position: relative
      background-image: linear-gradient(-180deg, #2D2C28 0%, #3D3834 100%)
      layout()
      align-items: center
      padding-top: 27px
      .company
        min-height: 12px
        font-family: $font-family-regular
        font-size: $font-size-12
        color: $color-A3A2A0
        text-align: center
        line-height: 1
      .position
        min-height: 12px
        font-family: $font-family-light
        font-size: $font-size-12
        color: $color-9E8F70
        text-align: center
        line-height: 1
        padding: 3.5px 5px
        background: rgba(195, 166, 108, 0.05)
        border: 0.5px solid $color-676052
        border-radius: 100px
        margin-top: 11px
        &.hide
          opacity: 0
      .money
        font-family: $font-family-dinbold
        font-size: 60px
        color: $color-C3A66C
        letter-spacing: 1px
        text-align: center
        margin-top: 31.5px
      .explain
        font-family: $font-family-regular
        font-size: $font-size-12
        color: $color-676052
        text-align: center
        margin-top: 1px
      .data-wrapper
        padding: 34px 15.5px 15px
        width: 100vw
        box-sizing: border-box
        layout(row, block, nowrap)
        justify-content: space-between
        position: relative
        &.zt
          justify-content: space-around
          padding: 20px
        &.zt:after
          content: ''
          height: 43px
          width: 1px
          background: $color-676052
          row-center()
        .data-item
          .top
            font-family: $font-family-dinbold
            font-size: $font-size-24
            color: $color-C3A66C
            text-align: center
            &.zt
              font-size: 30px
          .bottom
            font-family: $font-family-regular
            font-size: $font-size-12
            color: $color-776B54
            text-align: center
            margin-top: 4.5px
      .account
        position: absolute
        right: 0
        top: 16px
        width: 42px
        height: 33px
        background: rgba(255, 255, 255, 0.06)
        border-radius: 33px 0 0 33px
        layout(row)
        align-items: center
        .icon-a
          margin-left: 7px
          width: 24px
          height: 24px
          icon-image(icon-center_home)

    .content
      position: relative
      overflow: hidden
      .tab-container
        height: 44.5px
        width: 100vw
        position: relative
        .tab-wrapper
          position: relative
          height: 100%
          layout(row, block, nowrap)
          align-items: center
          justify-content: space-between
          .tab-item
            flex: 1
            height: 100%
            line-height: 44.5px
            font-family: $font-family-regular
            font-size: $font-size-16
            color: $color-343439
            text-align: center
            transition: color 0.3s
            &.active
              color: $color-C3A66C
        .tab-line-wrapper
          height: 100%
          width: 33.333%
          position: absolute
          top: 0
          left: 0
          layout()
          justify-content: flex-end
          align-items: center
          transition: all 0.3s
          .tab-line
            width: 34px
            height: 2.5px
            background: $color-C3A66C
      .entry-wrapper
        position: relative
        height: 120px
        width: 300vw
        transition: all 0.3s
        .entry-item
          height: 100%
          width: 100vw
          float: left
          layout(row, block, nowrap)
          .item
            height: 100%
            width: 33.33333%
            layout()
            justify-content: center
            align-items: center
            .icon
              width: 30px
              height: 30px
              &.open-home
                icon-image(icon-open_home)
              &.record-home
                icon-image(icon-record_home)
              &.customer-home
                icon-image(icon-customer_home)
              &.agent-home
                icon-image(icon-recommender_home)
              &.my-team
                icon-image(icon-myteam_home)
              &.profit-details
                icon-image(icon-profitdetails_home)
              &.my-wallet
                icon-image(icon-mywallet_home)
            .txt
              font-family: $font-family-light
              font-size: $font-size-12
              color: $color-AA905D
              text-align: center
              margin-top: 8px
    .f3
      height: 7px
      background: $color-F3F3F3
    .charts
      .title
        layout(row)
        justify-content: space-between
        padding: 20.5px 0 15px
        font-family: $font-family-regular
        overflow: hidden
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
          font-size: 13px
          color: $color-CFCFCF
          padding-right: 10.85px
          margin-right: 11.65px
          bg-image(icon-arrow_home)
          background-size: 9.4px 9.4px
          background-position: right 1.6px
          background-repeat: no-repeat
          position: relative
          &:after
            content: ''
            position: absolute
            width: 100px
            height: 40px
            left: -20px
            top: -20px
            right: -20px
            border-bottom: -20px
      .charts-container
        .c-title
          font-family: $font-family-regular
          font-size: $font-size-12
          color: $color-343439
          text-align: center
          padding-bottom: 11px
        .c-wrapper
          height: 217.5px

  .pie-box
    position: relative
    background: linear-gradient(rgba(255, 255, 255, .1) 0%, #fff 100%)
    height: 305px
    #myPie
      width: 100%
      height: 285px
      margin: 0 auto
      padding: 20px
    #myHomeLine
      width: 100%
      height: 300px
      margin: 0 auto
      padding: 0px 10px 0
      top: -5px
      box-sizing: border-box
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

</style>
