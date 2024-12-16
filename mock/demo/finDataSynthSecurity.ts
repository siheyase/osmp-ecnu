/*
 * @Author: lyt
 * @Date: 2024-12-12 10:43:30
 * @LastEditTime: 2024-12-12 10:56:23
 * @LastEditors: lyt
 * @Description: 数据合成安全-mock数据
 * @FilePath: /osmp-demo/jeecgboot-vue3/mock/demo/finDataSynthSecurity.ts
 *
 */
import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess, baseUrl } from '../_util';

const nodeSynData = [
  {
    name: '9月22日',
    value: 100,
  },
  {
    name: '9月23日',
    value: 140,
  },
  {
    name: '9月24日',
    value: 240,
  },
  {
    name: '9月25日',
    value: 100,
  },
  {
    name: '9月26日',
    value: 100,
  },
];

const nodeStorage = [
  { name: '已占用', value: 300 },
  { name: '未占用', value: 500 },
];
const nodeStatus = [
  { name: '使用', value: 32 },
  { name: '空闲', value: 44 },
  { name: '关机', value: 10 },
  { name: '故障', value: 2 },
];

export default [
  {
    url: `${baseUrl}/demo/finDataSynthSecurity/nodeSynData`,
    method: 'get',
    response: () => {
      return resultSuccess(nodeSynData);
    },
  },
  {
    url: `${baseUrl}/demo/finDataSynthSecurity/nodeStorage`,
    method: 'get',
    response: () => {
      return resultSuccess(nodeStorage);
    },
  },
  {
    url: `${baseUrl}/demo/finDataSynthSecurity/nodeStatus`,
    method: 'get',
    response: () => {
      return resultSuccess(nodeStatus);
    },
  },
] as MockMethod[];
