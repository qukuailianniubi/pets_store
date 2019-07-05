<template>
  <div class="main">
    <div class="button">
      <span>按时间筛选：</span>
      <el-date-picker v-model="date" type="date" placeholder="选择日期" value-format="yyyy-mm-dd"></el-date-picker>
    </div>
    <el-table
      :data="data.slice((currpage - 1) * pagesize, currpage * pagesize)"
      stripe
      border
      style="width: 100%; font-size: 120%;"
    >
      <el-table-column type="index"></el-table-column>
      <el-table-column v-for="item in column" :prop="item" :label="item" :key="item"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="complain(scope.$index)"
            :disabled="scope.row['状态'] === '审核中'"
          >申诉</el-button>
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
  </div>
</template>

<script>
export default {
  name: "trade",
  data() {
    return {
      pagesize: 10,
      currpage: 1,
      data: [],
      // data: [
      //   {
      //     ID: 1,
      //     时间: "2019-06-01",
      //     交易内容: "购入小狗tommy",
      //     余额变动: "-20"
      //   },
      //   {
      //     ID: 2,
      //     时间: "2019-06-01",
      //     交易内容: "卖出小狗tommy",
      //     余额变动: "+20"
      //   },
      //   {
      //     ID: 3,
      //     时间: "2019-06-01",
      //     交易内容: "购入小狗tommy",
      //     余额变动: "-20"
      //   },
      //   {
      //     ID: 4,
      //     时间: "2019-06-01",
      //     交易内容: "卖出小狗tommy",
      //     余额变动: "+20"
      //   },
      //   {
      //     ID: 5,
      //     时间: "2019-06-01",
      //     交易内容: "购入小狗tommy",
      //     余额变动: "-20"
      //   },
      //   {
      //     ID: 6,
      //     时间: "2019-06-01",
      //     交易内容: "卖出小狗tommy",
      //     余额变动: "+20"
      //   }
      // ],
      column: ["时间", "交易内容", "余额变动", "状态"],
      date: ""
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
    init() {
      let data = this.$store.getters.MyTrade,
        login_name = this.$store.state.login_name;
      let obj = {};
      for (const item of data) {
        obj = {};
        if (item["卖方"] === login_name) {
          obj["交易内容"] = `卖出${item["交易商品"]}`;
          obj["余额变动"] = `+${item["价格"]}`;
        } else {
          obj["交易内容"] = `买了${item["交易商品"]}`;
          obj["余额变动"] = `-${item["价格"]}`;
        }
        obj["时间"] = item["时间"];
        obj["状态"] = item["状态"];
        this.data.push(obj);
      }
    },
    complain(index) {
      let data = this.$store.getters.MyTrade;
      this.data[index]["状态"] = "审核中";
      data[index]["状态"] = "审核中";
      this.$store.commit("set_trades", data[index]);
      this.$message.success("成功申诉");
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

