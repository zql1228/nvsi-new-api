const changeCode = function(node) {
  //生成验证码
  var selectChar = new Array(
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z'
  ) //所有候选组成验证码的字符，当然也可以用中文的
  var elementChar = new Array('font', 'i', 'b')
  var code = ''
  var codeLength = 4 //验证码的长度
  var html = ''
  for (var i = 0; i < codeLength; i++) {
    var charIndex = Math.floor(Math.random() * 33)
    code += selectChar[charIndex]
    var r = parseInt(Math.random() * 155)
    var g = parseInt(Math.random() * 155)
    var b = parseInt(Math.random() * 155)
    var e = parseInt(Math.random() * 3)
    var s = parseInt(Math.random() * 10) + 18
    var color = 'rgb(' + r + ',' + g + ',' + b + ')'
    /* html += "<"+elementChar[e]+" style='font-size:"+ s +"px;color: "+color+"'>"+selectChar[charIndex]+"</"+elementChar[e]+">&nbsp;";*/
    html +=
      '<' +
      elementChar[e] +
      " style='font-size:20px;margin-left:1px;color: " +
      color +
      "'>" +
      selectChar[charIndex] +
      '</' +
      elementChar[e] +
      '>&nbsp;'
  }
  // $("#" + node).html(html);
  document.getElementById(node).innerHTML = html
  return code
}

const checkCardNo = function(cardno) {
  // 验证身份证号码
  var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
  if (regIdCard.test(cardno)) {
    if (cardno.length == 18) {
      var idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      var idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]
      var idCardWiSum = 0
      for (var i = 0; i < 17; i++) {
        idCardWiSum += cardno.substring(i, i + 1) * idCardWi[i]
      }
      var idCardMod = idCardWiSum % 11
      var idCardLast = cardno.substring(17)
      if (idCardMod == 2) {
        return idCardLast == 'X' || idCardLast == 'x'
      } else {
        // 用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        return idCardLast == idCardY[idCardMod]
      }
    }
  } else {
    return false
  }
}

const formTips = function(el, tip) {
  document.getElementById(el).innerText = tip
  document.getElementById(el).style.color = '#db0000'
  document.getElementById(el).style.fontSize = '0.875rem'
}
const context = function() {
  //图片地址
  // return 'https://chinavolunteer.mca.gov.cn/NVSI'
  //  return 'https://wuhan.yxybb.com/NVSI'
  // return window.location.origin + '/NVSIDF'
  return window.location.origin + process.env.VUE_APP_CONTEXT
}

// 用户名验证
const checkUsername = function(username) {
  var usernameExp = /^[A-z][A-z_0-9]{5,19}$/
  return usernameExp.test(username)
}

const checkPwd = function(pwd) {
  // 密码验证
  var pwExp = /^(?=.*[0-9].*)(?=.*[A-Z].*)(?=.*[a-z].*).{8,20}$/ //8-20个字符，且必须同时包含数字、大写字母和小写字母
  return pwExp.test(pwd)
}

// 验证手机号
const checkPhone = function(phone) {
  var phonenoExp = /^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16([3,5,6])|(17[0-8])|(18[0-9]))|(19[1,8,9]))\d{8}$/
  return phonenoExp.test(phone)
}

//验证普通图片
const checkFile = function(file, allback) {
  //文件file   ，units 单位：多少k
  if (!file.size) {
    // 看支持不支持FileReader
    return '不能为空！'
  } else {
    //文件后缀
    var ext = file.name.substring(file.name.lastIndexOf('.') + 1, file.name.length)
    if (!/png|jpg|jpeg/i.test(ext)) return '只支持格式为jpg、png、jpeg的图片！'
    var filesize = (file.size / 1024).toFixed(2)
    if (filesize > 5000) return '图片大小不能超过5000k！'
    imgPreview(file, allback)
    return
  }
}
function imgPreview(file, allback) {
  let reader = new FileReader() // 创建一个reader
  reader.readAsDataURL(file) // 将图片2将转成 base64 格式
  reader.onloadend = function() {
    // 读取成功后的回调
    file.src = this.result
    allback(file)
  }
}

// 邮箱验证
const checkEmail = function(email) {
  var emailExp = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
  return emailExp.test(email)
}

// 验证固定电话
const checkTel = function(data) {
  var dataExp = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,4}))?$/
  return dataExp.test(data)
}

const checkweixin = function(weixin) {
  //校验微信号
  var weixinExp = /^[a-zA-Z][a-zA-Z\d_-]{5,19}$/
  return weixinExp.test(weixin)
}
// 验证QQ号
const checkqq = function(qq) {
  var qqExp = /^\d{5,11}$/
  return qqExp.test(qq)
}

const orderBy = function(source, order, type) {
  //排序
  if (source instanceof Array && order.length > 0) {
    return groupOrder(source, order, type)
  } else {
    return source
  }
}

function groupOrder(source, order, type) {
  return source.sort(function(a, b) {
    var ca = a[order]
    var cb = b[order]
    if (typeof ca == 'string' && typeof cb == 'string') {
      if (type.toUpperCase() == 'ASC') {
        return ca.localeCompare(cb)
      } else {
        return cb.localeCompare(ca)
      }
    } else {
      if (type.toUpperCase() == 'ASC') {
        return ca - cb
      } else {
        return cb - ca
      }
    }
  })
}

