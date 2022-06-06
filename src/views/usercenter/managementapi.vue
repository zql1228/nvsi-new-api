// 基本信息
<template>
  <div class="page" style="background: #f5f5f5">
    <div class="header">
      <div class="header-prefix" @click="$router.go(-1)">
        <img src="@/assets/img/back.svg" alt="" class="page-back" />
      </div>
      <h2 class="header-title">权限管理</h2>
      <div class="header-suffix t-r"></div>
    </div>

    <div class="main" style="margin-top: 5.4rem; height: 100%">
      <ul class="cell-list" style="margin-top: 0">
        <li class="cell" @click="selectItemShow(0)">
          <span class="cell-label">被邀请加入项目</span>
          <span class="cell-tag" v-if="!userInfo.albp0098">未完善</span>
          <span class="cell-text" v-else v-text="countrysx"></span>
          <img src="@/assets/img/cell-right.svg" alt="" class="cell-right" />
        </li>
        <li class="cell" @click="selectItemShow(1)">
          <span class="cell-label">被邀请加入队伍</span>
          <span class="cell-tag" v-if="!userInfo.albp0099">未完善</span>
          <span class="cell-text" v-else v-text="nationsx"></span>
          <img src="@/assets/img/cell-right.svg" alt="" class="cell-right" />
        </li>
      </ul>
    </div>

    <!-- 遮罩 -->
    <div class="modal" :class="{ show: isprovinceShow || isotherShow }"></div>
    <!-- 地区下拉 -->

    <!-- 列表（国籍等...） -->
    <div class="select-wrap flex-v" :class="{ show: isotherShow }">
      <div class="select-wrap-header flex-h v-m t-lr">
        <span @click="SelectNotShow('del')">取消</span>
        <span @click="SelectNotShow('select')">确定</span>
      </div>
      <ul class="flex-v flex-1 select-wrap-item" style="overflow: auto">
        <li
          v-for="(item, index) in List"
          :key="index"
          class="flex-h v-m t-c"
          :class="{ active: index == current }"
          @click="isItemActive(index, item.codevalue, item.codeid)"
        >
          {{ item.codevalue }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import areaPop from '../../components/area.vue';
import { Popup } from 'vant'
import { Cascader } from 'vant'
import { Icon } from 'vant'
import frame from '../../components/frame.vue'
import { PullRefresh, Toast } from 'vant'
import { locales } from 'moment'
export default {
  components: { Popup, Cascader, Icon, frame, PullRefresh, Toast },
  data: function() {
    return {
      id: this.$store.getters.getuserInfo.albp0031,
      isLoading: false, //下拉刷新

      userInfo: '',

      isprovinceShow: false, //区域
      isotherShow: false, //其他
      List: [],
      nationalityList: [
        { beanname: 'leapcodevalue', codevalue: '需要同意本人', codeid: '0' },
        { beanname: 'leapcodevalue', codevalue: '默认同意邀请', codeid: '1' },
        { beanname: 'leapcodevalue', codevalue: '默认拒绝邀请', codeid: '2' },
      ], //国籍列表
      nationList: [
        { beanname: 'leapcodevalue', codevalue: '默认同意加入', codeid: '0' },
        { beanname: 'leapcodevalue', codevalue: '默认拒绝加入', codeid: '1' },
      ], //民族列表
      countrysx: '',
      nationsx: '',
      showItem: 0, //下拉框选择列表类型  0-国籍  1-民族  2-政治面貌  3-学历  4-从业状况   5-特长
      selected: '', //当前选中项
      selectedId: '', //当前选中项
      current: 0,

      show: false,
    }
  },
  created() {
    // this.utilscommit.wetchat({ title: '欢迎加入中国志愿服务', desc: '“益”路有你 志愿同行', link: window.location.origin })

    this.utilscommit.requestapi('getVolunteerInfoOnH5', { cardno: this.$store.getters.getuserInfo.albp0005 }, this.basicback)
    // this.utilscommit.request('nvsi_jsGetUSerInfo', { albp0031: this.id }, this.basicback)
  },
  mounted() {},
  methods: {
    basicback(res) {
      if (res.data) {
        if (res.data.albp0098) {
          this.nationalityList.forEach((element) => {
            if (res.data.albp0098 == element.codeid) {
              this.countrysx = element.codevalue
            }
          })
        } else {
          res.data.albp0098 = '0'
          this.countrysx = '需要同意本人'
        }

        if (res.data.albp0099) {
          this.nationList.forEach((element) => {
            if (res.data.albp0099 == element.codeid) {
              this.nationsx = element.codevalue
            }
          })
        } else {
          res.data.albp0099 = '0'
          this.countrysx = '默认同意加入'
        }

        this.userInfo = res.data
      }
    },
    selectItemShow(tab) {
      //出现选择框
      this.isotherShow = true
      var mo = function(e) {
        e.preventDefault()
      }
      // document.body.style.overflow = "hidden";
      document.addEventListener('touchmove', mo, false) //禁止页面滑动
      this.showItem = tab
      this.current = 0
      if (this.showItem == 0) {
        //被邀请加入项目
        this.List = this.nationalityList
      } else if (this.showItem == 1) {
        //被邀请加入队伍
        this.List = this.nationList
      }
      this.selected = this.List[0].codevalue
      this.selectId = this.List[0].codeid
    },
    SelectNotShow(tab) {
      //选择按钮
      this.isotherShow = false
      var mo = function(e) {
        e.preventDefault()
      }
      document.body.style.overflow = '' //出现滚动条
      document.removeEventListener('touchmove', mo, false)
      if (tab == 'select') {
        //确认按钮
        if (this.showItem == 0) {
          //国籍
          this.countrysx = this.selected
          this.userInfo.albp0098 = this.selectId
        } else if (this.showItem == 1) {
          //民族
          this.nationsx = this.selected
          this.userInfo.albp0099 = this.selectId
        }
        this.UpdateUSerInfo()
      }
    },
    isItemActive(index, item, id) {
      //选择列表项
      this.current = index
      this.selected = item
      this.selectId = id
    },
    provinceShow(tab) {
      //区域展示
      this.choice = tab
      this.showPopup = true
    },

    UpdateUSerInfo() {
      let param = { albp0005: this.$store.getters.getuserInfo.albp0005, albp0006: this.$store.getters.getuserInfo.albp0006 }
      if (this.showItem == 0) {
        param.albp0098 = this.userInfo.albp0098
      } else if (this.showItem == 1) {
        param.albp0099 = this.userInfo.albp0099
      }

      this.utilscommit.requestapi('updateVolunInforOnH5', param, this.submitInfoBack)
    },
    submitInfoBack(src) {
      if (src.code == 0) {
        Toast('修改成功')
      } else {
        Toast('修改失败')
      }
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/css/page.scss';

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
      content: '*';
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
  content: '';
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
