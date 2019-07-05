<template>
  <li class="item">
    <el-card shadow="always">
      <div class="item-info">
        <img :src="imgUrl" :alt="data['名称']" style="width: 100%; height: 200px;" />
        <div>
          <div class="item-text">
            <span style="font-size:150%;">￥{{ data['价格'] }}</span>
            <span style="display: block">{{ data['名称'] }}</span>
          </div>
          <div class="button">
            <el-button
              type="primary"
              size="small"
              @click="detailVisible = true"
              :disabled="$store.getters.Money === 0"
            >查看详情</el-button>
          </div>
        </div>
      </div>
      <detail :detailVisible.sync="detailVisible" :obj="data" :if_buy="true" @update="update" />
    </el-card>
  </li>
</template>

<script>
import detail from "@/components/detail";

export default {
  name: "item",
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    detail
  },
  data() {
    return {
      imgUrl: require(`@/assets/${this.data.picture}`),
      detailVisible: false
    };
  },
  methods: {
    update() {
      this.$emit("update");
    }
  }
};
</script>

<style scoped>
.item {
  width: 20%;
  display: inline-block;
  padding: 20px;
}

.item-info {
  position: relative;
  border-radius: 3px;
}

.el-card:hover {
  border-color: red;
}

.item-text {
  width: 55%;
  margin-left: 10px;
  display: inline-block;
}

.button {
  width: 41%;
  display: inline-block;
  text-align: center;
  padding-bottom: 10px;
}
</style>

