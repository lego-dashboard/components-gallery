const visit_columns = [{
  label: 'G2+高频到访地址',
  prop: 'address',
// }, {
//   label: '今日人数',
//   prop: 'todayPersonCount',
// }, {
//   label: '昨日人数',
//   prop: 'yesterdayPersonCount',
}, {
  label: '昨日占比',
  prop: 'todayPersonPercent',
}, {
  label: '往期占比',
  prop: 'yesterdayPersonPercent',
}, {
  label: '排名变化',
  prop: 'rankChange',
}]

const homeless_columns = [{
  label: 'G2+居住区域',
  prop: 'address',
// }, {
//   label: '今日人数',
//   prop: 'todayPersonCount',
// }, {
//   label: '昨日人数',
//   prop: 'yesterdayPersonCount',
}, {
  label: '当前占比',
  prop: 'todayPersonPercent',
}, {
  label: '往期占比',
  prop: 'yesterdayPersonPercent',
// }, {
//   label: '重点人类型',
//   prop: 'gnType',
}]
export {
  visit_columns,
  homeless_columns,
}
