<template>
  <div id="groupShare">
    <div class="group-share-header">
      <div class="share-header">
        <div class="avatar">
          <img :src="groupInfo.albe0025" alt="" />
        </div>
        <h2>{{ groupInfo.albe0002 }}</h2>
        <div class="group-info">
          <p>
            <van-icon name="clock-o" />
            {{ groupInfo.albe0046 | ellipsisNos(10) }}
          </p>
          <span></span>
          <p>
            <van-icon name="guide-o" /> {{ groupInfo.albe0013 }}
          </p>
        </div>
        <div class="member-info">
          <div>
            <p>{{ groupInfo.albe0069 }}</p>
            <p>服务时长</p>
          </div>
          <div>
            <p>{{ groupInfo.albe0056 }}</p>
            <p>队伍人数</p>
          </div>
          <div>
            <p>99+</p>
            <p>队伍排名</p>
          </div>
        </div>
      </div>
    </div>
    <div class="main-content">
      <div class="share-main">
        <p>队伍编号：{{ groupInfo.albe0041 }}</p>
        <p>联系人：{{ groupInfo.albe0018 }}</p>
        <p>联系人电话：{{ groupInfo.albe0019 }}</p>
        <p>加入方式：{{ groupInfo.applyType }}</p>
      </div>
      <div class="share-des">
        <p>队伍简介</p>
        <div>{{ groupInfo.albe0032 || "暂无" }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GroupShare",
  data() {
    return {
      id: this.$route.params.areaid,
      groupId: this.$route.params.groupId,
      groupInfo: {},
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      let params = {
        id: this.groupId,
        areaId: this.id,
      };
      this.utilscommit.requestapi("getGroupInfoH5", params, (res) => {
        if (res.code == 0 && res.data) {
          this.groupInfo = res.data;
          if (!this.groupInfo.albe0025) {
            this.groupInfo.albe0025 = require("@/assets/img/i1.png");
          }
          if (this.groupInfo.albe0028 == 1) {
            this.groupInfo.applyType = "验证信息加入(需审核)";
            return;
          }
          if (this.groupInfo.albe0028 == 2) {
            this.groupInfo.applyType = "允许实名志愿者加入(无需审核)";
            return;
          }
          if (this.groupInfo.albe0028 == 3) {
            this.groupInfo.applyType = "拒绝任何人加入";
            return;
          }
          if (this.groupInfo.albe0028 == 4) {
            this.groupInfo.applyType = "免审加入(需免审密码)";
            return;
          }
        }
      });
    },
  },
};
</script>

<style scoped>
.group-share-header {
  width: 100%;
  height: 16.7rem;
  background: linear-gradient(#fe7f63, #fe5448);
}

.group-share-header .share-header {
  width: 100%;
  padding-top: 2.5rem;
}

.group-share-header .share-header .avatar {
  height: 5.5rem;
  text-align: center;
}

.group-share-header .share-header .avatar img {
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  vertical-align: top;
}

.group-share-header .share-header h2 {
  text-align: center;
  color: #fff;
  font-size: 1.4rem;
  margin-top: 1rem;
}

.group-info {
  /* width: 27.6rem; */
  display: flex;
  justify-content: center;
  margin: 0 auto;
  color: #fff;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.group-info span {
  width: 0.1rem;
  background: #eee;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
}

.group-info p:nth-of-type(2) {
  width: 19.1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.member-info {
  width: 27.6rem;
  height: 6rem;
  background: #fff;
  box-shadow: 0px 0.075rem 0.25rem rgb(0 0 0 / 7%);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
}

.member-info div {
  flex: 1;
  text-align: center;
  padding-top: 1.5rem;
  position: relative;
}

.member-info div:nth-of-type(1):after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 25%;
  height: 1.85rem;
  width: 1px;
  background: #dedede;
}

.member-info div:nth-of-type(2):after {
  content: "";
  position: absolute;
  right: 0;
  bottom: 25%;
  height: 2rem;
  width: 1px;
  background: #dedede;
}

.member-info div p:nth-of-type(1) {
  color: #000;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.main-content {
  width: 100%;
  background: #f5f5f5;
  margin-top: 4rem;
}

.share-main {
  padding: 0 1.5rem;
  margin-bottom: 1rem;
  background: #fff;
  margin-bottom: 1rem;
}

.share-main p {
  font-size: 1.3rem;
  color: #333;
  height: 4rem;
  line-height: 4rem;
  border-bottom: 0.1rem solid #ebebeb;
}

.share-main p:nth-last-of-type(1) {
  border-bottom: none;
}

.share-des {
  width: 100%;
  background: #fff;
  padding: 0 1.5rem 1rem;
  margin-bottom: 1rem;
}

.share-des p {
  font-size: 1.6rem;
  color: #333;
  font-weight: bold;
  border-bottom: 0.1rem solid #ebebeb;
  height: 4rem;
  line-height: 4rem;
  margin-bottom: 1rem;
}

.share-des div {
  font-size: 1.3rem;
  color: #666666;
  word-wrap: break-word;
  white-space: normal;
}
</style>