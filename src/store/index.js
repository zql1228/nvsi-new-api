import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged: false, //是否已注册登录
    regInfo: {}, //注册的志愿者信息
    regGroupInfo: {}, //注册的志愿团体信息
    userInfo: {}, //用户信息
    region: {}, //服务区域
    share: {}, //共享信息
    xlogin: {}, //账号密码缓存
    registration: {}, //注册缓存
    save: 1, //项目管理,队伍管理tab保存
    appeal: {}, //申诉数据保存
    servetype: {}, //保存ServeType页面的参数
  },
  getters: {
    getservetype(state) {
      return state.servetype //  获取最新的数据this.$store.getters.getservetype
    },
    //获取最新的数据--实时监听
    getappeal(state) {
      return state.appeal //  获取最新的数据 this.$store.getters.getappea
    },
    //获取最新的数据--实时监听
    getlogin(state) {
      return state.xlogin //  获取最新的数据 this.$store.getters.getlogin
    },
    getshare(state) {
      //  获取最新的数据 this.$store.getters.getshare
      return state.share
    },
    getLoginStatus(state) {
      //  获取最新的数据 this.$store.getters.getLoginStatus
      return state.logged
    },
    getRegInfo(state) {
      //  获取最新的数据 this.$store.getters.getRegInfo
      return state.regInfo
    },
    getRegGroupInfo(state) {
      return state.regGroupInfo
    },
    getuserInfo(state) {
      return state.userInfo //  获取最新的数据 this.$store.getters.getuserInfo
    },
    getregion(state) {
      return state.region //  获取最新的数据 this.$store.getters.getregion
    },
    getsave(state) {
      return state.save //  获取最新的数据 this.$store.getters.getsave
    },
  },
  mutations: {
    changservetype(state, tag) {
      state.servetype = tag
    },
    changappeal(state, tag) {
      //  调用该方法 this.$store.commit('changappeal',data)
      state.appeal = tag
    },

    changsave(state, tag) {
      //  调用该方法 this.$store.commit('changsave',data)
      state.save = tag
    },
    // 改变登录状态
    changeshares(state, tag) {
      //  调用该方法 this.$store.commit('changeshares',data)
      state.share = tag
    },
    changeLoginStatus(state, tag) {
      //  调用该方法 this.$store.commit('changeLoginStatus',data)
      state.logged = tag
    },
    changeRegInfo(state, info) {
      //  调用该方法 this.$store.commit('changeRegInfo',data)
      state.regInfo = info
    },
    changeRegGroupInfo(state, info) {
      //  调用该方法 this.$store.commit('changeRegGroupInfo',data)
      state.regGroupInfo = info
    },
    changeuserInfo(state, info) {
      //  调用该方法 this.$store.commit('changeuserInfo',data)
      state.userInfo = info
    },
    changeregion(state, info) {
      //  调用该方法 this.$store.commit('changeregion',data)
      state.region = info
    },
    changelogin(state, info) {
      // //  调用该方法 this.$store.commit('changelogin',data)
      state.xlogin = info
    },
  },
  actions: {},
  modules: {},
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
})
