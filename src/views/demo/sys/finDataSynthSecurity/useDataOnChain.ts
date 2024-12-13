/*
 * @Author: lyt
 * @Date: 2024-12-12 10:42:05
 * @LastEditTime: 2024-12-12 12:30:11
 * @LastEditors: lyt
 * @Description: lyt
 * @FilePath: /osmp-demo/jeecgboot-vue3/src/views/demo/sys/finDataSynthSecurity/useDataOnChain.ts
 *
 */
import { onMounted, ref } from 'vue';
import { getFDSynthNodeStatusApi, getFDSynthNodeStorageApi, getFDSynthNodeSynDataApi } from '/@/api/demo/finDataSynthSecurityApi';
import { cloneDeep } from 'lodash-es';

interface ChartInfo {
  chartData?: any[];
  chartConfig?: any;
  seriesConfig?: any;
}
export const useDataOnChain = () => {
  // 节点合成数据
  const nodeSynData = ref<ChartInfo>({
    chartConfig: {
      yAxis: {
        axisLabel: {
          formatter: '{value}T',
        },
      },
    },
  });

  // 节点存储情况
  const nodeStorage = ref<ChartInfo>({
    seriesConfig: {
      // 设置图表每块/列/行的颜色（非必填，为空时默认使用系统设定的颜色）
      color: ['#2578F2', '#84B7F9', '#9A9A9A', '#DE868F'],
      itemStyle: {
        // 设置扇形的圆角半径
        borderRadius: 4,
      },
      label: {
        show: true,
        // 标签内容格式器，支持字符串模板和回调函数两种形式
        formatter: '{c}T',
      },
    },
  });

  // 节点运行情况
  const nodeStatusData = ref<ChartInfo>({
    seriesConfig: {
      // 设置图表每块/列/行的颜色（非必填，为空时默认使用系统设定的颜色）
      color: ['#2578F2', '#84B7F9', '#9A9A9A', '#DE868F'],
      itemStyle: {
        // 设置扇形的圆角半径
        borderRadius: 4,
      },
    },
  });

  // 处理节点合成数据
  const getFDSynthNodeSynData = async () => {
    const res = await getFDSynthNodeSynDataApi();
    if (res && res.length > 0) {
      nodeSynData.value.chartData = cloneDeep(res);
    }
  };

  // 处理节点存储情况
  const getFDSynthNodeStorageData = async () => {
    const res = await getFDSynthNodeStorageApi();
    if (res && res.length > 0) {
      nodeStorage.value.chartData = cloneDeep(res);
    }
  };

  //  处理节点运行情况
  const getFDSynthNodeStatusData = async () => {
    const res = await getFDSynthNodeStatusApi();
    if (res && res.length > 0) {
      nodeStatusData.value.chartData = cloneDeep(res);
    }
  };

  onMounted(() => {
    getFDSynthNodeSynData();
    getFDSynthNodeStorageData();
    getFDSynthNodeStatusData();
  });

  return {
    nodeSynData,
    nodeStorage,
    nodeStatusData,
  };
};
