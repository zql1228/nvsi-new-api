<template>
  <div class="page">
    <div class="header">
      <div class="header-prefix">
        <img src="@/assets/img/back.svg" alt="" class="page-back" @click="$router.go(-1)" />
      </div>
      <h2 class="header-title">团体项目</h2>
      <div class="header-suffix"></div>
    </div>
    <ul class="tabbox type4" style="margin-top: 4.4rem">
      <li :class="active == '' ? 'active' : ''" @click="active = ''">全部</li>
      <li :class="active == 3 ? 'active' : ''" @click="active = 3">招募待启动</li>
      <li :class="active == 4 ? 'active' : ''" @click="active = 4">运行中</li>
      <li :class="active == 5 ? 'active' : ''" @click="active = 5">已结项</li>
    </ul>
    <section class="section mt-20 plr-40 ptb-24 bg-white" style="height: 100%">
      <PullRefresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
        <div class="tab-view" id="tab-view1">
          <!-- 全部 -->
          <div class="tab-view-item active" v-show="active == ''">
            <ul class="project-list type4">
              <li
                class="project-item"
                v-for="(item, index) in list1"
                :key="index"
                @click="$router.push(`/volunteerProject1api/${item.id}/${item.albx0021}`)"
              >
                <div class="project-item-cover">
                  <img
                    v-if="item.prophoto"
                    :src="common.context() + item.prophoto"
                    @error="common.imgError($event, require('@/assets/img/imgsy/img27.png'))"
                    alt=""
                  />
                  <img v-else src="@/assets/img/imgsy/img27.png" alt="" />
                  <div
                    style="
                      height: 1.5rem;
                      position: absolute;
                      top: 0;
                      left: 0;
                      padding: 0 0.5rem;
                      line-height: 1.5rem;
                      text-align: center;
                      font-weight: bold;
                      font-size: 1rem;
                      color: #fff;
                      border-radius: 0.4rem 0 0.4rem 0;
                      background: #0db40b;
                    "
                  >
                    {{
                      item.albx0073 == 10
                        ? '代办理'
                        : item.albx0073 == 11
                        ? '待审批'
                        : item.albx0073 == 13
                        ? '待启动'
                        : item.albx0073 == 14
                        ? '招募中'
                        : item.albx0073 == 15
                        ? '未招聘'
                        : item.albx0073 == 16
                        ? '运行中'
                        : item.albx0073 == 18
                        ? '自动结项'
                        : item.albx0073 == 19
                        ? '手动结项'
                        : item.albx0073 == 20
                        ? '补录'
                        : item.albx0073 == 21
                        ? '停用'
                        : item.albx0073 == 22
                        ? '作废'
                        : ''
                    }}
                  </div>
                  <div class="project-item-cover-title">
                    {{ item.albx0012 }}
                  </div>
                </div>
                <div class="project-item-main">
                  <a href="javascript:void(0);" class="project-item-title">{{ item.albx0002 }}</a>
                  <ul class="project-item-info">
                    <li>{{ item.albx0016 }}/{{ item.albx0044 }}人</li>
                    <li>{{ item.createtime.substring(0, 11) }}</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          <!-- 待启动 -->
          <div class="tab-view-item active" v-show="active == 3">
            <ul class="project-list type4">
              <li
                class="project-item"
                v-for="(item, index) in list3"
                :key="index"
                @click="$router.push(`/volunteerProject1api/${item.id}/${item.albx0021}`)"
              >
                <div class="project-item-cover">
                  <img
                    v-if="item.prophoto"
                    :src="common.context() + item.prophoto"
                    @error="common.imgError($event, require('@/assets/img/imgsy/img27.png'))"
                    alt=""
                  />
                  <img v-else src="@/assets/img/imgsy/img27.png" alt="" />
                  <div
                    style="
                      height: 1.5rem;
                      position: absolute;
                      top: 0;
                      left: 0;
                      padding: 0 0.5rem;
                      line-height: 1.5rem;
                      text-align: center;
                      font-weight: bold;
                      font-size: 1rem;
                      color: #fff;
                      border-radius: 0.4rem 0 0.4rem 0;
                      background: #0db40b;
                    "
                  >
                    {{
                      item.albx0073 == 10
                        ? '代办理'
                        : item.albx0073 == 11
                        ? '待审批'
                        : item.albx0073 == 13
                        ? '招募待启动'
                        : item.albx0073 == 14
                        ? '招募中'
                        : item.albx0073 == 15
                        ? '未招聘'
                        : item.albx0073 == 16
                        ? '运行中'
                        : item.albx0073 == 18
                        ? '自动结项'
                        : item.albx0073 == 19
                        ? '手动结项'
                        : item.albx0073 == 20
                        ? '补录'
                        : item.albx0073 == 21
                        ? '停用'
                        : item.albx0073 == 22
                        ? '作废'
                        : ''
                    }}
                  </div>
                  <div class="project-item-cover-title">
                    {{ item.albx0012 }}
                  </div>
                </div>
                <div class="project-item-main">
                  <a href="javascript:void(0);" class="project-item-title">{{ item.albx0002 }}</a>
                  <ul class="project-item-info">
                    <li>{{ item.albx0016 }}/{{ item.albx0044 }}人</li>
                    <li>{{ item.createtime.substring(0, 11) }}</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <!-- 运行中 -->
          <div class="tab-view-item active" v-show="active == 4">
            <ul class="project-list type4">
              <li
                class="project-item"
                v-for="(item, index) in list4"
                :key="index"
                @click="$router.push(`/volunteerProject1api/${item.id}/${item.albx0021}`)"
              >
                <div class="project-item-cover">
                  <img
                    v-if="item.prophoto"
                    :src="common.context() + item.prophoto"
                    @error="common.imgError($event, require('@/assets/img/imgsy/img27.png'))"
                    alt=""
                  />
                  <img v-else src="@/assets/img/imgsy/img27.png" alt="" />
                  <div
                    style="
                      height: 1.5rem;
                      position: absolute;
                      top: 0;
                      left: 0;
                      padding: 0 0.5rem;
                      line-height: 1.5rem;
                      text-align: center;
                      font-weight: bold;
                      font-size: 1rem;
                      color: #fff;
                      border-radius: 0.4rem 0 0.4rem 0;
                      background: #0db40b;
                    "
                  >
                    {{
                      item.albx0073 == 10
                        ? '代办理'
                        : item.albx0073 == 11
                        ? '待审批'
                        : item.albx0073 == 13
                        ? '招募待启动'
                        : item.albx0073 == 14
                        ? '招募中'
                        : item.albx0073 == 15
                        ? '未招聘'
                        : item.albx0073 == 16
                        ? '运行中'
                        : item.albx0073 == 18
                        ? '自动结项'
                        : item.albx0073 == 19
                        ? '手动结项'
                        : item.albx0073 == 20
                        ? '补录'
                        : item.albx0073 == 21
                        ? '停用'
                        : item.albx0073 == 22
                        ? '作废'
                        : ''
                    }}
                  </div>
                  <div class="project-item-cover-title">
                    {{ item.albx0012 }}
                  </div>
                </div>
                <div class="project-item-main">
                  <a href="javascript:void(0);" class="project-item-title">{{ item.albx0002 }}</a>
                  <ul class="project-item-info">
                    <li>{{ item.albx0016 }}/{{ item.albx0044 }}人</li>
                    <li>{{ item.createtime.substring(0, 11) }}</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <!-- 已结项 -->
          <div class="tab-view-item active" v-show="active == 5">
            <ul class="project-list type4">
              <li
                class="project-item"
                v-for="(item, index) in list5"
                :key="index"
                @click="$router.push(`/volunteerProject1api/${item.id}/${item.albx0021}`)"
              >
                <div class="project-item-cover">
                  <img
                    v-if="item.prophoto"
                    :src="common.context() + item.prophoto"
                    @error="common.imgError($event, require('@/assets/img/imgsy/img27.png'))"
                    alt=""
                  />
                  <img v-else src="@/assets/img/imgsy/img27.png" alt="" />
                  <div
                    style="
                      height: 1.5rem;
                      position: absolute;
                      top: 0;
                      left: 0;
                      padding: 0 0.5rem;
                      line-height: 1.5rem;
                      text-align: center;
                      font-weight: bold;
                      font-size: 1rem;
                      color: #fff;
                      border-radius: 0.4rem 0 0.4rem 0;
                      background: #0db40b;
                    "
                  >
                    {{
                      item.albx0073 == 10
                        ? '代办理'
                        : item.albx0073 == 11
                        ? '待审批'
                        : item.albx0073 == 13
                        ? '招募待启动'
                        : item.albx0073 == 14
                        ? '招募中'
                        : item.albx0073 == 15
                        ? '未招聘'
                        : item.albx0073 == 16
                        ? '运行中'
                        : item.albx0073 == 18
                        ? '自动结项'
                        : item.albx0073 == 19
                        ? '手动结项'
                        : item.albx0073 == 20
                        ? '补录'
                        : item.albx0073 == 21
                        ? '停用'
                        : item.albx0073 == 22
                        ? '作废'
                        : ''
                    }}
                  </div>
                  <div class="project-item-cover-title">
                    {{ item.albx0012 }}
                  </div>
                </div>
                <div class="project-item-main">
                  <a href="javascript:void(0);" class="project-item-title">{{ item.albx0002 }}</a>
                  <ul class="project-item-info">
                    <li>{{ item.albx0016 }}/{{ item.albx0044 }}人</li>
                    <li>{{ item.createtime.substring(0, 11) }}</li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div class="flex-h t-c v-m" v-show="!isLoading">
            <span
              class="text info"
              size="default"
              v-if="(active == '' && !ismore1) || (active == 3 && !ismore3) || (active == 4 && !ismore4) || (active == 5 && !ismore5)"
              >没有更多了</span
            >
            <span class="text info" size="default" v-else @click="get(active)">加载更多</span>
          </div>
        </div>
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
      active: '',
      list1: [],

      list3: [],
      list4: [],
      list5: [],
      pagenum1: 1,

      pagenum3: 1,
      pagenum4: 1,
      pagenum5: 1,
      ismore1: true,

      ismore3: true,
      ismore4: true,
      ismore5: true,
      pagesize: 8,
      isLoading: false,
    }
  },
  mounted() {
    // this.utilscommit.wetchat({ title: '欢迎加入中国志愿服务', desc: '“益”路有你 志愿同行', link: window.location.origin })
    this.get('')

    this.get(3)
    this.get(4)
    this.get(5)
  },
  methods: {
    get(active) {
      let data = {
        teamId: this.$route.params.id,
        albx0021: this.$route.params.aid,
        pagenum: active == '' ? this.pagenum1 : active == 3 ? this.pagenum3 : active == 4 ? this.pagenum4 : this.pagenum5,
        pagesize: this.pagesize,
        albx0072: active == '' ? null : active == 3 ? '3' : active == 4 ? '4' : active == 5 ? '5' : null, //67
      }
      this.utilscommit.requestapi('listProjectsFortisH5', data, (res) => {
        //获取队伍活动
        // debugger

        if (res.code == 0 && res.data) {
          let info = res.data
          switch (active) {
            case '':
              this.list1 = [...this.list1, ...info]
              if (res.data.length < this.pagesize) {
                //如果返回数据长度小于pagesize说明数据到底了
                this.ismore1 = false
              } else {
                this.ismore1 = true
                this.pagenum1++
              }
              break
            case 3:
              this.list3 = [...this.list3, ...info]
              if (res.data.length < this.pagesize) {
                //如果返回数据长度小于pagesize说明数据到底了
                this.ismore3 = false
              } else {
                this.ismore3 = true
                this.pagenum3++
              }
              break
            case 4:
              this.list4 = [...this.list4, ...info]
              if (res.data.length < this.pagesize) {
                //如果返回数据长度小于pagesize说明数据到底了
                this.ismore4 = false
              } else {
                this.ismore4 = true
                this.pagenum4++
              }
              break
            case 5:
              this.list5 = [...this.list5, ...info]
              if (res.data.length < this.pagesize) {
                //如果返回数据长度小于pagesize说明数据到底了
                this.ismore5 = false
              } else {
                this.ismore5 = true
                this.pagenum5++
              }
              break
            default:
          }
        } else {
          switch (active) {
            case '':
              this.ismore1 = false
              break

            case 3:
              this.ismore3 = false
              break
            case 4:
              this.ismore4 = false
              break
            case 5:
              this.ismore5 = false
              break
            default:
          }
        }
      })
    },
    onRefresh() {
      //下拉刷新
      this.list1 = []

      this.list3 = []
      this.list4 = []
      this.list5 = []
      this.pagenum1 = 1

      this.pagenum3 = 1
      this.pagenum4 = 1
      this.pagenum5 = 1
      this.ismore1 = true

      this.ismore3 = true
      this.ismore4 = true
      this.ismore5 = true
      setTimeout(() => {
        this.get('')

        this.get(3)
        this.get(4)
        this.get(5)
        this.isLoading = false
      }, 2000)
    },
  },
}
</script>
