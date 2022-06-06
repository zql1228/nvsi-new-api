<template>
  <div class="page" v-if="ShowPage">
    <header class="header" style="z-index: 1">
      <div class="header-prefix">
        <a class="flex-h v-m" href="javascript:void(0);" @click="$router.go(-1)">
          <img style="margin-right: 0.5rem" src="@/assets/img/back.svg" alt="" class="page-back" />
        </a>
      </div>
      <h1 class="header-title" style="text-align: left; padding-left: 3rem">
        项目详情
      </h1>
      <div class="header-suffix"></div>
    </header>
    <section class="section">
      <div class="project-detail">
        <div class="project-detail-cover" style="margin-top:4.4rem;">
          <img v-if="information.fileid" :src="information.fileid" alt="" />
          <img v-else :src="require('@/assets/img/imgsz/albx' + '0020' + '.png')" alt="" />
          <div v-if="information.albx0072 == 4" class="project-item-tag success">
            运行中
          </div>
          <div v-if="information.albx0072 == 3" class="project-item-tag warning">
            待启动
          </div>
          <div v-if="information.albx0072 == 5 || information.albx0072 == 7" class="project-item-tag primary">
            已结项
          </div>
          <!-- <div v-if="information.albx0015 == 4" class="project-item-tag info">
            已结束
          </div> -->
        </div>
        <div class="project-detail-main">
          <h3 class="project-detail-title">
            {{ information.albx0002 }}
          </h3>
          <ul>
            <li v-for="(item, index) in information.servicetype" :key="index" class="tag" corner outline size="small" type="warning">
              {{ item.codevalue }}
            </li>
          </ul>
          <div class="project-detail-host">
            <img style="border-radius: 2rem" v-if="information.fileidteam" :src="information.fileidteam" alt="" />
            <img v-else src="@/assets/img/imgsy/avatar7.svg" alt="" />
            <span>{{ information.albx0062 }}</span>
          </div>
        </div>
      </div>
      <div class="project-panel mt-20">
        <div class="project-panel-head flex-h">
          <a href="javascript:void(0);" class="flex-1 flex-h v-m t-lr" @click="introduce()">
            <h3>项目介绍</h3>
            <img src="@/assets/img/imgsy/cell-rightx.svg" alt="" />
          </a>
        </div>
        <div class="project-panel-content">
          <p class="huanhan">
            {{ information.albx0018 }}
          </p>
        </div>
      </div>
      <ul class="mt-20">
        <li class="cell">
          <a href="javascript:void(0);" class="cell-wrap" style="width: 100%">
            <div class="cell-label">项目地点</div>
            <div style="font-size: 1.6rem; text-align: right; max-width: 23rem">
              {{ information.albx0003 }}
            </div>
            <!-- <input
              type="text"
              readonly
              class="cell-core"
              :value="information.albx0003"
            /> -->
          </a>
        </li>

        <li class="cell">
          <a href="javascript:void(0);" class="cell-wrap" style="width: 100%">
            <div class="cell-label">项目日期</div>
            <div style="font-size: 1.6rem">
              {{ information.albx0004 && information.albx0005 ? information.albx0004.slice(0, 10) + '至' + information.albx0005.slice(0, 10) : '' }}
            </div>
          </a>
        </li>
        <li class="cell">
          <a href="javascript:void(0);" class="cell-wrap" style="width: 100%">
            <div class="cell-label">招募日期</div>
            <div style="font-size: 1.6rem">
              {{ information.albx0006 && information.albx0007 ? information.albx0006.slice(0, 10) + '至' + information.albx0007.slice(0, 10) : '' }}
            </div>
          </a>
        </li>
        <li class="cell">
          <a href="javascript:void(0);" class="cell-wrap" style="width: 100%">
            <div class="cell-label">项目联系人</div>
            <div style="font-size: 1.6rem">
              {{ information.albx0025 }}
            </div>
          </a>
        </li>
        <li v-if="information.albx0027 == 1" class="cell" @click="mcall(information.albx0026)">
          <a href="javascript:void(0);" class="cell-wrap" style="width: 100%">
            <div class="cell-label">联系人方式</div>
            <div class="jiantou" style="font-size: 1.6rem">
              {{ information.albx0026 }}
            </div>
          </a>
        </li>
      </ul>
    </section>
    <footer class="footer" bg="white">
      <a v-if="gux == 1" @click="popupx('项目待启动')" href="javascript:void(0);" class="button" type="info" disabled span="24">项目待启动</a>
      <a v-if="gux == 2" @click="introduce1()" href="javascript:void(0);" class="button danger-gradient" type="danger" span="24" id="btn1">立即报名</a>
      <a @click="agree(4)" v-if="gux == 3" href="javascript:void(0);" class="button danger-gradient" type="danger" span="24" id="btn1">取消报名</a>
      <a v-if="gux == 4" href="javascript:void(0);" class="button danger-gradient" type="danger" span="24" id="btn1">立即报名</a>
      <a v-if="gux == 6" href="javascript:void(0);" class="button danger-gradient" type="danger" span="24" id="btn1">立即报名</a>
      <a v-if="gux == 7" @click="popupx('项目待启动')" href="javascript:void(0);" class="button" type="info" disabled span="24">此项目不对外招募</a>
      <a v-if="gux == 8" @click="agree(3)" href="javascript:void(0);" class="button danger-gradient" type="danger" span="24" id="btn1">未通过,重新报名</a>
      <a v-if="gux == 9" href="javascript:void(0);" class="button" type="info" disabled span="24">招募已聘结束</a>
      <a v-if="gux == 10" href="javascript:void(0);" class="button" type="info" disabled span="24">项目已结束</a>
      <a v-if="gux == 11" href="javascript:void(0);" class="button danger-gradient" type="danger" span="24" id="btn1">已加入项目</a>
      <a @click="divorced('是否确认删除项目')" v-if="gux == 12" href="javascript:void(0);" class="button danger-gradient" type="danger" span="24" id="btn1">删除项目</a>
      <div class="button-wrapper" v-if="gux == 14">
        <a href="javascript:void(0);" class="button warning-gradient" type="danger" span="12" @click="agree(1)">同意加入</a>
        <a href="javascript:void(0);" class="button danger-gradient" type="danger" span="12" @click="agree(2)">拒绝加入</a>
      </div>
      <a v-if="gux == 16" href="javascript:void(0);" style="background:linear-gradient(94deg, #707070 0%, #999 100%);
  border: none;" class="button" type="danger" span="24" id="btn1">招募未启动</a>
      <a v-if="gux == 17" href="javascript:void(0);" style="background:linear-gradient(94deg, #707070 0%, #999 100%);
  border: none;" class="button" type="danger" span="24" id="btn1">招募未开始</a>
      <a v-if="gux == 18" href="javascript:void(0);" style="background:linear-gradient(94deg, #707070 0%, #999 100%);
  border: none;" class="button" type="danger" span="24" id="btn1">招募已结束</a>
    </footer>

    <overlay :show="show">
      <div class="wrapper" @click.stop>
        <div class="block" style="border-radius: 1rem">
          <div class="search type2" style="margin-top: 2rem">
            <div action="javascript:return true">
              <input class="search-core" type="search" v-model="searchNamex" placeholder="请输入免审密码" />
            </div>
            <img class="search-delete" src="@/assets/img/imgsy/delete.svg" alt="" style="display: none" />
          </div>
          <div style="
              min-height: 2rem;
              line-height: 2rem;
              margin-left: 2rem;
              color: #db0000;
            ">
            {{ codefreet }}
          </div>
          <div style="display: flex; justify-content: space-around">
            <div @click="
                show = false
                codefreet = ''
                searchNamex = ''
              " class="button" style="width: 40%; height: 3.8rem; font-size: 1.5rem">
              取消
            </div>
            <div @click="introduce1x(1)" class="button danger-gradient" style="
                color: #ffffff;
                width: 40%;
                height: 3.8rem;
                font-size: 1.5rem;
              ">
              确定
            </div>
          </div>
        </div>
      </div>
    </overlay>
  </div>
