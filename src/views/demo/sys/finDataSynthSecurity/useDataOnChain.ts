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
import { 
  getFDSynthNodeStatusApi, 
  getFDSynthNodeStorageApi, 
  getFDSynthNodeSynDataApi, 
  getDFSynthNodeTaskDataApi,
  getFDSysthDatasetDataApi,
  getFDSynthTaskQueryResultApi, 
  getFDSynthTaskProcessDataApi, 
  getFDSynthTaskValidationDataApi, 
  getFDSynthTaskPhaseDataApi, 
  getFDSynthTaskExceptionDataApi, 
  getFDSynthColumnProcessApi, 
  getFDSynthColumnValidationApi, 
  getFDSynthColumnPhaseApi, 
  getFDSynthColumnExceptionApi,
  getLatestBlocksDataApi,
  getLatestTransactionsDataApi,
  getLatestBlocksColumnApi,
  getLatestTransactionsColumnApi,
  getFDSynthNodeSynTaskApi,
} from '/@/api/demo/finDataSynthSecurityApi';
import { cloneDeep } from 'lodash-es';
import { useTable } from '/@/components/Table';
import { getEpochColumns, getTransactionColumns } from '@/views/demo/table/components/tableData';
import { getEpochDataApi, getTransactionDataApi } from '../../../../api/demo/tableApi';

