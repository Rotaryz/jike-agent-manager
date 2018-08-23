<template>
  <div class="account">
    <div class="f3"></div>
    <section class="info-wrapper">
      <label for="header-logo" class="item-wrapper avatar-item border-bottom-1px">
        <div class="left">更换头像</div>
        <div class="middle"></div>
        <div class="right avatar-right">
          <div for="header-logo" class="avatar">
            <img class="avatar-img" v-if="avatarUrl" :src="avatarUrl" alt="">
            <img class="avatar-img" v-else src="./Bitmap@2x.png" alt="">
          </div>
          <input type="file" class="avatar-input" id="header-logo" @change="_fileChange($event)" accept="image/*">
          <div class="arrow-right"></div>
        </div>
      </label>
      <router-link class="item-wrapper border-bottom-1px" to="/change-project">
        <div class="left">当前项目</div>
        <div class="middle"></div>
        <div class="right project-right">
          <div>{{projectName}}(切换)</div>
          <div class="arrow-right"></div>
        </div>
      </router-link>
      <!--<div class="item-wrapper border-bottom-1px">-->
      <!--<div class="left">当前项目</div>-->
      <!--<div class="middle"></div>-->
      <!--<div class="right project-right">-->
      <!--<div>{{projectName}}(切换)</div>-->
      <!--<div class="arrow-right"></div>-->
      <!--</div>-->
      <!--</div>-->
      <div class="item-wrapper border-bottom-1px">
        <div class="left">代理商名称</div>
        <div class="middle"></div>
        <div class="right new-right">{{userInfo?userInfo.name:''}}</div>
      </div>
      <div class="item-wrapper border-bottom-1px">
        <div class="left">代理级别</div>
        <div class="middle"></div>
        <div class="right new-right">{{userInfo?userInfo.role:''}}</div>
      </div>
      <div class="item-wrapper border-bottom-1px">
        <div class="left">所在地区</div>
        <div class="middle"></div>
        <div class="right new-right">{{userInfo?userInfo.address:''}}</div>
      </div>
      <div class="item-wrapper border-bottom-1px" @click="callPhone">
        <div class="left">AI{{isWD?'微店':'名片'}}数量</div>
        <div class="right project-right">
          <div v-if="userInfo">{{userInfo.usable_account?userInfo.usable_account:0}}/{{userInfo.total_account?userInfo.total_account:0}}</div>
          <div v-else>0/0</div>
          <div class="arrow-right"></div>
        </div>
      </div>
    </section>
    <footer class="btn-cancel" @click="logout">退出登录</footer>
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
    <loading ref="loader"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
  import VueCropper from 'vue-cropperjs'
  import Toast from 'components/toast/toast'
  import ConfirmMsg from 'components/confirm-msg/confirm-msg'
  import { UpLoad, Account } from 'api'
  import { ERR_OK } from 'common/js/config'
  import storage from 'storage-controller'
  import { PROJECT_ARR, WEI_SHANG } from 'common/js/constant'
  import { mapActions } from 'vuex'
  import Loading from 'components/loading-css/loading-css'

  export default {
    name: 'Account',
    components: {
      Toast,
      ConfirmMsg,
      VueCropper,
      Loading
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
        userInfo: null,
        projectName: '',
        isWD: true
      }
    },
    created() {
      this._getAccountInfo()
      this._getProject()
    },
    methods: {
      ...mapActions(['updateHomeTab']),
      _getProject() {
        const project = storage.get('project')
        const obj = PROJECT_ARR.find(val => val.project === project)
        obj && (this.projectName = obj.name)
        this.isWD = project === WEI_SHANG.project
      },
      _getAccountInfo() {
        Account.getAccountInfo().then(res => {
          if (res.error !== ERR_OK) {
            this.$refs.toast.show(res.message)
            return
          }
          this.userInfo = res.data
          this.avatarUrl = res.data.image_url || ''
          this.phoneNumber = res.data.platform_mobile || ''
        })
      },
      callPhone() {
        let usable = 0
        let total = 0
        if (this.userInfo) {
          usable = this.userInfo.usable_account || 0
          total = this.userInfo.total_account || 0
        }
        const content = `数值为“${usable}/${total}”，若需要增加最大开通数，请联系平台客服。电话：${this.phoneNumber}`
        const confirmTxt = `立即拨打`
        this.$refs.confirmMsg.show({content, confirmTxt})
      },
      confirm() {
        window.location.href = `tel:'${this.phoneNumber}`
      },
      cropImage() {
        // this.loading = true
        this.$refs.loader.show()
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
              // this.loading = false
              this.$refs.loader.hide()
              this.visible = false
            })
            return false
          }
          this.$refs.loader.hide()
          // this.loading = false
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
            this.$refs.cropper.replace(event.target.result)
            this.visible = true
          }
          file && reader.readAsDataURL(file)
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
      logout() {
        this.updateHomeTab(0)
        storage.clear()
        this.$router.replace({path: '/login', query: {changeProject: true}})
      }
      // _infoImage(file) {
      //   let param = new FormData() // 创建form对象
      //   param.append('file', file, file.name)// 通过append向form对象添加数据
      //   return param
      // }
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
          color: $color-343439
          layout(row, block, nowrap)
          justify-content: flex-end
          margin-right: 15px
          position: relative
          &.new-right
            margin-right: 30px
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
      border-1px($color-C3A66C, 3px)
      position: fixed
      bottom: 17px
      left: 15px
      right: 15px
      font-family: $font-family-light
      font-size: $font-size-16
      color: $color-C3A66C
      text-align: center
      height: 44px
      line-height: 44px
</style>
