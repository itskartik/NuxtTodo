<template lang="">
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1" to="/home">Home</el-menu-item>
      <el-menu-item index="2" v-if="!signedIn">Signin</el-menu-item>
      <el-menu-item index="3" v-if="!signedIn">Signup</el-menu-item>
      <el-menu-item index="4" v-if="signedIn">Todos</el-menu-item>

      <el-menu-item style="float:right;" index="6" v-if="signedIn">
        Signout
      </el-menu-item>
      <el-tag
        style="float:right; margin:1%;margin-top:16px"
        index="5"
        v-if="signedIn"
        >{{ this.$store.state.user.name }}</el-tag
      >
    </el-menu>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      activeIndex: ""
    };
  },
  methods: {
    ...mapActions(["signOut"]),
    handleSelect(key) {
      if (key == 1) {
        this.$router.push("/");
      } else if (key == 2) {
        this.$router.push("/signin");
      } else if (key == 3) {
        this.$router.push("/signup");
      } else if (key == 4) {
        this.$router.push("/myTodos");
      } else if (key == 6) {
        this.signOut();
      }
    }
  },
  computed: {
    ...mapGetters(["signedIn"])
  }
};
</script>
<style></style>
