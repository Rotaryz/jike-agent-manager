<template>
  <div class="home">
    <header class="header" v-if="isWD">
      <h3 class="company">{{userInfo?userInfo.company_name:''}}</h3>
      <h4 class="position">{{userInfo?userInfo.role_name:''}}</h4>
      <div class="money">{{userInfo?userInfo.real_income:0}}</div>
      <div class="explain">今日实际收入</div>
      <ul class="data-wrapper">
        <li class="data-item">
          <div class="top">{{userInfo?userInfo.account_sale:0}}</div>
          <div class="bottom">账号销售/个</div>
        </li>
        <li class="data-item">
          <div class="top">{{userInfo?userInfo.invite_join:0}}</div>
          <div class="bottom">推荐加盟/人</div>
        </li>
        <li class="data-item">
          <div class="top">{{userInfo?userInfo.sale_count:0}}</div>
          <div class="bottom">分销单数/单</div>
        </li>
      </ul>
      <router-link to="/account" class="account">
        <div class="icon-a"></div>
      </router-link>
    </header>
    <header class="header zt" v-else>
      <h3 class="company">{{userInfo?userInfo.company_name:''}}</h3>
      <h4 class="position">{{userInfo?userInfo.role_name:''}}</h4>
      <ul class="data-wrapper zt">
        <li class="data-item">
          <div class="top zt">{{userInfo?userInfo.real_income:0}}</div>
          <div class="bottom">今日收入/元</div>
        </li>
        <li class="data-item">
          <div class="top zt">{{userInfo?userInfo.sale_count:0}}</div>
          <div class="bottom">今日销量/个</div>
        </li>
      </ul>
      <router-link to="/account" class="account">
        <div class="icon-a"></div>
      </router-link>
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
          <router-link class="item" to="/sell-belling">
            <div class="icon open-home"></div>
            <p class="txt">开单销售</p>
          </router-link>
          <router-link class="item" to="/sell-record">
            <div class="icon record-home"></div>
            <p class="txt">销售记录</p>
          </router-link>
        </li>
        <li class="entry-item two">
          <router-link class="item" to="/manage-custom">
            <div class="icon customer-home"></div>
            <p class="txt">客户管理</p>
          </router-link>
          <router-link class="item" v-if="isWD" to="/manage-agent">
            <div class="icon agent-home"></div>
            <p class="txt">推荐代理商</p>
          </router-link>
          <router-link class="item" v-if="isWD" to="/my-team">
            <div class="icon my-team"></div>
            <p class="txt">我的团队</p>
          </router-link>
        </li>
        <li class="entry-item three">
          <router-link class="item" :to="isWD?'/money-income-ws':'/money-income-zt'">
            <div class="icon profit-details"></div>
            <p class="txt">收益明细</p>
          </router-link>
          <router-link class="item" to="/money-wallet" v-if="isWD">
            <div class="icon my-wallet"></div>
            <p class="txt">我的钱包</p>
          </router-link>
        </li>
      </ul>
    </section>
    <div class="f3"></div>
    <section class="charts">
      <div class="title">
        <div class="txt">生意概览</div>
        <router-link class="more" to="/ai-trade">更多</router-link>
      </div>
      <article class="charts-container">
        <div class="c-title">我的收入</div>
        <div class="c-wrapper" @click="test"></div>
      </article>
    </section>
    <toast ref="toast"></toast>
    <awesome-picker
      ref="picker"
      :data="cityData"
      @cancel="handlePickerCancel"
      @confirm="handlePickerConfirm">
    </awesome-picker>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Home } from 'api'
  import storage from 'storage-controller'
  import Toast from 'components/toast/toast'
  import { ERR_OK } from 'common/js/config'
  import { PROJECT_ARR, WEI_SHANG } from 'common/js/constant'
  import { cityData } from 'common/js/utils'

  const tabInfo = ['管账号', '管人', '管钱']

  export default {
    name: 'Home',
    components: {
      Toast
    },
    data() {
      return {
        tabInfo,
        cityData,
        tabIndex: 0,
        userInfo: null,
        isWD: true
      }
    },
    created() {
      this._getProject()
      this._getHomeInfo()
    },
    methods: {
      test() {
        console.log(2222)
        this.$refs.picker.show()
      },
      handlePickerCancel(e) {
        console.log(e)
      },
      handlePickerConfirm(e) {
        console.log(e)
      },
      changeTab(index) {
        this.tabIndex = index
      },
      show() {
      },
      _getProject() {
        const project = storage.get('project')
        const obj = PROJECT_ARR.find(val => val.project === project)
        document.title = obj.name
        this.isWD = project === WEI_SHANG.project
        // obj && (this.selectTab = obj.application - 1)
      },
      _getHomeInfo() {
        Home.getHomeInfo().then(res => {
          if (res.error !== ERR_OK) {
            this.$refs.toast.show(res.message)
            return
          }
          this.userInfo = res.data
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .home
    background: #fff
    min-height: 100vh
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
        position: relative
        &.zt
          justify-content: space-around
          padding: 20px
        &.zt:after
          content: ''
          height: 43px
          width: 1px
          background: $color-676052
          row-center()
        .data-item
          .top
            font-family: $font-family-bold
            font-size: $font-size-24
            color: $color-C3A66C
            text-align: center
            &.zt
              font-size: 30px
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
          layout(row, block, nowrap)
          .item
            height: 100%
            width: 33.33333%
            layout()
            justify-content: center
            align-items: center
            .icon
              width: 30px
              height: 30px
              &.open-home
                icon-image(icon-open_home)
              &.record-home
                icon-image(icon-record_home)
              &.customer-home
                icon-image(icon-customer_home)
              &.agent-home
                icon-image(icon-recommender_home)
              &.my-team
                icon-image(icon-myteam_home)
              &.profit-details
                icon-image(icon-profitdetails_home)
              &.my-wallet
                icon-image(icon-mywallet_home)
            .txt
              font-family: $font-family-light
              font-size: $font-size-12
              color: $color-AA905D
              text-align: center
              margin-top: 8px
    .f3
      height: 7px
      background: $color-F3F3F3
    .charts
      .title
        layout(row)
        justify-content: space-between
        padding: 20.5px 0 15px
        font-family: $font-family-regular
        .txt
          font-size: $font-size-16
          color: $color-343439
          padding-left: 15px
          position: relative
          &:before
            content: ''
            col-center()
            width: 3.5px
            height: 22px
            background: $color-C3A66C
            left: 0
        .more
          font-size: 13px
          color: $color-CFCFCF
          padding-right: 10.85px
          margin-right: 11.65px
          bg-image(icon-arrow_home)
          background-size: 9.4px 9.4px
          background-position: right 1.6px
          background-repeat: no-repeat
          position: relative
          &:after
            content: ''
            position: absolute
            width: 100px
            height: 40px
            left: -20px
            top: -20px
            right: -20px
            border-bottom: -20px
      .charts-container
        .c-title
          font-family: $font-family-regular
          font-size: $font-size-12
          color: $color-343439
          text-align: center
          padding-bottom: 11px
        .c-wrapper
          height: 217.5px
</style>
