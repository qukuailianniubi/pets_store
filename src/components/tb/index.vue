<template>
  <div>
    <el-table
      :data="data.slice((currpage - 1) * pagesize, currpage * pagesize)"
      stripe
      border
      style="width: 100%; font-size: 120%;"
    >
      <el-table-column v-for="item in column" :prop="item" :label="item" :key="item"></el-table-column>
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
  name: "tb",
  props: {
    data: {
      type: Array,
      default: () => {}
    },
    column: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
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
    }
  }
};
</script>

<style scoped>
.pagination {
  text-align: center;
  padding-top: 40px;
}
</style>


