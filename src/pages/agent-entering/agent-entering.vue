<template>
  <div class="entering-box">
    <div class="entering-con">
      <div class="entering-list">
        <div class="item-box">
          <div class="item-left">
            *代理商名称
          </div>
          <input type="text" class="item-input" v-model="name" placeholder="请输入代理商的名称"/>
        </div>
        <div class="item-box">
          <div class="item-left">
            *手机号码
          </div>
          <input type="number" class="item-input" v-model="phone" placeholder="请输入负责人的手机号码"/>
        </div>
        <div class="item-box">
          <div class="item-left">
            所在地区
          </div>
          <div class="item-right" v-if="address.length === 0">请选择所在的地区</div>
          <div class="money-main" v-if="address.length !== 0">{{address}}</div>
          <div class="item-img" @click="selcetAddress">
            <img src="./icon-arrow_home@2x.png" alt="">
          </div>
        </div>
        <div class="item-box">
          <div class="item-left">
            *代理级别
          </div>
          <div class="item-right" v-if="levelName.length === 0">请选择代理级别</div>
          <div class="money-main" v-if="levelName.length !== 0">{{levelName}}</div>
          <div class="item-img" @click="selcetLevel">
            <img src="./icon-arrow_home@2x.png" alt="">
          </div>
        </div>
        <div class="item-box">
          <div class="item-left">
            *是否已付款
          </div>
          <div class="item-selecet">
            <div class="selecet-box" @click="selcetPlay(1)">
              <div class="selecet-img">
                <img src="./icon-unselected_recommender@2x.png" v-if="ispaly * 1 === 0">
                <img src="./icon-select_recommender@2x.png" v-if="ispaly * 1 === 1">
              </div>
              <div class="text">是</div>
            </div>
            <div class="selecet-box" @click="selcetPlay(0)">
              <div class="selecet-img">
                <img src="./icon-unselected_recommender@2x.png" v-if="ispaly * 1 === 1">
                <img src="./icon-select_recommender@2x.png" v-if="ispaly * 1 === 0">
              </div>
              <div class="text">否</div>
            </div>
          </div>
        </div>
        <div class="item-box item-two" v-if="levelMoney.length !== 0">
          <div class="item-left">
            付款金额
          </div>
          <div class="money-box">{{levelMoney}}</div>
        </div>
      </div>
      <div class="entering-updata">
        <div class="updata-img">
          <div class="updada-img-box">
            <img src="./icon-upload_recommender@2x.png" alt="">
          </div>
          <div class="updata-text">请上传付款凭证</div>
          <div class="updata-img-box" v-if="selectImg"
               :style="{backgroundImage: 'url(' + imgUrl + ')',backgroundPosition: 'center',backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}"></div>
          <input type="file" class="avatar-input" id="header-logo" @change="_fileChange($event)" accept="image/*">
          <div class="updata-shadow" v-if="selectImg">
            <div class="shadow-btn">重新上传</div>
          </div>
        </div>
      </div>
    </div>
    <div class="jump-btn">
      <div class="btn" @click="sumbitData">立即提交</div>
    </div>
    <div class="show-box" v-if="showShadow" @click="colseShadow">
      <div class="show-bg"></div>
      <div class="item-show-box" @click.stop>
        <div class="item-top">
          <div class="title">提示</div>
          <div class="text">推荐代理商信息录入成功，请等待平台审核！</div>
        </div>
        <div class="item-bottom">
          <div class="item-btn" @click="cleanData">继续推荐</div>
          <div class="item-btn item-btn-right" @click="goBack">立即返回</div>
        </div>
      </div>
    </div>
    <awesome-picker
      ref="picker"
      :data="cityData"
      @cancel="handlePickerCancel"
      @confirm="handlePickerConfirm">
    </awesome-picker>
    <awesome-picker
      ref="pickerLevel"
      :data="selectList"
      @cancel="cancelLevel"
      @confirm="confirmLevel">
    </awesome-picker>
    <toast ref="toast"></toast>
  </div>
</template>

