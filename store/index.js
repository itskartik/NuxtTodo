//import { reject, resolve } from "core-js/fn/promise";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

export const state = () => ({
  user: {
    uid: "",
    email: "",
    name: ""
  },
  todos: [],
  signedIn: false
});

export const mutations = {
  addUser(state, data) {
    state.user.uid = data.uid;
    state.user.email = data.email;
    state.user.name = data.displayName;
    state.signedIn = true;
  },
  getTodos(state, data) {
    state.todos = data;
  },
  signOut(state) {
    state.todos = [];
    state.user.uid = "";
    state.user.email = "";
    state.signedIn = false;
  }
};
export const actions = {
  async getTodos({ commit, state }) {
    var todos = [];
    var todosref = await firebase
      .firestore()
      .collection("users")
      .doc(state.user.uid)
      .collection("todos");
    await todosref.onSnapshot(snap => {
      this.todos = [];
      snap.forEach(doc => {
        var todo = doc.data();
        todo.id = doc.id;
        this.todos.push(todo);
      });
      commit("getTodos", this.todos);
    });
    //await console.log("final todo", todos);

    // commit("getTodos", this.todos);
  },
  signOut({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit("signOut");
        this.$router.push("/signin");
      })
      .catch(error => {
        console.log(error);
      });
  },
  async deleteTodo({ dispatch, state }, data) {
    await firebase
      .firestore()
      .collection("users")
      .doc(state.user.uid)
      .collection("todos")
      .doc(data)
      .delete()

      .then(data => {})
      .catch(err => {
        console.log(err);
      });
  },
  editTodo({ dispatch, state }, data) {
    firebase
      .firestore()
      .collection("users")
      .doc(state.user.uid)
      .collection("todos")
      .doc(data.id)
      .update({
        todo: data.newTodoString
      });
  },
  editChecked({ dispatch, state }, data) {
    firebase
      .firestore()
      .collection("users")
      .doc(state.user.uid)
      .collection("todos")
      .doc(data.id)
      .update({
        completed: data.checked
      });
  }
};
export const getters = {
  getAllTodos: state => {
    return state.todos;
  },
  signedIn(state) {
    return state.signedIn;
  }
};
