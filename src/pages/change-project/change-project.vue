<template>
  <div class="change-project">
    <div class="f3"></div>
    <section class="info-wrapper">
      <article class="item-wrapper" @click="selectProject(0)">
        <div class="left wd">WD</div>
        <div class="middle">
          <div class="name">赞播AI微店</div>
          <div class="explain">AI赋能微商智能获客、拓客、成交、转化。</div>
        </div>
        <div class="right">
          <div class="select" :class="selectTab===0?'active':''"></div>
        </div>
      </article>
      <article class="item-wrapper" @click="selectProject(1)">
        <div class="left zt">ZT</div>
        <div class="middle">
          <div class="name">赞播AI名片</div>
          <div class="explain">人工智能名片，专注于提升企业销售效率。</div>
        </div>
        <div class="right">
          <div class="select" :class="selectTab===1?'active':''"></div>
        </div>
      </article>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'ChangeProject',
    data() {
      return {
        selectTab: 0
      }
    },
    methods: {
      selectProject(idx) {
        this.selectTab = idx
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import '~common/stylus/mixin'

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
        border-bottom: 0.5px solid $color-E4E4E4
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
</style>
