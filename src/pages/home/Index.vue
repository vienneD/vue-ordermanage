<template>
  <div>
    <Status />
    <div id="echar"></div>
  </div>
</template>

<script>
import Status from "../../components/Status";
import echarts from "echarts";

import { homedata } from "@/api/apis";
export default {
  components: {
    Status,
  },
  data() {
    return {};
  },
  mounted() {
    var mychart = echarts.init(document.getElementById("echar"));
    homedata().then((res) => {
      // console.log(res);
      let option = {
        title: {
          text: "销售统计表",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ['订单数据', '金额数据']
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: res.data.xData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "订单数据",
            type: "line",
            stack: "总量",
            data: res.data.orderData,
          },
          {
            name: "金额数据",
            type: "line",
            stack: "总量",
            data: res.data.amountData,
          },
        ],
      };
      mychart.setOption(option);
    });
  },
};
</script>

<style lang="less" scoped>
#echar {
  margin-top: 20px;
  width: 1000px;
  height: 420px;
}
</style>