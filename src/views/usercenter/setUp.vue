// 设置
<template>
  <div class="page">
    <header class="header">
      <div class="header-prefix">
        <img src="@/assets/img/back.svg" alt="" class="page-back" @click="$router.go(-1)" />
      </div>
      <h1 class="header-title">设置</h1>
      <div class="header-suffix"></div>
    </header>
    <section class="section pt-20" style="margin-top: 4.5rem">
      <ul>
        <!-- <li class="cell">
          <a href="javascript:void(0);" class="cell-wrap">
            <div class="cell-label flex-1">关于我们</div>
            <img src="@/assets/img/imgsy/cell-rightx.svg" alt="" class="cell-right">
          </a>
        </li>
        <li class="cell">
          <a href="javascript:;" class="cell-wrap">
            <div class="cell-label flex-1">注册协议</div>
            <img src="@/assets/img/imgsy/cell-rightx.svg" alt="" class="cell-right">
          </a>
        </li>
        <li class="cell">
          <a href="javascript:;" class="cell-wrap">
            <div class="cell-label flex-1">隐私声明</div>
            <img src="@/assets/img/imgsy/cell-rightx.svg" alt="" class="cell-right">
          </a>
        </li>
        <li class="cell">
          <a href="javascript:;" class="cell-wrap">
            <div class="cell-label flex-1">清理缓存</div>
            <span class="text" size="30" style="color: #ACAFB5;">113.4M</span>
            <img src="@/assets/img/imgsy/cell-rightx.svg" alt="" class="cell-right ml-24">
          </a>
        </li>
        <li class="cell">
          <a href="javascript:;" class="cell-wrap">
            <div class="cell-label flex-1">使用帮助</div>
            <img src="@/assets/img/imgsy/cell-rightx.svg" alt="" class="cell-right">
          </a>
        </li> -->
        <li class="cell" @click="tochangepassword">
          <a href="javascript:;" class="cell-wrap">
            <div class="cell-label flex-1">修改密码</div>
            <img src="@/assets/img/imgsy/cell-rightx.svg" alt="" class="cell-right" />
          </a>
        </li>
        <li class="cell">
          <a href="tel://4006818148转8" class="cell-wrap">
            <div class="cell-label flex-1">客服电话</div>
            <span class="text" size="30" style="color: #acafb5">4006818148转8</span>
            <img src="@/assets/img/imgsy/cell-rightx.svg" alt="" class="cell-right" />
          </a>
        </li>
      </ul>
      <a href="javascript:void(0)" class="btn danger text huge mt-30" style="font-weight: normal" @click="loginOut">退出登录</a>
    </section>
  </div>
</template>
<script>
import { Dialog } from 'vant'
export default {
  components: { Dialog },
  data: function() {
    return {
      userInfo: this.$store.getters.getuserInfo,
    }
  },
  // beforeRouteEnter: (to, from, next) => {
  //   console.log(to,from);
  //   if( from.path!='/login'){
  //          next()
  //   }

  // },
  mounted() {
    this.utilscommit.wetchat({ title: '欢迎加入中国志愿服务', desc: '“益”路有你 志愿同行', link: window.location.origin })
  },
  methods: {
    tochangepassword() {
      this.$router.push('/changePassword')
    },
    setCookie(username, password, loginid, exdays) {
      // debugger
      var exdate = new Date() // 获取当前登录的时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) // 将当前登录的时间加上七天，就是cookie过期的时间，也就是保存的天数
      // 字符串拼接cookie,因为cookie存储的形式是name=value的形式
      window.document.cookie = 'username' + '=' + username + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie = 'password' + '=' + password + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie = 'loginid' + '=' + loginid + ';path=/;expires=' + exdate.toGMTString()
    },
    loginOut() {
      Dialog.confirm({
        title: '是否退出登录',
      })
        .then(() => {
          this.$store.commit('changeLoginStatus', false)
          this.$store.commit('changeuserInfo', '')
          this.$router.push({ name: 'Loginapi' })
          this.$store.commit('changeregion', '')
          this.$store.commit('changelogin', '')
          this.$store.commit('changeuserInfo', '')
          window.localStorage.clear()
        })
        .catch(() => {
          // on cancel
        })
    },
  },
}
</script>

<style scoped>
.cell-label.flex-1 {
  overflow: auto;
  height: 2rem;
}

.cell {
  padding: 0;
  display: block;
}
</style>
