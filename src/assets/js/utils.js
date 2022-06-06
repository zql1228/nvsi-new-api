import axios from 'axios'
// const context =function(){// type-->1=调用江苏的生产服务
//   var pathname = window.location.pathname;
//   var context= "/apis/NVSI";//联调本地环境-李启云
//   // if(pathname!="/")context='https://chinavolunteer.mca.gov.cn/NVSI';//服务器生产环境
//   if(pathname!="/")context='https://wuhan.yxybb.com/NVSI';//服务器 --测试
//   return context;
//   // return 'http://192.168.6.157:8003/NVSI'//本地-李启云
//   // return 'https://wuhan.yxybb.com/NVSI'//测试
//   // return 'https://chinavolunteer.mca.gov.cn/NVSI'//生产
// }

const getApiPreFix = () => {
  return process.env.VUE_APP_API_PREFIX + process.env.VUE_APP_CONTEXT
}

function context() {
  var pathname = window.location.pathname
  var context = getApiPreFix() //开发环境vscode
  //if(pathname!="/")context=pathname.substring(0, pathname.substr(1).indexOf('/') + 1);//生产环境--打包之后的调用地址
  return context
  // var host = window.location.host;
  // var context="/apis/NVSI";//开发环境vscode
  // if(host.slice(0,host.lastIndexOf('.'))!="192.168.6"){//生产环境--打包之后的调用地址
  //   context=window.location.origin+'/NVSI'
  // }
  //return context;
}

const context1 = function(type) {
  // type-->1=调用江苏的生产服务
  var pathname = window.location.pathname
  var context = '/apis/NVSIDF' //联调h5生产环境(江苏)
  if (pathname != '/' && type == 1) context = pathname.substring(0, pathname.substr(1).indexOf('/') + 1) //服务器生产环境
  return context
}

const userrequest = function(ticket, callback) {
  //用户数据请求
  let param = new FormData()
  param.append('key', '5d1066cfd9964b188ee6b700a72ba3bd')
  param.append('secret', 'c3ada42fc0f1e9bd86f8df8d4b2cf403')
  param.append('ticket', ticket)
  axios.post(context1(1) + '/interfaces/UserAuth/verifyTicket.do', param).then((res) => {
    if (res.data.result) {
      let param1 = new FormData()
      param1.append('key', '5d1066cfd9964b188ee6b700a72ba3bd')
      param1.append('secret', 'c3ada42fc0f1e9bd86f8df8d4b2cf403')
      param1.append('token', res.data.token)
      axios.post(context1(1) + '/interfaces/UserAuth/verifyToken.do', param1).then((data) => {
        callback(data)
      })
    }
  })
}

//发送请求 -发送请求
const request_only = function(bean, callback) {
  if (null != bean) {
    var vueParam = { bean: JSON.stringify({ encryData: getSM4().encrypt(JSON.stringify(bean)) }) } //sm4_cdc加密
    bean = JSON.stringify(vueParam)
  }
  let sign = ''
  let data = new Date().getTime()
  let config = {
    headers: { 'Content-Type': 'multipart/form-data' },
  }
  let param = new FormData()
  let interface_id = 'JS'
  param.append('app_id', 'zyfw')
  param.append('interface_id', interface_id)
  param.append('version', '1.0.0')
  param.append('charset', 'utf-8')
  param.append('head', "{'Content-Type':'form-data'}")
  param.append('biz_content', bean)
  param.append('timestamp', data)
  param.append('origin', '1')
  axios.post('http://221.226.253.51:28080/jimp/sign/createsign.do', param, config).then((res) => {
    sign = res.data
    let param1 = new FormData()
    param1.append('app_id', 'zyfw')
    param1.append('interface_id', interface_id)
    param1.append('version', '1.0.0')
    param1.append('charset', 'utf-8')
    param1.append('head', "{'Content-Type':'form-data'}")
    param1.append('biz_content', bean)
    param1.append('timestamp', data)
    param1.append('origin', '1')
    param1.append('sign', sign)
    axios.post('http://221.226.253.51:28080/gateway.do', param1).then((data) => {
      if (data && data.data) {
        if (data.data.code == 200) {
          callback(JSON.parse(data.data.data))
        } else {
          swal(data.data.msg, { button: '确定' })
        }
      } else {
        swal('失败', { button: '确定' })
      }
    })
  })
}

