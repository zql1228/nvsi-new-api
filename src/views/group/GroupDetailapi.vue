<template>
  <div class="page">
    <div class="header">
      <div class="header-prefix">
        <img src="@/assets/img/back.svg" alt="" class="page-back" @click="$router.go(-1)" />
      </div>
      <h2 class="header-title">队伍详情</h2>
      <div class="header-suffix"></div>
    </div>
    <section class="section" style="margin-top: 4.4rem">
      <PullRefresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
        <div class="group-detail">
          <div class="group-detail-info">
            <h2 style="
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                width: 100%;
                padding-right: 4.5rem;
              ">
              {{ groupInfo.albe0002 }}
            </h2>
            <dl>
              <dt>正式成员</dt>
              <dd>{{ groupInfo.albe0056 || '0' }}</dd>
            </dl>
            <img v-if="groupInfo.albe0025" :src="groupInfo.albe0025" alt="" />
            <img v-else src="@/assets/img/imgsy/avatar10.svg" alt="" />
          </div>

          <div class="group-detail-location">
            <img src="@/assets/img/imgsy/location.svg" alt="" />
            <span>{{ groupInfo.albe0013 || '' }}</span>
          </div>
          <ul class="data-box">
            <li class="weilei" style="position: relative">
              <p>{{ groupInfo.pronum || '0' }}</p>
              <span>项目数量(个)</span>
            </li>
            <li>
              <p>{{ groupInfo.albe0069 || '0' }}</p>
              <span>服务时长(小时)</span>
            </li>
          </ul>
        </div>
        <div class="project-panel type2">
          <div class="project-panel-head flex-h">
            <a class="flex-1 flex-h v-m t-lr" @click="$router.push(`/group-infoapi/${$route.params.id}/${$route.params.aid}`)">
              <img class="text-title-img" src="@/assets/img/imgsy/text-title2.png" alt="" />
              <img src="@/assets/img/imgsy/cell-rightx.svg" alt="" />
            </a>
          </div>
          <div class="project-panel-content">
            <p style="
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                width: 100%;
              ">
              {{ groupInfo.albe0032 || '暂无' }}
            </p>
          </div>
        </div>
        <div class="project-panel mt-20 type2">
          <div class="project-panel-head flex-h">
            <a class="flex-1 flex-h v-m t-lr" @click="$router.push(`/group-projectapi/${$route.params.id}/${$route.params.aid}`)">
              <img class="text-title-img" src="@/assets/img/imgsy/text-title3.png" alt="" />
              <img src="@/assets/img/imgsy/cell-rightx.svg" alt="" />
            </a>
          </div>
          <div class="project-panel-content">
            <ul class="project-list type4 mt-10" v-show="isactive">
              <li class="project-item" v-for="(item, index) in activelist" :key="index" @click="$router.push(`/volunteerProject1api/${item.id}/${item.albx0021}`)">
                <div class="project-item-cover">
                  <!-- <img
                    v-if="item.prophoto"
                    :src="common.context() + item.prophoto"
                    @error="common.imgError($event, require('@/assets/img/imgsy/img27.png'))"
                    alt=""
                  /> -->
                  <img v-if="item.fileid" :src="item.fileid" alt="" />
                  <img v-else :src="require('@/assets/img/imgsz/albx' + '0020' + '.png')" alt="" />
                  <span style="
                      height: 1.5rem;
                      position: absolute;
                      top: 0;
                      left: 0;
                      padding: 0 0.5rem;
                      line-height: 1.5rem;
                      text-align: center;
                      font-weight: bold;
                      font-size: 1rem;
                      color: #fff;
                      border-radius: 0.4rem 0 0.4rem 0;
                      background: #0db40b;
                    ">运行中</span>
                  <div class="project-item-cover-title">
                    {{ item.albx0012 }}
                  </div>
                </div>
                <div class="project-item-main">
                  <a href="javascript:void(0);" class="project-item-title">{{ item.albx0002 }}</a>
                  <ul class="project-item-info">
                    <li>{{ item.albx0016 }}/{{ item.albx0044 }}人</li>
                    <li>{{ item.createtime.substring(0, 11) }}</li>
                  </ul>
                </div>
              </li>
            </ul>
            <div v-show="!isactive" style="
                width: 100%;
                color: #999;
                font-weight: bolder;
                text-align: center;
              ">
              队伍还没有项目
            </div>
          </div>
        </div>
      </PullRefresh>
    </section>
    <footer v-if="this.button_text != '重新报名'" class="footer" bg="white" style="display: flex;">
      <button href="javascript:;" class="button danger-gradient" type="info" span="24" @click="joinTeam" style="width: 100%; margin: 1rem; margin-bottom: 1.1rem" :class="anys">
        {{ button_text }}
      </button>
    </footer>
    <footer v-if="this.button_text == '重新报名'" class="footer" bg="white" style="display: flex;">
      <button href="javascript:;" class="button danger-gradient" type="info" span="24" @click="joinTeam" style="width: 100%; margin: 1rem; margin-bottom: 1.1rem;" :class="anys">
        未通过,重新报名
      </button>
      <!-- <button
        v-if="1"
        href="javascript:;"
        class="button danger-gradient"
        type="info"
        span="24"
        @click="joinTeam(5)"
        style="width: 100%; margin:1rem; margin-bottom: 1.1rem;font-size: 1.6rem;"
        :class="anys"
      >
        删除记录
      </button> -->
    </footer>
    <van-dialog title="免审验证" v-model="show" show-cancel-button @confirm="confirm" @cancel="cancel" :before-close="onBeforeclose">
      <Field v-show="type == 2" type="text" placeholder="请输入免审密码" v-model="password" autocomplete="off" />
      <span style="color: red">{{ password_span }}</span>
    </van-dialog>
  </div>
