<template>
  <div class="main">
    <span style="font-size: 120%; float: right;">我的余额： ￥{{ $store.getters.Money }}</span>
    <div class="button">
      <el-input placeholder="搜索宠物的名字" style="width: 20%;margin-left: 25px;"></el-input>
      <el-pagination
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pagesize"
        :total="data.length"
        background
        layout="prev, pager, next, sizes, total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        style="margin-left: 50px;"
      />
    </div>
    <div>
      <template v-for="item in data.slice((currpage - 1) * pagesize, currpage * pagesize)">
        <item :data="item" :key="item.ID" @update="update" />
      </template>
    </div>
  </div>
</template>

<script>
import item from "./components/item";

export default {
  name: "Index",
  components: {
    item
  },
  data() {
    return {
      data: this.$store.getters.PetMarket,
      column: {
        ID: "ID",
        name: "名称",
        type: "品类",
        birth: "出生日期",
        price: "价格",
        descrip: "描述"
      },
      pagesize: 10,
      currpage: 1,
      multipleSelection: [],
      loading: true
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    update() {
      this.data = this.$store.getters.PetMarket;
    }
  }
};
</script>

<style scoped>
.main {
  padding: 50px 8% 0;
}

.button {
  display: flex;
  align-items: center;
  padding: 20px 0;
}
</style>

