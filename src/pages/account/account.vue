<template>
  <div class="account">
    <div class="f3"></div>
    <section class="info-wrapper">
      <div class="item-wrapper avatar-item">
        <div class="left">更换头像</div>
        <div class="middle"></div>
        <div class="right avatar-right">
          <label for="header-logo" class="avatar"><img class="avatar-img" v-if="avatarUrl" :src="avatarUrl" alt=""></label>
          <input type="file" class="avatar-input" id="header-logo" @change="_fileChange($event)" accept="image/*">
          <div class="arrow-right"></div>
        </div>
      </div>
      <router-link class="item-wrapper" to="/change-project">
        <div class="left">当前项目</div>
        <div class="middle">赞播AI微店</div>
        <div class="right project-right">
          <div>切换</div>
          <div class="arrow-right"></div>
        </div>
      </router-link>
      <div class="item-wrapper">
        <div class="left">代理商名称</div>
        <div class="middle">{{userInfo?userInfo.name:''}}</div>
      </div>
      <div class="item-wrapper">
        <div class="left">代理级别</div>
        <div class="middle">{{userInfo?userInfo.role:''}}</div>
      </div>
      <div class="item-wrapper">
        <div class="left">所在地区</div>
        <div class="middle">{{userInfo?userInfo.address:''}}</div>
      </div>
      <div class="item-wrapper" @click="callPhone">
        <div class="left">AI商城数量</div>
        <div class="right project-right">
          <div v-if="userInfo">{{userInfo.usable_account}}/{{userInfo.total_account}}</div>
          <div v-else>0/0</div>
          <div class="arrow-right"></div>
        </div>
      </div>
    </section>
    <footer class="btn-cancel">退出登录</footer>
    <section class="img-cut" v-show="visible">
      <vueCropper
        :viewMode="1"
        class="img-big"
        :guides="false"
        ref="cropper"
        :img="imageBig"
        :rotatable="true"
        :background="status"
        :cropBoxResizable="status"
        :aspectRatio="1"
        :autoCropArea="1"
        :dragMode="'move'"
        :checkCrossOrigin="false"
        :cropBoxMovable="false"
      >
      </vueCropper>
      <div class="img-btn">
        <div class="btn-item" @click="cropImage">确定</div>
        <div class="btn-item" @click="visible = false">取消</div>
      </div>
      <img class="loading" src="./loading.gif" alt="" width="30" height="30" v-show="loading">
    </section>
    <toast ref="toast"></toast>
    <confirm-msg ref="confirmMsg" @confirm="confirm"></confirm-msg>
  </div>
</template>

