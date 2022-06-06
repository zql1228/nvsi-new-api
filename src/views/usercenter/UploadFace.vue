// 上传人脸图片
<template>
  <div class="page">
    <div class="header">
      <div class="header-prefix">
        <img
          src="@/assets/img/back.svg"
          alt=""
          class="page-back"
          @click="$router.go(-1)"
        />
      </div>
      <h2 class="header-title">上传人脸图片</h2>
      <div class="header-suffix t-r"></div>
    </div>
    <div class="main padding" style="padding-top:1rem;">
      <div class="card flex-h v-t">
        <img  src="@/assets/img/bells.png" alt="">
        <p class="flex-1 ">人脸信息提交后绑定实名账号，无法修改，请确保采集内容为本人人脸信息</p>
      </div>
      <div class="avatar flex-v v-m">
        <img class="avatar5" src="@/assets/img/avatar5.png" alt="" v-if="!src">
        <img class="avatar5" :src="src" style="border-radius:50%" alt="" v-else>
        <input type="file" accept="image/*" @change="changePhoto" ref="photos" hidden>
        <span class="standard">标准示意图</span>
        <span>请确保图片清晰且主体为正脸</span>
        <ul class="flex-h t-lr">
          <li class="flex-v v-m">
            <img src="@/assets/img/avatar1.png" alt="">
            <span>侧面照</span>
          </li>
          <li class="flex-v  v-m">
            <img src="@/assets/img/avatar2.png" alt="">
            <span>面部模糊</span>
          </li>
          <li class="flex-v  v-m">
            <img src="@/assets/img/avatar3.png" alt="">
            <span>光线不要太暗</span>
          </li>
          <li class="flex-v  v-m">
            <img src="@/assets/img/avatar4.png" alt="">
            <span>面部过小</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="btn-wrapper" style="background: #fff">
      <a href="javascript:void(0);" class="btn primary" @click="showPhoto">拍摄采集</a>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      src:''
    };
  },
  methods: {
     showPhoto(){
      this.$refs.photos.click();
    },
    changePhoto(e){
        var file = e.target.files[0];
        let that=this;
        let fileVal=this.common.checkFile(file,function(newfile) {
            that.src=newfile.src;
            let param = new FormData();
            param.append('file',newfile);
            that.utilscommit.upload(param,that.callback)/*上传图片 */
        }); 
        if(fileVal)return swal(fileVal,{buttons: "确定"});
    },
    callback(res){
      let file=res.data;
      if(file){
        let userInfo=this.$store.getters.getuserInfo;
        userInfo.albp0088=file;
        this.$store.commit('changeuserInfo',userInfo);
        swal('上传成功!',{button:'确定'}).then(()=>{
          this.commonRouter.toBasicInfo()
        })
      }else{
        swal(res.message,{button:'确定'})
      }
    }
  },
};
</script>
<style lang="scss" scoped>
.protocol {
  padding: 1rem 1.5rem;
  margin: 1rem 0 0;
  line-height: 2.4rem;
  font-size: 1.4rem;
  color: #666666;
  background: #fff;
}
.card{
  height: 7rem;
  background: #F9F9F9;
  padding: 1.5rem .9rem;
}
.card img{
  width: 2rem;
  margin-right: .4rem;
  margin-top: .25rem;
}
.card p{
  font-size: 1.3rem;
  color: #666666;
  line-height: 2.2rem;
}
.avatar{
  margin-top: 4.5rem;
}
.avatar .avatar5{
  width: 16rem;
  height: 17.6rem;
  
}

.avatar span{
  font-size: 1.2rem;
  color: #666666;
  margin-top: .4rem;
}
.avatar .standard{
  font-size: 1.6rem;
  color: #262626;
  margin-top: 1.4rem;
}
.avatar ul{
  width: 100%;
  margin-top: 4.8rem;
}

.avatar ul li img{
  width: 6.5rem;
  height: 6.5rem;

}

</style>