<template>
  <div>
    <div>跳转页面二</div>
    <div>
      {{ this.texsr }}
    </div>
    <div>地址</div>
    <div>{{ asdf }}</div>
    <div>code</div>
    <div>{{ cs }}</div>
  </div>
</template>
<script>
import { Toast } from 'vant'
export default {
  components: { Toast },
  data() {
    return {
      texsr: '',
      asdf: window.location.href,
      cs: '',
    }
  },
  mounted() {
    let a = {
      code: this.GetQueryValue('code'),
    }
    this.cs = this.GetQueryValue('code')

    // this.utilscommit.requestapi('getUserInfoWeChatH5Fortis', a, (src) => {
    //   this.texsr = src
    //   //   if (src.code == 500002) {
    //   //     Toast('微信未绑定账号')
    //   //     this.$router.push('/bindingapi')
    //   //     //微信未绑定信息
    //   //   } else if (res.code == 0) {
    //   //     this.$store.commit('changeLoginStatus', true) //存储登录状态
    //   //     this.$store.commit('changeuserInfo', res.data) //存储用户信息
    //   //     if (res.data.albp0020) {
    //   //       this.$store.commit('changeregion', {
    //   //         raid: res.data.albp0020.slice(0, 2) + '0000000000000000',
    //   //       })
    //   //     }
    //   //     Toast('登录成功!')
    //   //     this.$router.push('/')
    //   //   } else {
    //   //     Toast(src.message)
    //   //     this.$router.push('/')
    //   //   }
    // })
    console.log(this.GetQueryValue('code'))
    // this.$router.push({ path: '/login' })
  },
  methods: {
    GetQueryValue(queryName) {
      var query = decodeURI(window.location.search.substring(1))
      var vars = query.split('&')
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (pair[0] == queryName) {
          return pair[1]
        }
      }
      return null
    },
  },
}
</script>
