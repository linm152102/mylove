<template>
  <el-card class="box">
    <!-- 面包屑导航组件 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据同级</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 图用法 -->
    <div id="main" style="width: 600px;height:400px; margin-top:20px"></div>
  </el-card>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    this.gettu();
  },
  methods: {
    async gettu() {
      const res = await this.$http.get(`reports/type/1`);
      const {
        data,
        meta: { status }
      } = res.data;
      if (status !== 200) {
        return;
      }
      const option2 = data;
      var myChart = echarts.init(document.getElementById("main"));
      //    legend: series: xAxis: yAxis: // 指定图表的配置项和数据
      var option1 = {
        title: {
          text: "数据统计"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        }
      };
      const option = { ...option1, ...option2 };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>
<style>
.box {
  height: 100%;
}
</style>

