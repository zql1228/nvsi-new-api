/* 跳转 */

// Vue.$router.push({name: "Home", params: {}}); 
//window.open(Vue.$router.resolve({name: "Home", params: {}}).href);
const toHome=function(){//跳转首页
    Vue.$router.push({name:'Home'})
}

const toVolreg=function(){//跳转志愿者注册
    Vue.$router.push({name:'IndividualRegistration'})
}

const toOrgreg=function(){//跳转志愿团体注册
    Vue.$router.push({name:'GroupSignIn'})
}

const toUsercenter=function(idCard){//跳转个人中心
    Vue.$router.push({name:'Center',params:{idCard:idCard}})
}

const toBasicInfo=function(){//跳转基本信息
    Vue.$router.push({name:'Basic'})
}

const toVolCard=function(info){//跳转志愿者证
    Vue.$router.push({name:'volunteerCode'})
}

const tofaceInput=function(){//跳转面部录入
    Vue.$router.push({name:'InputFace'})
}

const toNickname=function(type){//跳转修改昵称
    Vue.$router.push({name:'Nickname',params:{type:type}})
}

const toManifestoe=function(type){//跳转公益宣言
    Vue.$router.push({name:'Manifesto',params:{type:type}})
}

const toForget=function(){//跳转忘记密码
    Vue.$router.push({name:'Forget'})
}

const toBindTel=function(){//跳转绑定手机号
    Vue.$router.push({name:'BindingTel'})
}

const toServeType=function(type){//跳转服务类别
    Vue.$router.push({name:'ServeType',params:{type:type}})
}

const toServiceTime=function(){//跳转服务时间
    Vue.$router.push({name:'ServiceTime'})
}

const toUpdataPwd=function(){//跳转修改密码
    Vue.$router.push({name:'UpdataPwd'})
}

const toJoinTeam=function(id){//跳转加入团体
    Vue.$router.push({name:'joinTeam',params:{id:id}})
}

const toAppliedProject=function(id){//跳转报名项目
    Vue.$router.push({name:'appliedProject',params:{id:id}})
}

const toProDetail=function(){//跳转项目详情
    Vue.$router.push({name:'volunteerProject4'})
}

const togroup=function(id){//跳转团体
    Vue.$router.push({ name: "GroupDetail", params: {id:id } });
}

const toshowVol=function(){//跳转已加入的志愿者
    Vue.$router.push({ name: "GroupVolunteer"});
}

const tovolProject=function(id){//跳转志愿项目详情页
    Vue.$router.push({ name: "volunteerProject1",params:{id:id}});
}

const toProList=function(){//跳转项目列表
    
    Vue.$router.push({ name: "volunteerProject"});
}

const toGroupList=function(){//跳转团体列表
  
    Vue.$router.push({ name: "Group"});
}

const tologin=function(){//跳转登录
    Vue.$router.push({ name: "Login"});
}
const toPage=function(name){//跳转页面
    Vue.$router.push({name:name})
  }

const todemeanordetails=function(){//跳转文章详情列表
    Vue.$router.push({ name: "demeanordetails"});
}

const todemeanorlist=function(){//跳转志愿风采列表
    Vue.$router.push({ name: "demeanorlist"});
}
export default{
    todemeanorlist,
    todemeanordetails,
    toHome,
    toUsercenter,
    toBasicInfo,
    toVolCard,
    toVolreg,
    toOrgreg,
    tofaceInput,
    toNickname,
    toManifestoe,
    toForget,
    toBindTel,
    toServeType,
    toServiceTime,
    toUpdataPwd,
    toJoinTeam,
    toAppliedProject,
    toProDetail,
    togroup,
    toshowVol,
    tovolProject,
    toProList,
    toGroupList,
    tologin,
    toPage
}