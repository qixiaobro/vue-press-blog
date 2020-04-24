<template>
  <div>
    <div class="task_header">
      <span style="font-weight:bold;color:#2c3e50">项目列表</span>
      <el-button
        type="primary"
        circle
        icon="el-icon-plus"
        size="small"
        style="margin-left:100px"
        title="添加Task"
        @click="dialogFormVisible=true"
      ></el-button>
    </div>
    <ul>
      <li v-for="item in list" :key="item.id" class="list_li">
        <a
          @click="navigate(item.id)"
          @contextmenu.prevent="handleAction($event,item.id,item.name,item.color)"
          :class="[item.id==active?'active':'']"
        >
          <span class="dot" :style="{'background-color':item.color}"></span>
          <span class="list_name" :title="item.name">{{item.name}}</span>
        </a>
      </li>
    </ul>

    <el-dialog title="添加项目" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="项目名称" label-width="80px" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目颜色" label-width="80px">
          <tmColorPicker :check="form.color" @pickColor="pickColor"></tmColorPicker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>

    <tmTipPopover
      v-show="tmTipPopoverShow"
      :popTop="popTop"
      :popLeft="popLeft"
      v-clickOutSide="tmTipPopoverShowFalse"
    >
      <el-button type="text" @click="handleEdit()">
        <i class="el-icon-edit"></i>编辑
      </el-button>
      <br />
      <el-button type="text" style="color:red" @click="handleDelete()">
        <i class="el-icon-delete"></i>删除
      </el-button>
    </tmTipPopover>
  </div>
</template>

<script>
import tmColorPicker from "./tmColorPicker";
import tmTipPopover from "./tmTipPopover";
import clickOutSide from "../util/clickOutSide";
export default {
  name: "tmAside",
  components: {
    tmColorPicker,
    tmTipPopover
  },
  directives: {
    clickOutSide
  },
  data() {
    return {
      list: [],
      dialogFormVisible: false,
      tmTipPopoverShow: false,
      active: 0,
      form: {
        name: "",
        color: "rgb(241, 194, 49)"
      },
      rules: {
        name: [
          { required: true, message: "请输入任务名称", trigger: "blur" },
          { min: 1, max: 8, message: "长度在 1 到 8 个字符", trigger: "blur" }
        ]
      },
      id: 0,
      popTop: 0,
      popLeft: 0,
      editName: "",
      editColor: ""
    };
  },
  mounted() {
    this.getTaskList();
  },
  watch: {},
  methods: {
    pickColor(val) {
      this.form.color = val;
    },
    navigate(val) {
      if (val == this.active) return;
      this.active = val;
      this.$router.push({ path: `/tmTodoListView/${val}` });
    },
    handleAction(event, id, name, color) {
      this.id = id;
      this.editName = name;
      this.editColor = color;
      this.popTop = event.clientY + 10;
      this.popLeft = event.clientX + 50;
      this.tmTipPopoverShow = true;
    },
    tmTipPopoverShowFalse() {
      this.tmTipPopoverShow = false;
    },
    handleEdit() {
      this.form.name = this.editName;
      this.form.color = this.editColor;
      this.dialogFormVisible = true;
    },
    handleDelete() {
      let that = this;
      that.tmTipPopoverShow = false;
      that
        .http({
          method: "post",
          url: "/api/deleteTask",
          data: {
            id: that.id
          }
        })
        .then(res => {
          if (res.data.code) {
            that.$message({
              message: "删除成功",
              type: "success"
            });
            that.getTaskList();
            that.id = 0;
          } else {
            that.$message({
              message: "删除失败",
              type: "error"
            });
          }
        })
        .catch(err => {});
    },
    getTaskList() {
      let that = this;
      that.list = [];
      that
        .http({
          method: "get",
          url: "/api/getTask"
        })
        .then(res => {
          if (res.data.code) {
            that.list = res.data.data;
          }
        })
        .catch(err => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let that = this;
          that
            .http({
              method: "post",
              url: "/api/addTask",
              data: {
                id: that.id,
                name: that.form.name,
                color: that.form.color
              }
            })
            .then(res => {
              if (res.data.code) {
                that.$message({
                  message: that.id ? "修改成功" : "添加成功",
                  type: "success"
                });
                that.resetForm(formName);
                that.dialogFormVisible = false;
                that.getTaskList();
                that.id = 0;
              }
            })
            .catch(err => {});
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.task_header {
  height: 40px;
  line-height: 40px;
}
.list_li {
  width: 200px;
  height: 40px;
  line-height: 40px;
  padding: 0 5px;
  box-sizing: border-box;
}

a {
  cursor: pointer;
  width: 180px;
  padding: 0 5px;
  height: 40px;
  display: inline-block;
  box-sizing: border-box;
  text-decoration: none;
}
a:hover {
  background-color: rgb(198, 226, 255);
  border-radius: 5px;
}
.active {
  color: rgba(0, 0, 0, 0.85);
  background-color: rgb(140, 197, 255);
  border-radius: 5px;
}
.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-bottom: 15px;
  display: inline-block;
}
.list_name {
  width: 150px;
  margin-left: 10px;
  display: inline-block;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
