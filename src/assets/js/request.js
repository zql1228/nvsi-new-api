/* 公共请求 */

const name=function(username,callback){/* 帐号唯一验证 */
    Vue.utilscommit.request({method:'nvsi_jsCheckUsername',username:username},callback);
}

const card=function(cardId,cardNo,callback){/*证件号唯一验证 */
    Vue.utilscommit.request('nvsi_jsCheckIdCard',{cardtype:cardId,card:cardNo},callback);
}

const phone=function(phone,callback){/*手机号唯一验证 */
    Vue.utilscommit.request({method:'nvsi_jsCheckPhone',mobile:phone},callback);
}

const imgcode=function(callback){/*获取图文验证码 */
    Vue.utilscommit.request('nvsi_jsGetImageForRedis',{},callback);
}

const code=function(imgCode,imgkey,phone,callback){/*获取手机验证码 */
    Vue.utilscommit.request('nvsi_jsImageJyForRedis',{imgcode:imgCode,imgkey:imgkey,phonenum:phone},callback);
}

const place=function(areaid,callback){/* 获取区域 */
    Vue.utilscommit.request({method:'nvsi_jsGetAreaidList',areaid:areaid},callback);
}
const request=function(name,params){
    Vue.utilscommit.request({method:name,params},callback);
}
export default{
    request,
    name,
    card,
    phone,
    imgcode,
    code,
    place,
}