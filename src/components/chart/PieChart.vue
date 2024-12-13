<!--
 * @Author: lyt
 * @Date: 2024-11-08 10:55:03
 * @LastEditTime: 2024-12-12 10:19:10
 * @LastEditors: lyt
 * @Description: 饼图
 * @FilePath: /osmp-demo/jeecgboot-vue3/src/components/chart/PieChart.vue
 *  
-->
<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>

<script setup lang="ts">
  import { ref, watchEffect, watch, reactive, onBeforeUnmount, Ref } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { cloneDeep } from 'lodash-es';
  import { DataType } from '/@/api/demo/model/monDashboardModel';

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
    // 图表配置(echarts-series)
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
  const { setOptions, getInstance, resize } = useECharts(chartRef as Ref<HTMLDivElement>);

  const option = reactive<any>({
    title: {
      text: props.title,
      bottom: 0,
      left: 'center',
    },
    legend: {
      bottom: 10,
      left: 'center',
      show: false,
    },
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        type: 'pie',
        radius: '50%',
        color: ['#1D7DE9', '#E8E8E8', '#02B578', '#FEAC00', '#FF4849'],
        label: {
          show: true,
          formatter: '{b} {c}',
        },
        data: [],
      },
    ],
  });

  watchEffect(() => {
    initCharts();
  });

  watch(
    () => props.size,
    () => {
      resize();
    },
    { immediate: true }
  );

  function initCharts() {
    if (!props.chartData || props.chartData.length === 0) {
      return;
    }
    // option配置（不含series）
    if (props.optionConfig) {
      Object.assign(option, cloneDeep(props.optionConfig));
    }
    // option-series配置
    if (props.seriesConfig) {
      Object.assign(option.series[0], cloneDeep(props.seriesConfig));
    }
    option.series[0].data = props.chartData as any;
    try {
      setOptions(option);
    } catch (error) {
      console.error('Error setting options:', error);
    }
    resize();
    const instance = getInstance();
    if (instance) {
      instance.off('click', onClick);
      instance.on('click', onClick);
    }
  }

  function onClick(params: any) {
    emit('click', params);
  }

  // 清理事件监听
  onBeforeUnmount(() => {
    const instance = getInstance();
    if (instance) {
      instance.off('click', onClick);
    }
  });
</script>
<style lang="less" scoped></style>
