const doughnut_options = {
  legend: {
    // orient: 'vertical',
    // top: 'middle',
    // right: 20,
    icon: 'circle',
    padding: [10, 0],
    bottom: 0,
    data: [],
    textStyle: {
      fontSize: 20,
    },
  },
  grid: {
    top: '2%',
    bottom: '0%',
    left: '2%',
    right: '2%',
    containLabel: true,
  },
  series: [
    {
      name: '人群画像',
      type: 'pie',
      radius: ['30%', '50%'],
      center: ['50%', '50%'],
      data: [],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
      label: {
        normal: {
          show: false,
        },
        emphasis: {
          show: true,
          formatter: '{b}\n{d}%',
        },
      },
    },
  ],
}

const pie_options = {
  legend: {
    bottom: 0,
    data: [],
    icon: 'circle',
    padding: [10, 0],
    textStyle: {
      fontSize: 18,
    },
  },
  grid: {
    top: '2%',
    bottom: '0%',
    left: '2%',
    right: '2%',
    containLabel: true,
  },
  series: [
    {
      name: '人群画像',
      type: 'pie',
      radius: '50%',
      center: ['50%', '40%'],
      data: [],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
      label: {
        normal: {
          show: false,
        },
        emphasis: {
          show: true,
          formatter: '{b}\n{d}%',
        },
      },
    },
  ],
}

const bar_options = {
  grid: {
    top: '14%',
    bottom: '20%',
    left: '1%',
    right: '1%',
    containLabel: true,
  },
  legend: {
    bottom: 10,
    data: ['区域人群', '自然样本'],
    textStyle: {
      fontSize: 20,
    },
  },
  xAxis: {
    type: 'category',
    axisTick: { show: false },
    axisLabel: {
      interval: 0,
      formatter: (value) => {
        return `${value.split(' ')[0]}`
      },
    },
    data: ['Facebook', 'Twitter', 'Telegram', 'Instagram', 'Message'],
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: (value) => {
        return `${value}%`
      },
    },
  },
  series: [{
    name: '区域人群',
    data: [120, 200, 150, 80, 70],
    type: 'bar',
    label: {
      normal: {
        show: false,
      },
      emphasis: {
        show: true,
        position: 'top',
        formatter: ({ name, data }) => {
          return `${name}`
        },
      } },
  }, {
    name: '自然样本',
    data: [100, 140, 190, 40, 30],
    type: 'bar',
    label: {
      normal: {
        show: false,
      },
      emphasis: {
        show: true,
        position: 'top',
        formatter: ({ name, data }) => {
          return `${name}`
        },
      },
    },
  }],
}

const line_options = {
  color: [
    '#2ec7c9',
    '#d87a80',
  ],
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisLabel: {
      interval: 3,
      fontSize: 20,
      // showMaxLabel: true,
    },
    // data: [...[...new Array(24).keys()].map(item => item.toString().padStart(2, '0').padEnd(5, ':00')), ...[...new Array(24).keys()].map(item => item.toString().padStart(2, '0').padEnd(5, ':00'))],
    data: [],
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      // show: false,
      fontSize: 20,
    },
    // axisTick: {
    //   show: false,
    // },
    splitLine: {
      show: false,
    },
    splitArea: {
      show: false,
    },
  },
  legend: {
    top: 0,
    right: 20,
    data: ['当前流量', '均值参考'],
    icon: 'circle',
    textStyle: {
      fontSize: 20,
    },
  },
  grid: {
    top: '12%',
    bottom: '10%',
    left: '2%',
    right: '5%',
    containLabel: true,
  },
  series: [{
    name: '当前流量',
    data: [],
    type: 'line',
    areaStyle: {},
    connectNulls: true,
  }, {
    name: '均值参考',
    data: [],
    type: 'line',
    lineStyle: {
      width: 4,
    },
    connectNulls: true,
    markLine: {
      name: 'a',
      data: [
        [{
          coord: [24, 0],
        }, {
          coord: [24, 0],
        }],
      ],
      label: {
        show: true,
        formatter: () => {
          return '{a|昨日}{b||}{a|今日}'
        },
        rich: {
          a: {
            fontSize: 24,
          },
          b: {
            fontSize: 24,
            color: '#2ec7c9',
            padding: [0, 10],
          },
        },
      },
      lineStyle: {
        color: 'rgba(0, 0, 0, 1)',
      },
    },
  }],
}
const treemap_options = {
  tooltip: {
    formatter: '{b}:<br />流动人数： {c}人',
  },
  grid: {
    top: '2%',
    bottom: '0%',
    left: '2%',
    right: '2%',
    containLabel: true,
  },
  color: ['rgb(100,200,300)'],
  series: [
    {
      name: '总和',
      type: 'treemap',
      visibleMin: 100,
      width: '100%',
      height: '100%',
      label: {
        normal: {
          show: true,
          distance: 0,
          padding: 5,
          position: 'inside',
          color: '#fff',
          ellipsis: true,
          fontSize: 30,
          formatter: ({ data }) => {
            return `${data.name}\n${data.text || data.value}`
          },
        },
      },
      data: [],
      leafDepth: 1,
      drillDownIcon: '',
      levels: [
        {
          itemStyle: {
            normal: {
              borderColor: '#fff',
              borderWidth: 10,
              gapWidth: 4,
            },
          },
        },
        {
          colorSaturation: [0.3, 0.6],
          itemStyle: {
            normal: {
              borderColorSaturation: 0.7,
              gapWidth: 5,
              borderWidth: 2,
            },
          },
        },
        {
          colorSaturation: [0.3, 0.5],
          itemStyle: {
            normal: {
              borderColorSaturation: 0.6,
              gapWidth: 1,
            },
          },
        },
        {
          colorSaturation: [0.3, 0.5],
        },
      ],
    },
  ],
}
export {
  doughnut_options,
  pie_options,
  bar_options,
  line_options,
  treemap_options,
}
