import Vue from 'vue'
import Router from 'vue-router' //路由
import Home from '../views/Home.vue' //首页

Vue.use(Router)

const routes = [
  {
    path: '/demeanordetailsapp/:id',
    name: 'demeanordetailsapp',
    component: () => import('../views/demeanor/demeanordetailsapp.vue'),
    meta: { title: '文章详细' },
  },
  {
    path: '/loadapp',
    name: 'loadapp',
    component: () => import('../views/wx/loadapp.vue'),
    meta: { title: 'loadapp' },
  },
  {
    path: '/pdfapp',
    name: 'pdfapp',
    component: () => import('../views/wx/pdfapp.vue'),
    meta: { title: 'pdf' },
  },
  {
    path: '/managementapi',
    name: 'managementapi',
    component: () => import('../views/usercenter/managementapi.vue'),
    meta: { title: '权限管理' },
  },
  {
    path: '/basiczapi', // 基本信息
    name: 'Basiczapi',
    component: () => import('../views/usercenter/Basiczapi.vue'),
    meta: { title: '个人中心志愿者证' },
  },
  {
    path: '/jumpx2',
    name: '/jumpx2',
    component: () => import('../views/wx/jumpx2.vue'),
    meta: { title: '微信跳转2' },
  },
  {
    path: '/jump2',
    name: '/jump2',
    component: () => import('../views/wx/jump2.vue'),
    meta: { title: '微信跳转2' },
  },
  {
    path: '/jumpx',
    name: '/jumpx',
    component: () => import('../views/wx/jumpx.vue'),
    meta: { title: '微信跳转' },
  },
  {
    path: '/jump',
    name: '/jump',
    component: () => import('../views/wx/jump.vue'),
    meta: { title: '微信跳转' },
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '首页' },
  },
  {
    path: '/bindingapi',
    name: 'bindingapi',
    component: () => import('../views/regist/bindingapi.vue'),
    meta: { title: '账号微信绑定' },
  },
  {
    path: '/findpwddapi',
    name: 'findpwddapi',
    component: () => import('../views/regist/findpwddapi.vue'),
    meta: { title: '账号申诉' },
  },
  {
    path: '/findpwdapi',
    name: 'findpwdapi',
    component: () => import('../views/regist/findPwdapi.vue'),
    meta: { title: '账号申诉' },
  },
  {
    path: '/progressapi',
    name: 'progressapi',
    component: () => import('../views/regist/progressapi.vue'),
    meta: { title: '申诉进度查询' },
  },
  {
    path: '/appealapi1', // 申诉一
    name: 'Apealapi1',
    component: () => import('../views/regist/appealapi1.vue'),
    meta: { title: '申诉一' },
  },
  {
    path: '/appealapi3', // 申诉二
    name: 'Apealapi3',
    component: () => import('../views/regist/appealapi3.vue'),
    meta: { title: '申诉三' },
  },
  {
    path: '/appealapi2', // 申诉二
    name: 'Apealapi2',
    component: () => import('../views/regist/appealapi2.vue'),
    meta: { title: '申诉二' },
  },
  {
    path: '/basicapi', // 基本信息
    name: 'Basicapi',
    component: () => import('../views/usercenter/Basicapi.vue'),
    meta: { title: '个人中心' },
  },
  {
    path: '/joinTeamapi', //加入团体
    name: 'joinTeamapi',
    component: () => import('../views/usercenter/joinTeamapi.vue'),
    meta: { title: '个人中心' },
  },
  {
    path: '/appliedProjectapi', //项目管理
    name: 'appliedProjectapi',
    component: () => import('../views/usercenter/appliedProjectapi.vue'),
    meta: { title: '个人中心' },
  },
  {
    path: '/centerapi', //个人中心
    name: 'Centerapi',
    component: () => import('../views/usercenter/Centerapi.vue'),
    meta: { title: '个人中心' },
  },
  {
    path: '/signInProjectsapi', // 签到项目列表 选择签到项目页面
    name: 'SignInProjectsapi',
    component: () => import('../views/clockIn/SignInProjectsapi.vue'),
    meta: { title: '项目签到' },
  },
  {
    path: '/groupapi', //志愿团体
    name: 'Groupapi',
    component: () => import('../views/group/Groupapi.vue'),
    meta: { title: '志愿团体' },
  },
  {
    path: '/groupdetailapi/:id/:aid', //队伍详情
    name: 'GroupDetailapi',
    component: () => import('../views/group/GroupDetailapi.vue'),
    meta: { title: '志愿团体' },
  },
  {
    path: '/Loginapi', //登录
    name: 'Loginapi',
    component: () => import('../views/regist/Loginapi.vue'),
    meta: { title: '登录' },
  },
  {
    path: '/group-infoapi/:id/:aid', //队伍简洁
    name: 'GroupInfoapi',
    component: () => import('../views/group/GroupInfoapi.vue'),
    meta: { title: '团体详情' },
  },
  {
    path: '/volunteerProjectapi', //志愿项目
    name: 'volunteerProjectapi',
    component: () => import('../views/project/volunteerProjectapi.vue'),
    meta: { title: '志愿项目' },
  },
  {
    path: '/volunteerProject1api/:id/:aid', //志愿项目详情
    name: 'volunteerProject1api',
    component: () => import('../views/project/volunteerProject1api.vue'),
    meta: { title: '志愿项目' },
  },
  {
    path: '/volunteerProject4api/:id/:aid', //项目介绍
    name: 'volunteerProject4api',
    component: () => import('../views/project/volunteerProject4api.vue'),
    meta: { title: '志愿项目' },
  },
  {
    path: '/volunteerProject3api/:id/:mima/:aid', //志愿项目3
    name: 'volunteerProject3api',
    component: () => import('../views/project/volunteerProject3api.vue'),
    meta: { title: '志愿项目' },
  },
  {
    path: '/signInTheProjectapi/:id/:aid/:did', // 签到 打卡
    name: 'SignInTheProjectapi',
    component: () => import('../views/clockIn/SignInTheProjectapi.vue'),
    meta: { title: '项目签到' },
  },
  {
    path: '/signInRecordsapi/:id/:aid', // 签到记录
    name: 'SignInRecordsapi',
    component: () => import('../views/clockIn/SignInRecordsapi.vue'),
    meta: { title: '项目签到记录' },
  },
  {
    path: '/individual-registrationapi', //个人注册 第 1 步
    name: 'IndividualRegistrationapi',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/regist/IndividualRegistrationapi.vue'),
    meta: { title: '志愿者注册' },
  },
  {
    path: '/individual-registration2api', //个人注册 第 2 步
    name: 'IndividualRegistration2api',
    component: () => import('../views/regist/IndividualRegistration2api.vue'),
    meta: { title: '志愿者注册' },
  },
  {
    path: '/group-projectapi/:id/:aid', //队伍项目
    name: 'GroupProjectapi',
    component: () => import('../views/group/GroupProjectapi.vue'),
    meta: { title: '志愿团体' },
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home,
  //   meta: { title: '首页' },
  // },
  // {
  //   path: '/login', //登录
  //   name: 'Login',
  //   component: () => import('../views/regist/Login.vue'),
  //   meta: { title: '登录' },
  // },
  {
    path: '/propwd/:id',
    name: 'proPwd',
    component: () => import('../views/regist/proPwd.vue'),
    meta: { title: '申诉进度查询2' },
  },
  {
    path: '/progress',
    name: 'progress',
    component: () => import('../views/regist/progress.vue'),
    meta: { title: '申诉进度查询' },
  },

  {
    path: '/privacy',
    name: 'privacy',
    component: () => import('../views/regist/privacy.vue'),
    meta: { title: '隐私退款' },
  },
  {
    path: '/registe',
    name: 'registe',
    component: () => import('../views/regist/registe.vue'),
    meta: { title: '注册协议' },
  },
  {
    path: '/demeanordetails/:id',
    name: 'demeanordetails',
    component: () => import('../views/demeanor/demeanordetails.vue'),
    meta: { title: '文章详细' },
  },
  {
    path: '/demeanorlist',
    name: 'demeanorlist',
    component: () => import('../views/demeanor/demeanorlist.vue'),
    meta: { title: '风采详细' },
  },

  {
    path: '/checkedInProject', //已签到项目
    name: 'checkedInProject',
    component: () => import('../views/project/checkedInProject.vue'),
    meta: { title: '志愿项目' },
  },

  {
    path: '/volunteerCode', //志愿者证
    name: 'volunteerCode',
    component: () => import('../views/usercenter/volunteerCode.vue'),
    meta: { title: '个人中心' },
  },
  {
    path: '/setup', //设置
    name: 'setup',
    component: () => import('../views/usercenter/setUp.vue'),
    meta: { title: '设置' },
  },
  {
    path: '/addressCard', //设置
    name: 'addressCard',
    component: () => import('../components/addressCard.vue'),
    meta: { title: 'tab' },
  },
  {
    path: '/changePassword', //修改密码
    name: 'changePassword',
    component: () => import('../views/usercenter/changePassword.vue'),
    meta: { title: '忘记密码' },
  },

  {
    path: '/fixedphone', // 固定电话
    name: 'Fixedphone',
    component: () => import('../views/usercenter/Fixedphone.vue'),
    meta: { title: '电话号码' },
  },
  {
    path: '/businesscard', //志愿名片
    name: 'businesscard',
    component: () => import('../views/usercenter/Businesscard.vue'),
    meta: { title: '志愿名片' },
  },
  {
    path: '/input-face', // 面部录入
    name: 'InputFace',
    component: () => import('../views/usercenter/InputFace.vue'),
    meta: { title: '个人中心' },
  },
  {
    path: '/upload-face', // 上传人脸照片
    name: 'UploadFace',
    component: () => import('../views/usercenter/UploadFace.vue'),
    meta: { title: '个人中心' },
  },
  {
    path: '/nickname', // 昵称
    name: 'Nickname',
    component: () => import('../views/usercenter/Nickname.vue'),
    meta: { title: '个人中心' },
  },
  {
    path: '/manifesto', // 公益宣言
    name: 'Manifesto',
    component: () => import('../views/usercenter/Manifesto.vue'),
    meta: { title: '个人中心' },
  },
  {
    path: '/serveType', // 服务类别
    name: 'ServeType',
    component: () => import('../views/usercenter/ServeType.vue'),
    meta: { title: '个人中心' },
  },
  {
    path: '/serviceTime', // 服务时间
    name: 'ServiceTime',
    component: () => import('../views/usercenter/serviceTime.vue'),
    meta: { title: '个人中心' },
  },
  {
    path: '/projectShare/:proId/:areaid',
    name: 'ProjectShare',
    component: () => import('../views/ProjectShare.vue'),
    meta: { title: '分享项目' },
  },
  {
    path: '/groupShare/:groupId/:areaid',
    name: 'GroupShare',
    component: () => import('../views/GroupShare.vue'),
    meta: { title: '分享队伍' },
  },
]

//解决路由设置报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

//设置初始地址重定向
routes.push({
  path: '',
  redirect: (to) => {
    var path = {
      name: 'home', //别名
    }
    return path
  },
})

const router = new Router({
  mode: 'history',
  base: '/nvsidfh5',
  routes,
})

router.beforeEach((to, from, next) => {
  //GroupDetail
  // debugger
  //volunteerProject1
  //demeanordetails
  //demeanorlist

  // if (to.name != 'GroupDetail' && to.name != 'volunteerProject1' && to.name != 'demeanordetails' && to.name != 'demeanorlist') {
  //   wetchat({ title: '欢迎加入中国志愿服务', desc: '“益”路有你 志愿同行', link: window.location.href })
  // }
  if (to.fullPath == '/findPwdapi' && from.fullPath == '/') {
    /* 路由发生变化修改页面title */
    next(false)
  } else if (to.fullPath == '/setup' && from.fullPath == '/') {
    /* 路由发生变化修改页面title */
    next(false)
  } else {
    if (to.fullPath == '/setup' && from.fullPath == '/Loginapi') {
      next('/')
    } else {
      if (to.meta.title) {
        // document.title = to.meta.title;
        document.title = '志愿服务'
      }
      next()
    }
  }
})

export default router
