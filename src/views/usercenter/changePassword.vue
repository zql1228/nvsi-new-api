<template>
  <div class="page">
    <div class="header">
      <div class="header-prefix">
        <img src="@/assets/img/back.svg" alt="" class="page-back" @click="$router.go(-1)" />
      </div>
      <h2 class="header-title">修改密码</h2>
      <div class="header-suffix"></div>
    </div>
    <section class="main" style="padding:1.5rem;margin-top:4.4rem;background:#fff">
      <!-- <h2 class="large-title">修改密码</h2> -->
      <div class="form">
        <div class="form-item" subline>
          <!-- <h2 class="form-item-label required">原密码</h2> -->
          <div class="form-item-core">
            <input type="password" placeholder="请输入原始密码" v-model="oldpwd" maxlength="16" @blur="checkoldpwd" />
          </div>
        </div>
        <div id="oldpwdtips"></div>
        <div class="form-item" subline>
          <!-- <h2 class="form-item-label required">新密码</h2> -->
          <div class="form-item-core">
            <input type="password" placeholder="请输入新密码" v-model="newpwd" maxlength="16" @blur="checknewword" />
          </div>
        </div>
        <div id="newpwdtips"></div>
      </div>
      <div class="form-row">
        <p class="form-tip">
          <img src="@/assets/img/tip.svg" alt="" />
          <span>密码长度8-20位</span>
        </p>
        <p class="form-tip">
          <img src="@/assets/img/tip.svg" alt="" />
          <span>密码须由大写，小写字母和数字三者组成</span>
        </p>
      </div>
    </section>
    <div class="btn-wrap">
      <div class="button primary" @click="checkPassword">确认修改</div>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  components: { Dialog },
  data: function() {
    return {
      oldpwd: '', //用户名
      newpwd: '', //密码
    }
  },
  mounted() {
    this.utilscommit.wetchat({ title: '欢迎加入中国志愿服务', desc: '“益”路有你 志愿同行', link: window.location.origin })
  },
  methods: {
    checkoldpwd() {
      this.common.formTips('oldpwdtips', '')
      if (!this.oldpwd) {
        this.common.formTips('oldpwdtips', '原密码不能为空')
        return false
      }
      // if(this.oldpwd!=this.password ){
      //   this.common.formTips('oldpwdtips',"原密码输入错误")
      //   return false
      // }
      return true
    },
    checknewword() {
      //验证密码
      this.common.formTips('newpwdtips', '')
      if (!this.newpwd) {
        this.common.formTips('newpwdtips', '新密码不能为空')
        return false
      }
      if (!this.common.checkPwd(this.newpwd)) {
        this.common.formTips('newpwdtips', '密码长度为8-20个字符，且须由大写，小写字母和数字三者组成')
        return false
      }
      return true
    },
    checkPassword() {
      if (this.checkoldpwd() && this.checknewword()) {
        console.log({ username: this.$store.getters.getuserInfo.albp0052, oldpw: this.oldpwd, newPw: this.newpwd })
        this.utilscommit.requestapi(
          'volChangePasswordFortisH5',
          { username: this.$store.getters.getuserInfo.albp0052, oldpw: this.oldpwd, newPw: this.newpwd },
          this.callbackpwd
        )
      }
    },
    callbackpwd(res) {
      if (res.code == 0) {
        Dialog.alert({
          message: res.message,
        }).then(() => {
          this.$router.go(-1) //返回设置页
        })
      } else {
        Dialog.alert({
          message: res.message,
        }).then(() => {})
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.required::after {
  content: '*';
  color: #ff0000;
  position: relative;
  // top: 0.3rem;
}
.zyzzuc {
  color: #108ee9;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 28px;
}
.zyzzuc > img {
  margin-left: 4px;
  height: 16px;
}
.form-item-core,
.form-item-core input {
  background: #f3f3f3;
  border-radius: 0.5rem;
}
.form-item-core input {
  padding-left: 1rem;
}
.form-tip span {
  line-height: 2.5rem;
}
.button.primary {
  background: #db0000;
}
</style>
