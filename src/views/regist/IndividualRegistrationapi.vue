个人注册第 1 步
<template>
  <div class="page my_register">
    <div class="header">
      <div class="header-prefix">
        <img src="@/assets/img/back.svg" alt="" class="page-back" @click="$router.go(-1)" />
      </div>
      <h2 class="header-title"></h2>
      <div class="header-suffix"></div>
    </div>
    <section class="main" style="
        padding: 0 3.75rem 0;
        margin-top: 4.4rem;
        background-color: #ffffff;
      ">
      <h2 class="large-title">注册</h2>
      <p class="text gray mb-huge" size="large"></p>
      <div class="form form_tip">
        <div class="form-item" subline>
          <h2 class="form-item-label required">姓名</h2>
          <p class="text gray" size="large" style="font-size: 1.3rem; line-height: 2rem">
            (若姓名中涉及标点符号,请使用中文字符圆点“·”)
          </p>
          <div class="form-item-core">
            <input type="text" placeholder="请输入真实姓名" v-model="username" maxlength="20" @blur="checkName" />
          </div>
        </div>
        <span id="span_1" class="fontdx"></span>
        <div class="form-item" subline>
          <h2 class="form-item-label required">证件类别</h2>
          <div class="form-item-core">
            <div class="form-select" @click="selectItemShow('card', 'span_2')">
              {{ cardType }}
            </div>
          </div>
        </div>
        <span id="span_2" class="fontdx"></span>
        <div class="form-item" subline>
          <h2 class="form-item-label required">证件号码</h2>
          <div class="form-item-core">
            <input type="text" placeholder="请输入证件号码" v-model="cardNo" maxlength="20" @blur="checkCardno" />
          </div>
        </div>
        <span id="span_3" class="fontdx"></span>
        <div class="form-item">
          <!-- <h2 class="form-item-label required">注册地</h2>
          <div class="form-item-core">
            <div class="form-select" @click="selectItemShow('place')">
              {{ fieldValue }}
            </div>
          </div> -->
          <h2 class="form-item-label required">注册地</h2>
          <Field v-model="fieldValue" is-link readonly class="form-select" label="" placeholder="请选择所在地区" @click="show = true" />
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
        <div class="form-item" v-if="cardId != '01' && cardId != ''">
          <h2 class="form-item-label required">性别</h2>
          <div class="form-item-core">
            <div class="form-select" @click="selectItemShow('sex')">
              {{ sex }}
            </div>
          </div>
        </div>
        <span id="span_5" class="fontdx"></span>
        <div class="form-item" v-if="cardId != '01' && cardId != ''">
          <h2 class="form-item-label required">出生年月</h2>
          <div class="form-item-core">
            <!-- <div class="form-select" @click="selectItemShow('birthday')">{{birthday}}</div> -->
            <!-- <date-picker
              class="form-select"
              style="width: 100%"
              :lang="lang"
              v-model="birthday"
              valueType="format"
              placeholder="请选择出生年月"
            ></date-picker> -->
            <!-- <input type="text" @click="showpopup=true" v-model="birthday" readonly placeholder="请选择出生日期"/> -->
            <div class="form-select" @click="showdata">
              {{ birthday }}
            </div>
          </div>
        </div>
        <span id="span_7" class="fontdx"></span>
        <div class="form-item" v-if="cardId != '01' && cardId != ''">
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
        <span id="span_6" class="fontdx"></span>
      </div>
      <a href="javascript:void(0);" class="button danger-gradient" type="danger" @click="nextStep" style="margin-top: 1rem">下一步</a>
      <!-- <div class="flex-h t-c mt-default mb-50">
        <router-link to="/forget" class="text" size="default"
          >忘记密码</router-link
        >
      </div> -->
      <div class="flex-h t-c v-m change-register" @click="tologin()">
        <a href="javascript:void(0);" class="text" size="large">已有账户，直接登录</a>
      </div>
    </section>
    <!-- 出生日期选择框 -->
    <Popup v-model="showpopup" position="bottom" :style="{ height: '40%' }">
      <DatetimePicker type="date" :title="datatitle" v-model="currentDate" :min-date="minDate" :max-date="maxDate" @change="changedata" @confirm="confirm" @cancel="cancel">
      </DatetimePicker>
    </Popup>
    <div class="select-mask" :class="{ show: isShow }"></div>
    <div class="select-wrap flex-v" :class="{ show: isShow }">
      <div class="select-wrap-header flex-h v-m t-lr">
        <span @click="SelectNotShow('del')">取消</span>
        <span @click="SelectNotShow('select')">确定</span>
      </div>
      <!-- 证件类别下拉框 -->
      <ul class="flex-v flex-1 select-wrap-item" style="overflow: auto" v-if="showitems == 0">
        <li v-for="(item, index) in cardTypeList" :key="index" class="flex-h v-m t-c" :class="{ active: index == current1 }"
          @click="isItemActive(index, item.codevalue, item.codeid)">
          {{ item.codevalue }}
        </li>
      </ul>
      <!-- 注册地下拉框 -->
      <!-- <ul class="flex-v flex-1 select-wrap-item" style="overflow:auto;" v-if="showitems==1">
        <li  v-for="(item,index) in options" :key="index" class="flex-h v-m t-c" :class="{ active: index == current2 }" @click="isItemActive(index,item.provincename,item.areaid)" >
          {{ item.provincename }}
        </li>
      </ul> -->
      <!-- 性别下拉框 -->
      <ul class="flex-v flex-1 select-wrap-item" style="overflow: auto" v-if="showitems == 3">
        <li v-for="(item, index) in sexList" :key="index" class="flex-h v-m t-c" :class="{ active: index == current3 }" @click="isItemActive(index, item.codevalue, item.codeid)">
          {{ item.codevalue }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import upload from '@/components/upPhoto.vue'
import moment from 'moment'
import { Cascader, Field, Popup, DatetimePicker } from 'vant' //vant组件
export default {
  components: {
    upload,
    Field, //输入框
    Cascader, //级联选择
    DatetimePicker, //日期选择框
    Popup, //弹出层
  },
  data() {
    return {
      regPlace: this.$store.getters.getregion.regPlace, //区域名
      lang: {
        //配置日期语音环境
        formatLocale: {
          firstDayOfWeek: 1,
        },
        monthBeforeYear: false,
      },
      fieldNames: {
        text: 'area',
        value: 'areaid',
        children: 'children',
      },
      show: false,
      fieldValue: '请选择注册地点', //注册地点 input框中的·中文名
      cascaderValue: '', //注册地点 市级地区的 areaid

      username: '', //姓名
      cardType: '内地居民身份证', //证件类型
      cardId: '01',
      cardNo: '', //证件号码
      sex: '请选择性别',
      birthday: '请选择出生年月', //出生年月 input框显示的日期文本
      minDate: new Date(1971, 1, 1), //日期选择框最小时间
      maxDate: new Date(2070, 12, 31), //日期选择框最大时间
      currentDate: new Date(), //日期选择框当前被选中的时间
      datatitle: moment(new Date()).format('YYYY-MM-DD'), //日期选择框头部显示的时间文本
      showpopup: false, //日期弹出框 显示隐藏
      sexid: '',
      showitems: 0,
      options: [], //区域选择列表
      cardTypeList: [], //证件类型列表
      sexList: [], //性别列表
      isShow: false,
      current1: 0, //当前下拉框证件类型被选中的选项在该选项数组集合中对应的下标
      //current2: 0, //当前下拉框注册地被选中的选项在该选项数组集合中对应的下标
      current3: 0, //当前下拉框性别被选中的选项在该选项数组集合中对应的下标
      type: '', //下拉选择框类型
      select: '', //下拉框被选选项的文本
      selectid: '', //下拉框被选项对应的id
      cardNoFlag: false, //证件号码是否唯一
      photosrc1: require('@/assets/img/id-card.svg'),
      photosrc2: require('@/assets/img/id-card-back.svg'),
      photosrc3: require('@/assets/img/id-card-in-hand.svg'),
      photo1: '', //正面照片
      photo1x: '',
      photo2: '', //背面照片
      photo2x: '',
      photo3: '', //手持照片
      photo3x: '',
      regInfo: {}, //vux中注册用户信息
      areaid: '',
      serviceAreaValue: '',
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path != '/individual-registration2api') {
      //当跳转不是注册2,清除vuex里的数据
      this.$store.commit('changeRegInfo', {})
    }
    next()
  },
  mounted() {
    // this.utilscommit.wetchat({ title: '欢迎加入中国志愿服务', desc: '“益”路有你 志愿同行', link: window.location.origin })
    // if(this.$store.getters.getRegInfo)
    if (this.$store.getters.getRegInfo.infoid == 1) {
      let src = this.$store.getters.getRegInfo
      this.username = src.name
      this.cardId = src.cardtype
      this.cardNo = src.cardno
      this.cascaderValue = src.regplace
      this.fieldValue = src.regplacename
      this.sexid = src.sex

      if (this.sexid == 1) {
        this.sex = '男'
      } else if (this.sexid == 2) {
        this.sex = '女'
      }
      // if (src.photo1) {
      //   this.photo1 = src.photo1
      //   this.photo1x = src.photo1x
      //   this.photosrc1 = src.photo1x
      // }
      // if (src.photo2) {
      //   this.photo2 = src.photo2
      //   this.photo2x = src.photo2x
      //   this.photosrc2 = src.photo2x
      // }
      // if (src.photo3) {
      //   this.photo3 = src.photo3
      //   this.photo3x = src.photo3x
      //   this.photosrc3 = src.photo3x
      // }

      if (src.birthday) {
        this.birthday = src.birthday
      }

      this.cardNoFlag = true
    }

    this.getData()
  },
  methods: {
    showdata() {
      //打开日期选择框点击事件
      this.showpopup = true
      if (this.birthday != '请选择出生年月') {
        this.currentDate = new Date(this.birthday)
        this.datatitle = moment(this.currentDate).format('YYYY-MM-DD')
      }
    },
    changedata(value) {
      //日期选择框选中的时间改变时触发的回调
      this.datatitle = moment(this.currentDate).format('YYYY-MM-DD')
    },
    // 点击确认 日期选择框
    confirm(value) {
      this.showpopup = false
      this.birthday = moment(value).format('YYYY-MM-DD')
    },

    // 点击取消 日期选择框
    cancel() {
      this.showpopup = false
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
    onFinish({ selectedOptions }) {
      //获取服务区域输入框显示字段
      //debugger
      this.fieldValue = selectedOptions.map((option) => option.area).join('/')
    },
    serviceConfirm() {
      //确定
      if (this.serviceAreaValue) this.onFinish(this.serviceAreaValue)
      this.show = false
      this.common.formTips('span_4', '')
    },
    closeserviceAreaOptions() {
      //取消
      this.serviceAreaValue = {}
      this.fieldValue = ''
      this.cascaderValue = ''
      this.show = false
    },
    getData() {
      /* 获取下拉框类型 */
      //this.regInfo=this.$store.getters.getRegInfo.fieldValue
      // this.utilscommit.requestapi('areaTreeFortisH5', {}, this.callback1) /* 区域选择框 */
      this.sessionStorage.getCodeValueH5("areaTree",'areaTreeFortisH5',{},this.callback1)
      // this.utilscommit.request('nvsi_jsGetAreaList', {}, this.callback1) /* 区域选择框 */
      // this.utilscommit.requestapi('GetCodeValuesFortisH5', { tableName: 'nvsi_albp0004' }, this.cardTypeBack) /* 证件类型选择框 */
      this.sessionStorage.getCode0004((res)=>{ 
          let a = []
          res.forEach(function(val, index) {
            if (val.codeid == '07' || val.codeid == '06' || val.codeid == '99') {
              return
            }
            a.push(val)
          })
           
          this.cardTypeList = this.common.orderBy(a,'codeid','asc');})
     this.sexList=[{codeid: "1", codevalue: "男"},{codeid: "2", codevalue: "女"}]
  //  this.utilscommit.requestapi('GetCodeValuesFortisH5', { tableName: 'nvsi_albp0006' }, this.sexListBack) /* 性别选择框 */
    },
    cardTypeBack(res) {
      //证件类型返回
      if (res.code == 0) {
        if (res.data) {
          let a = []
          res.data.forEach(function(val, index) {
            if (val.codeid == '07' || val.codeid == '06' || val.codeid == '99') {
              return
            }
            a.push(val)
          })
          this.cardTypeList = a
        }
      }
    },
    sexListBack(res) {
      //性别返回
      if (res.code == 0) {
        if (res.data) {
          this.sexList = res.data
          // if(this.regInfo.sex){
          //   this.sexid=this.regInfo.sex
          //   this.sexList.forEach(element => {
          //     if(element.codeid==this.sexid){
          //       this.sex=element.codevalue
          //     }
          //   });
          // }
        }
      }
    },
    callback1(res) {
      //区域选择框
        if (res) {
          let options = []
          for (let i = 0; i < res.child.length; i++) {
            // if (res.data.child[i].area != '全国') {
            //   res.data.child[i].children = []
            //   options.push(res.data.child[i])
            // }
             if (res.child[i].area == this.regPlace) {
              res.child[i].children = []
              options.push(res.child[i])
            }
          }
          this.options = options
          console.log(this.options)
        }     
    },
    selectItemShow(tab) {
      //出现选择框
      this.isShow = true
      var mo = function(e) {
        e.preventDefault()
      }
      document.body.style.overflow = 'hidden'
      document.addEventListener('touchmove', mo, false) //禁止页面滑动
      this.type = tab
      if (this.type == 'card') {
        this.showitems = 0
        // if(this.cardType){
        //   this.select=this.cardType
        // }else{
        //   this.select=this.cardTypeList[0].codevalue;
        // }
      } else if (this.type == 'place') {
        this.showitems = 1
        // this.select=this.options[0].provincename;
      } else if (this.type == 'sex') {
        this.showitems = 3
        // this.select=this.sexList[0].codevalue;
      }
    },
    SelectNotShow(tab) {
      //选择按钮
      this.isShow = false
      var mo = function(e) {
        e.preventDefault()
      }
      document.body.style.overflow = '' //出现滚动条
      document.removeEventListener('touchmove', mo, false)
      if (tab == 'select') {
        //确认按钮
        if (this.type == 'card') {
          this.cardType = this.cardTypeList[this.current1].codevalue
          this.cardId = this.cardTypeList[this.current1].codeid
        } else {
          this.sex = this.sexList[this.current3].codevalue
          this.sexid = this.sexList[this.current3].codeid
        }
      }
    },
    isItemActive(index, type, id) {
      //this.current = index;
      this.select = type //当前下拉框选中项的文本
      this.selectid = id //当前下拉框选中项的id
      if (this.type == 'card') {
        this.current1 = index
      } else {
        this.current3 = index
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
        this.common.formTips('span_1', '姓名格式不正确')
        return false
      }
      return i
    },
    // 验证中文或者英文
    checkNamex(arg) {
      var reg = /^[A-z]+$|^[a-zA-Z]+(\s*[a-zA-Z]+)+$|^((?![\u3000-\u303F])[\u2E80-\uFE4F]|·(?![\u3000-\u303F])[\u2E80-\uFE4F])*(?![\u3000-\u303F])[\u2E80-\uFE4F]*$/
      return reg.test(arg)
    },

    checkCardno(el) {
      //证件号校验
      this.common.formTips('span_3', '')
      if (!this.cardNo) {
        this.common.formTips('span_3', '证件号码不能为空')
        return false
      } else if (this.cardId == '01' && !this.common.checkCardNo(this.cardNo)) {
        this.common.formTips('span_3', '证件号码格式错误,请重新输入')
        return false
      } else if (this.cardId != '01' && this.common.checkCardNo(this.cardNo)) {
        this.common.formTips('span_3', '证件号码格式错误,请重新输入')
        return false
      } else {
        console.log(this.cardId, this.cardNo)
        // this.common.formTips('span_3',"");
        this.utilscommit.requestapi(
          'getVolCardCheckFortisH5',
          { albp0066: this.cardNo, albp0052: this.username },
          this.callback2
        ) /* 证件号唯一验证 */
        return true
      }
    },
    callback2(res) {
      //证件号唯一验证返回
      if (res.code == 0) {
        this.cardNoFlag = true
      } else if (res.code == 400001) {
        this.common.formTips('span_3', '证件件号已注册,请直接登录')
      } else {
        this.common.formTips('span_3', res.message)
      }
    },
    nextStep() {
      //下一步
      // debugger
      if (this.checkName() && this.checkCardno() && this.cardNoFlag == true) {
        if (this.cardType == '请选择证件类型') {
          this.common.formTips('span_2', '请选择证件类型')
          return false
        } else {
          this.common.formTips('span_2', '')
        }

        if (this.fieldValue == '请选择注册地点') {
          this.common.formTips('span_4', '请选择注册地点')
          return false
        } else if (this.cascaderValue.slice(4, 6) == '00') {
          this.common.formTips('span_4', '注册地没有精确到区(县),请重新选择')
          return false
        } else {
          this.common.formTips('span_4', '')
        }
        if (this.cardId != '01' && this.sex == '请选择性别') {
          this.common.formTips('span_5', '请选择性别')
          return false
        } else {
          this.common.formTips('span_5', '')
        }
        if (this.cardId != '01' && this.birthday == '请选择出生年月') {
          this.common.formTips('span_7', '请选择出生年月')
          return false
        } else {
          this.common.formTips('span_7', '')
        }
        if (this.cardId != '01' && !this.photo1) {
          this.common.formTips('span_6', '请上传证件反面照')
          return false
        } else {
          this.common.formTips('span_6', '')
        }
        if (this.cardId != '01' && !this.photo2) {
          this.common.formTips('span_6', '请上传证件正面照')
          return false
        } else {
          this.common.formTips('span_6', '')
        }
        // if (this.cardId != '01' && !this.photo3) {
        //   this.common.formTips('span_6', '请上传本人免冠照片')
        //   return false
        // } else {
        //   this.common.formTips('span_6', '')
        let info = {}
        if (this.cardId == '01') {
          info = {
            infoid: 1,
            name: this.username,
            cardtype: this.cardId,
            cardno: this.cardNo,
            regplace: this.cascaderValue,
            regplacename: this.fieldValue,
            sex: '',
            birthday: '',
            photo1: '',
            photo1x: '',
            photo2: '',
            photo2x: '',
            photo3: '',
            photo3x: '',
          } //居民身份证注册时 不需要填的内容不予保存
        } else {
          info = {
            infoid: 1,
            name: this.username,
            cardtype: this.cardId,
            cardno: this.cardNo,
            regplace: this.cascaderValue,
            regplacename: this.fieldValue,
            sex: this.sexid,
            birthday: this.birthday,
            photo1: this.photo1,
            // photo1x: this.photo1x,
            photo2: this.photo2,
            // photo2x: this.photo2x,
            photo3: this.photo3,
            // photo3x: this.photo3x,
          }
        }
        debugger
        this.$store.commit('changeRegInfo', info)
        this.$router.push('/individual-registration2api')
        // }
      }
    },
    tologin() {
      this.$router.push('/loginapi')
    },
  },
}
</script>

<style lang="scss" scoped>
.fontdx {
  font-size: 1.4rem !important;
}
.required::after {
  content: "*";
  color: #db0000;
  position: relative;
  // top: 0.3rem;
}
.form_tip .form-item {
  margin-bottom: 0.2rem;
}
.select-wrap-item li.active {
  color: #333;
}
.select-wrap-header span:last-child {
  color: #db0000;
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
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.my_register .van-cascader__header {
  width: 100%;
}
.form-item-core,
.van-cell {
  border-bottom: 0.05rem solid #ececec;
}
// span[id^='span_']{font-size:0.875rem;color:#db0000;}
</style>
