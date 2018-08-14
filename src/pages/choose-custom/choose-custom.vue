<template>
  <div class="choose-custom">
    <header class="header">
      <p>客户</p>
      <p>手机号码</p>
    </header>
    <div class="custom-list-scroll">
      <scroll ref="scroll"
              :probeType="probeType"
              :bcColor="bcColor"
              :data="dataArray"
              :listenScroll="listenScroll"
              :pullUpLoad="pullUpLoadObj"
              @pullingUp="onPullingUp">
        <section class="custom-list">
          <ul class="main">
            <li v-for="(item,index) in msg" :key="index" class="list" @click="selecCustom(msg[index])">
              <div class="name">{{ item.title }}</div>
              <div class="call">{{ item.call }}</div>
            </li>
          </ul>
        </section>
      </scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'

  export default {
    name: 'choose-custom',
    props: {
    },
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
        msg: [
          {
            title: '国颐堂美发有限公司',
            call: '16620141178'
          },
          {
            title: '国颐堂美发有限公司',
            call: '16620141178'
          },
          {
            title: '国颐堂美发有限公司',
            call: '16620141178'
          },
          {
            title: '国颐堂美发有限公司',
            call: '16620141178'
          },
          {
            title: '国颐堂美发有限公司',
            call: '16620141178'
          },
          {
            title: '国颐堂美发有限公司',
            call: '16620141178'
          },
          {
            title: '国颐堂美发有限公司',
            call: '16620141178'
          },
          {
            title: '国颐堂美发有限公司',
            call: '16620141178'
          },
          {
            title: '国颐堂美发有限公司',
            call: '16620141178'
          },
          {
            title: '国颐堂美发有限公司',
            call: '16620141178'
          },
          {
            title: '国颐堂美发有限公司',
            call: '16620141178'
          }
        ]
      }
    },
    created() {
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
      onPullingUp() {
        this.$refs.scroll.forceUpdate()
      },
      rebuildScroll() {
        this.nextTick(() => {
          this.$refs.scroll.destroy()
          this.$refs.scroll.initScroll()
        })
      },
      selecCustom(obj) {
        this.$store.commit('SELEC_CUSTOM', obj)
        this.$router.push({ path: '/sell-belling' })
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
      Scroll
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

  .custom-list-scroll
    position: absolute
    top: 40px
    bottom: 0
    left: 0
    right: 0
    .custom-list
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
        .call
          color: $color-AA905D
</style>
