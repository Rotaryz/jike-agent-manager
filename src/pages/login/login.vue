<template>
  <div class="login">
    <header class="header">
      <div class="logo"></div>
      <div class="title">代理商管理系统</div>
    </header>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Login',
    data() {
      return {}
    },
    methods: {
      login() {
        this.$router.push({path: '/home'})
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .login
    fill-box()
    background: #fff
    .header
      .logo
        margin: 10px auto 1px
        width: 118px
        height: 118px
        border: 1px solid #000
      .title
        font-family: $font-family-bold
        font-size: $font-size-16
        color: $color-2B2B2B
        line-height: 14px
        text-align: center
</style>
