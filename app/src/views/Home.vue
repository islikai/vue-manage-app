<template>
  <div class="home">
    <p class="title">个人时间统计</p>
    <div>
      <el-row>
        <el-col :span="11" :offset="1">
          <ve-line :data="chartData" :settings="chartSettings"></ve-line>
        </el-col>
        <el-col :span="11" :push="1">
          <ve-pie :data="chartData" :settings="picChartSettings"></ve-pie>
        </el-col>
      </el-row>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    this.chartSettings = {
      metrics: ['阅读时间', '手机浏览'],
      dimension: ['日期']
    }
    this.picChartSettings = {
      metrics: '阅读时间',
      dimension: '转换率',
    }
    return {
      chartData: {
        columns: ['日期', '阅读时间', '手机浏览', '转换率'],
        rows: [
          { '日期': '2018-05-22', '阅读时间': 5, '手机浏览': 4, '转换率': 0.32 },
          { '日期': '2018-05-24', '阅读时间': 1, '手机浏览': 5, '转换率': 0.26 },
          { '日期': '2018-05-26', '阅读时间': 3, '手机浏览': 2, '转换率': 0.76 },
          { '日期': '2018-05-28', '阅读时间': 2.5, '手机浏览': 6, '转换率': 0.49 },
          { '日期': '2018-06-02', '阅读时间': 4, '手机浏览': 8, '转换率': 0.323 },
          { '日期': '2018-06-04', '阅读时间': 1.5, '手机浏览': 5, '转换率': 0.78 },
          { '日期': '2018-06-08', '阅读时间': 3, '手机浏览': 4, '转换率': 0.78 }
        ]
      },
    }
  },
}
</script>

<style lang="scss" scoped>
  .home {
    .title {
      padding-bottom: 80px;
    }
    margin-top: 40px;
  }
</style>