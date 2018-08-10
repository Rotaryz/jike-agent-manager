<template>
  <div class="login">
    <button @click="login">登录</button>
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
</style>
