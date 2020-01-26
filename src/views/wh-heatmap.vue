<template lang="pug">
.wh-content
  baidu-map.heat-map(@ready="init" :map-click="false" v-if="galleryType === 'map'" key="map")
    bm-overlay(@draw="getHeatMapData")
    bm-navigation(anchor="BMAP_ANCHOR_BOTTOM_LEFT")
  .panel-top
    span 数据源选择：
    el-select.select-content(size="large" v-model="region" placeholder="地区选择")
      el-option(
        v-for="({name, props}, index) in menus"
        :key="index"
        :label="name"
        :value="props")
    span.ml-20 展示类型：
    el-button-group.button-group
      el-button(size="medium" :type="galleryType === 'map' ? 'primary' : '' " @click="changeGallery('map')") 地图
      el-button(size="medium" :type="galleryType === 'analysis' ? 'primary' : '' " @click="changeGallery('analysis')") 统计
      el-button(size="medium" :type="galleryType === 'table' ? 'primary' : '' " @click="changeGallery('table')") 表格
    //- .block
    //-   span 阈值{{this.max}}：
    //-   el-slider(v-model="max" @change="getHeatMapData" max="10000")
    //- .block
    //-   span 半径{{this.radius}}：
    //-   el-slider(v-model="radius" @change="getHeatMapData")
  treemap-view(v-if="galleryType === 'analysis'" :data-origin="region" key="analysis")
  div(v-if="galleryType === 'table'" class="panel-bottom-table" key="table")
    h2
      span(@click="changeType(-1)" class="clickable") {{title_map[region]}} &nbsp;
      span(
        v-for="(i, j) in tableType"
        :key="j"
      )
        span &nbsp; > &nbsp;
        span(@click="changeType(j)" class="clickable") {{i}}
    el-table(:data="tableData" size="small" align="center" :border="true" @row-click="clickTableRow")
      el-table-column(
        v-for="(column, index) in tableCol"
        :key="index" :prop="column.prop"
        :label="column.label"
        :show-overflow-tooltip="true"
        :formatter="column.formatter"
        :width="column.width"
        align="left"
        sortable
        )
</template>

