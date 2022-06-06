<template>
  <div id="share">
    <div class="project-share-info">
      <div class="share-header">
        <img :src="projectInfo.fileid || projectInfo.defaultImg" alt="" />
        <div class="end-time">
          <p>
            距离报名结束：
            <span>{{ day }}</span> 天 <span>{{ hour }}</span> 时
            <span>{{ minute }}</span> 分
          </p>
        </div>
      </div>
      <div class="share-main">
        <div class="main-name">
          <p class="pro-name">{{ projectInfo.albx0002 }}</p>
          <p class="pro-address">
            <van-icon name="guide-o" />
            {{ projectInfo.albx0003 }}
          </p>
        </div>
        <div class="main-info">
          <p>项目编号: {{ projectInfo.albx0013 }}</p>
          <p>
            起止时间: {{ projectInfo.albx0004 | ellipsisNos(10) }} 至
            {{ projectInfo.albx0005 | ellipsisNos(10) }}
          </p>
          <p>项目联系人: {{ projectInfo.albx0025 }}</p>
          <p>联系人电话: {{ projectInfo.albx0026 }}</p>
        </div>
        <div class="main-des">
          <p>项目详情</p>
          <div>
            {{ projectInfo.albx0018 }}
          </div>
        </div>
        <!-- <div class="main-msg">
          <p>留言咨询</p>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Share",
  data() {
    return {
      areaid: this.$route.params.areaid,
      proId: this.$route.params.proId,
      projectInfo: {},
      day: "00",
      hour: "00",
      minute: "00",
    };
  },
  created() {
    this.getInfo();
  },
  methods: {
    // 获取项目详情
    getInfo() {
      let params = {
        albx0021: this.areaid,
        proId: this.proId,
      };
      this.utilscommit.requestapi("getProjectInfoFortisH5", params, (res) => {
        if (res.code == 0 && res.data) {
          this.projectInfo = res.data;
          this.getDate();
          if (this.projectInfo.fileid) {
            return;
          }
          if (this.projectInfo.albx0009) {
            let type = this.projectInfo.albx0009.split(",")[0];
            this.projectInfo.defaultImg = require(`@/assets/img/imgsz/albx${type}.png`)
            return
          }
          if (!this.projectInfo.albx0009) {
            this.projectInfo.defaultImg = require(`@/assets/img/imgsz/albx0099.png`)
          }
        }
      });
    },
    // 计算结束日期
    getDate() {
      let now = Date.now();
      let time=this.projectInfo.albx0005.slice(0, 19).replace(/-/g, '/')
      let endTime = new Date(time).getTime();
      if (endTime < now) {
        return;
      }
      let diff = endTime - now;
      this.day = parseInt(diff / (1000 * 60 * 60 * 24));
      this.hour =
        parseInt((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) < 10
          ? "0" + parseInt((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
          : parseInt((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minute =
        parseInt((diff % (1000 * 60 * 60)) / (1000 * 60)) < 10
          ? "0" + parseInt((diff % (1000 * 60 * 60)) / (1000 * 60))
          : parseInt((diff % (1000 * 60 * 60)) / (1000 * 60));
    },
  },
};
</script>

<style scoped>
.share-header {
  width: 100%;
  height: 20rem;
  position: relative;
}

.share-header img {
  width: 100%;
  height: 100%;
}

.share-header .end-time {
  width: 100%;
  height: 3.2rem;
  background: rgba(51, 51, 51, 0.3);
  position: absolute;
  bottom: 0;
}

.share-header .end-time p {
  height: 3.2rem;
  line-height: 3.2rem;
  color: #fff;
  font-size: 1.4rem;
  font-weight: bold;
  padding-left: 1.5rem;
  display: flex;
  align-items: center;
}

.share-header .end-time p span {
  display: inline-block;
  height: 2rem;
  color: red;
  line-height: 2rem;
  text-align: center;
  margin: 0 0.3rem;
}

.share-main {
  width: 100%;
  background-color: #f5f5f5;
}

.share-main .main-name {
  width: 100%;
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  background: #fff;
}

.share-main .main-name .pro-name {
  font-size: 1.6rem;
  color: #000;
  font-weight: bold;
  height: 4rem;
  line-height: 4rem;
}

.share-main .main-name .pro-address {
  font-size: 1.5rem;
  color: #666;
  height: 3rem;
  line-height: 3rem;
}

.share-main .main-info {
  background: #fff;
  padding: 0 1.5rem;
  margin-bottom: 1rem;
}

.share-main .main-info p {
  font-size: 1.3rem;
  color: #333;
  height: 4rem;
  line-height: 4rem;
  border-bottom: 0.1rem solid #ebebeb;
}

.share-main .main-info p:nth-last-of-type(1) {
  border-bottom: none;
}

.share-main .main-des {
  width: 100%;
  background: #fff;
  padding: 0 1.5rem 1rem;
  margin-bottom: 1rem;
}

.share-main .main-des p {
  font-size: 1.6rem;
  color: #333;
  font-weight: bold;
  border-bottom: 0.1rem solid #ebebeb;
  height: 4rem;
  line-height: 4rem;
  margin-bottom: 1rem;
}

.share-main .main-des div {
  font-size: 1.3rem;
  color: #666666;
  word-wrap: break-word;
  white-space: normal;
}
</style>