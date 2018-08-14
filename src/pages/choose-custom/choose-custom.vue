<template>
  <div class="choose-custom">
    <header class="header">
      <p>客户</p>
      <p>手机号码</p>
    </header>
    <section class="custom-list">
      <ul class="main">
        <li v-for="(item,index) in msg" :key="index" class="list" @click="selecCustom(msg[index])">
          <div class="name">{{ item.title }}</div>
          <div class="call">{{ item.call }}</div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'choose-custom',
    props: {
    },
    data() {
      return {
        msg: [
          {
            title: '国颐堂美发有限公司',
            call: '16620141178'
          },
          {
            title: '国颐堂美发有限公司',
            call: '16620141178'
          },
          {
            title: '国颐堂美发有限公司',
            call: '16620141178'
          },
          {
            title: '国颐堂美发有限公司',
            call: '16620141178'
          },
          {
            title: '国颐堂美发有限公司',
            call: '16620141178'
          },
          {
            title: '国颐堂美发有限公司',
            call: '16620141178'
          },
          {
            title: '国颐堂美发有限公司',
            call: '16620141178'
          },
          {
            title: '国颐堂美发有限公司',
            call: '16620141178'
          },
          {
            title: '国颐堂美发有限公司',
            call: '16620141178'
          },
          {
            title: '国颐堂美发有限公司',
            call: '16620141178'
          },
          {
            title: '国颐堂美发有限公司',
            call: '16620141178'
          }
        ]
      }
    },
    created() {
    },
    mounted() {
    },
    computed: {
    },
    methods: {
      selecCustom(obj) {
        this.$store.commit('SELEC_CUSTOM', obj)
        this.$router.push({ path: '/sell-belling' })
      }
    },
    watch: {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .header
    background: $color-F3F3F3
    color: $color-848484
    font-size: $font-size-12
    height: 40px
    line-height: 40px
    text-align: left
    padding: 0 15px
    display: flex
    justify-content: space-between

  .custom-list
    padding: 0 15px
    .list
      display: flex
      justify-content: space-between
      font-size: $font-size-14
      height: 60px
      line-height: 60px
      border-bottom: 1px solid $color-E3E6E9
      .name
        color: $color-343439
      .call
        color: $color-AA905D
</style>
