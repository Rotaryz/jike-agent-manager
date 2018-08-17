<template>
  <transition name="fade">
    <div class="tab-bg" v-show="show" @click="tabCancel">
      <div class="tab-list" @click.stop>
        <h3 class="title">行业类型</h3>
        <div class="tab">
          <div class="tab-left">
            <ul>
              <li class="list border-bottom-1px" :class="tabLeftIndex == i && 'on'" v-for="(val, i) in industryList" v-if="val&&val.parent_id === 0" :key="i" @click="tabLeftClick(i)">{{ val&&val.name }}</li>
            </ul>
          </div>
          <div class="tab-right">
            <li class="list border-bottom-1px" :class="tabRightIndex == i && 'on'" v-for="(val, i) in industry" :key="i" @click="tabRightClick(i)">{{ val&&val.name }}</li>
          </div>
        </div>
        <div class="confirm-btn border-top-1px">
          <span class="pop-btn border-right-1px" @click="tabCancel">取消</span>
          <span class="pop-btn right" @click="tabConfirm">确定</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    props: [
      'tabLeftIndex', // 左边tab栏选中
      'tabRightIndex', // 右边tab栏选中
      'industryList',
      'show'
    ],
    data() {
      return {
      }
    },
    computed: {
      industry() {
        let industry = this.industryList[this.tabLeftIndex] ? this.industryList[this.tabLeftIndex].industry : []
        return industry
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      tabLeftClick(num) { // 左tab栏点击
        this.$emit('tabLeftClick', num)
      },
      tabRightClick(num) { // 右tab栏点击
        this.$emit('tabRightClick', num)
      },
      tabCancel() { // 取消选择职业类型
        this.$emit('tabCancel')
      },
      tabConfirm() { // 确定选择职业类型
        this.$emit('tabConfirm')
      }
    },
    watch: {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .tab-bg
    font-family: PingFang-SC-Regular
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    background: rgba(0,0,0,0.7)
    .tab-list
      position: absolute
      left: 0
      right: 0
      top: 13.6vh
      margin: 0 auto
      width: 80%
      height: 415px
      background: $color-white
      text-align: center
      overflow: hidden
      border-radius: 8px
    .title
      height: 45px
      line-height: 45px
      background: $color-C3A66C
      font-size: 16px
      color: $color-white

    .tab
      height: 325px
      overflow:hidden
      display: flex
      font-size: $font-size-14
      color: $color-20202E
      .tab-left
        width: 115px
        height: 100%
        overflow-y: scroll
        background: $color-F3F3F3
        .list
          height: 40px
          line-height: 40px
          border-bottom-1px(#E1E1E1)
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          &.on
            color: $color-C3A66C
      .tab-right
        flex: 1
        height: 100%
        overflow-y: scroll
        .list
          height: 40px
          line-height: 40px
          border-bottom-1px(#E1E1E1)
          text-align: left
          margin-left: 22px
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          &.on
            color: $color-C3A66C
    .confirm-btn
      box-sizing: border-box
      height: 45px
      display: flex
      line-height: 45px
      border-top-1px($color-CFCFCF)
      font-size: 16px
      .pop-btn
        width: 50%
        box-sizing: border-box
        border-right-1px($color-CFCFCF)
        color: $color-A6A6A6
        &.right
          border-right: 0
          color: $color-C3A66C

  .show
    background: rgba(0,0,0,0.7)
    z-index: 10
    .tab-list
      opacity: 1

</style>
