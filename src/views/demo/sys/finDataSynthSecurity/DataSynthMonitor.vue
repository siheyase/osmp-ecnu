<!--
 * @Author: ecnu
 * @Date: 2024-12-12 10:32:41
 * @LastEditTime: 2024-12-13 17:33:27
 * @LastEditors: ecnu
 * @Description: 数据合成安全-数据合成监控
 * @FilePath: osmp-demo\src\views\demo\sys\finDataSynthSecurity\DataSynthMonitor.vue
 *  
-->
<template>
  <PageWrapper>
    <div class="chart">
      <!-- title="节点合成数据" -->
      <div class="tab-container" style="width: 50%">
        <a-tabs v-model:activeKey="activeKey1">
          <a-tab-pane key="1">
            <template #tab>
              <span>
                <DatabaseOutlined />
                合成数据总量日分布图
              </span>
            </template>
            <BarChart
              :chartData="NodeDetail.dataRecord"
              :optionConfig="nodeSynData?.chartConfig"
              :seriesConfig="nodeSynData?.seriesConfig"
              height="30vh"
            />
          </a-tab-pane>
          <a-tab-pane key="2">
            <template #tab>
              <span>
                <CheckOutlined />
                合成任务总量日分布图
              </span>
            </template>
            <BarChart
              :chartData="NodeDetail.taskRecord"
              :optionConfig="nodeSynTask?.chartConfig"
              :seriesConfig="nodeSynTask?.seriesConfig"
              height="30vh"
            />
          </a-tab-pane>
        </a-tabs>
      </div>
      <div class="tab-container" style="width: 24%">
        <div style="width: 95%; margin: 0 auto">
          <a-tabs v-model:activeKey="activeKey2">
            <a-tab-pane key="1">
              <template #tab>
                <span>
                  <ShopOutlined />
                  系统存储情况
                </span>
              </template>
              <PieChart
                :chartData="NodeDetail.storageDistribution"
                :optionConfig="nodeStorage?.chartConfig"
                :seriesConfig="nodeStorage?.seriesConfig"
                height="30vh"
                width="100%"
              />
            </a-tab-pane>
            <a-tab-pane key="2">
              <template #tab>
                <span>
                  <MonitorOutlined />
                  合成节点状态
                </span>
              </template>
              <PieChart
                :chartData="NodeDetail.statusDistribution"
                :optionConfig="nodeStatusData?.chartConfig"
                :seriesConfig="nodeStatusData?.seriesConfig"
                height="30vh"
                width="100%"
              />
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
      <div class="tab-container" style="width: 24%">
        <div style="width: 95%; margin: 0 auto">
          <a-tabs v-model:activeKey="activeKey3">
            <a-tab-pane key="1">
              <template #tab>
                <span>
                  <ClockCircleOutlined />
                  合成任务状态
                </span>
              </template>
              <PieChart
                :chartData="NodeDetail.taskStatusDistribution"
                :optionConfig="taskData?.chartConfig"
                :seriesConfig="taskData?.seriesConfig"
                height="30vh"
                width="100%"
              />
            </a-tab-pane>
            <a-tab-pane key="2">
              <template #tab>
                <span>
                  <TagOutlined />
                  合成数据集分布
                </span>
              </template>
              <PieChart
                :chartData="NodeDetail.datasetDistribution"
                :optionConfig="datasetData?.chartConfig"
                :seriesConfig="datasetData?.seriesConfig"
                height="30vh"
                width="100%"
              />
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
    <div class="table">
      <BasicTable :pagination="false" :data-source="NodeDetail.nodes" :columns="nodeColumn">
        <template #nodeInfo="{ record }">
          <div class="nodeInfo">
            <img :src="ECNU_ICON" :style="{ width: imgSize, height: imgSize }" />
            ECNU-合成节点-{{ record?.NodeID }}
          </div>
        </template>
        <template #speed="{ record }"> {{ (Math.random() * (200 - 100) + 100).toFixed(2) }} GB/S </template>
        <template #storage="{ record }">
          <div class="storage-container">
            <!-- 图标 -->
            <!-- <div class="storage-icon">
                <img src="https://img.icons8.com/material-outlined/24/000000/hard-drive.png" alt="Disk Icon" />
              </div> -->
            <!-- 信息部分 -->
            <div class="storage-info">
              <div class="storage-progress" v-if="record.storage != 0">
                <a-progress
                  :percent="((record.disk / record.storage) * 100).toFixed(2)"
                  :show-info="false"
                  stroke-width="10"
                  stroke-color="#1890ff"
                />
              </div>
              <div class="storage-details" v-if="record.storage != 0">
                {{ ((record?.storage - record?.disk) / 1024).toFixed(2) }} TB 可用，共 {{ (record?.storage / 1024).toFixed(2) }} TB
              </div>
              <div v-if="record.storage == 0"> 暂无数据 </div>
            </div>
          </div>
        </template>

        <template #nodeTaskProgress="{ record }">
          <!-- <div style="display: flex; justify-content: center; align-items: center; width: 100%;"> -->
          <a-progress
            :percent="
              record.NbFinishedTasks + record.NbPendingTasks == 0
                ? 0
                : ((record.NbFinishedTasks / (record.NbFinishedTasks + record.NbPendingTasks)) * 100).toFixed(2)
            "
            :size="progressSize"
            :steps="10"
            strokeColor="#52c41a"
            style="display: flex; justify-content: center; align-items: center; width: 100%"
          />
          <!-- </div> -->
        </template>

        <template #action="{ record }">
          <a-button type="link" @click="statusClick(record)">合成详情</a-button>
          <a-button type="link" @click="dataClick(record)">状态详情</a-button>
        </template>
        <!-- <template #toolbar>
            <a-button type="primary" preIcon="ant-design:plus-outlined" @click="addClick"> 新增</a-button>
            <a-dropdown>
              <template #overlay>
                <a-menu>
                  <a-menu-item key="1" @click="batchDelete">
                    <Icon icon="ant-design:delete-outlined" />
                    删除
                  </a-menu-item>
                </a-menu>
              </template>
              <a-button
                >批量操作
                <Icon icon="mdi:chevron-down" />
              </a-button>
            </a-dropdown>
          </template> -->
      </BasicTable>
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { PageWrapper } from '/@/components/Page';
  import ECNU_ICON from '/@/assets/ecnu.png';
  import { BarChart, PieChart } from '/@/components/Charts';
  import { BasicTable } from '/@/components/Table';
  import { useBasicForm } from '/@/views/demo/table/components/useBasicForm';
  import { useDataOnChain } from './useDataOnChain';
  import { onMounted, ref, computed, onBeforeUnmount } from 'vue';
  import { MonitorOutlined, ShopOutlined, DatabaseOutlined, TagOutlined, CheckOutlined, ClockCircleOutlined } from '@ant-design/icons-vue';
  import { render } from '/@/utils/common/renderUtils';
  import { getSynthDataApi } from '/@/api/demo/finDataSynthSecurityApi';
  import { calculateDataMapSize } from '/@/utils/value/calDataSize';

  const { nodeSynData, nodeSynTask, nodeStorage, nodeStatusData, taskData, datasetData } = useDataOnChain();
  const { statusClick, dataClick } = useBasicForm();
  const activeKey1 = ref('1');
  const activeKey2 = ref('1');
  const activeKey3 = ref('1');

  let NodeDetail = ref({
    nodes: [],
    statusDistribution: [],
    storageDistribution: [],
    taskRecord: [],
    dataRecord: [],
    taskStatusDistribution: [],
    datasetDistribution: [],
  });

  const nodeColumn = [
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
      title: '完成单元数量',
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
      customRender: ({ value }) => {
        return calculateDataMapSize(value, 'AUTO');
      },
    },
    {
      title: '平均合成速度',
      dataIndex: 'speed',
      width: 80,
      // 自定义样式
      slots: {
        customRender: 'speed',
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

  onMounted(async () => {
    const res1 = await getSynthDataApi({
      query: 'NodesStatusQuery',
    });
    const res2 = await getSynthDataApi({
      query: 'DateSynthDataQuery',
    });

    NodeDetail.value.nodes = res1.data.nodes;
    NodeDetail.value.storageDistribution = [
      { name: '使用中', value: (res1.data.storageDistribution.used / 1024).toFixed(2) },
      { name: '未使用', value: (res1.data.storageDistribution['not used'] / 1024).toFixed(2) },
    ];
    NodeDetail.value.statusDistribution = [
      { name: '正常', value: res1.data.statusDistribution.normal },
      { name: '故障', value: res1.data.statusDistribution.down },
      { name: '关闭', value: res1.data.statusDistribution.close },
    ];
    let tasks = [];
    let data = [];
    for (let i = 0; i < res2.data.date.length; i++) {
      tasks.push({ name: res2.data.date[i], value: res2.data.finish[i] });
      data.push({ name: res2.data.date[i], value: calculateDataMapSize(res2.data.synthData[i], 'KB', false) });
    }
    NodeDetail.value.taskRecord = tasks;
    NodeDetail.value.dataRecord = data;

    NodeDetail.value.taskStatusDistribution = [
      { name: '已完成', value: res2.data.taskDistribution.finish },
      { name: '未完成', value: res2.data.taskDistribution.processing },
    ];

    NodeDetail.value.datasetDistribution = [
      { name: 'elliptic', value: res2.data.datasetDistribution['elliptic'] },
      { name: 'FINKAN_default', value: res2.data.datasetDistribution['default of credit card clients'] },
      { name: 'ABM_SHL2', value: res2.data.datasetDistribution['SHL2 TA0_600519_202401-202402_defreg'] },
      { name: 'CTGAN_default', value: res2.data.datasetDistribution['default of credit card clients'] },
    ];
  });

  // 根据屏幕尺寸修改组件大小
  const screenWidth = ref(window.innerWidth);
  const updateScreenSize = () => {
    screenWidth.value = window.innerWidth;
  };
  onMounted(() => {
    window.addEventListener('resize', updateScreenSize);
  });
  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateScreenSize);
  });
  const progressSize = computed(() => (screenWidth.value < 2500 ? 'small' : 'default'));
  const imgSize = computed(() => {
    if (screenWidth.value < 1024) return '40px'; // 小屏幕
    if (screenWidth.value < 2500) return '50px'; // 中屏幕
    return '60px'; // 大屏幕
  });
</script>
<style scoped lang="less">
  .chart {
    display: flex;
    flex-direction: row;
  }

  .table {
    margin-top: 20px;

    .nodeInfo {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      img {
        width: 80px;
        margin-right: 20px;
      }
    }
  }

  .tab-container {
    padding: 20px;
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    margin-left: 10px;
    margin-bottom: 5px;
    margin-top: 5px;
  }

  :deep(
      :where(.css-dev-only-do-not-override-1oyve5v).ant-table-wrapper
        .ant-table.ant-table-bordered
        > .ant-table-container
        > .ant-table-header
        > table
        > thead
        > tr
        > th
    ) {
    border-inline-end: none;
  }

  :deep(
      :where(.css-dev-only-do-not-override-1oyve5v).ant-table-wrapper
        .ant-table.ant-table-bordered
        > .ant-table-container
        > .ant-table-body
        > table
        > tbody
        > tr
        > td
    ) {
    border-inline-end: none;
  }
</style>
