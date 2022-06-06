项目管理
<template>
  <div class="page bg-white">
    <header class="header">
      <div class="header-prefix">
        <img src="@/assets/img/back.svg" alt="" class="page-back" @click="$router.go(-1)" />
      </div>
      <h1 class="header-title">项目管理</h1>
      <div class="header-suffix"></div>
    </header>
    <ul class="tabbox type3" style="margin-top: 4.4rem">
      <li :class="tab == 1 ? 'active' : ''" @click="changeTab(1)">我的项目</li>
      <li :class="tab == 2 ? 'active' : ''" @click="changeTab(2)">待定项目</li>
    </ul>

    <section class="section plr-40">
      <pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
        <list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="tab-view" id="tab-view1">
            <!-- 我的项目 -->
            <div class="tab-view-item" :class="tab == 1 ? 'active' : ''" v-show="tab == 1">
              <ul class="project-list type3">
                <li
                  class="project-item"
                  v-for="(projiectItem, index1) in projects"
                  :key="index1"
                  @click="toPage(projiectItem.id, projiectItem.areaid)"
                >
                  <div class="project-item-cover">
                    <img v-if="projiectItem.albx0020" :src="projiectItem.albx0020" alt="" />
                    <img v-else :src="require('@/assets/img/imgsz/albx0099.png')" alt="" />
                    <div v-if="projiectItem.albx0072 == 3" class="project-item-tag success">
                      待启动
                    </div>
                    <div v-if="projiectItem.albx0072 == 4" class="project-item-tag warning">
                      运行中
                    </div>
                    <div v-if="projiectItem.albx0072 == 5" class="project-item-tag info">
                      已结项
                    </div>
                    <div v-if="projiectItem.albx0072 == 6" class="project-item-tag info">
                      补录
                    </div>

                    <div class="project-item-cover-title" v-text="projiectItem.albx0021"></div>
                  </div>
                  <div class="project-item-main">
                    <a href="javascript:void(0);" class="project-item-title" v-text="projiectItem.albx0002"></a>
                    <ul class="project-item-info">
                      <li>加入时间：<span v-text="projiectItem.albx0055 ? projiectItem.albx0055.slice(0, 10) : ''"></span></li>
                    </ul>
                    <ul class="project-item-info mt-10">
                      <li>服务时长：<span v-text="projiectItem.albx0083 + '小时'"></span></li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <!-- 待定项目 -->
            <div class="tab-view-item" :class="tab == 2 ? 'active' : ''" v-show="tab == 2">
              <ul class="project-list type3">
                <li
                  class="project-item"
                  v-for="(projiectItem, index) in pendingitems"
                  :key="index"
                  @click="toPage(projiectItem.albx0057, projiectItem.albx0021)"
                >
                  <div class="project-item-cover">
                    <!-- <img src="@/assets/img/imgsy/img27.png" alt="" /> -->
                    <!-- <img v-if="projiectItem.orgphoto" :src="common.context() + projiectItemorgphoto" alt="" /> -->
                    <img v-if="projiectItem.albx0020" :src="projiectItem.albx0020" alt="" />
                    <img v-else :src="require('@/assets/img/imgsz/albx0099.png')" alt="" />
                    <div v-if="projiectItem.albx0085 == '1'" class="project-item-tag success">
                      申请中
                    </div>
                    <div v-if="projiectItem.albx0085 == '4'" class="project-item-tag success">
                      被邀请
                    </div>
                    <div v-if="projiectItem.albx0084 == 'B'" class="project-item-tag warning">
                      加入成功
                    </div>
                    <div v-if="projiectItem.albx0084 == 'C'" class="project-item-tag info">
                      已拒绝
                    </div>
                    <!-- <div v-if="projiectItem.albx0072 == 6 || projiectItem.albx0015 == 7" class="project-item-tag primary">
                      已结项
                    </div> -->

                    <div class="project-item-cover-title" v-text="projiectItem.areaname"></div>
                  </div>
                  <div class="project-item-main">
                    <a href="javascript:void(0);" class="project-item-title" v-text="projiectItem.albx0002"></a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </list>
      </pull-refresh>
    </section>
  </div>
