<template lang="pug">
.table-content
  el-table(:class="{large: size==='large'}" :data="tableData" :size="size" :stripe="true" align="center" :border="border")
    el-table-column(
      v-for="(column, index) in columns"
      :key="index" :prop="column.prop"
      :label="column.label"
      :show-overflow-tooltip="true"
      :formatter="column.formatter"
      :width="column.width"
      align="left"
      )
      template(slot-scope="scope")
        span(:class="{link: column.click}" @click="column.click(scope.row)") {{scope.row[column.prop]}}
</template>
<script>
export default {
  name: 'TableGroup',
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    size: {
      type: String,
      default: () => 'medium',
    },
    rawData: {
      type: Array,
      default: () => [],
    },
    maxLen: {
      type: Number,
      default: () => 5,
    },
    border: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    tableData () {
      return this.rawData.slice(0, this.maxLen)
    },
  },
}
</script>
<style lang="less" scoped>
.table-content {
  width: 100%;
  height: 100%;
}
.large{
  font-size: 20px;
}
</style>
