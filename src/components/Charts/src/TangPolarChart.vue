<!--
 * @Author: lyt
 * @Date: 2024-11-21 14:59:19
 * @LastEditTime: 2024-12-13 17:19:04
 * @LastEditors: lyt
 * @Description: 极坐标图（基于柱状图改造）
 * @FilePath: /osmp-demo/src/components/Charts/src/TangPolarChart.vue
 *  
-->
<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
  import { PropType, ref, Ref, reactive, watchEffect, onBeforeUnmount } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { cloneDeep } from 'lodash-es';
  import { DataType } from '/@/components/Charts/src/types/chart';

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
        label: {
          show: true,
          backgroundColor: '#1D7DE9',
        },
      },
    },
    polar: {
      radius: [30, '80%'],
    },
    angleAxis: {
      max: 100,
      startAngle: 75,
    },
    radiusAxis: {
      type: 'category',
      axisLabel: {
        // 添加或修改以下属性以调整标签显示
        interval: 0, // 显示所有标签
        rotate: 0, // 根据需要调整标签的旋转角度
      },
      data: [],
    },
    series: {
      type: 'bar',
      coordinateSystem: 'polar',
      color: ['#2578F2'],
    },
    label: {
      // show: true,
      position: 'middle',
      formatter: '{b}: {c}',
    },
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
      if (!option.radiusAxis.type) {
        option.radiusAxis.type = 'category';
      }
      if (!option?.radiusAxis?.axisLabel) {
        option.radiusAxis.axisLabel = {
          // 添加或修改以下属性以调整标签显示
          interval: 0, // 显示所有标签
          rotate: 0, // 根据需要调整标签的旋转角度
        };
      }
    }
    let seriesData: any = [];
    let radiusAxis: any = [];
    if (props.dataType === 'origVal') {
      // ------原始数据------
      seriesData = cloneDeep(props.chartData);
    } else {
      // ------组装数据------
      props.chartData.forEach((item) => {
        seriesData.push(item.value);
        radiusAxis.push(item.name);
      });
      option.radiusAxis.data = radiusAxis;
    }
    // option-series配置
    if (props.seriesConfig) {
      Object.assign(option.series, cloneDeep(props.seriesConfig));
    }
    option.series = {
      ...option.series,
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
