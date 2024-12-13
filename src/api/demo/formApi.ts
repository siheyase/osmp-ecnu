/*
 * @Author: lyt
 * @Date: 2024-12-01 14:02:05
 * @LastEditTime: 2024-12-11 22:54:17
 * @LastEditors: lyt
 * @Description: lyt
 * @FilePath: /osmp-demo/jeecgboot-vue3/src/api/demo/formApi.ts
 *
 */
import { ApiSelectDemoItem } from './model/formModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  API_SELECT_DEMO_DATA = '/mock/demo/form/apiSelectData',
}

export const apiSelectDemoApi = async (params) => {
  const res = await defHttp.get<ApiSelectDemoItem[]>({ url: Api.API_SELECT_DEMO_DATA, params });
  console.log('懒加载远程下拉接口返回数据', res);
  return res;
};
