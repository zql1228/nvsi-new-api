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
    <section class="section p-40 bg-white" style="margin-top: 4.4rem;">
      <div style="display: flex;
        flex-direction:column;
    align-items: center;
    justify-content: center;">
        <div v-if="id == 1" style="width:9rem;margin-bottom:2rem;"><img style="width:100%;" src="@/assets/img/sssh.png" alt="" /></div>
        <div v-if="id == 3" style="width:9rem;margin-bottom:2rem;"><img style="width:100%;" src="@/assets/img/sscc.png" alt="" /></div>
        <div v-if="id == 2" style="width:9rem;margin-bottom:2rem;"><img style="width:100%;" src="@/assets/img/ssdg.png" alt="" /></div>
        <div style="font-size: 2.6rem;
    font-weight: 500;
">
          {{ text1 }}
        </div>
      </div>
      <div style="    font-size: 1.4rem;
    color: #666666; text-align: center;
    margin-top:3rem;line-height: 1.8rem
">
        {{ text2 }}
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      text1: '',
      text2: '',
    }
  },
  mounted() {
    if (this.id == 1) {
      this.text1 = '审核中'
      this.text2 = '温馨提示：信息提交成功后，相关人员会及时进行处理，审核时间可能会持续较长时间，审核结果可进入此页面及时查询。请耐心等待。'
    } else if (this.id == 2) {
      this.text1 = '审核通过'
      this.text2 =
        '请使用申诉过程中设置的密码登录中国志愿服务网（https://chinavolunteer.mca.gov.cn），若有疑问，请咨询中国志愿服务网客服 4006818148转8'
    } else if (this.id == 3) {
      this.text1 = '审核未通过'
      this.text2 = '申诉处理结果为【审核不通过】，理由为“账号信息输入有误”，请您核对信息后重新申诉。若有疑问，请咨询中国志愿服务网客服4006818148转8'
    }
  },
}
</script>
