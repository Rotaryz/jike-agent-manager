<template>
  <div class="trade-box">
    <div class="trade-bg"></div>
    <div class="trade-top">
      <div class="top-title">本日数据统计</div>
      <div class="top-number">
        {{tradeData.real_income || 0}}
      </div>
      <div class="top-text">今日实际收入</div>
      <router-link class="que-img" to="/explain-trade">
        <img src="./icon-help_myteam@2x.png">
      </router-link>
      <div class="trade-ab">
        <div class="order-box">
          <div class="item">
            <div class="number">{{tradeData.account_sale || 0}}</div>
            <div class="text">账号销量</div>
            <div class="line"></div>
            <div class="color-text">环比{{tradeData.account_sale_percent || '0%'}}</div>
          </div>
          <div class="item">
            <div class="number">{{tradeData.invite_join || 0}}</div>
            <div class="text">推荐加盟</div>
            <div class="line"></div>
            <div class="color-text">环比{{tradeData.invite_join_percent || '0%'}}</div>
          </div>
          <div class="item">
            <div class="number">{{tradeData.sale_count || 0}}</div>
            <div class="text">分销单数</div>
            <div class="line"></div>
            <div class="color-text">环比{{tradeData.invite_join_percent || '0%'}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="echarts-box">
      <div class="echarts-title">
        <div class="line"></div>
        <div class="text">生意数据概览</div>
      </div>
      <div class="income-data">
        <div class="data-item" v-for="(item, index) in incomeList" @click="selectIncome(index)"
             :class="incomeIndex * 1 ===index ? 'data-item-active' : ''">{{item}}
        </div>
      </div>
      <!--我的收入-->
      <div class="pie-box line-box">
        <div id="myLine"></div>
        <div class="title-box">
          <div class="sub-title">我的收入</div>
        </div>
      </div>
      <div class="echarts-title-box">
        <div class="echarts-title">
          <div class="line"></div>
          <div class="text">我的收入占比</div>
        </div>
      </div>
      <!--我的收入占比-->
      <div class="pie-box pie-box-change">
        <div id="myPie"></div>
        <div class="my-pie-moeny">累计收入：¥{{pieMoney || 0}}</div>
      </div>
      <div class="echarts-title-box">
        <div class="echarts-title">
          <div class="line"></div>
          <div class="text">核心数据指标</div>
        </div>
      </div>
      <!--核心数据指标-->
      <div class="pie-box line-box">
        <div id="myDataBar"></div>
        <div class="pie-list">
          <div class="list">
            <div class="icon one"></div>
            <div class="text">账号销量</div>
          </div>
          <div class="list">
            <div class="icon two"></div>
            <div class="text">加盟推荐</div>
          </div>
          <div class="list">
            <div class="icon thr"></div>
            <div class="text">分销单数</div>
          </div>
        </div>
      </div>
      <!--新增团队队员-->
      <div class="echarts-title-box">
        <div class="echarts-title">
          <div class="line"></div>
          <div class="text">新增团队成员</div>
        </div>
      </div>
      <div class="income-data">
        <div class="data-item" v-for="(item, index) in newAddList" @click="selectNewAdd(index)"
             :class="newAddIndex * 1 ===index ? 'data-item-active' : ''">{{item}}
        </div>
      </div>
      <div class="pie-box line-box">
        <div id="myMember"></div>
      </div>
      <!--我的团队分销收入-->
      <div class="echarts-title-box">
        <div class="echarts-title">
          <div class="line"></div>
          <div class="text">我的团队分销收入</div>
        </div>
      </div>
      <div class="income-data">
        <div class="data-item" v-for="(item, index) in teamIncomeList" @click="selectTeamIncome(index)"
             :class="teamIncomeIndex * 1 ===index ? 'data-item-active' : ''">{{item}}
        </div>
      </div>
      <div class="pie-box line-box">
        <div id="myMemberMoney"></div>
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
    name: 'trade-view',
    data() {
      return {
        incomeList: ['近3天', '近7天', '近15天'],
        incomeIndex: 0,
        newAddList: ['近3天', '近7天', '近15天'],
        newAddIndex: 0,
        teamIncomeList: ['近3天', '近7天', '近15天'],
        teamIncomeIndex: 0,
        tradeData: {
          real_income: '',
          account_sale: '',
          account_sale_percent: '',
          invite_join: '',
          invite_join_percent: '',
          sale_count: '',
          sale_count_percent: ''
        },
        incomeData: {},
        incomePie: [],
        pieMoney: '',
        incomeBar: {},
        newMemberData: {},
        TeamIncomeData: {}
      }
    },
    created() {
      this.getMyIncomeData(1)
      this.getData()
      this.getMyIncomePidData()
      this.getMyBarData()
      this.getNewMemberData(1)
      this.getTeamIncomeData(1)
    },
    mounted() {
    },
    methods: {
      getData() {
        Trade.getTodayData().then(res => {
          if (res.error === ERR_OK) {
            this.tradeData = res.data
          } else {
            this.$refs.toast.show(res.message)
          }
        })
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
      getNewMemberData(time) {
        Trade.getNewMember({time_type: time}).then(res => {
          if (res.error === ERR_OK) {
            this.newMemberData = res.data
            this.drawMember()
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getTeamIncomeData(time) {
        Trade.getTeamIncome({time_type: time}).then(res => {
          if (res.error === ERR_OK) {
            this.TeamIncomeData = res.data
            this.drawMemberMoney()
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getMyIncomePidData() {
        Trade.getMyIncomePid().then(res => {
          if (res.error === ERR_OK) {
            this.incomePie = res.data.rate
            this.pieMoney = res.data.grand_total
            this.drawPie()
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getMyBarData() {
        Trade.getMyBar().then(res => {
          if (res.error === ERR_OK) {
            this.incomeBar = res.data
            this.drawDataBar()
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      selectIncome(index) {
        this.incomeIndex = index
        this.getMyIncomeData(index + 1)
      },
      selectNewAdd(index) {
        this.newAddIndex = index
        this.getNewMemberData(index + 1)
      },
      selectTeamIncome(index) {
        this.teamIncomeIndex = index
        this.getTeamIncomeData(index + 1)
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
      drawPie() {
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
              data: this.incomePie,
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
      drawDataBar() {
        let myChart = this.$echarts.init(document.getElementById('myDataBar'))
        // 我的收入占比
        myChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            axisLabel: {
              color: '#343439'
            },
            data: this.incomeBar.x,
            axisLine: {
              lineStyle: {
                color: '#c4c4c4'
              }
            }
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#c4c4c4'
              }
            },
            axisLabel: {
              color: '#343439'
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#E6E6E6'
              }
            }
          },
          series: [
            {
              name: '账号销量',
              type: 'bar',
              stack: '总量',
              barWidth: 24,
              label: {
                normal: {
                  show: false,
                  position: 'inside',
                  fontSize: 10,
                  color: '#fff'
                }
              },
              data: this.incomeBar.y1,
              itemStyle: {
                normal: {
                  color: '#343439',
                  lineStyle: {
                    color: '#343439',
                    width: 3
                  }
                }
              }
            },
            {
              name: '加盟推荐',
              type: 'bar',
              stack: '总量',
              barWidth: 24,
              label: {
                normal: {
                  show: false,
                  position: 'inside',
                  fontSize: 10,
                  color: '#fff'
                }
              },
              data: this.incomeBar.y2,
              itemStyle: {
                normal: {
                  color: '#C3A66C',
                  lineStyle: {
                    color: '#C3A66C',
                    width: 3
                  }
                }
              }
            },
            {
              name: '分销单数',
              type: 'bar',
              stack: '总量',
              barWidth: 24,
              label: {
                normal: {
                  show: false,
                  position: 'inside',
                  fontSize: 10,
                  color: '#fff'
                }
              },
              data: this.incomeBar.y3,
              itemStyle: {
                normal: {
                  color: '#8B572A',
                  lineStyle: {
                    color: '#8B572A',
                    width: 3
                  }
                }
              }
            }
          ]
        })
      },
      drawMember() {
        let myChart = this.$echarts.init(document.getElementById('myMember'))
        myChart.setOption({
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.newMemberData.x,
            splitLine: {
              show: false,
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
            formatter: '新增团队成员：{c}',
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
            data: this.newMemberData.y,
            type: 'line',
            smooth: true,
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
      drawMemberMoney() {
        let myChart = this.$echarts.init(document.getElementById('myMemberMoney'))
        myChart.setOption({
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.TeamIncomeData.x,
            splitLine: {
              show: false,
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
            formatter: '团队分销收入：{c}',
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
              formatter: '¥{value}',
              color: '#343439'
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#c4c4c4'
              }
            },
            axisTick: {
              show: false
            }
          },
          series: [{
            data: this.TeamIncomeData.y,
            type: 'line',
            smooth: true,
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

  .trade-box
    fill-box()
    background: $color-F8F8F8

  .trade-bg
    position: fixed
    width: 100%
    height: 100%
    left: 0
    top: 0
    z-index: 1
    background: #fff

  .trade-top
    height: 235px
    background-image: linear-gradient(-180deg, #2D2C28 0%, #3D3834 100%)
    width: 100%
    padding-top: 27px
    margin-bottom: 55px
    position: relative
    z-index: 2
    .top-title
      text-align: center
      font-size: $font-size-16
      font-family: $font-family-regular
      color: $color-C3A66C
      line-height: 1
      position: relative
    .top-number
      font-size: 60px
      text-align: center
      font-family: $font-family-dinbold
      color: $color-C3A66C
      line-height: 52px
      margin-top: 20px
    .top-text
      font-size: $font-size-12
      font-family: $font-family-regular
      color: #676052
      text-align: center
      margin-top: 10px
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
    .trade-ab
      width: 100%
      position: absolute
      bottom: -50px
      left: 0
      padding: 0 15px
      .order-box
        background: #FFFFFF
        box-shadow: 0 13px 13px 0 rgba(0, 0, 0, 0.05)
        border-radius: 3px
        layout(row)
        .item
          width: 33.333%
          padding: 20px 0 14px
          layout()
          align-items: center
          .number
            font-size: $font-size-24
            font-family: $font-family-regular
            color: $color-C3A66C
            margin-bottom: 12px
          .text
            font-size: $font-size-12
            font-family: $font-family-regular
            color: $color-343439
          .color-text
            font-size: $font-size-12
            font-family: $font-family-regular
            color: #666
          .line
            width: 25px
            height: 1px
            margin: 10px 0 15px
            border-bottom: .5px solid #d8d8d8

  .echarts-box
    position: relative
    z-index: 2
    padding-top: 20px

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
    margin: 20px 0 0
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

  .z
    width: 100%
</style>
