import { defHttp } from '/@/utils/http/axios';

enum Api {
  NODE_LIST = '/mock/demo/table/getNodeTableData',
  HIS_COMP_TASK_LIST = '/mock/demo/table/getHisCompTaskData',
  BLOCK_LIST = '/mock/demo/table/getBlockData',
  TRANSACTION_LIST ='/mock/demo/table/getTransactionData',
  EPOCH_LIST = '/mock/demo/table/getEpochData', // add by zhmye，获取epoch信息
}

export const getNodeTableDataApi = async (params) => {
  const res = await defHttp.get<any[]>({ url: Api.NODE_LIST, params });
  console.log('查询节点列表接口返回数据', res);
  return res;
};

export const getHistCompTaskDataApi = async (params) => {
  const res = await defHttp.get<any[]>({ url: Api.HIS_COMP_TASK_LIST, params });
  console.log('查询历史合成任务列表接口返回数据', res);
  return res;
};

export const getBlockDataApi = async (params) => {
  const res = await defHttp.get<any[]>({ url: Api.BLOCK_LIST, params });
  console.log('查询最新区块信息列表接口返回数据', res);
  return res;
};

export const getTransactionDataApi = async (params) => {
  const res = await defHttp.get<any[]>({ url: Api.TRANSACTION_LIST, params });
  console.log('查询最新交易信息列表接口返回数据', res);
  return res;
};

export const getEpochDataApi = async (params) => {
  const res = await defHttp.get<any[]>({ url: Api.EPOCH_LIST, params });
  console.log('查询最新epoch信息列表接口返回数据', res);
  return res
}