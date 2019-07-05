<template>
  <el-dialog :title="title" :visible.sync="visible" width="30%">
    <img :src="imgUrl" alt="picture" style="width: 100%;" />
    <el-container>
      <el-main>
        <div class="content">
          <span>宠物名称: {{ obj['名称'] }}</span>
          <span>宠物价格: ￥{{ obj['价格'] }}</span>
        </div>
        <div class="content">
          <span>宠物种类: {{ obj['品类'] }}</span>
          <span>出生日期: {{ obj['出生日期'] }}</span>
        </div>
        <div class="content">
          <span>描述: {{ obj['描述'] }}</span>
        </div>
        <div v-if="if_buy" class="content" style="float:right;">
          <el-button type="primary" @click="innerVisible = true">确认购买</el-button>
        </div>
      </el-main>
    </el-container>
    <el-dialog width="30%" title="输入私钥" :visible.sync="innerVisible" append-to-body>
      <el-form :model="key" ref="key">
        <el-form-item label="私钥" :rules="rules">
          <el-input v-model="key.private_key" placeholder="请输入私钥"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="innerVisible = false">取 消</el-button>
        <el-button type="primary" @click="ensure('key')">确定</el-button>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script>
export default {
  name: "detail",
  props: {
    detailVisible: {
      type: Boolean,
      default: false
    },
    obj: {
      type: Object,
      default: () => {}
    },
    if_buy: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      innerVisible: false,
      key: {
        private_key: ""
      },
      rules: [{ required: true, message: "不能为空", triggle: "blur" }],
      imgUrl: null,
      title: this.if_buy ? "购买信息" : "详情"
    };
  },
  methods: {
    ensure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let ID = this.obj.id;
          this.$store.dispatch("bought", this.obj);
          this.$emit("update");
          this.$message.success("交易成功");
          (this.innerVisible = false) & (this.visible = false);
        } else return false;
      });
    }
    // update(id) {
    //   let old_pets_market = this.$store.state.pets_market;
    //   let new_pets_market = old_pets_market.filter(item => {
    //     return item.id !== id;
    //   });
    //   console.log(new_pets_market);
    //   this.$store.commit("set_pets_market", new_pets_market);
    // this.$message.success("交易成功");
    // }
  },
  watch: {
    detailVisible(val) {
      if (val === true) this.imgUrl = require(`@/assets/${this.obj.picture}`);
      this.visible = val;
    },
    visible(val) {
      this.$emit("update:detailVisible", val);
    }
  }
};
</script>

<style scoped>
span {
  display: inline-block;
  width: 50%;
  font-size: 150%;
}

.content {
  padding: 5px;
}
</style>