interface ChartInfo {
  chartData?: any[];
  chartConfig?: any;
  seriesConfig?: any;
}
interface chainDataInfo {
  tableData?: any[];
  tableColumn?: any;
}
export const useDataOnChain = () => {
  // 节点合成数据
  const nodeSynData = ref<ChartInfo>({
    chartConfig: {
      yAxis: {
        axisLabel: {
          formatter: '{value} KB',
        },
      },
    },
  });
  const nodeSynTask = ref<ChartInfo>({
    chartConfig: {
      yAxis: {
        axisLabel: {
          formatter: '{value}',
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
        formatter: '{c} TB',
      },
    },
    chartConfig: {
      // 图表全局配置
      legend: {
        show: true, // 显示图例
        orient: 'vertical', // 图例排列方向（可选：'horizontal' 或 'vertical'）
        left: 'left', // 图例位置，可选值有 'left', 'right', 'center'
        top: 'center', // 图例垂直位置
        textStyle: {
          fontSize: 12, // 图例字体大小
          color: '#333', // 图例字体颜色
        },
      },
      tooltip: {
        // 提示框配置
        trigger: 'item', // 触发类型（'item' 适合饼图）
        formatter: '{a} <br/>{b}: {c}TB ({d}%)', // 提示内容格式
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
      // label: {
      //   show: true,
      //   // 标签内容格式器，支持字符串模板和回调函数两种形式
      //   formatter: '{c}',
      // },
    },
    chartConfig: {
      // 图表全局配置
      legend: {
        show: true, // 显示图例
        orient: 'vertical', // 图例排列方向（可选：'horizontal' 或 'vertical'）
        left: 'left', // 图例位置，可选值有 'left', 'right', 'center'
        top: 'center', // 图例垂直位置
        textStyle: {
          fontSize: 12, // 图例字体大小
          color: '#333', // 图例字体颜色
        },
      },
      tooltip: {
        // 提示框配置
        trigger: 'item', // 触发类型（'item' 适合饼图）
        formatter: '{a} <br/>{b}: {c}T ({d}%)', // 提示内容格式
      },
    },
  });
    // 合成任务完成情况
    const taskData = ref<ChartInfo>({
      seriesConfig: {
        // 设置图表每块/列/行的颜色（非必填，为空时默认使用系统设定的颜色）
        color: ['#2578F2', '#84B7F9', '#9A9A9A', '#DE868F'],
        itemStyle: {
          // 设置扇形的圆角半径
          borderRadius: 4,
        },
        // label: {
        //   show: true,
        //   // 标签内容格式器，支持字符串模板和回调函数两种形式
        //   formatter: '{c}',
        // },
      },
      chartConfig: {
        // 图表全局配置
        legend: {
          show: true, // 显示图例
          orient: 'vertical', // 图例排列方向（可选：'horizontal' 或 'vertical'）
          left: 'left', // 图例位置，可选值有 'left', 'right', 'center'
          top: 'center', // 图例垂直位置
          textStyle: {
            fontSize: 12, // 图例字体大小
            color: '#333', // 图例字体颜色
          },
        },
        tooltip: {
          // 提示框配置
          trigger: 'item', // 触发类型（'item' 适合饼图）
          formatter: '<br/>{b}: {c} ({d}%)', // 提示内容格式
        },
      },
    });
        // 合成数据集分布
        const datasetData = ref<ChartInfo>({
          seriesConfig: {
            // 设置图表每块/列/行的颜色（非必填，为空时默认使用系统设定的颜色）
            color: ['#2578F2', '#84B7F9', '#DE868F'],
            itemStyle: {
              // 设置扇形的圆角半径
              borderRadius: 4,
            },
            label: {
              show: true,
              // 标签内容格式器，支持字符串模板和回调函数两种形式
              formatter: '{c}',
            },
          },
          chartConfig: {
            // 图表全局配置
            legend: {
              show: true, // 显示图例
              orient: 'vertical', // 图例排列方向（可选：'horizontal' 或 'vertical'）
              left: 'left', // 图例位置，可选值有 'left', 'right', 'center'
              top: 'center', // 图例垂直位置
              textStyle: {
                fontSize: 12, // 图例字体大小
                color: '#333', // 图例字体颜色
              },
            },
            tooltip: {
              // 提示框配置
              trigger: 'item', // 触发类型（'item' 适合饼图）
              formatter: '<br/>{b}: {c} ({d}%)', // 提示内容格式
            },
          },
        });

  // 最新区块信息
  const latestBlocks = ref<chainDataInfo> ({});
  // 最新交易信息
  const latestTransactions = ref<chainDataInfo> ({});

  // 处理节点合成数据
  const getFDSynthNodeSynData = async () => {
    const res = await getFDSynthNodeSynDataApi();
    if (res && res.length > 0) {
      nodeSynData.value.chartData = cloneDeep(res);
    }
  };
  // 处理节点合成任务
  const getFDSynthNodeSynTask = async () => {
    const res = await getFDSynthNodeSynTaskApi();
    if (res && res.length > 0) {
      nodeSynTask.value.chartData = cloneDeep(res);
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

  // add by zhmye
  const getFDSysthNodeTaskData = async () => {
    const res = await getDFSynthNodeTaskDataApi();
    if (res && res.length > 0) {
      taskData.value.chartData = cloneDeep(res);
    }
  }
  const getFDSysthDatasetData = async () => {
    const res = await getFDSysthDatasetDataApi();
    if (res && res.length > 0) {
      datasetData.value.chartData = cloneDeep(res);
    }
  }

  // 最新区块信息数据
  const getLatestBlocksData = async () => {
    const res = await getLatestBlocksDataApi();
    if (res && res.length > 0) {
      latestBlocks.value.tableData = cloneDeep(res);
    }
  };
  // 最新区块信息列配置
  const getLatestBlocksColumn = async () => {
    const res = await getLatestBlocksColumnApi();
    if (res && res.length > 0) {
      latestBlocks.value.tableColumn = cloneDeep(res);
    }
  };
  // 最新交易信息数据
  const getLatestTransactionsData = async () => {
    const res = await getLatestTransactionsDataApi();
    if (res && res.length > 0) {
      latestTransactions.value.tableData = cloneDeep(res);
    }
  };
  // 最新交易信息列配置
  const getLatestTransactionsColumn = async () => {
    const res = await getLatestTransactionsColumnApi();
    if (res && res.length > 0) {
      latestTransactions.value.tableColumn = cloneDeep(res);
    }
  };

  // onMounted(() => {
  //   getFDSynthNodeSynData();
  //   getFDSynthNodeSynTask()
  //   getFDSynthNodeStorageData();
  //   getFDSysthNodeTaskData();
  //   getFDSynthNodeStatusData();
  //   getFDSysthDatasetData()
  //   getLatestBlocksData();
  //   getLatestBlocksColumn();
  //   getLatestTransactionsData();
  //   getLatestTransactionsColumn();
  // });

  return {
    nodeSynData,
    nodeSynTask,
    nodeStorage,
    nodeStatusData,
    taskData,
    datasetData,
    latestBlocks,
    latestTransactions,
  };
};

interface EvidenceInfo {
  taskInfo?: any;
  tableData?: any[];
  tableColumn?: any;
}

export const useEvidenceOnChain = () => {
  const  taskQueryResult = ref<EvidenceInfo> ({});
  const  taskProcess = ref<EvidenceInfo> ({});
  const  taskValidation = ref<EvidenceInfo> ({});
  const  taskPhase = ref<EvidenceInfo> ({});
  const  taskException = ref<EvidenceInfo> ({});

  const getFDSynthTaskQueryResult = async () => {
    const res = await getFDSynthTaskQueryResultApi();
    if (res && res.length > 0) {
      taskQueryResult.value.taskInfo = cloneDeep(res);
      console.log("查询结果: ")
    }
  }
  const getFDSynthTaskProcessData = async () => {
    const res = await getFDSynthTaskProcessDataApi();
    if (res && res.length > 0) {
      taskProcess.value.taskInfo = cloneDeep(res);
    }
  }
  const getFDSynthColumnProcess = async () => {
    const res = await getFDSynthColumnProcessApi();
    if (res && res.length > 0) {
      taskProcess.value.tableColumn = cloneDeep(res);
    }
  }
  const getFDSynthTaskValidationData = async () => {
    const res = await getFDSynthTaskValidationDataApi();
    if (res && res.length > 0) {
      taskValidation.value.tableData = cloneDeep(res);
    }
  }
  const getFDSynthColumnValidation = async () => {
    const res = await getFDSynthColumnValidationApi();
    if (res && res.length > 0) {
      taskValidation.value.tableColumn = cloneDeep(res);
    }
  }
  const getFDSynthTaskPhaseData = async () => {
    const res = await getFDSynthTaskPhaseDataApi();
    if (res && res.length > 0) {
      taskPhase.value.taskInfo = cloneDeep(res);
    }
  }
  const getFDSynthColumnPhase = async () => {
    const res = await getFDSynthColumnPhaseApi();
    if (res && res.length > 0) {
      taskPhase.value.tableColumn = cloneDeep(res);
    }
  }
  const getFDSynthTaskExceptionData = async () => {
    const res = await getFDSynthTaskExceptionDataApi();
    if (res && res.length > 0) {
      taskException.value.taskInfo = cloneDeep(res);
    }
  }
  const getFDSynthColumnException = async () => {
    const res = await getFDSynthColumnExceptionApi();
    if (res && res.length > 0) {
      taskException.value.tableColumn = cloneDeep(res);
    }
  }
  onMounted(() => {
    getFDSynthTaskQueryResult();
    getFDSynthTaskProcessData();
    getFDSynthColumnProcess();
    getFDSynthTaskValidationData();
    getFDSynthColumnValidation();
    getFDSynthTaskPhaseData();
    getFDSynthColumnPhase();
    getFDSynthTaskExceptionData();
    getFDSynthColumnException();
  });

  return {
    taskQueryResult,
    taskProcess,
    taskValidation,
    taskPhase,
    taskException,
  };
}
/*** 
  NOTE: zhmye
  这里是区块链数据页面两个表格的请求地方，api是网址 
 ***/
export const queryEpochAndTransactionTableData = () => {
  const [epochTable, { reload }] = useTable({
    api: getEpochDataApi,
    columns: getEpochColumns(),
    // 是否开启搜索
    useSearchForm: false,
    // 是否显示序号
    showIndexColumn: false,
    // 是否显示边框
    bordered: true,
  });
  const [transactionTable, ] = useTable({
    api: getTransactionDataApi,
    columns: getTransactionColumns(),
    // 是否开启搜索
    useSearchForm: false,
    // 是否显示序号
    showIndexColumn: false,
    // 是否显示边框
    bordered: true,
  });
  // const [blockInfoTable, ] = useTable({
  //   api: get
  // }) 
  return {epochTable, transactionTable};
}

/*** 
  NOTE: add by zhmye
  这里是区块链数据页面搜索一个区块的请求地方，api是网址
* ***/
export const queryBlockInfo = () => {

}