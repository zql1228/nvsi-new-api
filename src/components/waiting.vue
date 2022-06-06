<template>
  <div  v-if="isshow==1">
    <div class="mask show"></div>
    <div class="jzz">
      <img src="@/assets/img/jzz.gif" width="35px" height="35px" style="margin-top: 25px;">
      <p style="color: white;margin-top: 10px;font-size: 16px;">加载中</p>
    </div>
  </div>
</template>
<script>
export default {
  props: ['isshow'],
}
</script>

<style>
.jzz{
  background: black;
  border-radius: 0.75rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 99; 
  width: 120px;
  height: 120px;
  text-align: center;
}
</style>







