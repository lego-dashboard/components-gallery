import Vue from 'vue'
import VueRouter from 'vue-router'
import WHHeatMap from '@/views/wh-heatmap.vue'
Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/',
    component: WHHeatMap,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
