/*
 * @Author: lyt
 * @Date: 2024-12-12 10:43:58
 * @LastEditTime: 2024-12-12 11:09:02
 * @LastEditors: lyt
 * @Description: 数据合成安全
 * @FilePath: /osmp-demo/jeecgboot-vue3/src/api/demo/finDataSynthSecurityApi.ts
 *
 */
import { defHttp } from '/@/utils/http/axios';
import { ChartsInfo } from './model/chartsModel';

enum Api {
  FINDATASYNTHSECURITY_NODE_SYN_DATA = '/mock/demo/finDataSynthSecurity/nodeSynData',
  FINDATASYNTHSECURITY_NODE_SYN_TASK = '/mock/demo/finDataSynthSecurity/nodeSynTask', // add by zhmye
  FINDATASYNTHSECURITY_NODE_STORAGE = '/mock/demo/finDataSynthSecurity/nodeStorage',
  FINDATASYNTHSECURITY_NODE_STATUS = '/mock/demo/finDataSynthSecurity/nodeStatus',
  FINDATASYNTHSECURITY_TASK_STATUS = '/mock/demo/finDataSynthSecurity/taskStatus',
  FINDATASYNTHSECURITY_DATASET_STATUS = '/mock/demo/finDataSynthSecurity/datasetStatus',
  FINDATASYNTHSECURITY_TASK_QUERY_RESULT = '/mock/demo/finDataSynthSecurity/taskQueryResult',
  FINDATASYNTHSECURITY_TASK_PROCESS_DATA = '/mock/demo/finDataSynthSecurity/taskProcessData',
  FINDATASYNTHSECURITY_TASK_VALIDATION_DATA = '/mock/demo/finDataSynthSecurity/taskValidationData',
  FINDATASYNTHSECURITY_TASK_PHASE_DATA = '/mock/demo/finDataSynthSecurity/taskPhaseData',
  FINDATASYNTHSECURITY_TASK_EXCEPTION_DATA = '/mock/demo/finDataSynthSecurity/taskExceptionData',
  FINDATASYNTHSECURITY_COLUMN_PROCESS = '/mock/demo/finDataSynthSecurity/columnsProcess',
  FINDATASYNTHSECURITY_COLUMN_VALIDATION = '/mock/demo/finDataSynthSecurity/columnsValidation',
  FINDATASYNTHSECURITY_COLUMN_PHASE = '/mock/demo/finDataSynthSecurity/columnsPhase',
  FINDATASYNTHSECURITY_COLUMN_EXCEPTION = '/mock/demo/finDataSynthSecurity/columnsException',
  UPCHAIN_TPS_DATA = '/mock/demo/finDataSynthSecurity/upChainTPS',
  LATEST_BLOCKS_DATA = '/mock/demo/finDataSynthSecurity/latestBlocks',
  LATEST_TRANSACTIONS_DATA = '/mock/demo/finDataSynthSecurity/latestTransactions',
  LATEST_BLOCKS_COLUMN = '/mock/demo/finDataSynthSecurity/columnsBlock',
  LATEST_TRANSACTIONS_COLUMN = '/mock/demo/finDataSynthSecurity/columnsTransaction',
  CERTAIN_BLOCK_DATA = '/mock/demo/finDataSynthSecurity/getBlockInfo',
}

export const getFDSynthNodeSynDataApi = async () => {
  const res = await defHttp.get<any[]>({ url: Api.FINDATASYNTHSECURITY_NODE_SYN_DATA });
  console.log('数据合成安全-节点合成数据-接口返回数据', res);
  return res;
};
// add by zhmye
export const getFDSynthNodeSynTaskApi = async () => {
  const res = await defHttp.get<any[]>({ url: Api.FINDATASYNTHSECURITY_NODE_SYN_TASK });
  console.log('数据合成安全-节点合成数据-接口返回数据', res);
  return res;
};
export const getFDSynthNodeStorageApi = async () => {
  const res = await defHttp.get<any[]>({ url: Api.FINDATASYNTHSECURITY_NODE_STORAGE });
  console.log('数据合成安全-节点存储情况-接口返回数据', res);
  return res;
};

export const getFDSynthNodeStatusApi = async () => {
  const res = await defHttp.get<any[]>({ url: Api.FINDATASYNTHSECURITY_NODE_STATUS });
  console.log('数据合成安全-节点运行情况-接口返回数据', res);
  return res;
};
export const getDFSynthNodeTaskDataApi = async () => {
  const res = await defHttp.get<any[]>( {url: Api.FINDATASYNTHSECURITY_TASK_STATUS});
  console.log('数据合成安全-合成任务状态-接口返回数据',res);
  return res;
}
export const getFDSysthDatasetDataApi = async () => {
  const res = await defHttp.get<any[]>( {url: Api.FINDATASYNTHSECURITY_DATASET_STATUS});
  console.log('数据合成安全-合成数据集-接口返回数据',res);
  return res;
}
// 上链TPS折线图数据
export const getUpChainTPSDataApi = () => {
  const res = defHttp.get<ChartsInfo[]>({ url: Api.UPCHAIN_TPS_DATA });
  console.log('查询上链TPS图表demo数据接口返回数据', res);
  return res;
};

