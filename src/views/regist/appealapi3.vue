个人注册第 1 步
<template>
  <div class="page my_register">
    <div class="header">
      <div class="header-prefix">
        <img src="@/assets/img/back.svg" alt="" class="page-back" @click="$router.go(-1)" />
      </div>
      <h2 class="header-title"></h2>
      <div class="header-suffix"></div>
    </div>
    <section
      class="main"
      style="
        padding: 0 3.75rem 0;
        margin-top: 4.4rem;
        background-color: #ffffff;
      "
    >
      <h2 class="large-title" style="font-size:3.5rem;margin:2rem 0;">账号申诉</h2>
      <p class="text gray mb-huge" style="font-size:1.4rem;line-height:2.2rem;" size="large">
        该账号绑定微信与您当前微信不符
      </p>
      <div v-if="appeal.nickname">
        <p class="text gray mb-huge" style="font-size:1.4rem;line-height:2.2rem;" size="large">
          该账号绑定的微信号是:
        </p>
        <div
          class="form form_tip"
          style="padding: 1rem 0; display: flex;margin-bottom:4rem;border-top: 0.2rem solid #ececec; border-bottom: 0.2rem solid #ececec;"
        >
          <div style="width:5rem;height:5rem;">
            <img style="width:5rem;height:5rem;" :src="appeal.headimgurl" alt="" />
          </div>
          <div style="line-height:5rem; font-size:1.5rem;margin-left:1rem;">
            {{ appeal.nickname }}
          </div>
        </div>
        <p class="text gray mb-huge" style="font-size:1.4rem;line-height:2.2rem;" size="large">
          请使用以上微信登录,若此账号不使用,需要换微信绑定请继续申诉
        </p>
      </div>
      <div v-else>
        <p class="text gray mb-huge" style="font-size:1.4rem;line-height:2.2rem;" size="large">
          此微信以绑定其他账号,需要换微信绑定请继续申诉
        </p>
      </div>
      <a href="javascript:void(0);" class="button danger-gradient" type="danger" @click="Submit()" style="margin-top: 1rem">继续申请</a>
    </section>
  </div>
</template>

<script>
import {} from 'vant' //vant组件
export default {
  components: {},
  data() {
    return {
      appeal: {
        albp0005: '',
        albp0052: '',
        beanname: '',
        headimgurl: '',
        javaClass: '',
        nickname: '',
      },
    }
  },
  created() {
    this.appeal = this.$store.getters.getappeal
  },
  mounted() {},
  methods: {
    Submit() {
      this.$router.push({ path: '/findPwdapi' })
    },
  },
}
</script>

<style lang="scss" scoped>
.fontdx {
  font-size: 1.4rem !important;
}
.required::after {
  content: '*';
  color: #db0000;
  position: relative;
  // top: 0.3rem;
}
.form_tip .form-item {
  margin-bottom: 0.2rem;
}
.select-wrap-item li.active {
  color: #333;
}
.select-wrap-header span:last-child {
  color: #db0000;
}
.my_pickselect {
  padding-right: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.my_register .van-cascader__title {
  width: 100%;
}
.my_register .van-cascader__title .my_cascader {
  widows: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.my_register .van-cascader__header {
  width: 100%;
}
.form-item-core,
.van-cell {
  border-bottom: 0.05rem solid #ececec;
}
// span[id^='span_']{font-size:0.875rem;color:#db0000;}
</style>
