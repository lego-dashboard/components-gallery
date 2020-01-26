<template lang="pug">
.heatmap-legend
    label 图例:
    .heatmap-legend-icon
      .inline
        .heatmap-legend-count
          span(v-for="(count, index) in axis" :key="index") {{count || index * 10}}
        img(src="@/assets/color-line.png")
        .heatmap-legend-explain
          span 空旷
          span 畅通
          span 正常
          span 拥挤
          span 密集
    .heatmap-legend-unit
      div /100m
        sup 2
</template>

<script>
export default {
  name: 'HeatmapLegend',
  props: {
    axis: {
      type: Array,
      default: () => [20, 40, 60, 80, 100],
    },
  },
  data () {
    return {
    }
  },
}
</script>

<style lang="less" scoped>
.heatmap-legend {
    position: relative;
    // backdrop-       : blur(6px);
    height: 120px;
    width: 940px;
    text-align: left;
    color: #fff;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 30px;
    margin: 10px;
    z-index: 10;
    label {
      margin: 0 20px;
    }
    &-icon {
      .inline {
        display: flex;
        flex-direction: column;
        text-align: center;
        img {
          margin: 4px 0;
          width: 700px;
        }
        .heatmap-legend-count {
          span {
            display: inline-block;
            width: 140px
          }
          span:last-child::before{
            content: '>';
          }
        }
        .heatmap-legend-explain {
          span {
            display: inline-block;
            width: 140px
          }
        }
      }
    }
    .legend-unit {
      margin-left: 10px;
      font-size: 24px;
    }
  }
</style>
