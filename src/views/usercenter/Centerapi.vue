// 个人中心
<template>
  <div class="page">
    <section class="section">
      <div class="p-40 bg-white" style="
          padding-top: 2.25rem;
          background-image: url(@/assets/img/imgsy/bgx2.png);
          background-repeat: no-repeat;
          background-size: 100%;
          background-position: top center;
        ">
        <div class="flex-h v-m">
          <img :src="photourl" @error="common.imgError($event, require('@/assets/img/imgsy/avatar8x.png'))" style="width: 4.6rem; height: 4.6rem;border-radius: 2.8rem;"
            class="center-avatar" />

          <div class="flex-1 flex-v">
            <h2 class="center-name" v-text="userInfoapi.albp0003"></h2>
            <div clas="stars">
              <b v-for="(item, index) in icons" :key="index">
                <img style="width:2rem;margin-right:0.3rem;" :src="require('@/assets/img/imgsy/' + item)" alt="" />
              </b>
              <span v-text="userInfoapi.albp0026 ? userInfoapi.albp0026 + '.0' : ''"></span>
            </div>
          </div>
          <a href="javascript:void(0)" @click="toPage('setup')">
            <img src="@/assets/img/imgsy/icon42.svg" alt="" class="center-setting" style="box-shadow: none" />
          </a>
        </div>

        <ul class="center-data">
          <li>
            <span v-text="Information.project"></span>
            <p>参加项目</p>
          </li>
          <li>
            <span v-text="Information.team"></span>
            <p>参加团体</p>
          </li>
          <li>
            <span v-text="Information.time"></span>
            <p>服务时长</p>
          </li>
          <li>
            <span v-text="9999"></span>
            <p>个人排名</p>
          </li>
        </ul>

        <div class="license" @click="toVolunteerCode">
          <div class="flex-h v-m">
            <h2 class="license-title">志愿服务证</h2>
            <span class="license-slogan">奉献、友爱、互助、进步</span>
            <img src="@/assets/img/imgsy/icon17.svg" alt="" class="license-code" />
            <img src="@/assets/img/imgsy/right-white.svg" alt="" class="license-more" />
          </div>
          <div class="flex-h t-lr v-b mt-40">
            <ul class="license-info">
              <li>
                <span>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>
                <span v-text="userInfoapi.albp0003"></span>
              </li>
              <li>
                <span>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</span>
                <span v-show="!userInfoapi.albp0006"></span>
                <span v-show="userInfoapi.albp0006 == 1">男</span>
                <span v-show="userInfoapi.albp0006 == 2">女</span>
              </li>
              <li>
                <span>服务省份</span>
                <span v-text="userInfoapi.province"></span>
              </li>
              <li>
                <span>注册日期</span>
                <span v-text="regdate"></span>
              </li>
            </ul>
            <img :src="abc" @error="common.imgError($event, require('@/assets/img/imgsy/avatar3.png'))" alt="" class="license-avatar" />
          </div>
        </div>
        <img class="arc-mask" src="@/assets/img/imgsy/img25.png" alt="" />

        <div class="panel type2" style="margin-top: 0;padding: 1.75rem 0;">
          <div class="panel-head">
            <h2 class="panel-head-title">我的信息</h2>
          </div>
          <div class="panel-content">
            <div class="center-menu">
              <a class="center-menu-item" href="javascript:void(0)" @click="$router.push('/basicapi')">
                <b class="center-menu-name">基本信息</b>
                <span class="center-menu-text" style="font-size: 1.2rem; color: rgba(120,46,47,0.5);">查看我的基本信息</span>
              </a>
              <a class="center-menu-item" href="javascript:void(0)" @click="toBusinesscard">
                <b class="center-menu-name">志愿名片</b>
                <span class="center-menu-text" style="font-size: 1.2rem; color: rgba(120,46,47,0.5);">查看我的个人名片</span>
              </a>
            </div>
          </div>
        </div>

        <div class="panel type2">
          <div class="panel-head">
            <h2 class="panel-head-title">相关服务</h2>
          </div>
          <div class="panel-content">
            <ul class="menu type3">
              <li class="menu-item">
                <a href="javascript:void(0)" class="menu-item-wrap" @click="$router.push('/appliedProjectapi')">
                  <img src="@/assets/img/imgsy/menu5.svg" alt="" />
                  <span>项目管理</span>
                </a>
              </li>
              <li class="menu-item">
                <a href="javascript:void(0)" class="menu-item-wrap" @click="$router.push('/joinTeamapi')">
                  <img src="@/assets/img/imgsy/menu6.svg" alt="" />
                  <span>队伍管理</span>
                </a>
              </li>
              <li class="menu-item" v-show="false">
                <a href="javascript:void(0)" class="menu-item-wrap" @click="toPage('signInProjects')">
                  <img src="@/assets/img/imgsy/menu7.svg" alt="" />
                  <span>下载证明</span>
                </a>
              </li>
              <li class="menu-item" v-show="false">
                <a href="javascript:void(0)" class="menu-item-wrap" @click="toPage('signInProjects')">
                  <img src="@/assets/img/imgsy/menu8.svg" alt="" />
                  <span>权限管理</span>
                </a>
              </li>
              <li class="menu-item">
                <a href="javascript:void(0)" class="menu-item-wrap" @click="toPage('managementapi')">
                  <img src="@/assets/img/imgsy/menu8.svg" alt="" />
                  <span>权限管理</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <footer class="footer has-border">
      <div class="tabbar">
        <a href="javascript:void(0)" @click="toPage('Home')" class="tabbar-item">
          <img src="@/assets/img/imgsy/tabbar1.svg" alt="" />
          <img src="@/assets/img/imgsy/tabbar1-active.svg" alt="" />
          <span>首页</span>
        </a>
        <a href="javascript:void(0)" @click="toPage('SignInProjectsapi')" class="tabbar-item center">
          <img src="@/assets/img/imgsy/tabbar-center.svg" alt="" />
          <span>签到</span>
        </a>
        <a href="javascript:void(0)" @click="toPage('Centerapi')" class="tabbar-item active">
          <img src="@/assets/img/imgsy/tabbar3.svg" alt="" />
          <img src="@/assets/img/imgsy/tabbar3-active.svg" alt="" />
          <span>我的</span>
        </a>
      </div>
    </footer>
    <frame ref="frame_popup" :obj="obj"></frame>
  </div>
