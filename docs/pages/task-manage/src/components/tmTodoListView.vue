<template>
  <el-row>
    <el-col :span="12" class="todo_list_border" style="padding-right:10px">
      <div class="todo_list_name">{{task_name}}</div>
      <el-input v-model="addTodo" placeholder="请添加任务，回车即可" @keyup.enter.native="addTodoList"></el-input>

      <ul style="height:400px;overflow-y:auto">
        <transition-group>
          <li
            v-for="item in list"
            :key="item.id"
            class="todo_list_li"
            @contextmenu.prevent="handlerAction($event,item.id)"
          >
            <el-checkbox
              v-model="item.complete"
              :true-label="trueLabel"
              :false-label="falseLabel"
              @change="complete(item.complete,item.id)"
            ></el-checkbox>
            <span :class="[item.complete==1?'todo_list_title todo_list_title_complete':'todo_list_title']">{{item.title}}</span>
          </li>
        </transition-group>
      </ul>
      <tmTipPopvover
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
      </tmTipPopvover>
    </el-col>
    <el-col :span="12"></el-col>
  </el-row>
</template>

<script>
import tmTipPopvover from "./tmTipPopover";
import clickOutSide from "../util/clickOutSide";
export default {
  name: "tmTodoListView",
  components: {
    tmTipPopvover
  },
  directives: {
    clickOutSide
  },
  data() {
    return {
      task_id: this.$route.params.id,
      task_name: "",
      id: 0,
      addTodo: "",
      list: [],
      loading: false,
      actionID: 0,
      tmTipPopoverShow: false,
      popTop: 0,
      popLeft: 0,
      trueLabel: 1,
      falseLabel: 0
    };
  },
  mounted() {
    this.getTodoLists();
  },
  watch: {
    $route(val) {
      this.task_id = Number(this.$route.params.id);
      this.getTodoLists();
    }
  },
  methods: {
    complete(val, id) {
      let that = this;
      that
        .http({
          method: "post",
          url: "/api/updateTodo",
          data: {
            id: id,
            complete:val,
          }
        })
        .then(res => {
          if (res.data.code) {
            // that.getTodoLists();
          } else {
            that.$message({
              message: "操作失败",
              type: "error"
            });
          }
        })
        .catch(err => {});
    },
    tmTipPopoverShowFalse() {
      this.tmTipPopoverShow = false;
    },
    handlerAction(event, actionID) {
      console.log(event);
      this.popTop = event.layerY;
      this.popLeft = event.layerX;
      this.actionID = actionID;
      this.tmTipPopoverShow = true;
    },
    handleDelete() {
      let that = this;
      that.tmTipPopoverShow = false;
      that
        .http({
          method: "post",
          url: "/api/deleteTodo",
          data: {
            id: that.actionID
          }
        })
        .then(res => {
          if (res.data.code) {
            that.$message({
              message: "删除成功",
              type: "success"
            });
            that.getTodoLists();
            that.actionID = 0;
          } else {
            that.$message({
              message: "删除失败",
              type: "error"
            });
          }
        })
        .catch(err => {});
    },
    addTodoList() {
      let that = this;
      if (that.task_id === 0 || that.addTodo === "") return;
      that
        .http({
          method: "post",
          url: "/api/addTodo",
          data: {
            id: that.id,
            task_id: that.task_id,
            title: that.addTodo
          }
        })
        .then(res => {
          if (res.data.code) {
            that.getTodoLists();
            that.addTodo = "";
            that.$message({
              message: "添加成功",
              type: "success"
            });
          }
        })
        .catch(err => {
          console.log("error:" + err);
        });
    },
    getTodoLists() {
      let that = this;
      that.list = [];
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.1)"
      });
      that
        .http({
          method: "get",
          url: "/api/getTodos",
          params: {
            task_id: that.task_id
          }
        })
        .then(res => {
          if (res.data.code) {
            that.task_name = res.data.data.task_name;
            that.list = res.data.data.list;
          }
        })
        .catch(err => {
          console.log("error:" + err);
        })
        .finally(() => {
          loading.close();
        });
    }
  }
};
</script>

<style scoped>
.todo_list_border {
  border-right: 1px solid #dcdfe6;
  height: 500px;
}
.todo_list_name {
  height: 40px;
  font-weight: bold;
  line-height: 40px;
  color: rgb(44, 62, 80);
}
.todo_list_li {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #dcdfe6;
}

.todo_list_li /deep/ .el-checkbox__label {
  color: #000;
}

.todo_list_title{
  font-weight: normal;
  margin-left:5px;
  color:#303133;
}

.todo_list_title_complete{
  text-decoration: line-through;
  color:#DCDFE6;
}

/* .list-leave{
  opacity: 1;
}
.list-leave-active {
  transition: opacity 1s ease;
  opacity: 0;
  transform: translateX(1000px);
} */
/* .list-enter-to, .list-leave-to
{
  transition: all 1s;
}
.list-move {
  transition: transform 1s;
} */
</style>