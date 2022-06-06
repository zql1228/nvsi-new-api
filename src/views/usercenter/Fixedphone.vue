<template>
  <div class="page">
    <header class="header">
      <div class="header-prefix">
        <img src="@/assets/img/back.svg" alt="" class="page-back" @click="$router.go(-1)" />
      </div>
      <h1 class="header-title" v-text="text"></h1>
      <div class="header-suffix"></div>
    </header>
    <section class="section mt-20 plr-40 pt-35 bg-white" style="margin-top: 4rem">
      <div class="input-box">
        <input type="text" class="input-box-core" :placeholder="text2" v-model="value" />
      </div>
      <div style="1.2rem;margin-top:1rem" id="fixedphone"></div>
      <a href="javascript:void(0)" class="button danger-gradient mt-70" type="danger" @click="toPage">确定</a>
    </section>
  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
  components: { Toast },
  data: function() {
    return {
      text: '',
      text2: '',
      value: '',
      data: { albp0005: this.$store.getters.getuserInfo.albp0005, albp0006: this.$store.getters.getuserInfo.albp0006 },
    }
  },
  mounted() {
    // this.utilscommit.wetchat({ title: '欢迎加入中国志愿服务', desc: '“益”路有你 志愿同行', link: window.location.origin })
    this.text = this.$route.params.text
    this.text2 = this.$route.params.text2
  },
  methods: {
    toPage() {
      if (!this.value) {
        this.common.formTips('fixedphone', '') //清空提示
        // this.$router.push({
        //   name: "Basic",
        //   params: { name: this.text, value: this.value },
        // });
        this.$router.go(-1)
      } else {
        if (this.text == 'QQ') {
          if (this.common.checkqq(this.value) && this.value) {
            this.data.albp0012 = this.value
            this.qingq()
          } else {
            this.common.formTips('fixedphone', 'QQ号格式填写错误')
          }
        } else if (this.text == '电话号码') {
          if (this.common.checkTel(this.value) && this.value) {
            this.data.albp0011 = this.value
            this.qingq()
          } else {
            this.common.formTips('fixedphone', '电话号码格式填写错误')
          }
        } else if (this.text == '微信') {
          if (this.value) {
            this.data.albp0015 = this.value
            this.qingq()
          }
          // else {
          //   this.common.formTips("fixedphone", "微信号格式填写错误");
          // }
        } else if (this.text == '详细地址') {
          this.data.albp0013 = this.value
          this.qingq()
        } else if (this.text == '邮箱') {
          if (this.common.checkEmail(this.value) && this.value) {
            this.data.albp0081 = this.value
            this.qingq()
          } else {
            this.common.formTips('fixedphone', '邮箱格式填写错误')
          }
        }
      }
    },
    qingq() {
      this.utilscommit.requestapi('updateVolunInforOnH5', this.data, this.submitInfoBack)
    },
    submitInfoBack(res) {
      if (res.code == 0) {
        Toast('修改成功')
      } else {
        Toast('修改失败')
      }
      this.$router.go(-1)
    },
  },
}
</script>
<style scoped></style>
