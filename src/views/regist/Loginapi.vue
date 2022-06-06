<template>
  <div class="page">
    <div class="header">
      <div class="header-prefix" @click="$router.go(-1)">
        <img src="@/assets/img/back.svg" alt="" class="page-back" />
        <span>返回</span>
      </div>
      <h2 class="header-title"></h2>
      <div class="header-suffix"></div>
    </div>
    <section class="section plr-70 bg-white" style="margin-top: 4rem">
      <div class="login-welcome">
        <p>欢迎您，来到</p>
        <h2>中国志愿</h2>
      </div>
      <div class="form">
        <div class="form-row">
          <div class="form-label">账号</div>
          <input type="text" class="form-core" placeholder="请输入用户名或身份证号" v-model="username" @blur="checkName" />
        </div>
        <span id="username"></span>
        <div class="form-row">
          <div class="form-label">密码</div>
          <input type="password" class="form-core" placeholder="请输入密码" v-model="password" @blur="checkPassword" />
        </div>
        <span id="password"></span>
      </div>
      <div class="mt-65 flex-h v-m t-c">
        <!-- <div class="checkbox type2 mr-20">
          <input checked type="checkbox" name="" id="" v-model="agreement" />
          <span class="checkbox-frame"></span>
        </div> -->
        <checkbox checked-color="#ee0a24" style="margin-left: -2rem;font-size 1.6rem;padding-right:1rem;" v-model="agreement"></checkbox>
        <b class="text lh-initial" style="font-size: 1.4rem;">我已阅读并同意<a href="javascript:void(0)" @click="privacy()" class="link-text" style="font-size: 1.4rem;">《隐私条款》</a>及<a
            href="javascript:void(0)" class="link-text" style="font-size: 1.4rem;" @click="registe()">《注册协议》</a></b>
      </div>
      <span id="agreement"></span>
      <a href="javascript:void(0);" class="button danger-gradient mt-90" type="danger" id="login" @click="finish">登录</a>
      <!-- 添加disabled属性即可变成 禁用按钮样式 -->
      <!-- <a href="javascript:void(0);" class="button danger-gradient mt-90" disabled type="danger">登录</a> -->

      <div class="flex-h flex-1 v-m t-c" style="margin-top: 4.75rem">
        <div class="login-tools">
          <!-- <a href="javascript:void(0);" id="findPwd" @click="$router.push('/forget')"
            >找回密码</a
          > -->
          <a href="javascript:void(0)" style="font-size: 1.6rem" @click="toregister">我要注册</a>
          <a href="javascript:void(0)" style="font-size: 1.6rem" @click="$router.push('/findpwddapi')">账号申诉</a>
        </div>
      </div>
    </section>
    <tip :isshow="isshow"></tip>
  </div>
