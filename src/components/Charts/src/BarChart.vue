<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
  import { PropType, ref, Ref, reactive, watchEffect, onBeforeUnmount } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { cloneDeep } from 'lodash-es';
  import { DataType } from '/@/components/Charts/src/types/chart';

  const props = defineProps({
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
        label: {
          show: true,
          backgroundColor: '#333',
        },
      },
    },
    xAxis: {
      type: 'category',
      data: [],
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        align: 'center',
      },
    },
    series: [
      {
        type: 'bar',
        data: [],
        color: ['#1D7DE9'],
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
    let xAxisData: any = [];
    if (props.dataType === 'origVal') {
      // ------原始数据------
      seriesData = cloneDeep(props.chartData);
    } else {
      // ------组装数据------
      props.chartData.forEach((item) => {
        seriesData.push(item.value);
        xAxisData.push(item.name);
      });
      option.xAxis.data = xAxisData;
    }
    // option-series配置
    if (props.seriesConfig) {
      Object.assign(option.series[0], cloneDeep(props.seriesConfig));
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