</template>
<script>
import { PullRefresh, List } from 'vant'
export default {
  components: { PullRefresh, List },
  data() {
    return {
      //this.$store.getters.getRegInfo
      cardno: this.$store.getters.getuserInfo.albp0005, //志愿者加密身份证
      volNum: this.$store.getters.getuserInfo.albp0029, //志愿者编号
      tab: this.$store.getters.getsave, //选项切换
      projects: [], //项目列表
      pendingitems: [], //待定项目
      id: this.$route.params.id, //志愿者id

      pageNow: 0, //当前页
      pageSize: 10, //页面条数
      endNum: 1,
      isLoading: false, //下拉刷新
      loading: false,
      finished: false,
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name != 'volunteerProject1') {
      this.$store.commit('changsave', 1)
    }
    next()
  },
  mounted() {
    // this.utilscommit.wetchat({ title: '欢迎加入中国志愿服务', desc: '“益”路有你 志愿同行', link: window.location.origin })
  },
  methods: {
    getData() {
      //获取列表
      if (this.tab == 2) {
        //当为待定项目时
        // pageNum: this.pageNow, pageSize: this.pageSize

        this.utilscommit.requestapi(
          'listVolMyProjectApplyFortisH5',
          { volNum: this.volNum, pageNum: this.pageNow, pageSize: this.pageSize },
          this.back
        )
      } else {
        //当为我的项目

        this.utilscommit.requestapi(
          'listVolMyProjectsFortisH5',
          { albx0084: 'B', cardno: this.cardno, pageNum: this.pageNow, pageSize: this.pageSize },
          this.back2
        )
      }
    },
    back2(src) {
      //列表返回

      var _result = []
      if (src.code == 0 && src.data) {
        this.endNum = src.pageCount
        _result = src.data.data
      }
      this.loading = false

      // if (this.tab == 1) {
      if (this.pageNow === 1) {
        if (src.code == 0 && src.data) {
          this.projects = src.data.data
        } else {
          this.projects = []
        }
      } else {
        this.projects = [...this.projects, ..._result]
      }
      // } else {
      //   if (this.pageNow === 1) {
      //     if (src.code == 0 && src.data) {
      //       this.pendingitems = src.data.data
      //     } else {
      //       this.pendingitems = []
      //     }
      //   } else {
      //     this.pendingitems = [...this.pendingitems, ..._result]
      //   }
      // }
    },
    back(src) {
      //列表返回

      var _result = []
      if (src.code == 0 && src.data.length != 0) {
        this.endNum = src.pageCount
        _result = src.data
      }
      this.loading = false

      // if (this.tab == 1) {
      //   if (this.pageNow === 1) {
      //     if (src.code == 0 && src.data.length != 0) {
      //       this.projects = src.data
      //     } else {
      //       this.projects = []
      //     }
      //   } else {
      //     this.projects = [...this.projects, ..._result]
      //   }
      // } else {
      if (this.pageNow === 1) {
        if (src.code == 0 && src.data.length != 0) {
          this.pendingitems = src.data
        } else {
          this.pendingitems = []
        }
      } else {
        this.pendingitems = [...this.pendingitems, ..._result]
      }
      // }
    },
    changeTab(tab) {
      //切换tab页
      this.tab = tab
      this.$store.commit('changsave', tab)
      this.pageNow = 1
      this.getData()
    },
    toPage(a, b) {
      //跳转
      this.$router.push({ name: 'volunteerProject1api', params: { id: a, aid: b } })
    },
    onRefresh() {
      //下拉刷新

      let thie = this
      setTimeout(() => {
        thie.isLoading = false
        thie.pageNow = 1
        thie.getData()
        //  thie.projectdata=[]
        thie.finished = false
      }, 1000)
    },
    onLoad() {
      const nextNum = this.pageNow + 1

      if (nextNum > this.endNum) {
        this.finished = true
      } else {
        this.pageNow++
        this.getData()
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.item {
  position: relative;
  overflow: hidden;
  height: 13rem;
}
.project-wrap {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  transition: 0.3s;
  .project-delete {
    width: 7.5rem;
    height: 100%;
    background: #108ee9;
    font-size: 1.4rem;
    color: #fff;
    font-weight: bold;
    line-height: 1;
    position: absolute;
    right: -7.5rem;
    top: 0;
  }
  .project-info {
    height: 9rem;
    box-sizing: border-box;
    padding: 1.5rem 1rem;
    &-pic {
      position: relative;
      img {
        height: 6rem;
        vertical-align: top;
      }
    }
    .flex-v {
      margin-left: 1.5rem;
      span {
        margin-top: 0.6rem;
      }
    }
  }
  .project-footer {
    border-top: 0.05rem solid #f3f3f3;
    box-sizing: border-box;
    p {
      height: 100%;
    }
    p:first-child {
      border-right: 0.05rem solid #f3f3f3;
      box-sizing: border-box;
    }
  }
}
// 右滑删除
.project-wrap.active {
  transform: translateX(-7.5rem);
}
.project-item-tag {
  padding: 0;
}
</style>
