<template lang="pug">
  .demo
    send-down-old(:ds="{ getInfo }")
</template>

<script>
import SendDownOld from '@/components/send-down-old'
import data from './data.json'

export default {
  components: {
    SendDownOld,
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
            item[1].color = `rgba(249, 57, 2, ${op})`
            return item
          }),
          backgroundColor: '#444', // 对应原生设置
          mapAreaColor: '#222',
          mapAreaHoverColor: '#898989',
          mapLabelColor: '#ccc',
          mapBorderColor: '#898989',
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