</template>
<script>
import { Dialog, Field, PullRefresh, Toast } from 'vant'
export default {
  components: {
    [Dialog.Component.name]: Dialog.Component,
    Field,
    PullRefresh,
    Toast,
  },
  data() {
    return {
      getuserInfo: this.$store.getters.getuserInfo, //用户信息
      login: this.$store.getters.getLoginStatus, //是否登录
      groupInfo: {}, //团队详情信息

      inType: '', //用户与当前队伍关系 1正式成员 2申请加入 3申请被拒绝 4脱离
      button_text: '', //button按钮显示文本
      isbutton: true, //button按钮是否禁用
      show: false, //弹窗控制变量 true打卡 false关闭
      password: '', //免审密码
      password_span: '', //免审密码校验提示
      status: 0, //0:加入,1脱离,2取消申请,3再次提交
      statusx: '', //等于5时为删除记录
      activelist: '', //当前队伍是否有志愿项目列表
      isactive: true, //当前队伍是否有志愿项目 true有 false没有
      buineseid: '',
      type: '', //1直接发请求加入队伍 2.弹窗填写验证密码确认非空后发请求加入队伍 3.弹窗提示确认后申请脱离或取消报名
      isLoading: false,
      anys: '', //按钮样式
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      //group-detail/b91c2ae0e1b6480cae6f6da7b7e9b334
      let data = {
        id: this.$route.params.id, //队伍id
        areaId: this.$route.params.aid, //队伍区域id
        albe0133: this.getuserInfo.albp0029, //用户id
      }
      // if (this.$store.getters.getshare.loginid) {
      //   data.volid = this.$store.getters.getshare.loginid
      // }
      // this.utilscommit.request('nvsi_jsGetBasicInfo', data, this.back) //获取队伍详情 用户和队伍的关系
      this.utilscommit.requestapi('getGroupInfoH5', data, this.back)
      this.utilscommit.requestapi(
        //获取服务对象
        'listProjectsFortisH5',
        {
          teamId: this.$route.params.id,
          albx0021: this.$route.params.aid,
          albx0072: '4',
          pageNum: 1, //请求的页码
          pageSize: 3, //每页多少条
        },
        (src) => {
          //  debugger
          if (src.code == 0) {
            this.activelist = src.data
            this.isactive = true
          } else {
            this.isactive = false
          }

          console.log(src)
        }
      )
      // this.utilscommit.request('nvsi_jsGetGroProject', { groupid: this.$route.params.id, pageNow: '1', pageSize: '3' }, (res) => {
      //   //获取队伍活动
      //   if (res.code && res.data && res.data.result) {
      //     this.isactive = true
      //     this.activelist = res.data.result
      //   } else {
      //     this.isactive = false
      //   }
      // })
    },
    back(res) {
      //团体详情返回结果
      if (res.data) {
        // this.utilscommit.wetchat({ title: res.data.albe0002, desc: '志愿服务奉献爱，温暖行动一起来', link: window.location.href })

        this.groupInfo = res.data //队伍数据
        //debugger
        this.inType = res.data.albe0134 //用户与当前队伍关系 1正式成员 2申请加入 3申请被拒绝 4脱离
        this.buineseid = res.data.buineseid
        this.type = 1
        this.isbutton = true
        this.button_text = '加入队伍'
        if (this.inType == 1) {
          //用户为当前队伍的正式成员   点击按钮 弹窗"是否确认脱离队伍"  确认则发请求脱离队伍
          this.button_text = '脱离队伍'
          this.status = 1
          this.type = 3
        } else if (this.inType == 2) {
          //申请加入(审核中)      点击按钮 弹窗"报名审核中，是否确认取消报名" 确认则发请求取消报名
          this.button_text = '取消报名'
          this.status = 2
          this.type = 3
        } else if (this.inType == 3) {
          //申请被拒绝
          if (res.data.albe0028 == 1) {
            //队伍加入方式为 验证信息加入 点击按钮发请求加入队伍 重新报名
            this.button_text = '重新报名'
            this.status = 3
            this.type = 1
          } else if (res.data.albe0028 == 2) {
            //允许实名志愿者加入 点击按钮发请求加入队伍 重新报名
            this.status = 3
            this.button_text = '重新报名'
            this.type = 1
          } else if (res.data.albe0028 == 3) {
            //拒绝任何人加入 按钮禁用
            this.button_text = '此队伍不对外招募'
            this.anys = 'anys'
            this.isbutton = false
          } else if (res.data.albe0028 == 4) {
            //免审加入 点击按钮弹窗填写免审密码，点击确认验证密码非空后发请求加入队伍 重新报名
            this.button_text = '重新报名'
            this.status = 3
            this.type = 2
          }
        }
        // else if (this.inType == 4) {
        //   //用户曾经加入后来脱离了
        //   if (res.data.albe0028 == 1) {
        //     //队伍加入方式为 验证信息加入 点击按钮发请求加入队伍
        //     this.button_text = '加入队伍'
        //     this.status = 0
        //     this.type = 1
        //   } else if (res.data.albe0028 == 2) {
        //     //允许实名志愿者加入 点击按钮发请求加入队伍
        //     this.button_text = '加入队伍'
        //     this.status = 0
        //     this.type = 1
        //   } else if (res.data.albe0028 == 3) {
        //     //拒绝任何人加入 按钮禁用
        //     this.button_text = '此队伍不对外招募'
        //     this.anys = 'anys'
        //     this.isbutton = false
        //   } else if (res.data.albe0028 == 4) {
        //     //免审加入 点击按钮弹窗填写免审密码，点击确认验证密码非空后发请求加入队伍
        //     this.button_text = '加入队伍'
        //     this.status = 0
        //     this.type = 2
        //   }
        // }
        else if (this.inType == 4) {
          //没关系
          if (res.data.albe0028 == 1) {
            //队伍加入方式为 验证信息加入 点击按钮发请求加入队伍
            this.button_text = '加入队伍'
            this.status = 0
            this.type = 1
          } else if (res.data.albe0028 == 2) {
            //允许实名志愿者加入 点击按钮发请求加入队伍
            this.button_text = '加入队伍'
            this.status = 0
            this.type = 1
          } else if (res.data.albe0028 == 3) {
            //拒绝任何人加入 按钮禁用
            this.button_text = '此队伍不对外招募'
            this.anys = 'anys'
            this.isbutton = false
          } else if (res.data.albe0028 == 4) {
            //免审加入 填写免审密码 点击按钮弹窗填写免审密码，点击确认验证密码非空后发请求加入队伍
            this.button_text = '加入队伍'
            this.status = 0
            this.type = 2
          }
        }
      }
    },
    divorced1(a) {
      //退出项目弹窗
      Dialog.confirm({
        title: a,
      })
        .then(() => {
          this.$router.push({ path: '/basicapi' })
        })
        .catch(() => {
          // on cancel
        })
    },
    joinTeam(a) {
      // debugger
      if (a == 5) {
        this.statusx = 5
      }
      //按钮事件 albe0009
      //判断用户是否登录
      if (this.$store.getters.getLoginStatus) {
        if (this.type == 1 && this.$store.getters.getuserInfo.albp0020.slice(0, 2) != this.groupInfo.albe0012.slice(0, 2)) {
          this.divorced1('  此项目不在您的服务区域内 ，若要报名请先在基本信息修改你的服务区域，再进行报名')
          return
        }
        if (this.$store.getters.getuserInfo.albp0063 == 0) {
          //实名认证未通过
          Dialog.confirm({
            title: '',
            message: '您的身份实名信息认证失败请重新认证，否则无法参与相关志愿活动',
          }).then(() => {})
        } else if (this.$store.getters.getuserInfo.albp0063 == 2) {
          //实名认证审核中
          Dialog.confirm({
            title: '',
            message: '您的身份实名信息已在审核中审核期间还不能参与相关志愿活动请耐心等待1-2个工作日',
          }).then(() => {})
        } else if (this.$store.getters.getuserInfo.albp0063 == 1) {
          if (this.isbutton) {
            //项目是否对外招聘
            if (this.type == 1) {
              //1直接发请求加入队伍 2.弹窗填写验证密码确认非空后发请求加入队伍 3.弹窗提示确认后申请脱离或取消报名
              this.joinTeamRequest()
            } else if (this.type == 2) {
              this.show = true
            } else if (this.type == 3) {
              if (this.button_text == '脱离队伍') {
                Dialog.confirm({
                  title: '',
                  message: '是否确认脱离队伍',
                })
                  .then(() => {
                    //点击确认
                    this.joinTeamRequestx()
                  })
                  .catch(() => {
                    //取消
                  })
              } else {
                Dialog.confirm({
                  title: '',
                  message: '报名审核中，是否确认取消报名',
                })
                  .then(() => {
                    //点击确认
                    this.joinTeamRequesty()
                  })
                  .catch(() => {
                    //取消
                  })
              }
            }
          }
        } else {
          //实名认证审核中
          Dialog.confirm({
            title: '',
            message: '您的身份实名信息已在审核中审核期间还不能参与相关志愿活动请耐心等待1-2个工作日',
          }).then(() => {})
        }
      } else {
        //未登录
        Toast('您还没有登录，无法进行当前操作!')
        this.$router.push('/')
      }
    },
    confirm() {
      //免审密码弹窗 确定按钮事件
    },
    cancel() {
      this.password = ''
      this.password_span = ''
    },
    onBeforeclose(action, done) {
      if (action === 'confirm') {
        this.password_span = ''
        if (!this.password) {
          this.password_span = '请填写免审密码'

          return done(false)
        } else if (this.password != this.groupInfo.albe0029) {
          this.password_span = '密码错误无法加入'
          this.password = ''
          return done(false)
        } else {
          this.joinTeamRequest()
          return done()
        }
      } else {
        return done()
      }
    },
    joinTeamRequestx() {
      //脱离队伍
      let params = {
        albp0029: this.getuserInfo.albp0029, //志愿者编号
        id: this.$route.params.id, //队伍id
        albe0012: this.groupInfo.albe0012, //队伍服务区域
        albp0020: this.getuserInfo.albp0020, //志愿者服务区域
        albp0005:this.getuserInfo.albp0005, //志愿者身份证号
      }
      //debugger
      this.utilscommit.requestapi('volBreakawayTeamH5', params, this.joinTeamBack)
    },
    joinTeamRequesty() {
      //取消申请
      let params = {
        albp3310: this.getuserInfo.albp0005, //志愿者身份证号
        albp3311: this.groupInfo.albe0012, //队伍服务区域
        albp3309: this.$route.params.id, //队伍编号
      }
      //debugger
      this.utilscommit.requestapi('volDeleteTeamApplyH5', params, this.joinTeamBack)
    },

    joinTeamRequest() {
      //加入团体请求
      // //debugger
      if (this.statusx == 5) {
        this.status = 5
      }

      let params = {
        albp3302: this.getuserInfo.albp0003, //志愿者姓名albp0003
        albp3303: this.getuserInfo.albp0020, //志愿者服务区域albp0020
        albp3304: this.getuserInfo.albp0089, //志愿者服务时长 albp0089
        albp3310: this.getuserInfo.albp0005, //志愿者身份证号albp0005
        albp0010: this.getuserInfo.albp0010, //志愿者手机号albp0010
        albp0006: this.getuserInfo.albp0006, //志愿者性别albp006
        albe0133: this.getuserInfo.albp0029, //志愿者编号 albp0029
        albp3306: this.groupInfo.albe0019, //队伍联系方式 albe0019
        albp3308: this.groupInfo.albe0002, //队伍名称 albe0002
        albp3309: this.$route.params.id, //队伍id
        albp3311: this.groupInfo.albe0012, //队伍服务区域 albe0012
      }
      if (this.password) {
        params.albe0029 = this.password
      }
      // let paramsx = {
      //   albp3302: '黄俊',
      //   albp3303: '110000000000000000', //志愿者服务区域albp0020
      //   albp3304: '0', //志愿者服务时长 albp0089
      //   albp3306: '17348523698', //队伍联系方式 albe0019
      //   albp3308: 'IG青训二队', //队伍名称 albe0002
      //   albp3309: 'b91c2ae0e1b6480cae6f6da7b7e9b334', //队伍id
      //   albp3310: '**************7446', //志愿者身份证号albp0010
      //   albp3311: '110101000000000000', //队伍服务区域 albe0012
      //   albe0133: 'V1100002201000024X              ', //志愿者编号 albp0029
      //   albp0010: '173****1734', //志愿者手机号albp0010
      //   albp0006: '2', //志愿者性别albp006
      // }
      // let paramsy = {
      //   //本地账号
      //   albp3302: '闵畅', //志愿者姓名albp0003
      //   albp3303: '420000000000000000', //志愿者服务区域albp0020
      //   albp3304: '0', //志愿者服务时长 albp0089
      //   albp3306: '17348523698', //队伍联系方式 albe0019
      //   albp3308: 'IG青训二队', //队伍名称 albe0002
      //   albp3309: 'b91c2ae0e1b6480cae6f6da7b7e9b334', //队伍id
      //   albp3310: 'FiIGGt3UHbhoIPOfLRCUwiK+kSCFsghGx0jr28nTj7U=', //志愿者身份证号albp0010
      //   albp3311: '110101000000000000', //队伍服务区域 albe0012
      //   albe0133: 'V4200002201000007K              ', //志愿者编号 albp0029
      //   albp0010: '135****4896', //志愿者手机号albp0010
      //   albp0006: '1', //志愿者性别albp006
      // }

      // if (this.groupInfo.albe0028 == 4 || this.groupInfo.albe0028 == 2) {
      //   //队伍加入方式为实名认证免审加入时
      //   params.albe0134 = 1
      // } else {
      //   params.albe0134 = 0
      // }
      //debugger
      console.log(params)

      this.utilscommit.requestapi('volApplyTeamH5', params, this.joinTeamBack)
    },
    joinTeamBack(res) {
      this.show = false //关闭验证密码弹窗
      //加入团体请求返回结果
      this.password = '' //清空免审密码
      this.password_span = '' //清空提示
      //debugger
      if (res.code == 0) {
        Toast(
          res.message
          // this.status == 1
          //   ? "成功脱离队伍"
          //   : this.status == 2
          //   ? "成功取消申请"
          //   : "成功发送加入申请"
        ),
          this.getData() //重新获取数据
      } else {
        Toast(
          // this.status == 1
          //   ? "脱离队伍失败"
          //   : this.status == 2
          //   ? "取消申请失败"
          //   : "加入申请发送失败"
          res.message
        )
      }
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
<style scoped>
.weilei::after {
  content: "";
  position: absolute;
  right: -0.15rem;
  width: 0.05rem;
  height: 8rem;
  background: rgba(0, 0, 0, 0.05);
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.group-detail-info img {
  border-radius: 5rem;
}
.button.anys {
  background: darkgray !important;
}
</style>
