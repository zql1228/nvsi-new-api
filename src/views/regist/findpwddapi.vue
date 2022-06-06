<template>
  <div class="page my_register">
    <div class="header">
      <div class="header-prefix" @click="$router.go(-1)">
        <img src="@/assets/img/back.svg" alt="" class="page-back" />
        <span>返回</span>
      </div>
      <h2 class="header-title"></h2>
      <div class="header-suffix"></div>
    </div>
    <section class="section pt-30 plr-70 pb-35 bg-white" style="margin-top: 4.4rem;">
      <div class="form type2">
        <h2 class="form-title">账号申诉</h2>
        <p class="form-title-tip mb-10">
          仅支持志愿者进行账号申诉，若您已申诉，请点击<a @click="$router.push('/progress')" class="text danger">申诉进度查询</a>
        </p>
        <div class="form-row">
          <div class="form-label">姓名</div>
          <span class="fontdx">(若姓名中涉及标点符号,请使用中文字符圆点"·")</span>
          <input type="text" class="form-core" placeholder="请输入姓名" @blur="checkName" v-model="username" maxlength="20" />
        </div>
        <span id="span_1" class="fontdx"></span>
        <div class="form-row">
          <div class="form-label">证件号码</div>
          <input type="text" class="form-core" placeholder="请输入证件号码" v-model="cardNo" @blur="checkCardno" maxlength="20" />
        </div>
        <span id="span_3" class="fontdx"></span>
        <div class="form-row">
          <div class="form-label">手机号码</div>
          <input type="text" class="form-core" placeholder="请输入手机号" v-model="phone" maxlength="20" @blur="checkphone" />
        </div>
        <span id="span_9" class="fontdx"></span>
        <div class="form-item">
          <h2 class="form-item-label required">服务区域</h2>
          <Field style="padding-left: 0;" v-model="fieldValue" is-link readonly class="form-select" label="" placeholder="请选择所在地区" @click="show = true" />
          <Popup v-model="show" round position="bottom">
            <Cascader v-model="cascaderValue" title="请选择所在地区" :options="options" :field-names="fieldNames" :closeable="false" @change="onChange">
              <template slot="title">
                <div style="position：relative; ">
                  <div style="position: absolute; width: calc(100% - 32px)">
                    <div class="my_cascader">
                      <span style="color: #969799; font-size: 15px; width: 4rem" @click="closeserviceAreaOptions">取消</span>
                      <span style="display: block; width: 100%; text-align: center">点击选择服务区域</span>
                      <span style="color: #ee0a24; font-size: 15px; width: 4rem" @click="serviceConfirm">确认</span>
                    </div>
                  </div>
                </div>
              </template>
            </Cascader>
          </Popup>
        </div>
        <span id="span_4" class="fontdx"></span>

        <div class="form-row">
          <div class="form-label">设置新密码</div>
          <input type="password" class="form-core" placeholder="请输入新密码" v-model="password" maxlength="20" @blur="checkPassword" />
          <span id="pwdtip" class="fontdx"></span>
          <p class="form-tip">
            <img src="@/assets/img/tip.svg" alt="" />
            <span>密码长度8-20位</span>
          </p>
          <p class="form-tip">
            <img src="@/assets/img/tip.svg" alt="" />
            <span>密码必须同时包含数字、大写字母和小写字母</span>
          </p>
        </div>
        <div class="form-row">
          <div class="form-label">确认新密码</div>
          <input type="password" class="form-core" placeholder="请再次输入密码" v-model="password2" maxlength="20" @blur="checkPassword2" />
        </div>
        <span id="pwdtip2" class="fontdx"></span>
        <div class="form-row">
          <div class="form-label">图形验证码</div>
          <input type="text" class="form-core" style="padding-right: 8rem" placeholder="请输入验证码" v-model="imgCode" maxlength="4" @blur="checkImgcode" />
          <img class="form-verification-code" :src="imgSrc" @click="changeImage" alt="" />
        </div>
        <span id="imgcodetip" class="fontdx"></span>
        <div class="form-item">
          <h2 class="form-item-label required required">证件上传</h2>
          <div class="form-item-core">
            <ul class="upload-list" style="width: 100%;justify-content: space-between;">
              <!-- upload上传成功后添加class "success"，表示上传成功且展示删除按钮 -->
              <li class="upload" :class="{ success: this.photo1 }">
                <upload :photosrc="photosrc1" type="1"></upload>
                <p class="upload-label">请上传证件反面照</p>
              </li>
              <li class="upload" :class="{ success: this.photo2 }">
                <upload :photosrc="photosrc2" type="2"></upload>
                <p class="upload-label">请上传证件正面照</p>
              </li>
              <!-- <li class="upload" :class="{ success: this.photo3 }">
                <upload :photosrc="photosrc3" type="3"></upload>
                <p class="upload-label">请上传本人免冠照片</p>
              </li> -->
            </ul>
          </div>
        </div>
        <span id="span_7" class="fontdx"></span>

        <!-- button 去除属性 disabled 即可恢复正常样式 -->
        <Button class="button danger-gradient mt-40" type="danger" style="width:100% !important;" @click="submit" :loading="loading">完成</Button>
      </div>
    </section>
  </div>
