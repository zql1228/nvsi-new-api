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
      <h2 class="large-title" style="font-size:3.5rem;margin:2rem 0;">绑定账号</h2>
      <p class="text gray mb-huge" style="font-size:1.4rem;line-height:2.2rem;" size="large">
        还没有账号? <a href="javascript:void(0)" style="color:#EC6563;" class="link-text" @click="$router.push({ name: 'progressapi' })">快速注册</a>
      </p>
      <div class="form form_tip" style="margin-bottom:4rem;">
        <div class="form-item" subline>
          <h2 class="form-item-label required">账号</h2>
          <div class="form-item-core">
            <input type="text" placeholder="请输入用户名或身份证号" v-model="username" maxlength="20" @blur="checkCardno" />
          </div>
        </div>
        <span id="span_3" class="fontdx"></span>
        <div class="form-item" subline>
          <h2 class="form-item-label required">密码</h2>

          <div class="form-item-core">
            <input type="text" placeholder="请输入您的密码" v-model="password" maxlength="20" @blur="checkPhone" />
          </div>
        </div>
        <span id="span_1" class="fontdx"></span>
      </div>
      <a href="javascript:void(0);" class="button danger-gradient" type="danger" @click="Submit()" style="margin-top: 1rem">绑定并登录</a>
      <p class="text gray mb-huge" style="margin-top:2rem;  font-size:1.4rem;line-height:2.2rem;" size="large">
        1.新用户请点击快速注册,方便您正常使用.<br />
        2.老用户首次使用微信登录,请绑定之前注册的账<br />
        号,保护账号安全<br />
      </p>
    </section>
  </div>
</template>

<script>
import { Toast } from 'vant' //vant组件
export default {
  components: { Toast },
  data() {
    return {
      username: '', //证件号
      password: '', //手机号
    }
  },
  mounted() {},
  methods: {
    checkCardno() {
      //证件号校验
      this.common.formTips('span_3', '')
      if (!this.username) {
        this.common.formTips('span_3', '证件号码不能为空')
        return false
      } else {
        return true
      }
    },
    checkPhone() {
      //验证手机号
      this.common.formTips('span_1', '')
      if (!this.password) {
        this.common.formTips('span_1', '密码不能为空')
        return false
      } else {
        return true
      }
    },
    Submit() {
      //提交

      if (this.checkPhone() && this.checkCardno()) {
        let data = {
          username: this.username, //证件号
          password: this.password, //手机号
          openid: 'o1AEt5qnVGf5Nk9lwcpwVBSR19dI',
          unionid: 'oFtC6s48cXYfSkXTjLzs1Er1VCvw',
        }
        this.utilscommit.requestapi('updatebindvolAccountWeChatH5Fortis', data, (src) => {
          // debugger
          if (src && src.code == 0) {
            // if (src.data.appealchecktype == 1) {
            //   this.$router.push({ path: '/findPwdapi' })
            // } else if (src.message) {
            //   Toast(src.message)
            // } else {
            //   Toast('查询失败')
            // }
          }
        })
      }
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
