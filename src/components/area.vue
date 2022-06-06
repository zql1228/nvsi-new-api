<template>
    <div class="region-select flex-v" :class="{ show: isprovinceShow }" >
      <div class="region-select-header flex-h v-m t-lr">
        <a href="javascript:void(0);" @click="provinceButton(0)">取消</a>
        <a href="javascript:void(0);" @click="provinceButton(1)">确认</a>
      </div>
      <div class="region-select-content flex-h v-t flex-1">
        <ul class="province-list">
          <li v-for="(province, index) in FirList" :key="index" :class="{ active: provinceChange == index }"  @click="ProvinceChange(index,province.areaname,province.areaid)">
            {{ province.areaname | ellipsis(7) }}
          </li>
        </ul>
        <ul class="province-list" style="background:#f2f2f2">
          <li v-for="(city, index1) in SecList" :key="index1" :class="{ active: cityChange == index1 }"  @click="CityChange(index1,city.areaname,city.areaid)">
            {{ city.areaname | ellipsis(7) }}
          </li>
        </ul>
        <ul class="city-list flex-1">
          <li v-for="(place, index2) in ThirList" :key="index2" class="flex-h v-m t-lr" :class="{ active: placeChange == index2 }" @click="PlaceChange(index2,place.areaname,place.areaid)">
            <p>{{ place.areaname | ellipsis(7) }}</p>
            <div class="checked">
              <input type="radio" name="city" :id="place.areaid" />
              <label :for="place.areaid" class="garden"></label>
            </div>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            type:'',//type  0-现居区域   1-服务区域
            listtype:'',//
            userInfo:this.$store.getters.getuserInfo,
            F_List:[],//区域列表
            S_List:[],//区域列表
            FirList:[],//区域列表(一)
            SecList:[],//区域列表（二）
            ThirList:[],//区域列表(三)
            provinceChange:-1, //省份选择
            cityChange: -1, //市选择
            placeChange: -1, //区选择
            province:'',//选中区域名（第一级）
            provinceAreaid:'',
            city:'',//选中区域名（第二级）
            cityAreaid:'',
            place:'',//选中区域名（第三级）
            placeAreaid:'',
            isprovinceShow:false,
        }
    },
    mounted(){
        this.commonRequest.place('100000000000000000',this.getFListBack);//全国
        this.commonRequest.place(this.config.areaid,this.getSListBack);
    },
    methods:{
        show(tab){//展示弹窗
            this.type=tab
            this.isprovinceShow=true;
            this.provinceChange=-1;
            this.cityChange=-1;
            this.placeChange=-1;
            this.FirList=[];
            this.SecList=[];
            this.ThirList=[];
            this.init();
        },
        init(){//初始划列表
            if(this.type==0){//居住区域
                this.FirList=this.F_List;
            }else{
                this.FirList=this.S_List;
            }
        },
        getFListBack(res){//全国
            if(res.code==0){
               this.F_List=this.fixedList(res.data);
          }
        },
        getSListBack(res){//北京
            if(res.code==0){
              this.S_List=this.fixedList(res.data)
          }
        },
        fixedList(list){
          let provinces=[];
          for(let i=0;i<list.length;i++){
              if(list[i].areaname!='全国'){
                  provinces.push(list[i]);
              }
          }
          return this.common.orderBy(provinces,'areaid','asc');
        },
        getAreaList(areaid){//点击-获取区域列表
            this.commonRequest.place(areaid,this.getAreaListBack)
        },
        getAreaListBack(res){
            if(res.code==0){
              if(this.listtype==1){
                this.SecList=res.data;
              }else{
                this.ThirList=res.data;
              }
          }
        },
        provinceButton(tab){//区域选择按钮
            this.isprovinceShow = false;
            this.$parent.isprovinceShow=false;
            if(tab==1){//确认
                if(this.type==0){//现居区域
                    this.userInfo.albp0047=this.province+this.city+this.place;
                    this.userInfo.albp0028=this.cityAreaid ? this.placeAreaid?this.placeAreaid:this.cityAreaid : this.provinceAreaid;
                }else{
                  if(this.place){
                    this.userInfo.albp0025=this.province+'>'+this.city+'>'+this.place;
                  }else if(this.city){
                    this.userInfo.albp0025=this.province+'>'+this.city
                  }else{
                    this.userInfo.albp0025=this.province
                  }
                  this.userInfo.albp0028=this.cityAreaid ? this.placeAreaid?this.placeAreaid:this.cityAreaid : this.provinceAreaid;
                }
            }
            this.$store.commit('changeuserInfo',this.userInfo)
        },
        ProvinceChange(index,name,areaid) {//区域选择项(1) 
            this.provinceChange=index;
            this.province=name;
            this.provinceAreaid=areaid;
            this.listtype=1;
            this.SecList=[];
            this.ThirList=[];
            this.getAreaList(areaid);
        },
        CityChange(index,name,areaid) {//区域选择项(2)
            this.cityChange=index;
            this.city=name;
            this.cityAreaid=areaid;
            this.listtype=2;
            this.ThirList=[];
            this.getAreaList(areaid);
        },
        PlaceChange(index,name,areaid) {//区域选择项(3)
            this.placeChange=index;
            this.place=name;
            this.placeAreaid=areaid;
        },
    }
}
</script>

<style scoped>

</style>