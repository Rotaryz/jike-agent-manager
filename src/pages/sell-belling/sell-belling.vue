<template>
  <div class="sell-belling">
    <header class="header">
      <div class="top-msg border-bottom-1px">
        <div class="left">
          <div class="list border-bottom-1px">
            <p class="name">购买客户</p>
            <input type="text" class="input" maxlength="15" v-if="!custom.name" :class="custom.name && 'readonly'" :readonly="custom.name" v-model="form.name" placeholder="请输入客户名称">
            <div class="readonly" v-else>{{form.name}}</div>
          </div>
          <div class="list border-bottom-1px">
            <p class="name">手机号码</p>
            <input type="number" class="input" v-if="!custom.mobile" :class="custom.mobile && 'readonly'" :readonly="custom.mobile" v-model="mobile" placeholder="请输入手机号码">
            <div class="readonly" v-else>{{form.mobile}}</div>
          </div>
        </div>
        <div class="right border-left-1px">
          <div class="img"></div>
          <router-link to="/choose-custom" class="choose-custom">选择客户</router-link>
        </div>
      </div>
    </header>
    <div class="selec-list">
      <div class="list border-bottom-1px" @click="selectAddress">
        <div class="name">所在地区</div>
        <p class="area-selec" :class="areaClass">{{ form.address }}</p>
        <div class="icon"></div>
      </div>
      <div class="list" @click="selecTrade">
        <div class="name">所属行业</div>
        <p class="industry-selec" :class="industryClass">{{ form.industry }}</p>
        <div class="icon"></div>
      </div>
    </div>
    <div class="f8"></div>
    <ul class="msg-list">
      <li class="list border-bottom-1px">
        <div class="name">商品名称</div>
        <p class="readonly">{{form.title}}</p>
      </li>
      <li class="list border-bottom-1px">
        <div class="name">剩余库存</div>
        <p class="readonly">{{form.usable_account}}套</p>
      </li>
      <li class="list border-bottom-1px">
        <div class="name before">购买数量</div>
        <input class="input" type="number" v-model="form.num" placeholder="请输入购买数量">
        <div>套</div>
      </li>
      <li class="list">
        <div class="name before">销售总价</div>
        <input class="input" type="number" v-model="total_price" placeholder="请输入销售总价">
        <div>元</div>
      </li>
    </ul>
    <div class="f8"></div>
    <div class="footer">
      <div class="remark">
        <div class="name">备注</div>
        <div class="text-line">
          <textarea class="textarea" type="textarea" v-model="form.note" maxlength="200" placeholder="可在此写客户备注，不超过200字"></textarea>
        </div>
        <div class="count">{{ count }}/200</div>
      </div>
      <div class="bot-btn">
        <div class="btn" @click="submit">立即开通</div>
      </div>
    </div>
    <transition name="fade">
      <div class="pop" v-if="popShow">
        <div class="pop-main">
          <p class="tip">确定为客户开通{{form.num}}个{{projectName}}吗？</p>
          <div class="confirm-btn">
            <span class="pop-btn" @click="cancel">取消</span>
            <span class="pop-btn right" @click="confirm">确定</span>
          </div>
        </div>
      </div>
    </transition>
    <tab-list
      ref="tabList"
      :industryList="industryList"
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
  import { Custom, Account } from 'api'
  import { ERR_OK } from 'common/js/config'
  import Toast from 'components/toast/toast'
  import utils, { cityData } from 'common/js/utils'
  import storage from 'storage-controller'
  import { WEI_SHANG, PROJECT_ARR } from 'common/js/constant'
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'sell-belling',
    props: {},
    data() {
      return {
        form: {
          name: '',
          mobile: '',
          address: '请选择所在的地区',
          industry: '请选择所属的行业',
          title: '',
          num: '',
          usable_account: '0',
          total_price: '',
          note: '',
          agent_merchant_id: ''
        },
        popShow: false, // 弹出确认窗口
        grayTip: false, // 提交成功提示
        tabLeftIndex: 0, // 左边tab栏列表
        tabRightIndex: 0, // 右边tab栏列表
        industryList: '',
        total_price: '',
        cityData,
        mobile: '',
        isWD: true,
        selecArea: false,
        selecIndustry: false,
        request: false,
        projectName: ''
      }
    },
    created() {
      this._getProject()
      this.getIndustry()
      this._getAccountInfo()
    },
    beforeDestroy() {
      this.SELEC_CUSTOM({custom: {}})
    },
    mounted() {
      this.initialForm() // 防止开发的时候出现清掉store数据之前拿到数据的问题
    },
    computed: {
      ...mapState(['custom']),
      count() {
        return this.form.note ? this.form.note.length : 0
      },
      areaClass() {
        let black = this.selecArea ? 'black' : ''
        let readonly = (this.custom.address) ? 'readonly' : ''
        return `${black} ${readonly}`.trim()
      },
      industryClass() {
        let black = this.selecIndustry ? 'black' : ''
        let readonly = (this.custom.industry) ? 'readonly' : ''
        return `${black} ${readonly}`.trim()
      }
    },
    methods: {
      ...mapMutations(['SELEC_CUSTOM']),
      _getProject() {
        const project = storage.get('project')
        const obj = PROJECT_ARR.find(val => val.project === project)
        this.form.title = obj.name
        this.isWD = project === WEI_SHANG.project
        this.projectName = obj.name.substring(2)
      },
      _getAccountInfo() {
        Account.getAccountInfo().then(res => {
          if (res.error !== ERR_OK) {
            this.$refs.toast.show(res.message)
            return
          }
          this.form.usable_account = res.data.usable_account || 0
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
      submit() { // 点击提交
        if (this.form.usable_account === 0 || (this.form.num > this.form.usable_account)) {
          this.$refs.toast.show('库存不足')
          return
        }
        if (!this.form.name || this.form.name.replace(/^\s+|\s+$/g, '') === '') {
          this.$refs.toast.show('请输入客户名称')
          return
        }
        if (!this.form.mobile) {
          this.$refs.toast.show('请输入手机号')
          return
        } else if (!utils.checkIsPhoneNumber(this.form.mobile)) {
          this.$refs.toast.show('输入的手机号格式不正确')
          return
        }
        if (!this.form.num) {
          this.$refs.toast.show('请输入购买数量')
          return
        } else if (!(/^\d*$/g.test(this.form.num)) || this.form.num < 0) {
          this.$refs.toast.show('购买数量只支持整数')
          return
        }
        if (!this.total_price) {
          this.$refs.toast.show('请输入销售总价')
          return
        }
        this.popShow = true
      },
      confirm() { // 确认窗的确定按钮，发送数据给后台
        if (this.request) {
          return
        }
        this.popShow = false
        let form = this.form
        if (form.address === '请选择所在的地区') {
          form.address = ''
        }
        if (form.industry === '请选择所属的行业') {
          form.industry = ''
        }
        this.request = true
        Custom.openBill(form)
          .then(res => {
            if (res.error !== ERR_OK) {
              this.$refs.toast.show(res.message)
              this.request = false
              this.popShow = false
              return
            }
            this.$refs.toast.show('恭喜您，已成功开单了~')
            this.form.name = ''
            this.form.mobile = ''
            setTimeout(() => {
              this.$router.push({path: '/sell-record'})
              this.request = false
              this.SELEC_CUSTOM({custom: {}}) // 提交后清掉store中不用的数据
            }, 1500)
          })
      },
      cancel() { // 确认窗的取消按钮
        this.popShow = false
      },
      selecTrade() {
        if (!this.custom.industry) {
          this.$refs.tabList.show()
        }
      },
      selectAddress() {
        if (!this.custom.address) {
          this.$refs.picker.show()
        }
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
      },
      tabConfirm(data) { // 确定选择职业类型
        this.form.industry = data
        this.selecIndustry = true
      },
      handlePickerCancel(e) {
      },
      handlePickerConfirm(e) {
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
      initialForm() { // 初始化表单数据
        this.form.agent_merchant_id = this.custom.id || ''
        this.form.name = this.custom.name || ''
        this.form.mobile = this.custom.mobile || ''
        this.mobile = this.custom.mobile || ''
        if (this.custom.address) {
          this.selecArea = true
          this.form.address = this.custom.address
        }
        if (this.custom.industry) {
          this.selecIndustry = true
          this.form.industry = this.custom.industry
        }
      },
      numHandle(e) {
        if (e.data && e.data !== null) {
          this.form.num = this.form.num + e.data.replace(/\D/g, '')
          e.target.value = this.form.num
        } else {
          this.form.num = e.currentTarget.value
        }
      }
    },
    watch: {
      total_price(val, oldVal) { // 用户输入保留两位小数
        val = val.match(/\d+(\.\d{0,2})?/) ? val.match(/\d+(\.\d{0,2})?/)[0] : ''
        this.total_price = val
        this.form.total_price = val
      },
      mobile(val, oldVal) { // 防止输入超过11位
        val = val.match(/\d{0,11}/) ? val.match(/\d{0,11}/)[0] : ''
        this.mobile = val
        this.form.mobile = val
      }
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

  .sell-belling
    font-family: $font-family-regular
    fill-box()
    background: $color-F8F8F8
    min-height: 100vh
    &:before
      content: ''
      display: block
      height: 8px
      background: $color-F8F8F8
    .header
      padding: 0 15px
      background: $color-white
      .top-msg
        display: flex
        border-bottom-1px($color-E3E6E9)
        position: relative
        .left
          flex: 1
          color: $color-666666
          font-size: $font-size-14
          padding-right: 82px
          width: 100%;
          box-sizing: border-box;
          .list
            layout(row, block, nowrap)
            border-bottom-1px($color-E3E6E9)
            height: 60px
            line-height: 60px
            align-items: center
            position: relative
            &:last-child
              border-bottom: 0
            .input
              color: $color-111313
              outline: none
              flex: 1
              margin-right: 4px
              height: 20px
              line-height: 20px
              font-size: 14px
              text-overflow: ellipsis
              overflow: hidden
              white-space: nowrap
              &::-webkit-input-placeholder
                color: $color-C1C3C3
              &.readonly
                color: $color-BEB5A3
            .readonly
              flex: 1
              color: $color-BEB5A3
              text-overflow: ellipsis
              overflow: hidden
              white-space: nowrap
              margin-right: 4px

            .name
              width: 80px
              &:before
                content:'*'
                display: block
                left: -7px
                col-center()
        .right
          position: absolute
          right: 0
          bottom: 0.5px
          width: 68px
          height: 120px
          background: $color-white
          layout(column, block, nowrap)
          justify-content: center
          align-items: center
          padding-left: 15px
          border-left-1px($color-E3E6E9)
          .img
            width: 34px
            height: 34px
            bg-image('./icon-Contacts_open')
            background-position: no-repeat
            background-size: 100% 100%
            margin-bottom: 10px
          .choose-custom
            width: 62px
            height: 22px
            text-align: center
            line-height: 22px
            font-size: 10px
            color: $color-C3A66C

            border-radius: 100px
            border-1px($color-C3A66C,100px,solid)
    .selec-list
      background: $color-white
      padding: 0 15px
      .list
        border-bottom-1px($color-E3E6E9)
        color: $color-666666
        font-size: $font-size-14
        height: 60px
        line-height: 60px
        layout(row, block, nowrap)
        align-items: center
        &:last-child
          border-bottom: 0
        .area-selec
          flex: 1
          color: $color-C1C3C3
          &.black
            color: $color-111313
          &.readonly
            color: $color-BEB5A3
        .industry-selec
          flex: 1
          color: $color-C1C3C3
          &.black
            color: $color-111313
          &.readonly
            color: $color-BEB5A3
      .input
        color: $color-111313
        outline: none
        flex: 1
        height: 20px
        line-height: 20px
        &::-webkit-input-placeholder
          color: $color-C1C3C3
        &.readonly
          color: $color-BEB5A3
      .name
        width: 80px
      .icon
        width: 10px
        height: 10px
        bg-image('./icon-arrow_home')
        background-size: 100% 100%
    .f8
      height: 8px
      background: $color-F8F8F8
    .msg-list
      background: $color-white
      padding: 0 15px
      .list
        border-bottom-1px($color-E3E6E9)
        color: $color-666666
        font-size: $font-size-14
        height: 60px
        line-height: 60px
        layout(row, block, nowrap)
        align-items: center
        position: relative
        &:last-child
          border-bottom: 0
        .readonly
          color: $color-BEB5A3
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
      .name
        width: 80px
        &.before
          &:before
            content:'*'
            display: block
            left: -7px
            col-center()
  .f8
    height: 8px
    background: $color-F8F8F8
  .footer
    background: $color-white
  .remark
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
      border-1px()
      &::-webkit-input-placeholder
        color: $color-C1C3C3
        font-size: 12px
    .count
      position: absolute
      right: 20px
      bottom: 28px
      color: $color-C1C3C3

  .bot-btn
    background: $color-white
    padding: 16px 15px
    box-sizing: border-box
    margin-top: 14px
  .btn
    background: $color-C3A66C
    font-size: $font-size-16
    color: #FFFFFF
    text-align: center
    border-radius: 4px
    height: 45px
    line-height: 45px
    display: block

  .pop
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 100
    background: rgba(0, 0, 0, 0.6)
    .pop-main
      position: absolute
      top: 30%
      left: 0
      right: 0
      width: 80%
      height: 170px
      background: $color-white
      border-radius: 4px
      margin: 0 auto
      padding-top: 60px
      text-align: center
      box-sizing: border-box
      .tip
        font-size: $font-size-14
        color: $color-20202E
      .confirm-btn
        height: 45px
        line-height: 45px
        border-top-1px($color-E3E6E9)
        color: $color-C1C3C3
        display: flex
        position: absolute
        bottom: 0
        left: 0
        right: 0
        .pop-btn
          width: 50%
          border-right-1px($color-E3E6E9)
          color: $color-A3A2A0
          font-size: 16px
          &.right
            border: 0
            color: $color-C3A66C

  .gray-tip
    width: 250px
    height: 40px
    background: rgba(0, 0, 0, 0.7)
    border-radius: 4px
    text-align: center
    line-height: 40px
    font-size: 16px
    color: $color-white
    position: fixed
    top: 40%
    left: 0
    right: 0
    margin: 0 auto
    z-index: 100

  .tab-bg
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    background: rgba(0, 0, 0, 0.7)
    .tab-list
      position: absolute
      left: 0
      right: 0
      top: 20%
      margin: 0 auto
      width: 70%
      height: 300px
      background: $color-white
      text-align: center
    .title
      height: 40px
      line-height: 40px
      font-size: 16px
      color: $color-white
      background-image: linear-gradient(-180deg, #2D2C28 0%, #3D3834 100%)

    .tab
      height: 220px
      overflow: hidden
      display: flex
      font-size: $font-size-14
      .tab-left
        width: 80px
        height: 220px
        overflow-y: scroll
        background: $color-E4E4E4
        .list
          padding: 8px 0
          overflow: hidden
          &.on
            background: $color-white
            color: $color-C3A66C
      .tab-right
        flex: 1
        height: 220px
        overflow-y: scroll
        .list
          padding: 8px 0
          border-bottom-1px($color-E3E6E9)
          text-align: left
          margin-left: 10px
          overflow: hidden
          &.on
            color: $color-C3A66C
    .confirm-btn
      box-sizing: border-box
      height: 40px
      display: flex
      line-height: 40px
      border-top-1px($color-E3E6E9)
      .pop-btn
        width: 50%
        box-sizing: border-box
        border-right-1px($color-E3E6E9)
        color: $color-C1C3C3
        &.right
          border-right: 0
          color: $color-C3A66C

</style>
