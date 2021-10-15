<template>
  <div>
    <div
      style="width:100%;display:flex;justify-content:center; margin-top:100px"
    >
      <el-form
        :label-position="labelPosition"
        label-width="100px"
        @Submit.prevent="SignIn({ Uname, pass })"
      >
        <el-form-item label="Email">
          <el-input style="width:30vw;" v-model="Uname"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input
            style="width:30vw;"
            type="password"
            v-model="pass"
          ></el-input>
        </el-form-item>
        <el-form-item style="justify-content:center; display:flex">
          <el-button type="primary" @click="signIn(Uname, pass)"
            >Submit</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import firebase from "firebase/app";
import { mapMutations, mapActions } from "vuex";
import "firebase/auth";
export default {
  data() {
    return {
      Uname: "",
      pass: "",
      labelPosition: "left",
      success: false,
      errorMsg: "",

      size: ""
    };
  },
  methods: {
    ...mapMutations(["addUser"]),

    async signIn(Uname, pass) {
      try {
        firebase
          .auth()
          .signInWithEmailAndPassword(Uname, pass)
          .then(data => {
            this.open1();

            this.$router.push("/myTodos");
            this.addUser(data.user);
          })

          .catch(error => {
            console.log(error);
            this.errorMsg = error.message;
            this.open2(this.errorMsg);
          });
      } catch (error) {
        console.log(`error ${error}`);
      }
    },
    open1() {
      this.$message({
        message: "User login successfull!",
        type: "success"
      });
    },
    open2(msg) {
      this.$message({
        message: msg,
        type: "error"
      });
    }
  }
};
</script>
<style lang=""></style>