<script type="text/ecmascript-6">
  import utils, {cityData} from 'common/js/utils'
  import {ERR_OK} from 'common/js/config'
  import Toast from 'components/toast/toast'
  import {Agent, UpLoad} from 'api'

  export default {
    name: 'agent-entering',
    data() {
      return {
        name: '',
        cityData,
        phone: '',
        address: '',
        selectList: [],
        ispaly: 1,
        level: 0,
        levelName: '',
        levelMoney: '',
        imgId: 0,
        imgUrl: '',
        isShow: false,
        phoneNumber: '',
        visible: false,
        imageBig: '',
        cropImg: '',
        loading: false,
        projectName: '',
        selectImg: false,
        showShadow: false
      }
    },
    created() {
      this.getLevelData()
    },
    methods: {
      colseShadow() {
        this.showShadow = false
      },
      cleanData() {
        this.name = ''
        this.phone = ''
        this.address = ''
        this.ispaly = 1
        this.level = 0
        this.levelName = ''
        this.imgId = 0
        this.imgUrl = ''
        this.showShadow = false
        this.selectImg = false
      },
      goBack() {
        this.$router.back()
      },
      handlePickerCancel(e) {
        console.log(e)
      },
      handlePickerConfirm(e) {
        let text = ''
        for (var i = 0; i < e.length; i++) {
          text += e[i].value
        }
        this.address = text
      },
      cancelLevel(e) {
        console.log(e)
      },
      confirmLevel(e) {
        this.levelName = e[0].value
        let index = e[0].index * 1
        this.level = index + 1
        this.levelMoney = this.selectList[index].agent_price
      },
      selcetAddress() {
        this.$refs.picker.show()
      },
      selcetLevel() {
        this.$refs.pickerLevel.show()
      },
      getLevelData() {
        Agent.getLevel().then(res => {
          if (res.error === ERR_OK) {
            this.selectList = res.data
            for (var i = 0; i < this.selectList.length; i++) {
              this.selectList[i].value = this.selectList[i].level_name
            }
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      },
      selcetPlay(index) {
        this.ispaly = index
      },
      cropImage() {
        this.loading = true
        let src = this.$refs.cropper.getCroppedCanvas().toDataURL()
        let $Blob = this._getBlobBydataURI(src, 'image/png')
        let formData = new FormData()
        formData.append('file', $Blob, 'file_' + Date.now() + '.png')
        UpLoad.upLoadImage(formData).then((res) => {
          if (res.error === ERR_OK) {
            UpLoad.updateAvatar(res.data.id).then(res => {
              if (res.error !== ERR_OK) {
                this.$refs.toast.show(res.message)
              }
              this.$refs.toast.show('上传成功')
              this.avatarUrl = src
              this.loading = false
              this.visible = false
            })
            return false
          }
          this.loading = false
          this.visible = false
          this.$refs.toast.show(res.message)
        })
      },
      _fileChange(e) {
        if (e.target) {
          const file = e.target.files[0]
          const reader = new FileReader()
          reader.onload = async (event) => {
            this.imageBig = event.target.result
            let $Blob = this._getBlobBydataURI(this.imageBig, 'image/png')
            let formData = new FormData()
            formData.append('file', $Blob, 'file_' + Date.now() + '.png')
            UpLoad.upLoadImage(formData).then((res) => {
              if (res.error === ERR_OK) {
                this.imgId = res.data.id
                this.imgUrl = res.data.url
                this.selectImg = true
                return false
              }
              this.loading = false
              this.$refs.toast.show(res.message)
            })
          }
          reader.readAsDataURL(file)
        }
      },
      _getBlobBydataURI(dataURI, type) {
        let binary = atob(dataURI.split(',')[1])
        let array = []
        for (let i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i))
        }
        return new Blob([new Uint8Array(array)], {type: type})
      },
      sumbitData() {
        if (this.name.length === 0) {
          this.$refs.toast.show('请输入您的名称')
          return
        }
        if (!utils.checkIsPhoneNumber(this.phone)) {
          this.$refs.toast.show('请输入正确的手机号码')
          return
        }
        if (this.level < 1) {
          this.$refs.toast.show('请输入您的代理级别')
          return
        }
        if (this.ispaly * 1 === 1) {
          if (this.imgUrl.length === 0) {
            this.$refs.toast.show('请您上传付款凭证')
            return
          }
        } else {
          this.imgId = 0
        }
        let data = {
          name: this.name,
          mobile: this.phone,
          address: this.address,
          level: this.level,
          is_paid: this.ispaly,
          paid_image_id: this.imgId
        }
        Agent.newAddAgent(data).then(res => {
          if (res.error === ERR_OK) {
            this.showShadow = true
          } else {
            this.$refs.toast.show(res.message)
          }
        })
      }
    },
    components: {
      Toast
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'
  *
    box-sizing: border-box
    -moz-box-sizing: border-box
    -webkit-box-sizing: border-box

  .entering-box
    padding-bottom: 85px
    min-height: 100vh
    background :$color-F8F8F8

  .entering-list
    padding: 0 15px
    background: $color-FFFFFF
    margin-top: 10px

  .item-box
    layout(row)
    align-items: center
    height: 55px
    border-bottom: 0.5px solid #e3e6e9
    position: relative
    &:last-child
      border-bottom: 0
    .item-left
      font-size: $font-size-14
      font-family: $font-family-regular
      color: $color-666666
      width: 90px
    .money-box
      font-size: $font-size-18
      font-family: $font-family-medium
      color: $color-343439
    .money-main
      font-size: $font-size-14
      font-family: $font-family-medium
      color: $color-343439
    .item-img
      position: absolute
      width: 120px
      right: 0
      height: 55px
      layout(row)
      align-items: center
      justify-content: flex-end
      top: 0
      img
        width: 10px
        display: block
    .item-input
      height: 53px
      flex: 1
      font-size: $font-size-14
      font-family: $font-family-regular
      color: $color-text
      padding-right: 15px
      border: none
      outline: none
    .item-input::-webkit-input-placeholder
      color: #c1c3c3
    .item-input::-ms-input-placeholder
      color: #c1c3c3
    .item-input::-moz-placeholder
      color: #c1c3c3
    .item-right
      color: #c1c3c3
      font-size: $font-size-14
      font-family: $font-family-regular
    .item-selecet
      flex: 1
      layout(row)
      .selecet-box
        width: 35%
        align-items: center
        layout(row)
    .selecet-img
      width: 20px
      height: 20px
      margin-right: 6px
      img
        width: 100%
        height: 100%
        display: block
    .text
      font-size: $font-size-14
      font-family: $font-family-regular
      color: $color-343439

  .item-two
    justify-content: space-between

  .entering-updata
    padding: 15px
    .updata-img
      width: 100%
      height: 150px
      border: 1px dashed #dedede
      background: #fff
      layout()
      align-items: center
      justify-content: center
      position: relative
      .updada-img-box
        width: 55px
        height: 55px
        margin-bottom: 10px
        img
          width: 100%
          height: 100%
          display: block
      .updata-text
        font-size: $font-size-14
        color: #a6a6a6
        font-family: $font-family-regular
    .updata-shadow
      position: absolute
      width: 100%
      height: 100%
      left: 0
      top: 0
      background: rgba(0, 0, 0, .5)
      z-index: 11
      layout()
      align-items: center
      justify-content: center
      .shadow-btn
        font-size: $font-size-14
        color: #fff
        height: 30px
        width: 95px
        line-height: 29px
        text-align: center
        border-radius: 50px
        border: 1px solid #fff
        font-family: $font-family-regular

  .avatar-input
    position: absolute
    width: 100%
    height: 100%
    left: 0
    top: 0
    z-index: 14
    opacity: 0

  .updata-img-box
    position: absolute
    width: 100%
    height: 100%
    left: 0
    top: 0
    background: #fff
    z-index: 11

  .jump-btn
    height: 65px
    position: fixed
    bottom: 0
    background: $color-FFFFFF
    width: 100%
    left: 0
    border-top: 1px solid #eee
    padding: 10px 15px
    .btn
      color: $color-FFFFFF
      background: #C3A66C
      border-radius: 6px
      width: 100%
      text-align: center
      height: 45px
      line-height: 45px
      font-size: $font-size-16
      font-family: $font-family-regular

  .show-box
    position: fixed
    width: 100%
    height: 100%
    left: 0
    top: 0
    z-index: 22
    .show-bg
      position: absolute
      width: 100%
      height: 100%
      left: 0
      top: 0
      background: rgba(0, 0, 0, .75)
    .item-show-box
      background: #fff
      border-radius: 6px
      width: 300px
      height: 171px
      margin: auto
      left: 0
      right: 0
      position: absolute
      top: 0
      bottom: 0
      .item-top
        height: 126px
        padding: 18px 50px 0
        .title
          font-size: $font-size-16
          font-family: $font-family-medium
          color: #20202e
          text-align: center
          margin-bottom: 20px
        .text
          font-size: $font-size-14
          font-family: $font-family-regular
          color: #20202e
          text-align: justify
          line-height: 20px
          margin-bottom: 20px
      .item-bottom
        height: 45px
        align-items: center
        border-top: 0.5px solid #cfcfcf
        layout(row)
        .item-btn
          width: 50%
          text-align: center
          font-size: $font-size-16
          font-family: $font-family-regular
          color: #a6a6a6
          height: 45px
          line-height: 45px
          border-right: 0.5px solid #cfcfcf
        .item-btn-right
          border-right: 0
          color: $color-C3A66C
</style>