const request = function(name, bean, callbackAll) {
  //h5老接口
  /* let config = {
    headers:{'Content-Type':'multipart/form-data'}
  }; */
  // let param=''
  if (null != bean) {
    const vueParam = { bean: JSON.stringify({ encryData: getSM4().encrypt(JSON.stringify(bean)) }) } //sm4_cdc加密
    bean = Vue.$qs.stringify(vueParam)
    // bean=getSM4().encrypt(JSON.stringify(bean));//sm4_cdc加密
    // param = new FormData();
    // param.append('bean',bean)
  }

  //打包
  axios.post('/nvsidfh5apis/NVSIDF/restservices/h5/' + name + '/query', bean).then((res) => {
    callbackAll(res.data)
  })

  //本地
  // Vue.axios.post(context()+"/restservices/h5/"+name+"/query", bean).then(res => {
  //     callbackAll(res.data);
  //   });
}

const requestapi = function(name, bean, callbackAll) {
  if (null != bean) {
    const vueParam = { bean: JSON.stringify({ encryData: getSM4().encrypt(JSON.stringify(bean)) }) } //sm4_cdc加密
    bean = Vue.$qs.stringify(vueParam)
  }

  //打包
  axios.post('/nvsidfh5apis/NVSIDF/restservices/H5api/' + name + '/query', bean).then((res) => {
    callbackAll(res.data)
  })
}

const requestapix = function(name, bean, callbackAll) {
  if (null != bean) {
    const vueParam = { bean: JSON.stringify({ encryData: getSM4().encrypt(JSON.stringify(bean)) }) } //sm4_cdc加密
    bean = Vue.$qs.stringify(vueParam)
  }

  //打包
  axios.post('/nvsidfh5apis/NVSIDF/restservices/webrest/' + name + '/query', bean).then((res) => {
    callbackAll(res.data)
  })
}

const requestapiwebapi = function(name, bean, callbackAll) {
  if (null != bean) {
    const vueParam = { bean: JSON.stringify({ encryData: getSM4().encrypt(JSON.stringify(bean)) }) } //sm4_cdc加密
    bean = Vue.$qs.stringify(vueParam)
  }

  //打包
  axios.post('/nvsidfh5apis/NVSIDF/restservices/webapi/' + name + '/query', bean).then((res) => {
    callbackAll(res.data)
  })
}

const requestapic = function(name, bean, callbackAll) {
  if (null != bean) {
    const vueParam = { bean: JSON.stringify({ encryData: getSM4().encrypt(JSON.stringify(bean)) }) } //sm4_cdc加密
    bean = Vue.$qs.stringify(vueParam)
  }
  //打包
  axios.post('/nvsidfh5apis/NVSIDF/restservices/webapi/' + name + '/query', bean).then((res) => {
    callbackAll(res.data)
  })
}

const request2 = function(name, bean, callbackAll) {
  //微信登录接口
  /* let config = {
    headers:{'Content-Type':'multipart/form-data'}
  }; */
  // let param=''
  if (null != bean) {
    const vueParam = { bean: JSON.stringify({ encryData: getSM4().encrypt(JSON.stringify(bean)) }) } //sm4_cdc加密
    bean = Vue.$qs.stringify(vueParam)
    // bean=getSM4().encrypt(JSON.stringify(bean));//sm4_cdc加密
    // param = new FormData();
    // param.append('bean',bean)
  }

  //打包
  axios.post('/nvsidfh5apis/NVSIDF/restservices/webapi/' + name + '/query', bean).then((res) => {
    callbackAll(res.data)
  })

  //本地
  // Vue.axios.post(context()+"/restservices/h5/"+name+"/query", bean).then(res => {
  //     callbackAll(res.data);
  //   });
}

