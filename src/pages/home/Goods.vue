<template>
  <div>
    <span class="date">时间范围</span>
    <el-date-picker
      v-model="date"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      align="right"
    ></el-date-picker>
    <el-button type="primary" style="margin-left:20px" @click="query">查询</el-button>
    <div id="echar"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { changetime } from "@/utils/utils";
import { orderdata } from "@/api/apis";
export default {
  data() {
    return {
      date: [new Date(new Date()-6*4*7*24*60*60*1000),new Date()],
    };
  },
  methods: {
    query() {
    //   console.log(this.date);
      this.echar();
    },
    echar() {
        if(this.date){
      this.date = JSON.stringify([
        changetime(this.date[0]),
        changetime(this.date[1]),
      ]);}
     
      orderdata(this.date).then((res) => {
        // console.log(res.data.data);
        var arr=res.data.data   
        var myechart = echarts.init(document.getElementById("echar"));
        let option = {
          title: {
            text: "订单统计",
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["下单时间", "订单金额"],
          },
          toolbox: {
            show: true,
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ["line", "bar"] },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          calculable: true,
          xAxis: [
            {
              type: "category",
              data: arr.map((item)=>{
               return changetime(item.orderTime) 
              }),
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: "订单金额",
              type: "bar",
              data: arr.map((item)=>{
               return item.orderAmount
              }),
              markPoint: {
                data: [
                  { type: "max", name: "最大值" },
                  { type: "min", name: "最小值" },
                ],
              },
              markLine: {
                data: [{ type: "average", name: "平均值" }],
              },
            },
            
          ],
          
        };
         myechart.setOption(option)
      });
    },
  },
  mounted() {
    this.echar();
    // console.log(myechart);
  },
};
</script>

<style lang="less" scoped>
.date {
  color: #989a9d;
  margin-right: 20px;
}
#echar {
  background-color: #fff;
  margin-top: 30px;
  width: 1050px;
  height: 440px;
  padding: 20px;
}
</style>