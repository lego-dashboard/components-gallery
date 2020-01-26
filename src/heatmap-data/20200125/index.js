import hxHeatmap from './hx-heatmap.json'
import hxTree from './hx-tree.json'
import whHeatmap from './wh-heatmap.json'
import whTree from './wh-tree.json'
import hospitalHeatmap from './hosiptal-heatmap.json'
import hospitalTree from './hosiptal-tree.json'
import realtimeHeatmap from './other-heatmap.json'
import realtimeTree from './other-tree.json'
const data_map = {
  hx: {
    tree: hxTree,
    heatmap: hxHeatmap,
  },
  wh: {
    tree: whTree,
    heatmap: whHeatmap,
  },
  hospital: {
    tree: hospitalTree,
    heatmap: hospitalHeatmap,
  },
  realtime: {
    tree: realtimeTree,
    heatmap: realtimeHeatmap,
  },
}
export default data_map
