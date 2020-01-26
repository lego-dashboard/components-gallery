<template lang="pug">
.time-line-content
  transition-group(name="slide", tag="div")
    .time-line-item(v-for="(message, index) in currentMessage" :key="message.gid")
      .time
        i.el-icon-timer
        span {{message.format_time}}
      .content
        i.el-icon-place
        span {{`${message.tag}***${message.code.slice(-6)}出现在`}}
        span.district {{message.district}}
        span.count {{`(${message.count || 1}人)`}}
        span {{`${message.street}${message.streetNumber}`}}
  .tail-wrapper
    .tail-body(v-for="item in currentMessage")
      .tail
      .node
</template>

<script>
export default {
  name: 'TimeLineItem',
  props: {
    allMessageList: {
      type: Array,
      default: () => [],
    },
  },
  data () {
    return {
      timer: null,
      startIndex: this.allMessageList.length,
      maxLen: 5,
    }
  },
  computed: {
    currentMessage () {
      return this.getActiveList()
    },
  },
  async mounted () {
    this.startRollMessage()
  },
  beforeDestroy () {
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    startRollMessage () {
      this.timer = setInterval(() => {
        if (this.startIndex === 0) {
          this.startIndex = this.allMessageList.length
        } else {
          this.startIndex -= 1
        }
      }, 8000)
    },
    getActiveList () {
      const { startIndex, maxLen, allMessageList } = this
      const endIndex = startIndex - maxLen
      const max = allMessageList && allMessageList.length
      if (max < maxLen) {
        return allMessageList
      }
      if (endIndex < 0) {
        return [...allMessageList.slice(max + endIndex), ...allMessageList.slice(0, startIndex)]
      }
      return allMessageList.slice(endIndex, startIndex)
    },
  },
}
</script>

<style lang="less" scoped>
.time-line-content {
  .time-line-item {
    position: relative;
    height: 60px;
    display: flex;
    justify-content: left;
    color: #000;
    .time {
      width: 270px;
    }
    .el-icon-timer,.el-icon-place {
      color: #409eff;
      margin-right: 5px;
    }
    .content {
      position: relative;
      margin-left:30px;
      width: 600px;
      height: 30px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      .times {
        position: absolute;
        right: 10px;
        color: #409eff;
      }
      .district, .count {
        color: #f50000;
      }
    }
  }
  .tail-wrapper {
    position: absolute;
    left:275px;
    top: 70px;
    height: 300px;
    margin: 0 20px 0 10px ;
    .tail-body {
      height: 60px;
      position: relative;
    }
    .tail{
      position: absolute;
      left: 0px;
      height: 100%;
      border-left: 2px solid rgba(172, 175, 180);
    }
    .node {
      position: absolute;
      background: rgba(172, 175, 180);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      left: -5px;
      width: 12px;
      height: 12px;
    }
  }
}
.slide-enter-active,
.slide-leave-active{
  transition: transform .5s;
}

.slide-leave-to{
  transform: translateY(40px)
}
.slide-enter{
  transform: translateY(-40px)
}
</style>
