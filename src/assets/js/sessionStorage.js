import axios from 'axios'
// window.sessionStorage.getItem('nvsi_loginstatus')
// window.sessionStorage.setItem('nvsi_loginOutType', 1)
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
const getCode0014 = (callbackAll) => {
  ///项目获取服务对象

  if (window.sessionStorage.getItem('nvsi_albx0014')) {
    callbackAll(JSON.parse(window.sessionStorage.getItem('nvsi_albx0014')))
  } else {
    let bean = {
      tableName: 'nvsi_albx0014',
    }
    if (null != bean) {
      const vueParam = { bean: JSON.stringify({ encryData: getSM4().encrypt(JSON.stringify(bean)) }) } //sm4_cdc加密
      bean = Vue.$qs.stringify(vueParam)
    }
    axios.post('/nvsidfh5apis/NVSIDF/restservices/H5api/getCodeValuesFortisH5/query', bean).then((res) => {
      if (res.data.code === 0) {
        window.sessionStorage.setItem('nvsi_albx0014', JSON.stringify(res.data.data))
        callbackAll(res.data.data)
      }
    })
  }
}
const getCode0004 = (callbackAll) => {
  ///证件类型选择框类别

  if (window.sessionStorage.getItem('nvsi_albe0004')) {
    callbackAll(JSON.parse(window.sessionStorage.getItem('nvsi_albe0004')))
  } else {
    let bean = {
      tableName: 'nvsi_albp0004',
    }
    if (null != bean) {
      const vueParam = { bean: JSON.stringify({ encryData: getSM4().encrypt(JSON.stringify(bean)) }) } //sm4_cdc加密
      bean = Vue.$qs.stringify(vueParam)
    }
    axios.post('/nvsidfh5apis/NVSIDF/restservices/H5api/GetCodeValuesFortisH5/query', bean).then((res) => {
      if (res.data.code === 0) {
        window.sessionStorage.setItem('nvsi_albe0004', JSON.stringify(res.data.data))
        callbackAll(res.data.data)
      }
    })
  }
}

const getCode0005 = (callbackAll) => {
  ///队伍服务类别

  if (window.sessionStorage.getItem('nvsi_albe0005')) {
    callbackAll(JSON.parse(window.sessionStorage.getItem('nvsi_albe0005')))
  } else {
    let bean = {
      tableName: 'nvsi_albe0005',
    }
    if (null != bean) {
      const vueParam = { bean: JSON.stringify({ encryData: getSM4().encrypt(JSON.stringify(bean)) }) } //sm4_cdc加密
      bean = Vue.$qs.stringify(vueParam)
    }
    axios.post('/nvsidfh5apis/NVSIDF/restservices/H5api/getCodeValueH5/query', bean).then((res) => {
      if (res.data.code === 0) {
        window.sessionStorage.setItem('nvsi_albe0005', JSON.stringify(res.data.data))
        callbackAll(res.data.data)
      }
    })
  }
}

const getCodeValueH5 = (key, name, bean, callbackAll) => {
  ///队伍服务类别

  if (window.sessionStorage.getItem(key)) {
    callbackAll(JSON.parse(window.sessionStorage.getItem(key)))
  } else {
    if (null != bean) {
      const vueParam = { bean: JSON.stringify({ encryData: getSM4().encrypt(JSON.stringify(bean)) }) } //sm4_cdc加密
      bean = Vue.$qs.stringify(vueParam)
    }
    axios.post('/nvsidfh5apis/NVSIDF/restservices/H5api/' + name + '/query', bean).then((res) => {
      if (res.data.code === 0) {
        window.sessionStorage.setItem(key, JSON.stringify(res.data.data))
        callbackAll(res.data.data)
      }
    })
  }
}

export default {
  getCodeValueH5,
  getCode0004,
  getCode0014,
  getCode0005,
}
