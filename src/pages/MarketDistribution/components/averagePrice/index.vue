<template>
  <ve-histogram :data="chart_data" height="250px"></ve-histogram>
</template>

<script>
export default {
  name: "averagePrice",
  data() {
    return {
      chart_data: {}
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let data = this.$store.state.pets_market;
      let columnNum = this.getColumnNum(data);
      let columnTotal = this.getColumnTotalPrice(data);
      let arr = [];
      this.chart_data.columns = ["品类", "平均价格"];
      for (const key in columnNum) {
        let item = {};
        item["品类"] = key;
        item["平均价格"] = columnTotal[key] / columnNum[key];
        arr.push(item);
      }
      this.chart_data.rows = [...arr];
    },
    getColumnNum(data) {
      let column = {};
      for (const item of data) {
        if (column[item["品类"]] === undefined) {
          column[item["品类"]] = 1;
          continue;
        }
        column[item["品类"]] = column[item["品类"]] + 1;
      }
      // console.log(column);
      return column;
    },
    getColumnTotalPrice(data) {
      let column = {};
      for (const item of data) {
        if (column[item["品类"]] === undefined) {
          column[item["品类"]] = item["价格"];
          continue;
        }
        column[item["品类"]] = column[item["品类"]] + item["价格"];
      }
      // console.log(column);
      return column;
    }
  }
};
</script>
