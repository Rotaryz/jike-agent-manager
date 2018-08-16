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
          <div class="team-title">
            <div class="text">我的团队</div>
            <router-link class="title-img" to="/explain-team">
              <img src="./icon-help_myteam@2x.png" alt="">
            </router-link>
          </div>
          <div class="team-ab">
            <div class="team-box-samll">
              <div class="item">
                <div class="number">{{order}}</div>
                <div class="number-order">分销单数/单</div>
              </div>
              <div class="item">
                <div class="number">{{money}}</div>
                <div class="number-order">分销收入/元</div>
              </div>
            </div>
          </div>
        </div>
        <div class="echarts-title">
          <div class="line"></div>
          <div class="text">团队成员列表</div>
        </div>
        <div class="scale-list">
          <div class="scale-one">企业名称</div>
          <div class="scale-two">分销单数/个</div>
          <div class="scale-thr">分销收入/元</div>
        </div>
        <ul class="team-list" v-if="dataArray.length !== 0">
          <li class="item border-bottom-1px" v-for="item in dataArray" v-bind:key="item.id">
            <div class="item-one">{{item.name}}</div>
            <div class="item-two">{{item.commission_num}}</div>
            <div class="item-thr">{{item.commission_income}}</div>
          </li>
        </ul>
        <div class="null-box"  v-if="dataArray.length === 0">
          <img src="./pic-nodata@2x.png" class="null-box-img">
          <div class="null-box-text">暂还没有数据</div>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import Toast from 'components/toast/toast'
  import { ERR_OK } from 'common/js/config'
  import { Agent } from 'api'

  export default {
    name: 'my-team',
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
        order: '',
        money: '',
        page: 1,
        noMore: false
      }
    },
    created() {
      this.getMyTeamData()
    },
    methods: {
      onPullingUp() {
        this.getMoreMyTeamData()
        if (this.noMore) {
          this.$refs.scroll.forceUpdate()
        }
      },
      rebuildScroll() {
        this.nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      },
      getMyTeamData() {
        this.page = 1
        this.noMore = false
        Agent.getMyTeam(this.page).then(res => {
          if (res.error === ERR_OK) {
            this.dataArray = res.data
            this.order = res.total_commission_num
            this.money = res.total_commission_income
            this._isMore(res)
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getMoreMyTeamData() {
        if (this.noMore) return
        Agent.getMyTeam(this.page).then(res => {
          if (res.error === ERR_OK) {
            this.dataArray.push(...res.data)
            this._isMore(res)
          } else {
            this.$refs.toast.show(res.message)
          }
          setTimeout(() => {
            this.$refs.scroll.forceUpdate()
          }, 20)
        })
      },
      _isMore(res) {
        this.page++
        if (this.dataArray.length >= res.meta.total * 1) {
          this.noMore = true
        }
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
    z-index: 11
  .team-top
    height: 150px
    background-image: linear-gradient(-180deg, #2D2C28 0%, #3D3834 100%)
    width: 100%
    padding-top: 37px
    margin-bottom: 80px
    position: relative
    z-index: 2
    icon-image-jpg(pic-banner_myteam)
    .team-title
      layout(row)
      justify-content: center
      align-items: center
      .text
        margin-right: 3px
        font-size: $font-size-18
        color: $color-C3A66C
        font-family: $font-family-regular
      .title-img
        width: 16.5px
        height: 16.5px
        img
          width: 100%
          height: 100%
          display: block
    .team-ab
      width: 100%
      position: absolute
      bottom: -50px
      left: 0
      padding: 0 15px
      .team-box-samll
        background: #FFFFFF
        box-shadow: 0 6px 6px 0 rgba(0, 0, 0, 0.05)
        border-radius: 3px
        height: 100px
        layout(row)
        .item
          width: 50%
          padding: 20px 0 14px
          layout()
          align-items: center
          justify-content: center
          .number-order
            font-size: $font-size-12
            color: $color-343439
            font-family: $font-family-regular
            margin-top: 4.5px
          .number
            font-family: $font-family-dinbold
            color: $color-C3A66C
            font-size: $font-size-24
  .echarts-title
    layout(row)
    align-items: center
    height: 22px
    .line
      background: $color-C3A66C
      height: 22px
      width: 3.5px
      margin-right: 11.5px
    .text
      font-size: $font-size-16
      color: $color-343439
      font-family: $font-family-regular
  .scale-list
    height: 38px
    layout(row)
    background: #f3f3f3
    margin-top: 10px
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
  .team-list
    padding: 0 15px
    .item
      layout(row)
      height: 60px
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
  .null-box
    padding-top: 50px
    .null-box-img
      width: 150px
      display: block
      margin: 0 auto
    .null-box-text
      text-align: center
      font-size: $font-size-14
      color: #a6a6a6
      font-family: $font-family-regular
  .z
    width: 100%

</style>
