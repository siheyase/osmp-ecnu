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
      <div class="tab-container" style="width: 50%;">
        <a-tabs v-model:activeKey="activeKey1">
          <a-tab-pane key="1">
            <template #tab>
              <span>
                <DatabaseOutlined />
                合成数据总量日分布图
              </span>
            </template>
            <BarChart :chartData="nodeSynData?.chartData" :optionConfig="nodeSynData?.chartConfig"
              :seriesConfig="nodeSynData?.seriesConfig" height="30vh" />
          </a-tab-pane>
          <a-tab-pane key="2">
            <template #tab>
              <span>
                <CheckOutlined />
                合成任务总量日分布图
              </span>
            </template>
            <BarChart :chartData="nodeSynTask?.chartData" :optionConfig="nodeSynTask?.chartConfig"
              :seriesConfig="nodeSynTask?.seriesConfig" height="30vh" />
          </a-tab-pane>
        </a-tabs>
      </div>
      <div class="tab-container" style="width: 24%">
        <div style="width: 95%; margin: 0 auto;">
          <a-tabs v-model:activeKey="activeKey2">
            <a-tab-pane key="1">
              <template #tab>
                <h3 class="chart-title" style="margin-top: 20px;">上链交易数</h3>
              </template>
              <PieChart :chartData="nodeStorage?.chartData" :optionConfig="nodeStorage?.chartConfig"
                :seriesConfig="nodeStorage?.seriesConfig" height="30vh" width="100%" />
            </a-tab-pane>
            <a-tab-pane key="2">
              <template #tab>
                <span>
                  <MonitorOutlined />
                  合成节点状态
                </span>
              </template>
              <PieChart :chartData="nodeStatusData?.chartData" :optionConfig="nodeStatusData?.chartConfig"
                :seriesConfig="nodeStatusData?.seriesConfig" height="30vh" width="100%" />
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
      <div class="tab-container" style="width: 24%">
        <div style="width: 95%; margin: 0 auto;">
          <a-tabs v-model:activeKey="activeKey3">
            <a-tab-pane key="1">
              <template #tab>
                <span>
                  <ClockCircleOutlined />
                  合成任务状态
                </span>
              </template>
              <PieChart :chartData="taskData?.chartData" :optionConfig="taskData?.chartConfig"
                :seriesConfig="taskData?.seriesConfig" height="30vh" width="100%" />
            </a-tab-pane>
            <a-tab-pane key="2">
              <template #tab>
                <span>
                  <TagOutlined />
                  合成数据集分布
                </span>
              </template>
              <PieChart :chartData="datasetData?.chartData" :optionConfig="datasetData?.chartConfig"
                :seriesConfig="datasetData?.seriesConfig" height="30vh" width="100%" />
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
    <div class="table">
      <BasicTable @register="nodeTable">
        <template #nodeInfo="{ record }">
          <div class="nodeInfo">
            Node{{ record?.NodeID }}
          </div>
        </template>
        <template #storage="{ record }">
          <div class="storage-container">
            <!-- 图标 -->
            <!-- <div class="storage-icon">
                <img src="https://img.icons8.com/material-outlined/24/000000/hard-drive.png" alt="Disk Icon" />
              </div> -->
            <!-- 信息部分 -->
            <div class="storage-info">
              <div class="storage-progress">
                <a-progress :percent="((record.disk / record.storage) * 100).toFixed(2)" :show-info="false"
                  stroke-width="10" stroke-color="#1890ff" />
              </div>
              <div class="storage-details">
                {{ record?.disk.toFixed(1) }} B 可用，共 {{ record?.storage.toFixed(1) }} B
              </div>
            </div>
          </div>
        </template>

        <template #nodeTaskProgress="{ record }">
          <!-- <div style="display: flex; justify-content: center; align-items: center; width: 100%;"> -->
          <a-progress
            :percent="(record.NbFinishedTasks / (record.NbFinishedTasks + record.NbPendingTasks) * 100).toFixed(2)"
            :steps="10" strokeColor="#52c41a"
            style="display: flex; justify-content: center; align-items: center; width: 100%;" />
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
import { BarChart, PieChart } from '/@/components/Charts';
import { BasicTable } from '/@/components/Table';
import { useBasicForm } from '/@/views/demo/table/components/useBasicForm';
import { useDataOnChain } from './useDataOnChain';
import { ref } from 'vue';
import { MonitorOutlined, ShopOutlined, DatabaseOutlined, TagOutlined, CheckOutlined, ClockCircleOutlined } from '@ant-design/icons-vue';
import { toFixed } from 'ant-design-vue/es/input-number/src/utils/MiniDecimal';
const { nodeSynData, nodeSynTask, nodeStorage, nodeStatusData, taskData, datasetData } = useDataOnChain();
const { nodeTable, nodeDetail, statusClick, historyClick, dataClick, editClick, addClick, batchDelete } = useBasicForm();
const activeKey1 = ref('1');
const activeKey2 = ref('1');
const activeKey3 = ref('1');
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

/deep/ :where(.css-dev-only-do-not-override-1oyve5v).ant-table-wrapper .ant-table.ant-table-bordered>.ant-table-container>.ant-table-header>table>thead>tr>th {
  border-inline-end: none;
}

/deep/ :where(.css-dev-only-do-not-override-1oyve5v).ant-table-wrapper .ant-table.ant-table-bordered>.ant-table-container>.ant-table-body>table>tbody>tr>td {
  border-inline-end: none;
}

/deep/ .items-center {
  margin-bottom: 10px;
}
</style>