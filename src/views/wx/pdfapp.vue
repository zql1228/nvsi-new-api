
<template>
  <div id="app">
    <div id="demo"></div>
  </div>
</template>
<script>
  import Pdfh5 from "pdfh5";
  export default {
    name: 'App',
    data() {
      return {
        pdfh5: ''
      };
    },
    mounted() {
        //实例化
      this.pdfh5 = new Pdfh5("#demo", {
        pdfurl: this.getQueryString('id'),
         URIenable: true, //true开启地址栏file参数
        renderType: 'svg', //pdf渲染模式 svg canvas
        lazy: false, //是否开启懒加载
        maxZoom: 3, //手势缩放最大倍数 默认3
        scrollEnable: true, //是否允许pdf滚动
        zoomEnable: true, //是否允许pdf手势缩放


      });
      //监听完成事件
      this.pdfh5.on("complete", function (status, msg, time) {
        console.log("状态：" + status + "，信息：" + msg + "，耗时：" + time + "毫秒，总页数：" + this.totalNum)
      })
    }, 
    methods: {
       getQueryString(name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) {
        return unescape(r[2])
      }
      return null
    },
  },
  }
</script>

<style>
    /* @import "pdfh5/css/pdfh5.css"; */
    *{
    padding: 0;
    margin: 0;
    }
    html,body,#app {
    width: 100%;
    height: 100%;
    }
</style>