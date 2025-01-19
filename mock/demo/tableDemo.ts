/*
 * @Author: lyt
 * @Date: 2024-12-12 11:43:30
 * @LastEditTime: 2024-12-16 17:56:58
 * @LastEditors: lyt
 * @Description: 表格demo-mock数据
 * @FilePath: /osmp-demo/mock/demo/tableDemo.ts
 *
 */

import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess, baseUrl } from '../_util';
import { time } from 'console';
import { M } from 'vite/dist/node/types.d-aGj9QkWt';
const getNodeTableData = () => {
  const synthesisStatusArr = ['空闲', '忙碌', '暂停'];
  const nodeStatusArr = ['正常', '故障', '关机'];
  const nodeStatusWeights = [0.8, 0.1, 0.1]; // 正常:80%，故障:10%，关机:10%

  // 根据权重生成随机状态
  const getWeightedStatus = (statuses: string[], weights: number[]) => {
    const random = Math.random();
    let cumulative = 0;
    for (let i = 0; i < weights.length; i++) {
      cumulative += weights[i];
      if (random < cumulative) {
        return statuses[i];
      }
    }
    return statuses[statuses.length - 1];
  };

  const data: any = (() => {
    const arr: any = [];
    for (let index = 0; index < 40; index++) {
      // 生成节点状态
      const nodeStatus = getWeightedStatus(nodeStatusArr, nodeStatusWeights);

      // 生成存储数据
      const used = Math.random() * 50;
      const total = used + Math.random() * 50;
      const percent = Math.ceil((used / total) * 100);

      // 生成合成状态
      let synthesisStatus = synthesisStatusArr[index % 2]; // 默认生成的合成状态
      if (nodeStatus === '故障' || nodeStatus === '关机') {
        synthesisStatus = '暂停'; // 如果前一个是故障或关机，设置为暂停
      }


      arr.push({
        id: `${index}`,
        nodeImgUrl: 'https://img.i2soft.net/i2official-web/assets/images/nav/navLogo.png',
        nodeInfo: `节点-${index}-${Math.floor(Math.random() * 99)}`,
        storage: {
          total,
          used,
          percent,
        },
        systhStatus: synthesisStatus,
        finishTask: Math.floor(Math.random() * 100),
        systhData: Math.floor(Math.floor(Math.random() * 100)),
        nodeStatus: nodeStatus,
        nodeTaskProgress: Math.random().toFixed(2), // 已完成任务数/总任务数
      });
    }
    return arr;
  })();

  return data;
};


const getHisCompTaskData = () => {
  const synthesisStatusArr = ['已完成', '未完成'];
  const y = new Date().getFullYear();
  const m = String(new Date().getMonth() + 1).padStart(2, '0');
  const d = String(new Date().getDate()).padStart(2, '0');
  const data: any = (() => {
    const arr: any = [];
    for (let index = 0; index < 40; index++) {
      const synthesisStatus = synthesisStatusArr[index % 2];
      arr.push({
        id: `${Math.floor(Math.random() * 999)}-0283-${index}`,
        transactionHash: `${Math.floor(Math.random() * 999)}-kz/s${index}`,
        totalDataSize: Math.floor(Math.random() * 999),
        synthesizedDataSize: Math.floor(Math.random() * 999),
        synthesisStatus: synthesisStatus,
        taskCreateTime: `${y}-${m}-${d}`,
        taskEndTime: `${y}-${m}-${d}`,
      });
    }
    return arr;
  })();
  return data;
};

const getBlockTableData = () => {
  const now = new Date();

  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const h = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');

  const data: any = (() => {
    const arr: any = [];
    for (let index = 0; index < 40; index++) {
      arr.push({
        id: `${index}`,
        blockNumber: Math.floor(Math.random() * 9999999),
        node: `节点${Math.floor(Math.random() * 9) + 1}`,
        time: `${y}-${m}-${d} ${h}:${min}:${s}`,
        transactions: `${Math.floor(Math.random() * 1000)} 笔交易`,
      });
    }
    return arr;
  })();
  return data;
};

const getTransactionTableData = () => {
  const now = new Date();

  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const h = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');

  const data: any = (() => {
    const arr: any = [];
    for (let index = 0; index < 40; index++) {
      arr.push({
        id: `${index}`,
        hash: `0x${Math.floor(Math.random() * 9999999999)}`,
        txType: (() => {
          const types = ["合成任务初始化", "提交合成数据", "纪元记录更新"];
          return types[Math.floor(Math.random() * types.length)];
        })(),
        // blockHeight: `${Math.floor(Math.random() * 1000)}`,
        blockHash: `0x${Math.floor(Math.random() * 9999999999)}`,
        contractAddress: `0x${Math.floor(Math.random() * 9999999999)}`,
        time: `${y}-${m}-${d} ${h}:${min}:${s}`,
      });
    }
    return arr;
  })();
  return data;
};

// add by zhmye
const getEpochTableData = () => {
  const now = new Date();
  const data: any = (() => {
    const arr: any = [];
    for (let index = 0; index < 40; index++) {
      arr.push({
        id: `${40 - index}`,
        EpochID: `${40 - index}`,
        nbCommitSlot: Math.floor(Math.random() * 10),
        nbFinalizedSlot: Math.floor(Math.random() * 10),
        nbInvalidSlot: Math.floor(Math.random() * 10),
        txHash: `0x${Math.floor(Math.random() * 9999999999)}`,
      })
    }
    return arr;
  })();
  return data;
};

export default [
  {
    url: `${baseUrl}/demo/table/getNodeTableData`,
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      const pageNo = +(query.pageNo ?? page);
      return resultPageSuccess(pageNo, +pageSize, getNodeTableData());
    },
  },
  {
    url: `${baseUrl}/demo/table/getHisCompTaskData`,
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      const pageNo = +(query.pageNo ?? page);
      return resultPageSuccess(pageNo, +pageSize, getHisCompTaskData());
    },
  },
  {
    url: `${baseUrl}/demo/table/getBlockData`,
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 10 } = query;
      const pageNo = +(query.pageNo ?? page);
      return resultPageSuccess(pageNo, +pageSize, getBlockTableData());
    },
  },
  {
    url: `${baseUrl}/demo/table/getTransactionData`,
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 10 } = query;
      const pageNo = +(query.pageNo ?? page);
      return resultPageSuccess(pageNo, +pageSize, getTransactionTableData());
    },
  },
  {
    url: `${baseUrl}/demo/table/getEpochData`,
    timeout: 1000,
    method: 'get',
    response: ( { query }) => {
      const { page = 1, pageSize = 10} = query;
      const pageNo = + (query.pageNo ?? page);
      return resultPageSuccess(pageNo, +pageSize, getEpochTableData());
    }
  }
] as MockMethod[];
