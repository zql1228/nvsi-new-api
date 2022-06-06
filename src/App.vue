<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  beforeCreate() {
    window.Vue = this
  },
  created() {
    // wx.config({
    //   debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //   appId: 'wxe0be9043dc11f95b', //后台 必填，公众号的唯一标识
    //   timestamp: '1414587457', // 必填，后台生成签名的时间戳
    //   nonceStr: 'Longrise2011', // 必填，后台生成签名的随机串
    //   signature: 'F398E75F44B24D8D3B510D9A594B29E38DEA2B66', // 必填，后台签名
    //   jsApiList: ['updateAppMessageShareData'],
    // })
    // wx.ready(function () {
    //   //需在用户可能点击分享按钮前就先调用
    //   wx.updateAppMessageShareData({
    //     title: "大大大", // 分享标题
    //     desc: "大大大大", // 分享描述
    //     link: "https://wuhan.yxybb.com/nvsih5/", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //     imgUrl: "", // 分享图标
    //     success: function () {
    //       // 设置成功
    //       console.log("分享了")
    //     },
    //   });
    // });
  },
  /*  created(){
    //防止vuex里数据因页面刷新丢失
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store") ) {
      this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem("store"))))     
    } 
    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  } */
}
</script>

<style lang="scss">
@import './assets/css/page.scss';
@import './assets/css/main.scss';
</style>
<style>
@import './assets/css/common.css';
@import './assets/css/main.css';
@import './assets/css/swiper-bundle.min.css';
@import './assets/css/part.css';
@import './assets/fonts/UNIVECONBOL.css';
</style>
