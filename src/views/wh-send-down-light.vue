<template lang="pug">
  .demo
    send-down-light(:ds="{ getInfo }")
</template>

<script>
import SendDownLight from '@/components/send-down-light'
import data from './data.json'

export default {
  components: {
    SendDownLight,
  },
  data () {
    return {
      getInfo () {
        const length = data.length
        return Promise.resolve({
          data: data.map((item, index) => {
            let op = 0.01
            const percent = index / length
            if (percent < 0.05) {
              op = 1
            } else if (percent < 0.1) {
              op = 0.3
            } else if (percent < 0.2) {
              op = 0.1
            } else if (percent < 0.4) {
              op = 0.05
            } else if (percent < 0.8) {
              op = 0.01
            }
            item[1].color = `rgba(0, 234, 255, ${op})`
            return item
          }),
          backgroundColor: '#013954', // 对应原生设置
          mapAreaColor: 'rgba(51, 69, 89, .5)',
          mapAreaHoverColor: 'rgba(37, 43, 61, .5)',
          mapLabelColor: '#ccc',
          mapBorderColor: '#516a89',
        })
      },
    }
  },
}
</script>
<style lang="less">
.demo {
  width: 100%;
  height: 100vh;
}
</style>
