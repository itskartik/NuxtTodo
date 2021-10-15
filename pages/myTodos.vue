<template lang="">
  <div class="container">
    <div style="justify-content: center; display: flex;">
      <h1 style="margin:1%; font-size:2.5vw ">My Todos</h1>
    </div>
    <el-form
      :inline="true"
      @submit.native.prevent="onSubmit"
      style="justify-content: center; display: flex;"
    >
      <el-form-item
        ><el-input
          style="width:40vw"
          v-model="newTodo"
          placeholder="Add Todo"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit()">Add</el-button>
      </el-form-item>
    </el-form>
    <todo
      v-for="todo in getAllTodos"
      :key="todo.id"
      :todo="todo"
      :id="todo.id"
      :completed="todo.completed"
    />
  </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/firestore";
import { mapGetters, mapActions } from "vuex";
import todo from "../components/todo.vue";
export default {
  components: {
    todo
  },
  middleware: "auth",
  data() {
    return {
      newTodo: "",
      uid: ""
    };
  },
  computed: {
    ...mapGetters(["getAllTodos"])
  },

  methods: {
    ...mapActions(["getTodos"]),
    isEditing() {
      this.editing = !this.editing;
    },
    async onSubmit() {
      this.uid = this.$store.state.user.uid;
      var todo = this.newTodo;
      if (this.newTodo.length > 0) {
        await firebase
          .firestore()
          .collection("users")
          .doc(firebase.auth().currentUser.uid)
          .collection("todos")
          .add({
            todo: this.newTodo,
            completed: false
          });
        var msg = "Todo added successfully";
        this.open1(msg);
        await this.getTodos();
        this.newTodo = "";
      } else {
        var msg = "Please enter Something";
        this.open2(msg);
      }
    },
    open1(msg) {
      this.$message({
        message: msg,
        type: "success"
      });
    },
    open2(msg) {
      this.$message({
        message: msg,
        type: "error"
      });
    }
  },
  mounted() {
    this.getTodos();
  }
};
</script>
<style>
.container {
  width: 100vw;
  height: 90vh;
}
</style>
