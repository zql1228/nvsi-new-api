<template>
  <div class="page bg-gray">
    <div class="header">
      <div class="header-prefix">
        <img src="@/assets/img/back.svg" alt="" class="page-back" @click="$router.go(-1)" />
      </div>
      <h2 class="header-title">签到</h2>
      <div class="header-suffix"></div>
    </div>
    <div style="margin-top: 5.5rem">
      <PullRefresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
        <div style="background: #fff; margin-bottom: 1rem; padding: 2rem">
          <div class="team-info flex-h v-m flex-1" @click="$router.push(`/volunteerProject1api/${this.$route.params.id}/${this.$route.params.aid}`)">
            <div class="project-item-cover">
              <img v-if="getProject.fileid" :src="getProject.fileid" alt="" />
              <img v-else :src="require('@/assets/img/imgsz/albx' + getProject.albx0009 + '.png')" alt="" />
              <div class="project-item-cover-title">
                {{ getProject.albx0003 }}
              </div>
            </div>
            <div class="project-item-main">
              <a class="project-item-title">{{ getProject.albx0002 }}</a>
              <ul class="project-item-info">
                <li>
                  加入时间：<span>{{ jointime }}</span>
                </li>
              </ul>
              <ul class="project-item-info mt-10">
                <li>
                  服务时长：<span>{{ getProject.albx0083 }}小时</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="sign-in-panel">
          <div
            class="sign-in-head"
            style="
              box-shadow: 0 0 2rem rgb(199 207 222 / 27%);
              border-radius: 0.5rem;
            "
          >
            <img v-if="photourl" :src="photourl" alt="" />
            <img v-else src="@/assets/img/photo.png" />
            <h3 v-text="userInfo.albp0003"></h3>
            <div class="button primary" style="color: #db0000; border: 1px solid #db0000" outline @click="toSignInRecords">
              签到记录
            </div>
          </div>
          <ul class="sign-in-info" style="margin-bottom: 3rem">
            <li style="box-shadow: 0 0 2rem rgb(199 207 222 / 27%); height: 7rem">
              <p>签到</p>
              <span :class="{ active: signInTime }">
                <img src="@/assets/img/success.png" alt="" />
                {{ signInTime ? signInTime + '已打卡' : '未打卡' }}
              </span>
            </li>
            <li style="box-shadow: 0 0 2rem rgb(199 207 222 / 27%); height: 7rem">
              <p>签退</p>
              <span :class="{ active: signOutTime }">
                <img src="@/assets/img/success.png" alt="" />
                {{ signOutTime ? signOutTime + '已打卡' : '未打卡' }}
              </span>
            </li>
          </ul>
          <div
            class="sign-in-btn"
            @click="akds"
            style="
              background: #ffba31;
              color: #5d2a00;
              box-shadow: 0 0 2rem rgb(255 179 46 / 60%);
            "
          >
            <div class="sign-in-label" v-text="signInTime && !signOutTime ? '签退' : '签到'"></div>
            <div class="sign-in-time" v-text="signTime" style="font-weight: bold"></div>
          </div>
          <div class="sign-in-location">
            <img class="sign-in-location-icon" src="@/assets/img/imgsy/location.svg" alt="" />
            <div class="sign-in-location-label" v-text="location.detailAddress"></div>
            <div class="button danger" outline @click="getDetail">
              <img src="@/assets/img/refresh.png" alt="" />
              <span>刷新</span>
            </div>
          </div>
          <div style="padding-left: 1rem; line-height: 1.8rem">
            <p style="font-size: 1.3rem">特别注意:</p>
            一次签到+签退才算一次打卡记录,且打卡不能跨天<br />
            若您签到后在当天内没有签退<br />
            则在当天24点时,系统会帮你强制签退<br />
            被强制签退的打卡记录不算服务时长<br />
            <p>{{ a }}</p>
            <p>{{ b }}</p>
            <p>{{ c }}</p>
            <p>{{ d }}</p>
            <p>{{ e }}</p>
          </div>
        </div>
        <div v-if="showFeedback" class="feedback">
          <img src="@/assets/img/feedback-icon.png" alt="" v-if="signInTime || signOutTime" />
          {{ feedtxt }}
        </div>
      </PullRefresh>
    </div>
    <div id="allmap"></div>
  </div>
