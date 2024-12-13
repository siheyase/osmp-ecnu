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

enum Api {
  FINDATASYNTHSECURITY_NODE_SYN_DATA = '/mock/demo/finDataSynthSecurity/nodeSynData',
  FINDATASYNTHSECURITY_NODE_STORAGE = '/mock/demo/finDataSynthSecurity/nodeStorage',
  FINDATASYNTHSECURITY_NODE_STATUS = '/mock/demo/finDataSynthSecurity/nodeStatus',
}

export const getFDSynthNodeSynDataApi = async () => {
  const res = await defHttp.get<any[]>({ url: Api.FINDATASYNTHSECURITY_NODE_SYN_DATA });
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
