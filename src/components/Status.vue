<template>
<div class="cent">
<div class="content" v-for="(item,index) in list" :key="index">
       <i :class="item.web" :style="item.color"></i>
       <div class="title">
           <h5>{{item.title}}</h5>
           <p>{{item.num}}</p>
       </div>
    </div>
</div>
    
</template>

<script>
import {homedata} from "@/api/apis"
    export default {
        data(){
          return {
            list:[{
                  web:"iconfont icon-dingdan",
                  title:"总订单",
                  num:12345,
                  color:"color:#259EDE"
              },{
                  web:"iconfont icon-42",
                  title:"总销售额",
                  num:12345,
                   color:"color:#D4237A"
              },{
                  web:"iconfont  icon-zu",
                  title:"今日订单数",
                  num:12345,
                   color:"color:#259EDE"
              },{
                  web:"iconfont  icon-qian ",
                  title:"今日销售额",
                  num:12345,
                   color:"color:#FFCC00"
              }]
          }
        },
        created(){
            homedata().then(res=>{

            var arr=[res.data.totalOrder,res.data.totalAmount,res.data.todayOrder,res.data.totayAmount]
              this.list.forEach((item,index)=>{
                 item.num=arr[index]              
              })
            })
        }
    }
</script>

<style lang="less" scoped>

.cent{
    display:flex;
    
}
.content:not(:last-child){
 margin-right:20px;
 
}
i{
     font-size:60px;
    //  color:#259EDE
 }
.content{
    display:flex;
    background-color: rgb(182, 180, 180);
    width:25%;
    font-size:16px;
    padding:20px;
      .title{
          margin-left:40px;

          text-align: center;
          h5{
              color:#ccc;
              line-height:30px;
          }
      }
}
</style>