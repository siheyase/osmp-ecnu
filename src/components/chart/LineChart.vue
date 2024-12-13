<!--
 * @Author: lyt
 * @Date: 2024-11-19 13:32:58
 * @LastEditTime: 2024-12-12 10:19:06
 * @LastEditors: lyt
 * @Description: 折线图
 * @FilePath: /osmp-demo/jeecgboot-vue3/src/components/chart/LineChart.vue
 *  
-->
<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
  import { PropType, ref, Ref, reactive, watchEffect } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { cloneDeep } from 'lodash-es';

  type DataType = 'origVal' | 'modVal';

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
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        type: 'line',
        color: ['#2578F2'],
        data: [],
      },
    ],
  });

  watchEffect(() => {
    initCharts();
  });

  function initCharts() {
    if (!props.chartData || props.chartData.length === 0) {
      return;
    }
    // option配置（不含series）
    if (props.optionConfig) {
      Object.assign(option, cloneDeep(props.optionConfig));
    }
    let seriesData: any = [];
    // option-series配置
    if (props.seriesConfig) {
      Object.assign(option.series[0], cloneDeep(props.seriesConfig));
    }
    if (props.dataType === 'origVal') {
      // ------原始数据------
      seriesData = cloneDeep(props.chartData);
    } else {
      // ------组装数据------
      // 图例类型
      let xAxisData: any = [];
      props.chartData.forEach((item) => {
        seriesData.push(item.value);
        xAxisData.push(item.name);
      });
      option.xAxis.data = xAxisData;
    }
    option.series[0] = {
      ...option.series[0],
      data: seriesData,
    };
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
</script>
<style lang="less" scoped>
  .container {
    width: 100%;
  }
</style>
