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
} from '/@/api/demo/finDataSynthSecurityApi';
import { cloneDeep } from 'lodash-es';
import { useTable } from '/@/components/Table';
import { getBlockColumns, getTransactionColumns } from '@/views/demo/table/components/tableData';
import { getBlockDataApi, getTransactionDataApi } from '../../../../api/demo/tableApi';

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

  onMounted(() => {
    getFDSynthNodeSynData();
    getFDSynthNodeStorageData();
    getFDSynthNodeStatusData();
    getLatestBlocksData();
    getLatestBlocksColumn();
    getLatestTransactionsData();
    getLatestTransactionsColumn();
  });

  return {
    nodeSynData,
    nodeStorage,
    nodeStatusData,
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

export const useBasicForm = () => {
  const [chainTable, { reload }] = useTable({
    api: getBlockDataApi,
    columns: getBlockColumns(),
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
  return {chainTable, transactionTable};
}