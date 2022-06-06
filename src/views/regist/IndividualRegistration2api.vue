个人注册第 2 步
<template>
  <div class="page">
    <header class="header">
      <div class="header-prefix">
        <a class="flex-h v-m back" @click="$router.go(-1)">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-point-left"></use>
          </svg>
          <b>返回</b>
        </a>
      </div>
      <h1 class="header-title"></h1>
      <div class="header-suffix"></div>
    </header>
    <section class="section pt-30 plr-70 pb-35 bg-white" style="margin-top: 3rem">
      <div class="form">
        <h2 class="form-title">注册</h2>
        <p class="form-title-tip mb-30">创建账户和密码</p>
        <div class="form-row">
          <div class="form-label">用户名</div>
          <input type="text" class="form-core" placeholder="请输入用户名" v-model="num" maxlength="20" @blur="checkNUm" />
        </div>
        <span id="usernametip" class="fontdx"></span>
        <div class="form-row">
          <div class="form-label">密码</div>
          <input type="password" class="form-core" placeholder="请输入密码" v-model="password" maxlength="20" @blur="checkPassword" />
          <span id="pwdtip" class="fontdx"></span>
          <div v-if="passwordz == 1">
            <p class="form-tip">
              <img src="@/assets/img/tip.svg" alt="" />
              <span>密码长度8-20位</span>
            </p>
            <p class="form-tip">
              <img src="@/assets/img/tip.svg" alt="" />
              <span>且必须同时包含数字，大写字母和小写字母</span>
            </p>
          </div>
        </div>
        <div class="form-row">
          <div class="form-label">确认密码</div>
          <input type="password" class="form-core" placeholder="请再次输入密码" v-model="password2" maxlength="20" @blur="checkPassword2" />
        </div>
        <span id="pwdtip2" class="fontdx"></span>
        <div class="form-row">
          <div class="form-label">手机号</div>
          <input type="text" class="form-core" placeholder="请输入手机号码" id="phone" v-model="phone" maxlength="11" @blur="checkPhone" />
        </div>
        <span id="phonetip" class="fontdx"></span>
        <div class="form-row">
          <div class="form-label">图形验证码</div>
          <input
            type="text"
            class="form-core"
            style="padding-right: 8rem"
            placeholder="请输入验证码"
            v-model="imgCode"
            maxlength="4"
            @blur="checkImgcode"
          />
          <img class="form-verification-code" :src="imgSrc" @click="changeImage" alt="" />
        </div>
        <span id="imgcodetip" class="fontdx"></span>
        <a href="javascript:;" class="button danger-gradient" type="danger" id="btn1" @click="finish">完成</a>
        <div class="mt-40 mb-30 flex-h v-m t-c" style="white-space: nowrap">
          <!-- <div class="checkbox type2 mr-20">
            <input checked type="checkbox" v-model="agreement" name="" id="" />
            <span class="checkbox-frame"></span>
          </div> -->
          <checkbox checked-color="#ee0a24" style="margin-left: -2rem;font-size 1.6rem;padding-right:1rem;" v-model="agreement"></checkbox>

          <b class="text lh-initial" size="30"
            >我已阅读并同意<a href="javascript:void(0)" class="link-text" @click="privacy()">《隐私条款》</a>及<a
              href="javascript:void(0)"
              class="link-text"
              @click="registe()"
              >《注册协议》</a
            ></b
          >
        </div>
        <span id="agreement" class="fontdx"></span>
      </div>
    </section>
  </div>
</template>

