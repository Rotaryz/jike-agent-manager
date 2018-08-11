<template>
  <div class="manage-custom">
    <header class="header">
      <p class="custom">客户</p>
      <p class="money">总交易额/元</p>
      <p class="percent">开通率</p>
    </header>
    <section class="custom-list">
      <ul class="main">
        <li v-for="(item,index) in msg" :key="index" class="list" @click="jump(item.title)">
          <div class="msg">
            <div class="cus">
              <h4 class="title">{{ item.title }}</h4>
              <p class="count">购买账号数 {{ item.count }}个</p>
            </div>
            <div class="mon">{{ item.money }}</div>
            <div class="per">{{ item.percent }}%</div>
          </div>
          <div class="progress">
            <div class="gress" :style="{ width:`${item.percent}%`}"></div>
          </div>
        </li>
      </ul>
    </section>
    <footer class="bot-btn">
      <a href="/manage-custom/custom-create" class="btn">新建客户</a>
    </footer>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'Demo',
    props: {
    },
    data() {
      return {
        msg: [
          {
            title: '广州博士卡汽车有限公司',
            count: 4,
            money: '300.00',
            percent: 70
          }, {
            title: '广州博士卡汽车有限公司',
            count: 4,
            money: '300.00',
            percent: 20
          }, {
            title: '广州博士卡汽车有限公司',
            count: 4,
            money: '300.00',
            percent: 90
          }, {
            title: '广州博士卡汽车有限公司',
            count: 4,
            money: '300.00',
            percent: 60
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
        this.$router.push({path: '/custom-detail', query: {name}})
      }
    },
    watch: {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.manage-custom
  .header
    background: #F3F3F3
    color: #848484
    font-size: $font-size-12
    height: 40px
    line-height: 40px
    text-align: center
    padding: 0 15px
    display: flex
    .custom
      width: 50%
      text-align: left
    .money
      width: 25%
    .percent
      width: 25%
      text-align right

  .custom-list
    padding: 0 15px
    background: $color-white
    .list
      padding: 20px 0
      color: #AA905D
      font-size: $font-size-14
      .msg
        display: flex
        .cus
          width: 50%
          text-align: left
          .title
            font-size: $font-size-14
            color: #343439
            padding-right: 10px
            no-wrap()
          .count
            font-size: $font-size-12
            color: #A6A6A6
            padding-top: 6px
        .mon
          width: 25%
          text-align: center
        .per
          width: 25%
          text-align right
      .progress
        background: #F8F8F8
        border-radius: 100px
        height: 2px
        margin-top: 14px
        .gress
          background: linear-gradient(90deg, #EADBB4 0%, #DFBB72 100%)
          height: 2px
          border-radius: 100px

  .bot-btn
    position: fixed
    bottom: 0
    left: 0
    width: 100%;
    background: $color-white
    padding: 10px 15px
    box-sizing: border-box
    border-top-1px(#e3e3e3)
    height: 65px
  .btn
    background: $color-C3A66C
    font-size: $font-size-16
    color: #FFFFFF
    text-align: center
    border-radius: 4px
    height: 45px
    line-height: 45px
    display: block
</style>