<script>
import api from '@/services/api.js'
import * as coordtransform from 'coordtransform'
import { HeatmapLegend } from '@/components/heatmap-legend'
import TreemapView from '@/components/tree-map'
import { TableGroup } from '@/components/roll-table'
import data_map from '@/heatmap-data/20200125'
import { title_map } from '@/constants/title_map.js'
const menus = [
  {
    name: '程序员分布',
    props: 'wh',
  },
  {
    name: '程序员分布1',
    props: 'hospital',
  },
  {
    name: '程序员分布2',
    props: 'realtime',
  },
  {
    name: '程序员分布3',
    props: 'hx',
  },
]
const zoom_ratio = {
  hx: {
    5: { max: 6, radius: 8 },
    6: { max: 5, radius: 20 },
    7: { max: 5, radius: 20 },
    8: { max: 5, radius: 35 },
    9: { max: 5, radius: 60 },
  },
  wh: {
    5: { max: 200, radius: 7 },
    6: { max: 100, radius: 10 },
    7: { max: 60, radius: 20 },
    8: { max: 40, radius: 40 },
    9: { max: 20, radius: 60 },
  },
  hospital: {
    5: { max: 6, radius: 8 },
    6: { max: 5, radius: 12 },
    7: { max: 5, radius: 20 },
    8: { max: 5, radius: 35 },
    9: { max: 5, radius: 60 },
  },
  realtime: {
    5: { max: 30, radius: 8 },
    6: { max: 5, radius: 12 },
    7: { max: 5, radius: 20 },
    8: { max: 5, radius: 35 },
    9: { max: 5, radius: 60 },
  },
}
export default {
  name: 'WHHeatMap',
  components: {
    HeatmapLegend,
    TreemapView,
    TableGroup,
  },
  data () {
    return {
      title_map,
      menus,
      raw_points: null,
      map: null,
      BMap: null,
      point: null,
      heatmapOverlay: null,
      region: '',
      interval: null,
      max: 5,
      maxGeohahLength: 6,
      radius: 15,
      galleryType: 'map',
      tableCol: [
        { label: '地区', prop: 'name' },
        { label: '人数', prop: 'value' },
      ],
      tableType: [],
      tableData: data_map['wh'].tree.filter(i => i.value).sort((a, b) => b.value - a.value).map(i => ({ ...i })),
      tableCol2: [
        { label: '地区', prop: 'name' },
        { label: '人数', prop: 'areaCount' },
      ],
    }
  },
  watch: {
    region (newVal, oldVal) {
      const current_menu = this.menus.find(({ props }) => props === newVal)
        .props
      this.raw_points = data_map[current_menu].heatmap.filter(({ marketCount }) => marketCount !== '0').map(item => {
        return {
          ...item,
          count: item.value,
        }
      })
      this.raw_points.length && this.getHeatMapData()
      this.tableType = []
      this.tableData = data_map[current_menu].tree.filter(i => i.value).sort((a, b) => b.value - a.value).map(i => ({ ...i }))
    },
  },
  created () {
    this.interval = setInterval(() => {
      this.getHeatMapData()
    }, 60000)
  },
  mounted () {
    this.region = this.menus[0].props
  },
  beforeDestroy () {
    clearInterval(this.interval)
    this.interval = null
  },
  methods: {
    init ({ map, BMap }) {
      this.map = map
      this.point = new BMap.Point(107.026528, 34.169252)
      this.map.centerAndZoom(this.point, 5)
      this.map.enableScrollWheelZoom()
      this.map.setMinZoom(5)
      this.map.setMaxZoom(9)
      this.heatmapOverlay = new BMapLib.HeatmapOverlay({
        gradient: {
          '0.00': 'rgb(255,0,255)',
          '0.25': 'rgb(0,0,255)',
          '0.50': 'rgb(0,255,0)',
          '0.75': 'rgb(255,255,0)',
          '1.00': 'rgba(255,0,0)',
        },
      })
      this.map.addOverlay(this.heatmapOverlay)
    },
    async getHeatMapData () {
      const points = this.raw_points.map(item => {
        return {
          lng: parseFloat(item.lng),
          lat: parseFloat(item.lat),
          count: parseFloat(item.count),
        }
      })
      this.createHeatmap(points)
      console.log(this.map.getZoom())
    },
    handleRawData (result) {
      return result
        .filter(({ geohash }) => !geohash.includes('wecny67'))
        .map(({ count, latlon }) => {
          return {
            count,
            ...latlon,
          }
        })
    },
    createHeatmap (points) {
      const zoom = this.map.getZoom()
      const zoomRatio = zoom_ratio[this.region]
      this.heatmapOverlay.setDataSet({ data: points, max: zoomRatio[zoom].max })
      this.heatmapOverlay.setOptions({ radius: zoomRatio[zoom].radius })
    },
    changeGallery (val) {
      this.galleryType = val
    },
    getPrecision () {
      const zoom = this.map.getZoom()
      if (zoom > 15) {
        return 6
      } else if (zoom > 12) {
        return 5
      } else {
        return 4
      }
    },
    bd09towgs84 (positions) {
      const bd09togcj02 = coordtransform.bd09togcj02(positions[0], positions[1])
      const gcj02towgs84 = coordtransform.gcj02towgs84(
        bd09togcj02[0],
        bd09togcj02[1]
      )
      return {
        lng: gcj02towgs84[0],
        lat: gcj02towgs84[1],
      }
    },
    clickTableRow (row) {
      if (row.children) {
        this.tableData = row.children.filter(i => i.value).sort((a, b) => b.value - a.value).map(i => ({ ...i }))
        this.tableType.push(row.id)
        row.active = true
      }
    },
    changeType (index) {
      this.tableType = this.tableType.slice(0, index + 1)
      let tableData = data_map[this.region].tree
      this.tableType.forEach(item => {
        tableData = tableData.find(i => i.id === item).children
      })
      this.tableData = tableData.filter(i => i.value).sort((a, b) => b.value - a.value).map(i => ({ ...i }))
    },
  },
}
</script>

<style lang="less" scoped>
@import '../styles/color.less';
.wh-content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  .heat-map {
    height: 100%;
    width: 100%;
  }
  .panel-top {
    position: absolute;
    z-index: 1;
    top: 0;
    width: 750px;
    border-radius: 0 10px 10px 0;
    left: 0;
    // right: 0;
    background: #fff;
    backdrop-filter: blur(6px);
    pointer-events: auto;
    transition: all 1s;
    margin: 10px;
    padding: 10px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    .select-content {
      width: 260px
    }
    span {
      font-size: 18px;
    }
    .other-group{
      margin-left: auto
    }
    .block {
      margin-top: 10px;
      .more-data-button {
        margin-left: 60px;
      }
    }
  }

  .panel-bottom-table {
    position: absolute;
    bottom: 0;
    border-radius: 10px;
    top: 70px;
    left: 20px;
    right: 20px;
    pointer-events: auto;
    transition: all 1s;
    overflow: auto;
    margin-bottom: 30px;
  }

  .clickable {
    color: #409EFF;
    &:hover {
      color: #66b1ff;
    }
  }
}
</style>
<style lang="less">
.heat-map .BMap_scaleCtrl {
  top: 140px !important;
  right: 40px !important;
  .BMap_scaleTxt {
    font-size: 18px;
  }
}
</style>
