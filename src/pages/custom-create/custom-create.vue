<template>
  <div class="custom-create">
    <ul class="input-list">
      <li class="list border-bottom-1px">
        <div class="name">客户</div>
        <input class="input" type="text" v-model="form.name" placeholder="请输入公司名">
      </li>
      <li class="list border-bottom-1px">
        <div class="name">手机号码</div>
        <input class="input readonly" type="number" v-model="mobile" readonly placeholder="请输入手机号">
      </li>
      <li class="list border-bottom-1px" @click="selcetAddress">
        <div class="name">所在地区</div>
        <!--<input class="input" type="text" readonly v-model="form.address"  placeholder="请选择所在的地区">-->
        <p class="area-selec" :class="selecArea && 'black'" >{{ form.address }}</p>
        <div class="icon"></div>
      </li>
      <li class="list border-bottom-1px" @click="selecTrade">
        <div class="name">所属行业</div>
        <!--<input class="input" type="text" readonly v-model="form.industry" placeholder="请选择所属的行业">-->
        <p class="industry-selec" :class="selecIndustry && 'black'">{{ form.industry }}</p>
        <div class="icon"></div>
      </li>
    </ul>
    <div class="gray-bar"></div>
    <div class="remark">
      <div class="name">备注</div>
      <div class="text-line">
        <textarea class="textarea" type="textarea" v-model="form.note" maxlength="200" placeholder="可在此写客户备注，不超过200字" ></textarea>
      </div>
      <div class="count">{{ count }}/200</div>
    </div>
    <footer class="bot-btn border-top-1px">
      <div class="btn" @click="saveCustomMsg">保存</div>
    </footer>
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
  import { cityData } from 'common/js/utils'

  export default {
    name: 'custom-create',
    props: {
    },
    data() {
      return {
        form: {
          name: '',
          address: '请选择所在的地区',
          industry: '请选择所属的行业',
          note: null,
          agent_merchant_id: ''
        },
        mobile: '',
        data: {},
        id: '',
        tabShow: false, // 职业类型选择框
        tabLeftIndex: 0, // 左边tab栏列表
        tabRightIndex: 0, // 右边tab栏列表
        industryList: [],
        cityData,
        selecArea: false,
        selecIndustry: false
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
        this.selecIndustry = true
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
            this.form.note = res.data.note
            this.mobile = res.data.mobile
            if (res.data.address) {
              this.form.address = res.data.address
              this.selecArea = true
            }
            if (res.data.industry) {
              this.form.industry = res.data.industry
              this.selecIndustry = true
            }
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
      saveCustomMsg() { // 保存客户资料
        let form = this.form
        if (form.address === '请选择所在的地区') {
          form.address = ''
        }
        if (form.industry === '请选择所属的行业') {
          form.industry = ''
        }
        Custom.createCustom(form)
          .then(res => {
            if (res.error !== ERR_OK) {
              this.$refs.toast.show(res.message)
              return
            }
            this.$refs.toast.show('保存成功')
            setTimeout(() => {
              this.$router.back()
            }, 1500)
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
        this.selecArea = true
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
    font-family: $font-family-regular
    min-height: 100vh
    background: $color-white
    &:before
      content: ''
      display: block
      height: 8px
      background: $color-F8F8F8
    .input-list
      background: $color-white
      .list
        margin: 0 15px
        border-bottom-1px($color-E3E6E9)
        color: $color-666666
        font-size: $font-size-14
        height: 60px
        line-height: 60px
        layout(row,block,nowrap)
        align-items: center
        &:last-child
          &:after
            border-bottom: 0
        .input
          color: $color-111313
          outline: none
          flex: 1
          height: 20px
          line-height: 20px
          font-size: 14px
          &::-webkit-input-placeholder
            color: $color-C1C3C3
          &.readonly
            color: $color-BEB5A3
        .area-selec
          flex: 1
          color: $color-C1C3C3
          &.black
            color: $color-111313
        .industry-selec
          flex: 1
          color: $color-C1C3C3
          &.black
            color: $color-111313
        .name
          width: 100px
        .icon
          width: 10px
          height: 10px
          bg-image('./icon-arrow_home')
          background-size: 100% 100%
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
    .gray-bar
      background: $color-F8F8F8
      height: 8px
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
      .text-line
        border-1px(#E3E6E9)
        margin-top: 5px
        .textarea
          height: 121px
          width: 100%
          color: $color-111313
          border: none
          box-sizing: border-box
          padding: 5px
          padding-bottom: 22px
          outline: none
          resize: none
          font-size: 14px
          &::-webkit-input-placeholder
            color: $color-C1C3C3
            font-size: 12px
      .count
        position: absolute
        right: 20px
        bottom: 28px
        color: $color-C1C3C3
</style>
