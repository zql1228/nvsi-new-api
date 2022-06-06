// 基本信息
<template>
  <div class="page" style="background: #f5f5f5">
    <div class="header">
      <div class="header-prefix">
        <img src="@/assets/img/back.svg" alt="" class="page-back" @click="submitInfo" />
      </div>
      <h2 class="header-title">基本信息</h2>
      <div class="header-suffix t-r">
        <!-- <b @click="submitInfo">保存</b> -->
      </div>
    </div>
    <!-- <PullRefresh
      v-model="isLoading"
      @refresh="onRefresh"
      success-text="刷新成功"
    > -->
    <div class="main" style="margin-top: 4.4rem; height: 100%">
      <ul class="cell-list">
        <li class="cell cell2">
          <img v-if="photo" :src="photo" alt="" class="cell-avatar" @click="showPhoto" />
          <img v-else src="@/assets/img/img39.png" alt="" class="cell-avatar" @click="showPhoto" />
          <span class="cell-text">头像<img src="@/assets/img/cell-right.svg" alt="" class="cell-right" @click="showPhoto" /></span>
          <input type="file" accept="image/*" @change="changePhoto" ref="photos" hidden />
        </li>
      </ul>
      <ul class="cell-list" style="margin-top: 0">
        <li class="cell">
          <span class="cell-label">用户名</span>
          <span class="cell-text" v-text="userInfoapi.albp0084"></span>
        </li>
        <li class="cell">
          <span class="cell-label">姓名</span>
          <span class="cell-text" v-text="userInfoapi.albp0003"></span>
        </li>
        <li class="cell">
          <span class="cell-label">证件类型</span>
          <span class="cell-text">{{ userInfoapi.cardtypes }}</span>
        </li>
        <li class="cell">
          <span class="cell-label">证件号码</span>
          <span class="cell-text" v-text="userInfoapi.albp0005"></span>
        </li>
        <!-- <li class="cell">
          <span class="cell-label">志愿者编号</span>
          <span class="cell-text" >{{userInfo.albp0029 | ellipsis(15)}}</span>
        </li> -->
        <li class="cell">
          <span class="cell-label">注册日期</span>
          <span class="cell-text">{{ userInfoapi.albp0034 | ellipsisNos(10) }}</span>
        </li>
        <li class="cell">
          <span class="cell-label">性别</span>
          <span class="cell-text" v-show="!userInfoapi.albp0006"></span>
          <span class="cell-text" v-show="userInfoapi.albp0006 == 1">男</span>
          <span class="cell-text" v-show="userInfoapi.albp0006 == 2">女</span>
        </li>
        <li class="cell">
          <span class="cell-label">实名状态</span>
          <span class="cell-text" v-show="userInfoapi.albp0063 == 0">实名失败</span>
          <span class="cell-text" v-show="userInfoapi.albp0063 == 1">实名通过</span>
          <span class="cell-text" v-show="userInfoapi.albp0063 == 2">审核中</span>
          <span class="cell-text" v-show="!userInfoapi.albp0063">未实名</span>
        </li>
        <li class="cell" @click="selectItemShow(0)">
          <span class="cell-label">国籍</span>
          <span class="cell-tag" v-if="!userInfoapi.albp0002x">未完善</span>
          <span class="cell-text" v-else v-text="userInfoapi.albp0002x"></span>
          <img src="@/assets/img/cell-right.svg" alt="" class="cell-right" />
        </li>
        <li class="cell" @click="selectItemShow(1)">
          <span class="cell-label">民族</span>
          <span class="cell-tag" v-if="!userInfoapi.albp0008x">未完善</span>
          <span class="cell-text" v-else v-text="userInfoapi.albp0008x"></span>
          <img src="@/assets/img/cell-right.svg" alt="" class="cell-right" />
        </li>
        <li class="cell" @click="selectItemShow(2)">
          <span class="cell-label">政治面貌</span>
          <span class="cell-tag" v-if="!userInfoapi.politicals">未完善</span>
          <span class="cell-text" v-else v-text="userInfoapi.politicals"></span>
          <img src="@/assets/img/cell-right.svg" alt="" class="cell-right" />
        </li>
        <li class="cell" @click="selectItemShow(3)">
          <span class="cell-label">最高学历</span>
          <span class="cell-tag" v-if="!userInfoapi.educations">未完善</span>
          <span class="cell-text" v-else v-text="userInfoapi.educations"></span>
          <img src="@/assets/img/cell-right.svg" alt="" class="cell-right" />
        </li>
        <li class="cell" @click="selectItemShow(4)">
          <span class="cell-label">从业情况</span>
          <span class="cell-tag" v-if="!userInfoapi.works">未完善</span>
          <span class="cell-text" v-else v-text="userInfoapi.works"></span>
          <img src="@/assets/img/cell-right.svg" alt="" class="cell-right" />
        </li>
      </ul>
      <ul class="cell-list">
        <li class="cell required">
          <span class="cell-label">手机号码</span>
          <span class="cell-text" v-text="userInfoapi.phone"></span>
          <!-- <img src="@/assets/img/cell-right.svg" alt="" class="cell-right" />  -->
        </li>
        <li class="cell" @click="toPage('Fixedphone', '邮箱', '请输入邮箱')">
          <span class="cell-label">邮箱</span>
          <span class="cell-tag" v-if="!userInfoapi.albp0081">未完善</span>
          <span class="cell-text" v-else v-text="userInfoapi.albp0081"></span>
          <img src="@/assets/img/cell-right.svg" alt="" class="cell-right" />
        </li>
        <li class="cell" @click="toPage('Fixedphone', '电话号码', '请输入电话号码')">
          <span class="cell-label">固定电话（座机）</span>
          <span class="cell-tag" v-if="!userInfoapi.albp0011">未完善</span>
          <span class="cell-text" v-else v-text="userInfoapi.albp0011"></span>
          <img src="@/assets/img/cell-right.svg" alt="" class="cell-right" />
        </li>
        <li class="cell" @click="toPage('Fixedphone', 'QQ', '请输入QQ号码')">
          <span class="cell-label">QQ</span>
          <span class="cell-tag" v-if="!userInfoapi.albp0012">未完善</span>
          <span class="cell-text" v-else v-text="userInfoapi.albp0012"></span>
          <img src="@/assets/img/cell-right.svg" alt="" class="cell-right" />
        </li>
        <li class="cell" @click="toPage('Fixedphone', '微信', '请输入微信号码')">
          <span class="cell-label">微信</span>
          <span class="cell-tag" v-if="!userInfoapi.albp0015">未完善</span>
          <span class="cell-text" v-else v-text="userInfoapi.albp0015"></span>
          <img src="@/assets/img/cell-right.svg" alt="" class="cell-right" />
        </li>
        <li class="cell required" @click="provinceShow(0)">
          <span class="cell-label">现居区域</span>
          <span class="cell-tag" v-if="!userInfoapi.albp0028name">未完善</span>
          <span class="cell-text" v-else v-text="userInfoapi.albp0028name"></span>
          <img src="@/assets/img/cell-right.svg" alt="" class="cell-right" />
        </li>
        <li class="cell" @click="toPage('Fixedphone', '详细地址', '请输入详细地址')">
          <span class="cell-label">详细地址</span>
          <span class="cell-tag" v-if="!userInfoapi.albp0013">未完善</span>
          <span class="cell-text" v-else>{{ userInfoapi.albp0013 | ellipsis(15) }}</span>
          <img src="@/assets/img/cell-right.svg" alt="" class="cell-right" />
        </li>
      </ul>
      <ul class="cell-list">
        <li class="cell" @click="toServiceTime()">
          <span class="cell-label">服务时间</span>
          <span class="cell-tag" v-if="!userInfoapi.jointimes">未完善</span>
          <span class="cell-text" v-else>{{ userInfoapi.jointimes | ellipsis(15) }}</span>
          <img src="@/assets/img/cell-right.svg" alt="" class="cell-right" />
        </li>
        <li class="cell required" @click="toServeType1('类别')">
          <span class="cell-label">服务类别</span>
          <span class="cell-tag" v-if="!userInfoapi.servicetypevalues">未完善</span>
          <span class="cell-text" v-else>{{ userInfoapi.servicetypevalues | ellipsis(15) }}</span>
          <img src="@/assets/img/cell-right.svg" alt="" class="cell-right" />
        </li>
        <li class="cell required" @click="toServeType1('特长')">
          <span class="cell-label">个人特长</span>
          <span class="cell-tag" v-if="!userInfoapi.grtcs">未完善</span>
          <span class="cell-text" v-else>{{ userInfoapi.grtcs | ellipsis(15) }}</span>
          <img src="@/assets/img/cell-right.svg" alt="" class="cell-right" />
        </li>
        <li class="cell required" style="margin-bottom: 10rem" @click="provinceShow(1)">
          <span class="cell-label">服务区域</span>
          <span class="cell-tag" v-if="!userInfoapi.albp0025">未完善</span>
          <span class="cell-text" v-else v-text="userInfoapi.albp0025"></span>
          <img src="@/assets/img/cell-right.svg" alt="" class="cell-right" />
        </li>
      </ul>
    </div>

    <Popup v-model="showPopup" round position="bottom">
      <Cascader v-model="cascaderValue" title="请选择所在地区" :options="options" :field-names="fieldNames" :closeable="false" @change="onChange">
        <template slot="title">
          <div style="position：relative; ">
            <div style="position: absolute; width: calc(100% - 32px)">
              <div class="my_cascader" style="display: flex">
                <span style="color: #969799; font-size: 15px; width: 4rem" @click="closeserviceAreaOptions">取消</span>
                <span style="display: block; width: 100%; text-align: center">点击选择服务区域</span>
                <span style="color: #ee0a24; font-size: 15px; width: 4rem" @click="serviceConfirm">确认</span>
              </div>
            </div>
          </div>
        </template>
      </Cascader>
    </Popup>
    <!-- 遮罩 -->
    <div class="modal" :class="{ show: isprovinceShow || isotherShow }"></div>
    <!-- 地区下拉 -->

    <!-- 列表（国籍等...） -->
    <div class="select-wrap flex-v" :class="{ show: isotherShow }">
      <div class="select-wrap-header flex-h v-m t-lr">
        <span @click="SelectNotShow('del')">取消</span>
        <span @click="SelectNotShow('select')">确定</span>
      </div>
      <ul class="flex-v flex-1 select-wrap-item" style="overflow: auto">
        <li v-for="(item, index) in List" :key="index" class="flex-h v-m t-c" :class="{ active: index == current }" @click="isItemActive(index, item.codevalue, item.codeid)">
          {{ item.codevalue }}
        </li>
      </ul>
    </div>
    <frame ref="frame_popup" :obj="obj"></frame>
  </div>
