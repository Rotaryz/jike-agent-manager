<template>
  <div class="custom-create">
    <ul class="input-list">
      <li class="list">
        <div class="name">客户</div>
        <input class="input" type="text" v-model="form.custom" placeholder="国颐堂美发有限公司">
      </li>
      <li class="list">
        <div class="name">手机号码</div>
        <input class="input" type="text" v-model="form.call" placeholder="15527741300">
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
    <div class="remark">
      <div class="name">备注</div>
      <textarea class="textarea" type="textarea" v-model="form.remark" maxlength="200" placehoder="可在此写客户备注，不超过200字" ></textarea>
      <div class="count">{{ count }}/200</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'custom-create',
    props: {
    },
    data() {
      return {
        form: {
          custom: '国颐堂美发有限公司',
          call: '15527741300',
          area: null,
          trade: null,
          remark: null
        }
      }
    },
    created() {
    },
    mounted() {
    },
    computed: {
      count() {
        return this.form.remark ? this.form.remark.length : 0
      }
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

  .custom-create
    margin-top: 8px
    .input-list
      background: $color-white
      .list
        margin: 0 15px
        border-bottom: 1px solid $color-E3E6E9
        color: $color-666666
        font-size: $font-size-14
        line-height: $font-size-16
        height: 60px
        line-height: 60px
        layout(row,block,nowrap)
        &:last-child
          border-bottom: 0
        .input
          color: $color-BEB5A3
          outline: none
          flex-fix()
          &::-webkit-input-placeholder
            color: $color-C1C3C3
        .name
          width: 100px

    .remark
      margin-top: 8px
      padding: 20px 15px
      color: $color-666666
      background: $color-white
      font-size: $font-size-14
      line-height: $font-size-14
      position: relative
      .name
        width: 100px
      .textarea
        height: 121px
        width: 100%
        color: $color-BEB5A3
        margin-top: 5px
        border: 1px solid rgba(0,0,0,0.1)
        box-sizing: border-box
        padding: 5px
        padding-bottom: 22px
        outline: none
        resize: none
        &::-webkit-input-placeholder
          color: $color-C1C3C3
      .count
        position: absolute
        right: 20px
        bottom: 28px
</style>
