<template>
  <div class="account">
    <div class="f3"></div>
    <section class="info-wrapper">
      <div class="item-wrapper avatar-item">
        <div class="left">更换头像</div>
        <div class="middle"></div>
        <div class="right avatar-right">
          <div class="avatar"></div>
          <div class="arrow-right"></div>
        </div>
      </div>
      <router-link class="item-wrapper" to="/change-project">
        <div class="left">当前项目</div>
        <div class="middle">赞播AI微店</div>
        <div class="right project-right">
          <div>切换</div>
          <div class="arrow-right"></div>
        </div>
      </router-link>
      <div class="item-wrapper">
        <div class="left">代理商名称</div>
        <div class="middle">广州波士卡汽车有限公司</div>
      </div>
      <div class="item-wrapper">
        <div class="left">代理级别</div>
        <div class="middle">县级A类代理</div>
      </div>
      <div class="item-wrapper">
        <div class="left">所在地区</div>
        <div class="middle">广东-广州--越秀</div>
      </div>
      <div class="item-wrapper" @click="showMask">
        <div class="left">AI商城数量</div>
        <div class="right project-right">
          <div>10/200</div>
          <div class="arrow-right"></div>
        </div>
      </div>
    </section>
    <footer class="btn-cancel">退出登录</footer>
    <article class="mask-wrapper" :class="isShow?'show':''">
      <div class="content-wrapper">
        <div class="title">提示</div>
        <div class="explain">数值为“已开通数/最大开通数”，若需要增加最大开通数，请联系平台客服。电话：400-8871-855</div>
        <a :href="'tel:'+phoneNumber" class="btn-phone" @click="callMobile">立即拨打</a>
      </div>
    </article>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Account',
    data() {
      return {
        isShow: false,
        phoneNumber: '400-8871-855'
      }
    },
    methods: {
      showMask() {
        this.isShow = true
      },
      callMobile() {
        this.isShow = false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .mask-wrapper
    fill-box(fixed)
    background: $color-mask-bg
    z-index: -1
    opacity: 0
    transition: all 0.3s
    &.show
      z-index: 999
      opacity: 1
    .content-wrapper
      width: 300px
      margin: 174px auto
      box-sizing: border-box
      background: #FFFFFF
      border-radius: 3px
      .title
        font-family: $font-family-medium
        font-size: $font-size-16
        color: $color-20202E
        letter-spacing: 0.8px
        text-align: center
        line-height: 1
        padding-top: 18px
      .explain
        font-family: $font-family-regular
        font-size: $font-size-14
        color: $color-343439
        line-height: 1.6
        padding 16px 22.5px 26px
      .btn-phone
        display: block
        border: 0.5px solid rgba(32, 32, 46, 0.10)
        border-radius: 3px
        font-family: $font-family-regular
        font-size: $font-size-16
        color: $color-C3A66C
        letter-spacing: 0.69px
        text-align: center;
        line-height: 45px
      .phone-input
        position: absolute
        z-index: -1
        opacity: 0

  .arrow-right
    margin-left: 5.5px
    width: 9.4px
    height: 9.4px
    icon-image(icon-arrow_home)

  .account
    fill-box(fixed)
    background: #fff
    .f3
      height: 7px
      background: $color-F3F3F3
    .info-wrapper
      padding-left: 15px
      font-family: $font-family-regular
      .item-wrapper
        height: 60px
        border-bottom: 0.5px solid $color-E4E4E4
        line-height: 60px
        layout(row, block, nowrap)
        &.avatar-item
          height: 78px
          line-height: 78px
        .left
          width: 83px
          font-size: $font-size-14
          color: $color-666666
        .right
          flex: 1
          font-size: $font-size-14
          color: $color-666666
          layout(row, block, nowrap)
          justify-content: flex-end
          margin-right: 15px
          &.avatar-right, &.project-right
            layout(row, block, nowrap)
            align-items: center
          .avatar
            width: 48px
            height: 48px
            border-radius: 3px
            background: red
        .middle
          font-size: $font-size-14
          color: $color-343439

    .btn-cancel
      position: fixed
      bottom: 17px
      left: 15px
      right: 15px
      font-family: $font-family-regular
      font-size: $font-size-16
      color: $color-C3A66C
      text-align: center
      height: 44px
      line-height: 44px
      border: 0.5px solid $color-C3A66C
      border-radius: 3px
</style>
