<template>
  <div class="home">
    <router-link to="/account">go to account</router-link>
    <router-link to="/change-project">change-project</router-link>
    <div class="test">123</div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Home'
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .home
    fill-box()
    background: #fff
    .test
      background: red
</style>
