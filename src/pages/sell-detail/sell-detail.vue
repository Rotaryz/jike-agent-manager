<template>
  <div class="sell-detail">
    <ul class="input-list">
      <li class="list">
        <div class="name">客户</div>
        <input class="input" type="text" readonly v-model="form.name" placeholder="">
      </li>
      <li class="list">
        <div class="name">手机号码</div>
        <input class="input" type="text" readonly v-model="form.mobile" placeholder="">
      </li>
      <li class="list">
        <div class="name">所在地区</div>
        <input class="input" type="text" readonly v-model="form.address" placeholder="">
        <div class="icon"></div>
      </li>
      <li class="list">
        <div class="name">所属行业</div>
        <input class="input" type="text" readonly v-model="form.industry" placeholder="">
        <div class="icon"></div>
      </li>
    </ul>
    <ul class="input-list">
      <li class="list">
        <div class="name">商品名称</div>
        <input class="input" type="text" readonly v-model="form.title" placeholder="">
      </li>
      <li class="list">
        <div class="name">购买单价</div>
        <input class="input" type="text" readonly v-model="form.price" placeholder="">
      </li>
      <li class="list">
        <div class="name">数量</div>
        <input class="input" type="text" readonly v-model="form.num" placeholder="">
        <div class="icon"></div>
      </li>
      <li class="list">
        <div class="name">销售总价</div>
        <input class="input" type="text" readonly v-model="form.total_price" placeholder="">
        <div class="icon"></div>
      </li>
    </ul>
    <div class="remark">
      <div class="name">卖家备注</div>
      <p class="remarkTxt">{{ form.note }}</p>
    </div>
    <toast ref="toast"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Custom } from 'api'
  import { ERR_OK } from 'common/js/config'
  import Toast from 'components/toast/toast'

  export default {
    name: 'sell-detail',
    props: {
    },
    data() {
      return {
        form: {
          name: '',
          mobile: '',
          address: '',
          industry: '',
          title: '',
          price: '',
          num: '',
          total_price: '',
          note: ''
        }
      }
    },
    created() {
      this.getRecordDetail()
    },
    mounted() {
    },
    computed: {
    },
    methods: {
      getRecordDetail() {
        Custom.getRecordDetail(this.$route.query.id)
          .then(res => {
            if (res.error !== ERR_OK) {
              this.$refs.toast.show(res.message)
              return
            }
            this.form = res.data
            this.form.num = this.form.num + '个'
          })
      }
    },
    watch: {
    },
    components: {
      Toast
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .sell-detail
    background: $color-white
    min-height: 100vh
  .input-list
    .list
      margin: 0 15px
      border-bottom: 1px solid $color-E3E6E9
      color: $color-666666
      font-size: $font-size-14
      layout(row,block,nowrap)
      align-items: center
      .input
        color: $color-343439
        outline: none
        height: 60px
        line-height: 60px
        flex: 1
      .name
        width: 80px

  .remark
    margin: 0 15px
    border-bottom: 1px solid $color-E3E6E9
    color: $color-666666
    font-size: $font-size-14
    padding: 22px 0
    layout(row,block,nowrap)
    align-items: baseline;
    .name
      width: 80px
    .remarkTxt
      line-height: 16px
      flex-fix()

</style>
