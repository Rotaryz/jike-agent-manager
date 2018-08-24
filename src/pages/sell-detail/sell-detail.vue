<template>
  <div class="sell-detail">
    <ul class="input-list">
      <li class="list border-bottom-1px">
        <div class="name">客户</div>
        <p class="msg">{{form.name}}</p>
      </li>
      <li class="list border-bottom-1px">
        <div class="name">手机号码</div>
        <p class="msg">{{form.mobile}}</p>
      </li>
      <li class="list border-bottom-1px">
        <div class="name">所在地区</div>
        <p class="msg">{{form.address}}</p>
        <div class="icon"></div>
      </li>
      <li class="list border-bottom-1px">
        <div class="name">所属行业</div>
        <p class="msg">{{form.industry}}</p>
        <div class="icon"></div>
      </li>
    </ul>
    <ul class="input-list border-bottom-1px">
      <li class="list">
        <div class="name">商品名称</div>
        <p class="msg">{{form.title}}</p>
      </li>
      <li class="list border-bottom-1px">
        <div class="name">购买单价</div>
        <p class="msg">{{form.price}}</p>
      </li>
      <li class="list border-bottom-1px">
        <div class="name">数量</div>
        <p class="msg border-bottom-1px">{{form.num}}</p>
        <div class="icon"></div>
      </li>
      <li class="list border-bottom-1px">
        <div class="name">销售总价</div>
        <p class="msg">{{form.total_price}}</p>
        <div class="icon"></div>
      </li>
    </ul>
    <div class="remark border-bottom-1px">
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
    font-family: $font-family-regular
    background: $color-white
    min-height: 100vh
  .input-list
    .list
      margin: 0 15px
      border-bottom-1px($color-E3E6E9)
      color: $color-666666
      font-size: $font-size-14
      layout(row,block,nowrap)
      align-items: center
      .msg
        color: $color-343439
        height: 60px
        line-height: 60px
        flex: 1
        overflow : hidden
        text-overflow: ellipsis
        white-space: nowrap
      .name
        width: 80px

  .remark
    margin: 0 15px
    border-bottom-1px($color-E3E6E9)
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