const request3 = function(name, bean, callbackAll) {
  //微信登录接口
  /* let config = {
    headers:{'Content-Type':'multipart/form-data'}
  }; */
  // let param=''
  if (null != bean) {
    const vueParam = { bean: JSON.stringify({ encryData: getSM4().encrypt(JSON.stringify(bean)) }) } //sm4_cdc加密
    bean = Vue.$qs.stringify(vueParam)
    // bean=getSM4().encrypt(JSON.stringify(bean));//sm4_cdc加密
    // param = new FormData();
    // param.append('bean',bean)
  }

  //打包
  axios.post('/nvsidfh5apis/NVSIDF/restservices/web/' + name + '/query', bean).then((res) => {
    callbackAll(res.data)
  })

  //本地
  // Vue.axios.post(context()+"/restservices/h5/"+name+"/query", bean).then(res => {
  //     callbackAll(res.data);
  //   });
}

const upload = function(bean, callbackAll) {
  //图片上传

  //打包
  // Vue.axios.post("/nvsidfh5apis/NVSI/restservices/h5/"+"/restservices/web/nvsi_jsImageExport/query", bean).then(res => {
  //   callbackAll(res.data);
  // });

  axios.post('/nvsidfh5apis/NVSIDF/restservices/h5/' + 'nvsi_jsImageExportForH5' + '/query', bean).then((res) => {
    callbackAll(res.data)
  })

  //本地
  // Vue.axios.post(context()+"/restservices/h5/"+"/restservices/web/nvsi_jsImageExport/query", bean).then(res => {
  //   callbackAll(res.data);
  // });
}

const uploadapi = function(bean, callbackAll) {
  //图片上传

  let config = {
    headers: { 'Content-Type': 'multipart/form-data' },
  }
  //添加请求头
  const b = new FormData()
  b.append('name', bean)
  axios.post('/nvsidfh5apis/NVSIDF/restservices/webapi/uploadWeb/query', b, config).then((res) => {
    console.log(res)
    callbackAll(res.data)
  })
}

//暂时登录-请求
const request_login = function(name, bean, callbackAll) {
  if (bean) {
    bean = { bean: JSON.stringify({ encryData: getSM4().encrypt(JSON.stringify(bean)) }) } //sm4_cdc加密
  }
  //打包
  axios.post('/nvsidfh5apis/NVSIDF/restservices/h5/' + '/restservices/web/' + name + '/query', bean).then((res) => {
    callbackAll(res.data)
  })
  //本地
  // Vue.axios.post(context()+ "/restservices/h5/" +"/restservices/web/"+name+"/query", bean).then(res => {
  //   callbackAll(res.data);
  // });
}

const getSM4 = function(key) {
  //SM4  .encrypt();//加密    .decrypt()//解密
  // 引用sm4包进行加密
  const SM4 = require('longrise-sm4')
  if (!key) key = 'p6fl4gN1brNfflKK' //默认
  let sm4Config = {
    //配置sm4参数
    key: key, //key:十六进制的字符串
    mode: 'cbc', // 加密的方式有两种，ecb（默认）和cbc两种，也是看后端如何定义的，不过要是cbc的话下面还要加一个iv的参数，ecb不用
    iv: 'longrise12345678', //cbc加密的向量iv
    cipherType: 'text', // 默认base64
  }
  let sm4 = new SM4(sm4Config) //new SM4(sm4Config);
  return sm4 //加密
}

