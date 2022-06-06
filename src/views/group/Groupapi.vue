<template>
  <div class="page">
    <header class="header" style="z-index: 1">
      <div class="header-prefix">
        <a class="flex-h v-m" href="javascript:void(0);" @click="$router.go(-1)">
          <img style="margin-right: 0.5rem" src="@/assets/img/back.svg" alt="" class="page-back" />
        </a>
      </div>
      <h1 class="header-title" style="text-align: left; padding-left: 3rem">
        志愿队伍
      </h1>
      <div class="header-suffix"></div>
    </header>
    <div class="plr-40 pt-20 bg-white" style="margin-top: 4.4rem">
      <div class="search type2">
        <img class="search-icon" src="@/assets/img/imgsy/search-gray.svg" alt="" />
        <!-- <div action="javascript:return true">
          <input
            class="search-core"
            type="search"
            v-model="searchName"
            @keydown="searchxx($event)"
            placeholder="请输入要搜索的队伍名称"
          />
        </div> -->
        <div class="form">
          <div class="form-row" style="padding: 0;">
            <input type="text" class="form-core" v-model="searchName" placeholder="请输入要搜索的队伍名称" @keydown="searchxx($event)" />
          </div>
        </div>
        <!-- <form action="javascript:return true" @submit.prevent="formSubmit">
          <input type="search" v-model="searchName" placeholder="请输入要搜索的队伍名称" @keydown="searchxx($event)" />
        </form> -->

        <!-- <img class="search-delete" src="@/assets/img/imgsy/delete.svg" alt="" style="display: none" /> -->
      </div>
      <ul class="cascader mt-35">
        <li class="cascader-item" :class="[selectActive == '0' && 'active']" @click="changeSelect(0)" id="area-select">
          <span style="text-overflow: ellipsis;
    overflow: hidden;
    max-width: 13rem;
    white-space: nowrap;">{{ regPlace }}</span>
        </li>
        <li class="cascader-item" :class="[selectActive == '1' && 'active']" @click="changeSelect(1)" id="type-select">
          <span>服务类别</span>
        </li>
        <li class="cascader-item" :class="[selectActive == '2' && 'active']" @click="changeSelect(2)" id="filter-select">
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
              <span>队伍类别</span>
              <ul style="
                  display: flex;
                  justify-content: space-between;
                  flex-wrap: wrap;
                ">
                <li v-for="(itrm, i) in x0014" :key="i" :class="[albe0005z == itrm.codeid && 'active']" style="width: 32%" @click="onalbe0005(itrm.codeid)">
                  {{ itrm.codevalue }}
                </li>
              </ul>
              <span>队伍人数</span>
              <ul style="
                  display: flex;
                  justify-content: space-between;
                  flex-wrap: wrap;
                ">
                <li style="width: 21%" :class="[pronumz == '0' && 'active']" @click="onpronum('0')">
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
    <section class="section pb-35">
      <pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
        <list v-model="loading" :finished="finished" finished-text="" @load="onLoad">
          <ul class="post-list">
            <li class="post-item" v-for="(itrm, i) in projectdata" :key="i" @click="togroupx(itrm.id, itrm.albe0012)">
              <div class="flex-h mt-10">
                <img style=" width: 11rem;min-width: 11rem; height: 6rem;border-radius: 1rem;" class="group-avatar" :src="common.Teampicture(itrm.albe0025, itrm.albe0012)"
                  alt="" />

                <div class="flex-v">
                  <b style="text-overflow: -o-ellipsis-lastline;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;
                     -webkit-line-clamp: 2;-webkit-box-orient: vertical;" class="text" size="32">{{ itrm.albe0002 }}</b>
                  <div class="location-info">
                    <img src="@/assets/img/imgsy/location-gray.svg" alt="" />
                    <span>{{ itrm.albe0013 }}</span>
                  </div>
                </div>
              </div>
              <ul class="post-item-hc">
                <li>
                  <p>{{ itrm.albe0069 }}</p>
                  <span>服务时长(小时)</span>
                </li>
                <li>
                  <p>{{ itrm.albe0056 }}</p>
                  <span>正式成员(人)</span>
                </li>
              </ul>
            </li>
          </ul>
          <div v-if="toicon == 1" class="data-null" style="margin-top:10rem;">
            <img src="@/assets/img/imgsy/null1.svg" alt="" />
            <span>暂时还没有数据哦～</span>
          </div>
        </list>
      </pull-refresh>
    </section>

    <!-- 筛选 -->
    <div class="filter-pop">
      <div class="filter-pop-mask"></div>
      <div class="filter-panel">
        <div class="filter-panel-title">队伍类别</div>
        <!-- 加属性 multiple 开启多选样式 -->
        <ul class="filter-list" multiple>
          <li class="active">全部</li>
          <li>党政机关</li>
          <li>群团组织</li>
          <li>卫生事业</li>
          <li>居民委员会</li>
          <li>社会福利事业单位</li>
        </ul>
      </div>
      <div class="filter-panel">
        <div class="filter-panel-title">队伍人数</div>
        <ul class="filter-list">
          <li class="active">全部</li>
          <li>0-100</li>
          <li>101-200</li>
          <li>201-500</li>
          <li>501-1000</li>
          <li>1000以上</li>
        </ul>
      </div>
      <div class="filter-btns">
        <div class="filter-btn filter-btn-reset">重置</div>
        <div class="filter-btn filter-btn-submit" type="danger">确定</div>
      </div>
    </div>

    <div class="select-mask" :class="{ show: isShowx }"></div>
    <div class="select-wrap flex-v" :class="{ show: isShowx }">
      <div class="select-wrap-header flex-h v-m t-lr">
        <span @click="SelectNotShow('del')">取消</span>
        <span style="color: #db0000" @click="SelectNotShow('select')">确定</span>
      </div>
      <ul class="flex-v flex-1 select-wrap-item" style="overflow: auto" v-if="showitems == 2">
        <li v-for="(item, index) in servicet" :key="index" class="flex-h v-m t-c" :class="{ active: index == current }" @click="isItemActive(index, item.codeid)">
          {{ item.codevalue  }}
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
import { PullRefresh, List, Cascader, Popup } from 'vant'
export default {
  components: {
    PullRefresh,
    List,
    Cascader,
    Popup,
  },
  data: function() {
    return {
      areaid: this.$store.getters.getregion.raid, //区域id
      areaidz: '',
      regPlace: this.$store.getters.getregion.regPlace, //区域名
      regPlacez: '',
      selectActive: 0, //切换筛选条件
      isShow: false, //智能筛选弹窗

      isShowx: false, //服务类型弹窗
      servicet: [], //服务类型
      showitems: 0, //地区弹出框1,服务弹窗框2
      current: 0, //弹窗选择位置

      x0014: [], //队伍类型返回数据
      pronum: 0, //人数范围
      pronumz: 0, //人数范围暂存
      albe0005z: '', //队伍类型暂存
      albe0005: '', //队伍类型
      albe0017z: '', //服务类型暂存
      albe0017: '', //服务类型
      searchName: '', //输入的值
      projectdata: [], //队伍数据
      regioninfo: [], //区域列表
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
    // this.utilscommit.wetchat({ title: '志愿队伍列表', desc: '志愿同行，传递温暖！点击查看更多', link: window.location.href })
  
  
    //获取服务类型
    this.utilscommit.requestapi('getAllCodeH5', {codeTypeName :"lbe05", areaId: this.areaid }, this.provincesBack1)
     this.sessionStorage.getCode0005((src)=>{ this.x0014=src})
  
    // this.utilscommit.requestapi('areaTreeFortisH5', {}, this.callback1) /* 区域选择框 */
     this.sessionStorage.getCodeValueH5("areaTree",'areaTreeFortisH5',{},this.callback1)
  },
  methods: {
    onFinish({ selectedOptions }) {
      //获取服务区域输入框显示字段
      this.fieldValue = selectedOptions.map((option) => option.area).join('/')
      this.areaid = this.serviceAreaValue.value
      this.regPlace = this.fieldValue.split('/').slice(-1)[0]
      this.$store.commit('changeregion', {
        raid: this.areaid,
        regPlace: this.regPlace,
      }) //存选中的regid和地区名
      this.pageNow = 1
      this.loading = true
      this.projectdata = []
      this.getVoluntaryGroupList()
      // this.serviceAreaValue = {};
      // this.fieldValue = "";
      // this.cascaderValue = "";
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
          // for (let i = 0; i < res.data.child.length; i++) {
          //   if (res.data.child[i].area = '全国1') {
          //     res.data.child[i].children = []
          //     options.push(res.data.child[i])
          //   }
          // }
           for (let i = 0; i < res.child.length; i++) {
            if (res.child[i].area == this.regPlace) {
              res.child[i].children = []
              options.push(res.child[i])
            
          }
          this.options = options
        }
      }
    },

    formSubmit() {
      return false
    },
    togroupx(res, ares) {
      //跳转到详情页
      this.$router.push({
        name: 'GroupDetailapi',
        params: { id: res, aid: ares },
      })
    },

    onalbe0005(res) {
      this.albe0005z = res
    },
    onpronum(res) {
      this.pronumz = res
    },
    provincesBack3(src) {
      if (src && src.data) {
        this.x0014 = src.data
        console.log(src, '队伍类别')
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
        this.albe0017z = cod //暂存服务类别
      }
    },
    changeSelect(index) {
      //切换筛选条件
      this.selectActive = index
      if (index == 0) {
        this.showPopup = true
        // this.isShowx = true;
        // this.showitems = 1;
      }
      if (index == 1) {
        this.isShowx = true
        this.showitems = 2
      }
      if (index == 2) {
        //打开智能筛选
        this.albe0005z = this.albe0005 //给暂存赋值
        this.pronumz = this.pronum
        this.isShow = true
      } else {
        this.isShow = false
      }
    },
    provincesBack1(src) {
      if (src.code == 0) this.servicet = src.data
    },
    SelectNotShow(tab) {
      //选择按钮
      // debugger
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
          this.albe0017 = this.albe0017z
        }
        this.pageNow = 1
        this.loading = true
        this.projectdata = []

        this.getVoluntaryGroupList() //获取列表信息
      }
    },
    getVoluntaryGroupList(pag) {
      let requestPara = {}
      requestPara.pageNum = this.pageNow ? this.pageNow : 1 //请求的页码
      requestPara.pageSize = this.pageSize //每页多少条
      requestPara.areaId = this.areaid
      requestPara.albe0026=1
      if (this.searchName) {
        requestPara.albe0002 = this.searchName
      }
      if (this.albe0017) {
        requestPara.albe0017 = this.albe0017
      }
      if (this.albe0005) {
        requestPara.albe0005 = this.albe0005
      }
      if (this.pronum) {
        if (this.pronum == 0) {
        } else if (this.pronum == 1) {
          requestPara.albe0056Start = 0
          requestPara.albe0056End = 100
        } else if (this.pronum == 2) {
          requestPara.albe0056Start = 101
          requestPara.albe0056End = 200
        } else if (this.pronum == 3) {
          requestPara.albe0056Start = 201
          requestPara.albe0056End = 500
        } else if (this.pronum == 4) {
          requestPara.albe0056Start = 501
          requestPara.albe0056End = 1000
        } else if (this.pronum == 5) {
          requestPara.albe0056Start = 1000
        }
      }
      console.log(requestPara)
      // debugger
      this.utilscommit.requestapi(
        //获取服务对象
        'queryTeamPageH5',
        requestPara,
        this.provincesBack2
      )
    },
    intelligence() {
      this.albe0005 = this.albe0005z
      this.pronum = this.pronumz
      this.loading = true
      this.projectdata = []
      this.getVoluntaryGroupList(1)
      this.isShow = false
    },
    intelligencex() {
      this.albe0005z = ''
      this.pronumz = 0
    },
    provincesBack2(src) {
      console.log(src)
      var _result = []

      // debugger
      //初始化数据
      this.toicon = 0 //重新请求后隐藏显示没有的图片

      if (src && src.data) {
        _result = src.data
        this.endNum = src.pageCount
        this.loading = false
        this.pageNow = src.pageNo
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
      console.log(this.projectdata, '请求结果')
    },

    searchxx() {
      //搜索项目
      if (event.keyCode == 13) {
        this.pageNow = 1
        this.loading = true
        this.projectdata = []
        this.getVoluntaryGroupList()
      }
    },
    onRefresh() {
      //下拉刷新
      // debugger;
      let thie = this
      setTimeout(() => {
        thie.isLoading = false
        thie.pageNow = 1
        thie.getVoluntaryGroupList()
        //  thie.projectdata=[]
        thie.finished = false
      }, 1000)
    },
    onLoad() {
      this.pageNow++
      const nextNum = this.pageNow
      if (nextNum > this.endNum) {
        this.finished = true
      } else {
        this.getVoluntaryGroupList()
      }
    },
    // onRefresh() {
    //   //下拉刷新
    //   setTimeout(() => {
    //     this.isLoading = false;
    //     this.getData();
    //   }, 1000);
    // },
    // getData() {
    //   this.getVoluntaryGroupList(1);
    // },
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
.select-wrap-item li.active {
  color: #db0000;
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
.group-avatar {
  border-radius: 3rem;
}
</style>
