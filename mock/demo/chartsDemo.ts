/*
 * @Author: lyt
 * @Date: 2024-12-12 11:43:30
 * @LastEditTime: 2024-12-16 17:58:36
 * @LastEditors: lyt
 * @Description: 图表demo-mock数据
 * @FilePath: /osmp-demo/mock/demo/chartsDemo.ts
 *
 */

import { MockMethod } from 'vite-plugin-mock';
import { resultSuccess, baseUrl } from '../_util';

const newValData = [
  {
    id: '001',
    title: '柱状图（单）',
    type: 'bar',
    chartList: [
      {
        chartConfig: {
          xAxis: { data: ['9月22日', '9月23日', '9月24日', '9月25日', '9月26日'] },
        },
        chartData: [100, 140, 240, 100, 100],
      },
      {
        chartData: [
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
        ],
      },
    ],
  },
  {
    id: '002',
    title: '柱状图（横向）',
    type: 'hbar',
    chartList: [
      {
        chartConfig: {
          yAxis: { data: ['拟合优度', '真实样本隐私保护', '模型输出正确性', '模型参与完整度'] },
        },
        chartData: ['18203', '23489', '29034', '104970'],
      },
      {
        chartData: [
          {
            name: '拟合优度',
            value: 18203,
          },
          {
            name: '真实样本隐私保护',
            value: 23489,
          },
          {
            name: '模型输出正确性',
            value: 29034,
          },
          {
            name: '模型参与完整度',
            value: 104970,
          },
        ],
      },
    ],
  },
  {
    id: '003',
    title: '柱状图（多列）',
    type: 'barMulti',
    chartList: [
      {
        chartConfig: {
          xAxis: { data: ['f1_pr', 'coverage', 'f1_dc'] },
        },
        chartData: [
          {
            name: 'dgraph',
            value: [1.1, 1, 0.98],
          },
          {
            name: 'elliptic',
            value: [1, 1, 0.8],
          },
          {
            name: 'tfinacne',
            value: [1.6, 0.5, 0.78],
          },
        ],
      },
      {
        chartData: [
          {
            name: 'f1_pr',
            value: 1.1,
            type: 'dgraph',
          },
          {
            name: 'coverage',
            value: 1,
            type: 'dgraph',
          },
          {
            name: 'f1_dc',
            value: 0.98,
            type: 'dgraph',
          },
          {
            name: 'f1_pr',
            value: 1,
            type: 'elliptic',
          },
          {
            name: 'coverage',
            value: 1,
            type: 'elliptic',
          },
          {
            name: 'f1_dc',
            value: 0.8,
            type: 'elliptic',
          },
          {
            name: 'f1_pr',
            value: 1.6,
            type: 'tfinacne',
          },
          {
            name: 'coverage',
            value: 0.5,
            type: 'tfinacne',
          },
          {
            name: 'f1_dc',
            value: 0.78,
            type: 'tfinacne',
          },
        ],
      },
    ],
  },
  {
    id: '004',
    title: '堆叠图',
    type: 'direct',
    chartList: [
      {
        id: '005-01',
        chartConfig: {
          yAxis: { data: ['节点个数', '边个数', '特征维度', '异常账户占比', '节点度均值'] },
        },
        chartData: [
          {
            name: 'dgraph',
            value: [0.9, 0.1, 0.06, 0.35, 0],
          },
          {
            name: 'elliptic',
            value: [0.08, 0, 0.9, 0.35, 0],
          },
          {
            name: 'tfinace',
            value: [0.02, 0.9, 0.04, 0.3, 1],
          },
        ],
      },
      {
        id: '005-01',
        chartConfig: {
          // yAxis: { data: ['节点个数', '边个数', '特征维度', '异常账户占比', '节点度均值'] },
        },
        chartData: [
          {
            name: '节点个数',
            type: 'dgraph',
            value: 0.9,
          },
          {
            name: '边个数',
            type: 'dgraph',
            value: 0.1,
          },
          {
            name: '特征维度',
            type: 'dgraph',
            value: 0.06,
          },
          {
            name: '异常账户占比',
            type: 'dgraph',
            value: 0.35,
          },
          {
            name: '节点度均值',
            type: 'dgraph',
            value: 0,
          },
          {
            name: '节点个数',
            type: 'elliptic',
            value: 0.08,
          },
          {
            name: '边个数',
            type: 'elliptic',
            value: 0,
          },
          {
            name: '特征维度',
            type: 'elliptic',
            value: 0.9,
          },
          {
            name: '异常账户占比',
            type: 'elliptic',
            value: 0.35,
          },
          {
            name: '节点度均值',
            type: 'elliptic',
            value: 0,
          },
          {
            name: '节点个数',
            type: 'tfinace',
            value: 0.02,
          },
          {
            name: '边个数',
            type: 'tfinace',
            value: 0.9,
          },
          {
            name: '特征维度',
            type: 'tfinace',
            value: 0.04,
          },
          {
            name: '异常账户占比',
            type: 'tfinace',
            value: 0.3,
          },
          {
            name: '节点度均值',
            type: 'tfinace',
            value: 1,
          },
        ],
      },
    ],
  },
  {
    id: '005',
    title: '极坐标图',
    type: 'tangPolar',
    chartList: [
      {
        chartConfig: {
          radiusAxis: { data: ['基本面交易者', '长期动量交易者', '短期动量交易者', '噪声交易者'] },
        },
        chartData: [60, 30, 40, 20],
      },
      {
        chartData: [
          {
            name: '基本面交易者',
            value: 60,
          },
          {
            name: '长期动量交易者',
            value: 30,
          },
          {
            name: '短期动量交易者',
            value: 40,
          },
          {
            name: '噪声交易者',
            value: 20,
          },
        ],
      },
    ],
  },
  {
    id: '006',
    title: '饼图',
    type: 'pie',
    chartList: [
      {
        chartData: [
          { name: '使用', value: 32 },
          { name: '空闲', value: 44 },
          { name: '关机', value: 10 },
          { name: '故障', value: 2 },
        ],
      },
      {
        name: 'sex',
        chartData: [
          { value: 0.604, name: 'female' },
          { value: 0.396, name: 'male' },
        ],
      },
    ],
  },
  {
    id: '007',
    title: '环形图',
    type: 'ring',
    chartList: [
      {
        chartData: [
          { name: '合成中任务', value: 120 },
          { name: '待合成任务', value: 80 },
        ],
      },
      {
        chartData: [
          { name: '合成中任务', value: 120 },
          { name: '待合成任务', value: 80 },
        ],
      },
    ],
  },
  {
    id: '008',
    title: '折线图',
    type: 'line',
    chartList: [
      {
        chartConfig: {
          xAxis: { data: ['9月26日', '9月27日', '9月28日', '9月29日', '9月30日', '10月1日', '10月2日', '10月3日'] },
        },
        chartData: [13000, 14000, 18000, 19000, 17000, 18500, 16000, 13000],
      },
      {
        chartData: [
          {
            name: '9月26日',
            value: 13000,
          },
          {
            name: '9月27日',
            value: 14000,
          },
          {
            name: '9月28日',
            value: 18000,
          },
          {
            name: '9月29日',
            value: 19000,
          },
          {
            name: '9月30日',
            value: 17000,
          },
          {
            name: '10月1日',
            value: 18500,
          },
          {
            name: '10月2日',
            value: 16000,
          },
          {
            name: '10月3日',
            value: 13000,
          },
        ],
      },
    ],
  },
  {
    id: '009',
    title: '雷达图',
    type: 'radar',
    chartList: [
      {
        chartConfig: {
          radar: {
            indicator: [
              { name: '鲁棒性', max: 6500 },
              { name: '隐私性', max: 16000 },
              { name: '概念漂移', max: 30000 },
              { name: '责任性', max: 38000 },
              { name: '保真度', max: 52000 },
            ],
          },
        },
        chartData: [
          {
            value: [4200, 3000, 20000, 35000, 50000],
            name: '分类模型',
          },
          {
            value: [5000, 14000, 28000, 26000, 42000],
            name: '回归模型',
          },
          {
            value: [3000, 12000, 22000, 20000, 32000],
            name: '波动率曲面',
          },
        ],
      },
      {
        chartConfig: {
          radar: {
            indicator: [
              { name: '鲁棒性', max: 6500 },
              { name: '隐私性', max: 16000 },
              { name: '概念漂移', max: 30000 },
              { name: '责任性', max: 38000 },
              { name: '保真度', max: 52000 },
            ],
          },
        },
        chartData: [
          {
            name: '鲁棒性',
            value: 4200,
            type: '分类模型',
          },
          {
            name: '隐私性',
            value: 3000,
            type: '分类模型',
          },
          {
            name: '概念漂移',
            value: 20000,
            type: '分类模型',
          },
          {
            name: '责任性',
            value: 35000,
            type: '分类模型',
          },
          {
            name: '保真度',
            value: 50000,
            type: '分类模型',
          },
          {
            name: '鲁棒性',
            value: 5000,
            type: '回归模型',
          },
          {
            name: '隐私性',
            value: 14000,
            type: '回归模型',
          },
          {
            name: '概念漂移',
            value: 28000,
            type: '回归模型',
          },
          {
            name: '责任性',
            value: 26000,
            type: '回归模型',
          },
          {
            name: '保真度',
            value: 42000,
            type: '回归模型',
          },
          {
            name: '鲁棒性',
            value: 3000,
            type: '波动率曲面',
          },
          {
            name: '隐私性',
            value: 12000,
            type: '波动率曲面',
          },
          {
            name: '概念漂移',
            value: 22000,
            type: '波动率曲面',
          },
          {
            name: '责任性',
            value: 20000,
            type: '波动率曲面',
          },
          {
            name: '保真度',
            value: 32000,
            type: '波动率曲面',
          },
        ],
      },
    ],
  },
];

export default [
  {
    url: `${baseUrl}/demo/charts/chartsDemoData`,
    method: 'get',
    response: ({ query }) => {
      return resultSuccess(newValData);
    },
  },
] as MockMethod[];