</template>

<script>
// import areaPop from '../../components/area.vue';
import { Popup, Cascader, Icon, PullRefresh, Toast } from 'vant'
// import { Cascader } from 'vant'
// import { Icon } from 'vant'
import frame from '../../components/frame.vue'
// import { PullRefresh } from 'vant'
export default {
  components: { Popup, Cascader, Icon, frame, PullRefresh, Toast },
  data: function() {
    return {
      regPlace: this.$store.getters.getregion.regPlace, //区域名
      cardno: this.$store.getters.getuserInfo.albp0005, //志愿者加密身份证
      userInfoapi: {}, //用户信息
      avatar: '', //暂存头像
      photo: '', //显示头像
      isprovinceShow: false, //区域
      isotherShow: false, //其他
      List: [], //下拉框显示列表(动态)
      nationalityList: [], //国籍列表
      nationList: [], //民族列表
      politicalList: [], //政治面貌列表
      educationList: [], //学历
      workList: [], //从业状况
      showItem: 0, //下拉框选择列表类型  0-国籍  1-民族  2-政治面貌  3-学历  4-从业状况   5-特长
      selected: '', //当前选中项
      selectedId: '', //当前选中项
      current: 0,
      obj: {
        text1: '',
        text2: '您的基本信息中有必填项未填写，这会影响到您的签到及报名等功能，是否确认退出',
        cel: '取消',
        confirm: '确定',
        cancel: this.cancel,
      },

      choice: '', //三级联动选择
      fieldValue: '', //注册地点 input框中的·中文名
      serviceAreaValue: '', //input框中的对应区域id
      showPopup: false, //三级联动显示隐藏
      cascaderValue: '', //注册地点 市级地区的 areaid
      options: [], //区域列表
      fieldNames: {
        //级联选择自定义字段
        text: 'area',
        value: 'areaid',
        children: 'children',
      },
      lbe05: '', //保存服务类型
    }
  },
  created() {
   
  },
  mounted() {
    
    let data = { cardno: this.cardno }

    this.utilscommit.requestapiwebapi('getVolunteerPhotoOnSecret', data, (src) => {
      //查询头像
      if (src.code == 0 && src.data.photourl) {
        this.photo = src.data.photourl
      }
    })

    this.utilscommit.requestapi('getVolunteerInfoOnH5', data, (src) => {
      if (src.code == 0 && src.data) {
        this.userInfoapi = src.data
        this.getValueFromCodeId(src.data)
        
        console.log({ tableName: 'lbe05', areaid: this.config.areaid })
        this.utilscommit.requestapi('codeValueQueryFortisH5', { tableName: 'lbe05', areaid: "00" }, (src) => {
          this.lbe05 = src.data
          //debugger
          if (src.code == 0 && this.userInfoapi.albp0021) {
            let b = ''
            let a = this.userInfoapi.albp0021.split(',')
            for (let i = 0; i <= a.length; i++) {
              src.data.forEach(function(element) {
                if (a[i] == element.codeid) {
                  if (i == 0) {
                    b = element.codevalue
                  } else {
                    return (b = b + ',' + element.codevalue)
                  }
                }
              })
            }

            this.$set(this.userInfoapi, 'servicetypevalues', b)

            //当服务对象存在,且接口有返回值
          }
        })
      }
    })
    
    // this.utilscommit.requestapi('areaTreeFortisH5', {}, this.callback1) /* 区域选择框 */
    this.sessionStorage.getCodeValueH5("areaTree",'areaTreeFortisH5',{},this.callback1)
    this.sessionStorage.getCodeValueH5("nvsi_albp0002",'getCodeValueH5',{ tableName: 'nvsi_albp0002' }, this.nationalityBack)/* 国籍 */
    this.sessionStorage.getCodeValueH5("nvsi_albp0008",'getCodeValueH5',{ tableName: 'nvsi_albp0008' }, this.nationBack)/* 民族 */
    this.sessionStorage.getCodeValueH5("nvsi_albp0017",'getCodeValueH5',{ tableName: 'nvsi_albp0017' }, this.educationBack)/* 学历 */
    this.sessionStorage.getCodeValueH5("nvsi_albp0007",'getCodeValueH5',{ tableName: 'nvsi_albp0007' }, this.politicalBack)/* 政治面貌 */
    this.sessionStorage.getCodeValueH5("nvsi_albp0018",'getCodeValueH5',{ tableName: 'nvsi_albp0018' }, this.workBack)/* 从业状况 */
    // this.utilscommit.requestapi('getCodeValueH5', { tableName: 'nvsi_albp0002' }, this.nationalityBack) /* 国籍 */
    // this.utilscommit.requestapi('getCodeValueH5', { tableName: 'nvsi_albp0008' }, this.nationBack) /* 民族 */
    // this.utilscommit.requestapi('getCodeValueH5', { tableName: 'nvsi_albp0017' }, this.educationBack) /* 学历 */
    // this.utilscommit.requestapi('getCodeValueH5', { tableName: 'nvsi_albp0007' }, this.politicalBack) /* 政治面貌 */
    // this.utilscommit.requestapi('getCodeValueH5', { tableName: 'nvsi_albp0018' }, this.workBack) /* 从业状况 */
  },
  methods: {
    getValueFromCodeId(data) {
      this.utilscommit.requestapi('getValueFromCodeId', { tablename: 'nvsi_albp0065', codeid: data.albp0004 }, (src) => {
        if (src.code == 0 && src.data) {
          this.$set(this.userInfoapi, 'cardtypes', src.data.value)
        }
      })
      this.utilscommit.requestapi('getValueFromCodeId', { tablename: 'nvsi_albp0002', codeid: data.albp0002 }, (src) => {
        if (src.code == 0 && src.data) {
          this.$set(this.userInfoapi, 'albp0002x', src.data.value)
        }
      })
      this.utilscommit.requestapi('getValueFromCodeId', { tablename: 'nvsi_albp0008', codeid: data.albp0008 }, (src) => {
        if (src.code == 0 && src.data) {
          this.$set(this.userInfoapi, 'albp0008x', src.data.value)
        }
      })

      this.utilscommit.requestapi('getValueFromCodeId', { tablename: 'nvsi_albp0007', codeid: data.albp0007 }, (src) => {
        if (src.code == 0 && src.data) {
          this.$set(this.userInfoapi, 'politicals', src.data.value)
        }
      })
      this.utilscommit.requestapi('getValueFromCodeId', { tablename: 'nvsi_albp0017', codeid: data.albp0017 }, (src) => {
        if (src.code == 0 && src.data) {
          this.$set(this.userInfoapi, 'educations', src.data.value)
        }
      })
      this.utilscommit.requestapi('getValueFromCodeId', { tablename: 'nvsi_albp0018', codeid: data.albp0018 }, (src) => {
        if (src.code == 0 && src.data) {
          this.$set(this.userInfoapi, 'works', src.data.value)
        }
      })
      this.utilscommit.requestapi('getValueFromCodeId', { tablename: 'nvsi_albp0035', codeid: data.albp0035 }, (src) => {
        if (src.code == 0 && src.data) {
          this.$set(this.userInfoapi, 'jointimes', src.data.value)
        }
      })
      this.utilscommit.requestapi('getValueFromCodeId', { tablename: 'nvsi_albp0039', codeid: data.albp0039 }, (src) => {
        if (src.code == 0 && src.data) {
          this.$set(this.userInfoapi, 'grtcs', src.data.value)
        }
      })
    },
    toServeType1(type) {
      this.$store.commit('changservetype',{
          type: type,
          albp0021: this.userInfoapi.albp0021,
          servicetypevalues: this.userInfoapi.servicetypevalues,
          albp0039: this.userInfoapi.albp0039,
          grtcs: this.userInfoapi.grtcs,
        })
      this.$router.push({
        name: 'ServeType',
        params: {
        },
      })
    },
    toServiceTime() {
      this.$router.push({
        name: 'ServiceTime',
        params: {
          jointimes: this.userInfoapi.jointimes,
          albp0035: this.userInfoapi.albp0035,
        },
      })
    },
    onFinish({ selectedOptions }) {
      //获取服务区域输入框显示字段

      this.fieldValue = selectedOptions.map((option) => option.area).join('/')
      if (this.serviceAreaValue.value.slice(4, 6) == '00' || this.serviceAreaValue.value.slice(6, 10) != '0000') {
        if (this.choice == 0) {
          Toast('居住区域没有精确到区(县),请重新选择')
        } else {
          Toast('服务区域没有精确到区(县),请重新选择')
        }

        return
      }
      let data = { albp0005: this.$store.getters.getuserInfo.albp0005, albp0006: this.$store.getters.getuserInfo.albp0006 }
      if (this.choice == 0) {
        this.userInfoapi.albp0028 = this.serviceAreaValue.value
        data.albp0028 = this.serviceAreaValue.value
        this.userInfoapi.albp0028name = this.fieldValue
      } else {
        if (
          this.userInfoapi.albp0021 &&
          this.userInfoapi.albp0020 &&
          this.userInfoapi.albp0020.slice(0, 2) != this.serviceAreaValue.value.slice(0, 2)
        ) {
          let albpx = []
          let albp = this.userInfoapi.albp0021.split(',')
          albp.forEach((irem) => {
            if (irem.slice(0, 2) == '00') {
              albpx.push(irem)
            }
          })
          if (albpx.length > 0) {
            this.userInfoapi.albp0021 = albpx.join(',')
            data.albp0021 = albpx.join(',')
          } else {
            this.userInfoapi.albp0021 = ''
            data.albp0021 = ''
          }
        }

        this.userInfoapi.albp0020 = this.serviceAreaValue.value
        data.albp0020 = this.serviceAreaValue.value
        this.userInfoapi.albp0025 = this.fieldValue
      }
      console.log(data)

      this.utilscommit.requestapi('updateVolunInforOnH5', data, (src) => {
        if (src.code == 0) {
          let a = this.$store.getters.getuserInfo
          //将修改的用户信息保存到vuex
          if (this.choice == 1) {
            a.albp0021 = this.userInfoapi.albp0021
            a.albp0020 = this.userInfoapi.albp0020
            this.$store.commit('changeuserInfo', a)
            Toast('服务区域已修改,对应区域的服务类别已做变更')
            let b = ''
            let ab = this.userInfoapi.albp0021.split(',')
            for (let i = 0; i <= ab.length; i++) {
              this.lbe05.forEach(function(element) {
                if (ab[i] == element.codeid) {
                  if (i == 0) {
                    b = element.codevalue
                  } else {
                    return (b = b + ',' + element.codevalue)
                  }
                }
              })
            }

            this.$set(this.userInfoapi, 'servicetypevalues', b)
          } else {
            a.albp0028 = this.userInfoapi.albp0028
            this.$store.commit('changeuserInfo', a)
            Toast('修改成功')
          }
        } else {
          Toast('修改失败')
        }
      })
      this.serviceAreaValue = {}
      this.fieldValue = ''
      this.cascaderValue = ''
    },
    serviceConfirm() {
      //确定
      if (this.serviceAreaValue) this.onFinish(this.serviceAreaValue)
      this.showPopup = false
    },
    closeserviceAreaOptions() {
      //取消
      this.serviceAreaValue = {}
      this.fieldValue = ''
      this.cascaderValue = ''
      this.showPopup = false
    },
    onChange(value) {
      this.serviceAreaValue = value
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
         // debugger 
          console.log(this.serviceAreaValue)
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
    // basicback(res) {
    //   if (res.data) {
    //     this.userInfo = res.data
    //     if (this.userInfo.photo) {
    //       this.photo = this.common.context() + this.userInfo.photo
    //     }
    //   }
    // },

    callback1(res) {
      //区域选择框
   
        if (res) {
          let options = []
          for (let i = 0; i < res.child.length; i++) {
            if (res.child[i].area != "全国") {
              res.child[i].children = []
              options.push(res.child[i])
              //排除全国 并给所有省级添加children属性
              // res.data[i].children = []
              // res.data[i].isLeaf = false
              // res.data[i].children.children = []
              // res.data[i].children.isLeaf = false
              // options.push(res.data[i])
            }
          }
          this.options = options

          //  console.log(options)
        
      }
    },
    getFListBack(res) {
      //全国
      // console.log(res);
      if (res.code == 0) {
        this.F_List = this.fixedList(res.data)
      }
    },
    getSListBack(res) {
      //北京
      // console.log(res);
      if (res.code == 0) {
        this.S_List = this.fixedList(res.data)
      }
    },

    toPage(name, text, text2) {
      this.$router.push({ name: name, params: { text, text2 } })
    },
    nationalityBack(res) {
      //国籍
      
        this.nationalityList = this.common.orderBy(res, 'codeid', 'asc')
    
    },
    nationBack(res) {
      //民族
     
        //console.log('民族',res.data);
        this.nationList = this.common.orderBy(res, 'codeid', 'asc')
      
    },
    politicalBack(res) {
      //政治
     
        // console.log('政治',res.data);
        this.politicalList = this.common.orderBy(res, 'codeid', 'asc')
    
    },
    educationBack(res) {
      //学历
        //console.log('学历',res.data);
        this.educationList = this.common.orderBy(res, 'codeid', 'asc')
    },

    workBack(res) {
      //工作
 
        //console.log('工作',res.data);
        this.workList = this.common.orderBy(res, 'codeid', 'asc')
    
    },
    selectItemShow(tab) {
      //出现选择框
      this.isotherShow = true
      var mo = function(e) {
        e.preventDefault()
      }
      // document.body.style.overflow = "hidden";
      document.addEventListener('touchmove', mo, false) //禁止页面滑动
      this.showItem = tab
      this.current = 0
      if (this.showItem == 0) {
        //国籍
        this.List = this.nationalityList
      } else if (this.showItem == 1) {
        //民族
        this.List = this.nationList
      } else if (this.showItem == 2) {
        //政治面貌
        this.List = this.politicalList
      } else if (this.showItem == 3) {
        //学历
        this.List = this.educationList
      } else if (this.showItem == 4) {
        //从业状况
        this.List = this.workList
      }
      this.selected = this.List[0].codevalue
      this.selectId = this.List[0].codeid
    },
    SelectNotShow(tab) {
      //选择按钮
      this.isotherShow = false
      var mo = function(e) {
        e.preventDefault()
      }
      document.body.style.overflow = '' //出现滚动条
      document.removeEventListener('touchmove', mo, false)
      if (tab == 'select') {
        //确认按钮
        let data = { albp0005: this.$store.getters.getuserInfo.albp0005, albp0006: this.$store.getters.getuserInfo.albp0006 }
        if (this.showItem == 0) {
          //国籍
          this.userInfoapi.albp0002x = this.selected
          this.userInfoapi.albp0002 = this.selectId
          data.albp0002 = this.selectId
        } else if (this.showItem == 1) {
          //民族
          this.userInfoapi.albp0008x = this.selected
          this.userInfoapi.albp0008 = this.selectId
          data.albp0008 = this.selectId
        } else if (this.showItem == 2) {
          //政治面貌
          this.userInfoapi.politicals = this.selected
          this.userInfoapi.albp0007 = this.selectId
          data.albp0007 = this.selectId
        } else if (this.showItem == 3) {
          //学历
          this.userInfoapi.educations = this.selected
          this.userInfoapi.albp0017 = this.selectId
          data.albp0017 = this.selectId
        } else if (this.showItem == 4) {
          //从业状况
          this.userInfoapi.works = this.selected
          this.userInfoapi.albp0018 = this.selectId
          data.albp0018 = this.selectId
        }
        this.utilscommit.requestapi('updateVolunInforOnH5', data, (src) => {
          if (src.code == 0) {
            Toast('修改成功')
          } else {
            Toast('修改失败')
          }
        })
      }
      // this.$store.commit("changeuserInfo", this.userInfo);
    },
    isItemActive(index, item, id) {
      //选择列表项
      this.current = index
      this.selected = item
      this.selectId = id
    },
    provinceShow(tab) {
      //区域展示
      //this.isprovinceShow = true;
      this.choice = tab
      this.showPopup = true
      //this.$refs.isprovinceShow.show(tab);
    },
    showPhoto() {
      //头像修改
      this.$refs.photos.click()
    },
    changePhoto(e) {
      //图片选择
      var file = e.target.files[0]
      let that = this
      let fileVal = this.common.checkFile(file, function(newfile) {
        that.avatar = newfile.src
        // that.photo = newfile.src
        // let param = new FormData()
        // param.append('file', newfile)
        // debugger
        that.utilscommit.uploadapi(newfile, that.callback) /*上传图片 */
      })
      if (fileVal) return swal(fileVal, { buttons: '确定' })
    },
    callback(res) {
      // debugger
      let file = res.data
      if (file && res.code == 0) {
        this.photo = this.avatar
        let data = {
          albp0027: JSON.stringify(file),
          albp0005: this.$store.getters.getuserInfo.albp0005,
          albp0006: this.$store.getters.getuserInfo.albp0006,
        }
        console.log(data)
        this.utilscommit.requestapi('updateVolunInforOnH5', data, (src) => {
          if (src.code == 0) {
            Toast('修改成功')
          } else {
            Toast('修改失败')
          }
        })
      } else {
        swal(res.message, { button: '确定' })
      }
    },
    cancel(val) {
      if (val == 1) {
        //点击确认按钮
        // this.UpdateUSerInfo()
        this.$router.go(-1)
      } else {
        //点击取消按钮
      }
    },
    submitInfo() {
      //点击返回
      if (
        // !this.userInfoapi.albp0010 ||
        !this.userInfoapi.albp0028 ||
        !this.userInfoapi.albp0021 ||
        !this.userInfoapi.albp0039 ||
        !this.userInfoapi.albp0020
      ) {
        this.$refs.frame_popup.isshow = true //弹出提示框
      } else if (this.userInfoapi.albp0020.slice(4, 6) == '00') {
        Toast('服务区域没有精确到区(县),请重新选择')
      } else if (this.userInfoapi.albp0028.slice(4, 6) == '00') {
        Toast('居住区域没有精确到区(县),请重新选择')
      } else {
        this.$router.go(-1)
        // this.UpdateUSerInfo()
      }
    },
    // UpdateUSerInfo() {
    //   let param = {
    //     id: this.userInfo.albp0031,
    //     //realareaid: this.config.areaid,
    //     // 'albp0088':this.userInfo.albp0088,//人脸识别
    //     //albp0084: this.userInfo.albp0084, //昵称
    //     // albp0085: this.userInfo.albp0085, //公益宣言
    //     albp0002: this.userInfo.albp0002, //国籍
    //     albp0008: this.userInfo.albp0008, //民族
    //     albp0007: this.userInfo.albp0007, //政治面貌
    //     albp0017: this.userInfo.albp0017, //学历
    //     albp0018: this.userInfo.albp0018, //从业状况
    //     //albp0010: this.userInfo.albp0010, //手机
    //     albp0011: this.userInfo.albp0011, //固定电话
    //     albp0012: this.userInfo.albp0012, //qq
    //     albp0015: this.userInfo.albp0015, //微信
    //     albp0047: this.userInfo.albp0047, //现居区域
    //     albp0028: this.userInfo.albp0028, //现居区域Id
    //     albp0013: this.userInfo.albp0013, //详细地址
    //     // albp0022: this.userInfo.serviceFieldCodeid, //服务领域
    //     albp0035: this.userInfo.jointimesCodeid, //服务时间
    //     // albp0021: '0006', //服务类别
    //     albp0021: this.userInfo.albp0021, //服务类别
    //     albp0039: this.userInfo.albp0039, //特长
    //     // albp0039:'06',
    //     albp0025: this.userInfo.albp0025, //服务区域
    //     albp0020: this.userInfo.albp0020, //服务区域ID
    //   }
    //   if (this.avatar) {
    //     param.albp0027 = this.avatar //头像
    //   }
    //   this.utilscommit.request('nvsi_jsUpdateUSerInfo', param, this.submitInfoBack)
    // },
    // submitInfoBack(res) {
    //   if (res.message == '修改成功') {
    //   }
    //   this.userInfo.idcard = this.$store.getters.getshare.idcard
    //   this.userInfo.loginid = this.$store.getters.getshare.loginid
    //   this.userInfo.albp0056 = this.$store.getters.getshare.albp0056
    //   this.$store.commit('changeuserInfo', this.userInfo)
    //   this.$router.go(-1)
    // },
  },
}
</script>

<style lang="scss">
@import "@/assets/css/page.scss";

.cell-list {
  padding: 0 1.5rem;
  margin: 1rem 0 0;
  background: #fff;
}
.cell {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;

  span:not(.cell-tag) {
    font-weight: 500;
    font-size: 1.6rem;
  }
  &:not(:last-child)::after {
    @include mock-border;
    top: auto;
    bottom: 0;
  }
  &-avatar {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
  }
  &-label {
    flex: 1;
    color: #262626;
  }
  &-right {
    width: 2rem;
    height: 2rem;
    margin-left: 0.4rem;
  }
  &-text {
    display: flex;
    align-items: center;
    color: #666666;
  }
  &-tag {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 2.2rem;
    padding: 0 0.7rem;
    font-size: 1.2rem;
    color: #108ee9;
    border: 0.1rem solid #108ee9;
    border-radius: 1.1rem;
  }
  &.required {
    .cell-label::after {
      content: "*";
      color: #ff0000;
      position: relative;
      top: 0.3rem;
    }
  }
}
.cell-tag {
  color: #04c996;
  border: 1px solid #04c996;
}
.cell.cell2::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  width: 100%;
  height: 1px;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background: #eeeeee;
  top: auto;
  bottom: 0;
}
.select-wrap-header span:last-child,
.select-wrap-item li.active {
  color: #db0000;
}
.van-cell {
  padding: 0;
}
.van-field__label {
  color: #262626;
}
.van-cell::after {
  border: 0;
}
.van-icon-arrow:before {
  font-size: 2.2rem;
  color: #b2b2b2;
}
</style>
