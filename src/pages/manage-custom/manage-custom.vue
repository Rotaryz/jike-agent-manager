<template>
  <div class="manage-custom">
    <header class="header">
      <p class="custom">客户</p>
      <p class="money">总交易额/元</p>
      <p class="percent">开通率</p>
    </header>
    <div class="custom-scroll">
      <scroll ref="scroll"
              bcColor="#fff"
              :data="dataArray"
              :pullUpLoad="pullUpLoadObj"
              @pullingUp="onPullingUp"
              v-if="dataArray.length"
      >
        <section class="custom-list">
          <ul class="main">
            <li v-for="(item,index) in dataArray" :key="index" class="list" @click="jump(item.id)">
              <div class="msg">
                <div class="cus">
                  <h4 class="title">{{ item.name }}</h4>
                  <p class="count">购买账号数 {{ item.total_account || 0 }}个</p>
                </div>
                <div class="mon">{{ item.total_paid }}</div>
                <div class="per">{{ item.take_rate || '0%' }}</div>
              </div>
              <div class="progress">
                <div class="gress" :style="{ width:item.take_rate || '0%' }"></div>
              </div>
            </li>
          </ul>
        </section>
      </scroll>
      <empty-data v-else></empty-data>
    </div>
    <!--<footer class="bot-btn">-->
      <!--<router-link to="/custom-create" class="btn">新建客户</router-link>-->
    <!--</footer>-->
    <toast ref="toast"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import { Custom } from 'api'
  import { ERR_OK } from 'common/js/config'
  import Toast from 'components/toast/toast'
  import EmptyData from 'components/empty-data/empty-data'

  const LIMIT = 10

  export default {
    name: 'Demo',
    props: {
    },
    data() {
      return {
        dataArray: [],
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了',
        page: 1,
        more: true
      }
    },
    created() {
      this.getCustomList(10, 1, res => {
        this.dataArray = res.data
      })
    },
    mounted() {
    },
    computed: {
      pullUpLoadObj: function () {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
      }
    },
    methods: {
      jump(id) {
        this.$router.push({path: '/custom-detail', query: {id}})
      },
      getCustomList(limit, page, callback) { // 获取客户列表
        Custom.getCustomList(limit, page)
          .then(res => {
            if (res.error !== ERR_OK) {
              this.$refs.toast.show(res.message)
              return
            }
            this.more = res.data.length === LIMIT
            callback(res)
          })
      },
      onPullingUp() {
        if (!this.more) return this.$refs.scroll.forceUpdate()
        // 更新数据
        console.info('pulling up and load data')
        this.page++
        this.getCustomList(10, this.page, res => {
          this.more = res.data.length === LIMIT
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
          if (!this.pullUpLoad) return // 防止下拉报错
          this.rebuildScroll()
        },
        deep: true
      },
      dataArray(current, prev) {
        this.pullUpLoad = current.length >= 10
      }
    },
    components: {
      Scroll,
      Toast,
      EmptyData
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.manage-custom
  font-family: $font-family-regular
  fill-box()
  min-height :100vh
  background: $color-white
  .header
    background: $color-F3F3F3
    color: $color-848484
    font-size: $font-size-12
    height: 40px
    line-height: 40px
    text-align: center
    padding: 0 15px
    display: flex
    .custom
      width: 50%
      text-align: left
    .money
      width: 25%
    .percent
      width: 25%
      text-align right
  .custom-scroll
    position: absolute
    left: 0
    right: 0
    top: 40px
    bottom: 0
    overflow: hidden
  .custom-list
    padding: 0 15px
    padding-top: 30px
    background: $color-white
    .list
      padding-bottom: 30px
      color: #AA905D
      font-size: $font-size-14
      .msg
        display: flex
        .cus
          width: 50%
          text-align: left
          .title
            font-size: $font-size-14
            color: $color-343439
            padding-right: 10px
            no-wrap()
          .count
            font-size: $font-size-12
            color: #A6A6A6
            padding-top: 6px
        .mon
          width: 25%
          text-align: center
        .per
          width: 25%
          text-align right
      .progress
        background: $color-F8F8F8
        border-radius: 100px
        height: 2px
        margin-top: 14px
        .gress
          background: linear-gradient(90deg, #EADBB4 0%, #DFBB72 100%)
          height: 2px
          border-radius: 100px

  .bot-btn
    position: fixed
    bottom: 0
    left: 0
    width: 100%;
    background: $color-white
    padding: 10px 15px
    box-sizing: border-box
    border-top-1px(#e3e3e3)
    height: 65px
  .btn
    background: $color-C3A66C
    font-size: $font-size-16
    color: $color-white
    text-align: center
    border-radius: 4px
    height: 45px
    line-height: 45px
    display: block
</style>
