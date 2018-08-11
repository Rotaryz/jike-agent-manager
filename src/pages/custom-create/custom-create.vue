<template>
  <div class="custom-create">
    <p>我什么都不知道</p>
    <router-link to="/hello-world">点击跳转</router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'custom-create',
    props: {
    },
    data() {
      return {
        value: 'suibian'
      }
    },
    created() {
    },
    mounted() {
    },
    computed: {
    },
    methods: {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .demo
    display: flex
    justify-content: space-around
    align-items: center
    height: 60px
    border: 1px solid $color-row-line
    font-size: 12px
</style>
