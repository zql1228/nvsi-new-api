// 基本信息
<template>
  <div id="basiczapi" class="page" style="background: #f5f5f5">
    <div class="header">
      <h2 class="header-title">志愿者信息</h2>
    </div>

    <div class="main" style="margin-top: 4.4rem; height: 100%">
      <ul class="cell-list">
        <li class="cell cell2">
          <img v-if="photo" :src="photo" alt="" class="cell-avatar" />
          <img v-else src="@/assets/img/img39.png" alt="" class="cell-avatar" />
          <span class="cell-text">头像</span>
          <input type="file" accept="image/*" ref="photos" hidden />
        </li>
      </ul>
      <ul class="cell-list" style="margin-top: 0">
        <li class="cell">
          <span class="cell-label">姓名</span>
          <span class="cell-text" v-text="userInfoapi.albp0003"></span>
        </li>
        <li class="cell">
          <span class="cell-label">证件类型</span>
          <span class="cell-text">{{ userInfoapi.cardtypes }}</span>
        </li>
        <!-- <li class="cell">
          <span class="cell-label">证件号码</span>
          <span class="cell-text" v-text="userInfoapi.albp0005"></span>
        </li> -->
        <li class="cell">
          <span class="cell-label">注册日期</span>
          <span class="cell-text">{{ userInfoapi.albp0034 | ellipsisNos(10) }}</span>
        </li>
        <li class="cell">
          <span class="cell-label">性别</span>
          <span class="cell-text" v-show="!userInfoapi.albp0006"></span>
          <span class="cell-text" v-show="userInfoapi.albp0006 == 1">男</span>
          <span class="cell-text" v-show="userInfoapi.albp0006 == 2">女</span>
        </li>
        <li class="cell">
          <span class="cell-label">实名状态</span>
          <span class="cell-text" v-show="userInfoapi.albp0063 == 0">实名失败</span>
          <span class="cell-text" v-show="userInfoapi.albp0063 == 1">实名通过</span>
          <span class="cell-text" v-show="userInfoapi.albp0063 == 2">审核中</span>
          <span class="cell-text" v-show="!userInfoapi.albp0063">未实名</span>
        </li>
        <li class="cell">
          <span class="cell-label">国籍</span>
          <span class="cell-tag" v-if="!userInfoapi.albp0002x">未完善</span>
          <span class="cell-text" v-else v-text="userInfoapi.albp0002x"></span>
        </li>
        <li class="cell">
          <span class="cell-label">民族</span>
          <span class="cell-tag" v-if="!userInfoapi.albp0008x">未完善</span>
          <span class="cell-text" v-else v-text="userInfoapi.albp0008x"></span>
        </li>
        <li class="cell">
          <span class="cell-label">政治面貌</span>
          <span class="cell-tag" v-if="!userInfoapi.politicals">未完善</span>
          <span class="cell-text" v-else v-text="userInfoapi.politicals"></span>
        </li>
        <li class="cell">
          <span class="cell-label">最高学历</span>
          <span class="cell-tag" v-if="!userInfoapi.educations">未完善</span>
          <span class="cell-text" v-else v-text="userInfoapi.educations"></span>
        </li>
        <li class="cell">
          <span class="cell-label">从业情况</span>
          <span class="cell-tag" v-if="!userInfoapi.works">未完善</span>
          <span class="cell-text" v-else v-text="userInfoapi.works"></span>
        </li>
      </ul>
      <ul class="cell-list">
        <li class="cell required">
          <span class="cell-label">手机号码</span>
          <span class="cell-text" v-text="userInfoapi.phone"></span>
        </li>

        <li class="cell">
          <span class="cell-label">固定电话（座机）</span>
          <span class="cell-tag" v-if="!userInfoapi.albp0011">未完善</span>
          <span class="cell-text" v-else v-text="userInfoapi.albp0011"></span>
        </li>
        <li class="cell">
          <span class="cell-label">QQ</span>
          <span class="cell-tag" v-if="!userInfoapi.albp0012">未完善</span>
          <span class="cell-text" v-else v-text="userInfoapi.albp0012"></span>
        </li>
        <li class="cell">
          <span class="cell-label">微信</span>
          <span class="cell-tag" v-if="!userInfoapi.albp0015">未完善</span>
          <span class="cell-text" v-else v-text="userInfoapi.albp0015"></span>
        </li>
        <li class="cell required">
          <span class="cell-label">现居区域</span>
          <span class="cell-tag" v-if="!userInfoapi.albp0028name">未完善</span>
          <span class="cell-text" v-else v-text="userInfoapi.albp0028name"></span>
        </li>
        <li class="cell">
          <span class="cell-label">详细地址</span>
          <span class="cell-tag" v-if="!userInfoapi.albp0013">未完善</span>
          <span class="cell-text" v-else>{{ userInfoapi.albp0013 | ellipsis(15) }}</span>
        </li>
      </ul>
      <ul class="cell-list">
        <li class="cell">
          <span class="cell-label">服务时间</span>
          <span class="cell-tag" v-if="!userInfoapi.jointimes">未完善</span>
          <span class="cell-text" v-else>{{ userInfoapi.jointimes | ellipsis(15) }}</span>
        </li>
        <li class="cell required">
          <span class="cell-label">服务类别</span>
          <span class="cell-tag" v-if="!userInfoapi.servicetypevalues">未完善</span>
          <span class="cell-text" v-else>{{ userInfoapi.servicetypevalues | ellipsis(15) }}</span>
        </li>
        <li class="cell required">
          <span class="cell-label">个人特长</span>
          <span class="cell-tag" v-if="!userInfoapi.grtcs">未完善</span>
          <span class="cell-text" v-else>{{ userInfoapi.grtcs | ellipsis(15) }}</span>
        </li>
        <li class="cell required" style="margin-bottom: 10rem">
          <span class="cell-label">服务区域</span>
          <span class="cell-tag" v-if="!userInfoapi.albp0025">未完善</span>
          <span class="cell-text" v-else v-text="userInfoapi.albp0025"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { Popup, Cascader, Icon, PullRefresh, Toast } from 'vant'
