加入团体
<template>
  <div class="page bg-white">
    <header class="header">
      <div class="header-prefix">
        <img src="@/assets/img/back.svg" alt="" class="page-back" @click="$router.go(-1)" />
      </div>
      <h1 class="header-title">队伍管理</h1>
      <div class="header-suffix"></div>
    </header>
    <ul class="tabbox type3" style="margin-top: 4.4rem">
      <li :class="tab == 1 ? 'active' : ''" @click="changeTab(1)">我的队伍</li>
      <li :class="tab == 2 ? 'active' : ''" @click="changeTab(2)">待定队伍</li>
      <li :class="tab == 3 ? 'active' : ''" @click="changeTab(3)">脱离记录</li>
    </ul>

    <section class="section plr-40" style="height: 100%">
      <pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
        <list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="tab-view" id="tab-view1">
            <!-- 我的队伍 -->
            <div class="tab-view-item" :class="tab == 1 ? 'active' : ''" v-show="tab == 1">
              <ul class="project-list type3">
                <li class="project-item" v-for="(teamItem, index1) in teams" :key="index1" @click="togroupx(teamItem.id, teamItem.albe0012)">
                  <div class="project-item-cover">
                    <img :src="common.Teampicture(teamItem.albe0025, teamItem.albe0012)" alt="" />
                    <div class="project-item-tag success" style="width: 5rem">
                      已加入
                    </div>
                    <div class="project-item-cover-title" v-text="teamItem.albe0012value"></div>
                  </div>
                  <div class="project-item-main">
                    <a href="#" class="project-item-title" v-text="teamItem.albe0002"></a>
                    <ul class="project-item-info mt-30">
                      <li>加入时间：<span v-text="teamItem.albe0136 ? teamItem.albe0136.slice(0, 10) : ''"></span></li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
            <!-- 待定队伍 -->
            <div class="tab-view-item" :class="tab == 2 ? 'active' : ''" v-show="tab == 2">
              <ul class="project-list type3">
                <li
                  class="project-item"
                  v-for="(teamItem, index1) in pendingitems"
                  :key="index1"
                  @click="togroupx(teamItem.albp3309, teamItem.albp3311)"
                >
                  <div class="project-item-cover">
                    <img :src="common.Teampicture(teamItem.albe0025, teamItem.albp3311)" alt="" />
                    <div v-if="teamItem.albp3307 == 2" class="project-item-tag success" style="width: 5rem">
                      申请中
                    </div>
                    <div v-if="teamItem.albp3307 == 3" class="project-item-tag success" style="width: 5rem">
                      已拒绝
                    </div>
                    <div class="project-item-cover-title" v-text="teamItem.albp3311value"></div>
                  </div>
                  <div class="project-item-main">
                    <a href="#" class="project-item-title" v-text="teamItem.albp3308"></a>
                  </div>
                </li>
              </ul>
            </div>

            <!-- 脱离记录 -->
            <div class="tab-view-item" :class="tab == 3 ? 'active' : ''" v-show="tab == 3">
              <ul class="project-list type3">
                <li class="project-item" v-for="(teamItem, index1) in outteams" :key="index1" @click="togroupx(teamItem.albp3309, teamItem.albp3311)">
                  <div class="project-item-cover">
                    <img :src="common.Teampicture(teamItem.albe0025, teamItem.albp3311)" alt="" />
                    <div class="project-item-tag info" style="width: 5rem">
                      已脱离
                    </div>
                    <div class="project-item-cover-title" v-text="teamItem.albp3311value"></div>
                  </div>
                  <div class="project-item-main">
                    <a href="#" class="project-item-title" v-text="teamItem.albp3308"></a>
                    <ul class="project-item-info mt-30">
                      <li>脱离时间：<span v-text="teamItem.awaytime"></span></li>
                    </ul>
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
      tab: this.$store.getters.getsave, //选项切换
      cardno: this.$store.getters.getuserInfo.albp0005, //志愿者加密身份证
      teams: [], //队伍列表
      pendingitems: [], //待定
      outteams: [], //脱离
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
    if (to.name != 'GroupDetail') {
      this.$store.commit('changsave', 1)
    }
    next()
  },
  mounted() {
    // this.utilscommit.wetchat({ title: '欢迎加入中国志愿服务', desc: '“益”路有你 志愿同行', link: window.location.origin })
  },
  methods: {
    togroupx(res, ares) {
      //跳转到详情页
      this.$router.push({
        name: 'GroupDetailapi',
        params: { id: res, aid: ares },
      })
    },
    getData() {
      //获取列表
      console.log(this.pageNow, '查询时')
      if (this.tab == 1) {
        //我的队伍
        this.utilscommit.requestapi('queryMyTeamPageH5', { cardno: this.cardno, pageSize: this.pageSize, pageNum: this.pageNow }, this.back1)
      } else if (this.tab == 2) {
        //待定队伍
        this.utilscommit.requestapi('quertWaitTeamPageH5', { idCard: this.cardno, pageSize: this.pageSize, pageNum: this.pageNow }, this.back2)
      } else {
        //脱离队伍
        this.utilscommit.requestapi('queryVolBreakawayPageH5', { albp3310: this.cardno, pageSize: this.pageSize, pageNum: this.pageNow }, this.back3)
      }
      // let data = {
      //   volid: this.id, //11000000142827494904107258752622(生产)    11000000139311254027474401208915(本地)
      //   pageNow: this.pageNow,
      //   pageSize: this.pageSize,
      //   type: this.tab,
      // }
      // this.utilscommit.request('nvsi_jsGetGrouptList', data, this.back)
      // this.utilscommit.request_only(data,this.back)
    },
    back1(src) {
      //列表返回

      var _result = []
      if (src.code == 0 && src.data) {
        //  debugger;

        this.endNum = src.pageCount

        _result = src.data
        // this.pageNow = src.data.pagenow;
      }
      this.loading = false
      console.log(this.pageNow, '查询后')
      // if (this.tab == 1) {
      if (this.pageNow === 1) {
        if (src && src.data) {
          this.teams = src.data
        } else {
          this.teams = []
        }
      } else {
        this.teams = [...this.teams, ..._result]
      }
    },
    back2(src) {
      //列表返回

      var _result = []
      if (src.code == 0 && src.data) {
        //  debugger;

        this.endNum = src.pageCount

        _result = src.data
        // this.pageNow = src.data.pagenow;
      }
      this.loading = false
      console.log(this.pageNow, '查询后')

      if (this.pageNow === 1) {
        if (src && src.data) {
          this.pendingitems = src.data
        } else {
          this.pendingitems = []
        }
      } else {
        this.pendingitems = [...this.pendingitems, ..._result]
      }
    },
    back3(src) {
      //列表返回

      var _result = []
      if (src.code == 0 && src.data) {
        //  debugger;

        this.endNum = src.pageCount

        _result = src.data
        // this.pageNow = src.data.pagenow;
      }
      this.loading = false
      console.log(this.pageNow, '查询后')

      if (this.pageNow === 1) {
        if (src && src.data) {
          this.outteams = src.data
        } else {
          this.outteams = []
        }
      } else {
        this.outteams = [...this.outteams, ..._result]
      }
    },
    changeTab(tab) {
      //切换页面

      this.tab = tab
      this.$store.commit('changsave', tab)
      this.pageNow = 1
      this.getData()
    },
    toPage(val) {
      //跳转详情
      this.$router.push({ name: 'GroupDetail', params: { id: val } })
    },
    onRefresh() {
      //下拉刷新
      // debugger;
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
  height: 10rem;
}
.team-wrap {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
  transition: 0.3s;
  .team-delete {
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
  .team-info {
    box-sizing: border-box;
    padding: 1.5rem 1rem;
    &-pic {
      position: relative;
      img {
        height: 7rem;
        vertical-align: top;
      }
    }
    .flex-v {
      margin-left: 1.5rem;
    }
  }
}
// 右滑删除
.team-wrap.active {
  transform: translateX(-7.5rem);
}
</style>
