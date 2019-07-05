<template>
  <el-menu
    background-color="#303030"
    text-color="#fff"
    active-text-color="#ffd04b"
    default-active="/user"
    mode="horizontal"
    router
    style="width: 40%; margin-left: 40%;height: 80px;"
  >
    <el-menu-item
      v-for="route in list"
      :index="route.path"
      :key="route.name"
      style="width: 25%; height: 80px; line-height: 80px;"
    >
      <span slot="title" style="font-size: 130%;">{{ route.name }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import { top_list } from "./navList";
export default {
  name: "TopNav",
  components: {},
  data() {
    return {
      list: top_list
    };
  },
  methods: {}
};
</script>
