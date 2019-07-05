<template>
  <div class="content">
    <el-table
      :data="account_data.slice((currpage - 1) * pagesize, currpage * pagesize)"
      stripe
      border
      style="width: 100%; font-size: 120%;"
    >
      <el-table-column v-for="item in Object.keys(map)" :prop="item" :label="map[item]" :key="item"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)"
            type="primary"
            :disabled="(scope.row.status !== '审核中')"
          >通过审核</el-button>
          <el-button
            size="mini"
            @click="handleNopass(scope.row)"
            :disabled="(scope.row.status !== '审核中')"
          >审核不通过</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :page-sizes="[5, 10]"
        :page-size="pagesize"
        :total="account_data.length"
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
  name: "Account",
  data() {
    return {
      account_data: [
        { time: "2019-07-05", id: 1, account: "lky", status: "审核中" },
        { time: "2019-07-05", id: 2, account: "wjy", status: "审核中" }
      ],
      map: {
        time: "注册时间",
        id: "ID",
        account: "帐号用户名",
        status: "状态"
      },
      pagesize: 10,
      currpage: 1
    };
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
      n.status = "审核通过";
      this.$store.dispatch("pass");
      this.$message.success("审核通过");
    },
    handleNopass(n) {
      n.status = "审核不通过";
      this.$message.warning("审核不通过");
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

