<template>
  <div class="custom-detail">
    <header class="header">
      <h3 class="company" @click="jump( msg.agent_merchant_id )">
        {{ msg.name }}
        <i class="icon"></i>
      </h3>
      <p class="call">{{ msg.mobile }}</p>
    </header>
    <section class="data-main">
      <div class="top-main">
        <div class="top-data">
          <div class="money">
            <p class="count">{{ msg.total_paid }}</p>
            总交易额/元
          </div>
          <div class="buy-count">
            <p class="count">{{ msg.total_account }}</p>
            购买个数/个
          </div>
          <div class="open-count">
            <p class="count">{{ msg.open_num }}</p>
            开通个数/个
          </div>
        </div>
      </div>
      <div class="list-sec">
        <h3 class="title"><span class="name">AI微店购买记录</span></h3>
        <div class="tab">
          <p class="custom">日期</p>
          <p class="count">购买个数/个</p>
          <p class="money">交易额/元</p>
        </div>
      </div>
    </section>
    <div class="list-scroll">
      <scroll ref="scroll"
              :probeType="probeType"
              :bcColor="bcColor"
              :data="dataArray"
              :listenScroll="listenScroll"
              :pullUpLoad="pullUpLoadObj"
              @pullingUp="onPullingUp">
        <ul>
          <li v-for="(item,index) in msg.agent_sale_records" :key="item.id" class="list">
            <div class="date">{{ item.created_at }}</div>
            <div class="count">{{ item.num }}</div>
            <div class="money">{{ item.total_price }}</div>
          </li>
        </ul>
      </scroll>
    </div>
    <footer class="bot-btn">
      <a :href="`tel:${ msg.mobile }`" class="btn">联系客户</a>
    </footer>
    <toast ref="toast"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import { Custom } from 'api'
  import { ERR_OK } from 'common/js/config'
  import Toast from 'components/toast/toast'

  export default {
    name: 'custom-detail',
    props: {
    },
    data() {
      return {
        bcColor: '#fff',
        probeType: 3,
        listenScroll: true,
        pullUpLoad: true,
        pullUpLoadThreshold: 0,
        pullUpLoadMoreTxt: '加载更多',
        pullUpLoadNoMoreTxt: '没有更多了',
        dataArray: [],
        company: '国颐堂美发有限公司',
        msg: '',
        id: null
      }
    },
    created() {
      this.id = this.$route.query.id
      console.log(this.id)
      this.getCustomMsg(this.id)
    },
    mounted() {
    },
    computed: {
      pullUpLoadObj: function() {
        return this.pullUpLoad ? {
          threshold: parseInt(this.pullUpLoadThreshold),
          txt: {more: this.pullUpLoadMoreTxt, noMore: this.pullUpLoadNoMoreTxt}
        } : false
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
      jump(id) {
        this.$router.push({path: '/custom-create', query: { id }})
      },
      getCustomMsg(id) { // 获取客户信息
        Custom.getCustomMsg(id)
          .then(res => {
            if (res.error !== ERR_OK) {
              this.$refs.toast.show(res.message)
              return
            }
            this.msg = res.data
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
  .custom-detail
    padding-bottom: 68px
    .header
      height: 140px
      background: linear-gradient(180deg, #2D2C28 0%, #3D3834 100%);
      color: $color-C3A66C
      font-size: $font-size-16
      line-height: $font-size-16
      text-align: center
      padding-top: 25px
      box-sizing: border-box
      .company
        display: flex
        justify-content: center
        align-items: center
      .icon
        bg-image('./icon-arrow_customer')
        width: 16px
        height: 16px
        background-size:100% 100%
        background-repeat: no-repeat
        display: inline-block
        margin-left: 2px
      .call
        font-size: $font-size-16
        color: #766B55
        margin-top: 8px
    .data-main
      position: relative
      padding-top: 80px
      .top-main
        position: absolute
        top: -50px
        width: 100%
        padding: 0 15px
        box-sizing: border-box
        .top-data
          height: 50px
          background: $color-white;
          box-shadow: 0 13px 13px 0 rgba(0,0,0,0.05);
          border-radius: 4px;
          display: flex
          justify-content: space-around
          align-items: center
          padding: 25px 0
          text-align: center
          font-size: $font-size-12
          color: $color-343439
          .count
            color: $color-C3A66C
            font-size: $font-size-24
            margin-bottom: 10px

    .list-sec
      background: $color-white
      .title
        background: $color-background
        font-size: $font-size-16
        color: $color-343439
        letter-spacing: 0
        line-height: 30px
        &:before
          content:''
          display: inline-block
          width: 4px
          height: 22px
          background: $color-C3A66C
          vertical-align: middle
          margin-right: 10px
        .name
          display: inline-block
          vertical-align: middle
      .tab
        background: $color-F3F3F3
        color: $color-848484
        font-size: $font-size-12
        height: 40px
        line-height: 40px
        text-align: center
        padding: 0 15px
        display: flex
        justify-content: space-between
        .custom
          text-align: left
        .percent
          text-align right
      .list
        background: $color-white
        height: 60px
        line-height: 60px
        font-size: $font-size-14
        margin: 0 15px
        border-bottom: 1px solid $color-E3E6E9
        display: flex
        justify-content: space-between
        .date
          color: $color-343439
        .count
          color: $color-AA905
    .list-scroll
      position: absolute
      top: 291px
      left: 0
      right: 0
      bottom: 65px
      .list
        background: $color-white
        height: 60px
        line-height: 60px
        font-size: $font-size-14
        margin: 0 15px
        border-bottom: 1px solid $color-E3E6E9
        display: flex
        justify-content: space-between
        .date
          color: $color-343439
        .count
          color: $color-AA905
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
      color: #FFFFFF
      text-align: center
      border-radius: 4px
      height: 45px
      line-height: 45px
      display: block
</style>
