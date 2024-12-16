<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>

<script setup lang="ts">
  import { ref, watchEffect, PropType, reactive, Ref } from 'vue';
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

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  const option = reactive({
    legend: {
      data: [''],
      bottom: '5%',
    },
    radar: {
      indicator: [{ name: '' }],
    },
    series: [
      {
        type: 'radar',
        center: ['50%', '50%'],
        data: [],
        color: ['#1D7DE9', '#68BBC4', '#58A55D', '#F2BD42'],
      },
    ],
  });

  watchEffect(() => {
    if (props.chartData) {
      initCharts();
    }
  });

  function initCharts() {
    if (!props.chartData || props.chartData.length === 0) {
      return;
    }
    if (props.optionConfig) {
      Object.assign(option, cloneDeep(props.optionConfig));
    }
    let seriesData: any = [];
    if (props.dataType === 'origVal') {
      // ------原始数据------
      // 图例类型
      let legendArr: any[] = Array.from(new Set(props.chartData.map((item) => item.name)));
      option.legend.data = legendArr;
      // 雷达数据
      seriesData = cloneDeep(props.chartData);
    } else {
      // ------组装数据------
      // 图例类型
      let legendArr: any[] = Array.from(new Set(props.chartData.map((item) => item.type)));
      option.legend.data = legendArr;
      const result = props.chartData.reduce((acc, item) => {
        const existingType = acc.find((group) => group.name === item.type);
        if (existingType) {
          existingType.value.push(item.value);
        } else {
          acc.push({ name: item.type, value: [item.value] });
        }
        return acc;
      }, []);
      // 雷达数据
      seriesData = result;
    }
    option.series[0] = {
      ...option.series[0],
      data: seriesData,
    };
    setOptions(option as any);
  }
</script>
<style lang="less" scoped></style>
