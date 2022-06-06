import Vue from 'vue'
import App from './App.vue'
import router from './router' //路由
import store from './store'
import utilscommit from './assets/js/utils.js' //请求路径
import sessionStorage from './assets/js/sessionStorage.js' //请求路径
import common from './assets/js/common.js' //公共方法基础包
import commonRouter from './assets/js/router.js' //跳转
import commonRequest from './assets/js/request.js' //请求
// import vue-axios from 'vue-axios'
import DatePicker from 'vue2-datepicker' //日期
import qs from 'qs' //qs库
import 'vue2-datepicker/locale/zh-cn' //中文-时间插件
require('!vue-style-loader!css-loader!../node_modules/vue2-datepicker/index.css')
import tip from '@/components/waiting' //加载中提示
import config from './assets/js/config.js' //公共配置
import { Icon } from 'vant'

Vue.use(Icon)
// Vue.use(VueAxios, axios)
Vue.use(DatePicker) //时间弹出层
Vue.config.productionTip = false
Vue.prototype.$qs = qs
Vue.prototype.common = common
Vue.prototype.utilscommit = utilscommit
Vue.prototype.commonRouter = commonRouter
Vue.prototype.commonRequest = commonRequest
Vue.prototype.sessionStorage = sessionStorage
Vue.component('tip', tip) //加载中提示-全局组件
Vue.prototype.config = config.data

Vue.filter('ellipsisNos', function(value, num) {
  //文本过滤
  if (!value) return ''
  if (value.length > num) {
    return value.slice(0, num)
  }
  return value
})

Vue.filter('ellipsis', function(value, num) {
  //文本过滤，多余部分加省略号
  if (!value) return ''
  if (value.length > num) {
    return value.slice(0, num) + '...'
  }
  return value
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