</template>
<script>
// import moment from "moment";
import { Dialog, Toast, PullRefresh } from 'vant'
export default {
  components: {
    Dialog,
    Toast,
    PullRefresh,
  },
  data() {
    return {
      a: '',
      b: '',
      c: '',
      d: '',
      e: '',
      truncation: 0,
      userInfo: this.$store.getters.getuserInfo,
      projectInfo: {
        albx0009: '0001',
      },
      placeFortis: [], //打卡地点信息
      albx7005: '', //打卡状态
      signInTime: '', //签到时间
      getProject: { albx0009: '0001' }, //队伍信息
      showFeedback: false, //是否显示提示框
      jointime: '', //加入项目时间

      signOutTime: '', //签退时间
      signTime: '',
      TimeAll: '',
      location: { detailAddress: '' },
      feedtxt: '', //点击打卡按钮操作之后的提示语
      signtype: 1, //1-签到，2-签退 3强制签退
      id: '',
      signInrecord: {}, //用户未签退签到记录
      issignIn: true, //是否可以进行签到操作
      isrecord: false, //用户是否存在已签到而且未签退的签到记录 true有 false没有
      isproject: true, //表示用户存在已签到而且未签退的签到记录时 该签到记录是否属于当前要签到的项目
      istoday: true, //表示用户存在已签到而且未签退的签到记录时 该签到记录时间是否和当前时间是同一天 true是 false不是
      isLoading: false,
      whether: 0, //0可以发请求,1不能
      photourl: '', //用户头像
    }
  },
  mounted() {
    this.utilscommit.requestapiwebapi('getVolunteerPhotoOnSecret', { cardno: this.userInfo.albp0005 }, (src) => {
      //查询头像
      if (src.code == 0 && src.data.photourl) {
        this.photourl = src.data.photourl
      }
    })
    // this.utilscommit.wetchat({ title: '欢迎加入中国志愿服务', desc: '“益”路有你 志愿同行', link: window.location.origin })
    window.vues = this
    this.getProjectapi()
    this.getSignTime() //获取当前时间
    this.getDetail() //百度当前定位
  },
  methods: {
    getProjectapi() {
      let data = {
        projectid: this.$route.params.id,
        volid: this.userInfo.albp0029,
        areaid: this.$route.params.aid,
      }
      this.utilscommit.requestapi('getProjectInfornationFortisH5', data, (res) => {
        if (res.code == 0) {
          this.getProject = res.data
          let item = this.getProject
          item.albx0009 = '0099'
          if (this.getProject.albx0055) {
            this.jointime = this.getProject.albx0055.substring(0, 11)
          }
          this.getDataapi() //查询志愿者今天在此项目中是否存在
        }
      })
    },
    mandatory() {
      //强制签退
      Dialog.confirm({
        title: '',
        message: '您的项目超时未签退，需要将其强制签退，才可继续签到，是否强制签退!',
      })
        .then(() => {
          //用户点击确定 执行强制签退
          // on confirm
          let tdata = {
            albx7002: this.$route.params.id, //项目id
            albx7003: this.userInfo.albp0029, //志愿者编号
            albx7005: 3, //签到类型1:签到 2：签退  3：强制签退
            albx7006: this.location.detailAddress, //签到地点
            albx7007: this.location.longitude, //签到/签退经度
            albx7008: this.location.latitude, //签到/签退纬度
            areaid: this.$route.params.aid, //项目服务区划
            username: this.userInfo.albp0052, //用户名
            groupid: this.$route.params.did, //队伍id
            albp0003: this.userInfo.albp0003, //志愿者姓名
            albx7004: this.common.getTime(), //签到签退时间
          }
          //debugger
          this.utilscommit.requestapi('getTimeSignOnOrSignOutFortisH5', tdata, function(result) {
            if (result.code == 0) {
              // _this.signInTime = _this.signTime;
              Toast.success('强制签退成功')
              location.reload() //重新刷新页面
            } else {
              Toast('操作失败')
              location.reload() ////重新刷新页面
            }
          })
        })
        .catch(() => {
          //用户点击取消 禁止用户进行签到操作
          this.issignIn = false
        })
    },
    akds() {
      if (this.truncation == 1) {
        return
      }
      this.truncation = 1
      let a = this.placeFortis //打卡地点信息
      let Distance = false

      this.placeFortis.forEach((item) => {
        var radLat1 = this.rad(item.albx5603)
        var radLat2 = this.rad(this.location.longitude)
        var a = radLat1 - radLat2
        var b = this.rad(item.albx5602) - this.rad(this.location.latitude)
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
        s = s * 6378.137 // EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000 //输出为公里

        var distance = s * 1000

        if (distance <= item.albx5605) {
          //判断是否在范围内
          Distance = true
        }
      })
      // if (this.getDistance(a.albx5603, a.albx5602, this.location.longitude, this.location.latitude, a.albx5605)) {
      if (Distance) {
        //是否在打范围内
        let tData = {
          albx7002: this.$route.params.id, //项目id
          albx7003: this.userInfo.albp0029, //志愿者编号
          albx7005: this.albx7005, //签到类型1:签到 2：签退  3：强制签退
          albx7006: this.location.detailAddress, //签到地点
          albx7007: this.location.longitude, //签到/签退经度
          albx7008: this.location.latitude, //签到/签退纬度
          areaid: this.$route.params.aid, //项目服务区划
          username: this.userInfo.albp0052, //用户名
          groupid: this.$route.params.did, //队伍id
          albp0003: this.userInfo.albp0003, //志愿者姓名
          albx7004: this.common.getTime(), //签到签退时间
        }
        console.log(tData)
        // debugger

        this.utilscommit.requestapi(
          //签到
          'getTimeSignOnOrSignOutFortisH5',
          tData,
          (src) => {
          
            // debugger
            if (src.code == 0) {
              if (this.albx7005 == 1) {
                Toast('签到成功')
                this.getProjectapi()
              } else {
                Toast('签退成功')
                this.getProjectapi()
              }
            } else {
              Toast(src.message)
              this.getProjectapi()
            }
          }
        )
      } else {
        this.truncation = 0
        Toast('不在打卡区域内')
      }
    },

    getDataapi() {
      // this.getSignTime() //获取当前时间
      this.getDetail() //百度当前定位
      let thisx = this.$route.params.id //当前项目id
      this.utilscommit.requestapi(
        //查询志愿者今天在此项目中是否存在
        'placeProjectFortisH5',
        { cardno:this.$store.getters.getuserInfo.albp0005 ,albp0029: this.userInfo.albp0029, areaid: this.$route.params.aid },
        (src) => {
        
          //debugger
          if (src.code == 0) {
            if (!src.data) {
              this.placeFortisapi(1)
              this.signInTime = ''
              //没有签到记录可以打卡
            } else {
              //debugger
              if (src.data.albx0176 == thisx) {
                //未签退在同一个项目

                var myDate = new Date()
                var atartT = src.data.albx0181.slice(0, 10).split('-')
                var a = myDate.getMonth() + 1
                var a1 = atartT[1] - 0
                var b = myDate.getDate()
                var b1 = atartT[2] - 0
                if (a != a1 || b != b1) {
                  //不在今天
                  this.mandatory() //强制签退
                } else {
                  this.signInTime = src.data.albx0181.slice(11, 19)
                  this.placeFortisapi(2) //可以签退
                }
              } else {
                //用户今天已签到过某活动且是今天签到的但不是签到的当前这个活动 提示用户需先去签退那个活动 才能继续签到其它项目
                Dialog.confirm({
                  title: '',
                  message: '您的项目' + src.data.albx0199 + '还未签退，请前往此项目签退后，再选择其他项目!',
                })
                  .then(() => {
                    this.$router.push({
                      name: 'SignInTheProjectapi',
                      params: {
                        id: src.data.albx0176,
                        aid: src.data.albx0198,
                        did: src.data.albx0177,
                      },
                    })
                    location.reload()
                  })
                  .catch(() => {
                    //用户点击取消 禁止用户进行签到操作
                    this.issignIn = false
                  })
              }
            }
          }else{  this.truncation = 0}
        }
      )
    },
    placeFortisapi(a) {
      //a=1为签到,a=2为签退
      if (a == 1) {
        this.utilscommit.requestapi(
          //获取签到距离
          'placeFortisH5',
          { type: 1, projectid: this.$route.params.id },
          (src) => {
            if (src.code == 0) {
              this.albx7005 = 1
              this.placeFortis = src.data //保存签到地点信息
                this.truncation = 0
            }
          }
        )
      } else {
        this.utilscommit.requestapi(
          //获取签到距离
          'placeFortisH5',
          { type: 2, projectid: this.$route.params.id },
          (src) => {
            if (src.code == 0) {
              this.albx7005 = 2
              this.placeFortis = src.data //保存签退地点信息
              this.truncation = 0
            }
          }
        )
      }
    },
    rad(d) {
      return (d * Math.PI) / 180.0
    },
    getDistance(lat1, lng1, lat2, lng2, juli) {
      this.a = lat1
      this.b = lng1
      this.c = lat2
      this.d = lng2
      this.e = juli
      //计算距离
      // debugger
      var radLat1 = this.rad(lat1)
      var radLat2 = this.rad(lat2)
      var a = radLat1 - radLat2
      var b = this.rad(lng1) - this.rad(lng2)
      var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)))
      s = s * 6378.137 // EARTH_RADIUS;
      s = Math.round(s * 10000) / 10000 //输出为公里

      var distance = s * 1000
      var distance_str = false
      if (distance <= juli) {
        //判断是否在范围内
        distance_str = true
      }
      return distance_str
    },
    getData() {
      this.utilscommit.request(
        'nvsi_jsProjectInfo',
        {
          id: this.$route.params.id,
          volid: this.$store.getters.getshare.loginid,
        },
        (res) => {
          if (res.code == 0 && res.data) {
            this.projectInfo = res.data

            if (this.projectInfo.albx0009) {
              if (this.projectInfo.albx0009.split(',')[1]) {
                this.projectInfo.albx0009 = this.projectInfo.albx0009.split(',')[0]
              }
            } else {
              this.projectInfo.albx0009 = '0001'
            }

            if (this.projectInfo.albx0055) {
              this.jointime = this.projectInfo.albx0055.substring(0, 11)
            }
            // this.getposition();
            this.init() //查询用户是否有该项目的签到记录
          }
        }
      )
      this.getDetail() //百度当前定位
    },
    init() {
      
      //查询用户是否有签到记录 如果有必须先签退之前已签到的项目后才能继续签到其它项目
      //this.projectInfo = JSON.parse(sessionStorage.getItem("projectInfo"));
      let data = {
        volid: this.userInfo.loginid,
      }
      //albx0176
      this.utilscommit.request('nvsi_jsGetDurationRecord', data, this.back)
    },
    back(res) {
      this.isrecord = false
      this.istoday = true
      this.isproject = true
      if (res.code == 0 && res.data) {
        //有数据 用户之前签到了某个项目 并且没有签退
        this.isrecord = true
        if (res.data.albx0176 != this.projectInfo.id) {
          //判断这条签到记录是否是该项目的
          this.isproject = false
        }
        this.signInrecord = res.data
        var myDate = new Date()
        var atartT = res.data.albx0181.slice(0, 10).split('-')
        var a = myDate.getMonth() + 1
        var a1 = atartT[1] - 0
        var b = myDate.getDate()
        var b1 = atartT[2] - 0
        if (a != a1) {
          this.istoday = false
        }
        if (b != b1) {
          this.istoday = false
        }
        // var atartT =res.data.albx0181
        // atartT=atartT.replace(/-/g,'/');
        // let arr1 = moment(new Date(atartT)).format("YYYY/MM/DD").split("/");
        // let arr2 = moment(new Date()).format("YYYY/MM/DD").split("/");
        // for (let i = 0; i <= 2; i++) {
        //   //判断该当天时间与该签到时间不在同一天
        //   if (arr1[i] != arr2[i]) {
        //     this.istoday = false;
        //   }
        // }
        if (this.isrecord && !this.istoday) {
          //如果有签到记录 并且不是今天的记录,弹出确认提示,点击确认后，此条打卡记录变为强制签退，不确认就不能进行其他操作。
          this.mandatory()
        } else if (this.isrecord && this.istoday && !this.isproject) {
          //如果有签到记录 是今天的 但不是当前项目的 禁止用户签到当前活动 直接跳转到已签到的那个项目去
          this.issignIn = false
        } else if (this.isrecord && this.istoday && this.isproject) {
          //有打卡记录 并且是今天 并且是当前项目的 将获取到的签到时间赋值渲染
          if (res.data.albx0181) {
            this.signInTime = res.data.albx0181.slice(11, 19)
          }
        }
      }
    },

    signIn() {
      // if (this.$store.getters.getuserInfo.albp0063 == 0) {
      //   //实名认证未通过
      //   Dialog.confirm({
      //     title: '',
      //     message: '您的身份实名信息认证失败请重新认证，否则无法参与相关志愿活动',
      //   }).then(() => {})
      // } else if (this.$store.getters.getuserInfo.albp0063 == 2) {
      //   //实名认证审核中
      //   Dialog.confirm({
      //     title: '',
      //     message: '您的身份实名信息已在审核中审核期间还不能参与相关志愿活动请耐心等待1-2个工作日',
      //   }).then(() => {})
      // } else if (this.$store.getters.getuserInfo.albp0063 == 1) {
      //实名认证已通过
      if (!this.issignIn) {
        if (this.isrecord && !this.istoday) {
          //用户存在需要强制签退的项目
          this.mandatory()
        } else if (this.isrecord && this.istoday && !this.isproject) {
          //用户今天已签到过某活动且是今天签到的但不是签到的当前这个活动 提示用户需先去签退那个活动 才能继续签到其它项目
          Dialog.confirm({
            title: '',
            message: '您的项目' + this.signInrecord.projectname + '还未签退，请前往此项目签退后，再选择其他项目!',
          })
            .then(() => {
              this.$router.push({
                name: 'SignInTheProject',
                params: {
                  id: this.signInrecord.albx0176,
                },
              })
              location.reload()
            })
            .catch(() => {
              //用户点击取消 禁止用户进行签到操作
              this.issignIn = false
            })
        }
      } else {
        //打卡按钮事件
        if (!this.signInTime || !this.signOutTime) {
          //判断当前项目今天是否已签到和签退
          this.signtype = !this.signInTime ? 1 : 2
          let data = {
            projectid: this.projectInfo.id,
            type: this.signtype,
          }

          if (this.$store.getters.getuserInfo.albp0020.substring(0, 2) != this.projectInfo.albx0021.substring(0, 2)) {
            //项目所在区域是否与用户的基本信息中的服务区域是否一致
            // this.showback();
            Dialog.alert({
              message: '此项目不在您的服务区域内，若要签到请先在基本信息修改你的服务区域，再进行签到操作',
            }).then(() => {})
          } else {
            this.utilscommit.request('nvsi_jsSignAddress', data, this.signInback)
          }
        } else {
          Dialog.alert({
            message: '您已经打卡过',
          }).then(() => {})
        }
      }
      // }
    },
    signInback(res) {
      if (res.code == 0 && res.data) {
        let Info = res.data
        let signSuccess = null
        for (let i = 0; i < Info.length; i++) {
          let distance = this.common.getFlatternDistance(
            this.location.latitude, //纬度
            this.location.longitude, //经度
            parseFloat(Info[i].albx5603),
            parseFloat(Info[i].albx5602)
          )
          if (distance <= Info[i].albx5605) {
            signSuccess = true
            break
          }
        }
        // if (signSuccess) {
        if (signSuccess) {
          let _this = this
          let data = {
            projectid: this.projectInfo.id,
            type: this.signtype, //1是签到 2签退
            volid: this.userInfo.loginid,
            addrerss: this.location.detailAddress,
            lnt: this.location.longitude, //经度
            lat: this.location.latitude, //纬度
            groupid: this.projectInfo.albx0011,
            nowtime: this.common.getTime(),
          }
          if (this.signtype == 2) {
            //签退
            ;(data.lbx09id = this.signInrecord.id), (data.albx0181 = this.signInrecord.albx0181)
          }

          if (this.whether == 1) {
            return
          } else {
            this.whether = 1
            this.utilscommit.request('nvsi_jsTimeSignOnOrSignOut', data, function(result) {
              _this.whether = 0

              if (result.code == 0 && result.data) {
                if (_this.signtype == 1) {
                  Toast.success('签到成功')
                  _this.init() //刷新页面，查询记录
                } else {
                  _this.signOutTime = _this.signTime
                  Toast.success('签退成功')
                }
              } else {
                // _this.feedtxt = result.message;
                Toast(result.message)
              }
            })
          }
        } else {
          Toast('不在打卡区域内')
          // this.feedtxt = "不在打卡区域内";
          //this.showback();
        }
      }
    },
    showback() {
      this.showFeedback = true
      const timer1 = setTimeout(() => {
        this.showFeedback = false
      }, 2000)
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer1)
      })
    },
    toSignInRecords() {
      this.$router.push(`/signInRecordsapi/${this.$route.params.id}/${this.$route.params.aid}`)
    },
    getSignTime() {
      //获取当前签到时间
      let time = this.common.getTime()
      this.TimeAll = time
      this.signTime = time.slice(11)
      const timer = setTimeout(() => {
        this.getSignTime()
      }, 1000)
      this.$once('hook:beforeDestroy', () => {
        clearInterval(timer)
      })
    },
  
    getDetail() {
      var geolocation = new BMapGL.Geolocation()
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var myGeo = new BMapGL.Geocoder()
          // 根据坐标得到地址描述
          myGeo.getLocation(new BMapGL.Point(r.point.lng, r.point.lat), function(result) {
            if (result) {
              vues.location = {
                detailAddress: result.address,
                latitude: r.point.lat,
                longitude: r.point.lng,
              }
            }
          })
        } else {
          alert('failed' + this.getStatus())
        }
      })
    },
    onRefresh() {
      //下拉刷新
      setTimeout(() => {
        this.isLoading = false
        this.getData()
      }, 1000)
    },
  },
}
</script>
<style lang="scss" scoped>
* {
  font-family: 微软雅黑;
}
.sign-in {
  &-panel {
    flex: 1;
    padding: 0.6rem 1.6rem;
    background: #fff;
    overflow: auto;
  }

  &-head {
    display: flex;
    align-items: center;
    padding: 1.6rem;
    padding-right: 0;
    margin-bottom: 1.6rem;

    img {
      width: 4.8rem;
      height: 4.8rem;
      margin-right: 1rem;
      object-fit: cover;
      border-radius: 50%;
    }

    h3 {
      margin: 0;
      flex: 1;
      font-weight: 900;
      font-size: 1.8rem;
      color: #333333;
    }

    .button[outline] {
      height: 3.2rem;
      padding: 0 1rem;
      font-size: 1.5rem;
      color: #108ee9;
      background: transparent;
      border: 1px solid #108ee9;
      border-radius: 1.6rem;
    }
  }

  &-info {
    display: flex;
    padding: 0;
    margin: 0;
    margin-bottom: 6rem;
    list-style: none;
    justify-content: space-between;
    font-family: 微软雅黑;

    li {
      width: 16.35rem;
      height: 8rem;
      padding: 1.5rem 0 0;
      text-align: center;
      box-shadow: 0 0 1.6rem rgba(50, 150, 250, 0.12);
      border-radius: 0.5rem;
      box-sizing: border-box;

      p {
        font-weight: 900;
        font-size: 1.6rem;
        margin: 0 0 1rem;
      }

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 1.3rem;
        color: #ffaa00;

        img {
          display: none;
          width: 1.2rem;
          margin-right: 0.5rem;
        }

        &.active {
          color: #333333;

          img {
            display: inline-block;
          }
        }
      }
    }
  }

  &-btn {
    display: flex;
    width: 12.8rem;
    height: 12.8rem;
    margin: 0 auto;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    color: #ffffff;
    background: #3296fa;
    border-radius: 50%;
    box-shadow: 0 0.5rem 1.6rem rgba(50, 150, 250, 0.4);

    .sign-in-label {
      margin-bottom: 0.6rem;
      font-weight: 900;
      font-size: 2rem;
    }

    .sign-in-time {
      font-weight: 500;
      font-size: 1.6rem;
    }
  }

  &-location {
    display: flex;
    padding: 0 1rem;
    margin-top: 3rem;
    align-items: center;

    &-icon {
      width: 1.4rem;
      height: 1.4rem;
      margin-right: 0.5rem;
    }

    &-label {
      flex: 1;
      margin-right: 1rem;
      font-weight: 500;
      font-size: 1.4rem;
      color: #333333;
    }

    .button {
      display: flex;
      align-items: center;
      height: 2.2rem;
      padding: 0 1rem;
      color: #ff0000;
      background: transparent;
      border: 1px solid #ff0000;
      box-sizing: border-box;
      border-radius: 1.1rem;

      img {
        width: 1.4rem;
        height: 1.4rem;
        margin-right: 0.3rem;
      }

      span {
        font-size: 1.2rem;
      }
    }
  }
}

.feedback {
  display: flex;
  width: auto;
  padding: 1.3rem 1.6rem;
  align-items: center;
  font-size: 1.6rem;

  img {
    width: 2.4rem;
    height: 2.4rem;
    margin-right: 1rem;
  }
}
</style>
