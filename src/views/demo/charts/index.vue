<!--
 * @Author: lyt
 * @Date: 2024-11-18 16:09:59
 * @LastEditTime: 2024-12-16 16:09:14
 * @LastEditors: lyt
 * @Description: demo-图表系列
 * @FilePath: /osmp-demo/src/views/demo/charts/index.vue
 *  
-->
<template>
  <div class="demo-charts">
    <a-card :bordered="false" v-if="chartsListData && chartsListData.length > 0">
      <CollapseContainer :title="board?.title" v-for="board in chartsListData" :key="board?.id">
        <div class="charts-row">
          <div class="charts-row-item" v-for="(chart, i) in board?.chartList" :key="chart?.id">
            <a-button class="btn-data" type="link" @click="seeData(chart)"
              >{{ board.type !== 'pie' && board.type !== 'ring' ? (i / 2 === 0 ? '原始' : '组装') : '通用' }}数据格式
            </a-button>
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
      </CollapseContainer>
    </a-card>
    <BasicModal v-bind="$attrs" @register="registerModal" title="数据" @ok="closeModal()" :showCancelBtn="false" width="900px" destroyOnClose>
      <div class="model">
        <div>
          <h4>数据格式</h4>
          <pre>
            <code>{{ modelData.chartData }}</code>
          </pre>
        </div>
        <div>
          <h4>图表通用配置项-chartConfig</h4>
          <pre>
            <code>{{ modelData?.chartConfig}}</code>
          </pre>
        </div>
        <div>
          <h4> 图表系列配置项-seriesConfig</h4>
          <pre>
            <code>{{ modelData?.seriesConfig}}</code>
          </pre>
        </div>
      </div>
    </BasicModal>
  </div>
</template>
<script name="demo-monDashboard" lang="ts" setup>
  import { CollapseContainer } from '/@/components/Container';
  import { BarChart, BarMulti, HBarChart, RadarChart, PieChart, DirectChart, LineChart, RingChart, TangPolarChart } from '/@/components/Charts';
  import { BasicModal } from '/@/components/Modal';
  import { useCharts } from './useCharts';
  import { useModal } from '/@/components/Modal';

  const [registerModal, { openModal, closeModal }] = useModal();
  const { chartsListData, modelData } = useCharts();

  const seeData = (record: any) => {
    modelData.value = record;
    openModal();
  };
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
      case 'tangPolar':
        return TangPolarChart;
      default:
        return null;
    }
  };
</script>
<style lang="less" scoped>
  .demo-charts {
    .charts-row {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      .charts-row-item {
        padding: 8px;
        display: flex;
        align-items: center;
        flex-direction: column;
      }
    }
  }
  .model {
    padding: 16px;

    pre {
      padding: 16px;
      overflow: auto;
      line-height: 1.45;
      background-color: #f7f7f7;
      border: 0;
      border-radius: 4px;
    }
  }
</style>
