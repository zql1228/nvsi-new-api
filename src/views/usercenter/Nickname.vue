<template>
  <div class="page">
    <div class="header">
      <div class="header-prefix">
        <img src="@/assets/img/back.svg" alt="" class="page-back" @click="$router.go(-1)" />
      </div>
      <h2 class="header-title" v-text="type"></h2>
      <div class="header-suffix"></div>
    </div>
    <div class="main padding">
      <div class="input">
        <input type="text" :placeholder="placeholder" v-model="txt" maxlength="20" @blur="check" />
      </div>
    </div>
    <div class="btn-wrap">
      <a href="javascript:void(0);" class="button primary" @click="toComfirm">确认</a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: this.$route.params.type,
      txt: '',
      placeholder: '',
    }
  },
  mounted() {
    this.utilscommit.wetchat({ title: '欢迎加入中国志愿服务', desc: '“益”路有你 志愿同行', link: window.location.origin })
    this.fixPlaceholder()
  },
  methods: {
    fixPlaceholder() {
      //表单填充
      if (this.type == '昵称') {
        this.placeholder = '请输入你的昵称'
      } else if (this.type == '电话号码') {
        this.placeholder = '请输入你的电话号码'
      } else if (this.type == 'QQ') {
        this.placeholder = '请输入你的QQ'
      } else if (this.type == '微信') {
        this.placeholder = '请输入你的微信'
      }
    },
    check() {
      //表单校验
      if (!this.txt) {
        swal(this.placeholder, { button: '确定' })
        return false
      } else if (this.type == '电话号码' && !this.common.checkTel(this.txt)) {
        swal('电话号码输入错误', { button: '确定' })
        return false
      } else if (this.type == 'QQ' && !this.common.checkqq(this.txt)) {
        swal('QQ输入错误', { button: '确定' })
        return false
      }
      return true
    },
    toComfirm() {
      //完成
      if (this.check()) {
        let userInfo = this.$store.getters.getuserInfo
        if (this.type == '昵称') {
          userInfo.albp0084 = this.txt
        } else if (this.type == '电话号码') {
          userInfo.tel = this.txt
        } else if (this.type == 'QQ') {
          userInfo.albp0012 = this.txt
        } else if (this.type == '微信') {
          userInfo.albp0015 = this.txt
        }
        this.$store.commit('changeuserInfo', userInfo)
        this.commonRouter.toBasicInfo()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.padding {
  margin-top: 4.4rem;
}
</style>
