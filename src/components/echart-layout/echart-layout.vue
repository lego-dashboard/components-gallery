<template lang="pug">
  .layout-wrapper
    .layout-header
      span.title {{title}}
      el-tooltip(effect="light", placement="bottom-start" v-if="tooltip.length")
        div.tooltip(slot="content" v-html="tooltip").ft-12 {{tooltip}}
        i.el-icon-question
      span(v-if="$slots.countInfo", class="countInfo")
        slot(name="countInfo")
    .layout-content
      slot
</template>

<script>
export default {
  name: 'EchartLayout',
  props: {
    title: {
      type: String,
      default: '我是标题',
    },
    tooltip: {
      type: String,
      default: '',
    },
  },
}
</script>

<style lang="less" scoped>
.layout-wrapper{
  display: inline-flex;
  position: relative;
  margin-bottom: 9px;
  height: 100%;
  width: 100%;
  background: #fff;
  border-radius: 10px;
  flex-direction: column;
  overflow: hidden;
}

.layout-header{
  padding: 5px 15px 0;
  display: flex;
  align-items: center;
  position: relative;
  .title{
    font-size: 2rem;
    color:#1a273f;
    letter-spacing: 0.05em;
  }
  .el-icon-question {
    font-size: 26px;
    color: #409eff;
  }
  .countInfo {
    position: absolute;
    right: 10px;
    font-size: 1.5rem;
    color:#1a273f;
  }
}
.layout-content{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
