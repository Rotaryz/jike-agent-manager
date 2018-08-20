<template>
  <div class="login">
    <header class="header">
      <div class="logo"></div>
      <div class="title">代理商管理系统</div>
    </header>
    <form action="" class="content">
      <section class="input-wrapper mobile border-bottom-1px">
        <div class="option">手机号</div>
        <input class="input" type="number" placeholder="请输入手机号码" maxlength="11" v-model="phoneNumber">
        <div class="get-code" v-if="allowGetCode" @click="getCode">获取验证码</div>
        <div class="get-code coding" v-else>重新获取{{codeSeconds}}s</div>
      </section>
      <section class="input-wrapper border-bottom-1px">
        <div class="option">验证码</div>
        <input class="input" type="number" placeholder="请输入验证码" maxlength="11" v-model="authCode">
      </section>
      <!--<section class="input-wrapper more border-bottom-1px" @click="showSelect">-->
        <!--<div class="option">{{project[selectIndex].name}}</div>-->
        <!--<div class="icon-more"></div>-->
      <!--</section>-->
      <div class="btn-login" @click="login">
        <span>登录</span>
        <!--<ul class="more-wrapper" :class="isShowSelect?'show':''">-->
          <!--<li class="more-item border-bottom-1px" v-for="(item,index) in project" :key="index" @click.stop="changeProject(index)">-->
            <!--<div>{{item.name}}</div>-->
            <!--<div class="icon" :class="selectIndex===index?'active':''"></div>-->
          <!--</li>-->
        <!--</ul>-->
      </div>
    </form>
    <footer class="footer">商机 · 智能 · 裂变 · 创业</footer>
    <toast ref="toast"></toast>
    <loading ref="loader"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
  import { PROJECT_ARR, WEI_SHANG } from 'common/js/constant'
  import utils from 'common/js/utils'
  import Toast from 'components/toast/toast'
  import storage from 'storage-controller'
  import { Jwt } from 'api'
  import { ERR_OK } from 'common/js/config'
  import { mapActions } from 'vuex'
  import Loading from 'components/loading-css/loading-css'

  const project = PROJECT_ARR
  export default {
    name: 'Login',
    components: {
      Toast,
      Loading
    },
    data() {
      return {
        project,
        allowGetCode: true,
        codeSeconds: 60,
        timer: null,
        selectIndex: 0,
        isShowSelect: false,
        phoneNumber: '',
        authCode: '',
        allowLogin: true,
        projectOption: storage.get('project', WEI_SHANG.project)
      }
    },
    created() {
      this._checkAuthorize()
    },
    beforeDestroy() {
      this.timer && clearInterval(this.timer)
    },
    methods: {
      ...mapActions(['updateHomeTab']),
      _checkAuthorize() {
        if (this.hasToken) {
          this.$router.replace({path: '/'})
        }
      },
      login() {
        if (!this.allowLogin) return
        this.allowLogin = false
        if (!this._check()) return
        this.updateHomeTab(0)
        this.$refs.loader.show()
        Jwt.login(this.phoneNumber, this.authCode).then(res => {
          this.allowLogin = true
          this.$refs.loader.hide()
          if (res.error !== ERR_OK) {
            this.$refs.toast.show(res.message)
            return
          }
          this._saveAuthInfo(res)
          this.$router.push({path: '/change-project', query: {isFromLogin: true}})
        })
      },
      getCode() {
        if (!utils.checkIsPhoneNumber(this.phoneNumber)) {
          this.$refs.toast.show('请输入正确的手机号码')
          return
        }
        if (!this.allowGetCode) return
        this.allowGetCode = false
        this.timer = setInterval(() => {
          --this.codeSeconds
        }, 1000)
        Jwt.getCode(this.phoneNumber).then(res => {
          if (res.error !== ERR_OK) {
            this.$refs.toast.show(res.message)
          }
        })
      },
      // changeProject(index) {
      //   this.isShowSelect = false
      //   if (this.selectIndex === index) {
      //     return
      //   }
      //   this.selectIndex = index
      //   this._checkProject(index)
      // },
      // showSelect() {
      //   // this.isShowSelect = !this.isShowSelect // todo
      // },
      _check() {
        if (!utils.checkIsPhoneNumber(this.phoneNumber)) {
          this.$refs.toast.show('请输入正确的手机号码')
          this.allowLogin = true
          return false
        }
        if (!this.authCode) {
          this.$refs.toast.show('请输入验证码')
          this.allowLogin = true
          return false
        }
        return true
      },
      // 切换项目
      _checkProject(index) {
        this.projectOption = this.project[index].project
        storage.set('project', this.projectOption)
      },
      // 保存登录信息
      _saveAuthInfo(res) {
        storage.set('project', this.projectOption)
        storage.set('token', res.data.access_token)
        storage.set('agentInfo', res.data.agent_info)
      }
    },
    watch: {
      'codeSeconds'(curVal, oldVal) {
        if (curVal <= 0) {
          this.timer && clearInterval(this.timer)
          this.allowGetCode = true
          this.codeSeconds = 60
        }
      }
    },
    computed: {
      hasToken() {
        return storage.has('token')
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .login
    fill-box(fixed)
    background: #fff
    .header
      text-align: center
      padding-bottom: 52px
      .logo
        margin: 22.5px auto 16.5px
        width: 90px
        height: @width
        icon-image(icon-logo_login)
      .title
        font-family: $font-family-bold
        font-size: $font-size-16
        color: $color-2B2B2B
        line-height: 14px
        text-align: center
    .content
      padding: 0 15px
      font-family: $font-family-regular
      font-size: $font-size-14
      color: $color-666666
      line-height: 1
      .input-wrapper
        layout(row, block, nowrap)
        align-items: center
        margin-bottom: 19.4px
        height: 41px
        &:last-child
          margin-bottom: 0
        &.mobile
          .get-code
            font-family: $font-family-light
            padding: 5.5px 5px
            font-size: $font-size-12
            color: $color-C3A66C
            border-1px($color-C3A66C, 31px)
            &.coding
              border-1px($color-C1C3C3, 31px)
              color: $color-C1C3C3
        &.more
          justify-content: space-between
          position: relative
          .icon-more
            margin-right: 12px
            width: 12.5px
            height: 12.5px
            icon-image(icon-expand_login)
        .input
          height: 40px
          flex: 1
          margin-left: 15px
          font-size: $font-size-14
          color: $color-111313
          &::-webkit-input-placeholder
            color: $color-C1C3C3
            font-size: $font-size-12
          &:-moz-placeholder
            color: $color-C1C3C3
            font-size: $font-size-12
          &::-moz-placeholder
            color: $color-C1C3C3
            font-size: $font-size-12
          &:-ms-input-placeholder
            color: $color-C1C3C3
            font-size: $font-size-12
      .btn-login
        display: block
        margin: 42px 0 10px
        background: $color-C3A66C
        font-size: $font-size-16
        color: $color-FFFFFF
        text-align: center
        border-radius: 3px
        height: 44px
        line-height: 44px
        position: relative
        .more-wrapper
          position: absolute
          top: -90px
          left: 0
          right: 0
          background: $color-FFFFFF
          box-shadow: 0 13px 13px 0 rgba(0, 0, 0, 0.05);
          border-radius: 3px
          font-size: $font-size-14
          color: $color-666666
          line-height: 1
          height: 0
          overflow: hidden
          opacity: 0
          transition: all 0.3s
          border-1px($color-col-line)
          &.show
            height: 120px
            opacity: 1
          .more-item
            height: 59px
            layout(row, block, nowrap)
            align-items: center
            justify-content: space-between
            padding: 0 15px
            &:last-child
              border-none()
            .icon
              width: 20px
              height: 20px
              border-radius: 50%
              border: 0.5px solid $color-C3A66C
              box-sizing: border-box
              &.active
                icon-image(icon-select_recommender)
                border: none
    .footer
      font-family: $font-family-regular
      font-size: $font-size-12
      color: $color-C3A66C
      line-height: 14px
      text-align: center
</style>
