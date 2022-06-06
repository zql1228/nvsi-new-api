<template>
  <div class="page bg-white">
    <header class="header" style="z-index: 1">
      <div class="header-prefix">
        <a class="flex-h v-m" href="javascript:void(0);" @click="$router.go(-1)">
          <img style="margin-right: 0.5rem" src="~@/assets/img/back.svg" alt="" class="page-back" />
        </a>
      </div>
      <h1 class="header-title" style="text-align: left; padding-left: 3rem">
        志愿项目
      </h1>
      <div class="header-suffix"></div>
    </header>
    <div class="plr-40 pt-20" style="margin-top: 4.4rem">
      <div class="search type2">
        <img class="search-icon" :src="require('../../assets/img/imgsy/search-gray.svg')" alt="" />

        <div class="form">
          <div class="form-row" style="padding: 0;">
            <input type="text" class="form-core" v-model="searchName" placeholder="请输入要搜索的项目名称" @keydown="searchxx($event)" />
          </div>
        </div>
        <!-- <img class="search-delete" src="@/assets/img/imgsy/delete.svg" alt="" /> -->
      </div>
      <ul class="cascader mt-35">
        <li class="cascader-item" :class="[selectActive == '0' && 'active']" id="area-select" @click="changeSelect(0)">
          <span style="
              text-overflow: ellipsis;
              overflow: hidden;
              max-width: 13rem;
              white-space: nowrap;
            ">{{ regPlace }}</span>
        </li>
        <li class="cascader-item" :class="[selectActive == '1' && 'active']" id="type-select" @click="changeSelect(1)">
          <span>服务类型</span>
        </li>
        <li class="cascader-item" :class="[selectActive == '2' && 'active']" @click="changeSelect(2)">
          <span>智能筛选</span>
        </li>
      </ul>
    </div>
    <div>
      <div class="select-mask" :class="{ show: isShow }" style="top: auto"></div>
      <div class="select-wrap flex-v slect-u plr-40" :class="{ show: isShow }" style="height: 30rem; display: flex; flex-direction: column">
        <div style="height: 25rem">
          <div class="preview-container">
            <div id="preview-html">
              <span>项目状态</span>
              <ul style="
                  display: flex;
                  justify-content: space-between;
                  flex-wrap: wrap;
                ">
                <li style="width: 21%" :class="[albx0015z == '' && 'active']" @click="onalbx0015('')">
                  全部
                </li>
                <li style="width: 21%" :class="[albx0015z == '3' && 'active']" @click="onalbx0015('3')">
                  待启动
                </li>
                <li style="width: 21%" :class="[albx0015z == '4' && 'active']" @click="onalbx0015('4')">
                  运行中
                </li>
                <li style="width: 21%" :class="[albx0015z == '5' && 'active']" @click="onalbx0015('5')">
                  已结项
                </li>
              </ul>
              <span>报名范围</span>
              <ul style="
                  display: flex;
                  justify-content: space-between;
                  flex-wrap: wrap;
                ">
                <li style="width: 48%" :class="[albx0024z == '' && 'active']" @click="onalbx0024('')">
                  全部
                </li>
                <li style="width: 48%" :class="[albx0024z == '1' && 'active']" @click="onalbx0024('1')">
                  公开招募
                </li>
                <li style="width: 48%" :class="[albx0024z == '2' && 'active']" @click="onalbx0024('2')">
                  指定队伍招募
                </li>
                <li style="width: 48%" :class="[albx0024z == '3' && 'active']" @click="onalbx0024('3')">
                  设定免审密码招募
                </li>
              </ul>
              <span>服务对象</span>
              <ul style="
                  display: flex;
                  justify-content: space-between;
                  flex-wrap: wrap;
                ">
                <li v-for="(itrm, i) in x0014" :key="i" :class="[albx0014z == itrm.codeid && 'active']" style="width: 21%" @click="onalbx0014(itrm.codeid)">
                  {{ itrm.codevalue }}
                </li>
              </ul>
              <span>项目人数</span>
              <ul style="
                  display: flex;
                  justify-content: space-between;
                  flex-wrap: wrap;
                ">
                <li style="width: 21%" :class="[pronumz == '' && 'active']" @click="onpronum('')">
                  全部
                </li>
                <li style="width: 21%" :class="[pronumz == '1' && 'active']" @click="onpronum('1')">
                  0-100
                </li>
                <li style="width: 21%" :class="[pronumz == '2' && 'active']" @click="onpronum('2')">
                  101-200
                </li>
                <li style="width: 21%" :class="[pronumz == '3' && 'active']" @click="onpronum('3')">
                  201-500
                </li>
                <li style="width: 21%" :class="[pronumz == '4' && 'active']" @click="onpronum('4')">
                  501-1000
                </li>
                <li style="width: 21%" :class="[pronumz == '5' && 'active']" @click="onpronum('5')">
                  1000以上
                </li>
                <li style="width: 21%; background-color: #ffffff"></li>
                <li style="width: 21%; background-color: #ffffff"></li>
              </ul>
            </div>
          </div>
        </div>
        <div style="" class="anniu flex-h v-m t-lr">
          <div @click="intelligencex()">重置</div>
          <div @click="intelligence()" style="background-color: #db0000; color: #ffffff">
            确定
          </div>
        </div>
      </div>
    </div>
    <section class="section plr-40 pb-35">
      <pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
        <list v-model="loading" :finished="finished" finished-text="" @load="onLoad">
          <li class="project-item" @click="tovolProject(itrm.id, itrm.albx0021)" v-for="(itrm, i) in projectdata" :key="i">
            <div class="project-item-cover">
              <img v-if="itrm.fileid" :src="itrm.fileid" alt="" />
              <!-- <img v-else :src="require('@/assets/img/imgsz/albx' + itrm.albx0009 + '.png')" alt="" /> -->
              <img v-else :src="require('@/assets/img/imgsz/albx' + '0020' + '.png')" alt="" />

              <!-- <div v-if="item.albx0073 == 10" class="project-item-tag success">
                待办理
              </div>
              <div v-if="item.albx0073 == 11" class="project-item-tag success">
                待审批
              </div> -->
              <!-- <div v-if="item.albx0073 == 13" class="project-item-tag success">
                招募待启动
              </div>
              <div v-if="item.albx0073 == 14" class="project-item-tag success">
                招募中
              </div>
              <div v-if="item.albx0073 == 15" class="project-item-tag success">
                未招聘
              </div> -->
              <!-- <div v-if="item.albx0073 == 16" class="project-item-tag success">
                运行中
              </div> -->
              <div class="project-item-tag success">
                {{ itrm.albx0072 == 3 ? '待启动' : itrm.albx0072 == 4 ? '运行中' : itrm.albx0072 == 5 ? '已结项' : itrm.albx0072 == 6 ? '补录' : '' }}
              </div>
              <!-- <div v-if="item.albx0073 == 18" class="project-item-tag success">
                自动结项
              </div>
              <div v-if="item.albx0073 == 19" class="project-item-tag warning">
                手动结项
              </div>
              <div v-if="item.albx0073 == 20" class="project-item-tag info">
                补录
              </div>
              <div v-if="itrm.albx0073 == 21" class="project-item-tag primary">
                停用
              </div>
              <div v-if="itrm.albx0073 == 22" class="project-item-tag primary">
                作废
              </div> -->
              <div class="project-item-cover-title">
                {{ itrm.albx0003 }}
              </div>
            </div>
            <div class="project-item-main">
              <a href="javascript:void(0);" class="project-item-title">{{ itrm.albx0002 }}</a>
              <ul class="project-item-info">
                <li>{{ itrm.albx0016 }}/{{ itrm.albx0044 }}人</li>
                <li>{{ itrm.albx0031 ? itrm.albx0031.slice(0, 10) : '' }}</li>
              </ul>
              <div class="project-item-host">
                <img src="@/assets/img/imgsy/avatar7.svg" alt="" />
                <span>{{ itrm.albx0062 }}</span>
              </div>
            </div>
          </li>
          <div v-if="toicon == 1" class="data-null" style="margin-top: 10rem">
            <img src="@/assets/img/imgsy/null1.svg" alt="" />
            <span>暂时还没有数据哦～</span>
          </div>
        </list>
      </pull-refresh>
    </section>
    <div class="select-mask" :class="{ show: isShowx }"></div>
    <div class="select-wrap flex-v" :class="{ show: isShowx }">
      <div class="select-wrap-header flex-h v-m t-lr">
        <span @click="SelectNotShow('del')">取消</span>
        <span style="color: #db0000" @click="SelectNotShow('select')">确定</span>
      </div>
      <ul class="flex-v flex-1 select-wrap-item" style="overflow: auto" v-if="showitems == 2">
        <li v-for="(item, index) in servicet" :key="index" class="flex-h v-m t-c" :class="{ active: index == current }" @click="isItemActive(index, item.codeid)">
          {{ item.codevalue }}
        </li>
      </ul>
      <ul class="flex-v flex-1 select-wrap-item" style="overflow: auto" v-if="showitems == 1">
        <li v-for="(item, index) in regioninfo" :key="index" class="flex-h v-m t-c" :class="{ active: index == current }"
          @click="isItemActive(index, item.areaid, item.provincename)">
          {{ item.provincename }}
        </li>
      </ul>
    </div>

    <Popup v-model="showPopup" round position="bottom">
      <Cascader v-model="cascaderValue" title="请选择所在地区" :options="options" :field-names="fieldNames" :closeable="false" @change="onChange">
        <template slot="title">
          <div style="position：relative; ">
            <div style="position: absolute; width: calc(100% - 32px)">
              <div class="my_cascader" style="display: flex">
                <span style="color: #969799; font-size: 15px; width: 4rem" @click="closeserviceAreaOptions">取消</span>
                <span style="display: block; width: 100%; text-align: center">点击选择服务区域</span>
                <span style="color: #ee0a24; font-size: 15px; width: 4rem" @click="serviceConfirm">确认</span>
              </div>
            </div>
          </div>
        </template>
      </Cascader>
    </Popup>
  </div>