</template>
<script>
import { Dialog } from 'vant'
import { Overlay } from 'vant'
import { Toast } from 'vant'
export default {
  components: { Dialog, Overlay, Toast },
  data() {
    return {
      getuserInfo: this.$store.getters.getuserInfo, //用户信息
      login: this.$store.getters.getLoginStatus, //是否登录
      ShowPage: '1',
      show: false,
      id: this.$route.params.id, //项目id
      aid: this.$route.params.aid, //项目区域id
      albx0085: '0', //志愿者与项目之间的关系
      gwid: '', //与志愿者有关系的岗位
      information: {
        servicetype: [],
        albx0026: '',
        albx0025: '',
        albx0015: '',
        albx0004: '',
        albx0005: '',
        albx0006: '',
        albx0007: '',
        albx0021: '',
        lbx02id: '',
        gwid: '',
      },
      searchNamex: '', //免审密码
      gux: '', //项目与人的关系
      guxmm: '', //免码招聘
      //项目信息
      codefreet: '', //免码提示语
      currentDate: new Date(), // 当前时间
    }
  },
  created() {},
  mounted() {
    this.getProjectInfoFortis() // //项目详情查询
  },
  methods: {
    getProjectInfoFortis() {
      //项目详情查询
      this.utilscommit.requestapi(
        'getProjectInfoFortisH5',
        {
          albx0021: this.aid,
          proId: this.id,
        },
        this.getProjectInfo
      )
    },
    getProjectInfo(src) {
      if (src.code == 0 && src.data) {
        this.information = src.data

        this.utilscommit.requestapi(
          //项目与志愿者的关系
          'volunteerAndPostRelationShipFortisH5',
          {
            albx0021: this.aid,
            proId: this.id,
            volNum: this.getuserInfo.albp0029,
          },
          (src) => {
            if (src.code == 0) {
              // debugger
              if (!src.data) {
                this.albx0085 = '0' //没有关系,给个默认值
              } else {
                this.albx0085 = src.data.albx0085 //获取项目与志愿者的关系字段
                this.gwid = src.data.gwid //有关系的岗位
              }
            }
            this.provincesBack1()
          }
        )
      }
    },
    introduce1x() {
      if (!this.searchNamex) {
        //是否输入免审密码
        this.codefreet = '免审密码不能为空'
        return
      } else if (this.information.albx0017 != this.searchNamex) {
        this.codefreet = '免审密码不正确'
        return
      }
      this.introduce1(1)
    },
    agree(a) {
      let data = {
        areaid: this.aid, //项目区域id
        postid: this.gwid, //岗位id
        projectid: this.id, //项目id
        volAreaId: this.getuserInfo.albp0020, //志愿者服务区域
        volunteerid: this.getuserInfo.albp0029, //志愿者编号
        voltime:this.getuserInfo.albp0089,//志愿者服务时长
      }
      if (a == 1) {
        //同意
        data.operatetype = '41'
        this.utilscommit.requestapi(
          //加入项目
          'getVolOperateProjectFortisH5',
          data,
          this.provinces1
        )
      }
      if (a == 2) {
        //拒接
        data.operatetype = '42'
        this.utilscommit.requestapi(
          //加入项目
          'getVolOperateProjectFortisH5',
          data,
          this.provinces1
        )
      }
      if (a == 3) {
        //再次申请
        data.operatetype = '71'

        this.utilscommit.requestapi(
          //加入项目
          'getVolOperateProjectFortisH5',
          data,
          this.provinces1
        )
      }
      if (a == 4) {
        //再次申请
        data.operatetype = '12'
        this.utilscommit.requestapi(
          //加入项目
          'getVolOperateProjectFortisH5',
          data,
          this.provinces1
        )
      }
    },
    provinces1(src) {
      if (src && src.code == '0') {
        Dialog.alert({
          message: src.message,
        }).then(() => {
          location.reload()
        })
      } else {
        if (src.message) {
          Dialog.alert({
            message: src.message,
          }).then(() => {
            location.reload()
          })
        }
      }
    },
    provinces2(src) {
      if (src && src.code == '0') {
        Dialog.alert({
          message: src.message,
        }).then(() => {
          location.reload()
        })
      } else {
        if (src.message) {
          Dialog.alert({
            message: src.message,
          }).then(() => {
            location.reload()
          })
        }
      }
    },
    mcall(phoneNumber) {
      Dialog.confirm({
        title: '是否拨打联系人电话',
      })
        .then(() => {
          window.location.href = 'tel://' + phoneNumber
        })
        .catch(() => {
          // on cancel
        })
    },
    divorced(a) {
      //退出项目弹窗

      Dialog.confirm({
        title: a,
      })
        .then(() => {
          this.divorcedx()
        })
        .catch(() => {
          // on cancel
        })
    },
    divorcedx() {
      console.log(this.$route.params.id, this.$store.getters.getuserInfo.albp0031)
      this.utilscommit.request(
        //退出项目
        'nvsi_appOperateProject',
        {
          projectid: this.$route.params.id,
          volid: this.$store.getters.getuserInfo.albp0031,
        },
        this.divorcedc
      )
    },
    divorcedc(res) {
      //退出项目结果

      if (res && res.code == 0) {
        console.log(res, '删除成功')
        Dialog.confirm({
          title: res.message,
        })
          .then(() => {
            location.reload()
          })
          .catch(() => {
            location.reload()
          })
      } else {
        Dialog.alert({
          message: res.message,
        }).then(() => {
          // on close
        })
      }
    },
    popupx(a) {
      Dialog.alert({
        message: a,
      }).then(() => {
        // on close
      })
    },

    introduce() {
      //跳转项目详情
      this.$router.push({ name: 'volunteerProject4api', params: { id: this.id, aid: this.aid } })
    },
    codefree() {
      //打开免码弹窗
      this.show = true
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
    introduce1(gunxx) {
      //  跳转项目岗位
      //判断用户是否登录

      if (this.$store.getters.getLoginStatus) {
        //判断用户是否实名认证
        if (this.$store.getters.getuserInfo.albp0063 == 0) {
          //实名认证未通过
          Dialog.confirm({
            title: '',
            message: '您的身份实名信息认证失败请重新认证，否则无法参与相关志愿活动',
          }).then(() => {})
          return
        } else if (this.$store.getters.getuserInfo.albp0063 == 2) {
          //实名认证审核中
          Dialog.confirm({
            title: '',
            message: '您的身份实名信息已在审核中审核期间还不能参与相关志愿活动请耐心等待1-2个工作日',
          }).then(() => {})
          return
        } else if (this.$store.getters.getuserInfo.albp0063 == 1) {
          //实名认证已通过 并且登录了之后才能执行的逻辑
        } else {
          //实名认证审核中
          Dialog.confirm({
            title: '',
            message: '您的身份实名信息已在审核中审核期间还不能参与相关志愿活动请耐心等待1-2个工作日',
          }).then(() => {})
          return
        }
      } else {
        //未登录
        Toast('您还没有登录，无法进行当前操作!')
        this.$router.push('/loginapi')
        return
      }
      if (
        !(
          this.$store.getters.getuserInfo.albp0020 &&
          this.$store.getters.getuserInfo.albp0010 &&
          this.$store.getters.getuserInfo.albp0039 &&
          this.$store.getters.getuserInfo.albp0021 &&
          this.$store.getters.getuserInfo.albp0028
        )
      ) {
        this.divorced1('您的基本信息有缺失,无法可进行报名、签到等志愿活动,是否前往填写信息（补充必填信息即可)')
        return
      }

      if (gunxx != 1 && this.guxmm == 5) {
        this.codefree()
        return
      }

      if (this.$store.getters.getuserInfo.albp0020.slice(0, 2) != this.information.albe0012.slice(0, 2)) {
        this.divorced1('  此项目不在您的服务区域内 ，若要报名请先在基本信息修改你的服务区域，再进行报名')
        return
      }
      if (this.searchNamex) {
        //是否有免审码
        this.$router.push({
          name: 'volunteerProject3api',
          params: {
            id: this.id,
            aid: this.aid,
            mima: this.searchNamex,
            gux: this.gux,
            lbx02id: this.information.lbx02id,
          },
        })
      } else {
        this.$router.push({
          name: 'volunteerProject3api',
          params: {
            id: this.id,
            aid: this.aid,
            mima: 'false',
            gux: this.gux,
            lbx02id: this.information.lbx02id,
          },
        })
      }
    },
    provincesBack1() {
      // this.information.albx0009 = '0001'
      let relation1 = this.albx0085 //招聘状态
      let relation2 = this.information.albx0072 //项目状态
      let relation3 = this.information.albx0024 //志愿者招聘范围

      if (relation2 == 4 || relation2 == 3) {
        //招聘中
        if (relation3 == 1) {
          //公开招聘
          if (relation1 && relation1 != '0') {
            //与项目有关
            if (relation1 == 1) {
              //申请中
              this.gux = 3
            } else if (relation1 == 7) {
              //审核未通过
              this.gux = 8
            }
            if (relation1 == 2 || relation1 == 3 || relation1 == 5 || relation1 == 6) {
              this.gux = 11
            }
            if (relation1 == 4) {
              //邀请中
              this.gux = 14
            }
          } else {
            //与项目无关
            this.gux = 2 //立即报名(所有)
          }
        } else if (relation3 == 2) {
          //指定团体招聘

          // this.gux = 4;
          if (relation1 && relation1 != '0') {
            //与项目有关
            if (relation1 == 1) {
              //申请中
              this.gux = 3
            } else if (relation1 == 7) {
              //审核未通过
              this.gux = 8
            }
            if (relation1 == 2 || relation1 == 3 || relation1 == 5 || relation1 == 6) {
              this.gux = 11
            }
            if (relation1 == 4) {
              //邀请中
              this.gux = 14
            }
          } else {
            //与项目无关
            this.gux = 2 //立即报名(所有)
          }
        } else if (relation3 == 3) {
          //免审招聘
          this.guxmm = 5
          if (relation1 && relation1 != '0') {
            //与项目有关
            if (relation1 == 1) {
              //申请中
              this.gux = 3
            } else if (relation1 == 7) {
              //审核未通过
              this.gux = 8
            }
            if (relation1 == 2 || relation1 == 3 || relation1 == 5 || relation1 == 6) {
              this.gux = 11
            }
            if (relation1 == 4) {
              //邀请中
              this.gux = 14
            }
          } else {
            //与项目无关
            this.gux = 2 //立即报名(所有)
          }
        } else if (relation3 == 6) {
          //指定实名志愿者招聘
          // this.gux = 6;

          if (relation1 && relation1 != '0') {
            //与项目有关
            if (relation1 == 1) {
              //申请中
              this.gux = 3
            } else if (relation1 == 7) {
              //审核未通过
              this.gux = 8
            }
            if (relation1 == 2 || relation1 == 3 || relation1 == 5 || relation1 == 6) {
              this.gux = 11
            }
            if (relation1 == 4) {
              //邀请中
              this.gux = 14
            }
          } else {
            //与项目无关
            this.gux = 2 //立即报名(所有)
          }
        } else if (relation3 == 4) {
          //不公开招聘
          this.gux = 7
        }
        if (this.information.albx0006) {
          let a6 = this.information.albx0006.slice(0, 19).replace(/-/g, '/')
          let a7 = this.information.albx0007.slice(0, 19).replace(/-/g, '/')
          if (this.currentDate < new Date(a6)) {
            relation2=5
            this.gux = 17
          }
          if (this.currentDate > new Date(a7)) {
            relation2=5
            this.gux = 18
          }
        }
      }
      if (this.information.albx0070 == 0 && relation1 != 4 && relation2!=5) {
        this.gux = 16
      }
      this.ShowPage = 1
    },
  },
}
</script>

<style scoped>
input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none; /*此处只是去掉默认的小×*/
}
.tag[size="small"] {
  height: 1.7rem;
  line-height: 1.6rem;
  width: auto;
  position: static;
}
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: 28rem;
  height: 15rem;
  background-color: #fff;
}
.huanhan {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.cell-wrap {
  justify-content: space-between !important;
}
.cell {
  padding: 0 !important;
}
</style>
