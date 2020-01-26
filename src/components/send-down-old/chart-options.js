export default {
  backgroundColor: 'transparent',
  color: ['gold', 'aqua', 'lime'],
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
      if (param.seriesIndex === 2) {
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
        color: '#fff',
        show: true,
      },
    },
    roam: false,
    hoverable: false,
    itemStyle: {
      normal: {
        areaColor: '#1b1b1b',
        borderColor: 'rgba(100,149,237,1)',
      },
      emphasis: {
        areaColor: '#1b1b1b',
      },
    },
  },
  series: [
    {
      name: '下发图',
      type: 'lines',
      zlevel: 3,
      effect: {
        show: true,
        period: 10,
        constantSpeed: 10,
        trailLength: 0.7,
        color: 'rgba(249, 57, 2, 0.2)',
        symbolSize: 1,
      },
      lineStyle: {
        normal: {
          color: 'rgba(249, 57, 2, 0.2)',
          width: 0,
          curveness: 0.2,
        },
      },
      data: [],
    },
    {
      name: '下发图',
      type: 'lines',
      zlevel: 2,
      symbol: ['none', 'arrow'],
      symbolSize: 1,
      effect: {
        show: true,
        scaleSize: 1,
        period: 10,
        constantSpeed: 10,
        color: 'rgba(249, 57, 2, 0.2)',
        shadowBlur: 20,
      },
      label: {
        normal: {
        },
      },
      lineStyle: {
        normal: {
          color: (param) => {
            return param.data.color
          },
          width: 1.5,
          opacity: 1,
          curveness: 0.2,
          lineStyle: {
          },
        },
      },
      data: [],
    },
    {
      name: '下发图',
      type: 'effectScatter',
      coordinateSystem: 'geo',
      zlevel: 4,
      rippleEffect: {
        brushType: 'stroke',
      },
      label: {
        normal: {
          show: false,
          position: 'right',
          formatter: '{b}',
        },
      },
      symbolSize: function (val) {
        return 6
      },
      itemStyle: {
        normal: {
          color: (param) => {
            return param.data.color
          },
        },
      },
      data: [],
    },
  ],
}
