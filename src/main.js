import Vue from 'vue'
import App from './app.vue'
import router from './router'
import '@/services/interceptors'
import '@/styles/index.less'
import EchartLayout from '@/components/echart-layout'
import ArrowToggle from '@/components/arrow-toggle'
import BaiduMap from 'vue-baidu-map'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// const Chart = () => import(/* webpackChunkName: "Chart" */ '@/components/echarts')
import Chart from '@/components/echarts'
Vue.use(ElementUi)
Vue.component('arrow-toggle', ArrowToggle)
Vue.component('chart', Chart)
Vue.component('echart-layout', EchartLayout)

Vue.use(BaiduMap, {
  ak: 'Gm6QCiE6yQYIT4rMARLTsjGV51fxu1Zi',
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
