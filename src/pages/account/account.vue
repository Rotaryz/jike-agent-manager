<template>
  <div class="account">
    <button @click="toTest">to test</button>
    <router-link to="/change-project">go to cp</router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Account',
    data() {
      return {
        test: 0
      }
    },
    methods: {
      toTest() {
        console.log(++this.test)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .account
    fill-box()
    background: #fff
</style>
