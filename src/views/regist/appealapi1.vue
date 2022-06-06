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
        仅支持志愿者进行账号审诉,请先确认您要申诉的账号,若您已申诉,请点击
        <a href="javascript:void(0)" style="color:#EC6563;" class="link-text" @click="$router.push({ name: 'progressapi' })">申诉进度查询</a>
      </p>
      <div class="form form_tip" style="margin-bottom:4rem;">
        <div class="form-item" subline>
          <h2 class="form-item-label required">证件号码</h2>
          <div class="form-item-core">
            <input type="text" placeholder="请输入您的证件号码" v-model="idcardNo" maxlength="20" @blur="checkCardno" />
          </div>
        </div>
        <span id="span_3" class="fontdx"></span>
        <div class="form-item" subline>
          <h2 class="form-item-label required">手机号码</h2>

          <div class="form-item-core">
            <input type="text" placeholder="请输入您的手机号码" v-model="telphone" maxlength="20" @blur="checkPhone" />
          </div>
        </div>
        <span id="span_1" class="fontdx"></span>
      </div>
      <a href="javascript:void(0);" class="button danger-gradient" type="danger" @click="Submit()" style="margin-top: 1rem">下一步</a>
    </section>
  </div>
</template>

<script>
import { Toast } from 'vant' //vant组件
export default {
  components: { Toast },
  data() {
    return {
      idcardNo: '', //证件号
      telphone: '', //手机号
    }
  },
  mounted() {},
  methods: {
    checkCardno() {
      //证件号校验
      this.common.formTips('span_3', '')
      if (!this.idcardNo) {
        this.common.formTips('span_3', '证件号码不能为空')
        return false
      } else if (!this.common.checkCardNo(this.idcardNo)) {
        this.common.formTips('span_3', '证件号码格式错误,请重新输入')
        return false
      } else {
        return true
      }
    },
    checkPhone() {
      //验证手机号
      this.common.formTips('span_1', '')
      if (!this.telphone) {
        this.common.formTips('span_1', '手机号码不能为空')
        return false
      } else if (!this.common.checkPhone(this.telphone)) {
        this.common.formTips('span_1', '手机号码格式错误,请重新输入')
        return false
      } else {
        return true
      }
    },
    Submit() {
      //提交

      if (this.checkPhone() && this.checkCardno()) {
        let data = {
          idcardNo: this.idcardNo, //证件号
          telphone: this.telphone, //手机号
          openid: 'o1AEt5qnVGf5Nk9lwcpwVBSR19dI',
          unionid: 'oFtC6s48cXYfSkXTjLzs1Er1VCvw',
        }
        this.utilscommit.requestapi('accountAppealCheckFortisH5', data, (src) => {
          if (src && src.code == 0) {
            if (src.data.appealchecktype == 1) {
              this.$router.push({ path: '/findPwdapi' })
            } else if (src.data.appealchecktype == 2) {
              let a = {}
              if (src.data.volinfo) {
                a = Object.assign(a, src.data.volinfo)
              }
              if (src.data.wxinfo) {
                a = Object.assign(a, src.data.wxinfo)
              }
              a = Object.assign(a, { cardno: this.idcardNo, phone: this.telphone })
              this.$store.commit('changappeal', a)
              this.$router.push({ path: '/appealapi3' })
            } else if (src.message) {
              Toast(src.message)
            } else {
              Toast('查询失败')
            }
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