import frame from '../../components/frame.vue'
export default {
  components: { Popup, Cascader, Icon, frame, PullRefresh, Toast },
  data: function() {
    return {
      cardno: '', //志愿者加密身份证
      userInfoapi: {}, //用户信息
      avatar: '', //暂存头像
      photo: '', //显示头像
    }
  },
  created() {},
  mounted() {
    let data = { cardno: this.getQueryString('r') }
    this.utilscommit.requestapiwebapi('getVolunteerPhotoOnSecret', data, (src) => {
      //查询头像
      if (src.code == 0 && src.data.photourl) {
        this.photo = src.data.photourl
      }
    })
    this.utilscommit.requestapi('getVolunteerInfoOnH5', data, (src) => {
      if (src.code == 0 && src.data) {
        this.userInfoapi = src.data
        // if (this.userInfoapi.albp0005) {
        //   this.userInfoapi.albp0005 = this.userInfoapi.albp0005.replace(/(?<=\d{3})\d{12}(?=\d{2})/, '************')
        // }
        this.getValueFromCodeId(src.data)
        this.utilscommit.requestapi('codeValueQueryFortisH5', { tableName: 'lbe05', areaid: "00" }, (src) => {
          if (src.code == 0 && this.userInfoapi.albp0021) {
            let b = ''
            let a = this.userInfoapi.albp0021.split(',')
            for (let i = 0; i <= a.length; i++) {
              src.data.forEach(function(element) {
                if (a[i] == element.codeid) {
                  if (i == 0) {
                    b = element.codevalue
                  } else {
                    return (b = b + ',' + element.codevalue)
                  }
                }
              })
            }

            this.$set(this.userInfoapi, 'servicetypevalues', b)

            //当服务对象存在,且接口有返回值
          }
        })
      }
    })
  },
  methods: {
    getQueryString(name) {
      debugger
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) {
        return unescape(r[2])
      }
      return null
    },

    getValueFromCodeId(data) {
      this.utilscommit.requestapi('getValueFromCodeId', { tablename: 'nvsi_albp0065', codeid: data.albp0004 }, (src) => {
        if (src.code == 0 && src.data) {
          this.$set(this.userInfoapi, 'cardtypes', src.data.value)
        }
      })
      this.utilscommit.requestapi('getValueFromCodeId', { tablename: 'nvsi_albp0002', codeid: data.albp0002 }, (src) => {
        if (src.code == 0 && src.data) {
          this.$set(this.userInfoapi, 'albp0002x', src.data.value)
        }
      })

      this.utilscommit.requestapi('getValueFromCodeId', { tablename: 'nvsi_albp0008', codeid: data.albp0008 }, (src) => {
        if (src.code == 0 && src.data) {
          this.$set(this.userInfoapi, 'albp0008x', src.data.value)
        }
      })

      this.utilscommit.requestapi('getValueFromCodeId', { tablename: 'nvsi_albp0007', codeid: data.albp0007 }, (src) => {
        if (src.code == 0 && src.data) {
          this.$set(this.userInfoapi, 'politicals', src.data.value)
        }
      })
      this.utilscommit.requestapi('getValueFromCodeId', { tablename: 'nvsi_albp0017', codeid: data.albp0017 }, (src) => {
        if (src.code == 0 && src.data) {
          this.$set(this.userInfoapi, 'educations', src.data.value)
        }
      })
      this.utilscommit.requestapi('getValueFromCodeId', { tablename: 'nvsi_albp0018', codeid: data.albp0018 }, (src) => {
        if (src.code == 0 && src.data) {
          this.$set(this.userInfoapi, 'works', src.data.value)
        }
      })
      this.utilscommit.requestapi('getValueFromCodeId', { tablename: 'nvsi_albp0035', codeid: data.albp0035 }, (src) => {
        if (src.code == 0 && src.data) {
          this.$set(this.userInfoapi, 'jointimes', src.data.value)
        }
      })
      this.utilscommit.requestapi('getValueFromCodeId', { tablename: 'nvsi_albp0039', codeid: data.albp0039 }, (src) => {
        if (src.code == 0 && src.data) {
          this.$set(this.userInfoapi, 'grtcs', src.data.value)
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import "@/assets/css/page.scss";
#basiczapi .cell-tag {
  right: 0;
}
.cell-list {
  padding: 0 1.5rem;
  margin: 1rem 0 0;
  background: #fff;
}
.cell {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 0;

  span:not(.cell-tag) {
    font-weight: 500;
    font-size: 1.6rem;
  }
  &:not(:last-child)::after {
    @include mock-border;
    top: auto;
    bottom: 0;
  }
  &-avatar {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
  }
  &-label {
    flex: 1;
    color: #262626;
  }
  &-right {
    width: 2rem;
    height: 2rem;
    margin-left: 0.4rem;
  }
  &-text {
    display: flex;
    align-items: center;
    color: #666666;
  }
  &-tag {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 2.2rem;
    padding: 0 0.7rem;
    font-size: 1.2rem;
    color: #108ee9;
    border: 0.1rem solid #108ee9;
    border-radius: 1.1rem;
  }
  &.required {
    .cell-label::after {
      content: "*";
      color: #ff0000;
      position: relative;
      top: 0.3rem;
    }
  }
}
.cell-tag {
  color: #04c996;
  border: 1px solid #04c996;
}
.cell.cell2::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  width: 100%;
  height: 1px;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  background: #eeeeee;
  top: auto;
  bottom: 0;
}
.select-wrap-header span:last-child,
.select-wrap-item li.active {
  color: #db0000;
}
.van-cell {
  padding: 0;
}
.van-field__label {
  color: #262626;
}
.van-cell::after {
  border: 0;
}
.van-icon-arrow:before {
  font-size: 2.2rem;
  color: #b2b2b2;
}
</style>
