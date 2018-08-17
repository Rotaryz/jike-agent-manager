export default {
  data() {
    return {
      screenH: 0,
      scrollTop: 0
    }
  },
  beforeMount() {
    this.screenH = window.screen.height
  },
  mounted() {
  },
  beforeDestroy() {
    this._handleScroll && window.removeEventListener('scroll', this._handleScroll)
  },
  methods: {
    _drawAction(args) {
      this._handleScroll && window.addEventListener('scroll', this._handleScroll.bind(this, args))
    },
    _drawItem(item) {
      const el = item.el
      const fn = item.fn
      let action = item.action
      if (!el || !action) return
      const targetTop = el.offsetTop + el.offsetHeight
      const screenH = this.screenH
      if (screenH - targetTop + this.scrollTop >= 0) {
        item.action = false
        fn()
      }
    },
    _handleScroll(args) {
      this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      args.forEach(item => {
        this._drawItem(item)
      })
    }
  }
}
