<template>
  <div class="page">
    <div class="header">
      <div class="header-prefix">
        <img src="@/assets/img/back.svg" alt="" class="page-back" @click="$router.go(-1)" />
      </div>
      <h2 class="header-title" v-text="type"></h2>
    </div>
    <div class="main padding">
      <div class="textarea-wrap">
        <textarea class="textarea" name="" id="" maxlength="20" autofocus :placeholder="placeholder" v-model="txt"></textarea>
        <span>{{ txt.length }}/20</span>
      </div>
    </div>
    <div class="btn-wrap">
      <a href="javascript:void(0);" class="button primary" @click="toChangePassword">确认</a>
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
      if (this.type == '公益宣言') {
        this.placeholder = '请输入公益宣言'
      } else if (this.type == '详细地址') {
        this.placeholder = '请输入详细地址'
      }
    },
    check() {
      //校验表单
      if (!this.txt) {
        swal(this.placeholder, { button: '确定' })
        return false
      }
      return true
    },
    toChangePassword() {
      //完成
      if (this.check()) {
        let userInfo = this.$store.getters.getuserInfo
        if (this.type == '公益宣言') {
          userInfo.albp0085 = this.txt
        } else if (this.type == '详细地址') {
          userInfo.albp0013 = this.txt
        }
        this.$store.commit('changeuserInfo', userInfo)
        this.commonRouter.toBasicInfo()
      }
    },
  },
}
</script>
<style lang="scss" scoped></style>
