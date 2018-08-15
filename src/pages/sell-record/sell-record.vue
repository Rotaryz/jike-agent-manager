<template>
  <div class="sell-record">
    <header class="header">
      <p>客户</p>
      <p>购买金额/元</p>
    </header>
    <div class="msg-list-scroll">
      <scroll ref="scroll"
              bcColor="#fff"
              :data="dataArray"
              :pullUpLoad="pullUpLoadObj"
              @pullingUp="onPullingUp"
      >
        <section class="msg-list">
          <ul class="main">
            <li v-for="(item,index) in dataArray" :key="index" class="list" @click="jump(item.id)">
              <div class="name">{{ item.name }}</div>
              <div class="money">{{ item.total_price }}</div>
            </li>
          </ul>
        </section>
      </scroll>
    </div>
    <toast ref="toast"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import { Custom } from 'api'
  import { ERR_OK } from 'common/js/config'
  import Toast from 'components/toast/toast'

  export default {
    name: 'sell-record',
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
      this.getRecordList(res => {
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
        this.$router.push({path: '/sell-detail', query: {id}})
      },
      getRecordList(callback) { // 获取销售记录列表
        Custom.getRecordList(10, this.page, this.$route.query.id)
          .then(res => {
            if (res.error !== ERR_OK) {
              this.$refs.toast.show(res.message)
              return
            }
            this.more = !!res.data.length
            callback(res)
          })
      },
      onPullingUp() {
        if (!this.more) return this.$refs.scroll.forceUpdate()
        // 更新数据
        console.info('pulling up and load data')
        this.page++
        this.getRecordList(res => {
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
      }
    },
    components: {
      Scroll,
      Toast
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .header
    background: $color-F3F3F3
    color: $color-848484
    font-size: $font-size-12
    height: 40px
    line-height: 40px
    text-align: left
    padding: 0 15px
    display: flex
    justify-content: space-between
  .msg-list-scroll
    position: absolute
    top: 40px
    bottom: 0
    left: 0
    right: 0
    overflow: hidden
    .msg-list
      padding: 0 15px
      .list
        display: flex
        justify-content: space-between
        font-size: $font-size-14
        height: 60px
        line-height: 60px
        border-bottom: 1px solid $color-E3E6E9
        .name
          color: $color-343439
        .money
          color: $color-AA905D
</style>
