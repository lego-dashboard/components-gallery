<template>
  <div style="height: 100%; width: 100%;">
    <div
      ref="chart"
      style="height: 100%; width: 100%;"
    />
  </div>
</template>

<script>
import echarts from 'echarts'
import chartOptions from './chart-options'
import { merge } from 'lodash'
import chinaMap from './china.json'
import geoCoord from './geoCoord.json'
export default {
  props: {
    ds: {
      type: Object,
    },
  },
  data: () => ({
    chart: null,
    chartOptions,
  }),
  watch: {
    options (val) {
      if (this.chart) {
        this.setOptions(val)
        this.chart.resize()
      }
    },
  },
  created () {
    this.ds.getInfo().then(data => {
      this.setOptions(data)
    })
  },
  mounted () {
    echarts.registerMap('china', chinaMap)
    this.init()
  },
  methods: {
    init () {
      this.chart = echarts.init(this.$refs.chart)
    },
    setOptions (opt) {
      if (!this.chart) return false
      this.chart.setOption(this.handleOptions(opt))
    },
    handleOptions (opt) {
      let result = { ...this.chartOptions }
      let _data1 = this.convertData(opt.data)
      let _data2 = opt.data.map(function (dataItem) {
        console.log(dataItem, geoCoord[dataItem[1].name])
        return geoCoord[dataItem[1].name] ? {
          name: dataItem[1].name,
          value: geoCoord[dataItem[1].name].concat([dataItem[1].value]),
          itemStyle: {
            color: dataItem[1].color,
          },
        } : ''
      }).filter(item => item)
      result.series[0].data = _data1
      // result.series[1].data = _data1
      result.series[1].data = _data2
      opt.mapAreaColor && (result.geo.itemStyle.normal.areaColor = opt.mapAreaColor)
      opt.mapAreaHoverColor && (result.geo.itemStyle.emphasis.areaColor = opt.mapAreaHoverColor)
      opt.mapBorderColor && (result.geo.itemStyle.normal.borderColor = opt.mapBorderColor)
      opt.mapLabelColor && (result.geo.label.emphasis.color = opt.mapLabelColor)
      return merge(result, opt)
    },
    convertData (data) {
      let res = []
      for (let i = 0; i < data.length; i++) {
        let dataItem = data[i]
        let fromCoord = geoCoord[dataItem[0].name]
        let toCoord = geoCoord[dataItem[1].name]
        if (fromCoord && toCoord) {
          res.push({
            fromName: dataItem[0].name,
            toName: dataItem[1].name,
            coords: [fromCoord, toCoord],
            lineStyle: {
              color: dataItem[1].color,
            },
          })
        }
      }
      return res
    },
  },
}
</script>
<style scoped>
</style>
