<template>
  <div class="sell-belling">
    <header class="header">
      <div class="top-msg">
        <div class="left">
          <div class="list">
            <p class="name">*购买客户</p>
            <input type="text" class="input" v-model="$store.state.customName || form.name" placeholder="请输入客户名称">
          </div>
          <div class="list">
            <p class="name">*手机号码</p>
            <input type="text" class="input" v-model="$store.state.customCall || form.mobile" placeholder="用于登录商户管理后台">
          </div>
        </div>
        <div class="right">
          <div class="img"></div>
          <router-link to="/choose-custom" class="choose-custom">选择客户</router-link>
        </div>
      </div>
    </header>
    <div class="selec-list">
      <div class="list">
        <div class="name">所在地区</div>
        <input class="input" type="text" readonly  v-model="form.address" @click="selcetAddress" placeholder="请选择所在的地区">
        <div class="icon"></div>
      </div>
      <div class="list" @click="selecTrade">
        <div class="name">所属行业</div>
        <input class="input" type="text" readonly  v-model="form.industry" placeholder="请选择所属的行业">
        <div class="icon"></div>
      </div>
    </div>
    <ul class="msg-list">
      <li class="list">
        <div class="name">商品名称</div>
        <input class="input" type="text"  v-model="form.title" placeholder="请输入商品名称">
      </li>
      <li class="list">
        <div class="name">剩余库存</div>
        <input class="input" type="text" readonly  v-model="form.usable_account" placeholder="剩余库存">
      </li>
      <li class="list">
        <div class="name">*购买数量</div>
        <input class="input" type="text"  v-model="form.num" placeholder="请输入购买数量">
        <div>套</div>
      </li>
      <li class="list">
        <div class="name">*销售总价</div>
        <input class="input" type="text"  v-model="form.total_price" placeholder="请输入销售总价">
        <div>元</div>
      </li>
    </ul>
    <div class="remark">
      <div class="name">备注</div>
      <textarea class="textarea" type="textarea" v-model="form.note" maxlength="200" placehoder="可在此写客户备注，不超过200字" ></textarea>
      <div class="count">{{ count }}/200</div>
    </div>
    <footer class="bot-btn">
      <div class="btn" @click="submit">立即开通</div>
    </footer>

    <div class="pop" v-if="popShow">
      <div class="pop-main">
        <p class="tip">确定为客户开通{{form.num}}个AI微店吗？</p>
        <div class="confirm-btn">
          <span class="pop-btn" @click="cancel">取消</span>
          <span class="pop-btn right" @click="confirm">确定</span>
        </div>
      </div>
    </div>

    <div class="gray-tip" v-if="grayTip">恭喜您，已成功开单了~</div>

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
  import utils, { cityData } from 'common/js/utils'

  export default {
    name: 'sell-belling',
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
          num: null,
          usable_account: '0',
          total_price: '',
          note: null,
          agent_merchant_id: ''
        },
        popShow: false, // 弹出确认窗口
        grayTip: false, // 提交成功提示
        tabShow: false, // 职业类型选择框
        tabLeftIndex: 0, // 左边tab栏列表
        tabRightIndex: 0, // 右边tab栏列表
        industryList: '',
        cityData
      }
    },
    created() {
      this.form.agent_merchant_id = this.$route.query.id
      this.form.usable_account = this.$route.query.num ? `${this.$route.query.num}套` : ''
      this.getIndustry()
    },
    mounted() {
    },
    computed: {
      count() {
        return this.form.note ? this.form.note.length : 0
      }
    },
    methods: {
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
        this.popShow = true
      },
      confirm() { // 确认窗的确定按钮
        this.popShow = false
        if (!this.form.name) {
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
          this.$refs.toast.show('请输入购买AI微店的数量')
          return
        }
        if (!this.form.total_price) {
          this.$refs.toast.show('请输入购买AI微店的总价')
          return
        }

        Custom.openBill(this.form)
          .then(res => {
            if (res.error !== ERR_OK) {
              this.$refs.toast.show(res.message)
              return
            }
            this.grayTip = true
            let id = this.$route.query.id
            setTimeout(() => {
              this.grayTip = false
              this.$router.push({path: '/sell-record', query: { id }})
            }, 1000)
          })
      },
      cancel() { // 确认窗的取消按钮
        this.popShow = false
      },
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
        // this.form.trade = this.tabLeftList[0] + ' ' + this.tabRightList[0][0]
      },
      tabConfirm() { // 确定选择职业类型
        this.tabShow = false
        let tabLeftList = this.industryList[this.tabLeftIndex]
        let tabRightList = this.industryList[this.tabLeftIndex].industry[this.tabRightIndex]
        this.form.industry = tabLeftList.name + ' ' + tabRightList.name
        // this.tabLeftIndex = 0
        // this.tabRightIndex = 0
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

  .sell-belling
    margin-top: 8px
    padding-bottom: 68px
    .header
      padding:0 10px
      background: $color-white
      .top-msg
        display: flex
        border-bottom: 1px solid $color-E3E6E9
        position: relative
        .left
          flex: 1
          color: $color-666666
          font-size: $font-size-14
          .list
            layout(row,block,nowrap)
            border-bottom: 1px solid $color-E3E6E9
            height: 60px
            line-height: 60px
            &:last-child
              border-bottom: 0
            .input
              color: $color-BEB5A3
              outline: none
              flex-fix()
              &::-webkit-input-placeholder
                color: $color-C1C3C3
            .name
              width: 80px
        .right
          position: absolute
          right: 0
          bottom: 0
          width: 68px
          height: 120px
          background: $color-white
          layout(column,block,nowrap)
          justify-content: center
          align-items: center
          padding-left: 10px
          border-left: 1px solid $color-E3E6E9
          .img
            width: 34px
            height: 34px
            bg-image('./icon-Contacts_open')
            background-position: no-repeat
            background-size: 100% 100%
            margin-bottom: 10px
          .choose-custom
            padding: 4px 6px
            font-size: 10px
            color: $color-C3A66C
            border:1px solid $color-C3A66C
            border-radius: 100px

    .selec-list
      background: $color-white
      padding: 0 10px
      .list
        border-bottom: 1px solid $color-E3E6E9
        color: $color-666666
        font-size: $font-size-14
        padding: 22px 0
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
        width: 80px
      .icon
        width: 10px
        height: 10px
        bg-image('./icon-arrow_home')
        background-size: 100% 100%
    .msg-list
      background: $color-white
      padding: 0 10px
      margin-top: 8px
      .list
        border-bottom: 1px solid $color-E3E6E9
        color: $color-666666
        font-size: $font-size-14
        padding: 22px 0
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
        width: 80px


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

  .pop
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index:100
    background: rgba(0,0,0,0.6)
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
        border-top: 1px solid $color-E3E6E9
        color: $color-C1C3C3
        display: flex
        position: absolute
        bottom: 0
        left: 0
        right: 0
        .pop-btn
          width: 50%
          border-right: 1px solid $color-E3E6E9
          color: $color-A3A2A0
          font-size: 16px
          &.right
            border: 0
            color: $color-C3A66C

  .gray-tip
    width: 250px
    height: 40px
    background: rgba(0,0,0,0.7)
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
    background: rgba(0,0,0,0.7)
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
      overflow:hidden
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
          border-bottom: 1px solid $color-E3E6E9
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
      border-top: 1px solid $color-E3E6E9
      .pop-btn
        width: 50%
        box-sizing: border-box
        border-right: 1px solid $color-E3E6E9
        color: $color-C1C3C3
        &.right
          border-right: 0
          color: $color-C3A66C

</style>
