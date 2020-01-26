const url = [
  'http://192.168.20.157:9000',
  'http://192.168.21.109:9000',
  'http://192.168.8.93:18010',
]
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: url[0],
        pathRewrite: {
          '^/api': '',
        },
      },
      '/offlinemap': {
        target: 'http://192.168.8.218:1301',
        pathRewrite: {
          '^/offlinemap': '',
        },
      },
    },
  },
}
