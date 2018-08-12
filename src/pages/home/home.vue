<template>
  <div class="home">
    <header class="header">
      <h3 class="company">广州波士卡汽车有限公司</h3>
      <h4 class="position">创业合伙人</h4>
      <div class="money">289.00</div>
      <div class="explain">今日实际收入</div>
      <ul class="data-wrapper">
        <li class="data-item">
          <div class="top">10222</div>
          <div class="bottom">账号销售/个</div>
        </li>
        <li class="data-item">
          <div class="top">1022222</div>
          <div class="bottom">推荐加盟/人</div>
        </li>
        <li class="data-item">
          <div class="top">102222</div>
          <div class="bottom">分销单数/单</div>
        </li>
      </ul>
      <div class="account">
        <div class="icon-a"></div>
      </div>
    </header>
    <section class="content">
      <div class="tab-container">
        <div class="tab-line-wrapper" :style="'transform :translate3d('+ tabIndex*100 +'%,0,0)'">
          <div class="tab-line"></div>
        </div>
        <ul class="tab-wrapper">
          <li class="tab-item" :class="tabIndex===index?'active':''"
              v-for="(item,index) in tabInfo"
              :key="index"
              @click="changeTab(index)">
            {{item}}
          </li>
        </ul>
      </div>
      <ul class="entry-wrapper" :style="'transform :translate3d('+ -tabIndex*100/3 +'%,0,0)'">
        <li class="entry-item one">
          <div class="item">
            <div class="icon"></div>
            <p class="txt">开单销售</p>
          </div>
          <div class="item">
            <div class="icon"></div>
            <p class="txt">销售记录</p>
          </div>
        </li>
        <li class="entry-item two"></li>
        <li class="entry-item three"></li>
      </ul>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import {BASE_URL} from 'common/js/config'
  import {Jwt} from 'api'
  import storage from 'storage-controller'
  import Toast from 'components/toast/toast'

  const tabInfo = ['管账号', '管人', '管钱']
  export default {
    name: 'Home',
    components: {
      Toast
    },
    data() {
      return {
        tabInfo,
        tabIndex: 0
      }
    },
    methods: {
      changeTab(index) {
        console.log(index)
        this.tabIndex = index
      },
      show() {
        this.$refs.toast.show('asdhaskjda')
      },
      changeWS() {
        storage.set('project', 'ws')
        BASE_URL.api = BASE_URL.api.replace(/(ws|business)/g, 'ws')
        Jwt.login(123, 123321)
      },
      changeZT() {
        storage.set('project', 'business')
        BASE_URL.api = BASE_URL.api.replace(/(ws|business)/g, 'business')
        console.log(BASE_URL.api)
        Jwt.getCode(9823)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .home
    background: #fff
    .header
      position: relative
      background-image: linear-gradient(-180deg, #2D2C28 0%, #3D3834 100%)
      layout()
      align-items: center
      padding-top: 27px
      .company
        font-family: $font-family-regular
        font-size: $font-size-12
        color: $color-A3A2A0
        text-align: center
        line-height: 1
      .position
        font-family: $font-family-light
        font-size: $font-size-12
        color: $color-9E8F70
        text-align: center
        line-height: 1
        padding: 3.5px 5px
        background: rgba(195, 166, 108, 0.05)
        border: 0.5px solid $color-676052
        border-radius: 100px
        margin-top: 11px
      .money
        font-family: $font-family-bold
        font-size: 60px
        color: $color-C3A66C
        letter-spacing: 1px
        text-align: center
        margin-top: 31.5px
      .explain
        font-family: $font-family-regular
        font-size: $font-size-12
        color: $color-676052
        text-align: center
        margin-top: 1px
      .data-wrapper
        padding: 34px 15.5px 15px
        width: 100vw
        box-sizing: border-box
        layout(row, block, nowrap)
        justify-content: space-between
        .data-item
          .top
            font-family: $font-family-bold
            font-size: $font-size-24
            color: $color-C3A66C
            text-align: center
          .bottom
            font-family: $font-family-regular
            font-size: $font-size-12
            color: $color-776B54
            text-align: center
            margin-top: 4.5px
      .account
        position: absolute
        right: 0
        top: 16px
        width: 42px
        height: 33px
        background: rgba(255, 255, 255, 0.06)
        border-radius: 33px 0 0 33px
        layout(row)
        align-items: center
        .icon-a
          margin-left: 7px
          width: 24px
          height: 24px
          icon-image(icon-center_home)

    .content
      position: relative
      overflow: hidden
      .tab-container
        height: 44.5px
        width: 100vw
        position: relative
        .tab-wrapper
          position: relative
          height: 100%
          layout(row, block, nowrap)
          align-items: center
          justify-content: space-between
          border-bottom: 0.5px solid $color-E4E4E4
          .tab-item
            flex: 1
            height: 100%
            line-height: 44.5px
            font-family: $font-family-regular
            font-size: $font-size-16
            color: $color-343439
            text-align: center
            transition: color 0.3s
            &.active
              color: $color-C3A66C
        .tab-line-wrapper
          height: 100%
          width: 33.333%
          position: absolute
          top: 0
          left: 0
          layout()
          justify-content: flex-end
          align-items: center
          transition: all 0.3s
          .tab-line
            width: 34px
            height: 2.5px
            background: $color-C3A66C
      .entry-wrapper
        position: relative
        height: 120px
        width: 300vw
        transition: all 0.3s
        .entry-item
          height: 100%
          width: 100vw
          float: left
          layout(row,block,nowrap)
          .item
            height :100%
            width :33.33%
</style>