// 数据合成安全 - 最新区块信息
export const getLatestBlocksDataApi = async () => {
  const res = await defHttp.get<any[]>({ url: Api.LATEST_BLOCKS_DATA});
  console.log('数据合成安全-最新区块信息-接口返回数据', res);
  return res;
};

// 数据合成安全 - 最新交易信息
export const getLatestTransactionsDataApi = async () => {
  const res = await defHttp.get<any[]>({ url: Api.LATEST_TRANSACTIONS_DATA});
  console.log('数据合成安全-最新交易信息-接口返回数据', res);
  return res;
};

// 数据合成安全 - 最新区块信息列配置
export const getLatestBlocksColumnApi = async () => {
  const res = await defHttp.get<any[]>({ url: Api.LATEST_BLOCKS_COLUMN});
  console.log('数据合成安全-最新区块信息列配置-接口返回数据', res);
  return res;
};

// 数据合成安全 - 最新交易信息列配置
export const getLatestTransactionsColumnApi = async () => {
  const res = await defHttp.get<any[]>({ url: Api.LATEST_TRANSACTIONS_COLUMN});
  console.log('数据合成安全-最新交易信息列配置-接口返回数据', res);
  return res;
};

// 数据合成安全 - 查询任务结果
export const getFDSynthTaskQueryResultApi = async () => {
  const res = await defHttp.get<any[]>({ url: Api.FINDATASYNTHSECURITY_TASK_QUERY_RESULT });
  console.log('数据合成安全-查询任务结果-接口返回数据', res);
  return res;
};

// 数据合成安全 - 获取任务过程数据
export const getFDSynthTaskProcessDataApi = async () => {
  const res = await defHttp.get<any[]>({ url: Api.FINDATASYNTHSECURITY_TASK_PROCESS_DATA });
  console.log('数据合成安全-获取任务过程数据-接口返回数据', res);
  return res;
};

// 数据合成安全 - 获取验证数据
export const getFDSynthTaskValidationDataApi = async () => {
  const res = await defHttp.get<any[]>({ url: Api.FINDATASYNTHSECURITY_TASK_VALIDATION_DATA });
  console.log('数据合成安全-获取验证数据-接口返回数据', res);
  return res;
};

// 数据合成安全 - 获取阶段数据
export const getFDSynthTaskPhaseDataApi = async () => {
  const res = await defHttp.get<any[]>({ url: Api.FINDATASYNTHSECURITY_TASK_PHASE_DATA });
  console.log('数据合成安全-获取阶段数据-接口返回数据', res);
  return res;
};

// 数据合成安全 - 获取异常数据
export const getFDSynthTaskExceptionDataApi = async () => {
  const res = await defHttp.get<any[]>({ url: Api.FINDATASYNTHSECURITY_TASK_EXCEPTION_DATA });
  console.log('数据合成安全-获取异常数据-接口返回数据', res);
  return res;
};

// 数据合成安全 - 获取过程列配置
export const getFDSynthColumnProcessApi = async () => {
  const res = await defHttp.get<any[]>({ url: Api.FINDATASYNTHSECURITY_COLUMN_PROCESS });
  console.log('数据合成安全-获取过程列配置-接口返回数据', res);
  return res;
};

// 数据合成安全 - 获取验证列配置
export const getFDSynthColumnValidationApi = async () => {
  const res = await defHttp.get<any[]>({ url: Api.FINDATASYNTHSECURITY_COLUMN_VALIDATION });
  console.log('数据合成安全-获取验证列配置-接口返回数据', res);
  return res;
};

// 数据合成安全 - 获取阶段列配置
export const getFDSynthColumnPhaseApi = async () => {
  const res = await defHttp.get<any[]>({ url: Api.FINDATASYNTHSECURITY_COLUMN_PHASE });
  console.log('数据合成安全-获取阶段列配置-接口返回数据', res);
  return res;
};

// 数据合成安全 - 获取异常列配置
export const getFDSynthColumnExceptionApi = async () => {
  const res = await defHttp.get<any[]>({ url: Api.FINDATASYNTHSECURITY_COLUMN_EXCEPTION });
  console.log('数据合成安全-获取异常列配置-接口返回数据', res);
  return res;
};
interface BlockInfo {
  blockHash: string;
  parentHash: string;
  blockHeight: number;
  merkleRoot: string;
  nbTransactions: number;
  txHashs: string[];
}
// 数据合成安全 - 获取区块信息 add by zhmye
export const getBlockInfoApi: () => Promise<BlockInfo> = async () => {
  const res = await defHttp.get({ url: Api.CERTAIN_BLOCK_DATA});
  console.log('数据合成安全-获取区块信息-接口返回数据', res);
  return res;
} 