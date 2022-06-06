<template>
  <div class="page bg-gray">
    <div class="header">
      <div class="header-prefix">
        <img src="@/assets/img/back.svg" alt="" class="page-back" @click="$router.go(-1)" />
      </div>
      <h2 class="header-title">签到记录</h2>
      <div class="header-suffix"></div>
    </div>
    <div style="margin-top: 5.5rem">
      <PullRefresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功" style="height: 100%">
        <div style="background: #fff; margin-bottom: 1rem; padding: 2rem">
          <div class="team-info flex-h v-m flex-1" @click="$router.push(`/volunteerProject1/${projectInfo.id}`)">
            <!-- @click="commonRouter.togroup(teamItem.id)" -->
            <div class="project-item-cover">
              <img v-if="projectInfo.fileid" :src="projectInfo.fileid" alt="" />
              <img v-else :src="require('@/assets/img/imgsz/albx' + projectInfo.albx0009 + '.png')" alt="" />
              <div class="project-item-cover-title">
                {{ projectInfo.albx0003 }}
              </div>
            </div>
            <div class="project-item-main">
              <a class="project-item-title">{{ projectInfo.albx0002 }}</a>
              <ul class="project-item-info">
                <li>
                  加入时间：<span>{{ jointime }}</span>
                </li>
              </ul>
              <ul class="project-item-info mt-10">
                <li>
                  服务时长：<span>{{ projectInfo.albx0083 }}小时</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="sign-in-panel">
          <ul class="sign-in-records" style="border: 0">
            <li v-for="(item, index) in recordsList" :key="index">
              <div>
                <img src="@/assets/img/icon17.png" alt="" />
                <b>{{ item.albx7004 }} {{ item.albx7005 == 1 ? '签到' :  item.albx7005 == 2 ?'签退':'强制签退' }}</b>
              </div>
              <div class="sign-in-records-location">
                <img src="@/assets/img/icon16.png" alt="" />
                <span>{{ item.albx7006 }}</span>
              </div>
            </li>
          </ul>
          <div class="flex-h t-c v-m" style="margin-top: 20px">
            <span class="text info" size="default" v-if="isMore && recordsList.length">没有更多了</span>
            <span class="text info" size="default" v-if="!isMore && recordsList.length" @click="lodeMore">加载更多</span>
          </div>
        </div>
      </PullRefresh>
    </div>
  </div>
</template>
<script>
import { PullRefresh } from 'vant'
export default {
  components: {
    PullRefresh,
  },
  data() {
    return {
      userInfo: this.$store.getters.getuserInfo,
      jointime: '', //加入项目时间
      recordsList: [],
      pageSize: 50,
      pageNum: 1,
      isMore: false, //加载更多
      projectInfo: {
        albx0009: '0001',
      },
      isLoading: false,
    }
  },
  mounted() {
    this.utilscommit.wetchat({ title: '欢迎加入中国志愿服务', desc: '“益”路有你 志愿同行', link: window.location.origin })
    this.getSignlist()
    this.getData()
  },
  methods: {
    getData() {
      let data = {
        projectid: this.$route.params.id,
        volid: this.userInfo.albp0029,
        areaid: this.$route.params.aid,
      }
      this.utilscommit.requestapi('getProjectInfornationFortisH5', data, (res) => {
        if (res.code == 0) {
          this.projectInfo = res.data
          let item = this.projectInfo

          item.albx0009 = '0099'

          if (this.projectInfo.albx0055) {
            this.jointime = this.projectInfo.albx0055.substring(0, 11)
          }
        }
      })
    },
    getSignlist() {
      //获取签到记录列表
      let data = {
        volnum: this.userInfo.albp0029, //志愿者编号
        projectid: this.$route.params.id, //项目id
        pageSize: this.pageSize,
        pageNum: this.pageNum,
      }
      console.log(data)
      this.utilscommit.requestapi('listDurationRecordFortisH5', data, this.listback)
    },
    listback(res) {
      //debugger
      //签到记录返回
      if (res.code == 0) {
        let info = res.data
        this.recordsList = [...this.recordsList, ...info]
        this.recordsList.forEach((item) => {
          if (item.albx7004) {
            item.albx7004 = item.albx7004.split('.')[0]
          }
        })
        if (info.length < this.pageSize) {
          this.isMore = true
        } else {
          this.isMore = false
        }
      } else {
        this.isMore = true
      }
    },
    lodeMore() {
      if (!this.recordsList.length) {
        this.pageNum = 1
      } else {
        this.pageNum++
      }
      this.getSignlist()
    },
    onRefresh() {
      //下拉刷新
      setTimeout(() => {
        this.recordsList = []
        this.pageNum = 1
        this.isMore = false //加载更多
        this.projectInfo = {}
        this.getData()
        this.isLoading = false
      }, 2000)
    },
  },
}
</script>
<style lang="scss" scoped>
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
    margin-bottom: 0.5rem;

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

  &-records {
    border-top: 1px solid #eeeeee;

    li {
      padding: 1.6rem 0 1.75rem;
      border-bottom: 1px solid #eeeeee;

      div {
        display: flex;
        align-items: center;
        font-family: 微软雅黑;
        font-size: 1.4rem;

        img {
          width: 1.4rem;
          margin-right: 0.9rem;
        }
      }
    }
    &-location {
      margin-top: 0.8rem;
      font-weight: 500;
      color: #999999;
    }
  }
}
</style>
