志愿者证
<template>
  <div class="page">
    <div class="header">
      <div class="header-prefix">
        <img src="@/assets/img/back-white.svg" alt="" class="page-back" @click="$router.go(-1)" />
      </div>
      <h2 class="header-title">志愿者证</h2>
      <div class="header-suffix"></div>
    </div>

    <div class="padding main">
      <div class="code-reverse">
        <img :src="abc" alt="" />
      </div>
      <!-- <div class="code-obverse">
        <div class="code-obverse-header flex-h v-m">
          <img src="@/assets/img/volunteerLogo.png" alt="" />
          <div class="flex-v">
            <h4 class="txt black flex-h v-m t-lr">
              <span>志</span>
              <span>愿</span>
              <span>服</span>
              <span>务</span>
              <span>证</span>
            </h4>
            <div class="flex-h v-m t-lr">
              <span
                >V&nbsp;o&nbsp;l&nbsp;u&nbsp;n&nbsp;t&nbsp;e&nbsp;e&nbsp;r</span
              >
              <span>S&nbsp;e&nbsp;r&nbsp;v&nbsp;i&nbsp;c&nbsp;e</span>
              <span>C&nbsp;a&nbsp;r&nbsp;d</span>
            </div>
            <div class="flex-h v-m t-lr">
              <span>奉献</span>
              &emsp;
              <span>友爱</span>
              &emsp;
              <span>互助</span>
              &emsp;
              <span>进步</span>
              &emsp;
            </div>
          </div>
        </div>
        <div
          class="code-obverse-info flex-h v-t"
          style="justify-content: space-between"
        >
          <div class="code-obverse-info-left flex-v h">
          
            <div class="flex-h">
            
              <ul class="flex-v">
               
                <li class="flex-v">
                  <p>姓名/Name</p>
                  <span v-text="info.albp0003"></span>
                </li>
                <li class="flex-v">
                  <p>服务省份/Registered Office</p>
                  <span v-text="info.albp0025fullname"></span>
                </li>
                <li class="flex-v">
                  <p>注册日期/Registration Date</p>
                  <span>{{ info.albp0034 | ellipsisNos(10) }}</span>
                </li>
              </ul>
              <ul class="flex-v flex-1">
                <li class="flex-v">
                  <p>性别/Sex</p>
                  <span v-text="info.albp0006 == 1 ? '男' : '女'"></span>
                </li>
              </ul>
            </div>
            <p class="code-obverse-url">
              中国志愿服务网网址:WWW.chinavolunteer.cn
            </p>
          </div>
          <div class="code-obverse-info-right flex-v" style="height: 166px">
            <div
              class="code-obverse-pic"
              @click="showPhoto"
              style="text-align: center"
            >
              <img
                :src="src"
                style="width: 6rem; height: 8rem"
                alt=""
                v-if="src"
              />
              <img
                v-else-if="!src && info.albp0083"
                :src="
                   common.context() +
                  '/LEAP/Download/' +
                  JSON.parse(info.albp0083).nameedpath +
                  '/' +
                  JSON.parse(info.albp0083).name
                "
                @error="common.imgError($event, require('@/assets/img/img7.png'))"
                style="width: 6rem; height: 8rem"
                alt=""
              />
              <img
                v-else
                src="@/assets/img/img7.png"
                style="width: 6rem; height: 8rem"
                alt=""
              />
            </div>
            <input
              type="file"
              accept="image/*"
              @change="changePhoto"
              ref="photos"
              hidden
            />
            <div class="qr-code flex-v v-m" style="margin-top: 0.5rem">
              <div>
                <img src="@/assets/img/qrcode.png" alt="" />
                <img src="@/assets/img/img9.png" alt="" />
              </div>
              <span style="margin-top: 0.3rem">志愿者二维码</span>
            </div>
          </div>
        </div>
      </div> -->
      <div class="code-reverse">
        <img src="@/assets/img/img10.png" alt="" />
      </div>
      <ul class="tips">
        <li class="flex-h v-t" v-for="(txt, index) in txts" :key="index">
          <span class="flex-h t-c">{{ index + 1 }}</span>
          <p class="txt small black line-common flex-1">
            {{ txt.value }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Dialog, Toast} from 'vant'
