<template>
  <div class="custom-create">
    <ul class="input-list">
      <li class="list">
        <div class="name">客户</div>
        <input class="input" type="text" v-model="form.name" placeholder="国颐堂美发有限公司">
      </li>
      <li class="list">
        <div class="name">手机号码</div>
        <input class="input" type="text" v-model="mobile" readonly placeholder="15527741300">
      </li>
      <li class="list">
        <div class="name">所在地区</div>
        <input class="input" type="text" readonly v-model="form.address" @click="selcetAddress" placeholder="请选择所在的地区">
        <div class="icon"></div>
      </li>
      <li class="list" @click="selecTrade">
        <div class="name">所属行业</div>
        <input class="input" type="text" readonly v-model="form.industry" placeholder="请选择所属的行业">
        <div class="icon"></div>
      </li>
    </ul>
    <div class="remark">
      <div class="name">备注</div>
      <textarea class="textarea" type="textarea" v-model="form.note" maxlength="200" placehoder="可在此写客户备注，不超过200字" ></textarea>
      <div class="count">{{ count }}/200</div>
    </div>

    <tab-list
      v-if="tabShow"
      :tabLeftIndex="tabLeftIndex"
      :tabRightIndex="tabRightIndex"
      :industryList="industryList"
      @tabLeftClick="tabLeftClick"
      @tabRightClick="tabRightClick"
      @tabCancel="tabCancel"
      @tabConfirm="tabConfirm"
    ></tab-list>
    <awesome-picker
      ref="picker"
      :data="cityData"
      @cancel="handlePickerCancel"
      @confirm="handlePickerConfirm">
    </awesome-picker>
    <toast ref="toast"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import TabList from 'components/tabList/tabList'
  import { Custom } from 'api'
  import { ERR_OK } from 'common/js/config'
  import Toast from 'components/toast/toast'
  import {cityData} from 'common/js/utils'

  export default {
    name: 'custom-create',
    props: {
    },
    data() {
      return {
        form: {
          name: '国颐堂美发有限公司',
          address: null,
          industry: null,
          note: null,
          agent_merchant_id: ''
        },
        mobile: '15527741300',
        data: {},
        id: '',
        tabShow: false, // 职业类型选择框
        tabLeftIndex: 0, // 左边tab栏列表
        tabRightIndex: 0, // 右边tab栏列表
        industryList: [],
        cityData
      }
    },
    created() {
      this.form.agent_merchant_id = this.$route.query.agentId
      this.id = this.$route.query.id
      this.getIndustry()
      this.getCustomMsg()
    },
    mounted() {
    },
    beforeEach(to, from, next) {
      console.log('sss')
    },
    computed: {
      count() {
        return this.form.note ? this.form.note.length : 0
      }
    },
    methods: {
      selecTrade() {
        this.tabShow = true
      },
      tabLeftClick(num) { // 左tab栏点击
        this.tabLeftIndex = num
      },
      tabRightClick(num) { // 右tab栏点击
        this.tabRightIndex = num
      },
      tabCancel() { // 取消选择职业类型
        this.tabLeftIndex = 0
        this.tabRightIndex = 0
        this.tabShow = false
      },
      tabConfirm() { // 确定选择职业类型
        this.tabShow = false
        let tabLeftList = this.industryList[this.tabLeftIndex]
        let tabRightList = this.industryList[this.tabLeftIndex].industry[this.tabRightIndex]
        this.form.industry = tabLeftList.name + ' ' + tabRightList.name
        // this.tabLeftIndex = 0
        // this.tabRightIndex = 0
      },
      getCustomMsg() { // 获取客户信息
        Custom.getCustomMsg(this.id)
          .then(res => {
            if (res.error !== ERR_OK) {
              this.$refs.toast.show(res.message)
              return
            }
            this.form.name = res.data.name
            this.form.address = res.data.address
            this.form.industry = res.data.industry
            this.form.note = res.data.note
          })
      },
      getIndustry() {
        Custom.getIndustry()
          .then(res => {
            if (res.error !== ERR_OK) {
              this.$refs.toast.show(res.message)
              return
            }
            this.industryList = res.data
          })
      },
      customMsg() { // 客户资料
        Custom.createCustom(this.form)
          .then(res => {
            if (res.error !== ERR_OK) {
              this.$refs.toast.show(res.message)
              return
            }
            this.form = res.data
          })
      },
      handlePickerCancel(e) {
      },
      handlePickerConfirm(e) {
        console.log(e)
        let arr = []
        e.map(item => {
          if (item.value) {
            return arr.push(item.value)
          }
        })
        let str = arr.join('-')
        this.form.address = str
      },
      selcetAddress() {
        this.$refs.picker.show()
      }
    },
    watch: {
    },
    components: {
      TabList,
      Toast
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
        align-items: center
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
        .icon
          width: 10px
          height: 10px
          bg-image('./icon-arrow_home')
          background-size: 100% 100%

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
