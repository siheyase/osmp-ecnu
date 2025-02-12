<!--
 * @Author: lyt
 * @Date: 2024-12-02 13:19:01
 * @LastEditTime: 2024-12-12 10:29:08
 * @LastEditors: lyt
 * @Description: lyt
 * @FilePath: /osmp-demo/jeecgboot-vue3/src/views/demo/table/components/SearchTable.vue
 *  
-->
<template>
  <CollapseContainer title="搜索表格示例">
    <BasicTable @register="histCompTasksTable">
      <template #form-taskCompTime="{ model, field }">
        <div class="formSlot">
          <a-range-picker v-model:value="model[field]" format="YYYY-MM-DD" />
          <div class="date-select-btn">
            <a-button type="text" @click="selectDate('today')">今日</a-button>
            <a-button type="text" @click="selectDate('yesterday')">昨日</a-button>
            <a-button type="text" @click="selectDate('lastSevendays')">最近7天</a-button>
            <a-button type="text" @click="selectDate('lastThirtyDays')">最近30天</a-button>
          </div>
        </div>
      </template>
      <template #action="{ record }">
        <a-button type="link" @click="downloadClick(record)">下载数据</a-button>
        <a-button type="link" @click="viewProofClick(record)">查看凭证</a-button>
        <a-button type="link" @click="deleteClick(record)">删除</a-button>
      </template>
    </BasicTable>
  </CollapseContainer>
</template>
<script lang="ts" setup>
  import { CollapseContainer } from '/@/components/Container';
  import { BasicTable } from '/@/components/Table';
  import { useSearchTable } from './useSearchTable';

  const { histCompTasksTable, downloadClick, viewProofClick, deleteClick, selectDate } = useSearchTable();
</script>
<style scoped lang="less">
  .formSlot {
    width: 100%;
    display: flex;
    flex-direction: row;
    column-gap: 10px;
  }
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
