<template>
  <div class="page">
    <div class="header">
      <div class="header-prefix">
        <img src="@/assets/img/back.svg" alt="" class="page-back" @click="$router.go(-1)" />
      </div>
      <h2 class="header-title">队伍简介</h2>
      <div class="header-suffix"></div>
    </div>
    <section class="section" style="margin-top: 4.4rem">
      <PullRefresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功" style="height: 100%; overflow: auto">
        <ul>
          <li class="cell">
            <a href="javascript:void(0);" class="cell-wrap" style="width: 100%">
              <div class="cell-label">队伍名称</div>
              <div style="font-size: 1.6rem">
                {{ groupInfo.albe0002 }}
              </div>
            </a>
          </li>
          <li class="cell">
            <a href="javascript:void(0);" class="cell-wrap" style="width: 100%">
              <div class="cell-label">队伍联系人</div>
              <div style="font-size: 1.6rem">
                {{ groupInfo.albe0018 }}
              </div>
            </a>
          </li>
          <li class="cell">
            <a href="javascript:void(0);" class="cell-wrap" style="width: 100%">
              <div class="cell-label">手机号码</div>
              <div style="font-size: 1.6rem">
                {{ groupInfo.albe0019 }}
              </div>
            </a>
          </li>
          <li class="cell">
            <a href="javascript:void(0);" class="cell-wrap" style="width: 100%">
              <div class="cell-label">电话号码</div>
              <div style="font-size: 1.6rem">
                {{ groupInfo.albe0020 }}
              </div>
            </a>
          </li>
          <li class="cell">
            <a href="javascript:void(0);" class="cell-wrap" style="width: 100%">
              <div class="cell-label">成立日期</div>
              <div style="font-size: 1.6rem">
                {{ groupInfo.albe0015 ? groupInfo.albe0015.slice(0, 10) : '' }}
              </div>
            </a>
          </li>
          <li class="cell">
            <a href="javascript:void(0);" class="cell-wrap" style="width: 100%">
              <div class="cell-label">加入方式</div>
              <div style="font-size: 1.6rem">
                {{ groupInfo.albe0028 }}
              </div>
            </a>
          </li>
          <li class="cell">
            <a href="javascript:void(0);" class="cell-wrap" style="width: 100%">
              <div class="cell-label">联络组织</div>
              <div style="font-size: 1.6rem">
                {{ groupInfo.linkgroup ? groupInfo.linkgroup : '无' }}
              </div>
            </a>
          </li>
          <li class="cell">
            <a href="javascript:void(0);" class="cell-wrap" style="width: 100%">
              <div class="cell-label">详细地址</div>
              <div style="font-size: 1.6rem">
                {{ groupInfo.albe0013 }}
              </div>
            </a>
          </li>
          <div class="plr-40 ptb-20 bg-white">
            <div class="project-introduction">介绍：{{ groupInfo.albe0032 || '暂无' }}</div>
          </div>
        </ul>
      </PullRefresh>
    </section>
  </div>
</template>
<script>
import { PullRefresh } from 'vant'
export default {
  components: {
    PullRefresh,
  },
  data() {
    return {
      groupInfo: {
        albe0015: '',
      },
      isLoading: false,
    }
  },
  mounted() {
    this.utilscommit.wetchat({ title: '欢迎加入中国志愿服务', desc: '“益”路有你 志愿同行', link: window.location.origin })
    this.getData()
  },
  methods: {
    getData() {
      //获取团体详情
      //group-detail/b91c2ae0e1b6480cae6f6da7b7e9b334
      let data = {
        id: this.$route.params.id,
        areaId: this.$route.params.aid,
      }
      if (this.$store.getters.getshare.loginid) {
        data.volid = this.$store.getters.getshare.loginid
      }
      this.utilscommit.requestapi('getGroupInfoH5', data, this.back)
      //this.utilscommit.request('nvsi_jsGetBasicInfo', data, this.back)
    },
    back(res) {
      //团体详情返回结果
      if (res.code == 0) {
        this.groupInfo = res.data
        let a = this.groupInfo.albe0028
        if (a == 1) {
          this.groupInfo.albe0028 = '验证信息加入'
        } else if (a == 2) {
          this.groupInfo.albe0028 = '允许实名志愿者加入'
        } else if (a == 3) {
          this.groupInfo.albe0028 = '拒绝任何人加入'
        } else if (a == 4) {
          this.groupInfo.albe0028 = '免码加入'
        }

        // if (this.groupInfo.albe0019) {
        //   this.groupInfo.albe0019 = this.utilscommit.getSM().decrypt(this.groupInfo.albe0019)
        // }
        // if (this.groupInfo.albe0020) {
        //   this.groupInfo.albe0020 = this.utilscommit.getSM().decrypt(this.groupInfo.albe0020)
        // }
      }
    },
    onRefresh() {
      //下拉刷新
      setTimeout(() => {
        this.isLoading = false
        this.getData()
      }, 1000)
    },
  },
}
</script>
<style scoped>
.cell-wrap {
  justify-content: space-between !important;
}
.cell {
  padding: 0 !important;
}
</style>
