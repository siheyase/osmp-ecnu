<!--
 * @Author: lyt
 * @Date: 2024-11-22 11:15:34
 * @LastEditTime: 2024-12-12 10:22:35
 * @LastEditors: lyt
 * @Description: K线图
 * @FilePath: /osmp-demo/jeecgboot-vue3/src/components/chart/KLineChart.vue
 *  
-->
<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
  import { PropType, ref, Ref, reactive, watchEffect, onBeforeUnmount } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { DataType } from '@/api/demo/model/monDashboardModel';
  import * as echarts from 'echarts';

  const props = defineProps({
    // 图表标题
    title: {
      type: String as PropType<string>,
      default: '',
    },
    // 数据类型
    dataType: {
      type: String as PropType<DataType>,
      default: 'modVal',
    },
    // 图表数据
    chartData: {
      type: Array as PropType<Record<string, any>>,
      default: () => [],
      required: true,
    },
    // 图表配置(echarts-option)
    optionConfig: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({}),
    },
    // 图表系列配置(echarts-series)
    seriesConfig: {
      type: Object as PropType<Record<string, any>>,
      default: () => ({}),
    },
    // 图表宽度
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    // 图表高度
    height: {
      type: String as PropType<string>,
      default: '50vh',
    },
  });

  const emit = defineEmits(['click']);

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions, getInstance } = useECharts(chartRef as Ref<HTMLDivElement>);

  const option = reactive<any>({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
      },
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: false,
        },
      },
    },
    grid: [
      {
        left: '10%',
        right: '10%',
        bottom: 200,
      },
      {
        left: '10%',
        right: '10%',
        height: 80,
        bottom: 80,
      },
    ],
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        // inverse: true,
        axisLine: { onZero: false },
        splitLine: { show: false },
        min: 'dataMin',
        max: 'dataMax',
      },
      {
        type: 'category',
        gridIndex: 1,
        boundaryGap: false,
        axisLine: { onZero: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        min: 'dataMin',
        max: 'dataMax',
      },
    ],
    yAxis: [
      {
        scale: true,
        splitArea: {
          show: true,
        },
      },
      {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      },
    ],
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: [0, 1],
        start: 10,
        end: 100,
      },
      {
        show: true,
        xAxisIndex: [0, 1],
        type: 'slider',
        bottom: 10,
        start: 10,
        end: 100,
      },
    ],
    visualMap: {
      show: false,
      seriesIndex: 1,
      dimension: 6,
      pieces: [
        {
          value: 1,
          color: '#ec0000',
        },
        {
          value: -1,
          color: '#00da3c',
        },
      ],
    },
    series: [
      {
        type: 'candlestick',
        itemStyle: {
          color: '#ec0000',
          color0: '#00da3c',
          borderColor: '#8A0000',
          borderColor0: '#008F28',
        },
        encode: {
          x: 0,
          y: [1, 4, 3, 2],
        },
      },
      {
        name: 'Volumn',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          color: '#7fbe9e',
        },
        large: true,
        encode: {
          x: 0,
          y: 5,
        },
      },
    ],
    dataset: {
      source: [],
    },
  });

  watchEffect(() => {
    initCharts();
  });
  function generateOHLC(count) {
    let data: any = [];
    let xAxisData: any = [];
    let xValue = +new Date(2024, 4, 14);
    let minute = 60 * 1000;
    let baseValue = Math.random() * 12000;
    let boxVals = new Array(4);
    let dayRange = 20;
    for (let i = 0; i < count; i++) {
      baseValue = baseValue + Math.random() * 20 - 10;
      for (let j = 0; j < 4; j++) {
        boxVals[j] = (Math.random() - 0.5) * dayRange + baseValue;
      }
      boxVals.sort();
      let openIdx = Math.round(Math.random() * 3);
      let closeIdx = Math.round(Math.random() * 2);
      if (closeIdx === openIdx) {
        closeIdx++;
      }
      let volumn = boxVals[3] * (1000 + Math.random() * 500);
      data[i] = [
        echarts.format.formatTime('yyyy-MM-dd\nhh:mm:ss', (xValue += minute)),
        +boxVals[openIdx].toFixed(2),
        +boxVals[3].toFixed(2),
        +boxVals[0].toFixed(2),
        +boxVals[closeIdx].toFixed(2),
        +volumn.toFixed(0),
        // getSign(data, i, +boxVals[openIdx], +boxVals[closeIdx], 4), // sign
      ];
      //   data[i] = [
      //     {
      //       name: echarts.format.formatTime('yyyy-MM-dd\nhh:mm:ss', (xValue += minute)),
      //       data: [+boxVals[openIdx].toFixed(2), +boxVals[3].toFixed(2), +boxVals[0].toFixed(2), +boxVals[closeIdx].toFixed(2), +volumn.toFixed(0)],
      //     },
      //   ];
    }
    return data;
    function getSign(data, dataIndex, openVal, closeVal, closeDimIdx) {
      var sign;
      if (openVal > closeVal) {
        sign = -1;
      } else if (openVal < closeVal) {
        sign = 1;
      } else {
        sign =
          dataIndex > 0
            ? // If close === open, compare with close of last record
              data[dataIndex - 1][closeDimIdx] <= closeVal
              ? 1
              : -1
            : // No record of previous, set to be positive
              1;
      }
      return sign;
    }
  }

  function initCharts() {
    // if (!props.chartData || props.chartData.length === 0) {
    //   return;
    // }
    // // option配置（不含series）
    // if (props.optionConfig) {
    //   Object.assign(option, cloneDeep(props.optionConfig));
    // }
    // let seriesData: any = [];
    // // option-series配置
    // if (props.seriesConfig) {
    //   Object.assign(option.series[0], cloneDeep(props.seriesConfig));
    // }
    // if (props.dataType === 'origVal') {
    //   // ------原始数据------
    //   seriesData = cloneDeep(props.chartData);
    // } else {
    //   // ------组装数据------
    //   // 图例类型
    //   let xAxisData: any = [];
    //   props.chartData.forEach((item) => {
    //     seriesData.push(item.value);
    //     xAxisData.push(item.name);
    //   });
    //   option.xAxis.data = xAxisData;
    // }
    // option.series[0] = {
    //   ...option.series[0],
    //   data: seriesData,
    // };
    const dataCount = 2e5;
    const seriesData = generateOHLC(dataCount);
    console.log('seriesData', seriesData);
    option.dataset.source = seriesData;
    // option.series[0] = {
    //   ...option.series[0],
    //   data: seriesData,
    // };
    try {
      setOptions(option);
    } catch (error) {
      console.error('Error setting options:', error);
    }
    getInstance()?.off('click', onClick);
    getInstance()?.on('click', onClick);
  }

  function onClick(params: any) {
    emit('click', params);
  }

  const instance = getInstance();
  onBeforeUnmount(() => {
    instance?.off('click', onClick);
  });
</script>
<style lang="less" scoped>
  .container {
    width: 100%;
  }
</style>
