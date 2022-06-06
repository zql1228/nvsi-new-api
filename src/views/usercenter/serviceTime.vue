// 服务时间
<template>
  <div class="page">
    <div class="header">
      <div class="header-prefix">
        <img src="@/assets/img/back.svg" alt="" class="page-back" @click="$router.go(-1)" />
      </div>
      <h2 class="header-title">服务时间</h2>
      <div class="header-suffix t-r"></div>
    </div>
    <PullRefresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
      <div class="main padding section">
        <p class="ck-time">请选择您可以参加志愿服务的时间</p>
        <div class="table">
          <div>
            <table class="table-title">
              <colgroup>
                <col width="25%" />
                <col width="25%" />
                <col width="25%" />
                <col width="25%" />
              </colgroup>
              <tr>
                <th></th>
                <th>上午</th>
                <th>下午</th>
                <th>晚上</th>
              </tr>
            </table>
          </div>
          <div>
            <table class="table-main" border>
              <colgroup>
                <col width="25%" />
                <col width="25%" />
                <col width="25%" />
                <col width="25%" />
              </colgroup>
              <tbody>
                <tr>
                  <td align="center">星期一</td>
                  <td align="center" v-for="(item, index) in TimeList.slice(0, 3)" :key="index" @click="checked($event, index, '星期一')">
                    <input class="can-check" :checked="item.isActive" type="checkbox" :id="index" />
                    <label class="tips-item" :for="index"></label>
                  </td>
                </tr>
                <tr>
                  <td align="center">星期二</td>
                  <td align="center" v-for="(item, index) in TimeList.slice(3, 6)" :key="index" @click="checked($event, index, '星期二')">
                    <input class="can-check" :checked="item.isActive" type="checkbox" :id="index" />
                    <label class="tips-item" :for="index"></label>
                  </td>
                </tr>
                <tr>
                  <td align="center">星期三</td>
                  <td align="center" v-for="(item, index) in TimeList.slice(6, 9)" :key="index" @click="checked($event, index, '星期三')">
                    <input class="can-check" :checked="item.isActive" type="checkbox" :id="index" />
                    <label class="tips-item" :for="index"></label>
                  </td>
                </tr>
                <tr>
                  <td align="center">星期四</td>
                  <td align="center" v-for="(item, index) in TimeList.slice(9, 12)" :key="index" @click="checked($event, index, '星期四')">
                    <input class="can-check" :checked="item.isActive" type="checkbox" :id="index" />
                    <label class="tips-item" :for="index"></label>
                  </td>
                </tr>
                <tr>
                  <td align="center">星期五</td>
                  <td align="center" v-for="(item, index) in TimeList.slice(12, 15)" :key="index" @click="checked($event, index, '星期五')">
                    <input class="can-check" :checked="item.isActive" type="checkbox" :id="index" />
                    <label class="tips-item" :for="index"></label>
                  </td>
                </tr>
                <tr>
                  <td align="center">星期六</td>
                  <td align="center" v-for="(item, index) in TimeList.slice(15, 18)" :key="index" @click="checked($event, index, '星期六')">
                    <input class="can-check" :checked="item.isActive" type="checkbox" :id="index" />
                    <label class="tips-item" :for="index"></label>
                  </td>
                </tr>
                <tr>
                  <td align="center">星期日</td>
                  <td align="center" v-for="(item, index) in TimeList.slice(18, 21)" :key="index" @click="checked($event, index, '星期日')">
                    <input class="can-check" :checked="item.isActive" type="checkbox" :id="index" />
                    <label class="tips-item" :for="index"></label>
                  </td>
                </tr>
                <tr>
                  <td align="center">节假日</td>
                  <td align="center" v-for="(item, index) in TimeList.slice(21, 24)" :key="index" @click="checked($event, index, '节假日')">
                    <input class="can-check" :checked="item.isActive" type="checkbox" :id="index" />
                    <label class="tips-item" :for="index"></label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PullRefresh>
    <div class="btn-wrapper" style="background: #fff">
      <a class="btn primary" @click="comfir">确定</a>
    </div>
  </div>
</template>