</template>
<script>
import frame from '../../components/frame.vue'
import { Dialog } from 'vant'
export default {
  components: { frame, Dialog },
  data: function() {
    return {
      userInfoapi: {},
      Information: {
        project: '',
        team: '',
        time: '',
      },
      userInfoapix: {},
      isUnfold: true,
      icons: [],
      id: this.$store.getters.getuserInfo.albp0031,
      cardno: this.$store.getters.getuserInfo.albp0005, //志愿者加密身份证
      info: [], //志愿者信息
      regdate: '',
      obj: {
        text1: '功能设计中，敬请期待',
        text2: '',
        cel: '',
        confirm: '确定',
        cancel: this.cancel,
      },
      photourl: '', //图片路径
      abc: '', //照片路径
    }
  },
  mounted() {
    let data = { cardno: this.cardno }
    this.utilscommit.requestapi('getPersonInfor', data, (src) => {
      //查询个人参加的项目数量
      if (src.code == 0 && src.data) {
        this.Information = src.data
      }
    })

    this.utilscommit.requestapi('getVolunteerInfoOnH5', data, (src) => {
      //查询用户信息
      if (src.code == 0 && src.data) {
        this.userInfoapi = src.data
        this.init()
        if(src.data.volphoto){
            this.abc=src.data.volphoto
        }
        
  
        // let a = {
        //   name: this.userInfoapi.albp0003,
        //   volnum: this.userInfoapi.albp0029,
        //   regarea: this.userInfoapi.albp0061,
        //   regdate: this.userInfoapi.albp0034,
        //   vollinknum: this.userInfoapi.albp0030,
        //   sex: this.userInfoapi.albp0006,
        //   areaid: this.userInfoapi.albp0020,
        //   cardno: this.$store.getters.getuserInfo.albp0005,
        // }
        // if (this.userInfoapi.albp0083) {
        //   a.albp0083 = JSON.parse(this.userInfoapi.albp0083)
        // }

        // this.utilscommit.requestapiwebapi('produceVolunteerServiceCard', a, (src) => {
        //   if (src.code == 0 && src.data.cardurl) {
        //     this.abc = src.data.cardurl
        //   }
        // })
      }
    })
    this.utilscommit.requestapiwebapi('getVolunteerPhotoOnSecret', data, (src) => {
      //查询头像
      if (src.code == 0 && src.data.photourl) {
        this.photourl = src.data.photourl
      }
    })
  },
  methods: {
    init() {
      //初始化
      if (this.userInfoapi.albp0026) {
        //星级
        for (var i = 0; i < this.userInfoapi.albp0026; i++) {
          this.icons[i] = 'star_4_active.svg'
        }
        for (var j = 0; j < 5 - this.userInfoapi.albp0026; j++) {
          this.icons[5 - j - 1] = 'star_4.svg'
        }
      } else {
        for (var i = 0; i < 5; i++) {
          this.icons[i] = 'star_4.svg'
        }
      }

      if (this.userInfoapi.albp0025) {
        //注册地
        this.userInfoapi.albp0025fullname = this.userInfoapi.albp0025.split('>')[0]
      }
      if (this.userInfoapi.albp0034) {
        this.regdate =
          this.userInfoapi.albp0034.slice(0, 4) + '年' + this.userInfoapi.albp0034.slice(5, 7) + '月' + this.userInfoapi.albp0034.slice(8, 10) + '日'
      }
    },
    touchstart(e) {
      //滑动(志愿者证)
      // e.preventDefault()
      this.startY = e.touches[0].clientY
    },
    touchmove(e) {
      // e.preventDefault()
      this.moveY = e.touches[0].clientY
      this.startY - this.moveY <= 0 ? (this.isUnfold = false) : (this.isUnfold = true)
    },
    toBasic(val) {
      //跳转基本信息页
      // let data={'nvsi_jsGetUSerInfo',{'albp0031':this.info.albp0031},}/* 查询用户信息 */
      //this.utilscommit.request('nvsi_jsGetUSerInfo',{'albp0031':this.info.albp0031},this.callback)
      this.$router.push({
        name: 'Basic',
        params: { name: 'center', value: val },
      })
    },
    callback(res) {
      //console.log(res);
      if (res.code == 0) {
        this.$store.commit('changeuserInfo', res.data)
        this.commonRouter.toBasicInfo()
      }
    },
    toVolunteerCode() {
      this.$router.push({ name: 'volunteerCode' })
    },
    toBusinesscard() {
      //志愿名片
      this.$refs.frame_popup.isshow = true
    },
    cancel(val) {
      //取消
      // if(val==1 && this.obj.urlname=="individual-registration2"){
      //     this.$router.push({name:'login'})
      // }
      if (val == 1) {
        //点击确认按钮
      } else {
        //点击取消按钮
      }
    },
    // toSign(){//签到项目
    //   this.$router.push('/signInProjects')
    // },
    // tosetup(){//设置
    //   this.$router.push('/setup')
    // },
    toPage(name) {
      this.$router.push({ name })
    },
  },
}
</script>

<style scoped></style>
