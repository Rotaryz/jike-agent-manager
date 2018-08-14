<template>
  <div class="tab-bg">
    <div class="tab-list">
      <h3 class="title">行业类型</h3>
      <div class="tab">
        <div class="tab-left">
          <ul>
            <li class="list" :class="tabLeftIndex == i && 'on'" v-for="(val, i) in tabLeftList" :key="i" @click="tabLeftClick(i)">{{ val }}</li>
          </ul>
        </div>
        <div class="tab-right">
          <li class="list" :class="tabRightIndex == i && 'on'" v-for="(val, i) in tabRightList[tabLeftIndex]" :key="i" @click="tabRightClick(i)">{{ val }}</li>
        </div>
      </div>
      <div class="confirm-btn">
        <span class="pop-btn" @click="tabCancel">取消</span>
        <span class="pop-btn right" @click="tabConfirm">确定</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: [
      'tabLeftIndex', // 左边tab栏列表
      'tabRightIndex', // 右边tab栏列表
      'tabLeftList',
      'tabRightList'
    ],
    data() {
      return {
      }
    },
    computed: {
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
      top: 20%
      margin: 0 auto
      width: 80%
      height: 360px
      background: $color-white
      text-align: center
    .title
      height: 40px
      line-height: 40px
      font-size: 16px
      color: $color-white
      background-image: linear-gradient(180deg, #2D2C28 0%, #3D3834 100%)

    .tab
      height: 280px
      overflow:hidden
      display: flex
      font-size: $font-size-14
      .tab-left
        width: 80px
        height: 100%
        overflow-y: scroll
        background: $color-E4E4E4
        .list
          padding: 8px 0
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          &.on
            background: $color-white
            color: $color-C3A66C
      .tab-right
        flex: 1
        height: 100%
        overflow-y: scroll
        .list
          padding: 8px 0
          border-bottom: 1px solid $color-E3E6E9
          text-align: left
          margin-left: 10px
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          &.on
            color: $color-C3A66C
    .confirm-btn
      box-sizing: border-box
      height: 40px
      display: flex
      line-height: 40px
      border-top: 1px solid $color-E3E6E9
      .pop-btn
        width: 50%
        box-sizing: border-box
        border-right: 1px solid $color-E3E6E9
        color: $color-C1C3C3
        &.right
          border-right: 0
          color: $color-C3A66C

</style>