</template>

<script>
import upload from '@/components/upPhoto.vue'

import { Popup, Cascader, Button, Dialog, DatetimePicker, Field } from 'vant'
// import { checkName, checkCardNo,this.common.formTips, checkPW } from '@/assets/js/common'
export default {
  components: {
    upload,
    Popup, //弹出层
    Cascader, //级联选择
    Button,
    [Dialog.Component.name]: Dialog.Component,
    DatetimePicker,
    Field,
  },
  data() {
    return {
      // showitems: 0,
      show: false,
     regPlace: this.$store.getters.getregion.regPlace, //区域名
      fieldNames: {
        text: 'area',
        value: 'areaid',
        children: 'children',
      },
      fieldValue: '请选择注册地点', //注册地点 input框中的·中文名
      cascaderValue: '', //注册地点 市级地区的 areaid
      options: [], //区域选择列表

      username: '', //姓名
      cardNo: '', //身份证号码
      getIDcardFlag: false, //
      imgCode: '', //图形验证码 用户输入的
      imgSrc: '', //图形验证码图片地址
      imgkey: '', //图形验证码key值
      password: '', //新密码
      password2: '', //确认新密码
      photosrc1: require('@/assets/img/id-card.svg'),
      photosrc2: require('@/assets/img/id-card-back.svg'),
      photosrc3: require('@/assets/img/id-card-in-hand.svg'),
      photo1: '', //正面照片
      photo2: '', //背面照片
      photo3: '', //手持照片
      loading: false,
      serviceAreaValue: '',
      appeal: {}, //前面页面保存的信息
      phone:'',//手机号
    }
  },
  mounted() {
    this.changeImage()
    this.appeal = this.$store.getters.getappeal
    // this.utilscommit.requestapi('areaTreeFortisH5', {}, this.callback1)
     this.sessionStorage.getCodeValueH5("areaTree",'areaTreeFortisH5',{},this.callback1)
  },
  methods: {
    checkcascaderValue() {
      //验证服务区域
      this.common.formTips('span_4', '')
      if (!this.cascaderValue) {
        this.common.formTips('span_4', '请选择注册地点')
        return false
      } else if (this.cascaderValue.slice(4, 6) == '00') {
        this.common.formTips('span_4', '注册地没有精确到区(县),请重新选择')
        return false
      }
      return true
    },
    checkphone(){
       this.common.formTips('span_9', '')
      if(!this.phone){
        this.common.formTips('span_9', '手机号码不能为空')
        return false
      }else if(!this.common.checkPhone(this.phone)){
          this.common.formTips('span_9', '手机号码填写错误')
        return false
      }else{
         return true 
      }
    },
    checkCardno() {
      //证件号校验

      this.common.formTips('span_3', '')
      if (!this.cardNo) {
        this.common.formTips('span_3', '证件号码不能为空')
        return false
      } else if (!this.common.checkCardNo(this.cardNo)) {
        this.common.formTips('span_3', '证件号码填写错误')
        return false
      } else {
        this.utilscommit.requestapiwebapi('nvsi_cheakCardno', { cardno: this.cardNo }, this.getIDcardBack)
        return true
      }
    },
    getIDcardBack(result) {
      //证件号码验证返回结果
      if (result && result.data) {
        this.common.formTips('span_3', '')

        this.getIDcardFlag = true
      } else {
        this.common.formTips('span_3', result.message)

        this.getIDcardFlag = false
      }
    },
    checkName() {
      //姓名校验
      let i
      this.common.formTips('span_1', '')
      if (!this.username) {
        this.common.formTips('span_1', '姓名不能为空')
        return false
      }
      i = this.checkNamex(this.username)
      if (!i) {
        this.common.formTips('span_1', '请正确填写姓名')
        return false
      }

      return i
    },
    // 验证中文或者英文
    checkNamex(arg) {
      var reg = /^[A-z]+$|^[a-zA-Z]+(\s*[a-zA-Z]+)+$|^((?![\u3000-\u303F])[\u2E80-\uFE4F]|·(?![\u3000-\u303F])[\u2E80-\uFE4F])*(?![\u3000-\u303F])[\u2E80-\uFE4F]*$/
      return reg.test(arg)
    },
    callback1(res) {
      //区域选择框
     
        if (res) {
          let options = []
          // for (let i = 0; i < res.data.child.length; i++) {
          //   if (res.data.child[i].area != '全国') {
          //     res.data.child[i].children = []
          //     options.push(res.data.child[i])
          //   }
          // }
           for (let i = 0; i < res.child.length; i++) {
            if (res.child[i].area == this.regPlace) {
              res.child[i].children = []
              options.push(res.child[i])
            }
          }
          this.options = options
          console.log(this.options)
        
      }
    },
    onFinish({ selectedOptions }) {
      //获取服务区域输入框显示字段
      //debugger
      this.common.formTips('span_4', '')
      if (this.cascaderValue.slice(4, 6) == '00') {
        this.common.formTips('span_4', '注册地没有精确到区(县),请重新选择')
        return false
      }
      this.fieldValue = selectedOptions.map((option) => option.area).join('/')
    },
    serviceConfirm() {
      //确定
      if (this.serviceAreaValue) this.onFinish(this.serviceAreaValue)
      this.show = false
    },
    onChange(value) {
      this.serviceAreaValue = value
      // debugger
      this.utilscommit.requestapi(
        'areaTreeFortisH5',
        {
          areaid: value.value,
        },
        this.checkserve
      )
    },
    checkserve(res) {
      if (res.code == '0') {
        if (this.serviceAreaValue.tabIndex == 0) {
          let options = []
          for (let i = 0; i < res.data.child.length; i++) {
            res.data.child[i].children = []
            options.push(res.data.child[i])
          }
          this.options.forEach((el, index) => {
            if (this.serviceAreaValue.value == el.areaid) {
              this.options[index].children = options
              return
            }
          })
        } else if (this.serviceAreaValue.tabIndex == 1) {
          for (let i = 0; i < this.options.length; i++) {
            this.options[i].children.forEach((el, index) => {
              if (this.serviceAreaValue.value == el.areaid) {
                this.options[i].children[index].children = res.data.child
                return
              }
            })
          }
        }
      }
    },
    closeserviceAreaOptions() {
      //取消
      this.serviceAreaValue = {}
      this.fieldValue = ''
      this.cascaderValue = ''
      this.show = false
    },

    changeImage() {
      this.utilscommit.requestapi('getImageCodeFortisH5', null, (src) => {
        if (src.code == 0) {
          this.imgSrc = src.data.img
          this.imgkey = src.data.imgkey
        }
      }) //获取验证码
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
    checkPassword() {
      //验证密码
      this.common.formTips('pwdtip', '')
      if (!this.password) {
        this.common.formTips('pwdtip', '密码不能为空')
        this.passwordz = 1
        return false
      } else if (!this.common.checkPwd(this.password)) {
        this.common.formTips('pwdtip', '密码长度为8-20个字符，且必须同时包含数字，大写字母和小写字母')
        this.passwordz = 1
        return false
      }
      this.passwordz = 2
      if (this.password2) {
        if (this.password2 != this.password) {
          this.common.formTips('pwdtip', '两次输入密码不一致，请重新输入')
          return false
        }
      }
      if (this.password2 == this.password) {
        this.common.formTips('pwdtip', '')
        this.common.formTips('pwdtip2', '')
      }
      return true
    },
    checkPassword2() {
      if (!this.password2) {
        this.common.formTips('pwdtip2', '确认密码不能为空')
        return false
      } else if (this.password2 != this.password) {
        this.common.formTips('pwdtip2', '两次输入密码不一致，请重新输入')
        return false
      }
      if (this.common.checkPwd(this.password) && this.password2 == this.password) {
        this.common.formTips('pwdtip', '')
        this.common.formTips('pwdtip2', '')
      }
      return true
    },
    checkphoto1() {
      //验证证件照片
      // debugger
      this.common.formTips('span_7', '')
      if (!this.photo1) {
        this.common.formTips('span_7', '请上传证件反面照')
        return false
      } else if (!this.photo2) {
        this.common.formTips('span_7', '请上传证件正面照')
        return false
      }

      return true
    },

    submit() {
      //提交按钮

      if (
        this.checkName() &&
        this.getIDcardFlag &&
        this.checkphone()&&
        this.checkcascaderValue() &&
        this.checkImgcode() &&
        this.checkPassword() &&
        this.checkPassword2() &&
        this.checkphoto1()
      ) {
        this.loading = true
        let data = {
          name: this.username,
          cardno: this.cardNo, //证件号
          albp1010: this.cascaderValue, //注册区域编号
          code: this.imgCode.toUpperCase(), //用户输入的图形验证码
          imgkey: this.imgkey, //图形验证码key值
          albp1011: this.password, //密码
          phone:this.phone,//手机号
          cardphoto1: this.photo1, //认证照片--正面
          cardphoto2: this.photo2, //认证照片--反面
        }
        debugger
        this.utilscommit.requestapiwebapi('nvsi_submitAppeal', data, (src) => {
          this.loading = false

          if (src) {
            if (src.code == '0') {
              Dialog.alert({
                message: src.message,
              }).then(() => {
                this.$store.commit('changappeal', '')
                this.$router.push('/')
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
              message: '提交失败',
            }).then(() => {
              this.changeImage()
            })
          }

          console.log(src)
        }) /* 区域选择框 */
      }
    },
  },
}
</script>
<style scoped>
.fontdx {
  font-size: 1.4rem !important;
}
.my_pickselect {
  padding-right: 20px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.my_register .van-cascader__title {
  width: 100%;
}
.my_register .van-cascader__title .my_cascader {
  widows: 100%;
  display: flex;
  justify-content: space-between;
}
.form-row {
  margin-bottom: 1rem;
}
</style>