<script>
import frame from '../../components/frame.vue'
import { Dialog, Checkbox } from 'vant'
export default {
  components: { frame, Dialog, Checkbox },
  data: function() {
    return {
      // modal: false,  //是否显示遮罩
      num: '', //账号
      numFlag: false, //账号是否唯一
      phone: '', //电话号码
      phoneFlag: false,
      imgCode: '', //图形验证码 用户输入的
      imgSrc: '', //图形验证码图片地址
      imgkey: '', //图形验证码key值
      //code: "", //短信验证
      password: '', //密码
      password2: '', //确认密码
      passwordz: 1,
      codeButton: '获取验证码',
      agreement: false, //是否已勾选协议 true已勾选 false未勾选
      countdown: 60,
      timer: '',
      isshow: 0, //0=未加载，1=加载中
      obj: {
        text1: '温馨提示',
        text2: '该手机号码已绑定其他账号，请输入未绑定的手机号码或解除绑定后再与身份信息绑定！',
        cel: '取消',
        confirm: '确定',
        urlname: 'individual-registration2',
      },
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path != '/individual-registrationapi' || to.path == '/privacy' || to.path == '/registe') {
      this.$store.commit('changeRegInfo', {})
    } else {
    }
    next()
  },
  mounted() {
    // this.regBack({ code: '0', message: '信息' })
    // this.utilscommit.requestapi('getImageCodeFortisH5', null, (src) => {
    //   console.log(src)
    // })
    // this.utilscommit.wetchat({ title: '欢迎加入中国志愿服务', desc: '“益”路有你 志愿同行', link: window.location.origin })
    this.changeImage()
  },
  watch: {
    pcancel(val) {
      console.log(val)
    },
  },
  methods: {
    privacy() {
      this.$router.push({ name: 'privacy' })
    },
    registe() {
      this.$router.push({ name: 'registe' })
    },
    checkNUm() {
      //验证账号
      this.common.formTips('usernametip', '')
      if (!this.num) {
        this.common.formTips('usernametip', '用户名不能为空')
        return false
      } else if (!this.common.checkUsername(this.num)) {
        this.common.formTips('usernametip', '用户名应以字母开头,由数字,字母和下划线组成,长度6～20个字符位')
        return false
      } else {
        this.utilscommit.requestapi('getVolNameCheckFortisH5', { albp0052: this.num }, this.nameOnlyback) /* 帐号唯一验证 */
        return true
      }
    },
    nameOnlyback(res) {
      //帐号唯一验证返回
      //  debugger
      if (res.code == 0) {
        this.numFlag = true
      } else if (res.code == 250001) {
        this.numFlag = false
        this.common.formTips('usernametip', '该用户名已存在,请重新输入')
      } else {
        this.numFlag = false
        this.common.formTips('usernametip', res.message)
      }
    },
    checkPhone() {
      //验证电话号码
      this.common.formTips('phonetip', '')
      if (!this.phone) {
        this.phoneFlag = false
        this.common.formTips('phonetip', '手机号不能为空')
        return false
      } else if (!this.common.checkPhone(this.phone)) {
        this.phoneFlag = false
        this.common.formTips('phonetip', '手机号错误')
        return false
      } else {
        this.phoneFlag = true
        // this.utilscommit.request('nvsi_jsCheckPhone', { mobile: this.phone }, this.phoneOnlyback) //手机号唯一验证
        return true
      }
    },
    phoneOnlyback(res) {
      if (res.code == 0) {
        this.phoneFlag = true
      } else {
        this.phoneFlag = false
        this.common.formTips('phonetip', res.message)
      }
    },
    checkImgcode() {
      //验证图形验证码
      this.common.formTips('imgcodetip', '')
      if (!this.imgCode) {
        this.common.formTips('imgcodetip', '图形验证码不能为空')
        return false
      }
      return true
    },
    checkPassword() {
      //验证密码
      this.common.formTips('pwdtip', '')
      if (!this.password) {
        this.common.formTips('pwdtip', '密码不能为空')
        this.passwordz = 1
        return false
      } else if (!this.common.checkPwd(this.password)) {
        this.common.formTips('pwdtip', '密码应同时包含数字,大写字母和小写字母,长度为8-20位')
        this.passwordz = 1
        return false
      }
      this.passwordz = 2
      if (this.password2) {
        if (this.password2 != this.password) {
          this.common.formTips('pwdtip', '两次输入密码不一致，请重新输入')
          return false
        }
      }
      if (this.password2 == this.password) {
        this.common.formTips('pwdtip', '')
        this.common.formTips('pwdtip2', '')
      }
      return true
    },
    checkPassword2() {
      if (!this.password2) {
        this.common.formTips('pwdtip2', '确认密码不能为空')
        return false
      } else if (this.password2 != this.password) {
        this.common.formTips('pwdtip2', '两次输入密码不一致，请重新输入')
        return false
      }
      if (this.common.checkPwd(this.password) && this.password2 == this.password) {
        this.common.formTips('pwdtip', '')
        this.common.formTips('pwdtip2', '')
      }
      return true
    },
    checkAgreement() {
      this.common.formTips('agreement', '')
      if (!this.agreement) {
        this.common.formTips('agreement', '请先勾选协议')
        return false
      }
      return true
    },
    finish() {
      //完成
      if (
        this.checkNUm() &&
        this.numFlag &&
        this.checkPassword() &&
        this.checkPassword2() &&
        this.checkPhone() &&
        this.phoneFlag &&
        this.checkImgcode() &&
        this.checkAgreement()
      ) {
        let reginfo = this.$store.getters.getRegInfo
        let data = {
          method: 'nvsi_jsZyRegister',
          albp0064: reginfo.name, //姓名
          albp0065: reginfo.cardtype, //证件类型
          albp0066: reginfo.cardno, //证件号码
          areaid: reginfo.regplace, //注册区域编号
          albp0061: reginfo.regplacename, //注册区域名称
          albp0052: this.num, //用户名（账号）
          albp0068: this.phone, //手机
          albp0053: this.password, //密码
          code: this.imgCode, //用户输入的图形验证码
          imgkey: this.imgkey, //图形验证码key值
          // code: this.code, //手机验证码
          albp0056: 1, //用户类型
          albp0058: 1, //是否有效
          albp0014: reginfo.birthday, //出生日期
          // 'albp0063':1,//实名状态
          albp0067: reginfo.sex, //性别
          albp0069: reginfo.photo1, //认证照片--正面
          albp0071: reginfo.photo2, //认证照片--反面
          albp0072: reginfo.photo3, //认证照片--手持
          bindidea: 1, //绑定标识
          albp0063: 2,
        }
        let params = {
          areaid: reginfo.regplace, // 区域id
          imgkey: this.imgkey, //图形验证码key值
          code: this.imgCode.toUpperCase(), //用户输入的图形验证码
          albp0014: reginfo.birthday, //出生日期
          albp0052: this.num, //用户名（账号）
          albp0053: this.password, //密码
          albp0087: '1', // 用户类型
          albp0063: '2', // 是否实名,默认已实名
          albp0064: reginfo.name, //姓名
          albp0065: reginfo.cardtype, //证件类型
          albp0066: reginfo.cardno, //证件号码
          albp0068: this.phone, //手机
          albp0069: reginfo.photo1, //认证照片--正面
          albp01_121: reginfo.photo2, //认证照片--反面
          source: '1',
        }
        if (reginfo.cardtype != 0) {
          params.albp0006 = reginfo.sex
        } else {
          params.albp0006 = ''
        }
        //   debugger
        this.isshow = 1
        this.utilscommit.requestapi('registerVolunteerFortisH5', params, this.regBack)
        // this.utilscommit.request('nvsi_jsZyRegister', data, this.regBack)
      }
    },
    regBack(res) {
      if (res) {
        this.isshow = 0
        if (res.code == 0) {
          if (this.$store.getters.getRegInfo.cardtype == '01') {
            Dialog.alert({
              title: '',
              message: '注册成功!',
            }).then(() => {
              this.$router.push('/loginapi')
            })
          } else {
            // swal("注册成功,正在进行账号审核,审核时间需1至2个工作日，请耐心等待!", { button: "确定" })
            Dialog.alert({
              title: '',
              message: '注册成功,正在进行账号审核,审核时间需1至2个工作日，请耐心等待!',
            }).then(() => {
              this.$router.push('/loginapi')
            })
          }
        } else {
          // swal(res.message, { button: "确定" });
          Dialog.alert({
            title: '',
            message: res.message,
          }).then(() => {
            this.changeImage()
          })
        }
      }
    },

    changeImage() {
      /* 获取图形验证码 */
      this.code = this.imgCode = ''
      if (this.timer) {
        clearTimeout(this.timer) //使timeout失效
        this.timer = null
      }
      this.codeButton = '获取验证码'
      this.countdown = 60
      this.utilscommit.requestapi('getImageCodeFortisH5', null, this.getimageCodeBack)

      // this.commonRequest.imgcode(this.getimageCodeBack)
    },
    getimageCodeBack(res) {
      if (res.code == 0) {
        if (res && res.data) {
          this.imgSrc = res.data.img
          this.imgkey = res.data.imgkey
        }
      }
    },
    codeback(res) {
      if (res.code == 0) {
        this.setTime()
      } else {
        swal(res.message, { button: '确定' })
      }
    },
    setTime: function() {
      if (this.countdown == 0) {
        this.codeButton = '获取验证码'
        this.countdown = 60
        return
      } else {
        this.codeButton = this.countdown + 's'
        this.countdown--
        let _this = this
        this.timer = setTimeout(function() {
          _this.setTime()
        }, 1000)
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
  color: #ff0000;
  position: relative;
  // top: 0.3rem;
}
.form-item {
  margin-bottom: 0.2rem;
}
</style>