<script>
import '@/assets/js/jquery-3.5.1.min.js'
import { Toast } from 'vant'
export default {
  components: { Toast },
  data: function() {
    return {
      list: [],
      Codelist: [],
      TimeList: [],
      isLoading: false, //下拉加载
      data: {},
    }
  },
  mounted() {
    // this.utilscommit.wetchat({ title: '欢迎加入中国志愿服务', desc: '“益”路有你 志愿同行', link: window.location.origin })
    this.utilscommit.requestapi('codeValueQueryFortisH5', { tableName: 'nvsi_albp0035' }, this.timeBack) //时间列表
  },
  methods: {
    timeBack(res) {
      if (res.code == 0) {
        this.TimeList = this.common.orderBy(res.data, "codeid", "asc")
        var albp0035 = this.$route.params.albp0035
        var jointimes = this.$route.params.jointimes

        if (albp0035) {
          var arr = albp0035.split(',')
          this.Codelist = arr
          this.list = jointimes.split(',')
          for (var i = 0; i < this.TimeList.length; i++) {
            this.TimeList[i].isActive = false
            for (var key of arr) {
              //console.log(key)
              if (this.TimeList[i].codeid == key) {
                this.TimeList[i].isActive = true
                break
              }
            }
          }
        }
        //console.log(this.TimeList)
      }
    },
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false
        this.utilscommit.request('nvsi_jsGetCodeValues', { tableName: 'nvsi_albp0035' }, this.timeBack) //时间列表
      }, 500)
    },
    checked(e, index, week) {
      //确认选项
      let time = ''
      if (index == 0) {
        time = '上午'
      } else if (index == 1) {
        time = '下午'
      } else {
        time = '晚上'
      }
      let item = week + time
      let itemcodeid = ''
      for (let i = 0; i < this.TimeList.length; i++) {
      
        if (this.TimeList[i].codevalue == item) {
          itemcodeid = this.TimeList[i].codeid
        }
      }
      if ($(e.target).prop('checked') == true) {
        //选中
        this.list.push(item)
        this.Codelist.push(itemcodeid)
      } else {
        this.list.splice(this.list.indexOf(item), 1)
        this.Codelist.splice(this.Codelist.indexOf(itemcodeid), 1)
      }
    },
    comfir() {
      this.utilscommit.requestapi(
        'updateVolunInforOnH5',
        { albp0005: this.$store.getters.getuserInfo.albp0005, albp0006: this.$store.getters.getuserInfo.albp0006, albp0035: this.Codelist.join(',') },
        this.submitInfoBack
      )
    },
    submitInfoBack(res) {
      if (res.code == 0) {
        Toast('修改成功')
      } else {
        Toast('修改失败')
      }
      this.$router.go(-1)
    },
    // comfir() {
    //提交
    // jointimes = this.list.join(",");
    // albp0035 = this.Codelist.join(",");
    // },
  },
}
</script>
<style lang="scss" scoped>
.section {
  padding-top: 2.6rem;
  position: relative;
  background: #fff;
  margin-top: 4.4rem;
}
.section::after {
  display: inline-block;
  content: "";
  width: 100%;
  height: 1rem;
  background: #f5f5f5;
  position: absolute;
  left: 0;
  top: 0;
}
.protocol {
  padding: 1.5rem;
  margin: 1rem 0 0;
  line-height: 2.4rem;
  font-size: 1.4rem;
  color: #666666;
  background: #fff;
}
.ck-time {
  text-align: center;
  font-size: 1.6rem;
  color: #262626;
  margin: 0.5rem 0 2rem 0;
  font-weight: bold;
}
.table-title {
  width: 100%;
  background: #fff3eb;
  height: 5rem;
}
.table-title tr th {
  height: 5rem;
  font-size: 1.5rem;
  color: #ff8737;
}
.table-main {
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
}
.table-main tr td {
  height: 5rem;
  border: 1px solid #ebebeb;
  font-size: 1.5rem;
  color: #ff8737;
  position: relative;
}
.table-main tr td input {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  opacity: 0;
}
.can-check:checked + label {
  background: url(~@/assets/img/star-active.png);
  // background-size: 1.5rem 1.4rem;
  background-repeat: no-repeat;
  width: 1.5rem;
  height: 1.4rem;
  background-size: contain;
}
.can-check + label {
  background: url(~@/assets/img/star.png);
  // background-size: 1.5rem 1.4rem;
  background-repeat: no-repeat;
  width: 1.5rem;
  height: 1.4rem;
  background-size: contain;
}
.tips-item {
  display: block;
}
.table {
  box-shadow: 0px 0.25rem 0.45rem rgba(224, 224, 224, 0.5);
  overflow: hidden;
  border-radius: 0.2rem;
}
.table th {
  font-weight: normal;
}
.btn.primary {
  background: linear-gradient(94deg, #ff5129 0%, #f91e11 100%);
}
// .can-check.input_check:checked + label{
//     background: url(../../assets/img/star-active.png);
//     background-repeat: no-repeat;
//   width: 1.5rem;
//   height: 1.4rem;
//   background-size: contain;
// }
</style>