<script type="text/ecmascript-6">
  import VueCropper from 'vue-cropperjs'
  import Toast from 'components/toast/toast'
  import ConfirmMsg from 'components/confirm-msg/confirm-msg'
  import { UpLoad, Account } from 'api'
  import { ERR_OK } from 'common/js/config'

  console.log(UpLoad)
  export default {
    name: 'Account',
    components: {
      Toast,
      ConfirmMsg,
      VueCropper
    },
    data() {
      return {
        isShow: false,
        phoneNumber: '',
        visible: false,
        imageBig: '',
        cropImg: '',
        loading: false,
        status: false,
        avatarUrl: '',
        userInfo: null
      }
    },
    created() {
      this._getAccountInfo()
    },
    methods: {
      _getAccountInfo() {
        Account.getAccountInfo().then(res => {
          if (res.error !== ERR_OK) {
            this.$refs.toast.show(res.message)
            return
          }
          console.log(res)
          this.userInfo = res.data
          this.avatarUrl = res.data.image_url || ''
          this.phoneNumber = res.data.platform_mobile || ''
        })
      },
      callPhone() {
        const content = `数值为“${this.userInfo ? this.userInfo.usable_account : 0}/${this.userInfo ? this.userInfo.total_account : 0}”，若需要增加最大开通数，请联系平台客服。电话：${this.phoneNumber}`
        const confirmTxt = `立即拨打`
        this.$refs.confirmMsg.show({content, confirmTxt})
      },
      confirm() {
        window.location.href = `tel:'${this.phoneNumber}`
      },
      cropImage() {
        this.loading = true
        let src = this.$refs.cropper.getCroppedCanvas().toDataURL()
        let $Blob = this.getBlobBydataURI(src, 'image/png')
        let formData = new FormData()
        formData.append('file', $Blob, 'file_' + Date.parse(new Date()) + '.png')
        console.log(formData)
        // let data = {base_image: this.$refs.cropper.getCroppedCanvas().toDataURL()}
        this.loading = false // todo
        this.visible = false
        this.avatarUrl = src
        // UpLoad.upLoadImage(formData).then((res) => {
        //   if (res.error === ERR_OK) {
        //     this.mine.avatar = res.data.url
        //     this.mine.image_id = res.data.id
        //     this.loading = false
        //     this.visible = false
        //     this.$refs.toast.show('上传成功')
        //     return false
        //   }
        //   this.loading = false
        //   this.visible = false
        //   this.$refs.toast.show(res.message)
        // })
      },
      _fileChange(e) {
        if (e.target) {
          const file = e.target.files[0]
          const reader = new FileReader()
          reader.onload = async (event) => {
            this.imageBig = event.target.result
            this.$refs.cropper.replace(event.target.result)
            this.visible = true
          }
          reader.readAsDataURL(file)
        }
      },
      getBlobBydataURI(dataURI, type) {
        let binary = atob(dataURI.split(',')[1])
        let array = []
        for (let i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i))
        }
        return new Blob([new Uint8Array(array)], {type: type})
      },
      _infoImage(file) {
        let param = new FormData() // 创建form对象
        param.append('file', file, file.name)// 通过append向form对象添加数据
        return param
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .img-cut
    position: fixed
    top: 0
    left: 0
    right: 0
    bottom: 0
    z-index: 999
    background: #000
    .img-big
      background: #000
      height: 100%
    .img-btn
      width: 100vw
      position: absolute
      bottom: 0
      height: 60px
      display: flex
      align-items: center
      background: $color-white
      border-top: 0.5px solid $color-col-line
      .btn-item
        flex: 1
        text-align: center
        font-size: $font-size-16
        color: $color-20202E
        &:last-child
          border-left: 0.5px solid $color-col-line
    .loading
      all-center()

  .arrow-right
    margin-left: 5.5px
    width: 9.4px
    height: 9.4px
    icon-image(icon-arrow_home)

  .account
    fill-box(fixed)
    background: #fff
    .f3
      height: 7px
      background: $color-F3F3F3
    .info-wrapper
      padding-left: 15px
      font-family: $font-family-regular
      .item-wrapper
        height: 60px
        border-bottom: 0.5px solid $color-E4E4E4
        line-height: 60px
        layout(row, block, nowrap)
        &.avatar-item
          height: 78px
          line-height: 78px
        .left
          width: 83px
          font-size: $font-size-14
          color: $color-666666
        .right
          flex: 1
          font-size: $font-size-14
          color: $color-666666
          layout(row, block, nowrap)
          justify-content: flex-end
          margin-right: 15px
          position: relative
          &.avatar-right, &.project-right
            layout(row, block, nowrap)
            align-items: center
          .avatar
            display: block
            width: 48px
            height: 48px
            border-radius: 3px
            overflow: hidden
            .avatar-img
              width: 100%
              height: 100%
          .avatar-input
            position: absolute
            z-index: -2
            opacity: 0

        .middle
          font-size: $font-size-14
          color: $color-343439

    .btn-cancel
      position: fixed
      bottom: 17px
      left: 15px
      right: 15px
      font-family: $font-family-regular
      font-size: $font-size-16
      color: $color-C3A66C
      text-align: center
      height: 44px
      line-height: 44px
      border: 0.5px solid $color-C3A66C
      border-radius: 3px
</style>
