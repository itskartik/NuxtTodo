<template>
  <div>
    <div style="display:flex;justify-content:center;margin-top:4%">
      <el-form style="width:30vw" :model="form">
        <el-form-item
          label="Name"
          prop="name"
          :rules="{
            required: true,
            message: 'Please enter name',
            trigger: 'blur'
          }"
        >
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item
          label="Email"
          prop="email"
          :rules="[
            {
              required: true,
              message: 'Please input email address',
              trigger: 'blur'
            },
            {
              type: 'email',
              message: 'Please input correct email address',
              trigger: ['blur', 'change']
            }
          ]"
        >
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item
          label="Password"
          prop="password"
          :rules="{
            required: true,
            message: 'Please enter password',
            trigger: 'blur'
          }"
        >
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item style="justify-content:center; display:flex">
          <el-button style="width:30vw" type="primary" @click="onSubmit"
            >Submit</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        uid: ""
      },
      error: ""
    };
  },
  methods: {
    ...mapMutations(["addUser"]),
    async onSubmit() {
      let email = this.form.email;
      let name = this.form.name;
      let password = this.form.password;
      if (name.length < 1) {
        var msg = "Name is mandatory!";
        this.open2(msg);
        return;
      }
      if (password.length < 6) {
        var msg = "Password Should be more than 6 characters.";
        this.open2(msg);
      } else {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(data => {
            this.open1();
            this.form.name = "";
            this.form.email = "";
            this.form.password = "";
            this.$router.push("/signin");
          })
          .catch(error => {
            console.log(error);
            this.open2(error);
          });
        await firebase.auth().currentUser.updateProfile({
          displayName: name
        });
      }
    },
    open1() {
      this.$message({
        message: "User Registration successfull! Please Login",
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
