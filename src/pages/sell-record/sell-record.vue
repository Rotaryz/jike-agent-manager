<template>
  <div class="sell-record">
    <header class="header">
      <p>客户</p>
      <p>购买金额/元</p>
    </header>
    <section class="msg-list">
      <ul class="main">
        <li v-for="(item,index) in msg" :key="index" class="list" @click="jump(item.title)">
          <div class="name">{{ item.title }}</div>
          <div class="money">{{ item.money }}</div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'sell-record',
    props: {
    },
    data() {
      return {
        msg: [
          {
            title: '国颐堂美发有限公司',
            money: '9,988'
          },
          {
            title: '国颐堂美发有限公司',
            money: '9,988'
          },
          {
            title: '国颐堂美发有限公司',
            money: '9,988'
          },
          {
            title: '国颐堂美发有限公司',
            money: '9,988'
          },
          {
            title: '国颐堂美发有限公司',
            money: '9,988'
          },
          {
            title: '国颐堂美发有限公司',
            money: '9,988'
          },
          {
            title: '国颐堂美发有限公司',
            money: '9,988'
          },
          {
            title: '国颐堂美发有限公司',
            money: '9,988'
          },
          {
            title: '国颐堂美发有限公司',
            money: '9,988'
          },
          {
            title: '国颐堂美发有限公司',
            money: '9,988'
          },
          {
            title: '国颐堂美发有限公司',
            money: '9,988'
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
      jump(name) {
        this.$router.push({path: '/sell-detail', query: {name}})
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

  .msg-list
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
      .money
        color: $color-AA905D
</style>
