<template>
  <div>
    <div class="content"></div>
    <el-container>
      <el-header>
        <h1>宠物应用平台</h1>
      </el-header>
      <el-main>
        <el-form :modal="user" label-width="80px">
          <el-form-item label="用户名">
            <el-input placeholder="请输入用户名" v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              placeholder="请输入密码"
              v-model="user.password"
              show-password
              @keyup.enter.native="login()"
            />
          </el-form-item>
        </el-form>
        <div class="bt">
          <el-button @click="click" class="bt">注册</el-button>
          <el-button type="primary" @click="login()" class="bt">登录</el-button>
        </div>
      </el-main>
    </el-container>
    <el-dialog :visible.sync="visible" title="注册" width="30%">
      <el-form :model="logup" label-width="70px">
        <el-form-item label="用户名">
          <el-input placeholder="请输入用户名" v-model="logup.name" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input placeholder="请输入密码" v-model="logup.password" show-password />
        </el-form-item>
        <el-form-item label="密码">
          <el-input placeholder="请确认密码" v-model="logup.ensure_password" show-password />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="ensure()">注 册</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        name: "",
        password: ""
      },
      account_arr: [],
      logup: {
        name: "",
        password: "",
        ensure_password: ""
      },
      visible: false
    };
  },
  mounted() {
    let account = this.$store.state.accounts;
    account.forEach(element => {
      this.account_arr.push(element.name);
    });
  },
  methods: {
    login() {
      if (this.user.name === "admin" && this.user.password === "admin") {
        this.$router.push("/admin");
        return;
      }
      if (this.account_arr.includes(this.user.name)) {
        this.$store.commit("set_login_name", this.user.name);
        this.$router.push("/user");
      }
    },
    click() {
      for (let key in this.logup) {
        this.logup[key] = "";
        this.visible = true;
      }
    },
    ensure() {
      this.visible = false;
      this.$message.success("注册成功");
    }
  }
};
</script>

<style scoped>
.content {
  position: relative;
  background: #303030;
  height: 80px;
  width: 100%;
}

.el-container {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: 200px auto;
  height: 350px;
  width: 500px;
  padding: 40px;
  border-radius: 10px;
  box-shadow: darkgrey 10px 10px 30px 5px;
}

.bt {
  float: right;
  margin-left: 10px;
}
</style>

