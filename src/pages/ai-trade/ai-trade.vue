<template>
  <div class="ai-box">
    <div class="ai-top">
      <div class="name">广州波士卡汽车有限公司</div>
      <div class="po-name-box">
        <div class="po-name">县级A类代理</div>
      </div>
      <div class="data-box">
        <div class="data-box-item">
          <div class="number">12289</div>
          <div class="text">今日收入/元</div>
        </div>
        <div class="data-box-item">
          <div class="number">289</div>
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
      <div class="data-item" v-for="(item, index) in incomeList"
           :class="incomeIndex * 1 ===index ? 'data-item-active' : ''">{{item}}
      </div>
    </div>
    <!--我的收入-->
    <div class="pie-box line-box" >
      <div id="myLine"></div>
      <div class="title-box">
      </div>
    </div>
    <div class="data-title">我的账号销量</div>
    <div class="income-data">
      <div class="data-item" v-for="(item, index) in incomeList"
           :class="incomeIndex * 1 ===index ? 'data-item-active' : ''">{{item}}
      </div>
    </div>
    <div class="pie-box line-box" >
      <div id="myTwoLine"></div>
      <div class="title-box">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'ai-trade',
    data() {
      return {
        incomeList: ['近3天', '近7天', '近15天']
      }
    },
    mounted() {
      setTimeout(() => {
        this.drawLine()
        this.drawTwoLine()
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
      drawTwoLine() {
        let myChart = this.$echarts.init(document.getElementById('myTwoLine'))
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
  .ai-box
    background: $color-FFFFFF
  .ai-top
    width: 100%
    position: relative
    height: 160px
    background-image: linear-gradient(-180deg, #2D2C28 0%, #3D3834 100%)
    padding-top: 27px
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
      padding:3px 10px 4px
      border-radius: 50px
    .data-box
      layout(row)
      width: 100%
      margin-top: 20px
      .data-box-item
        width: 50%
        border-right:0.5px solid  $color-676052
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
