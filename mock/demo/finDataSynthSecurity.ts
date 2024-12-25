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

const upChainTPS = [
{
  id: '008',
  title: '上链TPS',
  type: 'line',
  chartList: [
    {
      chartConfig: {
        xAxis: { data: ['9月26日', '9月27日', '9月28日', '9月29日', '9月30日', '10月1日', '10月2日', '10月3日'] },
      },
      chartData: [13000, 14000, 18000, 19000, 17000, 18500, 16000, 13000],
    },
  ],
},]

// 模拟最新区块数据
const latestBlocks = [
  [{ blockNumber: "21182673", node: "节点27", time: "11秒前", transactions: "123笔交易" },],
];
// 模拟最新交易数据
const latestTransactions = [
  [{ hash: "0x12c4hstd6s89...", from: "0x95ct12s...5CC1abe", to: "0x61sv89...vkc3Xvs", time: "11秒前" }],
  [{ hash: "0xA243cgdt6f...", from: "0xfsd42v2...y78vdf1abe", to: "0xdgf42v...g4dgT7y", time: "11秒前" }],
  [{ hash: "0xdtg3rwy454gj...", from: "0xGRcg56...ny129cy6", to: "0xKj34rf5...dvs7unH9", time: "11秒前" }],
];
// 最新区块表单配置
const columnsBlock = [
  { title: '区块信息', dataIndex: 'blockNumber', key: 'blockNumber', },
  { title: '节点', dataIndex: 'node', key: 'node', },
  { title: '上链时间', dataIndex: 'time', key: 'time', },
  { title: '交易数量', dataIndex: 'transactions', key: 'transactions' },
];
// 最新交易表单配置
const columnsTransaction = [
  { title: "交易哈希", dataIndex: 'hash', key: 'hash' },
  { title: "交易数据存储起点", dataIndex: 'from', key: 'from' },
  { title: "交易数据存储终点", dataIndex: 'to', key: 'to' },
  { title: "交易上链时间", dataIndex: 'time', key: 'time' },
];
// 查询结果数据
const taskQueryResult = [
  { name: '任务ID', value: '1027367800' },
  { name: '交易哈希', value: '0x917tediGYsfhjd787ssdTD86q8736ecfsd' },
  { name: '任务状态', value: '已完成'},
];

// 过程查验数据
const taskProcessData = [
  { key: '1', name: '合成阶段开始时间', value: '2024-10-08 12:01:35' },
  { key: '2', name: '合成阶段结束时间', value: '2024-10-08 19:27:56' },
  { key: '3', name: '合成任务数据量', value: '80TB' },
  { key: '4', name: '输入数据信息', value: '0xhias7fyxiJakDsy9d8waq321e' },
  { key: '5', name: '分配节点', value: 'node-03, node-09,...' },
  { key: '6', name: '分配策略', value: '动态分配' },
  { key: '7', name: '合成规则', value: 'CTGAN模型文件' },
  { key: '8', name: '数据切块大小', value: '128GB' },
  { key: '9', name: '可信证明', value: 'true'},
  { key: '10', name: '输出数据信息', value: '0xhs9ofe8670798tdqsacz' },
];

const taskValidationData = [
  [
    { key: '1', name: '合成任务ID', value: '1027367800' },
    { key: '2', name: '阶段', value: 'slot_1' },
    { key: '3', name: '节点信息', value: 'node-03' },
    { key: '4', name: '验证时间', value: '2024-10-08 13:15:30' },
    { key: '5', name: '预期验证哈希', value: '8a2c82b36f4a563c15a4f96db99f18a2c4d572' },
    { key: '6', name: '实际验证哈希', value: '8a2c82b36f4a563c15a4f96db99f18a2c4d572' },
    { key: '7', name: '验证结果', value: 'Success' },
  ],
  [
    { key: '1', name: '合成任务ID', value: '1027367800' },
    { key: '2', name: '阶段', value: 'slot_2' },
    { key: '3', name: '节点信息', value: 'node-03' },
    { key: '4', name: '验证时间', value: '2024-10-08 13:15:30' },
    { key: '5', name: '预期验证哈希', value: '8a2c82b36f4a563c15a4f96db99f18a2c4d572' },
    { key: '6', name: '实际验证哈希', value: '8a2c82b36f4a563c15a4f96db99f18a2c4d572' },
    { key: '7', name: '验证结果', value: 'Success' },
  ],
  [
    { key: '1', name: '合成任务ID', value: '1027367800' },
    { key: '2', name: '阶段', value: 'slot_3' },
    { key: '3', name: '节点信息', value: 'node-03' },
    { key: '4', name: '验证时间', value: '2024-10-08 13:15:30' },
    { key: '5', name: '预期验证哈希', value: '8a2c82b36f4a563c15a4f96db99f18a2c4d572' },
    { key: '6', name: '实际验证哈希', value: '8a2c82b36f4a563c15a4f96db99f18a2c4d572' },
    { key: '7', name: '验证结果', value: 'Success' },
  ],
];

