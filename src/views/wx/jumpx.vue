<template>
  <div>跳转页面1</div>
</template>
<script>
export default {
  data() {
    return {}
  },
  mounted() {
    window.location.href =
      'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbb39341196c051fd&redirect_uri=https://chinavolunteer.mca.gov.cn/nvsidfh5/jump&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
    // 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbb39341196c051fd&redirect_uri=http://192.168.6.226:8083/nvsidfh5/jump&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
    // window.location.href =
    //   'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx492ea22213c17bfb&redirect_uri=http://192.168.6.226:8083/jump&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
  },
}
</script>
