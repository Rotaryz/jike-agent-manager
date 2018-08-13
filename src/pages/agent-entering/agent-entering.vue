<template>
  <div class="entering-box">
    <div class="entering-con">
      <div class="entering-list">
        <div class="item-box">
          <div class="item-left">
            *代理商名称
          </div>
          <input type="text" class="item-input" placeholder="请输入代理商的名称"/>
        </div>
        <div class="item-box">
          <div class="item-left">
            *手机号码
          </div>
          <input type="text" class="item-input" placeholder="请输入负责人的手机号码"/>
        </div>
        <div class="item-box">
          <div class="item-left">
            所在地区
          </div>
          <div class="item-right">请选择所在的地区</div>
          <div class="item-img">
            <img src="./icon-arrow_home@2x.png" alt="">
          </div>
        </div>
        <div class="item-box">
          <div class="item-left">
            *代理级别
          </div>
          <div class="item-right">请选择代理级别</div>
          <div class="item-img">
            <img src="./icon-arrow_home@2x.png" alt="">
          </div>
        </div>
        <div class="item-box">
          <div class="item-left">
            *是否已付款
          </div>
          <div class="item-selecet">
            <div class="selecet-box">
              <div class="selecet-img">
                <img src="./icon-unselected_recommender@2x.png" alt="">
              </div>
              <div class="text">是</div>
            </div>
            <div class="selecet-box">
              <div class="selecet-img">
                <img src="./icon-unselected_recommender@2x.png" alt="">
              </div>
              <div class="text">否</div>
            </div>
          </div>
        </div>
        <div class="item-box item-two">
          <div class="item-left">
            付款金额
          </div>
          <div class="money-box">19,800</div>
        </div>
      </div>
      <div class="entering-updata">
        <div class="updata-img">
          <div class="updada-img-box">
            <img src="./icon-upload_recommender@2x.png" alt="">
          </div>
          <div class="updata-text">请上传付款凭证</div>
          <div class="updata-shadow">
            <div class="shadow-btn">重新上传</div>
          </div>
        </div>
      </div>
    </div>
    <div class="jump-btn">
      <div class="btn">立即提交</div>
    </div>
    <div class="show-box">
      <div class="show-bg"></div>
      <div class="item-show-box">
        <div class="item-top">
          <div class="title">提示</div>
          <div class="text">推荐代理商信息录入成功，请等待平台审核！</div>
        </div>
        <div class="item-bottom">
          <div class="item-btn">继续推荐</div>
          <div class="item-btn item-btn-right">立即返回</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'agent-entering'
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
      border-bottom: 0px
    .item-left
      font-size: $font-size-14
      font-family: $font-family-regular
      color: $color-666666
      width: 90px
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
      outline:none
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
        height:100%
        display:block
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
