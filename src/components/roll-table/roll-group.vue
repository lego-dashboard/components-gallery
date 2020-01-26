<template lang="pug">
  .monitor-msg(ref="actvieBox")
    .header
      span(v-for="(column, index) in columns" :key="index") {{column.label}}
    transition-group.monitor-msg-list(name="slide", tag="div")
      .tbody(v-for="(item, index) in getActiveList()" :key="index")
        span(v-for="a in columns.length") {{item.name}}
</template>

<script>
import TimerMixins from '@/mixins/timer'
export default {
  name: 'RollGroup',
  components: {
  },
  mixins: [TimerMixins],
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    list: {
      type: Array,
      default () {
        return [
          {
            name: '美国1',
            label: '30%',
            value: '13%',
          },
          {
            name: '英国2',
            label: '20%',
            value: '11%',
          },
          {
            name: '英国3',
            label: '20%',
            value: '11%',
          },
          {
            name: '英国4',
            label: '20%',
            value: '11%',
          },
          {
            name: '英国52342342',
            label: '20%',
            value: '11%',
          },
          {
            name: '英国6',
            label: '20%',
            value: '11%',
          },
          {
            name: '英国7',
            label: '20%',
            value: '11%',
          },
          {
            name: '英国8',
            label: '20%',
            value: '11%',
          },
          {
            name: '英国9',
            label: '20%',
            value: '11%',
          },
        ]
      },
    },
    duration: {
      type: Number,
      default: 3000,
    },
    maxLen: {
      type: Number,
      default: 5,
    },
  },
  data () {
    return {
      startIndex: 0,
    }
  },
  // computed: {
  //   actvieList () {
  //     return {
  //       id: this.startIndex,
  //       list: this.getActiveList(),
  //     }
  //   },
  // },
  // watch: {
  //   list: {
  //     handler (newV) {
  //       if (newV && newV.length) {
  //         this.startMove()
  //         this.$nextTick(() => {
  //           this.bindOnEvent()
  //         })
  //       }
  //     },
  //     immediate: true,
  //     deep: true,
  //   },
  // },
  methods: {
    getActiveList () {
      const { startIndex, maxLen, list } = this
      const endIndex = startIndex + maxLen
      const max = list && list.length
      if (max < maxLen) {
        return list
      }
      if (endIndex > max) {
        return [...list.slice(startIndex, max), ...list.slice(0, endIndex - max)]
      }
      return list.slice(startIndex, endIndex)
    },
  },
}
</script>

<style lang="less" scoped>
.monitor-msg{
  width: 100%;
  height: 100%;
  margin: 0 15px;
  &-list{
    overflow: hidden;
  }
  .header {
    display: flex;
    justify-content: space-between;
    background: #f5f7fa;
    span {
      flex: 1;
      padding: 10px;
      border: 1px solid #ebeef5;;
      text-align: center;
      color: rgb(96, 98, 102)
    }
  }
  .tbody {
    display: flex;
    justify-content: space-between;
    span {
      flex: 1;
      padding: 10px;
      border: 1px solid #ebeef5;;
      text-align: center;
      color: rgb(96, 98, 102)
    }
  }
}

.slide-enter-active,
.slide-leave-active{
  transition: transform .8s linear;
}

.slide-leave-to{
  transform: translateY(-140px)
}
.slide-enter{
  transform: translateY(140px)
}

</style>
