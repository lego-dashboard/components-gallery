export default {
  data () {
    return {
      startIndex: 0,
      timer: null,
    }
  },
  beforeDestory () {
    this.bindRemoveEvent()
  },
  methods: {
    startMove () {
      if (this.timer) {
        clearInterval(this.timer)
        this.startIndex = 0
      }
      const maxLen = this.list.length
      this.timer = setInterval(() => {
        if (this.startIndex === maxLen - 1) {
          this.startIndex = 0
        } else {
          this.startIndex += 1
        }
      }, this.duration)
      this.$once('hook:beforeDestroy', () => {
        clearInterval(this.timer)
        this.timer = null
      })
    },
    bindOnEvent () {
      const { actvieBox } = this.$refs
      if (actvieBox) {
        this.bindRemoveEvent()
        actvieBox.addEventListener('mouseenter', this.handleMouseEnter)
        actvieBox.addEventListener('mouseleave', this.handleMouseLeave)
      }
    },
    bindRemoveEvent () {
      const { actvieBox } = this.$refs
      if (actvieBox) {
        actvieBox.removeEventListener('mouseenter', this.handleMouseEnter)
        actvieBox.removeEventListener('mouseleave', this.handleMouseLeave)
      }
    },
    handleMouseEnter () {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    handleMouseLeave () {
      this.startMove()
    },
  },
}
