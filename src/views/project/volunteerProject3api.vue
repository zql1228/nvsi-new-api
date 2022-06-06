<template>
  <div class="page">
    <header class="header" style="z-index: 1">
      <div class="header-prefix">
        <a class="flex-h v-m" href="javascript:void(0);" @click="$router.go(-1)">
          <img style="margin-right: 0.5rem" src="@/assets/img/back.svg" alt="" class="page-back" />
        </a>
      </div>
      <h1 class="header-title" style="text-align: left; padding-left: 3rem">
        岗位选择
      </h1>
      <div class="header-suffix"></div>
    </header>
    <section class="section mt-20 bg-white" style="margin-top: 4.4rem">
      <ul class="post-list">
        <li class="post-item" v-for="(item, index) in posts" :key="index">
          <div class="post-item-check" :class="[selectActive == index && 'active']" @click="changeSelect(index)"></div>
          <h2 class="post-item-title">{{ item.albx0072 }}</h2>
          <dl class="post-item-info">
            <dt>岗位描述：</dt>
            <dd style="max-width: 20rem;">{{ item.albx0074 }}</dd>
          </dl>
          <dl class="post-item-info">
            <dt>岗位条件：</dt>
            <dd style="max-width: 20rem;">{{ item.albx0075 }}</dd>
          </dl>
          <ul class="post-item-hc">
            <li>
              <p>{{ item.albx0079 }}</p>
              <span>已招募(人)</span>
            </li>
            <li>
              <p>{{ item.albx0077 }}</p>
              <span>计划招募(人)</span>
            </li>
          </ul>
        </li>
      </ul>
    </section>
    <footer class="footer" bg="white">
      <a @click="joinProject()" href="javascript:void(0);" class="button danger-gradient" type="danger" span="24" id="btn1">我要报名</a>
    </footer>
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  components: { Dialog },
  data() {
    return {
      getuserInfo: this.$store.getters.getuserInfo, //用户信息
      id: this.$route.params.id, //项目id
      aid: this.$route.params.aid, //项目id
      // albp0054:this.$route.params.data,
      posts: [], //岗位列表
      // certification: true,
      selectActive: 0,
    }
  },
  mounted() {
    // this.utilscommit.wetchat({ title: '欢迎加入中国志愿服务', desc: '“益”路有你 志愿同行', link: window.location.origin })
    this.getData()
  },
  methods: {
    getData() {
      //获取岗位列表
      let data = {
        albx0021: this.aid,
        proId: this.id,
      }

      this.utilscommit.requestapi(
        //项目岗位
        'ProjectPostFortisH5',
        data,
        this.getBack
      )
    },
    getBack(res) {
      //岗位列表 返回
      console.log(res)
      if (res.code == 0) {
        this.posts = res.data
      }
    },
    changeSelect(item) {
      //点击位置
      this.selectActive = item * 1
      console.log(this.selectActive)
    },

    joinProject() {
      //加入项目

      let data = {
        areaid: this.aid, //项目区域id
        postid: this.posts[this.selectActive].id, //岗位id
        projectid: this.id, //项目id
        volAreaId: this.getuserInfo.albp0020, //志愿者服务区域
        volunteerid: this.getuserInfo.albp0029, //志愿者编号
        voltime:this.getuserInfo.albp0089,//志愿者服务时长
        operatetype: null,
      }
      if (this.$route.params.mima != 'false') {
        data.password = this.$route.params.mima
      }
      debugger
      this.utilscommit.requestapi(
        //加入项目
        'getVolOperateProjectFortisH5',
        data,
        this.joinProjectBack
      )
    },
    joinProjectBack(res) {
      console.log(res, '返回信息')
      if (res.code == 0) {
        Dialog.alert({
          message: '报名成功',
          theme: 'round-button',
        }).then(() => {
          //  this.commonRouter.tovolProject(this.id);
          this.$router.go(-1)
        })
      } else {
        if(res.message=="岗位信息为空"){
           res.message="岗位报名失败"
        }
        Dialog.alert({
          message: res.message,
          theme: 'round-button',
        }).then(() => { location.reload()})
      }
    },
  },
}
</script>

<style lang="scss">
@import "@/assets/css/page.scss";

.post-item {
  margin-bottom: 1.5rem;
  background: #fff;
  border-radius: 0.5rem;
  box-shadow: 0px 0.15rem 0.5rem rgba(0, 0, 0, 0.07);
  &-info {
    position: relative;
    padding: 1.5rem;
    &::after {
      @include mock-border;
      top: auto;
      bottom: 0;
    }
    .flex-h {
      h4 {
        font-size: 1.6rem;
        color: #333;
        font-weight: bold;
      }
    }
    dl {
      margin-top: 0.9rem;
      dt {
        font-size: 1.4rem;
        color: #999;
      }
      dd {
        font-size: 1.4rem;
        color: #333;
      }
    }
  }
  &-data {
    display: flex;
    align-items: center;
    height: 6rem;
    li {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span {
        font-size: 2.1rem;
        color: $color-primary;
      }
    }
  }
}
</style>
