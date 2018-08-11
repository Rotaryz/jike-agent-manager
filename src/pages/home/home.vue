<template>
  <div class="home">
    <router-link to="/account">go to account</router-link>
    <router-link to="/change-project">change-project</router-link>
    <div class="test">123</div>
    <div>
      <button @click="changeWS">微商</button>
    </div>
    <hr>
    <div>
      <button @click="changeZT">智推</button>
    </div>
    <form>
      <select name="cars">
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="fiat">Fiat</option>
        <option value="audi">Audi</option>
      </select>
    </form>
    <div @click="show">toooo</div>
    <toast ref="toast"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import { BASE_URL } from 'common/js/config'
  import { Jwt } from 'api'
  import storage from 'storage-controller'
  import Toast from 'components/toast/toast'

  console.log(storage)
  export default {
    name: 'Home',
    components: {
      Toast
    },
    methods: {
      show() {
        this.$refs.toast.show('asdhaskjda')
      },
      changeWS() {
        storage.set('project', 'ws')
        BASE_URL.api = BASE_URL.api.replace(/(ws|business)/g, 'ws')
        Jwt.login(123, 123321)
      },
      changeZT() {
        storage.set('project', 'business')
        BASE_URL.api = BASE_URL.api.replace(/(ws|business)/g, 'business')
        console.log(BASE_URL.api)
        Jwt.getCode(9823)
      }
    }
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
