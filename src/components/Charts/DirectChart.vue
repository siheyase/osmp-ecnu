<!--
 * @Author: lyt
 * @Date: 2024-11-18 17:35:01
 * @LastEditTime: 2024-12-13 16:46:55
 * @LastEditors: lyt
 * @Description: 堆叠条形图
 * @FilePath: /osmp-demo/src/components/Charts/DirectChart.vue
 *  
-->
<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts" setup>
  import { PropType, ref, Ref, reactive, watchEffect } from 'vue';
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
    color: ['#5087EC', '#68BBC4', '##58A55D'],
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
      top: '0%',
    },
    xAxis: {
      type: 'value',
      // 自定义X轴Label显示内容
      axisLabel: {
        align: 'center',
      },
    },
    yAxis: {
      type: 'category',
      data: [],
    },
    series: [
      {
        name: 'Direct',
        type: 'bar',
        stack: 'total',
        label: {
          show: true,
        },
        emphasis: {
          focus: 'series',
        },
        data: [],
      },
    ],
  });

  watchEffect(() => {
    initCharts();
  });

  function createSeriesItem(item: any, index: number, isOrigVal: boolean) {
    let obj: any = { type: 'bar', stack: 'total' };
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
      option.yAxis.data.forEach((x) => {
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
      let yAxisData = Array.from(new Set(props.chartData.map((item) => item.name)));
      option.yAxis.data = yAxisData;
      typeArr.forEach((type, i) => {
        seriesData.push(createSeriesItem({ type }, i, false));
      });
    }
    option.series = seriesData;
    setOptions(option);
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
