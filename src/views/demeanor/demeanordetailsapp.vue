<template>
  <div class="page">
    <!-- <header class="header">
      <div class="header-prefix">
        <a class="flex-h v-m" @click="$router.go(-1)">
          <img style="margin-right: 0.5rem" src="@/assets/img/back.svg" alt="" class="page-back" />
        </a>
      </div>
      <h1 class="header-title" style="text-align: left; padding-left: 3rem">
        文章详情
      </h1>
      <div class="header-suffix"></div>
    </header> -->
    <section class="section p-40 mt-20 bg-white" style="margin-top: 0rem">
      <div class="announcement-detail type2">
        <h2 class="announcement-detail-title">{{ content.title }}</h2>
        <div class="flex-h t-c mb-36">
          <span class="announcement-info-text">{{ content.createtime ? content.createtime.slice(0, 19) : '' }}</span>
        </div>
        <!-- <div v-if="!content.imgtitle">
          <img style="width:100%;" src="@/assets/img/imgsy/img27.png" alt="" />
        </div>
        <div v-else>
          <img style="width:100%;" :src="common.context() + content.imgtitle" alt="" />
        </div> -->
        <!-- <div v-if="content.imgtitle">
          <img style="width:100%;" :src="common.context() + content.imgtitle" alt="" />
        </div> -->
        <div id="demeanordet" v-html="content.newscontent"></div>
      </div>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      content: {
        //内容
        content: '', //标题
        newscontent: '', //内容
        createtime: '', //时间
      },
    }
  },
  mounted() {
    this.utilscommit.requestapix('getH5NewsDetails', { id: this.$route.params.id }, this.provincesBack)
  },
  methods: {
    provincesBack(src) {
      if (src && src.data) {
        this.content = src.data[0]
        if (this.content.newscontent) {
          this.content.newscontent = this.content.newscontent.replace(/@serveruirl@LEAP/g, this.common.context() + '/LEAP')
        }
        // this.utilscommit.wetchat({ title: this.content.title, desc: '立足新时代，展现新作为！点击查看更多', link: window.location.href })
      }
    },
  },
}
</script>
