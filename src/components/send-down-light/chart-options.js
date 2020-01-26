export default {
  backgroundColor: '#013954',
  color: ['#00eaff'],
  title: {
    show: false,
    text: '下发图',
    subtext: '下发图',
    x: 'center',
  },
  legend: {
    show: true,
    orient: 'vertical',
    x: 'left',
    data: [],
    selectedMode: 'single',
    selected: {},
  },
  tooltip: {
    show: true,
    trigger: 'item',
    formatter (param) {
      if (param.seriesIndex === 1) {
        return `${param.marker} ${param.name}: ${param.data.value[2]}`
      } else {
        return `${param.marker} ${param.data.fromName} > ${param.data.toName}`
      }
    },
  },
  geo: {
    map: 'china',
    label: {
      emphasis: {
        show: false,
      },
    },
    roam: true, // 是否允许缩放
    itemStyle: {
      normal: {
        color: 'rgba(51, 69, 89, .5)', // 地图背景色
        borderColor: '#516a89', // 省市边界线00fcff 516a89
        borderWidth: 1,
      },
      emphasis: {
        color: 'rgba(37, 43, 61, .5)', // 悬浮背景
      },
    },
  },
  series: [
    // {
    //   name: '下发图',
    //   type: 'lines',
    //   zlevel: 3,
    //   effect: {
    //     show: true,
    //     period: 10,
    //     constantSpeed: 10,
    //     trailLength: 0.7,
    //     color: 'rgba(249, 57, 2, 0.2)',
    //     symbolSize: 1,
    //   },
    //   lineStyle: {
    //     normal: {
    //       color: 'rgba(249, 57, 2, 0.2)',
    //       width: 0,
    //       curveness: 0.2,
    //     },
    //   },
    //   data: [],
    // },
    {
      name: '下发图',
      type: 'lines',
      zlevel: 2,
      effect: {
        show: true,
        period: 3, // 箭头指向速度，值越小速度越快
        trailLength: 0.01, // 特效尾迹长度[0,1]值越大，尾迹越长重
        symbol: 'arrow', // 箭头图标
        symbolSize: 10, // 图标大小
      },
      lineStyle: {
        normal: {
          width: 1, // 尾迹线条宽度
          opacity: 1, // 尾迹线条透明度
          curveness: 0.5, // 尾迹线条曲直度
        },
      },
      data: [],
    },
    {
      name: '下发图',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      // label: {
      //   normal: {
      //     show: false,
      //     position: 'right',
      //     formatter: '{b}',
      //   },
      // },
      // symbolSize: function (val) {
      //   return 6
      // },
      zlevel: 2,
      rippleEffect: { // 涟漪特效
        period: 4, // 动画时间，值越小速度越快
        brushType: 'stroke', // 波纹绘制方式 stroke, fill
        scale: 4, // 波纹圆环最大限制，值越大波纹越大
        // color: ['#00eaff'],
      },
      label: {
        normal: {
          show: false,
          position: 'right', // 显示位置
          offset: [5, 0], // 偏移设置
          formatter: '{b}',
          fontSize: 13,
        },
        emphasis: {
          show: true,
        },
      },
      itemStyle: {
        show: true,
      },
      symbol: 'circle',
      symbolSize: function (val) {
        return 5 // 圆环大小
      },
      data: [],
    },
  ],
}
