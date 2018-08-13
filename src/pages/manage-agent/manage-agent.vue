<template>
  <div class="team-box">
    <div class="trade-scroll">
      <scroll ref="scroll"
              :probeType="probeType"
              :bcColor="bcColor"
              :data="dataArray"
              :showNoMore="false"
              :listenScroll="listenScroll"
              :pullUpLoad="pullUpLoadObj"
              @pullingUp="onPullingUp">
        <div class="team-top">
          <div class="title">最大幅度的奖励政策</div>
          <div class="text">推荐代理商加盟，最高一次性奖励9万元，</div>
          <div class="text">另外还有被推荐团队的长期分红！</div>
        </div>
        <div class="select-tab">
          <div class="tab" :class="menuIdx * 1 === 0 ? 'select-tab-active' : ''" @click="switchTab(0)">推荐成功(4)</div>
          <div class="tab" :class="menuIdx * 1 === 1 ? 'select-tab-active' : ''" @click="switchTab(1)">推荐记录(7)</div>
          <div class="line" :style="'transform:translate3d('+ (100 * menuIdx) + '%, 0, 0)'">
            <div class="chilen-line"></div>
          </div>
        </div>
        <div class="agent-success" v-if="menuIdx * 1 === 0">
          <div class="scale-list">
            <div class="scale-one">名称</div>
            <div class="scale-two">代理级别</div>
            <div class="scale-thr">推荐奖励/元</div>
          </div>
          <ul class="team-list">
            <li class="item">
              <div class="item-one">蓝月亮有限公司</div>
              <div class="item-two">100</div>
              <div class="item-thr">600</div>
            </li>
            <li class="item">
              <div class="item-one">蓝月亮有限公司</div>
              <div class="item-two">100</div>
              <div class="item-thr">600</div>
            </li>
            <li class="item">
              <div class="item-one">蓝月亮有限公司</div>
              <div class="item-two">100</div>
              <div class="item-thr">600</div>
            </li>
            <li class="item">
              <div class="item-one">蓝月亮有限公司</div>
              <div class="item-two">100</div>
              <div class="item-thr">600</div>
            </li>
            <li class="item">
              <div class="item-one">蓝月亮有限公司</div>
              <div class="item-two">100</div>
              <div class="item-thr">600</div>
            </li>
            <li class="item">
              <div class="item-one">蓝月亮有限公司</div>
              <div class="item-two">100</div>
              <div class="item-thr">600</div>
            </li>
            <li class="item">
              <div class="item-one">蓝月亮有限公司</div>
              <div class="item-two">100</div>
              <div class="item-thr">600</div>
            </li>
            <li class="item">
              <div class="item-one">蓝月亮有限公司</div>
              <div class="item-two">100</div>
              <div class="item-thr">600</div>
            </li>
            <li class="item">
              <div class="item-one">蓝月亮有限公司</div>
              <div class="item-two">100</div>
              <div class="item-thr">600</div>
            </li>
            <li class="item">
              <div class="item-one">蓝月亮有限公司</div>
              <div class="item-two">100</div>
              <div class="item-thr">600</div>
            </li>
            <li class="item">
              <div class="item-one">蓝月亮有限公司</div>
              <div class="item-two">100</div>
              <div class="item-thr">600</div>
            </li>
          </ul>
        </div>
        <div class="agent-success" v-if="menuIdx * 1 === 1">
          <div class="scale-list">
            <div class="scale-one">名称</div>
            <div class="scale-two">代理级别</div>
            <div class="scale-thr">推荐状态</div>
          </div>
          <ul class="team-list">
            <li class="item">
              <div class="item-one">蓝月亮有限公司</div>
              <div class="item-two">100</div>
              <div class="item-thr">600</div>
            </li>
            <li class="item">
              <div class="item-one">蓝月亮有限公司</div>
              <div class="item-two">100</div>
              <div class="item-thr">600</div>
            </li>
            <li class="item">
              <div class="item-one">蓝月亮有限公司</div>
              <div class="item-two">100</div>
              <div class="item-thr">600</div>
            </li>
            <li class="item">
              <div class="item-one">蓝月亮有限公司</div>
              <div class="item-two">100</div>
              <div class="item-thr">600</div>
            </li>
            <li class="item">
              <div class="item-one">蓝月亮有限公司</div>
              <div class="item-two">100</div>
              <div class="item-thr">600</div>
            </li>
            <li class="item">
              <div class="item-one">蓝月亮有限公司</div>
              <div class="item-two">100</div>
              <div class="item-thr">600</div>
            </li>
            <li class="item">
              <div class="item-one">蓝月亮有限公司</div>
              <div class="item-two">100</div>
              <div class="item-thr">600</div>
            </li>
            <li class="item">
              <div class="item-one">蓝月亮有限公司</div>
              <div class="item-two">100</div>
              <div class="item-thr">600</div>
            </li>
            <li class="item">
              <div class="item-one">蓝月亮有限公司</div>
              <div class="item-two">100</div>
              <div class="item-thr">600</div>
            </li>
            <li class="item">
              <div class="item-one">蓝月亮有限公司</div>
              <div class="item-two">100</div>
              <div class="item-thr">600</div>
            </li>
            <li class="item">
              <div class="item-one">蓝月亮有限公司</div>
              <div class="item-two">100</div>
              <div class="item-thr">600</div>
            </li>
          </ul>
        </div>
      </scroll>
    </div>
    <div class="jump-btn">
      <div class="btn">推荐代理商加盟</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import Toast from 'components/toast/toast'

  export default {
    name: 'manage-agent',
    data() {
      return {
        listenScroll: true,
        probeType: 3,
        bcColor: '#fff',
        dataArray: [],
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了',
        menuIdx: 0
      }
    },
    methods: {
      onPullingUp() {
        this.$refs.scroll.forceUpdate()
      },
      rebuildScroll() {
        this.nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      },
      switchTab(index) {
        this.menuIdx = index
        if (index * 1 === 1) {
          setTimeout(() => {
            this.drawPie()
            this.drawLine()
            this.drawBar()
            this.drawSuccess()
          }, 200)
        }
        if (index * 1 === 0) {
          setTimeout(() => {
            this.drawSix()
          }, 200)
        }
        setTimeout(() => {
          this.$refs.scroll.forceUpdate()
        }, 20)
      }
    },
    computed: {
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      }
    },
    components: {
      Toast,
      Scroll
    },
    watch: {
      pullUpLoadObj: {
        handler() {
          if (!this.pullUpLoad) return // 防止下拉报错
          this.rebuildScroll()
        },
        deep: true
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
  .team-box
    fill-box(fixed)
  .trade-scroll
    fill-box()
    overflow: hidden
    bottom: 65px
    z-index: 11
  .team-top
    height: 172px
    background-image: linear-gradient(-180deg, #2D2C28 0%, #3D3834 100%)
    width: 100%
    layout()
    align-items: center
    justify-content: center
    z-index: 2
    .title
      font-size: 25px
      color: $color-C3A66C
      font-family : $font-family-bold
      margin-bottom: 10px
    .text
      font-size: $font-size-14
      color: #766B55
      font-family : $font-family-bold
      margin-bottom: 5px
  .agent-success
    padding-bottom: 30px
  .select-tab
    layout(row)
    height: 48px
    line-height: 47px
    width: 100%
    position: relative
    z-index: 11
    .tab
      flex: 1
      text-align: center
      font-size: $font-size-16
      color: $color-343439
      font-family: $font-family-regular
    .select-tab-active
      color: $color-C3A66C
    .line
      position: absolute
      width: 50%
      height: 3px
      bottom: 0
      transition: all .3s
      .chilen-line
        height: 3px
        width: 30px
        background: #C3A66C
        margin: 0 auto

  .scale-list
    height: 38px
    layout(row)
    background: #f3f3f3
    align-items: center
    padding: 0 15px
    .scale-one
      width: 46%
      font-size: $font-size-12
      color: $color-848484
      font-family: $font-family-regular
    .scale-two
      width: 27%
      font-size: $font-size-12
      color: $color-848484
      font-family: $font-family-regular
      text-align: center
    .scale-thr
      width: 27%
      text-align: right
      font-size: $font-size-12
      color: $color-848484
      font-family: $font-family-regular
    .fails
      color: #F03838
    .success
      color: #cfcfcf
    .ing
      color: #6cca4e
  .team-list
    padding: 0 15px
    .item
      layout(row)
      height: 60px
      border-bottom: 0.5px solid #e3e6e9
      align-items: center
      .item-one
        width: 46%
        padding-right: 15px
        no-wrap()
        font-size: $font-size-14
        color: $color-343439
        font-family: $font-family-regular
      .item-two
        width: 27%
        text-align: center
        font-size: $font-size-14
        color: $color-666666
        font-family: $font-family-regular
      .item-thr
        width: 27%
        text-align: right
        font-size: $font-size-14
        color: $color-AA905D
        font-family: $font-family-regular
  .jump-btn
    height: 65px
    position: fixed
    bottom: 0
    background: $color-FFFFFF
    width: 100%
    left: 0
    border-top: 1px solid #eee
    padding: 10px 15px
    .btn
      color: $color-FFFFFF
      background: #C3A66C
      border-radius: 6px
      width: 100%
      text-align: center
      height: 45px
      line-height: 45px
      font-size: $font-size-16
      font-family: $font-family-regular
  .wzz
    width: 100%

</style>
