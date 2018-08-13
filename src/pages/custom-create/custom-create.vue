<template>
  <div class="custom-create">
    <ul class="inputList">
      <li>
        <div class="name">*客户</div>
        <input type="text" v-model="form.custom" placeholder="国颐堂美发有限公司">
      </li>
      <li>
        <div class="name">*手机号码</div>
        <input type="text" v-model="form.call" placeholder="15527741300">
      </li>
      <li>
        <div class="name">所在地区</div>
        <input type="text" v-model="form.area" placeholder="请选择所在的地区">
      </li>
      <li>
        <div class="name">所属行业</div>
        <input type="text" v-model="form.trade" placeholder="请选择">
      </li>
    </ul>
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
          custom: null,
          call: null,
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
    },
    methods: {
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
