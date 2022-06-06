// 面部录入
<template>
  <div class="page" style="background: #f5f5f5">
    <div class="header">
      <div class="header-prefix">
        <img
          src="@/assets/img/back.svg"
          alt=""
          class="page-back"
          @click="$router.go(-1)"
        />
      </div>
      <h2 class="header-title">面部录入</h2>
      <div class="header-suffix t-r"></div>
    </div>
    <div class="main">
      <p class="protocol">
        具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议具体面部录入相关协议17日上午
      </p>
    </div>
    <div
      class="flex-h v-m"
      style="padding: 1rem 1.5rem 1.5rem; background: #fff"
    >
      <div class="v-radio">
        <input type="checkbox" name="a" class="v-radio-core" @click="agreed = !agreed"/>
        <span class="v-radio-frame"></span>
        <span class="v-radio-label" follow="1"></span>
      </div>
      <span class="text" size="large" style="margin-left: 1.5rem"
        >阅读并同意《面部录入协议》</span
      >
    </div>
    <div class="btn-wrapper" style="background: #fff">
      <a  class="btn primary" @click.prevent="beginInput">开始录入</a>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      agreed: false, //是否同意协议
    };
  },
  methods: {
    beginInput: function () {
      if (!this.agreed) return false;
      this.$router.push({ path: "upload-face" });
    },
  },
};
</script>
sc
<style lang="scss">
.protocol {
  padding: 1rem 1.5rem;
  margin: 1rem 0 0;
  line-height: 2.4rem;
  font-size: 1.4rem;
  color: #666666;
  background: #fff;
}
</style>