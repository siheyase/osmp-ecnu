<!--
 * @Author: lyt
 * @Date: 2024-11-08 10:55:12
 * @LastEditTime: 2024-12-12 10:19:15
 * @LastEditors: lyt
 * @Description: 雷达图
 * @FilePath: /osmp-demo/jeecgboot-vue3/src/components/chart/RadarChart.vue
 *  
-->
<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>

<script setup lang="ts">
  import { ref, watchEffect, PropType, reactive, Ref } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { cloneDeep } from 'lodash-es';

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

  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  const option = reactive({
    title: {
      text: props.title,
      bootom: '0',
    },
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
        data: [
          {
            value: [82, 70, 60, 55, 90, 66],
            name: '文综',
          },
        ],
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

    // 处理方式1-原杂糅数据
    // 图例类型
    // let typeArr = Array.from(new Set(props.chartData.map((item) => item.type)));
    // 雷达数据
    // let indicator = Array.from(
    //   new Set(
    //     props.chartData.map((item) => {
    //       let { name, max } = item;
    //       return { name, max };
    //     })
    //   )
    // );

    // let data = [];
    // typeArr.forEach((type) => {
    //   let obj = { name: type };
    //   let chartArr = props.chartData.filter((item) => type === item.type);
    //   obj['value'] = chartArr.map((item) => item.value);
    //   //data数据
    //   data.push(obj);
    // });
    // option.radar.axisName = indicator;
    // option.series[0]['data'] = data;

    // 处理方式1-分类数据
    // 图例类型
    // const typeArr = Array.from(new Set(props.chartData.map((item) => item.type)));
    // option.legend.data = typeArr;
    // // 雷达数据
    // const indicator = props?.optionConfig?.indicator;

    // const data: any[] = [];
    // typeArr.forEach((type) => {
    //   const obj = { name: type };
    //   const chartArr = props.chartData.filter((item) => item.type === type);
    //   let valueArr = [];
    //   if (chartArr[0]?.typeValue && chartArr[0]?.typeValue.length > 0) {
    //     valueArr = chartArr[0]?.typeValue.map((item) => item.value);
    //   }
    //   obj.value = valueArr;
    //   data.push(obj);
    // });
    // option.radar.indicator = indicator;
    // option.series[0].data = data;
    // setOptions(option as any);

    // 处理方式3-接口处理值
    // 雷达数据
    // 图例类型
    const typeArr = Array.from(new Set(props.chartData.map((item) => item.name)));
    option.legend.data = typeArr;
    option.radar.indicator = props?.optionConfig?.indicator;
    option.series[0].data = props.chartData;
    setOptions(option as any);
  }
</script>
<style lang="less" scoped></style>
