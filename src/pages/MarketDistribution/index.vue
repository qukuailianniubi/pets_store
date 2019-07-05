<template>
  <div class="content">
    <div style="width: 50%; display: inline-block;">
      <div class="up-charts">
        <div class="item-dt">
          <h1>宠物种类数量分布</h1>
          <div style="padding-top: 10px">
            <item-distribution />
          </div>
        </div>
        <div class="trade">
          <div class="num">
            <h1 style="padding-left: 20px; padding-top: 20px;">交易次数</h1>
            <div
              style="font-size: 300%; padding: 40px; text-align: center"
            >{{ $store.state.trade_num }}次</div>
          </div>
          <div class="price">
            <h1 style="padding-left: 20px; padding-top: 20px;">交易金额</h1>
            <div
              style="font-size: 300%; padding: 40px; text-align: center"
            >￥{{ $store.state.trade_money}}</div>
          </div>
        </div>
      </div>
      <div class="av-price">
        <h1>宠物价格分布</h1>
        <average-price />
      </div>
    </div>
    <div class="market">
      <tb :data="data" :column="columns" />
    </div>
  </div>
</template>

<script>
import itemDistribution from "./components/itemDistribution";
import averagePrice from "./components/averagePrice";
import tb from "../../components/tb";

export default {
  name: "MarketDistribution",
  components: {
    itemDistribution,
    averagePrice,
    tb
  },
  data() {
    return {
      data: this.$store.state.pets_market,
      columns: ["ID", "名称", "品类", "价格", "描述"]
    };
  }
};
</script>

<style scoped>
.content {
  display: flex;
  align-items: stretch;
  height: 90%;
  margin: 20px 40px;
}
.up-charts {
  display: flex;
  align-items: stretch;
}
.item-dt {
  width: 100%;
  background: #ffffff;
  padding: 20px 20px 0;
}

.trade {
  display: inline-block;
  margin-left: 4%;
  width: 100%;
}

.num {
  height: 45%;
  width: 100%;
  background: #ffffff;
}

.price {
  margin-top: 10%;
  height: 47%;
  background: #ffffff;
}
.av-price {
  width: 100%;
  background: #ffffff;
  margin-top: 3%;
}

.av-price h1 {
  margin-top: 20px;
  margin-left: 20px;
}

.market {
  width: 40%;
  margin-left: 5%;
  background: #ffffff;
  padding: 30px;
}
</style>

