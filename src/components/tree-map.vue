<template lang="pug">
  .panel-bottom
    .echart-layout
      echart-layout(:title="chartTitle")
        .panel-content(slot)
          chart(ref="line", @chart-init="init")
    .area-button
      span 湖北数据：
      el-button-group
        el-button(size="small" :type="showHbData ? 'primary' : '' " @click="changeGallery(true)") 展示
        el-button(size="small" :type="!showHbData ? 'primary' : '' " @click="changeGallery(false)") 隐藏
</template>

<script>
import api from '@/services/api.js'
import cloneDeep from 'lodash.clonedeep'
import { treemap_options } from '@/constants/mul-chart.js'
import dayjs from 'dayjs'
import data_map from '@/heatmap-data/20200125'
import { title_map } from '@/constants/title_map.js'
export default {
  name: 'TreemapView',
  components: {},
  props: {
    dataOrigin: {
      type: String,
      default: 'whPersonLocation',
    },
  },
  data () {
    return {
      data_map,
      treemap_options,
      chart: null,
      showBottomChart: true,
      startIndex: 0,
      mesUnfold: true,
      allMessageList: [],
      region: '',
      showHbData: false,
    }
  },
  computed: {
    chartTitle () {
      return title_map[this.dataOrigin]
    },
  },
  watch: {
    dataOrigin () {
      this.showHbData = false
      const data = this.handleTreeData(this.dataOrigin)
      this.setOption(data)
    },
  },
  methods: {
    changeGallery (val) {
      this.showHbData = val
      const data = this.handleTreeData(this.dataOrigin)
      this.setOption(data)
    },
    handleTreeData (origin) {
      const data = this.showHbData ? this.data_map[origin].tree : this.data_map[origin].tree.filter(({ id }) => id !== '湖北省')
      return data.map(country => {
        country.value = parseInt(country.value)
        country.children = country.children.map(province => {
          province.name = province.name.replace(country.id, '')
          province.value = parseInt(province.value)
          province.children = province.children.map(city => {
            city.name = city.name.replace(province.id, '')
            city.value = parseInt(city.value)
            return city
          })
          return province
        })
        return country
      })
      // return [{
      //   value: province_list.reduce((total, cur) => total + cur.value, 0),
      //   children: province_list,
      // }]
    },
    setOption (data) {
      const handleData = this.handleData(data)
      const options = cloneDeep(this.treemap_options)
      options.series[0].data = handleData
      this.chart.setOption(options)
    },
    init (echart) {
      this.chart = echart
      const data = this.handleTreeData(this.dataOrigin)
      this.setOption(data)
    },
    handleData (data) {
      const cloneData = cloneDeep(data)
      const that = this
      let result = []

      ;(function traverse (node, arrayList = []) {
        const length = node.length
        node.sort((a, b) => b.value - a.value).forEach((item, index) => {
          if (item.children) item.children = traverse(item.children)
          arrayList.push({
            ...item,
            label: {
              fontSize: that.setFontSize(length, index),
            },
          })
        })
        return arrayList
      })(cloneData, result)
      return result
    },
    setFontSize (len, index) {
      const maxSize = 30
      return len < 6 ? maxSize : maxSize - 2 * Math.floor(index / 5)
    },
  },
}
</script>

<style lang="less" scoped>
@import '../styles/color.less';
.panel-bottom {
  position: absolute;
  bottom: 0;
  border-radius: 10px;
  top: 60px;
  // height: 90%;
  left: 0;
  right: 0;
  pointer-events: auto;
  transition: all 1s;
}
.echart-layout {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;
}
.panel-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  .time-line {
    height: 100%;
    width: 100%;
    overflow: scroll;
    font-size: 20px;
    margin: 20px -20px 0 10px;
  }
}
.area-button {
  position: absolute;
  top: 20px;
  right:20px;
}
</style>
