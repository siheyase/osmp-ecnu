/*
 * @Author: lyt
 * @Date: 2024-11-08 14:02:05
 * @LastEditTime: 2024-11-14 12:32:10
 * @LastEditors: lyt
 * @Description: lyt
 * @FilePath: /osmp-demo/jeecgboot-vue3/src/api/demo/monDashboardApi.ts
 *
 */
import { defHttp } from '/@/utils/http/axios';
import { DashboardInfo } from './model/monDashboardModel';

enum Api {
  SELECT_DASHBOARD_DATA = '/mock/select_dashboardData',
}

export const getMonDashboardApi = (params) => {
  const res = defHttp.get<DashboardInfo[]>({ url: Api.SELECT_DASHBOARD_DATA, params });
  console.log('查询监测看板数据接口返回数据', res);
  return res;
};
