<template>
  <el-container class="container">
    <el-header
      height="80px"
      class="header"
      style="line-height:80px;border-bottom:1px solid #DCDFE6;font-style:italic;color:#409EFF"
    >
      <span>Task manage</span>
      <el-input placeholder="请输入内容" style="width:250px;float:right" v-model="searchValue">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
    </el-header>
    <el-container style="margin-top:25px;">
      <el-aside width="201px" style="border-right:1px solid #DCDFE6">
        <tmAside></tmAside>
      </el-aside>
      <el-container>
        <el-main >
          <router-view/>
        </el-main>
        <el-footer></el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import tmAside from "./tmAside";
export default {
  name: "index",
  components: {
    tmAside
  },
  data() {
    return {
      searchValue: ""
    };
  }
};
</script>

<style scoped>
.container {
  padding: 0 200px;
}
.el-header {
  color: #2c3e50;
  line-height: 100px;
  font-weight: bold;
  font-size: 30px;
}
.container /deep/ .el-main {
  padding: 0 10px;
}
</style>