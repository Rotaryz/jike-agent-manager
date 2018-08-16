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
        <!--<div class="team-top">-->
          <!--<div class="title">最大幅度的奖励政策</div>-->
          <!--<div class="text">推荐代理商加盟，最高一次性奖励9万元，</div>-->
          <!--<div class="text">另外还有被推荐团队的长期分红！</div>-->
        <!--</div>-->
        <img src="./pic-banner_@2x.png" alt="" class="award-img" @click="jumpAward">
        <div class="select-tab">
          <div class="tab" :class="menuIdx * 1 === 0 ? 'select-tab-active' : ''" @click="switchTab(0)"><span>推荐成功</span><span v-if="successTotal * 1 !== 0">({{successTotal}})</span></div>
          <div class="tab" :class="menuIdx * 1 === 1 ? 'select-tab-active' : ''" @click="switchTab(1)"><span>推荐记录</span><span v-if="allTotal * 1 !== 0">({{allTotal}})</span></div>
          <div class="line" :style="'transform:translate3d('+ (100 * menuIdx) + '%, 0, 0)'">
            <div class="chilen-line"></div>
          </div>
        </div>
        <div class="agent-success" v-if="menuIdx * 1 === 0 && successList.length !== 0">
          <div class="scale-list">
            <div class="scale-one">名称</div>
            <div class="scale-two">代理级别</div>
            <div class="scale-thr">推荐奖励/元</div>
          </div>
          <ul class="team-list">
            <li class="item border-bottom-1px" v-for="(item, index) in successList" v-bind:key="index">
              <div class="item-one">{{item.name}}</div>
              <div class="item-two">{{item.level_name}}</div>
              <div class="item-thr">{{item.money}}</div>
            </li>
          </ul>
        </div>
        <div class="null-box"  v-if="menuIdx * 1 === 0 && successList.length === 0">
          <img src="./pic-nodata@2x.png" class="null-box-img">
          <div class="null-box-text">暂还没有数据</div>
        </div>
        <div class="agent-success" v-if="menuIdx * 1 === 1 && allList.length !== 0">
          <div class="scale-list">
            <div class="scale-one">名称</div>
            <div class="scale-two">代理级别</div>
            <div class="scale-thr">推荐状态</div>
          </div>
          <ul class="team-list">
            <li class="item border-bottom-1px" v-for="(item, index) in allList" v-bind:key="index">
              <div class="item-one">{{item.name}}</div>
              <div class="item-two">{{item.level_name}}</div>
              <div class="item-thr ing" v-if="item.check_status * 1 === 0">待审核</div>
              <div class="item-thr success" v-if="item.check_status * 1 === 1">审核通过</div>
              <div class="item-thr fails" v-if="item.check_status * 1 === 2">审核不通过</div>
            </li>
          </ul>
        </div>
        <div class="null-box"  v-if="menuIdx * 1 === 1 && allList.length === 0">
          <img src="./pic-nodata@2x.png" class="null-box-img">
          <div class="null-box-text">暂还没有数据</div>
        </div>
      </scroll>
    </div>
    <div class="jump-btn border-top-1px">
      <router-link class="btn" to="/agent-entering">推荐代理商加盟</router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import Toast from 'components/toast/toast'
  import { ERR_OK } from 'common/js/config'
  import { Agent } from 'api'

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
        menuIdx: 0,
        successList: [],
        page: 1,
        noMore: false,
        allList: [],
        allpage: 1,
        noallMore: false,
        successTotal: '',
        allTotal: ''
      }
    },
    created() {
      this.getSuccessData()
      this.getAllData()
    },
    methods: {
      jumpAward() {
        let url = `/agent-award`
        this.$router.push(url)
      },
      onPullingUp() {
        if (this.menuIdx * 1 === 0) {
          if (this.noMore) {
            this.$refs.scroll.forceUpdate()
            return
          }
          this.getMoreSuccessData()
        } else {
          if (this.noallMore) {
            this.$refs.scroll.forceUpdate()
            return
          }
          this.getMoreAllData()
        }
      },
      rebuildScroll() {
        this.nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      },
      getSuccessData() {
        this.page = 1
        this.noMore = false
        Agent.getInviteList(this.page, 1).then(res => {
          if (res.error === ERR_OK) {
            this.successList = res.data
            this.successTotal = res.meta.total
            this._isMore(res)
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getMoreSuccessData() {
        Agent.getInviteList(this.page, 1).then(res => {
          if (res.error === ERR_OK) {
            this.successList.push(...res.data)
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
        if (this.successList.length >= res.meta.total * 1) {
          this.noMore = true
        }
      },
      getAllData() {
        this.allpage = 1
        this.noallMore = false
        Agent.getInviteList(this.allpage).then(res => {
          if (res.error === ERR_OK) {
            this.allList = res.data
            this.allTotal = res.meta.total
            this._isAllMore(res)
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      getMoreAllData() {
        if (this.noallMore) return
        Agent.getInviteList(this.allpage).then(res => {
          if (res.error === ERR_OK) {
            this.allList.push(...res.data)
            this._isAllMore(res)
          } else {
            this.$refs.toast.show(res.message)
          }
          setTimeout(() => {
            this.$refs.scroll.forceUpdate()
          }, 20)
        })
      },
      _isAllMore(res) {
        this.allpage++
        if (this.allList.length >= res.meta.total * 1) {
          this.noallMore = true
        }
      },
      switchTab(index) {
        this.menuIdx = index
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
    border: 0.5px solid #e3e6e9
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
      .fails
        color: #F03838
      .success
        color: #cfcfcf
      .ing
        color: #6cca4e
  .jump-btn
    height: 65px
    position: fixed
    bottom: 0
    background: $color-FFFFFF
    width: 100%
    left: 0
    padding: 10px 15px
    .btn
      color: $color-FFFFFF
      background: #C3A66C
      border-radius: 6px
      width: 100%
      text-align: center
      height: 45px
      display: block
      line-height: 45px
      font-size: $font-size-16
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
  .award-box
    width: 100%
    display: block
  .award-img
    width: 100%
    display: block
  .wzz
    width: 100%

</style>
