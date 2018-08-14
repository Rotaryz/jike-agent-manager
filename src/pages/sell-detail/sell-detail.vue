<template>
  <div class="sell-detail">
    <ul class="input-list">
      <li class="list">
        <div class="name">客户</div>
        <input class="input" type="text" readonly v-model="form.custom" placeholder="国颐堂美发有限公司">
      </li>
      <li class="list">
        <div class="name">手机号码</div>
        <input class="input" type="text" readonly v-model="form.call" placeholder="15527741300">
      </li>
      <li class="list">
        <div class="name">所在地区</div>
        <input class="input" type="text" readonly v-model="form.area" placeholder="请选择所在的地区">
        <div class="icon"></div>
      </li>
      <li class="list">
        <div class="name">所属行业</div>
        <input class="input" type="text" readonly v-model="form.trade" placeholder="请选择所属的行业">
        <div class="icon"></div>
      </li>
    </ul>
    <ul class="input-list">
      <li class="list">
        <div class="name">商品名称</div>
        <input class="input" type="text" readonly v-model="form.name" placeholder="国颐堂美发有限公司">
      </li>
      <li class="list">
        <div class="name">购买单价</div>
        <input class="input" type="text" readonly v-model="form.price" placeholder="15527741300">
      </li>
      <li class="list">
        <div class="name">数量</div>
        <input class="input" type="text" readonly v-model="form.count" placeholder="请选择所在的地区">
        <div class="icon"></div>
      </li>
      <li class="list">
        <div class="name">销售总价</div>
        <input class="input" type="text" readonly v-model="form.totalPrice" placeholder="请选择所属的行业">
        <div class="icon"></div>
      </li>
    </ul>
    <div class="remark">
      <div class="name">卖家备注</div>
      <p class="remarkTxt">{{ form.remark }}</p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'sell-detail',
    props: {
    },
    data() {
      return {
        form: {
          custom: '国颐堂美发有限公司',
          call: '15527741300',
          area: '广东-广州-越秀区',
          trade: 'IT 服务 计算机软件与服务业',
          name: '赞播AI微店',
          price: '200.00',
          count: '100个',
          totalPrice: '200.00',
          remark: '这是小明家买的，便宜了200块，还没有收款呢！'
        }
      }
    },
    created() {
    },
    mounted() {
    },
    computed: {
    },
    methods: {
    },
    watch: {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .sell-detail
    background: $color-white
    padding-bottom: 20px
  .input-list
    .list
      margin: 0 15px
      border-bottom: 1px solid $color-E3E6E9
      color: $color-666666
      font-size: $font-size-14
      padding: 22px 0
      layout(row,block,nowrap)
      .input
        color: $color-343439
        outline: none
        flex-fix()
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
