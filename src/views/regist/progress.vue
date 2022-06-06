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
      <h2 class="large-title">申诉进度查询</h2>
      <div>
        <span class="text danger" size="32">*</span
        ><span class="text" size="32">
          温馨提示：请输入身份证号码查询申诉进度
        </span>
      </div>
      <div class="form-row">
        <div class="form-label">证件号码</div>
        <input type="text" class="form-core" placeholder="请输入身份证号码" v-model="cardNo" maxlength="20" @blur="checkCardno" />
      </div>
      <span id="span_3"></span>
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
      <span id="imgcodetip"></span>
      <Button @click="submit" class="button danger-gradient mt-40" type="danger" style="width:100% !important;" :loading="loading">查询</Button>
    </section>
  </div>
</template>

<script>
import { Button, Dialog } from 'vant'
// import { checkCardNo, formTips } from '@/assets/js/common'
export default {
  components: {
    Button,
    [Dialog.Component.name]: Dialog.Component,
  },
  data() {
    return {
      cardNo: '', //身份证号码
      imgCode: '', //用户填写的验证码
      imgSrc: '', //验证码照片地址
      imgkey: '', //验证码key值
      loading: false,
      info: {}, //查询结果
    }
  },
  mounted() {
    this.changeImage()
  },
  methods: {
    checkCardno() {
      //证件号校验
      this.common.formTips('span_3', '')
      if (!this.cardNo) {
        this.common.formTips('span_3', '证件号码不能为空')
        return false
      } else if (!this.common.checkCardNo(this.cardNo)) {
        this.common.formTips('span_3', '证件号码填写错误')
        return false
      }
      return true
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
    changeImage() {
      /* 获取图形验证码 */
      this.utilscommit.requestapi('getImageCodeFortisH5', null, (res) => {
        if (res.code == 0 && res.data) {
          this.imgSrc = res.data.img
          this.imgkey = res.data.imgkey
        }
      })
    },
    submit() {
      if (this.checkCardno() && this.checkImgcode()) {
        this.loading = true
        let data = {
          servicecredentialnum: this.cardNo, //身份证号码
          code: this.imgCode.toUpperCase(), //用户填写的验证码
          imgkey: this.imgkey, //验证码key值
        }
        this.utilscommit.requestapiwebapi('volunteerAppealProgressFortisWeb', data, (src) => {
          this.loading = false
          if (src) {
            if (src.data) {
              this.$router.push({
                name: 'proPwd',
                params: { id: src.data.albp1009 },
              })
            } else {
              Dialog.alert({
                message: src.message,
              }).then(() => {
                this.changeImage()
              })
            }
          } else {
            Dialog.alert({
              message: '未查询成功',
            }).then(() => {
              this.changeImage()
            })
          }
        })
        // this.requests('nvsi_VolunteerAppealProgressForH5', data).then((res) => {
        //   this.loading = false
        //   //1009 1审核中 2审核通过 3审核未通过
        //   if (res.code && res.data) {
        //     this.info = res.data
        //     if (this.info.createtime) {
        //       this.info.createtime = this.info.createtime.slice(0, 11)
        //     }
        //     if (this.info.albp1009) {
        //       this.info.albp1009 = this.info.albp1009 == 1 ? '审核中' : this.info.albp1009 == 2 ? '审核通过' : '审核未通过'
        //     }
        //     Dialog.alert({
        //       title: '',
        //       message: '查询成功',
        //     })
        //   } else {
        //     Dialog.alert({
        //       title: '',
        //       message: res.message,
        //     })
        //   }
        // })
      }
    },
  },
}
</script>
<style scoped>
.form-row {
  margin-bottom: 1rem;
}
</style>
