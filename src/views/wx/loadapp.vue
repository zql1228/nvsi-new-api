
<template>
  <div id="app">
  </div>
</template>
<script>
  export default {
    name: 'App',
    data() {
      return {
      
      };
    },
    mounted() {
    window.zyzPay.payResult('payResult')
    }, 
  
  }
</script>

