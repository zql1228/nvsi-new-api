<template>
  <div class="page">
    <header class="header">
      <div class="header-prefix">
        <a class="flex-h v-m" href="javascript:void(0)" @click="$router.go(-1)">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-point-left"></use>
          </svg>
        </a>
      </div>
      <h1 class="header-title">志愿者名片</h1>
      <div class="header-suffix"></div>
    </header>
    <section class="section bg-white">
      <div class="calling-card">
        <div class="flex-v">
          <img
            class="calling-card-avatar"
            :src="avatar"
            @error="common.imgError($event, require('../..//assets/img/imgsy/avatar_girl.svg'))"
            alt=""
          />
          <h2 class="calling-card-name" v-text="info.albp0003"></h2>
          <p class="calling-card-slogan">志在,愿在,城市有你更精彩</p>
        </div>
        <div class="calling-card-panel">
          <div class="calling-card-panel-head">
            <h3>我的星级</h3>
          </div>
          <ul class="calling-card-list">
            <li>
              <div class="flex-1">
                <div class="stars">
                  <b v-for="(item, index) in icons" :key="index">
                    <img :src="require('@/assets/img/imgsy/' + item)" alt="" />
                  </b>
                </div>
              </div>
              <p class="calling-card-list-num" v-text="info.albp0026 ? info.albp0026 + '.0' : ''"></p>
            </li>
          </ul>
        </div>
        <div class="calling-card-panel">
          <div class="calling-card-panel-head">
            <h3>我的公益时数</h3>
          </div>
          <ul class="calling-card-list">
            <li>
              <img
                class="calling-card-list-icon"
                src="@/assets/img/imgsy/icon43.svg"
                alt=""
                style="box-shadow: 0 .075rem .5rem rgba(219, 0, 0, .15);"
              />
              <span class="calling-card-list-label">服务时数</span>
              <p class="calling-card-list-num" v-text="info.albp0089 ? info.albp0089 : '0'"></p>
            </li>
            <li>
              <img
                class="calling-card-list-icon"
                src="@/assets/img/imgsy/icon44.svg"
                alt=""
                style="box-shadow: 0 .075rem .15rem rgba(5, 171, 255,.15);"
              />
              <span class="calling-card-list-label">培训时数</span>
              <p class="calling-card-list-num" v-text="0"></p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      idcard: this.$store.getters.getshare.idcard,
      info: {},
      avatar: '', //头像
    }
  },
  mounted() {
    this.utilscommit.wetchat({ title: '欢迎加入中国志愿服务', desc: '“益”路有你 志愿同行', link: window.location.origin })
    this.utilscommit.request('nvsi_jsVolunteerOwnInfo', { idCard: this.idcard }, this.back)
  },
  methods: {
    back(res) {
      if (this.info.albp0026) {
        //星级
        for (var i = 0; i < this.info.albp0026; i++) {
          this.icons[i] = 'star_4_active.svg'
        }
        for (var j = 0; j < 5 - this.info.albp0026; j++) {
          this.icons[5 - j - 1] = 'star_4.svg'
        }
      } else {
        for (var i = 0; i < 5; i++) {
          this.icons[i] = 'star_4.svg'
        }
      }
      if (res.code == 0) {
        this.info = res.data
        if (!res.data.albp0026) {
          this.info.albp0026 = ''
        }
        if (!res.data.idcard) res.data.idcard = this.idcard
        this.$store.commit('changeuserInfo', res.data)
        this.init()
      } else {
        swal(res.message, { button: '确定' })
      }
    },
    init() {
      //初始化

      if (this.info.albp0027) {
        //头像
        this.avatar =
          this.common.context() + '/LEAP/Download/' + JSON.parse(this.info.albp0027).nameedpath + '/' + JSON.parse(this.info.albp0027).name
      }
      if (this.info.albp0083) {
        //志愿者证
        this.volCard =
          this.common.context() + '/LEAP/Download/' + JSON.parse(this.info.albp0083).nameedpath + '/' + JSON.parse(this.info.albp0083).name
      }
    },
  },
}
</script>
