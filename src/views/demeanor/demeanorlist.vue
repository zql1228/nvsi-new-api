<template>
  <div class="page">
    <header class="header">
      <div class="header-prefix">
        <a class="flex-h v-m" href="javascript:void(0);" @click="$router.go(-1)">
          <img style="margin-right: 0.5rem" src="@/assets/img/back.svg" alt="" class="page-back" />
        </a>
      </div>
      <h1 class="header-title" style="text-align: left; padding-left: 3rem">
        志愿风采
      </h1>
      <div class="header-suffix"></div>
    </header>

    <ul class="tabbox type2" style="margin-top: 4.4rem">
      <li :class="[fly == '1' && 'active']" @click="switchs(1)">志愿者</li>
      <li :class="[fly == '2' && 'active']" @click="switchs(2)">志愿队伍</li>
      <li :class="[fly == '3' && 'active']" @click="switchs(3)">志愿项目</li>
      <li :class="[fly == '4' && 'active']" @click="switchs(4)">志愿社区</li>
    </ul>
    <section class="section pb-40 mt-20 bg-white">
      <div class="tab-view" id="tab-view1">
        <!-- 志愿者 -->
        <div class="tab-view-item" :class="[fly == '1' && 'active']">
          <ul class="announcement-list type2">
            <!-- <notice-bar  scrollable
  left-icon="volume-o"
  text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"/> -->

            <li class="announcement flex-h" v-for="(itrm, i) in data2" :key="i" @click="toOrderDetail(itrm.id)">
              <div class="flex-v flex-1">
                <a class="announcement-title">{{ itrm.title }}</a>
                <div class="announcement-info">
                  <span class="announcement-info-text">{{ itrm.entrytime ? itrm.entrytime.slice(0, 10) : '' }}</span>
                </div>
              </div>
              <img class="announcement-cover ml-16" :src="common.changeImgsrc(itrm.imgtitle, 1)" :onerror="defaultImg" alt="" />
              <!-- <img v-else class="announcement-cover ml-16" src="@/assets/img/imgsy/img28.png" alt="" /> -->
            </li>
          </ul>
        </div>
        <!-- 志愿队伍 -->
        <div class="tab-view-item" :class="[fly == '2' && 'active']">
          <ul class="announcement-list type2">
            <li class="announcement flex-h" v-for="(itrm, i) in data2" :key="i" @click="toOrderDetail(itrm.id)">
              <div class="flex-v flex-1">
                <a class="announcement-title">{{ itrm.title }}</a>
                <div class="announcement-info">
                  <span class="announcement-info-text">{{ itrm.entrytime ? itrm.entrytime.slice(0, 10) : '' }}</span>
                </div>
              </div>
              <img class="announcement-cover ml-16" :src="common.changeImgsrc(itrm.imgtitle, 1)" :onerror="defaultImg" alt="" />
            </li>
          </ul>
        </div>
        <!-- 志愿项目 -->
        <div class="tab-view-item" :class="[fly == '3' && 'active']">
          <ul class="announcement-list type2">
            <li class="announcement flex-h" v-for="(itrm, i) in data2" :key="i" @click="toOrderDetail(itrm.id)">
              <div class="flex-v flex-1">
                <a class="announcement-title">{{ itrm.title }}</a>
                <div class="announcement-info">
                  <span class="announcement-info-text">{{ itrm.entrytime ? itrm.entrytime.slice(0, 10) : '' }}</span>
                </div>
              </div>
              <img class="announcement-cover ml-16" :src="common.changeImgsrc(itrm.imgtitle, 1)" :onerror="defaultImg" alt="" />
            </li>
          </ul>
        </div>
        <!-- 志愿社区 -->
        <div class="tab-view-item" :class="[fly == '4' && 'active']">
          <ul class="announcement-list type2">
            <li class="announcement flex-h" v-for="(itrm, i) in data2" :key="i" @click="toOrderDetail(itrm.id)">
              <div class="flex-v flex-1">
                <a class="announcement-title">{{ itrm.title }}</a>
                <div class="announcement-info">
                  <span class="announcement-info-text">{{ itrm.entrytime ? itrm.entrytime.slice(0, 10) : '' }}</span>
                </div>
              </div>
              <img class="announcement-cover ml-16" :src="common.changeImgsrc(itrm.imgtitle, 1)" :onerror="defaultImg" alt="" />
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
<style scoped>
.notice-swipe {
  height: 1.6rem;
  line-height: 1.6rem;
}
</style>
<script>
import '@/assets/js/jquery-3.5.1.min.js'

export default {
  data() {
    return {
      defaultImg: 'this.src="' + require("@/assets/img/imgsy/img28.png") + '"',
      fly: 1, //页面类别1志愿者2志愿队伍3志愿项目4志愿社区
      hasMore: true, //加载更多
      //分页
      data1: {},
      data2: {}, //
      pageNow: 0, //当前页
      pageSize: 20, //页面条数
      endNum: 1,
      isLoading: false, //下拉刷新
      loading: false,
      finished: false,
      new: 1,
    }
  },
  mounted() {
    this.utilscommit.wetchat({ title: '志愿风采列表', desc: '立足新时代，展现新作为！点击查看更多', link: window.location.href })

    this.utilscommit.requestapix('getH5NewsNav', {}, this.provincesBack1)
    // this.utilscommit.request(
    //   'nvsi_jsVoluntaryStyle',
    //   {
    //     cloumnid: 'd7934d00bafb4e4b89dd8412227c5441',
    //     pagesize: this.pagesize,
    //     pagenow: 1,
    //   },
    //   this.provincesBack2
    // ) //列表接口没有传值默认第一个,传了切换
  },
  methods: {
    toOrderDetail(res) {
      //跳转
      let orderUuid = res
      Vue.$router.push({ name: 'demeanordetails', params: { id: orderUuid } })
    },
    switchs(res) {
      //切换页面
      this.fly = res
      this.information()
    },
    provincesBack1(res) {
      //请求的参数赋值
      console.log(res)
      if (res && res.data) {
        this.data1 = res.data
        this.information()
      }
    },
    provincesBack2(res) {
      //请求的参数赋值
      if (res && res.data) {
        this.data2 = res.data
      }
    },

    information() {
      //发送请求查找数据
      this.utilscommit.requestapix(
        'getH5NewsList',
        {
          resourcecode: this.data1[this.fly - 1].resourcecode,
          pagesize: this.pagesize,
          pagenow: this.pagenow,
        },
        this.provincesBack2
      ) //列表接口没有传值默认第一个,传了切换
    },
  },
}
</script>
>
