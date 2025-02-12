/*
 * @Author: lyt
 * @Date: 2024-12-11 11:17:52
 * @LastEditTime: 2024-12-12 13:01:11
 * @LastEditors: lyt
 * @Description: lyt
 * @FilePath: /osmp-demo/jeecgboot-vue3/src/views/demo/table/components/tableData.tsx
 *
 */
import { FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { render } from '/@/utils/common/renderUtils';

// 数据合成监控-表格配置项
export function getNodeColumns(): BasicColumn[] {
  return [
    {
      title: '节点名称',
      dataIndex: 'nodeInfo',
      width: 100,
      slots: {
        customRender: 'nodeInfo',
      },
      fixed: 'left',
    },
    // {
    //   title: '已占用/T',
    //   dataIndex: 'usedStorage',
    //   width: 80,
    // },
    {
      title: '节点状态',
      dataIndex: 'Status',
      width: 80,
      // 自定义显示-render例子
      customRender: ({ value }) => {
        const color = (() => {
          if (value === 'Normal') {
            return '#06A94E'; // 正常：绿色
          }
          if (value === 'Down') {
            return '#F82906'; // 故障：红色
          }
          if (value === 'Close') {
            return '#9E9E9E'; // 关机：灰色
          }
          return '#9E9E9E'; // 默认无颜色
        })();
        return render.renderTag(value, color);
      },
      
    },
    {
      title: '负载状态',
      dataIndex: 'Workload',
      width: 80,
      // 自定义样式
      customRender: ({ value }) => {
        const color = (() => {
          if (value === '空闲') {
            return '#06A94E'; // 正常：绿色
          }
          if (value === '忙碌') {
            return '#F82906'; // 故障：红色
          }
          return '#9E9E9E'; // 默认无颜色
        })();
        return render.renderTag(value, color);
      },
    },
    {
      title: '完成任务数量',
      dataIndex: 'NbFinishedTasks',
      width: 80,
      // 自定义样式
      slots: {
        customRender: 'finishTask',
      },
    },
    {
      title: '合成数据总量',
      dataIndex: 'SynthData',
      width: 80,
      // 自定义样式
      slots: {
        customRender: 'systhData',
      },
    },
    {
      title: '节点任务进度',
      dataIndex: 'progress',
      width: 100,
      slots: {
        customRender: 'nodeTaskProgress',
      },
      align: 'center',
    },
    {
      title: '存储占用',
      dataIndex: 'storage',
      slots: {
        customRender: 'storage',
      },
      width: 100,
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 100,
      slots: {
        customRender: 'action',
      },
      fixed: 'right',
    },
  ];
}

export const getNodeTableData = () => {
  const synthesisStatusArr = ['已完成', '未完成'];
  const nodeStatusArr = ['负载', '空闲', '关机'];
  const data: any = (() => {
    const arr: any = [];
    for (let index = 0; index < 40; index++) {
      const synthesisStatus = synthesisStatusArr[index % 2];
      arr.push({
        id: `${index}`,
        nodeImgUrl: 'https://img.i2soft.net/i2official-web/assets/images/nav/navLogo.png',
        nodeInfo: `节点-${index}`,
        totalStorage: Math.floor(Math.random() * 999),
        usedStorage: Math.floor(Math.random() * 999),
        synthesisStatus: synthesisStatus,
        nodeStatus: nodeStatusArr[index % 2],
        nodeTaskProgress: synthesisStatus === '已完成' ? '1' : Math.random().toFixed(2),
      });
    }
    return arr;
  })();
  return data;
};

// 历史合成任务-表格配置项
export function getHistCompTasksColumns(): BasicColumn[] {
  return [
    {
      title: '合成任务ID',
      dataIndex: 'id',
      width: 80,
      slots: {
        customRender: 'nodeInfo',
      },
      fixed: 'left',
    },
    {
      title: '交易哈希',
      dataIndex: 'transactionHash',
      width: 80,
    },
    {
      title: '数据总量（TB）',
      dataIndex: 'totalDataSize',
      width: 80,
    },
    {
      title: '已合成（TB）',
      dataIndex: 'synthesizedDataSize',
      width: 80,
    },
    {
      title: '合成状态',
      dataIndex: 'synthesisStatus',
      width: 80,
      // 自定义样式
      customCell: (record) => {
        let fontColor;
        if (record.synthesisStatus === '已完成') {
          fontColor = '#06A94E';
        } else {
          fontColor = '#F82906';
        }
        return { style: { color: fontColor } };
      },
    },
    {
      title: '任务创建时间',
      dataIndex: 'taskCreateTime',
      width: 80,
    },
    {
      title: '任务结束时间',
      dataIndex: 'taskEndTime',
      width: 80,
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 150,
      slots: {
        customRender: 'action',
      },
      fixed: 'right',
    },
  ];
}
// 历史合成任务-表格搜索表单配置项
export const histCompTaskFormSchema: FormSchema[] = [
  {
    label: '合成任务ID',
    field: 'id',
    component: 'Input',
    componentProps: {},
    colProps: {
      span: 8,
    },
  },
  {
    label: '交易哈希',
    field: 'transactionHash',
    component: 'Input',
    componentProps: {},
    colProps: {
      span: 8,
    },
  },
  {
    label: '数据状态',
    field: 'synthesisStatus',
    component: 'Input',
    componentProps: {},
    colProps: {
      span: 8,
    },
  },
  {
    field: 'taskCompTime',
    component: 'Input',
    label: '合成时间',
    slot: 'taskCompTime',
    colProps: {
      span: 16,
    },
  },
];

/***
  NOTE: zhmye
  这里是修改区块链数据监控页面的下面两个表格的column的
***/
export function getEpochColumns(): BasicColumn[] {
  return [
    { title: '纪元编号', dataIndex: 'EpochID', key: 'EpochID', },
    { title: '提交单元数', dataIndex: 'nbCommitSlot', key: 'nbCommitSlot', },
    { title: '确认单元数', dataIndex: 'nbFinalizedSlot', key: 'nbFinalizedSlot', },
    { title: '异常单元数', dataIndex: 'nbInvalidSlot', key: 'nbInvalidSlot' },
    { title: '交易哈希', dataIndex: 'txHash', key: 'txHash'},
  ];
}
export function getTransactionColumns(): BasicColumn[] {
  return [
    { title: "交易哈希", dataIndex: 'hash', key: 'hash' },
    { title: "交易数据类型", dataIndex: 'txType', key: 'txType' },
    { title: "区块哈希", dataIndex: 'blockHash', key: 'blockHash'},
    { title: "合约地址", dataIndex: 'contractAddress', key: 'contractAddress'},
    { title: "交易上链时间", dataIndex: 'time', key: 'time' },
  ];
}

export function getBlockInfoColumns(): BasicColumn[] {
  return [
    { title: "交易哈希", dataIndex: 'hash', key: 'hash' },
    { title: "合约地址", dataIndex: 'contract', key: 'contract'},
    { title: "调用接口", dataIndex: 'method', key: 'method'},

  ]
}