const getSM = function(key) {
  //   getSM().decrypt(需要解密的参数)
  // 引用sm4包进行解密
  const SM4 = require('longrise-sm4')
  if (!key) key = 'y4FKxjmp5OqRaVSE' //默认
  let sm4Config = {
    //配置sm4参数
    key: key, //key:十六进制的字符串
    mode: 'cbc', // 加密的方式有两种，ecb（默认）和cbc两种，也是看后端如何定义的，不过要是cbc的话下面还要加一个iv的参数，ecb不用
    iv: 'longrise12345678', //cbc加密的向量iv
    cipherType: 'text', // 默认base64
  }
  let sm4 = new SM4(sm4Config) //new SM4(sm4Config);
  return sm4 //加密
}
const wetchat = function(param) {
  //debugger
  // console.log(wx)
  // debugger
  // param.link = encodeURIComponent(param.link)
  request2('getWxConfig', { url: param.link }, (res) => {
    console.log(res)
    // debugger
    if (res.code === 0) {
      wx.config({
        debug: false,
        appId: res.data.appid,
        timestamp: res.data.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.data.noncestr, // 必填，生成签名的随机串
        signature: res.data.signature, // 必填，签名
        jsApiList: [
          // 用的方法都要加进来
          // 'updateAppMessageShareData',
          // 'updateTimelineShareData',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
        ],
      })
      //debugger

      wx.error(function(res) {
        console.log(res, '信息验证失败') // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      })

      wx.ready(function() {
        // wx.updateTimelineShareData({
        //   title: param.title, // 分享标题
        //   desc: param.desc, // 分享描述
        //   link: param.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //   imgUrl: '', // 分享图标
        //   success: function(res) {
        //     // 设置成功
        //     console.log('分享到朋友圈成功返回的信息为:')
        //   },
        //   cancel: function() {
        //     console.log('分享取消')
        //     // 用户取消分享后执行的回调函数
        //   },
        //   fail: function(e) {
        //     console.log('接口调用失败', e)
        //     // 用户取消分享后执行的回调函数
        //   },
        // })

        wx.onMenuShareAppMessage({
          title: param.title, // 分享标题
          desc: param.desc, // 分享描述
          link: param.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://wuhan.yxybb.com/NVSIDF/LEAP/Download/default/2021/12/27/a3317a3d29284d7684c210a5c687b23c.png', // 分享图标
          success: function(res) {
            // 设置成功
            console.log('分享到朋友圈成功返回的信息为:')
            this.$Message.message('设置成功!')
          },
          cancel: function() {
            console.log('分享取消')
            // 用户取消分享后执行的回调函数
          },
          fail: function(e) {
            console.log('接口调用失败', e)
            // 用户取消分享后执行的回调函数
          },
        })
        wx.onMenuShareTimeline({
          title: param.title, // 分享标题
          desc: param.desc, // 分享描述
          link: param.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://wuhan.yxybb.com/NVSIDF/LEAP/Download/default/2021/12/27/a3317a3d29284d7684c210a5c687b23c.png', // 分享图标
          success: function() {
            this.$Message.message('设置成功!')
            // 设置成功
            //   alert('1156微信及qq')
          },
          fail: function(e) {
            console.log('接口调用失败', e)
            // 用户取消分享后执行的回调函数
          },
        })

        wx.onMenuShareQQ({
          title: param.title, // 分享标题
          desc: param.desc, // 分享描述
          link: param.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://wuhan.yxybb.com/NVSIDF/LEAP/Download/default/2021/12/27/a3317a3d29284d7684c210a5c687b23c.png', // 分享图标
          success: function() {
            this.$Message.message('设置成功!')
            // 设置成功
            //   alert('1156微信及qq')
          },
          fail: function(e) {
            console.log('接口调用失败', e)
            // 用户取消分享后执行的回调函数
          },
        })

        //需在用户可能点击分享按钮前就先调用
        // wx.updateAppMessageShareData({
        //   title: param.title, // 分享标题
        //   desc: param.desc, // 分享描述
        //   link: param.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
        //   imgUrl: '', // 分享图标
        //   success: function() {
        //     console.log('分享成功:')
        //     // 设置成功
        //   },
        //   cancel: function() {
        //     console.log('分享失败')
        //     // 用户取消分享后执行的回调函数
        //   },
        //   fail: function(e) {
        //     console.log('接口调用失败', e)
        //     // 用户取消分享后执行的回调函数
        //   },
        // })
      })
    }
  })
}

export default {
  wetchat,
  request,
  requestapi,
  requestapix,
  request2,
  request3,
  userrequest, //获取用户信息
  request_only,
  context,
  context1,
  upload,
  uploadapi,
  request_login,
  getSM4,
  getSM,
  requestapiwebapi,
}
