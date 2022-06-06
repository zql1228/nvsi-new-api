<template>
  <div class="page">
    <div class="flex-h v-m plr-40 ptb-24 t-lr bg-white">
      <a href="javascript:void(0);" class="home-logo">
        <img src="@/assets/img/imgsy/home-logo1.png" alt="" />
      </a>
      <div class="select-box" @click="selectItemShow('place')">
        <span id="area-select">{{ regPlace }}</span>
        <img class="select-box-icon" src="@/assets/img/imgsy/arrow-down-black.svg" alt="" />
      </div>
    </div>
    <section class="section">
      <div class="bg-white plr-40 pb-40">
        <!-- <swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <swipe-item><img style="width:100%;" src="@/assets/img/imgsy/banner2.png" alt=""/></swipe-item>
        </swipe> -->
        <!-- 如果此处是轮播，则只需启用最下方注释掉的轮播初始化代码 -->
        <div class="swiper slide-news type2">
          <div class="swiper-wrapper" @click="hytz">
            <!-- 如果是多项轮播，则复制多个以下swiper-slide结构 -->
            <div class="swiper-slide slide-news-item">
              <a href="javascript:void(0);">
                <img src="@/assets/img/imgsy/hangyebiaozhun.jpg" alt="" />
              </a>
            </div>
          </div>
        </div>
        <ul class="menu type2">
          <li class="menu-item">
            <a href="javascript:void(0);" class="menu-item-wrap" @click="$router.push('/volunteerProjectapi')">
              <img src="@/assets/img/imgsy/menu1x.png" alt="" />
              <span style="font-size:1.1rem;">志愿项目</span>
            </a>
          </li>
          <li class="menu-item">
            <a href="javascript:void(0);" class="menu-item-wrap" @click="$router.push('/groupapi')">
              <img src="@/assets/img/imgsy/menu2x.png" alt="" />
              <span style="font-size:1.1rem;">志愿队伍</span>
            </a>
          </li>
          <li class="menu-item">
            <a href="javascript:void(0);" class="menu-item-wrap" @click="commonRouter.todemeanorlist()">
              <img src="@/assets/img/imgsy/menu3x.png" alt="" />
              <span style="font-size:1.1rem;">志愿风采</span>
            </a>
          </li>
          <li class="menu-item">
            <a href="javascript:void(0);" class="menu-item-wrap" @click="toVolreg()">
              <img src="@/assets/img/imgsy/menu4x.png" alt="" />
              <span style="font-size:1.1rem;">成为志愿者</span>
            </a>
          </li>
        </ul>
        <div style="
            border-radius: 0.3rem;
            display: flex;
            align-items: center;
            background-color: #fffbe8;
             padding: 0.5rem 2rem 0.5rem 0;
          ">
          <img style="margin-left: 1.2em" class="notification-icon" src="@/assets/img/imgsy/icon12.svg" alt="" />
          <div style="width: 95%; border-radius: 0.3rem;padding: 0.5rem 0;">
            <div id="test">
              <div id="test1">
                <div @click="toOrderDetail(itrm.id)" v-for="(itrm, i) in information.newslist" :key="i">{{ itrm.title }}</div>
              </div>
              <div id="test2"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white mt-20 pt-30 plr-40 pb-40">
        <h2 class="text-title mb-30"><img src="@/assets/img/imgsy/text-title.svg" alt="" />精选项目</h2>
        <ul class="project-list type2">
          <li @click="tovolProject(itrm.id, itrm.albx0021)" class="project-item" v-for="(itrm, i) in activitylist" :key="i">
            <div class="project-item-cover">
              <img v-if="itrm.fileid" :src="itrm.fileid" alt="" />
              <img v-else :src="require('@/assets/img/imgsz/albx' + '0020' + '.png')" alt="" />
              <div class="project-item-tag success">
                {{ itrm.albx0072 == 3 ? '待启动' : itrm.albx0072 == 4 ? '运行中' : itrm.albx0072 == 5 ? '已结项' : '' }}
              </div>
              <div class="project-item-cover-title">
                {{ itrm.albx0003 }}
              </div>
            </div>
            <div class="project-item-main">
              <a href="javascript:void(0)" class="project-item-title">{{ itrm.albx0002 }}</a>
              <ul class="project-item-info">
                <li>{{ itrm.albx0016 }}/{{ itrm.albx0044 }}人</li>
                <li>{{ itrm.albx0031 ? itrm.albx0031.slice(0, 10) : '' }}</li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </section>
    <footer class="footer">
      <div class="tabbar type2">
        <a href="javascript:void(0);" class="tabbar-item active">
          <img src="@/assets/img/imgsy/tabbar1.svg" alt="" />
          <img src="@/assets/img/imgsy/tabbar1-active.svg" alt="" />
          <span>首页</span>
        </a>
        <a href="javascript:void(0);" class="tabbar-item center" @click="SignInTheProjec()">
          <img src="@/assets/img/imgsy/tabbar-center.svg" alt="" />
          <img src="@/assets/img/imgsy/tabbar-center-active.svg" alt="" />
          <span>签到</span>
        </a>
        <a href="javascript:void(0);" class="tabbar-item" @click="Center()">
          <img src="@/assets/img/imgsy/tabbar3.svg" alt="" />
          <img src="@/assets/img/imgsy/tabbar3-active.svg" alt="" />
          <span>我的</span>
        </a>
      </div>
    </footer>
    <div class="select-mask" :class="{ show: isShow }"></div>
    <div class="select-wrap flex-v" :class="{ show: isShow }">
      <div class="select-wrap-header flex-h v-m t-lr">
        <span @click="SelectNotShow('del')">取消</span>

        <span style="color: #db0000" @click="SelectNotShow('select')">确定</span>
      </div>
      <!-- 证件类别下拉框 -->

      <ul class="flex-v flex-1 select-wrap-item" style="overflow: auto" v-if="showitems == 1">
        <li v-for="(item, index) in regioninfo" :key="index" class="flex-h v-m t-c" :class="{ active: index == current }"
          @click="isItemActive(index, item.provincename, item.areaid)">
          {{ item.provincename }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
// import '@/assets/js/wetchat.js'
import { NoticeBar, Swipe, SwipeItem, Dialog } from 'vant'

export default {
  components: { NoticeBar, Swipe, SwipeItem, Dialog },
  data() {
    return {
      timer: null,
      isShow: false,
      showitems: 0,
      type: '', //下拉选择框类型

      regioninfo: [],
      current: -1,
      information: {}, //站点所有信息
      activitylist: '', //精选项目
      regPlace: '全国', //实际的区域名称
      regid: '100000000000000000', //选择的区域id
      select: '', //选择的区域名称
      regidt: '100000000000000000', //选择的区域id
    }
  },
  created() {
    // if (!this.$store.getters.getLoginStatus) {//getCookie保持登录状态
    //   this.getCookie()
    // } else {
    //   this.first()
    // }
   
  },
  mounted() {
     this.first()
    this.gd()
    // this.utilscommit.wetchat({ title: '欢迎加入中国志愿服务', desc: '“益”路有你 志愿同行', link: window.location.href })
    // this.utilscommit.request('nvsi_jsGetAreaList', {}, this.callback1) /* 区域选择框 */
    // this.utilscommit.requestapi('areaTreeFortisH5', {}, this.callback1) /* 区域选择框 */
    this.sessionStorage.getCodeValueH5("areaTree",'areaTreeFortisH5',{},this.callback1)
    this.prompt() //判断服务区域是否是区县级,已经信息是否完整
  },
  beforeDestroy() {
    clearInterval(this.timer) // 清除定时器
    this.timer = null
  },
  methods: {
    hytz() {
      window.location.href = 'http://yjzj.mca.gov.cn:8280/consult/noticedetail.do?noticeid=98'
    },
    prompt() {
      if (this.$store.getters.getLoginStatus) {
        let a = this.$store.getters.getuserInfo
        if (a.albp0020 && a.albp0021 && a.albp0028 && a.albp0039) {
          if (a.albp0020.slice(4, 6) == '00') {
            Dialog.alert({
              title: '温馨提示',
              width: '27rem',
              message: '为了便于您参与志愿服务,请完善您的服务区域和现居区域到区县级',
            }).then(() => {
              this.$router.push({ name: 'Basicapi' })
            })
          }
        } else {
          Dialog.confirm({
            confirmButtonText: '完善信息',
            width: '27rem',
            title: '温馨提示',
            message: '您的基本信息有缺失,无法进行报名,签到等志愿活动,是否前往填写信息(补充必填信息即可)',
          })
            .then(() => {
              this.$router.push({ name: 'Basicapi' })
            })
            .catch(() => {})
        }
      }
    },
    gd() {
      this.timer = setInterval(this.move1, 80)
    },
    move1() {
      var test1 = document.getElementById('test1')
      var test2 = document.getElementById('test2')
      test2.innerHTML = test1.innerHTML
      var test = document.getElementById('test')
      if (test.scrollTop >= test1.offsetHeight) {
        test.scrollTop = 0
      } else {
        test.scrollTop = test.scrollTop + 1
      }
    },
    tovolProject(a, b) {
      this.$router.push({ name: 'volunteerProject1api', params: { id: a, aid: b } })
    },
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split('; ') //因为是数组所以要切割。打印看一下就知道了
        // console.log(arr,"切割");
        let username = ''
        let password = ''
        let loginid = ''
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split('=') // 再次切割
          // console.log(arr2,"切割2");
          // // 判断查找相对应的值
          if (arr2[0] === 'username') {
            username = arr2[1]
            console.log(arr2[1]) // 转存一份保存用户名和密码
          } else if (arr2[0] === 'password') {
            password = arr2[1]

            //可解密
          } else if (arr2[0] === 'loginid') {
            loginid = arr2[1]
          }
        }
        if (password && username && loginid) {
          this.utilscommit.request(
            'nvsi_jsLoginVol',
            {
              username: username,
              password: password,
            },
            (result) => {
              if (result.data) {
                this.$store.commit('changeLoginStatus', true)
                result.data.idcard = result.data.idcard
                result.data.loginid = result.dataid
                result.data.albp0056 = result.data.albp0056
                this.$store.commit('changeshares', {
                  idcard: result.data.idcard,
                  loginid: result.data.id,
                  albp0056: result.data.albp0056,
                })
              }
            }
          )

          this.utilscommit.request('nvsi_jsGetUSerInfo', { albp0031: loginid }, (result) => {
            if (result.data) {
              this.$store.commit('changeuserInfo', result.data)

              this.$store.commit('changeregion', {
                raid: result.data.albp0020.slice(0, 2) + '0000000000000000',
              })
              this.first()
            } else {
              this.$store.commit('changeLoginStatus', false)
            }
          })
        } else {
          this.first()
        }
      } else {
        this.first()
      }
    },
    setCookie(username, password, exdays) {
      var exdate = new Date() // 获取当前登录的时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays) // 将当前登录的时间加上七天，就是cookie过期的时间，也就是保存的天数
      // 字符串拼接cookie,因为cookie存储的形式是name=value的形式
      window.document.cookie = 'userName' + '=' + username + ';path=/;expires=' + exdate.toGMTString()
      window.document.cookie = 'userPwd' + '=' + password + ';path=/;expires=' + exdate.toGMTString()
    },

    toVolreg() {
      if (this.$store.getters.getLoginStatus) {
        //是否登录
        Dialog.alert({
          message: '您已成为志愿者',
          theme: 'round-button',
        }).then(() => {
          // on close
        })
      } else {
        this.$router.push({ name: 'IndividualRegistrationapi' }) //跳转
      }
    },
    first() {
         var searchURL = window.location.search
      if (this.$store.getters.getregion.raid &&  !searchURL) {
        this.regid = this.$store.getters.getregion.raid.slice(0, 2) + '0000000000000000'
        // this.utilscommit.request(
        //   'nvsi_jsGetAreaNameById',
        //   {
        //     areaid: this.regid,
        //   },
        //   this.callback7
        // )
        this.utilscommit.requestapi('areaTreeFortisH5', { areaid: this.regid }, this.callback7)
      } else {
        //当未登录或者用户没有服务区域时
     
         
    if(searchURL){
      
      searchURL = searchURL.substring(1, searchURL.length)
      this.regid= searchURL.split('&')[0].split('=')[1]
      this.regPlace=decodeURIComponent(searchURL.split('&')[1].split('=')[1]) 
       var url=window.location.href;                    //获取当前页面的url
        if(url.indexOf("?")!=-1){                        //判断是否存在参数
            url = url.replace(/(\?|#)[^'"]*/, '');           //去除参数
            window.history.pushState({},0,url);
        }
    }

        this.$store.commit('changeregion', {
          raid: this.regid,
          regPlace: this.regPlace,
        }) //存默认regid和地区名
      }
      // this.utilscommit.request('nvsi_jsPrimaryPage', { areaid: this.regid }, this.provincesBack)//旧新闻接口
      this.utilscommit.requestapix('getH5HomePageInfo', { name: 'H5' }, this.provincesBack)

      this.utilscommit.requestapi(
        //获取服务对象
        'listProjectsFortisH5',
        {
          pageNum: 1,
          pageSize: 6,
          albx0037: 1,
          albx0072: 4,
          albx0021: this.regid,
          code: '4',
        },
        (src) => {
          if (src.code == 0) {
            this.activitylist = src.data
          }
        }
      )
    },
    callback7(src) {
      if (src && src.code == 0) {
        this.regPlace = src.data.area
        this.$store.commit('changeregion', {
          raid: this.regid,
          regPlace: this.regPlace,
        }) //存用户所在的regid和地区名
      }
    },
    Center() {
      //跳转到个人中心
      if (this.$store.getters.getLoginStatus) {
        this.$router.push({ path: '/centerapi' })
      } else {
        this.$router.push({ path: '/loginapi' })
      }
    },
    SignInTheProjec() {
      //跳转到签到
      if (this.$store.getters.getLoginStatus) {
        this.$router.push({ path: '/signInProjectsapi' })
      } else {
        this.$router.push({ path: '/loginapi' })
      }
    },
    toOrderDetail(res) {
      //跳转文章详情
      let orderUuid = res
      Vue.$router.push({ name: 'demeanordetails', params: { id: orderUuid } })
    },
    // city() {
    //   //定义获取城市方法
    //   const geolocation = new BMap.Geolocation();
    //   var _this = this;
    //   geolocation.getCurrentPosition(
    //     function getinfo(position) {
    //       console.log(position)
    //       let city = position.address.city; //获取城市信息
    //       let province = position.address.province; //获取省份信息
    //       _this.LocationProvince = province;
    //       _this.LocationCity = city;
    //     },
    //     function (e) {
    //       _this.LocationCity = "定位失败";
    //     },
    //     { provider: "baidu" }
    //   );
    // },
    provincesBack(res) {
      //取出页面信息
      //console.log(res);
      if (res && res.data && res.code == 0) {
        // if (res.data.projectlist.code != 0) {
        //   res.data.projectlist.data = []
        // }
        this.information = res.data
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
        if(this.regidt!="420000000000000000"){
          //清理缓存
          this.$store.commit('changeLoginStatus', false)
          this.$store.commit('changeuserInfo', '')
          this.$store.commit('changeregion', '')
          this.$store.commit('changelogin', '')
          this.$store.commit('changeuserInfo', '')
        let  Jurl=`/nvsih5/?raid=${this.regidt}&regPlace=${this.select}`
          if (window.location.host == "wuhan.yxybb.com") {
          //测试
          window.open("https://wuhan.yxybb.com" + Jurl);
        } else {
          //生产
          window.open(
            "https://chinavolunteer.mca.gov.cn" + Jurl
          );
        }
          return
        }

        this.regPlace = this.select
        this.regid = this.regidt

        // if(this.regid=="100000000000000000"){
        //   this.regid="110000000000000000"
        // }
        this.$store.commit('changeregion', {
          raid: this.regid,
          regPlace: this.regPlace,
        }) //存切换服务区域后
        // this.utilscommit.request('nvsi_jsPrimaryPage', { areaid: this.regid }, this.provincesBack)
        this.utilscommit.requestapix('getH5HomePageInfo', { resourcecode: '0036' }, this.provincesBack)
        this.utilscommit.requestapi(
          //获取服务对象
          'listProjectsFortisH5',
          {
            pageNum: 1,
            pageSize: 6,
            albx0037: 1,
            albx0072: 4,
            albx0021: this.regid,
            code: '4',
          },
          (src) => {
            if (src.code == 0) {
              this.activitylist = src.data
            }
            console.log(src)
          }
        )
      }
    },
    isItemActive(index, type, id) {
      this.current = index
      this.select = type
      this.regidt = id
    },
    callback1(res) {
      //区域选择框
      // console.log(res,"ll")
     
        if (res) {
          let regioninfo = []
          for (let i = 0; i < res.child.length; i++) {
            if (res.child[i].areaid != '000000000000000000') {
              //排除全国
              regioninfo.push(res.child[i])
            }
          }

          this.regioninfo = regioninfo
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
      // this.current = 0;
      if (this.type == 'place') {
        this.showitems = 1
        this.select = this.regioninfo.provincename
      }
    },
  },
}
</script>
<style scoped>
#test {
  font-size: 1.4rem;
  width: 100%;
  height: 1.6rem;
  overflow: hidden;
  color: #f04b00;
}
#test > div > div {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-top: 1rem;
  padding-right: 1rem;
}
.select-wrap-item li.active {
  color: #db0000;
  font-size: 1.6rem;
}
.project-item-tag {
  width: 5rem;
}
.notice-swipe {
  height: 1.6rem;
  line-height: 1.6rem;
  text-align: top;
}
</style>