const getTime = function() {
  let myDate = new Date()
  let year = myDate.getFullYear() //年
  let month = myDate.getMonth() + 1 //月
  let day = myDate.getDate() //日
  let hour = myDate.getHours() //获取系统时，
  let minute = myDate.getMinutes() //分
  let second = myDate.getSeconds() //秒
  // let ms=myDate.getMilliseconds();//毫秒
  if (month >= 1 && month < 10) {
    month = '0' + month
  }
  if (day >= 0 && day < 10) {
    day = '0' + day
  }
  if (hour >= 0 && hour < 10) {
    hour = '0' + hour
  }
  if (minute >= 0 && minute < 10) {
    minute = '0' + minute
  }
  if (second >= 0 && second < 10) {
    second = '0' + second
  }
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
}

const imgError = function(el, img) {
  el.target.src = img
}

//计算距离，根据经纬度计算
function getRad(d) {
  return (d * Math.PI) / 180.0
}

function getFlatternDistance(lat1, lng1, lat2, lng2) {
  var f = getRad((lat1 + lat2) / 2)
  var g = getRad((lat1 - lat2) / 2)
  var l = getRad((lng1 - lng2) / 2)

  var sg = Math.sin(g)
  var sl = Math.sin(l)
  var sf = Math.sin(f)

  var s, c, w, r, d, h1, h2
  var a = 6378137.0 //单位M;
  var fl = 1 / 298.257

  sg = sg * sg
  sl = sl * sl
  sf = sf * sf

  s = sg * (1 - sl) + (1 - sf) * sl
  c = (1 - sg) * (1 - sl) + sf * sl

  w = Math.atan(Math.sqrt(s / c))
  r = Math.sqrt(s * c) / w
  d = 2 * w * a
  h1 = (3 * r - 1) / 2 / c
  h2 = (3 * r + 1) / 2 / s

  return d * (1 + fl * (h1 * sf * (1 - sg) - h2 * (1 - sf) * sg))
}

//去掉字符串中所有空格
const trimAll = function(str) {
  if (str) {
    str = str.replace(/\s/g, '')
    if (str != '') {
      return str
    } else {
      return null
    }
  } else {
    return null
  }
}

const changeImgsrc = function(imgsrc, type) {
  if (imgsrc && imgsrc.indexOf('LEAP') > 0) {
    return this.context() + imgsrc
  } else if (imgsrc) {
    return imgsrc
  } else {
    if (type && type == 1) {
      //队伍默认图
      return require('../../assets/img/imgsy/img28.png')
    } else {
      return 'https://download.yxybb.com/project/MZ/resource/2020/11/23/imgmtbd.png'
    }
  }
}
// //表单验证提示
// const formTips = function(el,tip){
//   document.getElementById(el).innerText=tip;
// }

// 全国区划列表
const areaList = [
  { areaid: 11, name: '北京市' },
  { areaid: 12, name: '天津市' },
  { areaid: 13, name: '河北省' },
  { areaid: 14, name: '山西省' },
  { areaid: 15, name: '内蒙古自治区' },
  { areaid: 21, name: '辽宁省' },
  { areaid: 22, name: '吉林省' },
  { areaid: 23, name: '黑龙江省' },
  { areaid: 31, name: '上海市' },
  { areaid: 32, name: '江苏省' },
  { areaid: 33, name: '浙江省' },
  { areaid: 34, name: '安徽省' },
  { areaid: 35, name: '福建省' },
  { areaid: 36, name: '江西省' },
  { areaid: 37, name: '山东省' },
  { areaid: 41, name: '河南省' },
  { areaid: 42, name: '湖北省' },
  { areaid: 43, name: '湖南省' },
  { areaid: 44, name: '广东省' },
  { areaid: 45, name: '广西壮族自治区' },
  { areaid: 46, name: '海南省' },
  { areaid: 50, name: '重庆市' },
  { areaid: 51, name: '四川省' },
  { areaid: 52, name: '贵州省' },
  { areaid: 53, name: '云南省' },
  { areaid: 54, name: '西藏自治区' },
  { areaid: 61, name: '陕西省' },
  { areaid: 62, name: '甘肃省' },
  { areaid: 63, name: '青海省' },
  { areaid: 64, name: '宁夏回族自治区' },
  { areaid: 65, name: '新疆维吾尔自治区' },
  { areaid: 71, name: '台湾省' },
  { areaid: 81, name: '香港' },
  { areaid: 82, name: '澳门' },
]

const Teampicture = function(a, b) {
  if (a) {
    return a
  } else {
    if (b) {
      let c = b.slice(0, 2)
      return require('../../assets/img/ch/' + c + '.png')
    } else {
      return require('../../assets/img/imgsy/avatar7.svg')
    }
  }
}

export default {
  Teampicture,
  areaList, //省份配置文件
  changeImgsrc, //默认图片
  checkCardNo, // 验证身份证号码
  checkPwd, // 密码验证
  checkPhone, // 验证手机号
  checkUsername,
  checkFile,
  checkEmail,
  checkTel,
  checkqq,
  orderBy,
  context,
  getTime,
  imgError,
  getFlatternDistance, //计算距离，根据经纬度计算
  trimAll, //去掉字符串中所有空格
  changeCode, //生成验证码
  formTips,
  checkweixin,
}
