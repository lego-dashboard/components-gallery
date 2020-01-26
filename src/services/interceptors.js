import Vue from 'vue'
import axios from 'axios'

axios.interceptors.response.use(
  response => {
    // 文件下载处理
    if (response.data instanceof Blob) {
      if (response.data.size) {
        return Promise.resolve(response.data)
      } else {
        Message.error({ message: '文件下载失败' })
        return Promise.reject(response.data)
      }
    }
    // 业务层面错误处理
    const errCode = (response.data.errcode || '').toLowerCase()
    const errNo = response.data.errno
    let error
    if (!errNo) {
      return Promise.resolve(response.data.data)
    }
  },
)

Vue.use({
  install (V, options) {
    const services = {
      http: axios,
    }
    Object.keys(services).forEach(service => {
      Vue.prototype[`$${service}`] = services[service]
      Vue[service] = services[service]
    })
  },
})
