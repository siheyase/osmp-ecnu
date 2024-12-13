<!--
 * @Author: lyt
 * @Date: 2024-11-11 13:42:04
 * @LastEditTime: 2024-12-13 17:18:34
 * @LastEditors: lyt
 * @Description: 柱状图-多列
 * @FilePath: /osmp-demo/src/components/Charts/src/BarMulti.vue
 *  
-->
<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>

<script setup lang="ts">
  import { ref, watchEffect, PropType, reactive, Ref, onBeforeUnmount } from 'vue';
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
          backgroundColor: '#333',
        },
      },
    },
    legend: {
      top: 30,
    },
    grid: {
      top: 60,
    },
    xAxis: {
      type: 'category',
      data: [],
    },
    yAxis: {
      type: 'value',
    },
    series: [],
  });

  watchEffect(() => {
    initCharts();
  });

  function createSeriesItem(item: any, index: number, isOrigVal: boolean) {
    let obj: any = { type: 'bar' };
    if (props.seriesConfig) {
      Object.assign(obj, cloneDeep(props.seriesConfig));
      if (props.seriesConfig?.color && props.seriesConfig?.color?.length) {
        obj.color = [props.seriesConfig?.color[index]];
      } else {
        let defaultColor = ['#2578F2', '#68BBC4', '#02B578'];
        obj.color = defaultColor[index];
      }
    }
    if (isOrigVal) {
      obj = { ...obj, name: item.name, data: item.value };
    } else {
      obj = { ...obj, name: item.type };
      let data: any = [];
      option.xAxis.data.forEach((x) => {
        let dataArr = props.chartData.filter((chartItem) => item.type === chartItem.type && chartItem.name === x);
        data.push(dataArr.length > 0 ? dataArr[0].value : null);
      });
      obj.data = data;
    }
    return obj;
  }

  function initCharts() {
    if (!props.chartData || props.chartData.length === 0) {
      return;
    }
    // option配置（不含series）
    if (props.optionConfig) {
      Object.assign(option, cloneDeep(props.optionConfig));
    }
    let seriesData: any[] = [];
    if (props.dataType === 'origVal') {
      // ------原始数据------
      props.chartData.forEach((item, i) => {
        seriesData.push(createSeriesItem(item, i, true));
      });
    } else {
      // ------组装数据------
      let typeArr = Array.from(new Set(props.chartData.map((item) => item.type)));
      let xAxisData = Array.from(new Set(props.chartData.map((item) => item.name)));
      option.xAxis.data = xAxisData;
      typeArr.forEach((type, i) => {
        seriesData.push(createSeriesItem({ type }, i, false));
      });
    }
    option.series = seriesData;
    try {
      setOptions(option);
    } catch (error) {
      console.error('Error setting options:', error);
    }
    const instance = getInstance();
    if (instance) {
      instance.off('click', onClick);
      instance.on('click', onClick);
    }
  }

  function onClick(params: any) {
    emit('click', params);
  }

  const instance = getInstance();
  onBeforeUnmount(() => {
    instance?.off('click', onClick);
  });
</script>
