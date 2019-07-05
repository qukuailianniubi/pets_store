<template>
  <el-container class="admin">
    <asider />
    <el-container class="content">
      <el-header>
        <admin-header />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Asider from "@/components/layout/Asider";
import adminHeader from "@/components/layout/adminHeader";
export default {
  name: "Admin",
  components: {
    Asider,
    adminHeader
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
.admin {
  height: 100%;
}

.content {
  background: #ededed;
}

.el-header {
  background: #fff;
  height: 80px !important;
  width: 100%;
}
</style>

