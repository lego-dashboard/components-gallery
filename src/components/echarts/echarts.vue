<template lang="pug">
.echarts
</template>

<script>
import echarts from 'echarts'
import './macarons.js'
export default {
  name: 'Chart',
  props: {
    option: {
      type: Object,
      default () {
        return {}
      },
    },
  },
  data () {
    return {
      chart: null,
    }
  },
  watch: {
    option (nv) {
      this.chart.clear()
      this.chart.setOption(nv || {})
      this.$emit('done', this.chart)
    },
  },
  mounted () {
    this.chart = echarts.init(this.$el, 'macarons')
    this.chart.setOption(this.option || {})
    window.addEventListener('resize', () => {
      this.chart && this.chart.resize()
    })
    document.addEventListener('webkitfullscreenchange', () => {
      window.setTimeout(() => {
        this.chart && this.chart.resize()
      }, 100)
    })
    this.$emit('chart-init', this.chart)
  },
}
</script>

<style lang="less" scoped>
.echarts {
  height: 100%;
  width: 100%;
}
</style>
