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
  const DEFAULT_TITLE = '代理商后台'
  const HOME_ROUTE = '/home'
  const DEFAULT_ROUTE = '/login'

  export default {
    name: COMPONENT_NAME,
    data() {
      return {
        keepAlive: false,
        routerArr: [],
        entryAnimation: 'slide',
        index: 0,
        currentRoute: ''
      }
    },
    created() {
      console.log(process.env)
      // this._checkAuthorize()
    },
    methods: {
      _checkAuthorize() {
        const hasToken = storage.has('token')
        if (!hasToken) {
          this.$router.replace({path: '/login'})
        }
      },
      _backNull(to) {
        if (to.path === HOME_ROUTE || to.path === DEFAULT_ROUTE) {
          this.routerArr = []
          this.entryAnimation = 'out'
          return true
        }
        return false
      },
      _changeAnimation(to) {
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
    },
    watch: {
      '$route'(to, from) {
        document.title = to.meta.title ? to.meta.title : DEFAULT_TITLE
        this.keepAlive = to.meta.keepAlive
        window.scrollTo(0, 0)
        this._checkAuthorize()
        if (this._backNull(to)) return
        this._changeAnimation(to)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/index"
</style>
