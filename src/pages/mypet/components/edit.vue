<template>
  <el-dialog :visible.sync="visible" width="20%" title="修改">
    <el-form>
      <el-form-item label="价格:">
        <el-input v-model.number="edit_content" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="submit()">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "edit",
  props: {
    editVisible: {
      type: Boolean,
      default: false
    },
    content: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      visible: false,
      edit_content: ""
    };
  },
  methods: {
    //有问题待解决
    update(data) {
      let my_pet = this.$store.getters.MyPet;
      for (const item of my_pet) {
        if (item.ID === data.ID) item["价格"] = data["价格"];
      }
      return my_pet;
    },
    submit() {
      let submit_data = { ...this.content };
      // type = this.type;
      submit_data["价格"] = this.edit_content;
      // console.log(submit_data);
      let update_data = this.update(submit_data);

      this.$store.commit("set_mypet", update_data);
      this.$emit("update");
      this.$message.success("修改成功");
      this.visible = false;
    }
  },
  watch: {
    editVisible(val) {
      if (val === true) this.edit_content = this.content[this.type];
      this.visible = val;
    },
    visible(val) {
      this.$emit("update:editVisible", val);
    }
  }
};
</script>

