<template>
  <div class="tip_popover_contaniner" :style="{'top':popTop+'px','left':popLeft+'px'}">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "tmTipPopover",
  props: {
    popTop: {
      type: Number,
      default: 0
    },
    popLeft: {
      type: Number,
      default: 0
    }
  }
};
</script>
<style scoped>
.tip_popover_contaniner {
  position: absolute;
  background: #fff;
  border: 1px solid #ebeef5;
  padding: 5px;
  z-index: 2000;
  color: #606266;
  line-height: 1.4;
  text-align: justify;
  font-size: 14px;
  border-radius: 4px;
  box-shadow: 0 2px 11px 0 rgba(0, 0, 0, 0.16);
  word-break: break-all;
}
</style>