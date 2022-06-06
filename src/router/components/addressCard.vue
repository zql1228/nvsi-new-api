<template>
  <div class="addressWrapper">
    <h4>请选择所在地区</h4>
    <div class="tabs">
        <Tabs v-model="active" animated @click="onClick">
            <Tab v-for="(item,index) in tabs" :title="item.title" :key="index">
                <div v-for="(item,i) in options" :key='i'>
                    {{item.areaname}}
                </div>
            </Tab>
        </Tabs>            
    </div>
    <!-- <area title="标题" :area-list="areaList"  :value="valcode" @change="changval"  /> -->
  </div>
</template>
<script>
import { Tab,Tabs} from 'vant';
export default {
  components: {Tab,Tabs},
  data(){
      return{
          tabs:[{name:'1',title:'请选择区域'},{name:'2',title:''},{name:'3',title:''}],
          options:[], 
          calcode:'',
          active:''
      }
  },
  created(){
      this.utilscommit.request( "nvsi_jsGetAreaList",{}, this.callback1); 
  },
  methods:{
      callback1(res) {
          this.options=res.data
         
          },
          onClick(val){
              console.log(val)
          }
    //    loadList(value){
    //      this.utilscommit.request(
    //     "nvsi_jsGetAreaList",
    //     {'areaid':value},
    //     this.check1)
    //     },
    //     check1(){

    //     },
 
          
          
    },

}
</script>

<style lang="less" scoped>
</style>