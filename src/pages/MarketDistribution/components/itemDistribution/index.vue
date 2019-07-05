<template>
  <ve-pie :data="chart_data"></ve-pie>
</template>

<script>
export default {
  name: "itemDistribution",
  data() {
    return {
      chart_data: {}
    };
  },
  mounted() {
    let data = this.$store.state.pets_market;
    this.init(data);
  },
  methods: {
    init(data) {
      let column = this.getColumn(data),
        arr = [];
      this.chart_data.columns = ["品类", "数量"];
      for (const key in column) {
        let item = {};
        item["品类"] = key;
        item["数量"] = column[key];
        arr.push(item);
      }
      this.chart_data.rows = [...arr];
    },
    getColumn(data) {
      let column = {};
      for (const item of data) {
        if (column[item["品类"]] === undefined) {
          column[item["品类"]] = 1;
          continue;
        }
        column[item["品类"]] = column[item["品类"]] + 1;
      }
      console.log(column);
      return column;
    }
  }
};
</script>
