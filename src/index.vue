<template>
  <el-container>
    <el-header style="background: #303030; height: 80px;">
      <el-dropdown
        style="float: right; margin: 5px 100px;"
        trigger="click"
        @command="handleCommand"
      >
        <el-avatar shape="square" :size="70" fit="cover" :src="url"></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item style="font-size: 150%">{{ $store.state.login_name }}</el-dropdown-item>
          <el-dropdown-item command="a" divided>退出登录</el-dropdown-item>
          <el-dropdown-item
            command="b"
            style="padding-right: 0!important"
            v-if="$store.getters.Money !== 0"
          >
            <el-badge is-dot class="item" style="width: 100%;">消息</el-badge>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <top-nav />
    </el-header>
    <router-view />
    <el-dialog :visible.sync="visible" title="消息" style width="30%">
      公钥:
      {{ pub }}
      <div>
        私钥：
        {{ private_key }}
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import TopNav from "@/components/layout/topNav";

export default {
  name: "Index",
  components: {
    TopNav
  },
  data() {
    return {
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      visible: false,
      dot: true,
      pub: "0xefa9c263b1877686d18d4f294146db672044b47f",
      private_key:
        "cbe6a6d0d8f0df0d69e548233430b83422963d71049fab4cdeb930d527d7ee4f"
    };
  },
  methods: {
    handleCommand(command) {
      if (command === "a") this.$router.push("/login");
      if (command === "b") this.click();
    },
    click() {
      this.visible = true;
    }
  }
};
</script>