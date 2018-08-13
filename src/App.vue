<template>
  <div id="app">
    <transition :name="entryAnimation">
      <keep-alive v-if="keepAlive">
        <router-view/>
      </keep-alive>
      <router-view v-else></router-view>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import storage from 'storage-controller'

  const COMPONENT_NAME = 'App'

  export default {
    name: COMPONENT_NAME,
    data() {
      return {
        keepAlive: false,
        routerArr: [],
        entryAnimation: 'slide',
        index: 0
      }
    },
    created() {
      console.log(process.env)
      this._checkAuthorize()
    },
    methods: {
      _checkAuthorize() {
        if (this.hasToken) {
          this.$router.replace({path: '/home'})
        }
      }
    },
    computed: {
      hasToken() {
        return storage.has('token')
      }
    },
    watch: {
      '$route'(to, from) {
        if (to.query.changeProject) {
          this.routerArr = []
          this.entryAnimation = 'out'
          this.keepAlive = false
          to.query.changeProject = false
          window.history.pushState(null, null)
          return
        }
        this.keepAlive = to.meta.keepAlive
        let path = to.path
        let flag = this.routerArr.some(val => val === path)
        if (flag) {
          this.routerArr.pop()
          this.entryAnimation = 'out'
        } else {
          this.routerArr.push(path)
          this.entryAnimation = 'slide'
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/index"
</style>
