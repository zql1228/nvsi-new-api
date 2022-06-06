<template>
    <div class="frame_popup" ref="popup" v-show='isshow'>
        <div class='popup'>
            <div class="popup_div" >
                <span v-html='obj.text1' ></span>
                <div v-html='obj.text2' ></div>
            </div>
            <div class="popup_span">
                <span class="popup_span1" @click="cancel2(0)" v-text="obj.cel" ></span>
                <span class="popup_span2" @click="cancel2(1)" v-text="obj.confirm"></span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:['obj'],
    data:()=>{
        return {
           isshow:false 
        }
    },
    mounted(){
       // console.log(this.obj)
        if(!this.obj){
            this.obj.text2="检测到您的个人信息不完整 请先完善信息，在进行操作！"
            this.obj.confirm="确定"
        }
        if(!this.obj.cel){
            document.getElementsByClassName('popup_span1')[0].style.display="none"
            document.getElementsByClassName('popup_span2')[0].style.width="100%"
        }else{
            document.getElementsByClassName('popup_span1')[0].style.display="inline-block"
        }
        },
    methods: {
        cancel2(val){//取消
        this.isshow=false
        this.obj.cancel(val)  
        },     
    },
    watch:{
      
    }
}
</script>
<style scoped>
.frame_popup{
    width:100%;
    height:100%;
    position: fixed;
    z-index: 100;
    background:rgba(145, 112, 112, 0.5);
   padding-top: 60%;
   box-sizing: border-box;
}
.popup{
width: 70%;
background: #FFFFFF;
border-radius: .25rem;
margin: 0 auto;

}
.popup_div{  
    border-bottom: 1px solid #e6e6e6;  
}
.popup_span{display: flex;height: 4.5rem;text-align: center;}
.popup_span .popup_span1{width:50%;color:#333;display: inline-block;border-right:1px solid #e6e6e6;line-height: 4rem;font-size: 1.5rem;}
.popup_span span:last-child{width:50%;color:#db0000;display: inline-block;line-height: 4.5rem;font-size: 1.5rem;}
.popup_div div{padding: 1.2rem 1.6rem;font-size:1.5rem;text-align: center;line-height: 2rem;}
.popup_div span{padding-top:2rem;font-size: 1.8rem;text-align: center;display: block;}
</style>