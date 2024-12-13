<!--
 * @Author: lyt
 * @Date: 2024-11-18 16:09:59
 * @LastEditTime: 2024-12-12 15:57:44
 * @LastEditors: lyt
 * @Description: demo-图表系列
 * @FilePath: /osmp-demo/jeecgboot-vue3/src/views/demo/charts/index.vue
 *  
-->
<template>
  <div>
    <a-card :bordered="false" v-if="dashboardData && dashboardData.length > 0">
      <div class="container">
        <a-card :bordered="false" :title="board?.title" v-for="(board, boardI) in dashboardData" :key="board?.id">
          <div class="container-charts" :class="{ 'single-chart': board?.chartList && board?.chartList.length === 1 }">
            <div class="charts" v-for="(chart, i) in board?.chartList" :key="chart?.id">
              <h4 v-show="boardI < 3">{{ i / 2 === 0 ? '原始数据' : '组装数据' }}</h4>
              <component
                :is="getChartComponent(board.type)"
                :dataType="i / 2 === 0 ? 'origVal' : 'modVal'"
                :title="chart?.name"
                :chartData="chart?.chartData"
                :optionConfig="chart?.chartConfig"
                :seriesConfig="chart?.seriesConfig"
              />
            </div>
          </div>
        </a-card>
      </div>
    </a-card>
  </div>
</template>
<script name="demo-monDashboard" lang="ts" setup>
  import BarChart from '/@/components/chart/BarChart.vue';
  import BarMulti from '/@/components/chart/BarMulti.vue';
  import HBarChart from '/@/components/chart/HBarChart.vue';
  import RadarChart from '/@/components/chart/RadarChart.vue';
  import PieChart from '/@/components/chart/PieChart.vue';
  import DirectChart from '/@/components/chart/DirectChart.vue';
  import LineChart from '/@/components/chart/LineChart.vue';
  import RingChart from '/@/components/chart/RingChart.vue';
  import TangPolarChart from '/@/components/chart/TangPolarChart.vue';

  import { useCharts } from './useCharts';

  const { dashboardData } = useCharts();

  const getChartComponent = (type: string | undefined) => {
    if (!type) {
      return null;
    }
    switch (type) {
      case 'bar':
        return BarChart;
      case 'barMulti':
        return BarMulti;
      case 'hbar':
        return HBarChart;
      case 'pie':
        return PieChart;
      case 'radar':
        return RadarChart;
      case 'direct':
        return DirectChart;
      case 'line':
        return LineChart;
      case 'ring':
        return RingChart;
      case 'tangPolar':
        return TangPolarChart;
      default:
        return null;
    }
  };
</script>
<style lang="less" scoped>
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    /deep/ .ant-card {
      width: 100%;
    }

    /deep/ .ant-card-head {
      border-bottom: none;
      border-top: 1px solid #f0f0f0;
    }

    .container-charts {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;

      &.single-chart {
        .charts {
          width: 100%;
          margin: 0;
        }
      }

      .charts {
        flex: 1 0 48%;
        min-width: 500px;
        margin: 1%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;

        & > * {
          flex: 1 0 48%;
          min-width: 500px;
          margin: 1%;
        }
      }
    }
  }

  // 768px
  @media screen and (max-width: @screen-md) {
    .container-charts {
      flex-direction: column;

      .charts {
        width: 100%;
        margin: 1%;
        flex-direction: column;

        & > * {
          width: 100%;
          margin: 1%;
        }
      }
    }
  }
</style>
