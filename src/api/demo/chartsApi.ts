/*
 * @Author: lyt
 * @Date: 2024-11-08 14:02:05
 * @LastEditTime: 2024-12-16 17:52:02
 * @LastEditors: lyt
 * @Description: lyt
 * @FilePath: /osmp-demo/src/api/demo/chartsApi.ts
 *
 */
import { defHttp } from '/@/utils/http/axios';
import { ChartsInfo } from './model/chartsModel';

// todo @YZM 这里是填url的
enum Api {
  SELECT_CHARTS_DATA = '/mock/demo/charts/chartsDemoData',
}

export const getChartsDataApi = () => {
  const res = defHttp.get<ChartsInfo[]>({ url: Api.SELECT_CHARTS_DATA });
  console.log('查询图表demo数据接口返回数据', res);
  return res;
};
