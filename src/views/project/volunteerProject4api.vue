<template>
  <div class="page">
    <header class="header" style="z-index: 1">
      <div class="header-prefix">
        <a class="flex-h v-m" href="javascript:void(0);" @click="$router.go(-1)">
          <img style="margin-right: 0.5rem" src="@/assets/img/back.svg" alt="" class="page-back" />
        </a>
      </div>
      <h1 class="header-title" style="text-align: left; padding-left: 3rem">
        项目介绍
      </h1>
      <div class="header-suffix"></div>
    </header>
    <section class="section" style="margin-top: 4.4rem">
      <ul>
        <li class="cell">
          <a href="javascript:void(0);" class="cell-wrap" style="width: 100%">
            <div class="cell-label">项目地点</div>
            <div style="font-size: 1.6rem;max-width: 23rem;text-align: right;">
              {{ information.albx0003 }}
            </div>
          </a>
        </li>
        <li class="cell">
          <a href="javascript:void(0);" class="cell-wrap" style="width: 100%">
            <div class="cell-label">项目日期</div>
            <div style="font-size: 1.6rem">
              {{ information.albx0004 && information.albx0005 ? information.albx0004.slice(0, 10) + '至' + information.albx0005.slice(0, 10) : '' }}
            </div>
          </a>
        </li>
        <li class="cell">
          <a href="javascript:void(0);" class="cell-wrap" style="width: 100%">
            <div class="cell-label">招募日期</div>
            <div style="font-size: 1.6rem">
              {{ information.albx0006 && information.albx0007 ? information.albx0006.slice(0, 10) + '至' + information.albx0007.slice(0, 10) : '' }}
            </div>
          </a>
        </li>
        <li class="cell">
          <a href="javascript:void(0);" class="cell-wrap" style="width: 100%">
            <div class="cell-label">服务对象</div>
            <div style="font-size: 1.6rem">
              {{ information.albx0014l }}
            </div>
          </a>
        </li>
        <li class="cell">
          <a href="javascript:void(0);" class="cell-wrap" style="width: 100%">
            <div class="cell-label">志愿者保障</div>
            <div style="font-size: 1.6rem">
              {{ information.albx0019l }}
            </div>
          </a>
        </li>
        <li class="cell">
          <a href="javascript:void(0);" class="cell-wrap" style="width: 100%">
            <div class="cell-label">发起时间</div>
            <div style="font-size: 1.6rem">
              {{ information.albx0031 ? information.albx0031.slice(0, 10) : '' }}
            </div>
          </a>
        </li>
        <li class="cell">
          <a href="javascript:void(0);" class="cell-wrap" style="width: 100%">
            <div class="cell-label">项目联系人</div>
            <div style="font-size: 1.6rem">
              {{ information.albx0025 }}
            </div>
          </a>
        </li>
        <li v-if="information.albx0027 == 1" class="cell" @click="mcall(information.albx0026)">
          <a href="javascript:void(0);" class="cell-wrap" style="width: 100%">
            <div class="cell-label">联系人方式</div>
            <div class="jiantou" style="font-size: 1.6rem">
              {{ information.albx0026 }}
            </div>
          </a>
        </li>
        <div class="plr-40 ptb-20 bg-white">
          <div class="project-introduction">介绍：{{ information.albx0018 }}</div>
        </div>
      </ul>
    </section>
  </div>
</template>
<script>
import { Dialog } from 'vant'
export default {
  components: { Dialog },
  data() {
    return {
      id: this.$route.params.id, //项目id
      aid: this.$route.params.aid, //项目id
      information: {
        servicetype: [],
        albx0026: '',
        albx0014: '',
        albx0025: '',
        albx0015: '',
        albx0004: '',
        albx0005: '',
        albx0006: '',
        albx0007: '',
        albx0019: '',
      },
    }
  },
  created() {
    // this.utilscommit.wetchat({ title: '欢迎加入中国志愿服务', desc: '“益”路有你 志愿同行', link: window.location.origin })
    // this.utilscommit.request(
    //   //项目详情查询
    //   'nvsi_jsProjectInfo',
    //   { id: this.$route.params.id },
    //   this.provincesBack1
    // )
    this.utilscommit.requestapi(
      //项目详情查询
      'getProjectInfoFortisH5',
      {
        albx0021: this.aid,
        proId: this.id,
      },
      this.provincesBack1
    )
  },
  methods: {
    mcall(phoneNumber) {
      Dialog.confirm({
        title: '是否拨打联系人电话',
      })
        .then(() => {
          window.location.href = 'tel://' + phoneNumber
        })
        .catch(() => {
          // on cancel
        })
    },
    provincesBack1(res) {
      console.log(res)
      if (res && res.data) {
        this.information = res.data
        if (this.information.albx0026) {
          this.information.albx0026 = this.utilscommit.getSM().decrypt(this.information.albx0026)
        }
        let a = res.data.albx0014 //服务对象
        let b = res.data.albx0019 //志愿者保障
        a = a.split(',')[0]
        b = b.split(',')[0]
        if (a == '01') {
          this.information.albx0014 = '儿童'
        } else if (a == '02') {
          this.information.albx0014 = '妇女'
        } else if (a == '03') {
          this.information.albx0014 = '老年人'
        } else if (a == '04') {
          this.information.albx0014 = '残障人士'
        } else if (a == '05') {
          this.information.albx0014 = '优抚对象'
        } else if (a == '06') {
          this.information.albx0014 = '贫困家庭'
        } else if (a == '07') {
          this.information.albx0014 = '特殊群体'
        } else if (a == '08') {
          this.information.albx0014 = '病患者'
        } else if (a == '09') {
          this.information.albx0014 = '农村居民'
        } else if (a == '10') {
          this.information.albx0014 = '城镇居民'
        } else if (a == '11') {
          this.information.albx0014 = '社会公众'
        } else if (a == '99') {
          this.information.albx0014 = '其他'
        }

        if (b == '01') {
          this.information.albx0019 = '志愿者保险'
        } else if (b == '02') {
          this.information.albx0019 = '集中乘车'
        } else if (b == '03') {
          this.information.albx0019 = '交通补贴'
        } else if (b == '04') {
          this.information.albx0019 = '餐饮或食物'
        } else if (b == '05') {
          this.information.albx0019 = '提供饮水'
        } else if (b == '06') {
          this.information.albx0019 = '提供住宿'
        } else if (b == '07') {
          this.information.albx0019 = '志愿者服装'
        } else if (b == '08') {
          this.information.albx0019 = '志愿服务工具'
        } else if (b == '09') {
          this.information.albx0019 = '免费体检'
        } else if (b == '10') {
          this.information.albx0019 = '专项培训'
        } else if (b == '11') {
          this.information.albx0019 = '社会公志愿服务证书众'
        } else if (b == '99') {
          this.information.albx0019 = '其他'
        }
      }
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
