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
      <h3>数据合成实时监控</h3>
      <div class="chart">
        <!-- title="节点合成数据" -->
        <BarChart
          :chartData="nodeSynData?.chartData"
          :optionConfig="nodeSynData?.chartConfig"
          :seriesConfig="nodeSynData?.seriesConfig"
          height="30vh"
        />
        <!-- title="节点存储情况" -->
        <PieChart
          :chartData="nodeStorage?.chartData"
          :optionConfig="nodeStorage?.chartConfig"
          :seriesConfig="nodeStorage?.seriesConfig"
          height="30vh"
        />
        <!-- title="节点运行情况" -->
        <PieChart
          :chartData="nodeStatusData?.chartData"
          :optionConfig="nodeStatusData?.chartConfig"
          :seriesConfig="nodeStatusData?.seriesConfig"
          height="30vh"
        />
      </div>
      <div class="table">
        <BasicTable @register="nodeTable">
          <template #nodeInfo="{ record }">
            <div class="nodeInfo">
              <img :src="record?.nodeImgUrl" />
              <a @click="nodeDetail(record)" style="color: #1890ff"> {{ record?.nodeInfo }}</a>
            </div>
          </template>
          <template #nodeTaskProgress="{ text }">
            <a-progress :percent="text * 100" size="small" />
          </template>
          <template #action="{ record }">
            <a-button type="link" @click="statusClick(record)" v-if="record?.synthesisStatus === '已完成'">存储状态</a-button>
            <a-button type="link" @click="historyClick(record)" v-if="record?.synthesisStatus === '已完成'">历史合成</a-button>
            <a-button type="link" @click="dataClick(record)" v-if="record?.synthesisStatus !== '已完成'">数据</a-button>
            <a-button type="link" @click="editClick(record)" v-if="record?.synthesisStatus !== '已完成'">编辑</a-button>
          </template>
          <template #toolbar>
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
          </template>
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
  
    const { nodeSynData, nodeStorage, nodeStatusData } = useDataOnChain();
    const { nodeTable, nodeDetail, statusClick, historyClick, dataClick, editClick, addClick, batchDelete } = useBasicForm();
  </script>
  <style scoped lang="less">
    .chart {
      display: flex;
      flex-direction: row;
    }
    .table {
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
  
    /deep/
      :where(.css-dev-only-do-not-override-1oyve5v).ant-table-wrapper
      .ant-table.ant-table-bordered
      > .ant-table-container
      > .ant-table-header
      > table
      > thead
      > tr
      > th {
      border-inline-end: none;
    }
  
    /deep/
      :where(.css-dev-only-do-not-override-1oyve5v).ant-table-wrapper
      .ant-table.ant-table-bordered
      > .ant-table-container
      > .ant-table-body
      > table
      > tbody
      > tr
      > td {
      border-inline-end: none;
    }
  
    /deep/ .items-center {
      margin-bottom: 10px;
    }
  </style>
  