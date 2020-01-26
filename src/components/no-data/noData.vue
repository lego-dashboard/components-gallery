<template lang="pug">
  .no-data
    img(src="@/assets/satellite-1.1s-254px.svg")
    span 数据分析中...
</template>

<script>
export default {
  name: 'NoData',
}
</script>

<style lang="less" scoped>
.no-data {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img{
    width: 220px;
    height: 220px;
    animation: jumps 2s infinite;
  }
  span{
    font-size: 20px;
    color:#1a273f;
    letter-spacing: 0.15em;
    z-index: 99
  }
}
// @keyframes jumps {
//   0% {
//     transform: scale(1) rotate(22.5deg);
//   }
//   50% {
//     transform: scale(1.1) rotate(22.5deg);
//   }
//   100% {
//     transform: scale(1) rotate(22.5deg);
//   }
// }
@keyframes jumps {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
