<template>
  <div>
    <el-dropdown trigger="click" @command="handleCommand">
      <el-avatar shape="square" :size="64" :src="squareUrl" />
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item style="font-size: 150%">管理员</el-dropdown-item>
        <el-dropdown-item command="a" divided>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
  name: "adminHeader",
  data() {
    return {
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png"
    };
  },
  methods: {
    handleCommand(command) {
      if (command === "a") this.$router.push("/login");
    }
  }
};
</script>

<style scoped>
.el-dropdown {
  float: right;
}

div {
  padding: 5px;
}
</style>

