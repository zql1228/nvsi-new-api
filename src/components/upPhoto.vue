<template>
  <div class="upload-core">
    <!-- upload-bg 未上传时的占位图 -->
    <img :src="photosrc" alt="" class="upload-bg" />
    <!-- uploaded 上传的图片 -->
    <img :src="src" alt="" class="uploaded" v-show="src" />
    <input type="file" accept="image/*" @change="changePhoto" ref="photos" hidden />
    <!-- upload-delete 上传成功后的删除按钮 -->
    <!-- <img
        src="@/assets/img/close.svg"
        alt=""
        class="upload-delete"
        @click="deletePhoto"
        v-show="src"
        /> -->
    <img src="@/assets/img/icon5.png" alt="" class="upload-icon" @click="showPhoto" />
  </div>
</template>

<script>
export default {
  props: ['photosrc', 'type'],
  data() {
    return {
      src: '',
    }
  },
  methods: {
    showPhoto() {
      //触发input点击
      this.src = '' //清空当前输入框file
      this.$refs.photos.value = null
      if (this.type == 1) {
        this.$parent.photo1 = ''
      } else if (this.type == 2) {
        this.$parent.photo2 = ''
      } else if (this.type == 3) {
        this.$parent.photo3 = ''
      }
      this.$refs.photos.click()
    },
    changePhoto(e) {
      //获取图片
      var file = e.target.files[0]
      let that = this
      let fileVal = this.common.checkFile(file, function(newfile) {
        that.src = newfile.src
        // let param = new FormData()
        // param.append('file', newfile)
        // debugger
        that.utilscommit.uploadapi(newfile, that.callback) /*上传图片 */
      })
      if (fileVal) return swal(fileVal, { buttons: '确定' })
    },
    callback(res) {
      let file = res.data
      if (file && res.code == 0) {
        swal('上传成功', { button: '确定' })

        if (this.type == 1) {
          this.$parent.photo1 = JSON.stringify(file)
          this.$parent.photo1x = this.src
        } else if (this.type == 2) {
          this.$parent.photo2 = JSON.stringify(file)
          this.$parent.photo2x = this.src
        } else if (this.type == 3) {
          this.$parent.photo3 = JSON.stringify(file)
          this.$parent.photo3x = this.src
        }
      } else {
        swal(res.message, { button: '确定' })
      }
    },
    /*  deletePhoto(){//删除
            this.src="";
            this.$refs.photos.value=null;
            if(this.type==1){
                this.$parent.photo1="";
            }else if(this.type==2){
                this.$parent.photo2="";
            }else if(this.type==3){
                this.$parent.photo3="";
            }
        } */
  },
}
</script>