</template>
<script>
import { Toast, Checkbox, CheckboxGroup } from 'vant'
export default {
  components: { Toast, Checkbox, CheckboxGroup },
  data: function() {
    return {
      username: '', //用户名
      password: '', //密码
      agreement: false, //是否已勾选协议 true已勾选 false未勾选
      isshow: 0, //0=未加载，1=加载中
      regInfo: {}, //用户信息
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path == '/privacy' || to.path == '/registe') {
      this.$store.commit('changelogin', {
        username: this.username,
        password: this.password,
        agreement: this.agreement,
        xset: 1,
      })
    } else {
      this.$store.commit('changelogin', {
        username: '',
        password: '',
        agreement: '',
        xset: '',
      })
    }
    next()
  },
  mounted() {
    var searchURL = window.location.search
    if(searchURL){
      searchURL = searchURL.substring(1, searchURL.length)
     let data = {
          username: searchURL.split('&')[0].split('=')[1],
          password: searchURL.split('&')[1].split('=')[1],
        }
    this.utilscommit.requestapi('LoginVolFortisH5', data, this.regBack2)
    }
    if (this.$store.getters.getlogin.xset == 1) {
      this.username = this.$store.getters.getlogin.username
      this.password = this.$store.getters.getlogin.password
      this.agreement = this.$store.getters.getlogin.agreement
    }
  },
  methods: {
    privacy() {
      this.$router.push({ name: 'privacy' })
    },
    registe() {
      this.$router.push({ name: 'registe' })
    },
    checkName() {
      //验证用户名
      this.common.formTips('username', '')
      if (!this.username) {
        this.common.formTips('username', '用户名不能为空')
        return false
      } else {
        return true
      }
    },
    checkPassword() {
      //验证密码
      this.common.formTips('password', '')
      if (!this.password) {
        this.common.formTips('password', '密码不能为空')
        return false
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
      if (this.checkName() && this.checkPassword() && this.checkAgreement()) {
        let data = {
          username: this.username,
          password: this.password,
          // sign: 1,
        }
        console.log(data)
        this.isshow = 1
        this.utilscommit.requestapi('LoginVolFortisH5', data, this.regBack2)
        // this.utilscommit.request('nvsi_jsLoginVol', data, this.regBack)
      }
    },
    // setCookie(username, password, loginid, exdays) {
    //   // debugger
    //   var exdate = new Date() // 获取当前登录的时间
    //   exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) // 将当前登录的时间加上七天，就是cookie过期的时间，也就是保存的天数
    //   // 字符串拼接cookie,因为cookie存储的形式是name=value的形式
    //   window.document.cookie = 'username' + '=' + username + ';path=/;expires=' + exdate.toGMTString()
    //   window.document.cookie = 'password' + '=' + password + ';path=/;expires=' + exdate.toGMTString()
    //   window.document.cookie = 'loginid' + '=' + loginid + ';path=/;expires=' + exdate.toGMTString()
    // },
    regBack2(res) {
      this.isshow = 0
      if (res.code == 0) {
        let albp20=res.data.albp0020.slice(0, 2) + '0000000000000000'
         if(albp20!="420000000000000000"){
           let  Jurl=`/nvsih5/login?username=${this.username}&password=${this.password}`
          if (window.location.host == "wuhan.yxybb.com") {
          //测试
          window.open("https://wuhan.yxybb.com" + Jurl);
        } else {
          //生产
          window.open(
            "https://chinavolunteer.mca.gov.cn" + Jurl
          );
        }
             return
         } 
        this.$store.commit('changeLoginStatus', true) //存储登录状态
        this.$store.commit('changeuserInfo', res.data) //存储用户信息
        if (res.data.albp0020) {
          this.$store.commit('changeregion', {
            raid:albp20,
          })
        }

        Toast('登录成功!')
        this.$router.push('/')
      }
      if (res.message) {
        Toast(res.message)
      } else {
        Toast('账号或密码错误')
      }
    },
    // regBack(res) {
    //   this.isshow = 0
    //   if (res.data) {
    //     if (res.data.albp0058 == 1) {
    //       this.utilscommit.request('nvsi_jsGetUSerInfo', { albp0031: res.data.id }, (result) => {
    //         //console.log('登录',result);
    //         if (result.data) {
    //           this.$store.commit('changeLoginStatus', true)
    //           result.data.idcard = res.data.idcard
    //           result.data.loginid = res.data.id
    //           result.data.albp0056 = res.data.albp0056
    //           this.$store.commit('changeshares', {
    //             idcard: res.data.idcard,
    //             loginid: res.data.id,
    //             albp0056: res.data.albp0056,
    //           })
    //           this.setCookie(this.username, this.password, result.data.loginid, 7)
    //           this.$store.commit('changeuserInfo', result.data)

    //           this.$store.commit('changeregion', {
    //             raid: result.data.albp0020.slice(0, 2) + '0000000000000000',
    //           })
    //           Toast('登录成功!')

    //           this.$router.push('/')
    //         }
    //       }) //用户信息
    //     } else {
    //       // swal("无效用户!", { button: "确定" });
    //       Toast('无效用户!')
    //     }
    //   } else {
    //     // swal(res.message, { button: "确定" });
    //     Toast(res.message)
    //   }
    // },
    toregister() {
      this.$router.push('/individual-registrationapi')
    },
  },
}
</script>
<style scoped>
span {
  font-size: 1.4rem !important;
}
.form-row {
  padding: 1.5rem 0 0.75rem 0;
}
.mt-90 {
  margin-top: 3.5rem;
}
.mt-65 {
  margin-top: 4.5rem;
}
</style>
