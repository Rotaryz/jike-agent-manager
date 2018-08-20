<template>
  <div class="change-project">
    <div class="f3"></div>
    <ul class="info-wrapper" v-if="projectList.length">
      <li class="item-wrapper border-bottom-1px" @click="selectProject(index)" v-for="(item,index) in projectList" :key="index">
        <div class="left" v-if="item.image_url">
          <img class="logo-img" :src="item.image_url" alt="">
        </div>
        <div class="left wd" v-else-if="+item.application === 1">WD</div>
        <div class="left zt" v-else-if="+item.application === 2">ZT</div>
        <div class="middle">
          <div class="name">{{item.title}}</div>
          <div class="explain">{{item.description}}</div>
        </div>
        <div class="right">
          <div class="arrow-right" v-if="isFromLogin"></div>
          <div class="select" v-else :class="selectTab===index?'active':''"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/ecmascript-6">
  import Toast from 'components/toast/toast'
  import { Account } from 'api'
  import { ERR_OK } from 'common/js/config'
  import storage from 'storage-controller'
  import { PROJECT_ARR } from 'common/js/constant'
  import { mapActions } from 'vuex'
  // 项目(1=微商，2=智推，3=智店)

  export default {
    name: 'ChangeProject',
    components: {
      Toast
    },
    data() {
      return {
        selectTab: 0,
        projectList: [],
        isFromLogin: false
      }
    },
    created() {
      this._getParams()
      this._getProjectList()
      this._getProject()
    },
    methods: {
      ...mapActions(['updateHomeTab']),
      _getParams() {
        this.isFromLogin = this.$route.query.isFromLogin
      },
      selectProject(idx) {
        this.selectTab = idx
        const obj = PROJECT_ARR.find(val => val.application === idx + 1)
        storage.set('project', obj.project)
        this.$router.replace({path: '/home', query: {changeProject: true}})
      },
      _getProjectList() {
        Account.getProjectList().then(res => {
          if (res.error !== ERR_OK) {
            this.$refs.toast.show(res.message)
            return
          }
          this.projectList = res.data
        })
      },
      _getProject() {
        this.updateHomeTab(0)
        const project = storage.get('project')
        const obj = PROJECT_ARR.find(val => val.project === project)
        obj && (this.selectTab = obj.application - 1)
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

  .arrow-right
    margin-left: 5.5px
    width: 9.4px
    height: 9.4px
    icon-image(icon-arrow_home)

  .change-project
    fill-box(fixed)
    background: #fff
    .f3
      height: 7px
      background: $color-F3F3F3
    .info-wrapper
      padding-left: 15px
      font-family: $font-family-regular
      .item-wrapper
        height: 80px
        line-height: 80px
        layout(row, block, nowrap)
        align-items: center
        .left
          width: 40px
          height: 40px
          font-family: $font-family-bold
          font-size: $font-size-18
          color: $color-FFFFFF
          line-height: 40px
          text-align: center
          border-radius: 3px
          .logo-img
            width: 100%
            height: 100%
          &.wd
            background-image: linear-gradient(-134deg, #AE2358 0%, #C86DD7 100%)
          &.zt
            background-image: linear-gradient(45deg, rgba(35, 158, 174, 0.73) 0%, #53A0FD 47%, #7351EC 100%)
        .middle
          flex: 1
          margin-left: 10px
          font-family: $font-family-regular
          height: 100%
          layout()
          justify-content: center
          .name
            font-size: $font-size-14
            color: $color-2B2B2B
            line-height: 1
          .explain
            margin-top: 5px
            font-size: $font-size-12
            color: $color-848484
            line-height: 1
        .right
          margin-right: 15px
          .select
            width: 20px
            height: 20px
            border-radius: 50%
            border: 0.5px solid $color-C3A66C
            &.active
              icon-image(icon-select_recommender)
              border: none
</style>
