<template>
  <div class="content">
    <el-table :data="data" stripe border style="width: 100%; font-size: 120%;">
      <el-table-column type="index"></el-table-column>
      <el-table-column
        v-for="key in Object.keys(column)"
        :prop="column[key]"
        :label="column[key]"
        :key="key"
      ></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)"
            type="primary"
            :disabled="(scope.row['状态'] !== '审核中')"
          >通过审核</el-button>
          <el-button
            size="mini"
            @click="handleNopass(scope.row)"
            :disabled="(scope.row['状态'] !== '审核中')"
          >不通过</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :page-sizes="[5, 10]"
        :page-size="pagesize"
        :total="data.length"
        background
        layout="prev, pager, next, sizes, total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Issues",
  data() {
    return {
      pagesize: 10,
      currpage: 1,
      // data: [
      //   {
      //     ID: 1,
      //     时间: "2019-06-01",
      //     交易商品: "tommy",
      //     价格: "￥20",
      //     卖方公钥: "fasdf",
      //     买方公钥: "dfasd",
      //     状态: "审核中"
      //   },
      // ],
      data: [],
      column: {
        date: "时间",
        item: "交易商品",
        price: "价格",
        sell_pub: "卖方",
        buy_pub: "买方",
        status: "状态"
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    //currentPage改变时会触发
    handleCurrentChange(cpage) {
      this.currpage = cpage;
    },
    ////pagesize改变时触发
    handleSizeChange(psize) {
      this.pagesize = psize;
    },
    handleEdit(n) {
      n["状态"] = "审核通过";
      this.$store.dispatch("complain");
      this.$message.success("审核通过");
    },
    handleNopass(n) {
      n["状态"] = "审核不通过";
      this.$message.warning("审核不通过");
    },
    init() {
      let trades = this.$store.state.trades;
      for (let item of trades) {
        let obj = {
          时间: item["时间"],
          交易商品: item["交易商品"],
          价格: "￥200",
          卖方: `${item["卖方"]}(${item["卖方公钥"]})`,
          买方: `${item["买方"]}(${item["买方公钥"]})`,
          状态: item["状态"]
        };
        this.data.push(obj);
      }
    }
  }
};
</script>

<style scoped>
.content {
  background: #fff;
  height: 90%;
  padding: 40px 60px 0;
  margin: 20px;
}

.pagination {
  text-align: center;
  padding-top: 40px;
}
</style>
