<template>
  <div class="main">
    <el-form :inline="true" style="justify-content: center; display: flex;">
      <el-checkbox
        style="padding:1%;"
        v-model="checked"
        @change="toggleChecked()"
      />
      <el-form-item v-if="!isEditing">
        <el-button
          style="width:30vw"
          @click="startEdit()"
          :disabled="isDisabled"
          type="primary"
          plain
        >
          {{ todo.todo }}</el-button
        >
      </el-form-item>
      <el-form-item v-else
        ><el-input
          style="width:30vw"
          type="text"
          v-model="newTodoString"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="isDisabled" @click="startEdit()">{{
          this.edit
        }}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :disabled="isDisabled"
          @click="todoDelete(todo.id)"
          >Delete</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      isEditing: false,
      newTodoString: "",
      edit: "Edit",
      checked: this.todo.completed
    };
  },
  props: {
    todo: Object,
    completed: Boolean,
    id: String
  },
  computed: {
    isDisabled() {
      if (this.todo.completed) {
        return true;
      }
    }
  },
  methods: {
    ...mapActions(["deleteTodo", "editChecked", "editTodo"]),
    toggleChecked() {
      var id = this.todo.id;
      var checked = this.checked;
      if (!this.checked) {
        this.$message({
          type: "error",
          message: `You have unchecked the Todo : ${this.todo.todo}`
        });
      } else {
        this.$message({
          type: "success",
          message: `You have completed Todo : ${this.todo.todo}`
        });
      }
      this.editChecked({ id, checked });
    },
    todoDelete(data) {
      this.$confirm("This will permanently delete Todo. Continue?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning"
      })
        .then(() => {
          this.deleteTodo(data);
          this.$message({
            type: "success",
            message: "Delete completed"
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "Delete canceled"
          });
        });
    },
    startEdit() {
      if (!this.isEditing) {
        this.newTodoString = this.todo.todo;
        this.edit = "Save";
        this.isEditing = true;
      } else {
        this.endEditing();
      }
    },
    endEditing() {
      this.isEditing = false;

      var newTodoString = this.newTodoString;
      var oldTodo = this.todo.todo;
      var id = this.todo.id;
      if (oldTodo == newTodoString) {
        this.edit = "Edit";
        this.$message({
          message: "please change todo first",
          type: "error"
        });
      } else {
        this.$message({
          message: "Todo change successful!",
          type: "success"
        });
        this.editTodo({ newTodoString, id });
        this.edit = "Edit";
      }
    }
  }
};
</script>
<style>
.completed {
  text-decoration: line-through;
}
</style>
