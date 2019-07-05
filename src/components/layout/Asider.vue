<template>
  <el-aside style="width: 13%;">
    <el-menu
      background-color="#303030"
      text-color="#fff"
      active-text-color="#ffd04b"
      default-active="/admin"
      style="height: 100%;"
      router
    >
      <img src="@/assets/admin_logo.svg" alt="logo" style="width:50%;margin: 20px 25%;" />
      <el-menu-item v-for="route in aside_list" :index="route.path" :key="route.name">
        <span slot="title" style="font-size: 120%;margin-left: 20px;">{{ route.name }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
import { admin_list } from "./navList";
export default {
  name: "Asider",
  components: {},
  data() {
    return {
      aside_list: admin_list
    };
  }
};
</script>