</template>
<script>
import { List, Cascader, Popup, PullRefresh } from 'vant'
export default {
  components: {
    List,
    Cascader,
    Popup,
    PullRefresh,
  },
  data() {
    return {
      areaid: this.$store.getters.getregion.raid, //区域id
      regPlace: this.$store.getters.getregion.regPlace, //区域名
      areaidz: '', //区域id暂存
      regPlacez: '', //区域名暂存
      selectActive: 0, //切换筛选条件
      isShow: false, //智能筛选弹窗
      regioninfo: [], //区域列表
      isShowx: false, //服务类型弹窗
      servicet: [], //服务类型
      x0014: [],
      showitems: 0, //地区弹出框1,服务弹窗框2
      current: 0, //弹窗选择位置
      projectdata: [], //项目数据
      //分页
      page: 1, //当前页

      searchName: '', //输入框内容
      albx0015: '4', //项目状态
      albx0015z: '4', //暂存项目状态
      albx0024: '', //招募范围
      albx0024z: '', //暂存招募范围
      albx0014: '', //服务对象
      albx0014z: '', //暂存服务对象
      albx0009: '', //服务类别
      albx0009z: '', //服务类别暂存
      pronum: '', //人数范围
      pronumz: '', //人数范围暂存
      isLoading: false, //下拉刷新
      loading: false,
      finished: false,
      pageNow: 0,
      pageSize: 20,
      endNum: 1,

      fieldValue: '', //注册地点 input框中的·中文名
      serviceAreaValue: '',
      showPopup: false, //三级联动显示隐藏
      cascaderValue: '', //注册地点 市级地区的 areaid
      options: [], //区域列表
      fieldNames: {
        //级联选择自定义字段
        text: 'area',
        value: 'areaid',
        children: 'children',
      },

      toicon: 0, //没有项目时的图标0隐藏1显示
    }
  },
  mounted() {
    if (!this.$store.getters.getregion.raid) {
      this.areaid = '100000000000000000'
      this.regPlace = '全国'
    }
    // this.utilscommit.wetchat({ title: '志愿项目列表', desc: '奉献爱心，处处可为！点击查看更多', link: window.location.href })
    // this.utilscommit.request(
    //   //获取服务类型
    //   'nvsi_jsGetCodeValues',
    //   { areaid: '100000000000000000', tableName: 'lbe05' },
    //   this.provincesBack1
    // )
    // this.utilscommit.request(
    //   //获取服务对象
    //   'nvsi_jsGetCodeValues',
    //   { tableName: 'nvsi_albx0014' },
    //   this.provincesBack3
    // )
    // this.utilscommit.request(
    //   //获取区域选择框
    //   'nvsi_jsGetAreaList',
    //   {},
    //   this.callback1
    // )
    //获取服务类型
    // this.utilscommit.requestapi('areaTreeFortisH5', {}, this.callback1) /* 区域选择框 */
    this.sessionStorage.getCodeValueH5("areaTree",'areaTreeFortisH5',{},this.callback1)
    this.utilscommit.requestapi('getAllCodeH5', {codeTypeName :"lbe05", areaId: this.areaid }, this.provincesBack1)
    this.sessionStorage.getCode0014((src)=>{ this.x0014=src})


  //  this.utilscommit.requestapi(
  //     //获取服务对象
  //     'getCodeValuesFortisH5',
  //     {
  //       tableName: 'nvsi_albx0014',
  //     },
  //     this.provincesBack3
  //   )
  },
  methods: {
    tovolProject(a, b) {
      this.$router.push({ name: 'volunteerProject1api', params: { id: a, aid: b } })
    },
    onFinish({ selectedOptions }) {
      //获取服务区域输入框显示字段
      this.fieldValue = selectedOptions.map((option) => option.area).join('/')
      this.areaid = this.serviceAreaValue.value
      this.regPlace = this.fieldValue.split('/').slice(-1)[0]
      this.$store.commit('changeregion', {
        raid: this.areaid,
        regPlace: this.regPlace,
      }) //存选中regid和地区名
      this.pageNow = 1
      this.projectdata = []
      this.loading = true
      this.provincesBack2q()
    },
    serviceConfirm() {
      //确定
      if (this.serviceAreaValue) this.onFinish(this.serviceAreaValue)
      this.showPopup = false
    },
    closeserviceAreaOptions() {
      //取消
      this.serviceAreaValue = {}
      this.fieldValue = ''
      this.cascaderValue = ''
      this.showPopup = false
    },
    onChange(value) {
      this.serviceAreaValue = value
      // if (value.value == 100000000000000000) {
      //   return
      // }
      // this.utilscommit.request(
      //   'nvsi_jsGetAreaidList',
      //   {
      //     areaid: value.value,
      //   },
      //   this.checkserve
      // )
      this.utilscommit.requestapi(
        'areaTreeFortisH5',
        {
          areaid: value.value,
        },
        this.checkserve
      )
    },
    checkserve(res) {
      if (res.code == '0') {
        if (this.serviceAreaValue.tabIndex == 0) {
          let options = []
          for (let i = 0; i < res.data.child.length; i++) {
            res.data.child[i].children = []
            options.push(res.data.child[i])
          }
          this.options.forEach((el, index) => {
            if (this.serviceAreaValue.value == el.areaid) {
              this.options[index].children = options
              return
            }
          })
        } else if (this.serviceAreaValue.tabIndex == 1) {
          for (let i = 0; i < this.options.length; i++) {
            this.options[i].children.forEach((el, index) => {
              if (this.serviceAreaValue.value == el.areaid) {
                this.options[i].children[index].children = res.data.child
                return
              }
            })
          }
        }
      }
    },
    callback1(res) {
      //区域选择框
 
        if (res) {
          let options = []
        
          for (let i = 0; i < res.child.length; i++) {
            // if (res.data.child[i].area != '全国1') {
            //   res.data.child[i].children = []
            //   options.push(res.data.child[i])
            // }
              if (res.child[i].area == this.regPlace) {
              res.child[i].children = []
              options.push(res.child[i])
           
          }
          this.options = options

          //  console.log(options)
        }
      }
    },

    formSubmit() {
      return false
    },
    searchxx() {
      //搜索项目
      if (event.keyCode == 13) {
        this.pageNow = 1
        this.loading = true
        this.projectdata = []
        this.provincesBack2q()
      }
    },
    intelligence() {
      //传递参数
      this.albx0015 = this.albx0015z
      this.albx0024 = this.albx0024z
      this.albx0014 = this.albx0014z
      this.albx0009 = this.albx0009z
      this.pronum = this.pronumz
      this.pageNow = 1
      this.projectdata = []
      this.loading = true
      this.provincesBack2q()

      this.isShow = false
    },
    intelligencex() {
      this.albx0015z = '4'
      this.albx0024z = ''
      this.albx0014z = ''
      this.albx0009z = ''
      this.pronumz = 0
    },
    onalbx0015(res) {
      this.albx0015z = res
    },
    onalbx0024(res) {
      this.albx0024z = res
    },
    onalbx0014(res) {
      this.albx0014z = res
    },
    onalbx0009(res) {
      this.albx0009z = res
    },
    onpronum(res) {
      this.pronumz = res
    },

    provincesBack3(src) {
      if (src.code == 0) {
        this.x0014 = src.data
      }
    },
    provincesBack2q() {
      let jsonObj = {}
      jsonObj.pageNum = this.pageNow //请求的页码
      jsonObj.pageSize = this.pageSize //每页多少条
      jsonObj.albx0021 = this.areaid

      if (this.areaid.substr(2, 2) * 1 == 0) {
        jsonObj.axaa0001 = this.areaid.substr(0, 2)
      } else {
        jsonObj.axaa0001 = this.areaid.substr(0, 2)
        jsonObj.axaa0002 = this.areaid.substr(0, 4)
        if (this.areaid.substr(4, 2) * 1 != 0) {
          jsonObj.axaa0003 = this.areaid.substr(0, 6)
        }
      }

      jsonObj.albx0009 = this.albx0009 //服务类别

      if (this.searchName) {
        //查询项目名称
        jsonObj.albx0002 = this.searchName
      }
      if (this.albx0015) {
        //项目状态
        if (this.albx0015 == 5) {
          //已结项
          jsonObj.albx0073 = '18'
          jsonObj.albx0073A = '20'
          jsonObj.code = '4'
        } else {
          jsonObj.albx0072 = this.albx0015
          jsonObj.code = '4'
        }
        // jsonObj.albx0072 = this.albx0015
      } else {
        jsonObj.albx0072 = '3'
        jsonObj.albx0072A = '5'
        jsonObj.code = '4'
      }
      if (this.albx0024) {
        //招聘范围
        jsonObj.albx0024 = this.albx0024
      }
      if (this.albx0014) {
        //服务对象
        jsonObj.albx0014 = this.albx0014
      }
      if (this.pronum) {
        if (this.pronum == 0) {
        } else if (this.pronum == 1) {
          jsonObj.albx0016 = 1
        } else if (this.pronum == 2) {
          jsonObj.albx0016 = 2
        } else if (this.pronum == 3) {
          jsonObj.albx0016 = 3
        } else if (this.pronum == 4) {
          jsonObj.albx0016 = 4
        } else if (this.pronum == 5) {
          jsonObj.albx0016 = 5
        }
      }
      // debugger
     
      this.utilscommit.requestapi(
        //获取服务对象
        'listProjectsFortisH5',
        jsonObj,
        this.provincesBack2
      )
    },
    provincesBack2(src) {
      // debugger
      //初始化数据
      this.toicon = 0 //重新请求后隐藏显示没有的图片

      var _result = []
      if (src.code == 0 && src.data.length > 0) {
        _result = src.data

        _result.forEach((item, index, array) => {
          if (item.albx0009) {
            if (item.albx0009.split(',')[1]) {
              item.albx0009 = item.albx0009.split(',')[0]
            }
            if (item.albx0009 == '3201' || item.albx0009 == '3202' || item.albx0009 == '3203' || item.albx0009 == '3204') {
              item.albx0009 = '0099'
            }
            return item
          } else {
            item.albx0009 = '0099'
          }
          return item
        })

        this.endNum = src.pageCount
        this.loading = false
      } else {
        this.loading = false
        if (this.pageNow === 1) {
          //当第一页没数,显示没有的图片
          this.toicon = 1
        }
      }
      if (this.pageNow === 1) {
        if (src && src.data) {
          this.projectdata = src.data
        } else {
          this.projectdata = []
        }
      } else {
        this.projectdata = [...this.projectdata, ..._result]
      }
    },
    isItemActive(index, cod, res) {
      this.current = index
      if (this.showitems == 1) {
        //当前是省份选择框
        this.areaidz = cod //暂存选择的信息
        this.regPlacez = res
      }
      if (this.showitems == 2) {
        //当前是服务类型选择框
        this.albx0009z = cod //暂存服务类别
      }
    },
    SelectNotShow(tab) {
      //选择按钮
      this.isShowx = false
      var mo = function(e) {
        e.preventDefault()
      }
      document.body.style.overflow = '' //出现滚动条
      document.removeEventListener('touchmove', mo, false)
      if (tab == 'select') {
        //确认按钮
        if (this.showitems == 1) {
          //当前是省份选择框
          this.areaid = this.areaidz
          this.regPlace = this.regPlacez
        }
        if (this.showitems == 2) {
          //当前是服务类型选择框
          this.albx0009 = this.albx0009z
        }
        this.pageNow = 1
        this.loading = true
        this.projectdata = []
        this.provincesBack2q() //获取列表信息
      }
    },
    changeSelect(index) {
      //切换筛选条件
      this.selectActive = index
      if (index == 0) {
        this.showPopup = true
      }
      if (index == 1) {
        this.isShowx = true
        this.showitems = 2
      }
      if (index == 2) {
        //打开智能筛选
        this.albx0015z = this.albx0015 //给暂存赋值
        this.albx0024z = this.albx0024
        this.albx0014z = this.albx0014
        this.albx0009z = this.albx0009
        this.pronumz = this.pronum
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    provincesBack1(src) {
      if (src.code == 0) this.servicet = src.data
    },
    onRefresh() {
      //下拉刷新
      // debugger;
      let thie = this
      setTimeout(() => {
        thie.isLoading = false
        thie.pageNow = 1
        thie.provincesBack2q()
        //  thie.projectdata=[]
        thie.finished = false
      }, 1000)
    },
    onLoad() {
      //debugger
      this.pageNow++
      const nextNum = this.pageNow
      if (nextNum > this.endNum) {
        this.finished = true
      } else {
        this.provincesBack2q()
      }
    },
  },
}
</script>
<style scoped>
.select-wrap.flex-v.slect-u {
  top: -43rem;
  bottom: auto;
}
.select-wrap.flex-v.slect-u.show {
  top: auto;
  bottom: auto;
}
div.preview-container {
  height: 100%;

  overflow: hidden;
}
#preview-html {
  height: 100%;
  overflow-y: auto;
}
#preview-html li {
  border-radius: 0.3rem;

  background-color: #f7f8fa;
  text-align: center;
  font-size: 1.2rem;
  margin: 0.7rem 0;
  line-height: 2.5rem;
}
#preview-html span {
  font-size: 1.3rem;
  line-height: 3.5rem;
}
#preview-html li.active {
  background-color: #db0000;
  color: #fff;
}

.anniu div {
  width: 48%;
  height: 3rem;
  line-height: 3rem;
  background-color: #f7f8fa;
}
.anniu {
  height: 5rem;
  font-size: 1.5rem;
  text-align: center;
}

.select-wrap-item li.active {
  color: #db0000;
}
.project-item {
  margin-top: 0 !important;
  padding: 1rem 0;
}
.project-item-tag {
  width: 5rem;
}
input[type="search"]::-webkit-search-cancel-button {
  -webkit-appearance: none; /*此处只是去掉默认的小×*/
}
.cascader > li {
  font-size: 1.7rem;
}
.cascader > li.active {
  color: #db0000;
  font-weight: 600;
  font-size: 1.8rem;
}
.cascader > li.active::after {
  display: none;
}
</style>
