<template>
  <div class="logo">
    <img src="@/assets/logo.svg" style="width: 400px; height: 400px;" />
    <div class="info">
      <dl>
        <dt>
          <h1>Pet Web</h1>
        </dt>
        <dd>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一个基于区块链的宠物商店</p>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  }
};
</script>

<style>
.logo {
  width: 50%;
  height: 50%;
  margin-left: 40%;
  margin-top: 5%;
}

.info {
  font-size: 150%;
  padding: 10px;
}
</style>

