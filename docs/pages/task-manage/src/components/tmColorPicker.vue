<template>
  <div>
    <div
      :class="[check===item?'color checked':'color']"
      v-for="(item,index) in colors"
      :key="index"
      :style="{'background-color': item}"
      @click="pickColor(item)"
    ></div>
  </div>
</template>
<script>
export default {
  name: "tmColoPicker",
  props: {
    check: {
      default: "rgb(241, 194, 49)",
      type: String
    }
  },
  data() {
    return {
      colors: [
        "rgb(241, 194, 49)",
        "rgb(108, 190, 94)",
        "rgb(59, 183, 128)",
        "rgb(42, 166, 193)",
        "rgb(56, 118, 228)",
        "rgb(152, 66, 235)",
        "rgb(190, 59, 131)",
        "rgb(147, 0, 0)",
        "rgb(180, 95, 6)",
        "rgb(191, 144, 2)",
        "rgb(115, 118, 29)",
        "rgb(56, 118, 29)",
        "rgb(42, 147, 100)",
        "rgb(19, 79, 92)",
        "rgb(19, 67, 151)",
        "rgb(73, 28, 117)",
        "rgb(115, 27, 99)",
        "rgb(225, 62, 57)",
        "rgb(230, 145, 56)"
      ]
    };
  },
  methods: {
      pickColor(val){
          this.$emit('pickColor',val)
      }
  }
};
</script>
<style scoped>
.color {
  display: inline-block;
  height: 24px;
  width: 24px;
  margin-right: 7px;
  margin-top: 12px;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
}
.checked:after {
    content: "";
    position: absolute;
    left: -4px;
    top: -4px;
    height: 32px;
    width: 32px;
    border-radius: 50%;
    background-color: inherit;
    opacity: .36;
}
</style>