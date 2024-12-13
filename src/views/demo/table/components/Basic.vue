<!--
 * @Author: lyt
 * @Date: 2024-12-11 13:19:01
 * @LastEditTime: 2024-12-12 16:33:51
 * @LastEditors: lyt
 * @Description: 基础表格
 * @FilePath: /osmp-demo/jeecgboot-vue3/src/views/demo/table/components/Basic.vue
 *  
-->
<template>
  <CollapseContainer title="基础示例">
    <!-- 表格 -->
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
  </CollapseContainer>
</template>
<script lang="ts" setup>
  import { CollapseContainer } from '/@/components/Container';
  import { BasicTable } from '/@/components/Table';
  import { useBasicForm } from './useBasicForm';

  const { nodeTable, nodeDetail, statusClick, historyClick, dataClick, editClick, addClick, batchDelete, addModal, modelConfirm } = useBasicForm();
</script>
<style scoped lang="less">
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
