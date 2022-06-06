<template>
  <div class="page" style="background-color: #ffffff">
    <div class="header">
      <div class="header-prefix">
        <img src="@/assets/img/back.svg" alt="" class="page-back" @click="$router.go(-1)" />
      </div>
      <h2 class="header-title">选择签到项目</h2>
      <div class="header-suffix"></div>
    </div>
    <div v-show="ishaveproject == true" style="margin-top: 4.4rem; height: 100%">
      <section class="section plr-40 bg-white">
        <PullRefresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
          <div class="tab-view" id="tab-view1">
            <!-- 志愿者 -->
            <div class="tab-view-item active">
              <ul class="project-list">
                <li class="project-item" v-for="(item, index) in list" :key="index" @click="toSignIn(item)">
                  <div class="project-item-cover">
                    <!-- <img src="@/assets/img/imgsy/img27.png" alt="" /> -->
                    <img v-if="item.fileid" :src="item.fileid" alt="" />
                    <img v-else :src="require('@/assets/img/imgsz/albx' + item.albx0009 + '.png')" alt="" />
                    <div class="project-item-cover-title">
                      {{ item.albx0003 }}
                    </div>
                  </div>
                  <div class="project-item-main">
                    <a class="project-item-title">{{ item.albx0002 }}</a>
                    <ul class="project-item-info">
                      <li>
                        加入时间：<span>{{ item.albx0055 ? item.albx0055.substring(0, 11) : '' }}</span>
                      </li>
                    </ul>
                    <ul class="project-item-info mt-10">
                      <li>
                        服务时长：<span>{{ item.albx0083 ? item.albx0083 : '0' }}小时</span>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="flex-h t-c v-m" v-show="!isLoading" style="margin-top: 0.5rem">
            <!-- <span class="text info" size="default" v-if="isMore"
              >没有更多了</span
            > -->
          </div>
        </PullRefresh>
      </section>
    </div>
    <div v-show="ishaveproject == false" style="margin: auto 0">
      <section class="section p-40 mt-20 bg-white flex-v t-c" style="height: 100%">
        <PullRefresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功" style="height: 100%">
          <div class="data-null">
            <img src="@/assets/img/imgsy/null1.svg" alt="" />
            <span>暂时还没有签到项目哦～</span>
          </div>
          <a @click="toproject" href="javascript:void(0);" class="button danger-gradient mt-100" type="danger">立即参加项目</a>
        </PullRefresh>
      </section>
    </div>
  </div>
</template>
<script>
import { PullRefresh } from 'vant'
export default {
  components: { PullRefresh },
  data() {
    return {
      getuserInfo: this.$store.getters.getuserInfo, //用户信息
      active: 1,
      loading: true,
      list: [],
      ishaveproject: true, //当前用户是否存在可以签到的项目
      pageNow: 1,
      pageSize: 40,
      isMore: false, //数据是否已经全部加载了 true是 false不是
      isLoading: false,
    }
  },
  mounted() {
    // this.utilscommit.wetchat({ title: '欢迎加入中国志愿服务', desc: '“益”路有你 志愿同行', link: window.location.origin })

    if (this.$store.getters.getLoginStatus) {
      this.getData()
    } else {
      Toast('您还没有登录，无法进行当前操作!')
      this.$router.push('/login')
    }
  },
  methods: {
    toproject() {
      this.$router.push('/volunteerProjectapi')
      //跳转到对应区域的项目页面
      // this.commonRouter.toProList()
    },
    toSignIn(item) {
      //sessionStorage.setItem("projectInfo", JSON.stringify(item));
      this.$router.push(`/signInTheProjectapi/${item.id}/${item.areaid}/${item.albx0011}`)
    },
    getData() {
      //获取列表
      let data = {
        volid: this.$store.getters.getshare.loginid,
        pageNow: this.pageNow,
        pageSize: this.pageSize,
        //type: 2,
      }
      //debugger
      this.utilscommit.requestapi(
        //获取数据
        'getProjectFortisH5',
        { cardno: this.getuserInfo.albp0005 },
        this.back
      )
    },
    back(res) {
      //列表返回

      if (res.code == 0 && res.data.data.length > 0) {
        let info = res.data.data

        info.forEach((item, index, array) => {
          if (item.albx0009) {
            if (item.albx0009.split(',')[1]) {
              item.albx0009 = item.albx0009.split(',')[0]
            }
            if (item.albx0009 == '3201' || item.albx0009 == '3202' || item.albx0009 == '3203' || item.albx0009 == '3204') {
              item.albx0009 = '0099'
            }
            return item
          } else {
            item.albx0009 = '0099'
          }
          return item
        })

        this.list = [...this.list, ...info]
        if (info.length < this.pageSize) {
          this.isMore = true
        } else {
          this.isMore = false
        }
      } else {
        this.ishaveproject = false
        this.isMore = true
      }
    },
    lodeMore() {
      if (!this.list.length) {
        this.pageNow = 1
      } else {
        this.pageNow++
      }
      this.getData()
    },
    onRefresh() {
      //下拉刷新
      this.list = []
      this.ishaveproject = true
      this.pageNow = 1
      this.isMore = false
      setTimeout(() => {
        this.isLoading = false
        this.getData()
      }, 1000)
    },
  },
}
</script>
<style scoped>
.van-tab--active {
  font-weight: bolder;
}
</style>
