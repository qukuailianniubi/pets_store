<template>
  <div class="main">
    <span style="font-size: 120%; float: right;">我的余额： ￥{{ $store.getters.Money }}</span>
    <div class="button">
      <el-button @click="open('上架')">上架</el-button>
      <el-button @click="open('下架')">下架</el-button>
      <el-button
        type="primary"
        @click="add_visible = true"
        :disabled="$store.getters.Money === 0"
      >新增</el-button>
    </div>
    <el-table
      :data="data"
      stripe
      border
      style="width: 100%; font-size: 120%;"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" />
      <el-table-column v-for="item in column" :prop="item" :label="item" :key="item"></el-table-column>
      <el-table-column label="价格">
        <template slot-scope="scope">
          <span>￥{{ scope.row['价格'] }}</span>
          <i class="el-icon-edit" style="float: right;cursor: pointer;" @click="edit(scope.row)"></i>
        </template>
      </el-table-column>
      <el-table-column prop="状态" label="状态" sortable></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="checkDetail(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        :total="data.length"
        background
        layout="prev, pager, next, sizes, total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
    <add :add_visible.sync="add_visible" />
    <detail :detailVisible.sync="detailVisible" :obj="obj" />
    <edit :editVisible.sync="editVisible" :content="content" type="价格" @update="update" />
  </div>
</template>

<script>
import add from "./components/add";
import detail from "@/components/detail";
import edit from "./components/edit";

export default {
  name: "mypet",
  components: {
    add,
    detail,
    edit
  },
  data() {
    return {
      if_up: false,
      if_pass: false,
      data: this.$store.getters.MyPet,
      column: ["名称", "品类", "出生日期", "描述"],
      pagesize: 10,
      currpage: 1,
      multipleSelection: [],
      add_visible: false,
      detailVisible: false,
      editVisible: false,
      obj: {},
      content: {}
    };
  },
  mounted() {},
  methods: {
    //currentPage改变时会触发
    handleCurrentChange(cpage) {
      this.currpage = cpage;
    },
    ////pagesize改变时触发
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    open(str) {
      if (this.multipleSelection.length === 0) return;
      this.$confirm(`是否继续${str}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.operate(str);
        })
        .catch(() => {});
    },
    operate(str) {
      let status = str === "下架" ? "未上架" : str;
      let pets_market = this.$store.state.pets_market;
      try {
        this.data = this.data.map(item => {
          for (const select of this.multipleSelection) {
            if (select["价格"] === "") {
              throw "需设置价格";
              // break;
            }
            if (item.ID === select.ID) {
              if (status === "上架") {
                delete item["状态"];
                pets_market.push(item);
                this.$store.commit("set_pets_market", pets_market);
              }
              item["状态"] = status;
              return item;
            }
          }
          return item;
        });
      } catch (err) {
        this.$message.error(err);
        return;
      }
      this.$store.commit("set_mypet", this.data);
      this.$message({
        type: "success",
        message: `${str}成功`
      });
    },
    //查看详情
    checkDetail(obj) {
      this.obj = { ...obj };
      this.detailVisible = true;
    },
    //修改价格或描述
    edit(obj) {
      this.editVisible = true;
      this.content = { ...obj };
    },
    update() {
      this.data = this.$store.getters.MyPet;
    }
  }
};
</script>

<style scoped>
.main {
  padding: 50px 8% 0;
}
.pagination {
  text-align: center;
  padding-top: 40px;
}
.button {
  padding: 20px 0;
}
</style>



