<template>
  <div class="page">
    <div class="header">
      <div class="header-prefix">
        <img src="@/assets/img/back.svg" alt="" class="page-back" @click="$router.go(-1)" />
      </div>
      <h2 class="header-title">基本信息</h2>
      <div class="header-suffix t-r">
        <b @click="submit">提交</b>
      </div>
    </div>

    <div class="main bg-gray" style="margin-top: 4.5rem">
      <div class="form-select-pop show flex-v" style="
          border-radius: 0;
          height: auto;
          position: static;
          margin-top: 1rem;
          box-sizing: border-box;
          padding: 0 1.6rem;
          background: #fff;
        ">
        <span style="color: #db0000; padding-top: 0.5rem" v-show="type == '类别'">(最多选择4项)</span>
        <ul class="flex-1">
          <li v-for="(item, index) in items" :key="index" style="position: relative; padding: 0" :class="{ active: item.isActive }" @click="checked(item, item.codevalue)">
            <p>{{ item.codevalue }}</p>
            <div class="checked">
              <input type="checkbox" :checked="item.isActive" name="checkbox" :id="index" />
              <label :for="index" class="garden"></label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { PullRefresh } from 'vant'
import { Dialog } from 'vant'
import { Toast } from 'vant'
export default {
  components: { PullRefresh, Dialog, Toast },
  data() {
    return {
      type: this.$store.getters.getservetype.type,
      items: [], //所有选择项
      list: [], //保存已经选中项的codeid
      codeidList: [],
      isLoading: false, //下拉刷新
      data: { albp0005: this.$store.getters.getuserInfo.albp0005, albp0006: this.$store.getters.getuserInfo.albp0006 }, //上传数据
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      //初始化列表
      if (this.type == '领域') {
        //江苏
        this.utilscommit.request('nvsi_jsGetCodeValues', { tableName: 'lbe04', areaid: this.config.areaid }, this.callback) /* 领域 */
      } else if (this.type == '类别') {
        //
        console.log(this.$store.getters.getuserInfo.albp0020)
        this.utilscommit.requestapi(
          'getAllCodeH5',
          { codeTypeName :"lbe05", areaId: this.$store.getters.getuserInfo.albp0020.slice(0, 2) + '0000000000000000' },
          this.callback
        ) /* 类别 */
      } else if (this.type == '特长') {
        this.utilscommit.requestapi('getCodeValueH5', { tableName: 'nvsi_albp0039' }, this.callback)
      }
    },
    callback(res) {
      var userInfo = {
        albp0021: this.$store.getters.getservetype.albp0021,
        servicetypevalues: this.$store.getters.getservetype.servicetypevalues,
        albp0039: this.$store.getters.getservetype.albp0039,
        grtcs: this.$store.getters.getservetype.grtcs,
      }

      if (res.code == 0) {
        var arr = res.data.filter((elem, index, arr) => {
          if (elem.codeid) {
            elem.codeid = elem.codeid
            elem.codevalue = elem.codevalue
          }
          return true
        })

        var items = (this.items = this.common.orderBy(arr, 'codeid', 'asc'))
        if (userInfo.albp0021 && this.type == '类别') {
          arr = userInfo.albp0021.split(',')
          arr = arr.filter((elem, index, arr) => {
            let a=items.some(ele=>ele.codeid===elem)
          return  a
        })
          arr=[ ... new Set(arr)]
          this.codeidList = arr //保存已经选中项的codeid
           if( userInfo.servicetypevalues){
             this.list = userInfo.servicetypevalues.split(',') //保存已经选中项的codevalue
          }
        }
        if (userInfo.albp0039 && this.type == '特长') {
          arr = userInfo.albp0039.split(',')
          arr=[ ... new Set(arr)]
          this.codeidList = arr //保存已经选中项的codeid
          this.list = userInfo.grtcs.split(',') //保存已经选中项的codevalue
        }
        for (var i = 0; i < items.length; i++) {
          items[i].isActive = false
          for (var key of arr) {
            if (items[i].codeid == key) {
              items[i].isActive = true
              break
            }
          }
        }
        this.items = items
        //console.log(this.items)
      }
    },
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false
        this.init()
      }, 500)
    },
    checked(item) {
      //确认选项
      item.isActive = item.isActive ? false : true
      let length = this.codeidList.length
      if (length == 0) {
        this.list.push(item.codevalue)
        this.codeidList.push(item.codeid)
      } else {
        if (
           this.codeidList.every((el) => {
            return el != item.codeid && item.isActive
          })
        ) {
          //如果已选中项中没有就添加
          this.list.push(item.codevalue)
          this.codeidList.push(item.codeid)
        }
        for (let i = 0; i < length; i++) {
           if (this.codeidList[i] == item.codeid && !item.isActive)  {
            this.list.splice(this.list.indexOf(item.codevalue), 1)
            this.codeidList.splice(this.codeidList.indexOf(item.codeid), 1)
            // this.list.splice(i,1);
            // this.codeidList.splice(i,1);
            break
          }
        }
      }
    },
    submit() {
      if (!this.codeidList.length) {
        Dialog.alert({
          message: '请确定选项',
        }).then(() => {
          // on close
        })
        return false
      }

      // if (this.type == "领域") {
      //   userInfo.lingyutypes = this.list.join(",");
      //   userInfo.serviceFieldCodeid = this.codeidList.join(",");
      // } else
      if (this.type == '类别') {
        if (this.codeidList.length > 4) {
          Dialog.alert({
            message: '服务类别最多选择4项',
          }).then(() => {
            // on close
          })
          return false
        }
        // this.data.servicetypevalues = this.list.join(",");
        this.data.albp0021 = this.codeidList.join(',')
      } else if (this.type == '特长') {
        // this.data.grtcs = this.list.join(",");
        this.data.albp0039 = this.codeidList.join(',')
      }
      this.comfir()
    },
    comfir() {
      this.utilscommit.requestapi('updateVolunInforOnH5', this.data, this.submitInfoBack)
    },
    submitInfoBack(res) {
      if (res.code == 0) {
        let a = this.$store.getters.getuserInfo
        if (this.type == '类别') {
          a.albp0021 = this.codeidList.join(',')
          this.$store.commit('changeuserInfo', a)
        } else if (this.type == '特长') {
          a.albp0039 = this.codeidList.join(',')
          this.$store.commit('changeuserInfo', a)
        }

        Toast('修改成功')
      } else {
        Toast('修改失败')
      }
      this.$router.go(-1)
    },
  },
}
</script>
<style lang="scss" scoped>
.form-select-pop ul li.active p {
  color: #666;
  font-weight: normal;
}
</style>
