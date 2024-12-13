import { defHttp } from '/@/utils/http/axios';

enum Api {
  NODE_LIST = '/mock/demo/table/getNodeTableData',
  HIS_COMP_TASK_LIST = '/mock/demo/table/getHisCompTaskData',
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