export default {
  components: { Dialog ,Toast},
  data() {
    return {
      txts: [
        { value: ' 志愿者电子证是由中国志愿服务网提供的志愿者身份信息识别电子产品' },
        { value: ' 若需要更改电子证头像，请前往中国志愿服务网站操作' },
      ],
      isShow: false,
      info: this.$store.getters.getuserInfo,
      src: '',
      photo: '',
      userInfoapi: '',
      abc: '',
    }
  },
  mounted() {
    this.utilscommit.requestapi('getVolunteerInfoOnH5', { cardno: this.$store.getters.getuserInfo.albp0005 }, (src) => {
      if (src.code == 0 && src.data) {
        this.userInfoapi = src.data
        this.abc=this.userInfoapi.volcard
    if(!this.userInfoapi.volcard){
       var params = { 
        volid: this.userInfoapi.id,
        name: this.userInfoapi.albp0003,// 志愿者姓名
        volnum: this.userInfoapi.albp0029,// 志愿者编号
        areaid: this.userInfoapi.albp0020,// 服务区域
        regdate: this.userInfoapi.albp0034,//注册日期
        sex: this.userInfoapi.albp0006, //性别
        src:true,
        photo: this.userInfoapi.albp0083,//头像
        cardno:this.$store.getters.getuserInfo.albp0005.replace(/\+/g, '%2B')
      };
    this.utilscommit.requestapiwebapi('refreshVolunteerCardHandleFortisWeb', params, (src) => {
            console.log(src)
               if (src.code == 0 && src.data) {
                 this.abc=src.data.src
               }else{
                  Toast('志愿者证生成失败')
               }
               
          })
}

   
      
     }
    })
  },
  methods: {
    showPhoto() {
      Dialog.alert({
        message: '若需要更改电子证头像，请前往中国志愿服务网站操作',
      }).then(() => {})
      // this.$refs.photos.click();  ////修改图片
    },
    changePhoto(e) {
      var file = e.target.files[0]
      let that = this
      let fileVal = this.common.checkFile(file, function(newfile) {
        that.src = newfile.src
        let param = new FormData()
        param.append('file', newfile)
        that.utilscommit.upload(param, that.callback) /*上传图片 */
      })
      if (fileVal) return swal(fileVal, { buttons: '确定' })
    },
    callback(res) {
      let file = res.data
      if (file) {
        this.photo = file
        this.updataInfo()
      } else {
        swal(res.message, { button: '确定' })
      }
    },
    updataInfo() {
      //修改志愿者证头像
      let param = {
        method: 'nvsi_jsUpdateUSerInfo',
        id: this.info.id,
        realareaid: this.config.areaid,
        albp0083: this.photo,
      }
      this.utilscommit.request(param, this.submitInfoBack)
    },
    submitInfoBack(res) {
      if (res.code == 0) {
        swal('上传成功!', { button: '确定' })
      }
    },
    // downloadIamge(imgsrc, name) {
    //   // 下载图片地址和图片名
    //   var image = new Image()
    //   // 解决跨域 Canvas 污染问题
    //   image.setAttribute('crossOrigin', 'anonymous')
    //   image.onload = function() {
    //     var canvas = document.createElement('canvas')
    //     canvas.width = image.width
    //     canvas.height = image.height
    //     var context = canvas.getContext('2d')
    //     context.drawImage(image, 0, 0, image.width, image.height)
    //     var url = canvas.toDataURL('image/jpg') // 得到图片的base64编码数据
    //     var a = document.createElement('a') // 生成一个a元素
    //     var event = new MouseEvent('click') // 创建一个单击事件
    //     a.download = name || 'photo' // 设置图片名称
    //     a.href = url // 将生成的URL设置为a.href属性
    //     a.dispatchEvent(event) // 触发a的单击事件
    //   }
    //   image.src = imgsrc
    // },
  },
}
</script>
<style lang="scss" scoped>
.page {
  background: url(~@/assets/img/bg9.png) no-repeat center;
  background-size: 100% 100%;
}
.header {
  background: url(~@/assets/img/bg9.png);
  color: #fff;
}
.padding {
  padding-top: 4.4rem;
}
.code-obverse {
  background: url(~@/assets/img/bg7.png) no-repeat center;
  background-size: 100% 100%;
  padding: 1rem 2rem;
  box-shadow: 0 0.15rem 1rem rgba($color: #5200a7, $alpha: 0.6);
  border-radius: 0.5rem;
  &-header {
    img {
      width: 3.3rem;
      margin-right: 1rem;
    }
    .flex-v {
      h4 {
        width: 12rem;
      }
      .flex-h:nth-child(2) {
        width: 12rem;
        margin: 0.2rem 0 0.5rem;
        span {
          font-size: 0.3rem;
          color: #333;
          white-space: nowrap;
        }
      }
      .flex-h:nth-child(3) {
        width: 12rem;
        span {
          font-size: 0.5rem;
          color: #333;
          white-space: nowrap;
        }
      }
    }
  }
  &-info {
    position: relative;
    &-left {
      li {
        margin-top: 1.5rem;
        p {
          font-size: 0.5rem;
          color: #333;
          white-space: nowrap;
        }
        span {
          font-size: 1.1rem;
          color: #333;
          margin-top: 0.3rem;
        }
      }
      .code-obverse-url {
        font-size: 0.75rem;
        color: #333;
        position: absolute;
        left: 0;
        bottom: 0;
      }
    }
    &-right {
      .code-obverse-pic {
        img {
          width: 6.8rem;
        }
      }
      .qr-code {
        margin-top: 1.7rem;
        div {
          position: relative;
          img:first-child {
            width: 4.4rem;
            vertical-align: top;
          }
          img:last-child {
            width: 1rem;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
        span {
          margin-top: 0.6rem;
          font-size: 0.5rem;
          color: #333;
        }
      }
    }
  }
}
.code-reverse {
  margin-top: 2rem;
  img {
    width: 100%;
    height: auto;
    box-shadow: 0 0.15rem 1rem rgba($color: #5200a7, $alpha: 0.6);
    border-radius: 0.5rem;
  }
}
.tips {
  position: relative;
  border-radius: 0.5rem;
  box-shadow: rgba($color: #5200a7, $alpha: 0.6);
  background-color: #fff;
  padding: 3.25rem 1.25rem 1.25rem;
  margin-top: 8rem;
  li {
    margin-top: 0.8rem;
    span {
      font-size: 0.9rem;
      color: #333;
      line-height: 1rem;
      width: 1.1rem;
      height: 1.1rem;
      border: 0.05rem solid #333;
      border-radius: 50%;
      margin-top: 0.45rem;
      margin-right: 0.4rem;
    }
  }
}
.tips::before {
  display: inline-block;
  content: "志愿者须知";
  font-size: 1.5rem;
  color: #fff;
  font-weight: bold;
  background: url(~@/assets/img/bg8.png) no-repeat center;
  background-size: 100% 100%;
  width: 15.3rem;
  height: 7.9rem;
  position: absolute;
  left: 50%;
  top: -5.9rem;
  transform: translateX(-50%);
  text-align: center;
  padding-top: 0.85rem;
  box-sizing: border-box;
}
</style>
