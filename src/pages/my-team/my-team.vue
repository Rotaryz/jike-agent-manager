<template>
  <div class="team-box">
    <div class="trade-scroll">
      <scroll ref="scroll"
              :probeType="probeType"
              :bcColor="bcColor"
              :data="dataArray"
              :listenScroll="listenScroll"
              :pullUpLoad="pullUpLoadObj"
              @pullingUp="onPullingUp">
        <div class="test">111</div>
        <div class="test">111</div>
        <div class="test">111</div>
        <div class="test">111</div>
        <div class="test">111</div>
        <div class="test">111</div>
        <div class="test">111</div>
        <div class="test">111</div>
        <div class="test">111</div>
        <div class="test">111</div>
        <div class="test">111</div>
        <div class="test">111</div>
        <div class="test">111</div>
        <div class="test">111</div>
        <div class="test">111</div>
        <div class="test">111</div>
        <div class="test">111</div>
        <div class="test">111</div>
        <div class="test">111</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">222</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">333</div>
        <div class="test">444</div>
        <div class="test">444</div>
        <div class="test">444</div>
        <div class="test">444</div>
        <div class="test">444</div>
        <div class="test">444</div>
        <div class="test">444</div>
        <div class="test">444</div>
        <div class="test">444</div>
        <div class="test">444</div>
        <div class="test">444</div>
        <div class="test">444</div>
        <div class="test">444</div>
        <div class="test">444</div>
      </scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Scroll from 'components/scroll/scroll'
  import Toast from 'components/toast/toast'

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
        pullUpLoadNoMoreTxt: '没有更多了'
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

</style>
