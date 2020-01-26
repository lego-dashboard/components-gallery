# 下发图

## 介绍

本组件为基于Echarts的geo区块，可使用```DataSource```对区块进行配置。

对```chartOption```的配置写在```getInfo```的返回值的```Promise```中（示例请见Usage中）。

同时``` getInfo```的返回值都会被合并入```chartOption```中。

## Usage

### DataSource

getInfo中的值对应的都是Echarts中Option中的值（除了一些特殊的设置）。

另提供了一些快捷设置(均为选填)：

- data: data为一个二维数组，其中子数组中含有两个Object，第一个的name为下发图的线的出发点，第二个的name为下发图的线的结束点。第二个Object中，包含了value和color，value代表下发的数值，color代表下发飞线的颜色。
- mapAreaColor: 地图中每个省份填充的颜色
- mapAreaHoverColor: 地图中每个省份Hover时的填充颜色
- mapLabelColor: 地图中每个省份Hover时显示的省份名的字体颜色
- mapBorderColor: 地图中每个省份描边的颜色

示例：

```
{
    data: [
          [{name: '广州'}, {name: '福州', value: 95, color: '#aa0a03'}],
          [{name: '广州'}, {name: '太原', value: 90, color: '#c20fff'}],
          [{name: '广州'}, {name: '长春', value: 80, color: '#b03924'}],
          [{name: '广州'}, {name: '重庆', value: 70, color: '#d92038'}],
          [{name: '广州'}, {name: '西安', value: 60, color: '#f93902'}],
          [{name: '广州'}, {name: '成都', value: 50, color: '#91fccc'}],
          [{name: '广州'}, {name: '常州', value: 40, color: '#c9c32c'}],
          [{name: '广州'}, {name: '北京', value: 30, color: '#00f00f'}],
          [{name: '广州'}, {name: '北海', value: 20, color: '#0292ff'}],
          [{name: '广州'}, {name: '海口', value: 10, color: '#003cc3'}]
      ],
      backgroundColor: '#555', // 对应原生设置
      mapAreaColor: '#333',
      mapAreaHoverColor: '#898989',
      mapLabelColor: '#ccc',
      mapBorderColor: '#898989'
}
```
