<template>
  <el-dialog title="新增" :visible.sync="visible" width="20%">
    <el-form :model="form" label-width="100px" ref="form">
      <el-form-item
        v-for="item in column"
        :key="item"
        :label="`${item}：`"
        :prop="item"
        :rules="rules"
      >
        <el-input v-model="form[item]" v-if="item !== '出生日期'"></el-input>
        <el-date-picker
          v-model="form[item]"
          type="date"
          placeholder="选择日期"
          value-format="yyyy-MM-dd"
          v-if="item === '出生日期'"
          style="width: 100%;"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :limit="1"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">上传图片</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="submit('form')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "add",
  props: {
    add_visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      column: ["名称", "品类", "出生日期", "描述"],
      form: {
        ID: "",
        名称: "",
        品类: "",
        出生日期: "",
        描述: ""
      },
      fileList: [],
      rules: [{ required: true, message: "不能为空", triggle: "blur" }]
    };
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let my_pet = this.$store.getters.MyPet;
          this.form["ID"] = "LKY1";
          this.form["价格"] = "";
          this.form["状态"] = "未上架";
          this.form["picture"] = "pet.jpg";
          this.form["belong"] = this.$store.state.login_name;
          my_pet.push(this.form);
          this.$store.commit("set_mypet", my_pet);
          this.$message.success("添加成功");
          this.visible = false;
        } else {
          return false;
        }
      });
    }
  },
  watch: {
    add_visible(val) {
      this.visible = val;
    },
    visible(val) {
      this.$emit("update:add_visible", val);
    }
  }
};
</script>

<style>
</style>
