<template>
  <div class="trade-box">
    <div class="trade-bg"></div>
    <div class="trade-top">
      <div class="top-title">本日数据统计</div>
      <div class="top-number">
        288.00
      </div>
      <div class="top-text">今日实际收入</div>
      <div class="que-img">
        <img src="./icon-help_myteam@2x.png">
      </div>
      <div class="trade-ab">
        <div class="order-box">
          <div class="item">
            <div class="number">34</div>
            <div class="text">账号销量</div>
            <div class="line"></div>
            <div class="color-text">环比50%</div>
          </div>
          <div class="item">
            <div class="number">34</div>
            <div class="text">账号销量</div>
            <div class="line"></div>
            <div class="color-text">环比50%</div>
          </div>
          <div class="item">
            <div class="number">34</div>
            <div class="text">账号销量</div>
            <div class="line"></div>
            <div class="color-text">环比50%</div>
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
        <div class="data-item" v-for="(item, index) in incomeList"
             :class="incomeIndex * 1 ===index ? 'data-item-active' : ''">{{item}}
        </div>
      </div>
      <!--我的收入-->
      <div class="pie-box line-box" >
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
      <div class="pie-box pie-box-change" >
        <div id="myPie"></div>
        <div class="my-pie-moeny">累计收入：￥6,000.00</div>
      </div>
      <div class="echarts-title-box">
        <div class="echarts-title">
          <div class="line"></div>
          <div class="text">核心数据指标</div>
        </div>
      </div>
      <!--核心数据指标-->
      <div class="pie-box line-box" >
        <div id="myDataBar"></div>
        <div class="pie-list">
          <div class="list">
            <div class="icon one"></div>
            <div class="text">账号销量</div>
          </div>
          <div class="list">
            <div class="icon two"></div>
            <div class="text">团队分销</div>
          </div>
          <div class="list">
            <div class="icon thr"></div>
            <div class="text">团队推荐奖励</div>
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
        <div class="data-item" v-for="(item, index) in incomeList"
             :class="incomeIndex * 1 ===index ? 'data-item-active' : ''">{{item}}
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
        <div class="data-item" v-for="(item, index) in incomeList"
             :class="incomeIndex * 1 ===index ? 'data-item-active' : ''">{{item}}
        </div>
      </div>
      <div class="pie-box line-box">
        <div id="myMemberMoney"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'trade-view',
    data() {
      return {
        incomeList: ['近3天', '近7天', '近15天'],
        incomeIndex: 0
      }
    },
    mounted() {
      setTimeout(() => {
        this.drawLine()
        this.drawPie()
        this.drawDataBar()
        this.drawMember()
        this.drawMemberMoney()
      }, 1000)
    },
    methods: {
      drawLine() {
        let myChart = this.$echarts.init(document.getElementById('myLine'))
        // 我的收入
        myChart.setOption({
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['08.11', '08.12', '08.13', '08.14', '08.15', '08.16', '08.17', '08.18', '08.19', '08.20', '08.21', '08.22', '08.23', '08.24', '08.25'],
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
            data: ['10', '22', '30', '10', '22', '30', '10', '22', '30', '10', '22', '30', '10', '22', '30'],
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
              name: '访问222来源',
              type: 'pie',
              radius: '45%',
              center: ['50%', '40%'],
              data: [
                {value: 1, name: '账号销售收入'},
                {value: 1, name: '团队分销收入'},
                {value: 1, name: '加盟推荐奖励'},
                {value: 1, name: '推荐团队分红'}
              ],
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
            data: ['08.08', '08.08', '08.08', '08.08'],
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
                  show: true,
                  position: 'inside',
                  fontSize: 10,
                  color: '#fff'
                }
              },
              data: [320, 302, 301, 334],
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
              name: '团队分销',
              type: 'bar',
              stack: '总量',
              barWidth: 24,
              label: {
                normal: {
                  show: true,
                  position: 'inside',
                  fontSize: 10,
                  color: '#fff'
                }
              },
              data: [120, 132, 101, 134],
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
              name: '团队推荐奖励',
              type: 'bar',
              stack: '总量',
              barWidth: 24,
              label: {
                normal: {
                  show: true,
                  position: 'inside',
                  fontSize: 10,
                  color: '#fff'
                }
              },
              data: [220, 182, 191, 234],
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
            data: ['08.11', '08.12', '08.13', '08.14', '08.15', '08.16', '08.17', '08.18', '08.19', '08.20', '08.21', '08.22', '08.23', '08.24', '08.25'],
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
            data: ['10', '22', '30', '10', '22', '30', '10', '22', '30', '10', '22', '30', '10', '22', '30'],
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
            data: ['08.11', '08.12', '08.13', '08.14', '08.15', '08.16', '08.17', '08.18', '08.19', '08.20', '08.21', '08.22', '08.23', '08.24', '08.25'],
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
            data: ['10', '22', '30', '10', '22', '30', '10', '22', '30', '10', '22', '30', '10', '22', '30'],
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
      width: 15.5px
      height: 15.5px
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