const taskPhaseData = [
  {
    key: '1',
    phaseHash: '0xashkdaskhdaskhask',
    phaseId: 'slot_1',
    nodeInfo: "{ 'node_id': 'node-03', 'cpu_usage': 75.2, 'memory_usage': 68.5 }",
    progress: '14.05%',
    phaseResult: '8a2c82b36f4a563c15a4f96db99f18a2c4d572',
    exceptionInfo: '-',
  },
];

const taskExceptionData = [
  {
    key: '1',
    nodeId: 'node-03',
    nodeInfo: "{ 'node_id': 'node-03', 'cpu_usage': 85.0, 'memory_usage': 92.3 }",
    exceptionTime: '2024-10-08 14:15:30',
    phaseId: 'slot_3',
    errorCode: 'E-201',
    errorMessage: 'Node did not respond within the expected time frame.',
    lastSyncTime: '2024-10-08 14:15:30',
  },
];

// 表格列配置
const columnsProcess = [
  { dataIndex: 'name', key: 'name' },
  { dataIndex: 'value', key: 'value' },
];

const columnsValidation = [
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '值', dataIndex: 'value', key: 'value' },
];

const columnsPhase = [
  { title: '阶段标识', dataIndex: 'phaseId', key: 'phaseId' },
  { title: '阶段进度', dataIndex: 'progress', key: 'progress' },
  { title: '阶段结果', dataIndex: 'phaseResult', key: 'phaseResult' },
  { title: '节点状态信息', dataIndex: 'nodeInfo', key: 'nodeInfo' },
];

const columnsException = [
  { title: '节点ID', dataIndex: 'nodeId', key: 'nodeId' },
  { title: '节点状态信息', dataIndex: 'nodeInfo', key: 'nodeInfo' },
  { title: '异常时间', dataIndex: 'exceptionTime', key: 'exceptionTime' },
  { title: '阶段标识', dataIndex: 'phaseId', key: 'phaseId' },
  { title: '错误代码', dataIndex: 'errorCode', key: 'errorCode' },
  { title: '错误描述', dataIndex: 'errorMessage', key: 'errorMessage' },
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
  {
    url: `${baseUrl}/demo/finDataSynthSecurity/upChainTPS`,
    method: 'get',
    response: () => {
      return resultSuccess(upChainTPS);
    },
  },
  {
    url: `${baseUrl}/demo/finDataSynthSecurity/latestBlocks`,
    method: 'get',
    response: () => {
      return resultSuccess(latestBlocks);
    },
  },
  {
    url: `${baseUrl}/demo/finDataSynthSecurity/latestTransactions`,
    method: 'get',
    response: () => {
      return resultSuccess(latestTransactions);
    },
  },
  {
    url: `${baseUrl}/demo/finDataSynthSecurity/columnsBlock`,
    method: 'get',
    response: () => {
      return resultSuccess(columnsBlock);
    },
  },
  {
    url: `${baseUrl}/demo/finDataSynthSecurity/columnsTransaction`,
    method: 'get',
    response: () => {
      return resultSuccess(columnsTransaction);
    },
  },
  {
    url: `${baseUrl}/demo/finDataSynthSecurity/taskQueryResult`,
    method: 'get',
    response: () => {
      return resultSuccess(taskQueryResult);
    },
  },
  {
    url: `${baseUrl}/demo/finDataSynthSecurity/taskProcessData`,
    method: 'get',
    response: () => {
      return resultSuccess(taskProcessData);
    },
  },
  {
    url: `${baseUrl}/demo/finDataSynthSecurity/taskValidationData`,
    method: 'get',
    response: () => {
      return resultSuccess(taskValidationData);
    },
  },
  {
    url: `${baseUrl}/demo/finDataSynthSecurity/taskPhaseData`,
    method: 'get',
    response: () => {
      return resultSuccess(taskPhaseData);
    },
  },
  {
    url: `${baseUrl}/demo/finDataSynthSecurity/taskExceptionData`,
    method: 'get',
    response: () => {
      return resultSuccess(taskExceptionData);
    },
  },
  {
    url: `${baseUrl}/demo/finDataSynthSecurity/columnsProcess`,
    method: 'get',
    response: () => {
      return resultSuccess(columnsProcess);
    },
  },
  {
    url: `${baseUrl}/demo/finDataSynthSecurity/columnsValidation`,
    method: 'get',
    response: () => {
      return resultSuccess(columnsValidation);
    },
  },
  {
    url: `${baseUrl}/demo/finDataSynthSecurity/columnsPhase`,
    method: 'get',
    response: () => {
      return resultSuccess(columnsPhase);
    },
  },
  {
    url: `${baseUrl}/demo/finDataSynthSecurity/columnsException`,
    method: 'get',
    response: () => {
      return resultSuccess(columnsException);
    },
  },
] as MockMethod[];
