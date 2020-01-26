<template lang="pug">
.arrow(
  :class="[positionClass, statusClass]"
  @click="hiddle")
</template>

<script>
export default {
  name: 'ArrowToggle',
  props: {
    face: {
      type: String,
      default: 'bottom',
    },
  },
  data () {
    return {
      contentIsOpen: true,
      positionClass: '',
      statusClass: '',
    }
  },
  created () {
    if (!['top', 'right', 'bottom', 'left'].includes(this.face)) return false
    switch (this.face) {
      case 'bottom':
        this.positionClass = 'bottom'
        break
      case 'left':
        this.positionClass = 'left'
        break
      case 'right':
        this.positionClass = 'right'
        break
      case 'top':
        this.positionClass = 'top'
        break
    }
  },
  methods: {
    hiddle () {
      this.contentIsOpen = !this.contentIsOpen
      this.statusClass = this.contentIsOpen ? '' : 'open'
      this.$emit('click', this.contentIsOpen)
    },
  },
}
</script>

<style lang="less" scoped>
.arrow{
  position: absolute;
  height: 25px;
  width: 75px;
  background: url('../../assets/arrow.png') no-repeat;
  cursor: pointer;
  transition: all .5s;
  opacity: 0.3;
  z-index: 999;
  // &:hover{
  //   opacity: 1;
  // }
  &.bottom, &.left, &.right, &.top{
    &.open {
      background: url('../../assets/arrow-open.png') no-repeat ;
      opacity: 1;
    }
  }
  &.top {
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    transform: rotate(180deg);
  }
  &.bottom {
    top: -30px;
    left: 50%;
    transform: translateX(-50%) scale(3);
  }
  &.left {
    right: -56px;
    top: 50%;
    transform: translateY(-50%) scale(3) rotate(90deg);
  }
  &.right {
    left: -56px;
    top: 50%;
    transform: translateY(-50%) rotate(-90deg) scale(3);
  }
}
</style>
