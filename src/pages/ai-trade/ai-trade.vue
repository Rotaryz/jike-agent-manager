<template>
  <div class="ai-box">
    <div class="ai-top">
      <router-link class="que-img" to="/ai-explain">
        <img src="./icon-help_myteam@2x.png">
      </router-link>
      <div class="name">{{tradeData.company_name}}</div>
      <div class="po-name-box">
        <div class="po-name" v-if="tradeData.role_name">{{tradeData.role_name}}</div>
      </div>
      <div class="data-box">
        <div class="data-box-item">
          <div class="number">{{tradeData.real_income || 0}}</div>
          <div class="text">今日收入/元</div>
        </div>
        <div class="data-box-item">
          <div class="number">{{tradeData.account_sale || 0}}</div>
          <div class="text">今日销量/个</div>
        </div>
      </div>
    </div>
    <div class="echarts-title-box">
      <div class="echarts-title">
        <div class="line"></div>
        <div class="text">生意数据概览</div>
      </div>
    </div>
    <div class="data-title">我的收入</div>
    <div class="income-data">
      <div class="data-item" v-for="(item, index) in incomeList" @click="selectIncome(index)"
           :class="incomeIndex * 1 ===index ? 'data-item-active' : ''">{{item}}
      </div>
    </div>
    <!--我的收入-->
    <div class="pie-box line-box">
      <div id="myLine"></div>
      <div class="title-box">
      </div>
    </div>
    <div class="data-title">我的账号销量</div>
    <div class="income-data">
      <div class="data-item" v-for="(item, index) in accountList" @click="selectAccount(index)"
           :class="accountIndex * 1 ===index ? 'data-item-active' : ''">{{item}}
      </div>
    </div>
    <div class="pie-box line-box">
      <div id="myTwoLine"></div>
      <div class="title-box">
      </div>
    </div>
    <toast ref="toast"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import { ERR_OK } from 'common/js/config'
  import { Trade } from 'api'
  import Toast from 'components/toast/toast'

  export default {
    name: 'ai-trade',
    data() {
      return {
        incomeList: ['近3天', '近7天', '近15天'],
        incomeIndex: 0,
        accountList: ['近3天', '近7天', '近15天'],
        accountIndex: 0,
        tradeData: {
          company_name: '',
          role_name: '',
          real_income: '',
          account_sale: ''
        },
        incomeData: {},
        accountData: {}
      }
    },
    created() {
      this.getData()
      this.getMyIncomeData(1)
      this.getAccountSaleData(1)
    },
    mounted() {
      setTimeout(() => {
        this.drawLine()
        this.drawTwoLine()
      }, 1000)
    },
    methods: {
      getData() {
        Trade.getTodayData().then(res => {
          if (res.error === ERR_OK) {
            console.log(res)
            this.tradeData = res.data
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      selectIncome(index) {
        this.incomeIndex = index
        this.getMyIncomeData(index + 1)
      },
      selectAccount(index) {
        this.accountIndex = index
        this.getAccountSaleData(index + 1)
      },
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
      getAccountSaleData(time) {
        Trade.getAccountSale({time_type: time}).then(res => {
          if (res.error === ERR_OK) {
            this.accountData = res.data
            this.drawTwoLine()
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      drawLine() {
        let myChart = this.$echarts.init(document.getElementById('myLine'))
        // 我的收入
        myChart.setOption({
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.incomeData.x,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#E6E6E6'
              }
            },
            axisLabel: {
              color: '#343439'
            },
            axisLine: {
              lineStyle: {
                color: '#c4c4c4'
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
                color: '#E6E6E6'
              }
            },
            axisLabel: {
              color: '#343439'
            },
            axisLine: {
              lineStyle: {
                color: '#c4c4c4'
              }
            }
          },
          series: [{
            data: this.incomeData.y,
            type: 'line',
            showSymbol: false,
            itemStyle: {
              normal: {
                color: '#C5A970',
                borderWidth: 2,
                lineStyle: {
                  color: '#C5A970',
                  width: 3
                }
              }
            }
          }]
        })
      },
      drawTwoLine() {
        let myChart = this.$echarts.init(document.getElementById('myTwoLine'))
        // 我的收入
        myChart.setOption({
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.accountData.x,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#E6E6E6'
              }
            },
            axisLabel: {
              color: '#343439'
            },
            axisLine: {
              lineStyle: {
                color: '#c4c4c4'
              }
            }
          },
          tooltip: {
            trigger: 'axis',
            formatter: '活跃度：{c}',
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
                color: '#E6E6E6'
              }
            },
            axisLabel: {
              color: '#343439'
            },
            axisLine: {
              lineStyle: {
                color: '#c4c4c4'
              }
            }
          },
          series: [{
            data: this.accountData.y,
            type: 'line',
            showSymbol: false,
            itemStyle: {
              normal: {
                color: '#C5A970',
                borderWidth: 2,
                lineStyle: {
                  color: '#C5A970',
                  width: 3
                }
              }
            }
          }]
        })
      }
    },
    components: {
      Toast
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

  .ai-box
    background: $color-FFFFFF

  .ai-top
    width: 100%
    position: relative
    height: 160px
    background-image: linear-gradient(-180deg, #2D2C28 0%, #3D3834 100%)
    padding-top: 27px
    .que-img
      top: 25.5px
      right: 20px
      width: 18px
      height: 18px
      position: absolute
      img
        width: 100%
        height: 100%
        display: block
    .name
      color: #a3a2a0
      font-size: $font-size-14
      font-family: $font-family-regular
      text-align: center
    .po-name-box
      margin-top: 10px
      text-align: center
    .po-name
      color: #9E8F70
      font-size: $font-size-12
      font-family: $font-family-regular
      border: 1px solid #676052
      display: inline-block
      text-align: center
      padding: 3px 10px 4px
      border-radius: 50px
    .data-box
      layout(row)
      width: 100%
      margin-top: 20px
      .data-box-item
        width: 50%
        border-right: 0.5px solid  $color-676052
        &:last-chid
          border-right: 0
        .number
          text-align: center
          color: $color-C3A66C
          font-size: 30px
          font-family: $font-family-dinbold
        .text
          text-align: center
          color: $color-676052
          font-size: $font-size-12
          font-family: $font-family-regular
          margin-top: 5px

  .echarts-title-box
    padding-top: 20px

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
      font-size: $font-size-16
      color: $color-343439
      font-family: $font-family-regular

  .income-data
    layout(row)
    justify-content: center
    position: relative
    z-index: 90
    .data-item
      width: 50px
      margin: 0 10px
      text-align: center
      line-height: 24px
      height: 25px
      border-radius: 2px
      border: 0.5px solid #e4e4e4
      font-size: $font-size-12
      font-family: $font-family-medium
      color $color-343439
    .data-item-active
      border: 0px solid #e4e4e4
      color: $color-C3A66C
      background $color-343439

  .pie-box
    position: relative
    background: linear-gradient(rgba(255, 255, 255, .1) 0%, #fff 100%)
    height: 305px
    border-bottom: 10px solid #eee
    #myPie
      width: 100%
      height: 255px
      margin: 0 auto
      padding: 20px
    #myLine
      width: 100%
      height: 320px
      margin: 0 auto
      padding: 0px 0px 0
      top: -15px
    #myTwoLine
      width: 100%
      height: 320px
      margin: 0 auto
      padding: 0px 0px 0
      top: -15px
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

  .data-title
    padding: 30px 0
    font-size: $font-size-16
    font-family: $font-family-regular
    color: $color-343439
    text-align: center

  .z
    width: 100%

</style>
